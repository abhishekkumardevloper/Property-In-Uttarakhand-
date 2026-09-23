"use client";

/**
 * MountainScene — procedural Himalayan valley (vanilla three.js, no r3f needed)
 *
 * Needs:  npm i three   +   npm i -D @types/three      (three >= r163)
 *
 * Realism comes from:
 *  - ridged-multifractal + domain-warped terrain (sharp spurs, gullies, real ridgelines)
 *  - per-pixel terrain shading: forest canopy speckle, rock strata, grass streaks,
 *    micro-relief normals that fade out with distance
 *  - baked curvature AO, snow / rock / forest / meadow / farmland material weights
 *  - sky dome + image-based lighting generated from that same sky (PMREM)
 *  - atmospheric perspective (exp fog), drifting clouds, valley mist
 *  - rippling river with sky reflections, instanced multi-tier pines near the camera
 *
 * Camera: cinematic push-in when `started` flips true, mouse + scroll parallax.
 * Mobile: lighter mesh / fewer trees / capped pixel ratio / portrait FOV.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

type Props = {
  /** flip to true when the intro doors start opening -> camera dolly begins */
  started: boolean;
  /** called once, after the first frames have been rendered */
  onReady?: () => void;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
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
    f *= 2.03;
    a *= 0.5;
  }
  return s;
}

/** ridged multifractal: sharp crests, eroded-looking flanks (0..~1) */
function ridged(x: number, y: number, oct = 6) {
  let s = 0;
  let a = 0.5;
  let f = 1;
  let w = 1;
  for (let i = 0; i < oct; i++) {
    let n = vnoise(x * f + i * 17.3, y * f - i * 9.1);
    n = 1 - Math.abs(2 * n - 1);
    n *= n;
    n *= w;
    w = clamp01(n * 2);
    s += n * a;
    f *= 2.07;
    a *= 0.5;
  }
  return s * 1.6;
}

/* ------------------------------------------------------------------ */
/*  World description                                                  */
/* ------------------------------------------------------------------ */

const Z_NEAR = 140;
const Z_FAR = -640;
const X_EXT = 620;
const WATER_Y = -0.3;

/** x-position of the river centre-line at depth z */
const riverX = (z: number) => -Math.sin(z * 0.012) * 14 - Math.sin(z * 0.031) * 4;

function heightAt(x: number, z: number) {
  const ax = Math.abs(x - riverX(z));

  // domain warp -> twisting spurs and side valleys instead of round blobs
  const wx = x + (fbm(x * 0.004 + 5, z * 0.004, 3) - 0.5) * 120;
  const wz = z + (fbm(x * 0.004 + 9, z * 0.004 + 2, 3) - 0.5) * 120;

  const slopeMask = sm(50, 280, ax);

  // valley walls rising from the river (saturating)
  const wall = 55 * (1 - Math.exp(-Math.pow(Math.max(ax - 30, 0) / 100, 1.3)));

  // ridged mountains, only on the flanks
  const mountain = Math.pow(ridged(wx * 0.0055 + 20, wz * 0.0055 + 40, 6), 1.1) * 175 * slopeMask;
  const detail = (fbm(x * 0.035 + 7, z * 0.035, 4) - 0.5) * 18 * sm(20, 160, ax);

  // the big range closing the valley
  const backRidge = ridged(wx * 0.0042 + 3, wz * 0.0042 + 8, 5);
  const back = sm(-30, -450, z);
  const backH = back * (110 + Math.pow(backRidge, 1.25) * 230) * (0.45 + 0.55 * sm(0, 200, ax));

  // valley floor: gentle meadow undulation, flat near the water
  const floor =
    3 + (fbm(x * 0.03, z * 0.03, 3) - 0.5) * 5 * sm(3, 25, ax) * (1 - sm(25, 60, ax));

  // river channel
  const channel = Math.exp(-(ax * ax) / 128) * 5.5;

  const total = floor + wall + mountain + detail + backH - channel;

  // keep the river running all the way up the valley: the closer to the far range,
  // the narrower the gorge that carries it through
  const w = 32 - 18 * back;
  const carve = Math.exp(-(ax * ax) / (2 * w * w));
  return total * (1 - carve) + (floor - channel) * carve;
}

