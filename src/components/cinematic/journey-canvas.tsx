"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function EmberMesh({ heat }: { heat: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * (0.12 + heat * 0.1);
    ref.current.rotation.y += dt * (0.18 + heat * 0.12);
  });
  const color = useMemo(() => new THREE.Color().setHSL(0.08, 0.85, 0.55), []);
  return (
    <Float speed={2.2} rotationIntensity={0.55} floatIntensity={0.85}>
      <mesh ref={ref} scale={1.1 + heat * 0.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.14 + heat * 0.22}
        />
      </mesh>
    </Float>
  );
}

type JourneyCanvasProps = {
  progress: number;
  /** Lighter WebGL on phones for sustained 60fps feel. */
  lowPower?: boolean;
};

/** High-energy ambient layer — warmer spark + faster drift (food-reel glow). */
export function JourneyCanvas({ progress, lowPower }: JourneyCanvasProps) {
  const heat = THREE.MathUtils.clamp(progress * 1.55, 0.2, 1);
  const count = lowPower ? 28 : 72;
  const count2 = lowPower ? 16 : 36;
  const dpr: [number, number] = lowPower ? [1, 1.25] : [1, 2];
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[1] transition-opacity duration-500 ${lowPower ? "opacity-[0.14]" : "opacity-[0.32]"}`}
      aria-hidden
    >
      <Canvas
        dpr={dpr}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.15, 6.2], fov: 48 }}
      >
        <Sparkles
          count={count}
          scale={16}
          size={2.2}
          speed={0.35 + progress * 0.45}
          opacity={0.1 + heat * 0.18}
          color="#ffb347"
        />
        <Sparkles
          count={count2}
          scale={12}
          size={1.4}
          speed={0.22}
          opacity={0.06 + heat * 0.1}
          color="#ff6b9d"
        />
        <EmberMesh heat={heat} />
      </Canvas>
    </div>
  );
}
