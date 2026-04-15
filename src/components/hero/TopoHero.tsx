"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Row 1 — Google suite + creative/design tools
const ROW1 = [
  { name: "Google", slug: "google" },
  { name: "Google Analytics", slug: "googleanalytics" },
  { name: "Figma", slug: "figma" },
  { name: "Canva", slug: "canva" },
  { name: "Blender", slug: "blender" },
  { name: "Photoshop", slug: "adobephotoshop" },
  { name: "Illustrator", slug: "adobeillustrator" },
];

// Row 2 — Dev stack + comms + AI
const ROW2 = [
  { name: "Cursor", slug: "cursor" },
  { name: "GitHub", slug: "github" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Vercel", slug: "vercel" },
  { name: "Python", slug: "python" },
  { name: "Notion", slug: "notion" },
  { name: "Slack", slug: "slack" },
  { name: "Discord", slug: "discord" },
  { name: "Telegram", slug: "telegram" },
  { name: "Signal", slug: "signal" },
  { name: "Meta", slug: "meta" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "Gemini", slug: "googlegemini" },
];

function repeat<T>(arr: T[], times = 4): T[] {
  return Array.from({ length: times }).flatMap(() => arr);
}

function AppIcon({ name, slug }: { name: string; slug: string }) {
  return (
    <div
      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
      style={{ background: "#fff", boxShadow: "0 1px 8px rgba(0,0,0,0.08)" }}
      title={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/icons/${slug}.svg`}
        alt={name}
        width={22}
        height={22}
        style={{ objectFit: "contain" }}
        loading="lazy"
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          if (!img.dataset.fallback) {
            img.dataset.fallback = "1";
            img.src = `https://cdn.simpleicons.org/${slug}`;
          } else {
            img.style.display = "none";
            const span = document.createElement("span");
            span.textContent = name.charAt(0);
            span.style.cssText = "font-size:14px;font-weight:600;color:#888;";
            img.parentElement?.appendChild(span);
          }
        }}
      />
    </div>
  );
}

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
      className="relative w-full overflow-hidden bg-background"
    >
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center pt-10 pb-2 px-6 text-center"
      >
        {/* Cherry icon GIF */}
        <div data-animate>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/cherry-animated.gif"
            alt="Cherry Pi"
            width={76}
            height={76}
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
          className="mt-10 font-heading font-semibold leading-[1.05] tracking-[-0.04em] text-foreground text-balance"
          style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
        >
          One operator.{" "}
          <br />
          <span
            className="animate-gradient-text bg-[length:300%_auto] bg-clip-text text-transparent"
            style={{
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
          className="mt-6 font-body font-light text-foreground-muted text-balance max-w-lg"
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", lineHeight: 1.65 }}
        >
          Strategy, identity, content, and the automation layer
          that runs itself.
        </p>

        {/* App stack marquee — full-width breakout */}
        <div
          data-animate
          className="relative mt-10 pb-16"
          style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
        >
          {/* Edge fades */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }}
          />

          {/* Row 1 — scrolls left */}
          <div className="overflow-hidden mb-3">
            <div className="flex gap-3 w-max" style={{ animation: "scroll-left 40s linear infinite" }}>
              {repeat(ROW1, 4).map((app, i) => (
                <AppIcon key={i} name={app.name} slug={app.slug} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="overflow-hidden">
            <div className="flex gap-3 w-max" style={{ animation: "scroll-right 35s linear infinite" }}>
              {repeat(ROW2, 4).map((app, i) => (
                <AppIcon key={i} name={app.name} slug={app.slug} />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />

      <style jsx>{`
        @keyframes scroll-line {
          0% { transform: scaleY(0); opacity: 0; }
          50% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
