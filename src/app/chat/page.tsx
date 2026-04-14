"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Link from "next/link";
import TerminalChat from "@/components/terminal/TerminalChat";

const ParticleField = dynamic(
  () => import("@/components/hero/ParticleField"),
  { ssr: false }
);

export default function ChatPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll("[data-animate]");
    gsap.set(els, { opacity: 0, y: 20 });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  return (
    <section
      className="relative w-full min-h-svh overflow-hidden"
      style={{ background: "#0A0A0B", colorScheme: "dark" }}
    >
      <ParticleField />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "rgba(239,85,65,0.04)" }} />
      </div>

      {/* Back link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors duration-200"
          style={{ color: "#4A4A50", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Home
        </Link>
      </div>

      {/* Main content */}
      <div
        ref={containerRef}
        className="relative z-10 min-h-svh flex flex-col items-center justify-center px-4 py-16 gap-6"
      >
        {/* Wordmark */}
        <div data-animate className="flex flex-col items-center gap-2.5">
          <div
            className="w-[110px] md:w-[150px] h-[46px] md:h-[62px] animate-gradient-text bg-[length:300%_auto]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #EF5541, #D0DD57, #AEBEFF, #EF5541)",
              WebkitMaskImage: "url(/logos/wordmark-gradient.svg)",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: "url(/logos/wordmark-gradient.svg)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
            role="img"
            aria-label="CherryPi"
          />
          <p
            className="uppercase font-light mt-[10px]"
            style={{ fontSize: 10, letterSpacing: "0.25em", color: "#4A4A50", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            start a conversation
          </p>
        </div>

        {/* Terminal */}
        <div data-animate className="w-full max-w-[750px]">
          <TerminalChat />
        </div>

        {/* Footer */}
        <div data-animate className="text-center">
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 uppercase"
            style={{ color: "#4A4A50", fontSize: 10, letterSpacing: "0.05em" }}
          >
            privacy policy
          </a>
        </div>
      </div>
    </section>
  );
}