/* ------------------------------------------------------------------ */
/*  Palette (sRGB hex — THREE.Color converts to linear)                */
/* ------------------------------------------------------------------ */

const GRASS_A = new THREE.Color("#88b84c");
const GRASS_B = new THREE.Color("#5a9636");
const FOREST_A = new THREE.Color("#1c4630");
const FOREST_B = new THREE.Color("#3d6d37");
const ALPINE = new THREE.Color("#9aa066");
const ROCK_A = new THREE.Color("#7d7768");
const ROCK_B = new THREE.Color("#5f5b52");
const SNOW = new THREE.Color("#f4f7fb");
const SAND = new THREE.Color("#bcb08f");
const FIELDS = ["#a8c452", "#cbc46c", "#6fae43", "#b9a85c", "#8fbf4a"].map((h) => new THREE.Color(h));

const SKY_TOP = new THREE.Color("#2a64ad");
const SKY_MID = new THREE.Color("#7db0e2");
const SKY_HORIZON = new THREE.Color("#cfdeeb");
const SUN_COLOR = new THREE.Color("#ffd9a6");
const SUN_DIR = new THREE.Vector3(0.55, 0.34, -0.75).normalize();

/* ------------------------------------------------------------------ */
/*  GLSL shared by terrain + water                                     */
/* ------------------------------------------------------------------ */

const GLSL_NOISE = /* glsl */ `
  float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float vn(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), u.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm3(vec2 p){
    float s = 0.0; float a = 0.5;
    for (int i = 0; i < 3; i++) { s += a * vn(p); p = p * 2.03 + vec2(17.1, 9.2); a *= 0.5; }
    return s;
  }
  float fbm4(vec2 p){
    float s = 0.0; float a = 0.5;
    for (int i = 0; i < 4; i++) { s += a * vn(p); p = p * 2.03 + vec2(17.1, 9.2); a *= 0.5; }
    return s;
  }
`;

/* ------------------------------------------------------------------ */
/*  Builders                                                           */
/* ------------------------------------------------------------------ */

