"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PALETTE = ["#AEBEFF", "#D0DD57", "#EF5541", "#C8A8FF", "#8FAEFF"];

// Module-level pointer target — shared between event listeners and useFrame
const pointer = { x: 0, y: 0 };
const lerped = { x: 0, y: 0 };

function Particles({ count = 1800, opacity = 0.6, size = 0.02 }: { count?: number; opacity?: number; size?: number }) {
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

    // Faster lerp on mobile so gyro tracks without lag
    const lerpFactor = 0.18;
    lerped.x += (pointer.x - lerped.x) * lerpFactor;
    lerped.y += (pointer.y - lerped.y) * lerpFactor;

    // Base animation + parallax offset
    points.current.rotation.y = t * 0.012 + lerped.x * 0.7;
    points.current.rotation.x = Math.sin(t * 0.006) * 0.08 + lerped.y * 0.5;

    const breathe = 1 + Math.sin(t * 0.3) * 0.02;
    points.current.scale.setScalar(breathe);
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={size}
        sizeAttenuation
        vertexColors
        transparent
        opacity={opacity}
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

interface ParticleFieldProps {
  transparent?: boolean;
  particleCount?: number;
  particleOpacity?: number;
  particleSize?: number;
}

export default function ParticleField({ transparent = false, particleCount, particleOpacity, particleSize }: ParticleFieldProps = {}) {
  const isMobile = useIsMobile();
  const [ready, setReady] = useState(false);
  const count = particleCount ?? (isMobile ? 600 : 1800);
  const opacity = particleOpacity ?? 0.6;
  const size = particleSize ?? 0.02;

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
    // gamma = left/right tilt (-90 to 90), beta = front/back tilt (-180 to 180)
    // Divide by smaller numbers so normal hand movements (~10-20°) give full range
    const handleGyro = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0;
      const beta  = e.beta  ?? 45;
      pointer.x = Math.max(-1.5, Math.min(1.5, gamma / 18));
      pointer.y = Math.max(-1.5, Math.min(1.5, (beta - 45) / 20));
    };

    // Mobile: touch-drag — cumulative rotation that persists after lift
    let lastTouchX = 0;
    let lastTouchY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let dragging = false;
    let decayRaf = 0;

    const decay = () => {
      if (dragging) return;
      velocityX *= 0.95;
      velocityY *= 0.95;
      pointer.x = Math.max(-2, Math.min(2, pointer.x + velocityX));
      pointer.y = Math.max(-2, Math.min(2, pointer.y + velocityY));
      if (Math.abs(velocityX) > 0.0005 || Math.abs(velocityY) > 0.0005) {
        decayRaf = requestAnimationFrame(decay);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      dragging = true;
      cancelAnimationFrame(decayRaf);
      lastTouchX = e.touches[0].clientX;
      lastTouchY = e.touches[0].clientY;
      velocityX = 0;
      velocityY = 0;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const tx = e.touches[0].clientX;
      const ty = e.touches[0].clientY;
      const dx = (tx - lastTouchX) / window.innerWidth;
      const dy = (ty - lastTouchY) / window.innerHeight;
      pointer.x = Math.max(-2, Math.min(2, pointer.x + dx * 2));
      pointer.y = Math.max(-2, Math.min(2, pointer.y - dy * 2));
      velocityX = dx * 2;
      velocityY = -dy * 2;
      lastTouchX = tx;
      lastTouchY = ty;
    };
    const handleTouchEnd = () => {
      dragging = false;
      decayRaf = requestAnimationFrame(decay);
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

    // touchend is more reliable than touchstart for iOS permission dialogs
    window.addEventListener("touchend", requestGyro, { once: true });

    return () => {
      cancelAnimationFrame(decayRaf);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("deviceorientation", handleGyro);
      window.removeEventListener("touchend", requestGyro);
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
        if (transparent) {
          gl.setClearColor(0x000000, 0);
        } else {
          gl.setClearColor(0x0a0a0b, 1);
        }
      }}
    >
      <Particles count={count} opacity={opacity} size={size} />
    </Canvas>
  );
}
