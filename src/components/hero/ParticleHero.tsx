"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function ParticleHero() {
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
    <section
      id="hero"
      className="relative w-full h-screen min-h-[80vh] overflow-hidden bg-background"
    >
      <ParticleField />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cherry/[0.04] blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-lavender/[0.03] blur-[100px]" />
      </div>

      <div
        ref={containerRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pb-[10vh] px-6 text-center"
      >
        {/* Wordmark — small, at top */}
        <div data-animate className="flex items-center justify-center mb-6">
          <div
            className="w-[109px] md:w-[130px] h-[45px] md:h-[54px] animate-gradient-text bg-[length:300%_auto]"
            style={{
              backgroundImage: "linear-gradient(to right, var(--color-cherry), var(--color-lime), var(--color-lavender), var(--color-cherry))",
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

        {/* Hero heading */}
        <h1
          data-animate
          className="mt-8 font-heading font-semibold text-4xl md:text-[52px] lg:text-[64px] leading-[1.1] tracking-[-0.04em] text-balance max-w-3xl text-foreground"
        >
          One Studio.{" "}
          <span
            className="animate-gradient-text bg-[length:300%_auto] bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, var(--color-cherry), var(--color-lime), var(--color-lavender), var(--color-cherry))" }}
          >One Mind.</span>{" "}
          A strategic brand partner for founders in motion.
        </h1>

        {/* Nav links */}
        <nav data-animate className="mt-12 grid grid-cols-2 gap-x-10 gap-y-4 md:flex md:items-center md:gap-8">
          {[
            { label: "About", href: "#about" },
            { label: "Services", href: "#services" },
            { label: "Founder", href: "#founder" },
            { label: "Connect", href: "#connect" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] font-body text-foreground-muted hover:text-foreground border border-white/[0.08] rounded-full px-5 py-2 hover:border-white/[0.15] transition-all duration-300 text-center md:text-left"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
