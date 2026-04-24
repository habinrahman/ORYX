"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useRef } from "react";
import type { Group } from "three";

/**
 * Lightweight R3F atmosphere: two Sparkles layers + Float drift.
 * Sits under the hero / scene grade — additive “dust in the beam”, not a VFX reel.
 */
function DepthParticles() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = t * 0.016;
    g.rotation.x = Math.sin(t * 0.035) * 0.022;
    g.position.y = 0.12 + Math.sin(t * 0.055) * 0.06;
  });

  return (
    <group ref={group} position={[0, 0, -3.4]}>
      <Float speed={0.5} rotationIntensity={0.035} floatIntensity={0.12}>
        <Sparkles
          count={42}
          scale={[19, 13, 7]}
          size={2.2}
          speed={0.1}
          opacity={0.19}
          color="#c9a86c"
          noise={0.14}
        />
      </Float>
      <Sparkles
        count={150}
        scale={[21, 16, 9]}
        size={0.62}
        speed={0.24}
        opacity={0.1}
        color="#efe6d8"
        noise={0.48}
      />
    </group>
  );
}

export function CinematicDepthField() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 mix-blend-soft-light opacity-[0.76] contrast-[1.02] saturate-[1.05]"
    >
      <Canvas
        dpr={[1, 1.35]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "default",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 7.4], fov: 40, near: 0.1, far: 26 }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
      >
        <Suspense fallback={null}>
          <DepthParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
