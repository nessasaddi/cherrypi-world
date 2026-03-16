"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    tier: "01",
    title: "Content Engine",
    price: "$500 – 1,500/mo",
    description:
      "Branded content systems for small businesses that need consistent output without the burnout. Brand onboarding, automated content pipelines, monthly image batches, and the SOPs to keep it running.",
    tags: ["Content Systems", "Automation", "SOPs"],
    accent: "cherry",
  },
  {
    tier: "02",
    title: "Brand Partnership",
    price: "$2,000 – 5,000/mo",
    description:
      "Strategy + execution. Brand identity, visual systems, content direction, marketing creative, workflow automation, and custom tooling. Direct access to Vanessa. Not just what your brand looks like — how it operates.",
    tags: ["Brand Identity", "Strategy", "Custom Tooling"],
    accent: "lavender",
  },
  {
    tier: "03",
    title: "Creative Retainer",
    price: "$5,000+/mo",
    description:
      "Ongoing creative direction and marketing infrastructure across multiple channels. Campaign production, ad systems, content engine management, automated marketing workflows, and custom-built integrations. Your embedded creative director and systems architect.",
    tags: ["Creative Direction", "Campaigns", "Infrastructure"],
    accent: "lime",
  },
];

const accentHover: Record<string, string> = {
  cherry: "group-hover:text-cherry",
  lavender: "group-hover:text-lavender",
  lime: "group-hover:text-lime",
};

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll("[data-card]");
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    const headers = sectionRef.current.querySelectorAll("[data-reveal]");
    headers.forEach((el) => {
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
      id="services"
      className="relative py-8 md:py-12 lg:py-16 bg-surface"
    >
      <div className="px-6 md:px-8 lg:px-12 max-w-5xl mx-auto">
      <p data-reveal className="text-[11px] uppercase tracking-[0.2em] text-cherry font-body font-medium mb-10">
        Services
      </p>
      <h2
        data-reveal
        className="font-heading text-3xl md:text-[44px] lg:text-[52px] font-bold leading-[1.1] tracking-tight mb-6 max-w-lg text-balance"
      >
        How we work{" "}
        <span
          className="animate-gradient-text bg-[length:300%_auto] bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(to right, var(--color-cherry), var(--color-lime), var(--color-lavender), var(--color-cherry))" }}
        >together.</span>
      </h2>
      <p
        data-reveal
        className="text-foreground-muted text-sm font-body font-light mb-20 md:mb-24 max-w-xl leading-relaxed text-balance"
      >
        Brand strategy, creative direction, visual identity, content production,
        workflow automation, SOP design, custom integrations, and internal tool
        building — across every tier.
      </p>

      <div className="grid gap-6 md:gap-8">
        {services.map((service, i) => (
          <div
            key={i}
            data-card
            className="glass-card p-8 md:p-10 group cursor-default"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[11px] font-body font-medium text-foreground-faint tracking-widest">
                    {service.tier}
                  </span>
                  <div className="h-px flex-1 max-w-12 bg-white/[0.06]" />
                  <span className="text-[13px] font-body text-foreground-faint font-light">
                    {service.price}
                  </span>
                </div>
                <h3 className={`font-heading text-xl md:text-2xl font-semibold mb-4 ${accentHover[service.accent]} transition-colors duration-300`}>
                  {service.title}
                </h3>
                <p className="text-foreground-muted text-sm font-body font-light leading-relaxed max-w-lg text-balance">
                  {service.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 flex-shrink-0 md:pt-8">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-[0.15em] border border-lavender/[0.35] rounded-full px-3 py-1.5 text-lavender/70 bg-lavender/[0.05] hover:text-lavender hover:border-lavender/60 hover:bg-lavender/[0.08] transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
