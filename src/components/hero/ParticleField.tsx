"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PALETTE = ["#AEBEFF", "#D0DD57", "#EF5541", "#EF554160", "#AEBEFF80"];

// Module-level pointer target — shared between event listeners and useFrame
const pointer = { x: 0, y: 0 };
const lerped = { x: 0, y: 0 };

function Particles({ count = 1800 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = PALETTE.map((c) => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;

    // Smooth lerp toward pointer target
    lerped.x += (pointer.x - lerped.x) * 0.04;
    lerped.y += (pointer.y - lerped.y) * 0.04;

    // Base animation + parallax offset
    points.current.rotation.y = t * 0.012 + lerped.x * 0.3;
    points.current.rotation.x = Math.sin(t * 0.006) * 0.08 + lerped.y * 0.2;

    const breathe = 1 + Math.sin(t * 0.3) * 0.02;
    points.current.scale.setScalar(breathe);
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField() {
  useEffect(() => {
    // Desktop: mouse parallax
    const handleMouse = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Mobile: gyroscope parallax
    const handleGyro = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left/right tilt (-90 to 90)
      const beta  = e.beta  ?? 45; // front/back tilt (0 to 180)
      pointer.x = Math.max(-1, Math.min(1, gamma / 45));
      pointer.y = Math.max(-1, Math.min(1, (beta - 45) / 45));
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("deviceorientation", handleGyro);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("deviceorientation", handleGyro);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 72 }}
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x0a0a0b, 1);
      }}
    >
      <Particles />
    </Canvas>
  );
}
