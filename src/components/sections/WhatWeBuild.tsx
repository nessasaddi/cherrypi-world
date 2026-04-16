"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: 1,
    number: "01",
    title: "Brand Strategy",
    gradient: "linear-gradient(145deg, #ef5541 0%, #d44332 100%)",
    textColor: "#ffffff",
  },
  {
    id: 2,
    number: "02",
    title: "Visual Identity",
    gradient: "linear-gradient(145deg, #aebeff 0%, #8a9ef5 100%)",
    textColor: "#1a1a1a",
  },
  {
    id: 3,
    number: "03",
    title: "Creative Direction",
    gradient: "linear-gradient(145deg, #eda599 0%, #d48578 100%)",
    textColor: "#1a1a1a",
  },
  {
    id: 4,
    number: "04",
    title: "Web Development",
    gradient: "linear-gradient(145deg, #2a2a2a 0%, #0a0a0a 100%)",
    textColor: "#ffffff",
  },
  {
    id: 5,
    number: "05",
    title: "Content Systems",
    gradient: "linear-gradient(145deg, #d0dd57 0%, #b0bf3f 100%)",
    textColor: "#1a1a1a",
  },
  {
    id: 6,
    number: "06",
    title: "AI Workflow Automation",
    gradient: "linear-gradient(145deg, #aebeff 0%, #ef5541 100%)",
    textColor: "#ffffff",
  },
  {
    id: 7,
    number: "07",
    title: "Custom Tooling & APIs",
    gradient: "linear-gradient(145deg, #1a1a1a 0%, #3a3a3a 100%)",
    textColor: "#ffffff",
  },
  {
    id: 8,
    number: "08",
    title: "Paid Media Infrastructure",
    gradient: "linear-gradient(145deg, #d0dd57 0%, #aebeff 100%)",
    textColor: "#1a1a1a",
  },
];

type AccordionItemProps = {
  item: (typeof items)[number];
  isActive: boolean;
  onActivate: () => void;
};

function AccordionItem({ item, isActive, onActivate }: AccordionItemProps) {
  return (
    <div
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      aria-label={item.title}
      className={[
        "relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0",
        "transition-[flex-basis,width] duration-700 ease-[cubic-bezier(0.34,1.2,0.64,1)]",
        "h-[360px] md:h-[440px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
      ].join(" ")}
      style={{
        width: isActive ? "min(420px, 78vw)" : "64px",
      }}
    >
      {/* Brand color gradient background */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.34,1.2,0.64,1)]"
        style={{ background: item.gradient }}
      />

      {/* Subtle inner shadow for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.15)",
        }}
      />

      {/* Number (top-left) — only in active state */}
      <span
        className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.2em] transition-opacity duration-500"
        style={{
          opacity: isActive ? 0.7 : 0,
          color: item.textColor,
        }}
      >
        {item.number}
      </span>

      {/* Active title — horizontal, bottom-aligned */}
      <span
        className="absolute left-5 right-5 bottom-5 font-heading font-semibold transition-opacity duration-300"
        style={{
          opacity: isActive ? 1 : 0,
          pointerEvents: "none",
          color: item.textColor,
          fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
        }}
      >
        {item.title}
      </span>

      {/* Collapsed title — vertical via writing-mode */}
      <span
        className="absolute top-1/2 left-1/2 font-body font-medium whitespace-nowrap transition-opacity duration-300"
        style={{
          opacity: isActive ? 0 : 0.92,
          pointerEvents: "none",
          color: item.textColor,
          transform: "translate(-50%, -50%) rotate(180deg)",
          writingMode: "vertical-rl",
          fontSize: "0.78rem",
          letterSpacing: "0.04em",
        }}
      >
        {item.title}
      </span>
    </div>
  );
}

export default function WhatWeBuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
      className="snap-section relative flex flex-col justify-center py-20 md:py-24 px-6 md:px-12 lg:px-24 bg-background"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <p
            data-reveal
            className="text-[11px] uppercase tracking-[0.22em] font-body font-medium mb-5"
            style={{ color: "var(--color-cherry)" }}
          >
            What I Build
          </p>

          <h2
            data-reveal
            className="font-heading font-semibold text-foreground text-balance mb-6"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            The full stack,{" "}
            <span className="text-foreground-muted">under one roof.</span>
          </h2>

          <p
            data-reveal
            className="font-body font-light text-foreground-muted"
            style={{
              fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
              lineHeight: 1.7,
              maxWidth: "56ch",
            }}
          >
            Brand strategy and visual identity. Web development and custom
            tooling. Content systems and AI pipelines that produce finished,
            on-brand work without human input. Everything below is built and
            maintained by one operator.
          </p>
        </div>

        {/* Accordion */}
        <div
          data-reveal
          className="flex flex-row items-stretch gap-2 md:gap-3 overflow-x-auto pb-2 snap-none"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              isActive={index === activeIndex}
              onActivate={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
