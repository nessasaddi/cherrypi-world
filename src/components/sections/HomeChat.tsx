"use client";

import Link from "next/link";
import TerminalChat from "@/components/terminal/TerminalChat";
import { LiquidMetalBorder } from "@/components/ui/LiquidMetalBorder";

export default function HomeChat() {
  return (
    <section id="chat" className="snap-section relative flex flex-col justify-center pt-6 pb-10 md:pt-10 md:pb-14 px-6 overflow-hidden bg-background">
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
        {/* Eyebrow */}
        <p
          className="text-[11px] uppercase tracking-[0.22em] font-body font-medium mb-3 text-center"
          style={{ color: "var(--color-cherry)" }}
        >
          Terminal
        </p>

        {/* Headline */}
        <h2
          className="font-heading font-semibold text-foreground text-balance mb-4 text-center"
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Start a conversation.
        </h2>

        {/* Body */}
        <p className="text-foreground-muted text-sm md:text-[15px] font-body font-light text-balance text-center mb-10 leading-relaxed max-w-[460px] mx-auto">
          Describe a problem, a project, or an idea. Cherry Pi will help you think through it and connect everything to Vanessa directly.
        </p>

        {/* Liquid metal border wrapper */}
        <LiquidMetalBorder borderWidth={2} borderRadius={20}>
          <TerminalChat />
        </LiquidMetalBorder>

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
