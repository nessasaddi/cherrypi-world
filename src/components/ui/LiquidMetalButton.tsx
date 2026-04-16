"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { useEffect, useRef, useState } from "react";

interface LiquidMetalButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export function LiquidMetalButton({
  label = "Start a conversation",
  href,
  onClick,
  icon,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<InstanceType<typeof ShaderMount> | null>(null);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const rippleId = useRef(0);

  const W = 188;
  const H = 40;

  useEffect(() => {
    const styleId = "lmb-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .lmb-shader canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes lmb-ripple {
          0%   { transform: translate(-50%, -50%) scale(0); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(5); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    if (shaderRef.current) {
      shaderMount.current?.destroy?.();
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
        0.4,
      );
    }

    return () => {
      shaderMount.current?.destroy?.();
      shaderMount.current = null;
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1.4);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.5);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    shaderMount.current?.setSpeed?.(2.8);
    setTimeout(() => {
      shaderMount.current?.setSpeed?.(isHovered ? 1.4 : 0.5);
    }, 300);

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = { x, y, id: rippleId.current++ };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 600);

    onClick?.();
  };

  const pressStyle = isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)";
  const transition = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";

  const innerContent = (
    <>
      {/* Text + icon layer */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, width: W, height: H,
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 8, zIndex: 30, pointerEvents: "none",
          transform: "translateZ(20px)", transformStyle: "preserve-3d",
        }}
      >
        <span style={{
          fontSize: 13, fontWeight: 500, color: "#2a2a2a",
          letterSpacing: "0.01em", whiteSpace: "nowrap",
          fontFamily: "var(--font-body), sans-serif",
          transition,
        }}>
          {label}
        </span>
        {icon}
      </div>

      {/* Inner cherry red layer */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, width: W, height: H,
          zIndex: 20, transformStyle: "preserve-3d",
          transform: `translateZ(10px) ${pressStyle}`, transition,
        }}
      >
        <div style={{
          width: W - 4, height: H - 4, margin: 2, borderRadius: 100,
          background: "linear-gradient(160deg, #f0f0f0 0%, #e4e4e4 50%, #d0d0d0 100%)",
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.15)"
            : "inset 0 1px 0 rgba(255,255,255,0.7)",
          transition,
        }} />
      </div>

      {/* Shader metallic sheen layer */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, width: W, height: H,
          zIndex: 10, transformStyle: "preserve-3d",
          transform: `translateZ(0px) ${pressStyle}`, transition,
        }}
      >
        <div style={{
          width: W, height: H, borderRadius: 100,
          boxShadow: isPressed
            ? "0 0 0 1px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.1)"
            : isHovered
              ? "0 0 0 1px rgba(0,0,0,0.1), 0 6px 18px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06)"
              : "0 0 0 1px rgba(0,0,0,0.08), 0 3px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.05)",
          transition,
        }}>
          <div
            ref={shaderRef}
            className="lmb-shader"
            style={{
              borderRadius: 100, overflow: "hidden", position: "relative",
              width: W, height: H,
              opacity: isHovered ? 0.55 : 0.4,
              mixBlendMode: "overlay",
              transition: "opacity 0.4s ease",
            }}
          />
        </div>
      </div>
    </>
  );

  const sharedInteractionProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onClick: handleClick,
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute", top: 0, left: 0, width: W, height: H,
    background: "transparent", border: "none", cursor: "pointer",
    outline: "none", zIndex: 40, overflow: "hidden", borderRadius: 100,
    transform: "translateZ(25px)", transformStyle: "preserve-3d", transition,
  };

  return (
    <div style={{ perspective: 1000 }}>
      <div style={{
        position: "relative", width: W, height: H,
        transformStyle: "preserve-3d", transition,
      }}>
        {innerContent}

        {href ? (
          <a
            ref={buttonRef as React.RefObject<HTMLAnchorElement>}
            href={href}
            style={overlayStyle}
            aria-label={label}
            {...sharedInteractionProps}
          >
            {ripples.map((r) => (
              <span key={r.id} style={{
                position: "absolute", left: r.x, top: r.y,
                width: 20, height: 20, borderRadius: "50%", pointerEvents: "none",
                background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)",
                animation: "lmb-ripple 0.6s ease-out",
              }} />
            ))}
          </a>
        ) : (
          <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            style={overlayStyle}
            aria-label={label}
            {...sharedInteractionProps}
          >
            {ripples.map((r) => (
              <span key={r.id} style={{
                position: "absolute", left: r.x, top: r.y,
                width: 20, height: 20, borderRadius: "50%", pointerEvents: "none",
                background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)",
                animation: "lmb-ripple 0.6s ease-out",
              }} />
            ))}
          </button>
        )}
      </div>
    </div>
  );
}
