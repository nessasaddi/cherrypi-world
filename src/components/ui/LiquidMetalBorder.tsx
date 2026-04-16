"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useRef } from "react";

interface LiquidMetalBorderProps {
  children: React.ReactNode;
  borderWidth?: number;
  borderRadius?: number;
  innerBackground?: string;
  className?: string;
}

export function LiquidMetalBorder({
  children,
  borderWidth = 2,
  borderRadius = 20,
  innerBackground = "transparent",
  className,
}: LiquidMetalBorderProps) {
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<InstanceType<typeof ShaderMount> | null>(null);

  useEffect(() => {
    const styleId = "lm-border-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .lm-border-shader canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }

    if (shaderRef.current) {
      shaderMount.current?.dispose?.();
      shaderMount.current = new ShaderMount(
        shaderRef.current,
        liquidMetalFragmentShader,
        {
          u_repetition: 3,
          u_softness: 0.45,
          u_shiftRed: 0.15,
          u_shiftBlue: 0.15,
          u_distortion: 0.1,
          u_contour: 0,
          u_angle: 45,
          u_scale: 6,
          u_shape: 1,
          u_offsetX: 0.1,
          u_offsetY: -0.1,
        },
        undefined,
        0.3,
      );
    }

    return () => {
      shaderMount.current?.dispose?.();
      shaderMount.current = null;
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        borderRadius,
        padding: borderWidth,
        overflow: "hidden",
        boxShadow:
          "0 0 0 1px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Shader layer — fills outer container, shows through the border */}
      <div
        ref={shaderRef}
        className="lm-border-shader"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          overflow: "hidden",
          zIndex: 1,
        }}
      />

      {/* Inner content — covers the shader except at the border */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          borderRadius: Math.max(borderRadius - borderWidth, 0),
          overflow: "hidden",
          background: innerBackground,
        }}
      >
        {children}
      </div>
    </div>
  );
}
