import { chromium, devices } from "playwright";
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const browser = await chromium.launch();

async function dismissCookies(page) {
  await page.waitForTimeout(2000);
  for (const label of ["ACEPTAR", "Aceptar", "Aceptar todas", "OK"]) {
    const btn = page.getByRole("button", { name: label });
    if (await btn.count()) {
      try { await btn.first().click({ timeout: 2000 }); break; } catch {}
    }
  }
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

// MOBILE 780×1640
{
  const ctx = await browser.newContext({
    ...devices["iPhone 14 Pro"],
    viewport: { width: 390, height: 820 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto("https://tecmac.es", { waitUntil: "networkidle", timeout: 60000 });
  await dismissCookies(page);
  const png = await page.screenshot({ type: "png", fullPage: false });
  const out = await sharp(png)
    .resize(780, 1640, { fit: "cover", position: "top" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile("public/images/projects/mobile-tecmac.jpg", out);
  console.log("mobile-tecmac.jpg:", out.length, "bytes");
  await ctx.close();
}

// DESKTOP 1600×1000 (avif + webp)
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto("https://tecmac.es", { waitUntil: "networkidle", timeout: 60000 });
  await dismissCookies(page);
  const png = await page.screenshot({ type: "png", fullPage: false });
  const base = sharp(png).resize(1600, 1000, { fit: "cover", position: "top" });
  const avif = await base.clone().avif({ quality: 60 }).toBuffer();
  const webp = await base.clone().webp({ quality: 82 }).toBuffer();
  await writeFile("public/images/projects/tecmac.avif", avif);
  await writeFile("public/images/projects/tecmac.webp", webp);
  console.log("tecmac.avif:", avif.length, "bytes / tecmac.webp:", webp.length, "bytes");
  await ctx.close();
}

await browser.close();
