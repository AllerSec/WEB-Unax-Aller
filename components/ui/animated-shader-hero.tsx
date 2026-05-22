"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

interface HeroProps {
  trustBadge?: { text: string; icons?: string[] };
  headline: { line1: string; line2: string };
  subtitle: string;
  buttons?: {
    primary?: { text: string; href?: string };
    secondary?: { text: string; href?: string };
  };
  className?: string;
}

/* Shader basado en Matthias Hurrle (@atzedent) — destellos orbitales
   recoloreados a la paleta Trust & Authority: navy → sky blue */
const SHADER = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float t=.0,a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}
  return t;
}
float clouds(vec2 p){
  float d=1.,t=.0;
  for(float i=.0;i<3.;i++){
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}

void main(void){
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);

  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);

    /* destellos — paleta Trust & Authority: navy oscuro con azul cielo */
    /* Queremos: azul cielo dominante (B), un toque blanco (G), R bajo */
    vec3 spark=cos(sin(i)*vec3(0.4,1.2,0.7)+vec3(2.1,0.3,1.8))+1.;
    vec3 tinted=vec3(
      spark.r*0.08+spark.g*0.04,   /* canal R: muy bajo → mantener navy */
      spark.g*0.30+spark.b*0.18,   /* canal G: medio → blueprint */
      spark.b*0.65+spark.g*0.30    /* canal B: dominante → sky blue */
    );
    col+=.00125/d*tinted;

    float b=noise(i+p+bg*1.731);
    /* segundo gradiente: azul cielo brillante */
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)))*vec3(0.10,0.30,0.70);
    /* fondo de tela navy con ligera azulada */
    col=mix(col,vec3(bg*.03,bg*.05,bg*.12),d);
  }

  /* vignette suave */
  float vig=1.-dot(uv*.7,uv*.7);
  col*=max(vig,0.15);

  O=vec4(col,1.);
}`;

function useShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced-motion: skip the WebGL pipeline entirely. The static
    // gradient veil already covers the canvas so the hero looks fine without
    // animation, and we save ~28 noise samples per pixel per frame.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const gl = canvas.getContext("webgl2", { antialias: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER,
      `#version 300 es\nin vec4 p;\nvoid main(){gl_Position=p;}`);
    const fs = compile(gl.FRAGMENT_SHADER, SHADER);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "resolution");
    const uTime = gl.getUniformLocation(prog, "time");

    // Render at half resolution. The shader is heavy (5-octave fbm × 12-iter
    // sparkle loop ≈ 28 noise samples per pixel) so going from 1.5× DPR to
    // 0.75× DPR drops fragment work by ~4×. The canvas is CSS-stretched back
    // to full size, which on a soft cloudy shader is visually indistinguishable.
    const resize = () => {
      const dpr = 0.75;
      canvas.width  = Math.floor(window.innerWidth  * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Only run the RAF loop while the hero is on-screen AND the tab is
    // visible. Off-screen / background tabs would otherwise keep the GPU
    // busy and starve other rendering work (= page-wide stutter).
    let inView = true;
    let tabVisible = !document.hidden;
    let running = false;

    const start = () => {
      if (running) return;
      running = true;
      const loop = (now: number) => {
        if (!running) return;
        gl.useProgram(prog);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, now * 1e-3);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
    const evaluate = () => {
      if (inView && tabVisible) start();
      else stop();
    };

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        evaluate();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      tabVisible = !document.hidden;
      evaluate();
    };
    document.addEventListener("visibilitychange", onVisibility);

    evaluate();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      stop();
      gl.deleteProgram(prog);
    };
  }, []);

  return canvasRef;
}

export function AnimatedShaderHero({
  trustBadge, headline, subtitle, buttons, className = "",
}: HeroProps) {
  const canvasRef = useShaderCanvas();

  return (
    <section className={`sh ${className}`} aria-labelledby="hero-h1">
      {/* WebGL background */}
      <canvas ref={canvasRef} className="sh__canvas" aria-hidden="true" />

      {/* Gradient veil — keeps text readable while shader shows through */}
      <div className="sh__veil" aria-hidden="true" />

      {/* Noise grain overlay for texture */}
      <div className="sh__grain" aria-hidden="true" />

      <div className="sh__inner">
        {/* Availability pill */}
        {trustBadge && (
          <div className="sh__pill" aria-label={trustBadge.text}>
            <span className="sh__pill-dot" aria-hidden="true" />
            <span className="sh__pill-text">{trustBadge.text}</span>
          </div>
        )}

        {/* Main headline — huge, split into two lines with accent on line 2 */}
        <h1 id="hero-h1" className="sh__h1">
          <span className="sh__h1-plain">{headline.line1}</span>
          <span className="sh__h1-accent">{headline.line2}</span>
        </h1>

        {/* Sub */}
        <p className="sh__sub">{subtitle}</p>

        {/* CTAs */}
        {buttons && (
          <div className="sh__ctas">
            {buttons.primary && (
              <Link
                href={buttons.primary.href ?? "/es/contacto"}
                className="sh__btn-primary"
              >
                {buttons.primary.text}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            )}
            {buttons.secondary && (
              <Link
                href={buttons.secondary.href ?? "/es/precios"}
                className="sh__btn-secondary"
              >
                {buttons.secondary.text}
              </Link>
            )}
          </div>
        )}

        {/* Scroll cue */}
        <div className="sh__scroll" aria-hidden="true">
          <div className="sh__scroll-line" />
        </div>
      </div>
    </section>
  );
}

export default AnimatedShaderHero;
