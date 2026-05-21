// Screenshot every meaningful page in the site at desktop + mobile to audit
// the new Trust & Authority palette. Saves PNGs into screenshots/.
//
// The site uses IntersectionObserver-driven AnimatedSection components that
// fade content in only after it enters the viewport. A naïve full-page
// screenshot captures the initial state (opacity:0) for everything below the
// fold. To work around that:
//   1. Emulate prefers-reduced-motion so GSAP/HF skip the animations.
//   2. Inject a stylesheet that overrides the .pc-animate / .lp-animate /
//      [data-animate] initial styles to "fully visible".
//   3. Scroll the page progressively so any observer that still fires has
//      its sections hit before we capture.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const PAGES = [
  { name: "home", path: "/es" },
  { name: "precios", path: "/es/precios" },
  { name: "servicios", path: "/es/servicios" },
  { name: "proyectos", path: "/es/proyectos" },
  { name: "contacto", path: "/es/contacto" },
  { name: "sobre-nosotros", path: "/es/sobre-nosotros" },
  { name: "ciudad-donostia", path: "/es/disenador-web-donostia" },
  { name: "ciudad-bilbao", path: "/es/disenador-web-bilbao" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const outDir = resolve("screenshots");
mkdirSync(outDir, { recursive: true });

// CSS injected after navigation to force any opacity:0 / transform:translate
// initial states to a fully-rendered baseline. We mirror the class hooks the
// codebase uses for animation. Add new hooks here as new patterns appear.
const FORCE_VISIBLE_CSS = `
  /* AnimatedSection / GSAP fade-up */
  [data-animate], .animate-on-scroll, .reveal, .reveal-up, .fade-up,
  .pc-animate, .pc-feature-animate, .lp-animate, .gb-pillar, .anim-fade-in {
    opacity: 1 !important;
    transform: none !important;
    visibility: visible !important;
  }
  /* PageLoader overlay — kill it for screenshots */
  .ua-loader, #ua-loader, [data-loader] { display: none !important; }
  /* Disable shader hero crossfades that depend on rAF */
  * { animation-play-state: running !important; }
`;

const browser = await chromium.launch();
try {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    for (const p of PAGES) {
      const page = await ctx.newPage();
      const url = `${BASE}${p.path}`;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      } catch {
        await page
          .goto(url, { waitUntil: "load", timeout: 30000 })
          .catch(() => {});
      }

      // Override animated initial styles + hide loader
      await page.addStyleTag({ content: FORCE_VISIBLE_CSS });

      // Progressive scroll so IntersectionObservers fire even if reduced-motion
      // didn't disable them. Step ~600px every 100ms; final scroll back to top.
      await page.evaluate(async () => {
        const totalHeight = document.documentElement.scrollHeight;
        const step = 600;
        for (let y = 0; y < totalHeight; y += step) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) => setTimeout(r, 90));
        }
        window.scrollTo({ top: 0, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 400));
      });

      // Final settle window for late paints (fonts, images, shader fallback)
      await page.waitForTimeout(500);

      const file = resolve(outDir, `${vp.name}-${p.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`${vp.name.padEnd(7)} ${p.name.padEnd(20)} -> ${file}`);
      await page.close();
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}
