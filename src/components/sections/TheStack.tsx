"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROW1 = [
  { name: "Google", slug: "google" },
  { name: "Google Analytics", slug: "googleanalytics" },
  { name: "Figma", slug: "figma" },
  { name: "Canva", slug: "canva" },
  { name: "Blender", slug: "blender" },
  { name: "Photoshop", slug: "adobephotoshop" },
  { name: "Illustrator", slug: "adobeillustrator" },
];

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
      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
      style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}
      title={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/icons/${slug}.svg`}
        alt={name}
        width={20}
        height={20}
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
            span.style.cssText = "font-size:13px;font-weight:600;color:#888;";
            img.parentElement?.appendChild(span);
          }
        }}
      />
    </div>
  );
}

type CardData = {
  number: string;
  title: string;
  description: string;
  metric: string | null;
  accent: string;
  pills: string[];
};

const cards: CardData[] = [
  {
    number: "01",
    title: "Autonomous Content Infrastructure",
    description:
      "Brand context in → 30 days of scheduled, on-brand content out. End-to-end pipeline. No manual steps.",
    metric: "30 days from single input.",
    accent: "#EF5541",
    pills: [],
  },
  {
    number: "02",
    title: "Studio Operating System",
    description:
      "Unified workspace powering brand context, task routing, and AI orchestration across every engagement.",
    metric: "90+ custom AI tools, one operating layer.",
    accent: "#AEBEFF",
    pills: [],
  },
  {
    number: "03",
    title: "Custom AI Tooling",
    description:
      "Purpose-built tools encoding domain methodology — not generic prompts. Each tool encodes a specific workflow with guardrails, brand logic, and production output.",
    metric: "5 integrated platforms, zero manual handoffs.",
    accent: "#D0DD57",
    pills: [],
  },
  {
    number: "04",
    title: "Web Infrastructure & Collaboration",
    description:
      "Production applications, CI/CD, and direct repo access when the project calls for it. Full-stack dev with GitHub-native collaboration.",
    metric: null,
    accent: "#C8A8FF",
    pills: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel", "GitHub"],
  },
];

function GlassCard({ card }: { card: CardData }) {
  return (
    <div
      className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.62) 100%)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.55)",
        boxShadow:
          "0 20px 50px rgba(31, 38, 135, 0.08), inset 0 1px 0 rgba(255,255,255,0.55)",
      }}
    >
      {/* Subtle top shine */}
      <div
        className="absolute top-0 left-16 right-16 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent)",
        }}
      />
      {/* Glass reflection */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none rounded-t-3xl"
        style={{
          height: "55%",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, transparent 100%)",
        }}
      />
      {/* Accent corner glow */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: 240,
          height: 240,
          background: `radial-gradient(circle at top right, ${card.accent}32 0%, transparent 70%)`,
          filter: "blur(18px)",
        }}
      />

      <span
        className="text-[10px] font-mono tracking-widest mb-6 block relative"
        style={{ color: "var(--color-foreground-faint)" }}
      >
        {card.number}
      </span>
      <h3
        className="font-heading font-semibold text-foreground mb-4 relative"
        style={{
          fontSize: "1.25rem",
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
        }}
      >
        {card.title}
      </h3>
      <p
        className="font-body font-light text-foreground-muted mb-6 relative"
        style={{ fontSize: "0.9rem", lineHeight: 1.65 }}
      >
        {card.description}
      </p>

      {card.pills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5 relative">
          {card.pills.map((pill) => (
            <span
              key={pill}
              className="text-[10px] uppercase tracking-[0.12em] rounded-full px-3 py-1 font-body"
              style={{
                border: `1px solid ${card.accent}55`,
                color: card.accent,
                background: `${card.accent}18`,
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      )}

      {card.metric && (
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 relative"
          style={{ background: `${card.accent}20` }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: card.accent }}
          />
          <span
            className="font-mono text-[10px] tracking-wider"
            style={{ color: card.accent }}
          >
            {card.metric}
          </span>
        </div>
      )}
    </div>
  );
}

export default function TheStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const ctx = gsap.context(() => {
      const scrollPerCard = 420;
      const totalScroll = cards.length * scrollPerCard;

      // Pin the entire section (header + stack) for the duration of the animation
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalScroll}`,
        pin: stage,
        pinSpacing: true,
      });

      // Initial: all cards positioned well off-screen below the viewport
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, { y: "120vh", scale: 1 });
      });

      // Animate each card flying up into stacked position
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const finalY = i * 26; // stacking offset (px)

        // Slide card up from below
        gsap.to(card, {
          y: finalY,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: `top+=${i * scrollPerCard} top`,
            end: `top+=${(i + 1) * scrollPerCard} top`,
            scrub: 1,
          },
        });

        // Scale this card down as the NEXT card comes in (stack depth)
        if (i < cards.length - 1) {
          const targetScale = 1 - (cards.length - i) * 0.04;
          gsap.to(card, {
            scale: targetScale,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: `top+=${(i + 1) * scrollPerCard} top`,
              end: `top+=${(i + 2) * scrollPerCard} top`,
              scrub: 1,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="the-stack" className="relative bg-background">
      {/* Ambient colored blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: 520,
            height: 520,
            top: "8%",
            right: "-12%",
            background: "rgba(239, 85, 65, 0.07)",
            filter: "blur(110px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 420,
            height: 420,
            top: "35%",
            left: "-10%",
            background: "rgba(174, 190, 255, 0.09)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 380,
            height: 380,
            bottom: "8%",
            right: "10%",
            background: "rgba(208, 221, 87, 0.08)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Pinned stage — everything moves as one unit */}
      <div
        ref={stageRef}
        className="relative z-10"
        style={{
          minHeight: "100vh",
          paddingTop: "calc(var(--header-h, 60px) + 16px)",
        }}
      >
        {/* Section header */}
        <div className="relative px-6 md:px-8 pt-4 pb-6 md:pb-8">
          <div className="max-w-[640px] mx-auto md:text-center">
            <p
              className="text-[11px] uppercase tracking-[0.22em] font-body font-medium mb-3"
              style={{ color: "var(--color-cherry)" }}
            >
              The Stack
            </p>
            <h2
              className="font-heading font-semibold text-foreground text-balance mb-3"
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Built for real work.{" "}
              <span className="text-foreground-muted">
                Running in production.
              </span>
            </h2>
            <p
              className="font-body font-light text-foreground-muted md:mx-auto"
              style={{
                fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)",
                lineHeight: 1.65,
                maxWidth: "52ch",
              }}
            >
              Live infrastructure — not demos, not concepts. Every system below
              is built, maintained, and running daily inside the studio.
            </p>
          </div>
        </div>

        {/* Cards stacking area */}
        <div
          className="relative px-6 md:px-8 pb-6 md:pb-8 overflow-hidden"
          style={{ minHeight: "54vh" }}
        >
          <div
            className="relative max-w-[640px] mx-auto"
            style={{ minHeight: "460px" }}
          >
            {cards.map((card, i) => (
              <div
                key={card.number}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute left-0 right-0 top-0"
                style={{
                  zIndex: i + 1,
                  transformOrigin: "center top",
                  willChange: "transform",
                }}
              >
                <GlassCard card={card} />
              </div>
            ))}
          </div>
        </div>
        {/* Tool marquee */}
        <div className="relative overflow-hidden pb-8">
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }}
          />
          <div className="overflow-hidden mb-2.5">
            <div className="flex gap-2.5 w-max" style={{ animation: "scroll-left 40s linear infinite" }}>
              {repeat(ROW1, 5).map((app, i) => (
                <AppIcon key={i} name={app.name} slug={app.slug} />
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-2.5 w-max" style={{ animation: "scroll-right 35s linear infinite" }}>
              {repeat(ROW2, 4).map((app, i) => (
                <AppIcon key={i} name={app.name} slug={app.slug} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
