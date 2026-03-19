"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  "Autonomous Infrastructure",
  "Client Operations",
  "Custom Tooling",
  "Multi-Brand",
  "Brand & Creative",
  "Content Production",
  "Web & Digital",
  "Advertising",
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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

    // Infinite marquee
    if (marqueeRef.current) {
      const inner = marqueeRef.current.querySelector("[data-marquee-inner]") as HTMLElement;
      if (inner) {
        const width = inner.scrollWidth / 2;
        gsap.to(inner, {
          x: -width,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const doubled = [...capabilities, ...capabilities];

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative py-8 md:py-12 lg:py-16 bg-surface"
    >
      <div className="px-6 md:px-8 lg:px-12 max-w-5xl mx-auto">
        <p data-reveal className="text-[11px] uppercase tracking-[0.2em] text-cherry font-body font-medium mb-10">
          Capabilities
        </p>
      </div>

      {/* Marquee */}
      <div ref={marqueeRef} data-reveal className="overflow-hidden py-8 md:py-12">
        <div data-marquee-inner className="flex gap-4 md:gap-6 w-max">
          {doubled.map((cap, i) => (
            <span
              key={i}
              className="flex-shrink-0 font-heading text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground/80 hover:text-foreground transition-colors duration-300 cursor-default whitespace-nowrap"
            >
              [ {cap} ]
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 md:px-8 lg:px-12 max-w-5xl mx-auto mt-12 md:mt-16">
        <div data-reveal className="text-center">
          <a
            href="#connect"
            className="inline-block border border-lime/[0.35] rounded-full px-10 py-4 text-[12px] font-body text-lime/70 tracking-[0.15em] uppercase bg-lime/[0.05] hover:text-lime hover:border-lime/60 hover:bg-lime/[0.08] hover:shadow-[0_0_30px_rgba(208,221,87,0.1)] transition-all duration-500"
          >
            Start a Project
          </a>
          <p className="text-foreground-muted text-sm font-body font-light mt-6 text-balance">
            If you&apos;re a founder building something real, we&apos;d love to hear from you.
          </p>
        </div>
      </div>
    </section>
  );
}
