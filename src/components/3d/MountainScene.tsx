"use client";

/**
 * MountainScene — procedural Himalayan valley (vanilla three.js, no r3f needed)
 *
 * Needs:  npm i three   +   npm i -D @types/three      (three >= r155)
 *
 * What you get
 *  - Displaced terrain with a meandering river, meadows, pine forest, rock and snow peaks
 *  - Atmospheric depth (exp fog matched to a physically-styled sky dome + sun glow)
 *  - A few soft drifting clouds + low valley mist
 *  - Cinematic push-in camera (starts when `started` becomes true), mouse parallax on
 *    desktop, scroll parallax, gentle idle sway
 *  - Mobile-aware: lower mesh density / fewer trees / capped pixel ratio / portrait FOV
 *  - Pauses when off-screen or tab hidden, full dispose on unmount
 *  - prefers-reduced-motion: camera jumps to the final pose, no sway
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  /** flip to true when the intro doors start opening -> camera dolly begins */
  started: boolean;
  /** called once, after the first frame has been rendered */
  onReady?: () => void;
};

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const sm = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash2(ix: number, iy: number) {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function vnoise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x: number, y: number, oct = 5) {
  let s = 0;
  let a = 0.5;
  let f = 1;
  for (let i = 0; i < oct; i++) {
    s += a * vnoise(x * f, y * f);
    f *= 2;
    a *= 0.5;
  }
  return s;
}

/* ------------------------------------------------------------------ */
/*  World description                                                  */
/* ------------------------------------------------------------------ */

const Z_NEAR = 140;
const Z_FAR = -560;
const X_EXT = 520;
const WATER_Y = -0.3;

/** x-position of the river centre-line at depth z */
const riverX = (z: number) => -Math.sin(z * 0.012) * 14 - Math.sin(z * 0.031) * 4;

function heightAt(x: number, z: number) {
  const ax = Math.abs(x - riverX(z)); // distance from river axis

  // valley walls: rise from the river, saturate around ~110
  const wall = 110 * (1 - Math.exp(-Math.pow(Math.max(ax - 12, 0) / 60, 1.4)));

  // rugged detail, only on the slopes
  const rough = (fbm(x * 0.011 + 3.1, z * 0.011 + 7.7, 5) - 0.42) * 85 * sm(8, 110, ax);

  // far snowy range closing the valley
  const ridge = 1 - Math.abs(2 * fbm(x * 0.006 + 11, z * 0.006 + 5, 4) - 1);
  const back = sm(-40, -380, z);
  const backH = back * (85 + Math.pow(ridge, 1.6) * 150) * (0.55 + 0.45 * sm(0, 120, ax));

  // valley floor: gentle meadow undulation, flat near the water
  const floor = 3 + (fbm(x * 0.03, z * 0.03, 3) - 0.5) * 5 * sm(3, 25, ax) * (1 - sm(25, 60, ax));

  // river channel
  const channel = Math.exp(-(ax * ax) / 72) * 5.5;

  return floor + wall + rough + backH - channel;
}

/* ------------------------------------------------------------------ */
/*  Palette (sRGB hex — THREE.Color converts to linear)                */
/* ------------------------------------------------------------------ */

const GRASS_LOW = new THREE.Color("#86bf4a");
const GRASS_DEEP = new THREE.Color("#4f9033");
const FOREST = new THREE.Color("#2a6234");
const ALPINE = new THREE.Color("#93a062");
const ROCK = new THREE.Color("#8d8879");
const SNOW = new THREE.Color("#f4f7fb");
const SAND = new THREE.Color("#bdb293");

const SKY_TOP = new THREE.Color("#2c68b0");
const SKY_MID = new THREE.Color("#78aee0");
const SKY_HORIZON = new THREE.Color("#d3e1ec");
const SUN_COLOR = new THREE.Color("#ffd7a1");
const SUN_DIR = new THREE.Vector3(0.28, 0.3, -0.9).normalize();

/* ------------------------------------------------------------------ */
/*  Builders                                                           */
/* ------------------------------------------------------------------ */

