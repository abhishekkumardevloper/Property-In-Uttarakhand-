"use client";

/**
 * CloudLayer — full-screen, realistic volumetric-looking clouds (raw WebGL, no libraries).
 *
 *  - Starts as a complete cloud cover (nothing behind it is visible).
 *  - When `clearing` becomes true the clouds part from the centre outwards, streaming past the
 *    camera, until only a few thin wisps are left drifting near the edges.
 *  - Sits on top of your photo / video and is transparent where there is no cloud.
 *
 * Cost control: renders at ~half resolution (clouds are soft), stops when off-screen / tab hidden,
 * drops to 30fps once the sky has cleared. Without WebGL it falls back to a soft white haze that fades.
 */

import { useEffect, useRef, useState } from "react";

type Props = {
  /** flip to true to start the clouds parting */
  clearing: boolean;
  /** ms to wait after `clearing` flips before the parting starts */
  delay?: number;
  /** ms the parting takes */
  duration?: number;
  /** skip the animation (prefers-reduced-motion): clouds are already cleared */
  instant?: boolean;
  /** called once, after the first frame has been drawn */
  onReady?: () => void;
};

const VERT = /* glsl */ `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform float uPart;

float hsh(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float nz(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hsh(i), hsh(i + vec2(1.0, 0.0)), u.x),
             mix(hsh(i + vec2(0.0, 1.0)), hsh(i + vec2(1.0, 1.0)), u.x), u.y);
}
const mat2 ROT = mat2(1.6, 1.2, -1.2, 1.6);
float fbm4(vec2 p) {
  float s = 0.0; float a = 0.5;
  for (int i = 0; i < 4; i++) { s += a * nz(p); p = ROT * p; a *= 0.5; }
  return s;
}
float fbm5(vec2 p) {
  float s = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { s += a * nz(p); p = ROT * p; a *= 0.5; }
  return s;
}

// one billowing cloud deck: gently warped fbm puffs, lit from the upper-left
vec4 cloudLayer(vec2 p, float t, vec2 drift, float thr, float soft, vec3 shadowC, vec3 lightC, float seed) {
  vec2 q = p + drift * t + seed;
  vec2 w = vec2(fbm4(q * 0.5 + vec2(1.7, 9.2) + t * 0.02),
                fbm4(q * 0.5 + vec2(8.3, 2.8) - t * 0.017));
  vec2 qq = q + 0.9 * (w - 0.5);
  float d  = fbm5(qq);
  float d2 = fbm5(qq + vec2(-0.16, 0.20));           // density towards the light
  float lit = clamp(0.86 + (d - d2) * 4.5, 0.0, 1.0);
  float a = smoothstep(thr - soft, thr + soft, d);
  vec3 c = mix(shadowC, lightC, lit);
  c *= 1.0 - 0.10 * smoothstep(thr + 0.05, thr + 0.35, d);   // thick cores a touch greyer
  c *= 0.985 + 0.06 * p.y;                                    // tops catch more light than bellies
  return vec4(c, a);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = (uv - 0.5) * vec2(asp, 1.0);
  float r = length(p) / length(vec2(asp * 0.5, 0.5));   // 0 centre .. 1 corner

  // fly-through: features grow and stream outwards while the deck thins out from the centre
  vec2 pz = p * mix(1.0, 0.6, uPart);
  float clearAmt = clamp(uPart * 1.5 - r * 0.55, 0.0, 1.0);
  float endThr = mix(0.96, 0.64, smoothstep(0.45, 1.05, r));   // a few wisps survive near the edges
  float thr = mix(-0.14, endThr, clearAmt);

  vec4 fr = cloudLayer(pz * 2.4, uTime, vec2(0.06, 0.0), thr, 0.055,
                       vec3(0.74, 0.80, 0.89), vec3(1.0, 1.0, 1.0), 0.0);
  vec4 bk = cloudLayer(pz * 1.5 + 0.3, uTime, vec2(0.035, 0.01), thr - 0.06, 0.10,
                       vec3(0.78, 0.84, 0.92), vec3(0.97, 0.98, 1.0), 11.0);
  bk.a *= 0.9;
  fr.a *= mix(1.0, 0.85, clearAmt);

  vec3 col = fr.rgb * fr.a + bk.rgb * bk.a * (1.0 - fr.a);   // premultiplied
  float alpha = fr.a + bk.a * (1.0 - fr.a);
  col += (hsh(gl_FragCoord.xy) - 0.5) * 0.008 * alpha;        // dither: no banding in the soft gradients
  gl_FragColor = vec4(col, alpha);
}
`;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function CloudLayer({ clearing, delay = 0, duration = 3800, instant = false, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(onReady);
  const startRef = useRef(-1); // performance.now() at which the parting begins
  const [fallback, setFallback] = useState(false);
  const [fallbackClear, setFallbackClear] = useState(false);

  useEffect(() => {
    readyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (!clearing) return;
    startRef.current = performance.now() + delay;
    const t = setTimeout(() => setFallbackClear(true), delay);
    return () => clearTimeout(t);
  }, [clearing, delay]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      setFallback(true);
      readyRef.current?.();
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    if (!vs || !fs) {
      setFallback(true);
      readyRef.current?.();
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFallback(true);
      readyRef.current?.();
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uPart = gl.getUniformLocation(prog, "uPart");

    const resize = () => {
      const scale = window.innerWidth < 768 ? 0.5 : 0.62; // clouds are soft — half-res is invisible
      const w = Math.max(2, Math.round(canvas.clientWidth * scale));
      const h = Math.max(2, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now(), true);
    });
    ro.observe(canvas);

    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();
    let time = 0;
    let frames = 0;

    const partAt = (now: number) => {
      if (instant) return 1;
      if (startRef.current < 0) return 0;
      return easeInOutCubic(clamp01((now - startRef.current) / duration));
    };

    function draw(now: number, force = false) {
      const part = partAt(now);
      if (!force && part >= 1 && (frames & 1) === 1) return; // 30fps once cleared
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, time);
      gl!.uniform1f(uPart, part);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    const tick = () => {
      if (!visible || document.hidden) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      time += Math.min((now - last) / 1000, 0.05);
      last = now;
      frames++;
      draw(now);
      if (frames === 2) readyRef.current?.();
    };
    const kick = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);
    const onVis = () => kick();
    document.addEventListener("visibilitychange", onVis);
    const onLost = (e: Event) => {
      e.preventDefault();
      setFallback(true);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    kick();

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      visible = false;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [instant, duration]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{ display: fallback ? "none" : "block" }}
      />
      {fallback && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, #ffffff 0%, #eef2f8 45%, #dfe6ef 100%)",
            opacity: instant || fallbackClear ? 0 : 1,
            transition: `opacity ${duration}ms ease-in-out`,
          }}
        />
      )}
    </>
  );
}
