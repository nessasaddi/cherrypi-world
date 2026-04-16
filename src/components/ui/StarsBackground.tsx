"use client";

import { useEffect, useRef, useState } from "react";

const BRAND_PALETTE = [
  "#AEBEFF", // lavender
  "#D0DD57", // lime
  "#EF5541", // cherry
  "#C8A8FF", // purple
  "#8FAEFF", // sky
];

// Module-level pointer shared between event listeners and rAF loop
// (same pattern as the previous ParticleField)
const pointer = { x: 0, y: 0 };
const lerped = { x: 0, y: 0 };

function generateShadows(
  count: number,
  colors: string[],
  range = 2000,
): string {
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * range * 2) - range;
    const y = Math.floor(Math.random() * range * 2) - range;
    const color = colors[Math.floor(Math.random() * colors.length)];
    parts.push(`${x}px ${y}px ${color}`);
  }
  return parts.join(", ");
}

type LayerProps = {
  count: number;
  size: number;
  duration: number;
  colors: string[];
};

function StarLayer({ count, size, duration, colors }: LayerProps) {
  const [shadows, setShadows] = useState<string>("");

  useEffect(() => {
    setShadows(generateShadows(count, colors));
  }, [count, colors]);

  if (!shadows) return null;

  return (
    <div
      className="absolute top-0 left-0 w-full"
      style={{
        height: 2000,
        animation: `stars-drift ${duration}s linear infinite`,
      }}
    >
      <div
        className="absolute rounded-full bg-transparent"
        style={{ width: size, height: size, boxShadow: shadows }}
      />
      <div
        className="absolute rounded-full bg-transparent"
        style={{ width: size, height: size, top: 2000, boxShadow: shadows }}
      />
    </div>
  );
}

type StarsBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
  parallaxStrength?: number;
};

export default function StarsBackground({
  children,
  className,
  colors = BRAND_PALETTE,
  speed = 120,
  parallaxStrength = 28,
}: StarsBackgroundProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Pointer tracking + rAF loop for smooth parallax
  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const k = 0.12; // lerp factor — lower = smoother
      lerped.x += (pointer.x - lerped.x) * k;
      lerped.y += (pointer.y - lerped.y) * k;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(${
          lerped.x * parallaxStrength
        }px, ${lerped.y * parallaxStrength}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Desktop: mouse move
    const handleMouse = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Mobile: gyroscope
    const handleGyro = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 45;
      pointer.x = Math.max(-1.5, Math.min(1.5, gamma / 18));
      pointer.y = Math.max(-1.5, Math.min(1.5, (beta - 45) / 20));
    };

    // Mobile: touch-drag w/ velocity decay (persists after lift)
    let lastTX = 0;
    let lastTY = 0;
    let vX = 0;
    let vY = 0;
    let dragging = false;
    let decayRaf = 0;
    const decay = () => {
      if (dragging) return;
      vX *= 0.95;
      vY *= 0.95;
      pointer.x = Math.max(-2, Math.min(2, pointer.x + vX));
      pointer.y = Math.max(-2, Math.min(2, pointer.y + vY));
      if (Math.abs(vX) > 0.0005 || Math.abs(vY) > 0.0005) {
        decayRaf = requestAnimationFrame(decay);
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      dragging = true;
      cancelAnimationFrame(decayRaf);
      lastTX = e.touches[0].clientX;
      lastTY = e.touches[0].clientY;
      vX = 0;
      vY = 0;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const tx = e.touches[0].clientX;
      const ty = e.touches[0].clientY;
      const dx = (tx - lastTX) / window.innerWidth;
      const dy = (ty - lastTY) / window.innerHeight;
      pointer.x = Math.max(-2, Math.min(2, pointer.x + dx * 2));
      pointer.y = Math.max(-2, Math.min(2, pointer.y - dy * 2));
      vX = dx * 2;
      vY = -dy * 2;
      lastTX = tx;
      lastTY = ty;
    };
    const handleTouchEnd = () => {
      dragging = false;
      decayRaf = requestAnimationFrame(decay);
    };

    // iOS 13+ requires permission before deviceorientation fires
    const requestGyro = () => {
      const DOE = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };
      if (typeof DOE.requestPermission === "function") {
        DOE.requestPermission()
          .then((state) => {
            if (state === "granted") {
              window.addEventListener("deviceorientation", handleGyro);
            }
          })
          .catch(() => {});
      } else {
        // Android — attach directly
        window.addEventListener("deviceorientation", handleGyro);
      }
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchend", requestGyro, { once: true });

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(decayRaf);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("deviceorientation", handleGyro);
      window.removeEventListener("touchend", requestGyro);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [parallaxStrength]);

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        background:
          "radial-gradient(ellipse at bottom, #1a1a1a 0%, #0a0a0a 70%, #000 100%)",
      }}
    >
      {/* Parallax wrapper — pointer-driven transform applied here */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <StarLayer count={800} size={0.75} duration={speed} colors={colors} />
        <StarLayer
          count={300}
          size={1.25}
          duration={speed * 1.8}
          colors={colors}
        />
        <StarLayer
          count={120}
          size={1.75}
          duration={speed * 2.6}
          colors={colors}
        />
      </div>

      <style jsx>{`
        @keyframes stars-drift {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>

      {children}
    </div>
  );
}