function buildTerrain(segX: number, segZ: number) {
  const geo = new THREE.PlaneGeometry(1, 1, segX, segZ);
  geo.rotateX(-Math.PI / 2);

  const pos = geo.attributes.position as THREE.BufferAttribute;

  // pass 1 — positions (grid is denser near the camera and near the valley axis)
  for (let i = 0; i < pos.count; i++) {
    const u = pos.getX(i) * 2; // -1..1
    const v = pos.getZ(i) + 0.5; // 0..1
    const x = Math.sign(u) * Math.pow(Math.abs(u), 1.9) * X_EXT;
    const z = Z_NEAR - Math.pow(v, 1.45) * (Z_NEAR - Z_FAR);
    pos.setXYZ(i, x, heightAt(x, z), z);
  }
  geo.computeVertexNormals();

  // pass 2 — vertex colours from height / slope / noise
  const nrm = geo.attributes.normal as THREE.BufferAttribute;
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const h = pos.getY(i);
    const z = pos.getZ(i);
    const slope = 1 - nrm.getY(i);

    const n = fbm(x * 0.05, z * 0.05, 3);
    const n2 = fbm(x * 0.2 + 9, z * 0.2, 2);

    c.copy(GRASS_LOW).lerp(GRASS_DEEP, clamp01(n * 1.3));

    const forest = sm(4, 22, h) * (1 - sm(70, 92, h));
    c.lerp(FOREST, forest * (0.55 + 0.45 * n2));

    c.lerp(ALPINE, sm(60, 90, h + (n - 0.5) * 20) * 0.6);

    const rock = Math.max(sm(0.2, 0.42, slope), sm(88, 125, h + (n - 0.5) * 25) * 0.9);
    c.lerp(ROCK, rock);

    const snow = sm(120, 150, h + (n2 - 0.5) * 30) * (1 - sm(0.3, 0.6, slope) * 0.7);
    c.lerp(SNOW, snow);

    c.lerp(SAND, (1 - sm(0.2, 1.8, h)) * 0.85);

    c.multiplyScalar(0.9 + 0.2 * n2);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.96,
    metalness: 0,
  });
  return new THREE.Mesh(geo, mat);
}

function buildWater() {
  const geo = new THREE.PlaneGeometry(220, 720, 1, 1);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshStandardMaterial({
    color: "#4f93a8",
    emissive: "#0d3346",
    emissiveIntensity: 0.6,
    roughness: 0.1,
    metalness: 0.05,
    transparent: true,
    opacity: 0.92,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, WATER_Y, -210);
  return mesh;
}

function buildTrees(attempts: number) {
  const rnd = mulberry32(1337);
  const items: { x: number; y: number; z: number; r: number; h: number; t: number }[] = [];

  for (let i = 0; i < attempts; i++) {
    const x = (rnd() * 2 - 1) * 190;
    const z = 110 - rnd() * 500;
    const h = heightAt(x, z);
    if (h < 1.6 || h > 80) continue;

    const e = 2;
    const dx = heightAt(x + e, z) - heightAt(x - e, z);
    const dz = heightAt(x, z + e) - heightAt(x, z - e);
    const slope = Math.hypot(dx, dz) / (2 * e);
    if (slope > 0.85) continue;

    const ax = Math.abs(x - riverX(z));
    const patch = fbm(x * 0.02 + 50, z * 0.02, 3);
    let p = patch > 0.42 ? 1 : 0;
    if (ax < 22) p *= 0.12; // keep the valley floor as open meadow (plots!)
    if (h > 55) p *= 1 - (h - 55) / 30;
    if (rnd() > p) continue;

    items.push({
      x,
      y: h - 0.4,
      z,
      r: 1.15 + rnd() * 0.95,
      h: 1.3 + rnd() * 1.1,
      t: rnd() * 0.7 + clamp01((h - 20) / 70) * 0.3,
    });
  }

  const geo = new THREE.ConeGeometry(1, 4, 7, 1);
  geo.translate(0, 2, 0);
  const mat = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.95, flatShading: true });
  const mesh = new THREE.InstancedMesh(geo, mat, items.length);
  mesh.frustumCulled = false;

  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  const p = new THREE.Vector3();
  const a = new THREE.Color("#1d4a2a");
  const b = new THREE.Color("#3b7a3a");
  const col = new THREE.Color();

  items.forEach((it, i) => {
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * Math.PI * 2);
    s.set(it.r, it.h, it.r);
    p.set(it.x, it.y, it.z);
    m.compose(p, q, s);
    mesh.setMatrixAt(i, m);
    mesh.setColorAt(i, col.copy(a).lerp(b, it.t));
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  return mesh;
}

