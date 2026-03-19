"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PALETTE = ["#AEBEFF", "#D0DD57", "#EF5541", "#C8A8FF", "#8FAEFF"];

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

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

export default function ParticleField() {
  const isMobile = useIsMobile();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check for WebGL support before rendering Canvas
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (gl) setReady(true);
    } catch {
      // No WebGL — don't render the canvas at all
    }
  }, []);

  useEffect(() => {
    // Desktop: mouse parallax
    const handleMouse = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Mobile: gyroscope parallax
    const handleGyro = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0;
      const beta  = e.beta  ?? 45;
      pointer.x = Math.max(-1, Math.min(1, gamma / 45));
      pointer.y = Math.max(-1, Math.min(1, (beta - 45) / 45));
    };

    // Mobile: touch-drag fallback when gyroscope isn't available
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      pointer.x = Math.max(-1, Math.min(1, dx / (window.innerWidth * 0.3)));
      pointer.y = Math.max(-1, Math.min(1, -dy / (window.innerHeight * 0.3)));
    };
    const handleTouchEnd = () => {
      pointer.x = 0;
      pointer.y = 0;
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // iOS 13+ requires permission before deviceorientation fires
    let gyroGranted = false;
    const requestGyro = () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === "function"
      ) {
        (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> })
          .requestPermission()
          .then((state) => {
            if (state === "granted") {
              gyroGranted = true;
              window.addEventListener("deviceorientation", handleGyro);
            }
          })
          .catch(() => {});
      } else {
        // Android — just attach directly, and check if it actually fires
        let gyroFired = false;
        const testGyro = () => { gyroFired = true; };
        window.addEventListener("deviceorientation", testGyro);
        setTimeout(() => {
          window.removeEventListener("deviceorientation", testGyro);
          if (gyroFired) {
            gyroGranted = true;
            window.addEventListener("deviceorientation", handleGyro);
          }
        }, 1000);
      }
    };

    window.addEventListener("touchstart", requestGyro, { once: true });

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("deviceorientation", handleGyro);
      window.removeEventListener("touchstart", requestGyro);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  if (!ready) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 72 }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: isMobile ? "low-power" : "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x0a0a0b, 1);
      }}
    >
      <Particles count={isMobile ? 600 : 1800} />
    </Canvas>
  );
}
