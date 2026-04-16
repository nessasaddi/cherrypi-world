"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll("[data-reveal]");
    els.forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="relative py-8 md:py-12 lg:py-16 px-6 md:px-8 lg:px-12 max-w-5xl mx-auto"
    >
      {/* Decorative divider */}
      <div className="mb-24 md:mb-32 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="grid md:grid-cols-5 gap-16 md:gap-28">
        {/* Left — label + decorative */}
        <div className="md:col-span-2">
          <p data-reveal className="text-[11px] uppercase tracking-[0.2em] text-cherry font-body font-medium mb-10">
            The Operator
          </p>
          <h2
            data-reveal
            className="font-heading text-3xl md:text-[44px] font-bold leading-[1.1] tracking-tight mb-8 text-balance"
          >
            <span
              className="animate-gradient-text bg-[length:300%_auto] bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to right, var(--color-cherry), var(--color-lime), var(--color-lavender), var(--color-cherry))" }}
            >Vanessa Saddi</span>
          </h2>

          {/* Decorative element */}
          <div data-reveal className="hidden md:block mt-12">
            <div className="w-16 h-16 rounded-xl border border-white/[0.04] bg-surface-glass flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-cherry/60" />
            </div>
          </div>
        </div>

        {/* Right — bio */}
        <div className="md:col-span-3 space-y-8">
          <p
            data-reveal
            className="text-foreground-muted text-[15px] md:text-base leading-relaxed font-body font-light text-balance"
          >
            Cherry Pi is a one-person studio by design, not by constraint. Every brand system, every automation pipeline, every line of code runs through one creative mind — which means nothing gets lost in translation between strategy and execution.
          </p>
          <p
            data-reveal
            className="text-foreground-muted text-[15px] md:text-base leading-relaxed font-body font-light text-balance"
          >
            I build brands, content systems, and the autonomous infrastructure that keeps them running. Direct work. No handoffs. No layers.
          </p>
          <p
            data-reveal
            className="text-foreground-faint text-[15px] md:text-base leading-relaxed font-body font-light text-balance"
          >
            Based in California. Working across cannabis, tech, collectibles, and lifestyle.
          </p>

          {/* Industries */}
          <div data-reveal className="flex flex-wrap gap-2 pt-4">
            {["Cannabis", "Tech", "Collectibles", "Lifestyle", "Food"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-[0.15em] border border-lavender/[0.35] rounded-full px-4 py-2 text-lavender/70 bg-lavender/[0.05] hover:text-lavender hover:border-lavender/60 hover:bg-lavender/[0.08] transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
