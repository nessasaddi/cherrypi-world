"use client";

const ROW1 = [
  { name: "Google", slug: "google" },
  { name: "Google Analytics", slug: "googleanalytics" },
  { name: "Figma", slug: "figma" },
  { name: "Canva", slug: "canva" },
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

function IconPill({ name, slug }: { name: string; slug: string }) {
  return (
    <div
      className="flex-shrink-0 flex flex-col items-center gap-2 group"
      title={name}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt={name}
          width={28}
          height={28}
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </div>
      <span
        className="font-body text-foreground-faint whitespace-nowrap"
        style={{ fontSize: "0.65rem", letterSpacing: "0.04em" }}
      >
        {name}
      </span>
    </div>
  );
}

export default function AppStack() {
  const row1 = repeat(ROW1, 4);
  const row2 = repeat(ROW2, 4);

  return (
    <section className="relative py-16 overflow-hidden bg-background">
      {/* Section label */}
      <p
        className="text-center font-body mb-10"
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-foreground-faint)",
        }}
      >
        Built with &amp; inside
      </p>

      {/* Edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }}
      />

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-5">
        <div
          className="flex gap-5 w-max"
          style={{ animation: "scroll-left 50s linear infinite" }}
        >
          {row1.map((app, i) => (
            <IconPill key={i} name={app.name} slug={app.slug} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div
          className="flex gap-5 w-max"
          style={{ animation: "scroll-right 45s linear infinite" }}
        >
          {row2.map((app, i) => (
            <IconPill key={i} name={app.name} slug={app.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
