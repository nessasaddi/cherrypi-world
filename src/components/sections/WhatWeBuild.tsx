"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    number: "01",
    title: "Brand Strategy",
    description:
      "Positioning, narrative architecture, and the strategic foundation that makes every channel pull in the same direction.",
    accent: "cherry",
  },
  {
    number: "02",
    title: "Visual Identity",
    description:
      "Visual language, naming, and the system behind it. Built to scale without losing itself.",
    accent: "lavender",
  },
  {
    number: "03",
    title: "Creative Direction",
    description:
      "Art direction, campaign concepting, and the creative throughline that holds a brand together across every surface.",
    accent: "lime",
  },
  {
    number: "04",
    title: "Web Development",
    description:
      "Production websites and applications built to the same quality standard as everything else in the stack.",
    accent: "cherry",
  },
  {
    number: "05",
    title: "Content Systems",
    description:
      "Editorial strategy, multi-platform production, and the workflows that keep it moving without constant input.",
    accent: "lavender",
  },
  {
    number: "06",
    title: "AI Workflow Automation",
    description:
      "Custom pipelines, agents, and automations that handle the operational layer — built once, running without oversight.",
    accent: "lime",
  },
  {
    number: "07",
    title: "Custom Tooling & APIs",
    description:
      "Purpose-built tools that encode domain methodology. Not generic prompts — specific workflows with guardrails and production output.",
    accent: "cherry",
  },
  {
    number: "08",
    title: "Paid Media Infrastructure",
    description:
      "Campaign architecture, creative systems, and the performance layer that connects brand investment to measurable return.",
    accent: "lavender",
  },
];

const accentColors: Record<string, string> = {
  cherry: "var(--color-cherry)",
  lavender: "var(--color-lavender)",
  lime: "var(--color-lime)",
};

export default function WhatWeBuild() {
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
      id="what-we-build"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
    >
      {/* Section label */}
      <p
        data-reveal
        className="text-[11px] uppercase tracking-[0.22em] font-body font-medium mb-5"
        style={{ color: "var(--color-cherry)" }}
      >
        What I Build
      </p>

      {/* Heading */}
      <h2
        data-reveal
        className="font-heading font-semibold text-foreground text-balance mb-6"
        style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          maxWidth: "36ch",
        }}
      >
        The full stack,{" "}
        <span className="text-foreground-muted">
          under one roof.
        </span>
      </h2>

      {/* Body */}
      <p
        data-reveal
        className="font-body font-light text-foreground-muted mb-16 md:mb-20"
        style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)", lineHeight: 1.7, maxWidth: "60ch" }}
      >
        Cherry Pi operates at the intersection of creative depth and autonomous infrastructure. Brand strategy and visual identity. Web development and custom tooling. Content systems and AI pipelines that produce finished, on-brand work without human input. Everything below is built and maintained by one operator.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.06]">
        {capabilities.map((cap) => (
          <div
            key={cap.number}
            data-reveal
            className="group relative bg-background p-8 md:p-10 transition-colors duration-300 hover:bg-surface"
          >
            {/* Number + accent line */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[11px] font-mono tracking-widest"
                style={{ color: "var(--color-foreground-faint)" }}
              >
                {cap.number}
              </span>
              <div
                className="h-px flex-1 transition-all duration-500 group-hover:opacity-100 opacity-30"
                style={{ background: accentColors[cap.accent] }}
              />
            </div>

            <h3
              className="font-heading font-semibold text-foreground mb-3"
              style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}
            >
              {cap.title}
            </h3>

            <p
              className="font-body font-light text-foreground-muted leading-relaxed"
              style={{ fontSize: "0.875rem" }}
            >
              {cap.description}
            </p>

            {/* Accent dot */}
            <div
              className="absolute bottom-8 right-8 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: accentColors[cap.accent] }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
