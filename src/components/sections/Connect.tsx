"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/company/cherrypi" },
  { label: "Instagram", href: "https://instagram.com/ch3rryp1" },
  { label: "Email", href: "mailto:hello@cherrypi.studio" },
];

export default function Connect() {
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
          start: "top 98%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="connect"
      className="relative py-8 md:py-12 lg:py-16 px-6 md:px-8 lg:px-12"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-cherry/[0.03] blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Decorative divider */}
        <div className="mb-24 md:mb-28 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="text-center max-w-2xl mx-auto">
          <p data-reveal className="text-[11px] uppercase tracking-[0.2em] text-cherry font-body font-medium mb-10">
            Start a Project
          </p>
          <h2
            data-reveal
            className="font-heading text-3xl md:text-[44px] lg:text-[52px] font-bold leading-[1.1] tracking-tight mb-6 text-balance"
          >
            Let&apos;s work together.
          </h2>
          <p
            data-reveal
            className="text-foreground-muted text-sm font-body font-light mb-16 md:mb-20 leading-relaxed text-balance"
          >
            If you&apos;re a founder building something real, we&apos;d love to hear from you.
          </p>

          <div data-reveal className="glass-card p-8 md:p-12 mb-12 text-left">
            <p className="text-foreground-faint text-xs font-body font-light uppercase tracking-[0.15em] mb-4">
              AI Chat — Coming Soon
            </p>
            <p className="text-foreground-muted text-sm font-body font-light leading-relaxed">
              An AI-powered project intake chatbox will live here. For now, reach out directly.
            </p>
          </div>

          <div data-reveal className="flex flex-wrap justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-lime/[0.35] rounded-full px-8 py-3.5 text-[12px] font-body text-lime/70 tracking-[0.15em] uppercase bg-lime/[0.05] hover:text-lime hover:border-lime/60 hover:bg-lime/[0.08] hover:shadow-[0_0_30px_rgba(208,221,87,0.1)] transition-all duration-500"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
