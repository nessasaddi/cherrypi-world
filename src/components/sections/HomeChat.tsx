"use client";

import Link from "next/link";
import TerminalChat from "@/components/terminal/TerminalChat";

export default function HomeChat() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-background">
      {/* Ambient blobs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 480,
          height: 480,
          top: "10%",
          right: "-10%",
          background: "rgba(239, 85, 65, 0.05)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 380,
          height: 380,
          bottom: "5%",
          left: "-8%",
          background: "rgba(174, 190, 255, 0.07)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-[540px] mx-auto">
        {/* Label */}
        <p
          className="text-[11px] uppercase tracking-[0.22em] font-body font-medium mb-4 text-center"
          style={{ color: "var(--color-cherry)" }}
        >
          Start a conversation
        </p>

        {/* Headline */}
        <h2
          className="font-heading font-semibold text-foreground text-balance mb-10 text-center"
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Tell Vanessa{" "}
          <span className="text-foreground-muted">what you&apos;re building.</span>
        </h2>

        {/* Gradient rotating border wrapper */}
        <div className="gradient-border-card">
          <div style={{ borderRadius: "16.5px", overflow: "hidden" }}>
            <TerminalChat />
          </div>
        </div>

        {/* Privacy link */}
        <p className="text-center mt-5 font-body" style={{ fontSize: "0.7rem", color: "var(--color-foreground-faint)", letterSpacing: "0.05em" }}>
          By starting a conversation you agree to our{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 decoration-dotted transition-colors duration-200 hover:text-foreground-muted"
          >
            privacy policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
