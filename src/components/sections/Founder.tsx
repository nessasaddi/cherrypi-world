"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const industries = ["Cannabis", "Tech", "Collectibles", "Lifestyle", "Food"];

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll("[data-reveal]");
    els.forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 32,
        duration: 0.9,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
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
      className="relative w-full py-16 md:py-20 px-6 bg-foreground overflow-hidden"
    >
      {/* Ambient cherry glow — top left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, var(--color-cherry) 0%, transparent 70%)" }}
      />
      {/* Ambient lavender glow — bottom right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, var(--color-lavender) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Eyebrow */}
        <p
          data-reveal
          className="text-[11px] uppercase tracking-[0.22em] font-body font-medium mb-8"
          style={{ color: "var(--color-cherry)" }}
        >
          The Operator
        </p>

        {/* Name */}
        <h2
          data-reveal
          className="font-heading font-bold leading-[1.0] tracking-[-0.04em] mb-8"
          style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)" }}
        >
          <span
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-cherry), var(--color-lavender), var(--color-lime), var(--color-cherry))",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Vanessa Saddi
          </span>
        </h2>

        {/* Divider */}
        <div
          data-reveal
          className="w-10 h-px mx-auto mb-10"
          style={{ background: "var(--color-cherry)", opacity: 0.4 }}
        />

        {/* Bio */}
        <div className="space-y-5 mb-12">
          <p
            data-reveal
            className="text-[13px] leading-relaxed font-body font-light text-balance"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Cherry Pi is a one-person studio by design, not by constraint. Every brand system,
            every automation pipeline, every line of code runs through one creative mind —
            which means nothing gets lost in translation between strategy and execution.
          </p>
          <p
            data-reveal
            className="text-[13px] leading-relaxed font-body font-light text-balance"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            I build brands, content systems, and the autonomous infrastructure that keeps
            them running. Direct work. No handoffs. No layers.
          </p>
          <p
            data-reveal
            className="text-[13px] leading-relaxed font-body font-light text-balance"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Based in California. Working across cannabis, tech, collectibles, and lifestyle.
          </p>
        </div>

        {/* Industry pills */}
        <div data-reveal className="flex flex-wrap justify-center gap-2">
          {industries.map((tag) => (
            <span
              key={tag}
              className="text-[9px] uppercase tracking-[0.15em] rounded-full px-3 py-1.5 transition-all duration-300"
              style={{
                border: "1px solid rgba(174,190,255,0.3)",
                color: "rgba(174,190,255,0.6)",
                background: "rgba(174,190,255,0.05)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