function buildTerrain(segX: number, segZ: number) {
  const geo = new THREE.PlaneGeometry(1, 1, segX, segZ);
  geo.rotateX(-Math.PI / 2);

  const pos = geo.attributes.position as THREE.BufferAttribute;
  const cols = segX + 1;
  const H = new Float32Array(pos.count);

  // pass 1 — positions. Grid is denser near the camera and near the valley axis.
  // NOTE: x is mirrored as well as z is reversed -> net rotation, so triangle winding stays front-facing.
  for (let i = 0; i < pos.count; i++) {
    const u = pos.getX(i) * 2; // -1..1
    const v = pos.getZ(i) + 0.5; // 0..1
    const x = -Math.sign(u) * Math.pow(Math.abs(u), 1.9) * X_EXT;
    const z = Z_NEAR - Math.pow(v, 1.45) * (Z_NEAR - Z_FAR);
    const h = heightAt(x, z);
    H[i] = h;
    pos.setXYZ(i, x, h, z);
  }
  geo.computeVertexNormals();

  // pass 2 — vertex colours, AO and material weights
  const nrm = geo.attributes.normal as THREE.BufferAttribute;
  const colors = new Float32Array(pos.count * 3);
  const mats = new Float32Array(pos.count * 4); // forest, rock, snow, grass
  const c = new THREE.Color();
  const tmp = new THREE.Color();
  const rows = segZ + 1;
  const K = 2; // AO sampling stride in grid cells

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const h = pos.getY(i);
    const z = pos.getZ(i);
    const slope = 1 - nrm.getY(i);
    const ax = Math.abs(x - riverX(z));

    const n = fbm(x * 0.05, z * 0.05, 3);
    const n2 = fbm(x * 0.2 + 9, z * 0.2, 2);
    const n3 = fbm(x * 0.012 + 40, z * 0.012 - 13, 3);

    // weights
    const forest = sm(5, 24, h) * (1 - sm(105, 140, h + (n - 0.5) * 24));
    const rock = Math.max(sm(0.24, 0.5, slope), sm(135, 195, h + (n - 0.5) * 30) * 0.9);
    const snow = sm(195, 245, h + (n2 - 0.5) * 40) * (1 - sm(0.4, 0.7, slope) * 0.7);
    const forestW = forest * (1 - rock);
    const grassW = (1 - forestW) * (1 - rock) * (1 - snow);

    // base colour
    c.copy(GRASS_A).lerp(GRASS_B, clamp01(n * 1.3));
    tmp.copy(FOREST_A).lerp(FOREST_B, clamp01(n3 * 1.5 - 0.15));
    c.lerp(tmp, forestW * (0.75 + 0.25 * n2));
    c.lerp(ALPINE, sm(80, 135, h + (n - 0.5) * 24) * 0.55 * (1 - forestW));
    tmp.copy(ROCK_A).lerp(ROCK_B, clamp01(n2 * 1.4));
    c.lerp(tmp, rock);
    c.lerp(SNOW, snow);

    // terraced farmland / plots on the valley floor
    if (h < 14 && ax > 13 && ax < 62) {
      const patch = sm(0.5, 0.56, fbm(x * 0.012 + 70, z * 0.012, 3));
      const cell = hash2(Math.floor(x / 11), Math.floor(z / 17));
      const f = FIELDS[Math.floor(cell * FIELDS.length) % FIELDS.length];
      c.lerp(f, patch * 0.7 * (1 - sm(40, 62, ax)) * sm(13, 20, ax));
    }

    // riverbank sand
    c.lerp(SAND, (1 - sm(0.2, 1.8, h)) * 0.85);

    // curvature AO (concave = darker, convex = a touch brighter)
    const ix = i % cols;
    const iy = (i / cols) | 0;
    const l = H[iy * cols + Math.max(ix - K, 0)];
    const r = H[iy * cols + Math.min(ix + K, cols - 1)];
    const u = H[Math.max(iy - K, 0) * cols + ix];
    const d = H[Math.min(iy + K, rows - 1) * cols + ix];
    const spacing = Math.max(
      Math.hypot(
        pos.getX(iy * cols + Math.min(ix + K, cols - 1)) - pos.getX(iy * cols + Math.max(ix - K, 0)),
        pos.getZ(iy * cols + Math.min(ix + K, cols - 1)) - pos.getZ(iy * cols + Math.max(ix - K, 0))
      ) / 2,
      0.5
    );
    const conc = ((l + r + u + d) / 4 - h) / spacing;
    const ao = 1 - 0.55 * clamp01(conc * 0.9) + 0.18 * clamp01(-conc * 0.9);

    c.multiplyScalar(ao * (0.92 + 0.16 * n2));
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
    mats[i * 4] = forestW;
    mats[i * 4 + 1] = rock;
    mats[i * 4 + 2] = snow;
    mats[i * 4 + 3] = grassW;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.setAttribute("aMat", new THREE.BufferAttribute(mats, 4));

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.94,
    metalness: 0,
  });

  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
         attribute vec4 aMat;
         varying vec4 vMat;
         varying vec3 vWPos;`
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
         vMat = aMat;
         vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
         varying vec4 vMat;
         varying vec3 vWPos;
         ${GLSL_NOISE}`
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         {
           vec2 p = vWPos.xz;
           float dist = length(vWPos - cameraPosition);
           float nearK = 1.0 - smoothstep(70.0, 340.0, dist);
           float midK  = 1.0 - smoothstep(250.0, 1100.0, dist);

           // forest: individual crowns up close, tonal patches further away
           if (vMat.x > 0.02) {
             float crown = vn(p * 0.85) * 0.55 + vn(p * 2.4) * 0.45;
             diffuseColor.rgb *= mix(1.0, 0.6 + 0.75 * crown, vMat.x * nearK);
             float tone = fbm3(p * 0.05);
             diffuseColor.rgb *= mix(1.0, 0.72 + 0.6 * tone, vMat.x * midK);
           }

           // rock: broken strata + cracks + warm iron streaks
           if (vMat.y > 0.02) {
             float strata = sin(vWPos.y * 0.23 + fbm3(p * 0.03) * 10.0);
             float crack = fbm3(p * 0.3);
             float rk = 0.88 + 0.12 * strata + 0.34 * (crack - 0.5);
             diffuseColor.rgb *= mix(1.0, rk, vMat.y * midK);
             diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(1.14, 0.96, 0.78), vMat.y * fbm3(p * 0.018 + 3.0) * 0.7 * midK);
           }

           // grass: streaky wind pattern
           if (vMat.w > 0.02 && nearK > 0.0) {
             float gr = vn(p * vec2(1.6, 3.2)) * 0.6 + vn(p * 7.0) * 0.4;
             diffuseColor.rgb *= mix(1.0, 0.82 + 0.34 * gr, vMat.w * nearK);
           }

           // snow: cool shadows in the hollows
           if (vMat.z > 0.02) {
             diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.9, 0.95, 1.0), vMat.z * (0.35 + 0.35 * fbm3(p * 0.08)));
           }
         }`
      )
      .replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
         {
           float dist2 = length(vWPos - cameraPosition);
           float amp = (0.32 * vMat.y + 0.14 * vMat.x + 0.06 * vMat.w + 0.08 * vMat.z) * (1.0 - smoothstep(140.0, 800.0, dist2));
           if (amp > 0.01) {
             vec2 q = vWPos.xz * 0.45;
             float e = 0.3;
             float c0 = fbm3(q);
             float cx = fbm3(q + vec2(e, 0.0));
             float cz = fbm3(q + vec2(0.0, e));
             vec3 g = vec3((c0 - cx) / e, 0.0, (c0 - cz) / e);
             vec3 nW = inverseTransformDirection(normal, viewMatrix);
             nW = normalize(nW + g * amp);
             normal = normalize((viewMatrix * vec4(nW, 0.0)).xyz);
           }
         }`
      );
  };

  return new THREE.Mesh(geo, mat);
}

