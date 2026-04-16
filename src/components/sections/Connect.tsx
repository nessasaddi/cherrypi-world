"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiquidMetalButton } from "@/components/ui/LiquidMetalButton";

gsap.registerPlugin(ScrollTrigger);

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
        <div className="mb-16 md:mb-20 h-px bg-gradient-to-r from-transparent via-foreground/[0.08] to-transparent" />

        <div className="text-center max-w-2xl mx-auto">
          <p data-reveal className="text-[11px] uppercase tracking-[0.22em] text-cherry font-body font-medium mb-6">
            Connect
          </p>
          <h2
            data-reveal
            className="font-heading font-semibold text-foreground leading-[1.05] tracking-[-0.03em] mb-5 text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Get in touch.
          </h2>
          <p
            data-reveal
            className="text-foreground-muted text-sm md:text-[15px] font-body font-light mb-10 md:mb-12 leading-relaxed text-balance"
          >
            LinkedIn or email — both go directly to Vanessa.
          </p>

          <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
            <LiquidMetalButton
              label="hello@cherrypi.world"
              href="mailto:hello@cherrypi.world"
              icon={
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              }
            />
            <a
              href="https://linkedin.com/company/cherrypi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 rounded-full px-7 text-[13px] font-body font-medium tracking-wide border border-foreground/15 text-foreground/80 bg-white/40 hover:text-foreground hover:border-foreground/35 hover:bg-white/70 transition-all duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
