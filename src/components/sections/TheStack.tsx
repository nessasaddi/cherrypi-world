"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    number: "01",
    title: "Autonomous Content Infrastructure",
    io: "Brand context in → 30 days of scheduled, on-brand content out.",
    description: "End-to-end pipeline. No manual steps.",
    metric: "30 days from single input.",
    accent: "cherry",
    pills: [] as string[],
  },
  {
    number: "02",
    title: "Studio Operating System",
    io: "Unified workspace powering brand context, task routing, and AI orchestration across every engagement.",
    description: null,
    metric: "90+ custom AI tools, one operating layer.",
    accent: "lavender",
    pills: [] as string[],
  },
  {
    number: "03",
    title: "Custom AI Tooling",
    io: "Purpose-built tools encoding domain methodology — not generic prompts.",
    description: "Each tool encodes a specific workflow with guardrails, brand logic, and production output.",
    metric: "5 integrated platforms, zero manual handoffs.",
    accent: "lime",
    pills: [] as string[],
  },
  {
    number: "04",
    title: "Web Infrastructure & Collaboration",
    io: "Production applications, CI/CD, and direct repo access when the project calls for it.",
    description: "Full-stack dev with GitHub-native collaboration.",
    metric: null,
    accent: "cherry",
    pills: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel", "GitHub"],
  },
];

const accentMap: Record<string, { border: string; text: string; bg: string; metric: string }> = {
  cherry: {
    border: "rgba(239,85,65,0.2)",
    text: "var(--color-cherry)",
    bg: "rgba(239,85,65,0.04)",
    metric: "rgba(239,85,65,0.12)",
  },
  lavender: {
    border: "rgba(174,190,255,0.2)",
    text: "var(--color-lavender)",
    bg: "rgba(174,190,255,0.04)",
    metric: "rgba(174,190,255,0.12)",
  },
  lime: {
    border: "rgba(208,221,87,0.2)",
    text: "var(--color-lime)",
    bg: "rgba(208,221,87,0.04)",
    metric: "rgba(208,221,87,0.12)",
  },
};

export default function TheStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll("[data-reveal]");
    els.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 32,
        duration: 0.85,
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
      id="the-stack"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
    >
      {/* Section label */}
      <p
        data-reveal
        className="text-[11px] uppercase tracking-[0.22em] font-body font-medium mb-5"
        style={{ color: "var(--color-cherry)" }}
      >
        The Stack
      </p>

      {/* Heading */}
      <h2
        data-reveal
        className="font-heading font-semibold text-foreground text-balance mb-4"
        style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          maxWidth: "36ch",
        }}
      >
        Built for real work.{" "}
        <span className="text-foreground-muted">Running in production.</span>
      </h2>

      {/* Body */}
      <p
        data-reveal
        className="font-body font-light text-foreground-muted mb-16 md:mb-20"
        style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)", lineHeight: 1.7, maxWidth: "56ch" }}
      >
        Live infrastructure — not demos, not concepts. Every system below is built, maintained, and running daily inside the studio.
      </p>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => {
          const colors = accentMap[card.accent];
          return (
            <div
              key={card.number}
              data-reveal
              className="group relative rounded-2xl p-8 md:p-10 transition-all duration-300"
              style={{
                background: "var(--color-surface)",
                border: `1px solid ${colors.border}`,
              }}
            >
              {/* Number */}
              <span
                className="text-[10px] font-mono tracking-widest mb-6 block"
                style={{ color: "var(--color-foreground-faint)" }}
              >
                {card.number}
              </span>

              {/* Title */}
              <h3
                className="font-heading font-semibold text-foreground mb-4"
                style={{ fontSize: "1.15rem", letterSpacing: "-0.02em", lineHeight: 1.25 }}
              >
                {card.title}
              </h3>

              {/* IO / Description */}
              <p
                className="font-body font-light text-foreground-muted mb-3"
                style={{ fontSize: "0.875rem", lineHeight: 1.65 }}
              >
                {card.io}
              </p>
              {card.description && (
                <p
                  className="font-body font-light text-foreground-faint mb-5"
                  style={{ fontSize: "0.8rem", lineHeight: 1.6 }}
                >
                  {card.description}
                </p>
              )}

              {/* Tech pills */}
              {card.pills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {card.pills.map((pill) => (
                    <span
                      key={pill}
                      className="text-[10px] uppercase tracking-[0.12em] rounded-full px-3 py-1 font-body"
                      style={{
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                        background: colors.bg,
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              )}

              {/* Metric */}
              {card.metric && (
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 mt-auto"
                  style={{ background: colors.metric }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: colors.text }}
                  />
                  <span
                    className="font-mono text-[10px] tracking-wider"
                    style={{ color: colors.text }}
                  >
                    {card.metric}
                  </span>
                </div>
              )}

              {/* Hover accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${colors.text}, transparent)` }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