function buildWater(timeUniform: { value: number }) {
  const geo = new THREE.PlaneGeometry(240, 800, 1, 1);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshStandardMaterial({
    color: "#4f8189",
    emissive: "#0b2a30",
    emissiveIntensity: 0.4,
    roughness: 0.06,
    metalness: 0.15,
    transparent: true,
    opacity: 0.94,
    envMapIntensity: 1.4,
  });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = timeUniform;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;")
      .replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;"
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
         uniform float uTime;
         varying vec3 vWPos;
         ${GLSL_NOISE}`
      )
      .replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
         {
           vec2 q = vec2(vWPos.x * 0.9, vWPos.z * 0.32 + uTime * 1.6);
           float a = vn(q) + 0.5 * vn(q * 2.3 + 4.0);
           float b = vn(q + vec2(0.6, 0.0)) + 0.5 * vn((q + vec2(0.6, 0.0)) * 2.3 + 4.0);
           float c = vn(q + vec2(0.0, 0.6)) + 0.5 * vn((q + vec2(0.0, 0.6)) * 2.3 + 4.0);
           float k = 0.22 * (1.0 - smoothstep(120.0, 600.0, length(vWPos - cameraPosition)));
           vec3 nW = inverseTransformDirection(normal, viewMatrix);
           nW = normalize(nW + vec3((a - b) * k, 0.0, (a - c) * k));
           normal = normalize((viewMatrix * vec4(nW, 0.0)).xyz);
         }`
      );
  };
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, WATER_Y, -230);
  return mesh;
}

function makePineGeometry() {
  const parts: THREE.BufferGeometry[] = [];
  const tiers: [number, number, number][] = [
    [1.05, 2.3, 0.7],
    [0.82, 2.1, 1.75],
    [0.58, 1.9, 2.75],
    [0.32, 1.3, 3.7],
  ];
  const trunk = new THREE.CylinderGeometry(0.1, 0.16, 1.0, 5, 1);
  trunk.translate(0, 0.5, 0);
  parts.push(trunk);
  for (const [r, h, y] of tiers) {
    const cone = new THREE.ConeGeometry(r, h, 8, 1);
    cone.translate(0, y + h / 2, 0);
    parts.push(cone);
  }
  const merged = mergeGeometries(parts, false) ?? new THREE.ConeGeometry(1, 4, 7, 1);
  parts.forEach((p) => p.dispose());
  return merged;
}

