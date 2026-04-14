"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Row 1 — Google suite + creative/design tools
const ROW1 = [
  { name: "Gmail", slug: "gmail" },
  { name: "Google Drive", slug: "googledrive" },
  { name: "Google Docs", slug: "googledocs" },
  { name: "Google Sheets", slug: "googlesheets" },
  { name: "Google Slides", slug: "googleslides" },
  { name: "Google Calendar", slug: "googlecalendar" },
  { name: "Google Meet", slug: "googlemeet" },
  { name: "Google Analytics", slug: "googleanalytics" },
  { name: "YouTube", slug: "youtube" },
  { name: "Figma", slug: "figma" },
  { name: "Canva", slug: "canva" },
  { name: "Blender", slug: "blender" },
  { name: "Photoshop", slug: "adobephotoshop" },
  { name: "Illustrator", slug: "adobeillustrator" },
  { name: "Premiere Pro", slug: "adobepremierepro" },
  { name: "After Effects", slug: "adobeaftereffects" },
  { name: "Lightroom", slug: "adobelightroom" },
  { name: "InDesign", slug: "adobeindesign" },
];

// Row 2 — Dev stack + social + comms + AI
const ROW2 = [
  { name: "VSCode", slug: "visualstudiocode" },
  { name: "GitHub", slug: "github" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Vercel", slug: "vercel" },
  { name: "Python", slug: "python" },
  { name: "Cloudflare", slug: "cloudflare" },
  { name: "Shopify", slug: "shopify" },
  { name: "Airtable", slug: "airtable" },
  { name: "Zapier", slug: "zapier" },
  { name: "Klaviyo", slug: "klaviyo" },
  { name: "Notion", slug: "notion" },
  { name: "Slack", slug: "slack" },
  { name: "Discord", slug: "discord" },
  { name: "Telegram", slug: "telegram" },
  { name: "Signal", slug: "signal" },
  { name: "LinkedIn", slug: "linkedin" },
  { name: "Instagram", slug: "instagram" },
  { name: "Pinterest", slug: "pinterest" },
  { name: "X", slug: "x" },
  { name: "TikTok", slug: "tiktok" },
  { name: "Meta", slug: "meta" },
  { name: "OpenAI", slug: "openai" },
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
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={name}
        width={22}
        height={22}
        style={{ objectFit: "contain" }}
        loading="lazy"
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          if (!img.dataset.fallback) {
            // First failure: try jsDelivr (correct slug, black icon)
            img.dataset.fallback = "1";
            img.src = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
          } else {
            // Both CDNs failed — hide silently
            img.style.display = "none";
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
    gsap.set(els, { opacity: 0, y: 28 });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.13,
      ease: "power3.out",
      delay: 0.25,
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-svh min-h-[620px] overflow-hidden bg-background"
    >
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-start pt-[6vh] px-6 text-center"
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

        {/* Scroll hint */}
        <div
          data-animate
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div
            className="w-px h-10 origin-top"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--color-foreground-faint))",
              animation: "scroll-line 2s ease-in-out infinite",
            }}
          />
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
