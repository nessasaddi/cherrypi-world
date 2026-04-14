"use client";

import { useState, useEffect } from "react";

const TOASTS = [
  {
    id: "workflow",
    plain: "Workflow broken?",
    linked: "Tell Vanessa — she'll build the fix.",
  },
  {
    id: "brand",
    plain: "Need brand systems?",
    linked: "Tell Vanessa your goals.",
  },
];

function scrollToChat() {
  const el = document.getElementById("chat");
  if (!el) return;
  const offset = 80; // clear the sticky header
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function GridPattern({ id }: { id: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`banner-grid-${id}`}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 14 0 L 0 0 0 14"
            fill="none"
            stroke="rgba(239,85,65,0.08)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#banner-grid-${id})`} />
    </svg>
  );
}

function Toast({
  toast,
  index,
  onDismiss,
}: {
  toast: (typeof TOASTS)[0];
  index: number;
  onDismiss: () => void;
}) {
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 2000 + index * 380);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(onDismiss, 240);
  };

  return (
    <div
      className="pointer-events-auto"
      style={{
        opacity: exiting ? 0 : entered ? 1 : 0,
        transform: exiting
          ? "translateY(-6px)"
          : entered
          ? "translateY(0px)"
          : "translateY(-14px)",
        transition: exiting
          ? "opacity 0.22s ease, transform 0.22s ease"
          : "opacity 0.5s cubic-bezier(0.34, 1.4, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.4, 0.64, 1)",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(to right, #fff8f7, #fdf4ff, #f4f4f4)",
          border: "1px solid rgba(239,85,65,0.15)",
          borderRadius: 9999,
          boxShadow: "0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
          maxWidth: "calc(100vw - 32px)",
        }}
      >
        <GridPattern id={toast.id} />
        <div className="relative z-10 flex items-center gap-3 px-4 py-2.5">
          <div
            className="shrink-0 w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--color-cherry)" }}
          />
          <p
            className="font-body text-foreground whitespace-nowrap leading-none"
            style={{ fontSize: "0.78rem" }}
          >
            {toast.plain}{" "}
            <button
              onClick={scrollToChat}
              className="font-medium underline underline-offset-2 decoration-dotted transition-colors duration-200"
              style={{ color: "var(--color-cherry)", background: "none", border: "none", padding: 0, cursor: "pointer", font: "inherit" }}
            >
              {toast.linked}
            </button>
          </p>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="shrink-0 transition-opacity duration-200 hover:opacity-60"
            style={{ color: "var(--color-foreground-faint)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const handleDismiss = (id: string) => {
    setDismissed((prev) => [...prev, id]);
  };

  const visible = TOASTS.filter((t) => !dismissed.includes(t.id));

  if (visible.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-2 py-3 px-4 w-full">
      {visible.map((toast, i) => (
        <Toast
          key={toast.id}
          toast={toast}
          index={i}
          onDismiss={() => handleDismiss(toast.id)}
        />
      ))}
    </div>
  );
}
