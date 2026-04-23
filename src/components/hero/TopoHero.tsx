"use client";

import { useEffect, useRef } from "react";
import { LiquidMetalButton } from "@/components/ui/LiquidMetalButton";
import gsap from "gsap";

export default function TopoHero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll("[data-animate]");
    gsap.set(els, { opacity: 0 });
    gsap.to(els, {
      opacity: 1,
      duration: 0.9,
      stagger: 0.13,
      ease: "power2.out",
      delay: 0.2,
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden bg-background min-h-svh"
    >
      {/* Main content — vertically centered */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center"
        style={{
          paddingTop: "calc(var(--header-h, 54px) + 1rem)",
          paddingBottom: "3rem",
          transition: "padding-top 0.5s cubic-bezier(0.34, 1.4, 0.64, 1)",
        }}
      >
        {/* Cherry icon GIF */}
        <div data-animate>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/cherry-animated.gif"
            alt="Cherry Pi"
            width={68}
            height={68}
            style={{
              mixBlendMode: "screen",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Headline */}
        <h1
          data-animate
          className="mt-8 font-heading font-semibold leading-[1.02] tracking-[-0.045em] text-foreground text-center"
        >
          <span className="block" style={{ fontSize: "clamp(2.8rem, 7.2vw, 5.4rem)" }}>
            One operator.
          </span>
          <span
            className="block animate-gradient-text bg-[length:300%_auto] bg-clip-text text-transparent"
            style={{
              fontSize: "clamp(3.7rem, 9.4vw, 7rem)",
              backgroundImage:
                "linear-gradient(to right, var(--color-cherry), #ff8a6e, var(--color-lavender), var(--color-cherry))",
            }}
          >
            Full stack.
          </span>
        </h1>

        {/* Subtext */}
        <p
          data-animate
          className="mt-8 font-body font-light text-foreground-muted text-balance max-w-xl"
          style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)", lineHeight: 1.6 }}
        >
          Brand systems, content engines, and the autonomous infrastructure that runs them.
        </p>

        {/* CTA */}
        <div data-animate className="mt-10">
          <LiquidMetalButton
            label="Start a conversation"
            href="#chat"
            icon={
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            }
          />
        </div>
      </div>

    </section>
  );
}
