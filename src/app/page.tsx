"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const ParticleField = dynamic(
  () => import("@/components/hero/ParticleField"),
  { ssr: false }
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll("[data-animate]");
    gsap.set(els, { opacity: 0, y: 30 });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  return (
    <section className="relative w-full h-svh min-h-[600px] overflow-hidden bg-background">
      <ParticleField />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cherry/[0.04] blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-lavender/[0.03] blur-[100px]" />
      </div>

      <div
        ref={containerRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Wordmark logo */}
        <div data-animate className="flex items-center justify-center mb-8">
          <div
            className="w-[140px] md:w-[180px] h-[58px] md:h-[74px] animate-gradient-text bg-[length:300%_auto]"
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
        </div>

        <p
          data-animate
          className="text-[11px] uppercase tracking-[0.25em] text-foreground-faint font-body font-light"
        >
          Under Construction
        </p>
      </div>
    </section>
  );
}
