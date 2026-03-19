"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll("[data-reveal]");
    els.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.9,
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
      id="about"
      className="relative py-8 md:py-12 lg:py-16 px-6 md:px-8 lg:px-12 max-w-5xl mx-auto text-center"
    >
      <p data-reveal className="text-[11px] uppercase tracking-[0.2em] text-cherry font-body font-medium mb-10">
        About
      </p>
      <h2
        data-reveal
        className="font-heading text-3xl md:text-[44px] lg:text-[52px] font-bold leading-[1.1] tracking-tight mb-20 md:mb-28 max-w-3xl mx-auto text-balance"
      >
        Strategy, identity, content, and the automation layer that runs itself. Every system &mdash; visual, verbal, and structural &mdash; shipped to run without us.
      </h2>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24 px-4 md:px-0">
        <div data-reveal className="text-foreground-muted text-[15px] leading-relaxed font-body font-light space-y-6 text-balance">
          <p>
            Engineered by Vanessa. Over a decade of compounding skill, from animation and storyboard to frontend development, API architecture, and autonomous systems. All in motion.
          </p>
        </div>
        <div data-reveal className="space-y-6">
          <p className="text-lime text-[15px] leading-relaxed font-body font-light">
            The tools evolve. The vision stays the same. Get ahead.
          </p>
        </div>
      </div>

      {/* Decorative divider */}
      <div data-reveal className="mt-24 md:mt-32 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
