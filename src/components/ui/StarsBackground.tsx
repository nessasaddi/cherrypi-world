"use client";

import { useEffect, useState } from "react";

function generateShadows(count: number, color: string, range = 2000): string {
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * range * 2) - range;
    const y = Math.floor(Math.random() * range * 2) - range;
    parts.push(`${x}px ${y}px ${color}`);
  }
  return parts.join(", ");
}

type LayerProps = {
  count: number;
  size: number;
  duration: number;
  color: string;
};

function StarLayer({ count, size, duration, color }: LayerProps) {
  const [shadows, setShadows] = useState<string>("");

  useEffect(() => {
    setShadows(generateShadows(count, color));
  }, [count, color]);

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
        style={{
          width: size,
          height: size,
          top: 2000,
          boxShadow: shadows,
        }}
      />
    </div>
  );
}

type StarsBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
  starColor?: string;
  speed?: number;
};

export default function StarsBackground({
  children,
  className,
  starColor = "#ffffff",
  speed = 120,
}: StarsBackgroundProps) {
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        background:
          "radial-gradient(ellipse at bottom, #1a1a1a 0%, #0a0a0a 70%, #000 100%)",
      }}
    >
      {/* Star layers — different sizes & speeds for parallax feel */}
      <div className="absolute inset-0 pointer-events-none">
        <StarLayer count={800} size={0.75} duration={speed} color={starColor} />
        <StarLayer
          count={300}
          size={1.25}
          duration={speed * 1.8}
          color={starColor}
        />
        <StarLayer
          count={120}
          size={1.75}
          duration={speed * 2.6}
          color={starColor}
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