function buildSky() {
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uTop: { value: SKY_TOP },
      uMid: { value: SKY_MID },
      uHorizon: { value: SKY_HORIZON },
      uSunColor: { value: SUN_COLOR },
      uSunDir: { value: SUN_DIR },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uTop;
      uniform vec3 uMid;
      uniform vec3 uHorizon;
      uniform vec3 uSunColor;
      uniform vec3 uSunDir;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.22, h));
        col = mix(col, uTop, smoothstep(0.18, 0.85, h));
        float s = max(dot(d, normalize(uSunDir)), 0.0);
        col += uSunColor * (pow(s, 6.0) * 0.32 + pow(s, 48.0) * 0.35 + pow(s, 900.0) * 1.6);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  return new THREE.Mesh(new THREE.SphereGeometry(1800, 32, 20), mat);
}

function makeCloudTexture(seed: number) {
  const size = 256;
  const cv = document.createElement("canvas");
  cv.width = size;
  cv.height = size;
  const g = cv.getContext("2d")!;
  const r = mulberry32(seed);

  for (let i = 0; i < 28; i++) {
    const x = size * (0.18 + 0.64 * r());
    const bump = Math.sin((Math.PI * (x / size - 0.18)) / 0.64) * 0.1;
    const y = size * (0.54 + (r() - 0.5) * 0.14 - bump);
    const rad = size * (0.07 + 0.11 * r()) * (0.75 + bump * 3);
    const grad = g.createRadialGradient(x, y, 0, x, y, rad);
    grad.addColorStop(0, "rgba(255,255,255,0.55)");
    grad.addColorStop(0.55, "rgba(255,255,255,0.24)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
  }

  // soft blue-grey underside
  g.globalCompositeOperation = "source-atop";
  const shade = g.createLinearGradient(0, size * 0.36, 0, size * 0.68);
  shade.addColorStop(0, "rgba(255,255,255,0)");
  shade.addColorStop(1, "rgba(146,166,198,0.5)");
  g.fillStyle = shade;
  g.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MountainScene({ started, onReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(started);
  const readyRef = useRef(onReady);

  useEffect(() => {
    startedRef.current = started;
  }, [started]);
  useEffect(() => {
    readyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = container.clientWidth < 768;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- renderer ---------- */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      // No WebGL — the CSS gradient behind the canvas stays visible
      readyRef.current?.();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(SKY_HORIZON);
    const canvas = renderer.domElement;
    canvas.style.cssText = "display:block;width:100%;height:100%;";
    container.appendChild(canvas);

    /* ---------- scene ---------- */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(SKY_HORIZON.clone(), 0.0024);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.5, 3200);

    const sky = buildSky();
    scene.add(sky);

    scene.add(new THREE.HemisphereLight(0xbfd8ff, 0x4d5a36, 1.0));
    const key = new THREE.DirectionalLight(0xffe6c0, 2.6);
    key.position.set(140, 110, 70);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffc98a, 1.5);
    rim.position.set(60, 50, -180);
    scene.add(rim);

    const terrain = buildTerrain(isMobile ? 150 : 240, isMobile ? 170 : 260);
    scene.add(terrain);
    scene.add(buildWater());
    scene.add(buildTrees(isMobile ? 1500 : 3400));

    /* ---------- clouds ---------- */
    const cloudTextures = [makeCloudTexture(11), makeCloudTexture(29), makeCloudTexture(47)];
    // x, y, z, width, height, opacity, drift speed
    const cloudDefs: [number, number, number, number, number, number, number][] = [
      [-150, 300, -600, 420, 140, 0.9, 1.0],
      [170, 340, -620, 480, 150, 0.85, 0.8],
      [-40, 230, -540, 380, 120, 0.8, 0.6],
      [110, 88, -260, 190, 64, 0.8, 1.8],
      [-120, 66, -210, 170, 60, 0.85, 1.5],
      [20, 108, -340, 230, 78, 0.75, 1.1],
      // low valley mist
      [0, 24, -150, 460, 56, 0.34, 0.5],
      [-70, 15, -70, 320, 42, 0.26, 0.4],
    ];
    const clouds = cloudDefs.map((d, i) => {
      const mat = new THREE.SpriteMaterial({
        map: cloudTextures[i % cloudTextures.length],
        transparent: true,
        opacity: 0,
        depthWrite: false,
        fog: false,
        toneMapped: false,
      });
      const sp = new THREE.Sprite(mat);
      sp.position.set(d[0], d[1], d[2]);
      sp.scale.set(d[3], d[4], 1);
      scene.add(sp);
      return { sp, base: d[5], speed: d[6] };
    });

    /* ---------- camera choreography ---------- */
    const START_POS = new THREE.Vector3(0, 62, 125);
    const START_TGT = new THREE.Vector3(0, 38, -160);
    const END_POS = new THREE.Vector3(0, 15, 62);
    const END_TGT = new THREE.Vector3(0, 46, -175);
    const tgt = new THREE.Vector3();
    const INTRO_SECONDS = 5.5;

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    /* ---------- sizing ---------- */
    const resize = () => {
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      const aspect = w / h;
      renderer.setSize(w, h, false);
      camera.aspect = aspect;
      // portrait phones get a taller field of view so the valley still reads
      camera.fov = aspect < 1 ? 55 + (1 - aspect) * 32 : 55;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    /* ---------- loop ---------- */
    const clock = new THREE.Clock();
    let introStart = -1;
    let raf = 0;
    let running = false;
    let visible = true;
    let framesRendered = 0;

    const tick = () => {
      if (!visible || document.hidden) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);

      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      if (startedRef.current && introStart < 0) introStart = t;
      const p = reduceMotion
        ? 1
        : introStart < 0
          ? 0
          : clamp01((t - introStart) / INTRO_SECONDS);
      const e = 1 - Math.pow(1 - p, 3);

      camera.position.lerpVectors(START_POS, END_POS, e);
      tgt.lerpVectors(START_TGT, END_TGT, e);

      if (!reduceMotion) {
        const k = Math.min(1, dt * 2.5);
        mouse.x += (mouse.tx - mouse.x) * k;
        mouse.y += (mouse.ty - mouse.y) * k;
        camera.position.x += Math.sin(t * 0.21) * 1.4 + mouse.x * 5;
        camera.position.y += Math.sin(t * 0.33) * 0.5 + mouse.y * 2;
        tgt.x += mouse.x * 10;
        tgt.y += mouse.y * 4;
      }

      // scroll parallax (hero leaves the screen)
      const sp = clamp01(window.scrollY / Math.max(window.innerHeight, 1));
      camera.position.z -= sp * 30;
      camera.position.y += sp * 6;
      tgt.y -= sp * 8;

      camera.lookAt(tgt);
      sky.position.copy(camera.position);

      const fade = sm(0, 0.35, p);
      for (const c of clouds) {
        if (!reduceMotion) {
          c.sp.position.x += c.speed * dt;
          if (c.sp.position.x > 560) c.sp.position.x = -560;
        }
        (c.sp.material as THREE.SpriteMaterial).opacity = c.base * fade;
      }

      renderer.render(scene, camera);

      framesRendered++;
      if (framesRendered === 2) readyRef.current?.();
    };

    const kick = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
      },
      { threshold: 0 }
    );
    io.observe(container);
    const onVisibility = () => kick();
    document.addEventListener("visibilitychange", onVisibility);

    kick();

    /* ---------- cleanup ---------- */
    return () => {
      cancelAnimationFrame(raf);
      running = false;
      visible = false;
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      cloudTextures.forEach((tx) => tx.dispose());
      renderer.dispose();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}
