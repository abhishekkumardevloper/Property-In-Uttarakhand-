"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Fog, Points, BufferGeometry, Float32BufferAttribute } from "three";
import * as THREE from "three";

// Layered mountain ridge geometry
function MountainLayer({
  zPos,
  color,
  roughness,
  yOffset = 0,
  scale = 1,
}: {
  zPos: number;
  color: string;
  roughness?: number;
  yOffset?: number;
  scale?: number;
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 20, 120, 60);
    const positions = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];

      // Create mountain ridge profile
      const ridgeProfile =
        Math.exp(-Math.pow(x / 10, 2)) * 8 * scale +
        Math.exp(-Math.pow((x - 8) / 6, 2)) * 5 * scale +
        Math.exp(-Math.pow((x + 12) / 8, 2)) * 4 * scale +
        Math.exp(-Math.pow((x + 4) / 4, 2)) * 3 * scale;

      // Add terrain noise
      const noise =
        Math.sin(x * 0.8) * 0.8 +
        Math.sin(x * 1.7 + 1.3) * 0.5 +
        Math.sin(x * 3.1 + 2.1) * 0.3 +
        Math.sin(x * 0.3 + y * 0.2) * 1.2;

      positions[i + 2] = ridgeProfile + noise * (roughness ?? 1);
    }

    geo.computeVertexNormals();
    return geo;
  }, [roughness, scale]);

  return (
    <mesh
      geometry={geometry}
      position={[0, yOffset - 4, zPos]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <meshStandardMaterial
        color={color}
        roughness={0.95}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Atmospheric mist particles
function MistParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, count } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
    }
    return { positions, count };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.position.x = Math.sin(time) * 2;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#c8cdd0"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Animated cloud layer (simple plane with texture)
function CloudPlane({ z, y }: { z: number; y: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.x =
      Math.sin(state.clock.elapsedTime * 0.05 + z) * 5;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.opacity =
      0.3 + Math.sin(state.clock.elapsedTime * 0.2 + z) * 0.15;
  });

  return (
    <mesh ref={ref} position={[0, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 15, 1, 1]} />
      <meshStandardMaterial
        color="#e8eaeb"
        transparent
        opacity={0.3}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Camera animation
function CameraController() {
  const { camera } = useThree();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    // Gentle breathing movement
    camera.position.x = Math.sin(time * 0.08) * 1.5;
    camera.position.y = 5 + Math.sin(time * 0.12) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface MountainSceneProps {
  height?: string;
  reducedQuality?: boolean;
}

export default function MountainScene({
  height = "100vh",
  reducedQuality = false,
}: MountainSceneProps) {
  return (
    <div style={{ width: "100%", height, position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 5, 20], fov: 55 }}
        gl={{ antialias: !reducedQuality, alpha: false }}
        dpr={reducedQuality ? [1, 1] : [1, 2]}
      >
        {/* Atmosphere */}
        <fog attach="fog" args={["#1a2e22", 15, 60]} />

        {/* Sky background */}
        <color attach="background" args={["#0d1f17"]} />

        {/* Lighting — golden hour */}
        <ambientLight intensity={0.4} color="#ffd8a0" />
        <directionalLight
          position={[-20, 15, -10]}
          intensity={1.2}
          color="#ffb347"
          castShadow={false}
        />
        <directionalLight
          position={[15, 10, 5]}
          intensity={0.3}
          color="#88aaff"
        />
        <pointLight position={[0, 20, 0]} intensity={0.2} color="#ffd8a0" />

        {/* Mountain layers — far to near */}
        <MountainLayer
          zPos={-25}
          color="#1a3025"
          roughness={0.6}
          yOffset={3}
          scale={0.6}
        />
        <MountainLayer
          zPos={-18}
          color="#1e3a2a"
          roughness={0.8}
          yOffset={2}
          scale={0.85}
        />
        <MountainLayer
          zPos={-10}
          color="#243d2e"
          roughness={1.0}
          yOffset={0}
          scale={1.0}
        />
        <MountainLayer
          zPos={-4}
          color="#1a2e22"
          roughness={1.2}
          yOffset={-2}
          scale={1.2}
        />

        {/* Ground plane */}
        <mesh position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#111a14" roughness={1} />
        </mesh>

        {/* Clouds */}
        {!reducedQuality && (
          <>
            <CloudPlane z={-20} y={4} />
            <CloudPlane z={-12} y={3} />
            <CloudPlane z={-6} y={1} />
          </>
        )}

        {/* Mist particles */}
        <MistParticles />

        {/* Camera */}
        <CameraController />
      </Canvas>
    </div>
  );
}
