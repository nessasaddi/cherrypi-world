"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import TerminalChat from "@/components/terminal/TerminalChat";

const ParticleField = dynamic(
  () => import("@/components/hero/ParticleField"),
  { ssr: false }
);

export default function Home() {
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
    <section className="relative w-full h-svh bg-background overflow-hidden">
      <ParticleField />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-cherry/[0.04] blur-[100px]" />
      </div>

      {/* Main content — centered column */}
      <div
        ref={containerRef}
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-10 md:py-14 gap-6"
      >
        {/* Wordmark + tagline */}
        <div data-animate className="flex flex-col items-center gap-2.5">
          <div
            className="w-[110px] md:w-[150px] h-[46px] md:h-[62px] animate-gradient-text bg-[length:300%_auto]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-cherry), var(--color-lime), var(--color-lavender), var(--color-cherry))",
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
          <p className="text-[10px] uppercase tracking-[0.25em] text-foreground-faint font-body font-light mt-[10px]">
            under construction
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
            className="text-foreground-faint hover:text-foreground-muted transition-colors duration-200 uppercase"
            style={{ fontSize: 10, letterSpacing: "0.05em" }}
          >
            privacy policy
          </a>
        </div>
      </div>
    </section>
  );
}