function buildTrees(attempts: number) {
  const rnd = mulberry32(1337);
  const items: { x: number; y: number; z: number; r: number; h: number; t: number; ry: number }[] = [];

  for (let i = 0; i < attempts; i++) {
    const x = (rnd() * 2 - 1) * 170;
    const z = 120 - rnd() * 360;
    const h = heightAt(x, z);
    if (h < 1.6 || h > 105) continue;

    const e = 2;
    const dx = heightAt(x + e, z) - heightAt(x - e, z);
    const dz = heightAt(x, z + e) - heightAt(x, z - e);
    const slope = Math.hypot(dx, dz) / (2 * e);
    if (slope > 0.75) continue;

    const ax = Math.abs(x - riverX(z));
    const patch = fbm(x * 0.022 + 50, z * 0.022, 3);
    let p = sm(0.36, 0.5, patch);
    if (ax < 24) p *= 0.1; // keep the valley floor open — that's where the plots are
    if (h > 78) p *= 1 - (h - 78) / 27;
    if (rnd() > p) continue;

    const s = 0.7 + rnd() * 0.85;
    items.push({
      x,
      y: h - 0.3,
      z,
      r: s * (0.85 + rnd() * 0.3),
      h: s * (0.95 + rnd() * 0.5),
      t: rnd() * 0.75 + clamp01((h - 25) / 70) * 0.25,
      ry: rnd() * Math.PI * 2,
    });
  }

  const geo = makePineGeometry();
  const mat = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.95 });
  const mesh = new THREE.InstancedMesh(geo, mat, Math.max(items.length, 1));
  mesh.count = items.length;
  mesh.frustumCulled = false;

  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  const p = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const a = new THREE.Color("#173d2a");
  const b = new THREE.Color("#456f3a");
  const col = new THREE.Color();

  items.forEach((it, i) => {
    q.setFromAxisAngle(up, it.ry);
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

function buildSky(radius: number) {
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
  return new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 20), mat);
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
      readyRef.current?.(); // no WebGL — CSS gradient behind the canvas stays
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setClearColor(SKY_HORIZON);
    const canvas = renderer.domElement;
    canvas.style.cssText = "display:block;width:100%;height:100%;";
    container.appendChild(canvas);

    /* ---------- scene ---------- */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(SKY_HORIZON.clone(), 0.0022);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.5, 3600);

    const sky = buildSky(1900);
    scene.add(sky);

    // image-based lighting + water reflections straight from the sky dome
    let envTarget: THREE.WebGLRenderTarget | null = null;
    try {
      const envScene = new THREE.Scene();
      const envSky = buildSky(50);
      envScene.add(envSky);
      const pmrem = new THREE.PMREMGenerator(renderer);
      envTarget = pmrem.fromScene(envScene, 0, 1, 200);
      scene.environment = envTarget.texture;
      scene.environmentIntensity = 0.7;
      pmrem.dispose();
      envSky.geometry.dispose();
      (envSky.material as THREE.Material).dispose();
    } catch {
      /* falls back to plain lights */
    }

    scene.add(new THREE.HemisphereLight(0xbfd8ff, 0x55603a, 0.5));
    const key = new THREE.DirectionalLight(0xffe0b0, 3.2);
    key.position.copy(SUN_DIR).multiplyScalar(400);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe9ff, 0.9);
    fill.position.set(-120, 90, 160);
    scene.add(fill);

    const waterTime = { value: 0 };
    const terrain = buildTerrain(isMobile ? 190 : 330, isMobile ? 210 : 370);
    scene.add(terrain);
    scene.add(buildWater(waterTime));
    scene.add(buildTrees(isMobile ? 5000 : 11000));

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
    const END_POS = new THREE.Vector3(0, 17, 78);
    const END_TGT = new THREE.Vector3(0, 66, -175);
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
      camera.fov = aspect < 1 ? 55 + (1 - aspect) * 32 : 55;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    /* ---------- loop ---------- */
    let last = performance.now();
    let t = 0;
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

      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      waterTime.value = t;

      if (startedRef.current && introStart < 0) introStart = t;
      const p = reduceMotion ? 1 : introStart < 0 ? 0 : clamp01((t - introStart) / INTRO_SECONDS);
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
      last = performance.now();
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
      envTarget?.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}
