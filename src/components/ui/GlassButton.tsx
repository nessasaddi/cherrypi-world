"use client";

import Link from "next/link";

interface GlassButtonProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  href?: string;
  onClick?: () => void;
}

export default function GlassButton({ icon, title, subtitle, href, onClick }: GlassButtonProps) {
  const inner = (
    <span
      className="group relative flex items-center gap-3 overflow-hidden"
      style={{
        padding: "10px 16px 10px 10px",
        borderRadius: 18,
        border: "1px solid rgba(239,85,65,0.25)",
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 0 0 1px rgba(239,85,65,0.08), 0 4px 24px rgba(239,85,65,0.10), 0 1px 4px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease, transform 0.18s ease",
        cursor: "pointer",
        display: "inline-flex",
      }}
    >
      {/* Gradient glow overlay — brightens on hover */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: 18,
          background: "radial-gradient(ellipse at 30% 50%, rgba(239,85,65,0.12) 0%, transparent 70%)",
          opacity: 1,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Icon circle */}
      {icon && (
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, rgba(239,85,65,0.15), rgba(174,190,255,0.15))",
            border: "1px solid rgba(239,85,65,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(239,85,65,0.12)",
          }}
        >
          {icon}
        </span>
      )}

      {/* Text */}
      <span className="flex flex-col leading-tight">
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--color-foreground)",
            fontFamily: "var(--font-heading), sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </span>
        {subtitle && (
          <span
            style={{
              fontSize: 11,
              color: "var(--color-foreground-faint)",
              fontFamily: "var(--font-body), sans-serif",
              letterSpacing: "0.01em",
              marginTop: 1,
            }}
          >
            {subtitle}
          </span>
        )}
      </span>

      {/* Arrow */}
      <span
        style={{
          marginLeft: "auto",
          paddingLeft: 8,
          color: "var(--color-cherry)",
          display: "flex",
          alignItems: "center",
          transition: "transform 0.2s ease",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" style={{ textDecoration: "none" }}>
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} style={{ background: "none", border: "none", padding: 0 }}>
      {inner}
    </button>
  );
}
