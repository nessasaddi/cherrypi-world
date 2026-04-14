"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const DISMISSED_KEY = "cp-toasts-v1";

const TOASTS = [
  {
    id: "workflow",
    plain: "Workflow broken?",
    linked: "Tell Vanessa — she'll build the fix.",
    href: "/chat",
  },
  {
    id: "brand",
    plain: "Need brand systems?",
    linked: "Tell Vanessa your goals.",
    href: "/chat",
  },
];

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
    const t = setTimeout(() => setEntered(true), 40 + index * 110);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(onDismiss, 260);
  };

  return (
    <div
      className="pointer-events-auto"
      style={{
        opacity: exiting ? 0 : entered ? 1 : 0,
        transform: exiting
          ? "translateY(-8px) scale(0.95)"
          : entered
          ? "translateY(0px) scale(1)"
          : "translateY(-16px) scale(0.93)",
        transition: exiting
          ? "opacity 0.24s ease, transform 0.24s ease"
          : "opacity 0.42s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1)",
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
            <Link
              href={toast.href}
              className="font-medium underline underline-offset-2 decoration-dotted transition-colors duration-200"
              style={{ color: "var(--color-cherry)" }}
            >
              {toast.linked}
            </Link>
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(DISMISSED_KEY);
    setDismissed(stored ? JSON.parse(stored) : []);
    setMounted(true);
  }, []);

  const handleDismiss = (id: string) => {
    const next = [...dismissed, id];
    setDismissed(next);
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(next));
  };

  const visible = TOASTS.filter((t) => !dismissed.includes(t.id));

  if (!mounted || visible.length === 0) return null;

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
