"use client";

import { useState } from "react";
import Link from "next/link";
import AnnouncementBanner from "@/components/ui/AnnouncementBanner";

function BookmarkButton() {
  const [label, setLabel] = useState<string | null>(null);

  const handleBookmark = async () => {
    // Mobile: use Web Share API (opens native share sheet with bookmark option)
    if (navigator.share) {
      try {
        await navigator.share({ title: "Cherry Pi", url: window.location.href });
      } catch {
        // User dismissed — no feedback needed
      }
      return;
    }

    // Desktop: show keyboard shortcut hint
    const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    setLabel(isMac ? "Press ⌘D" : "Press Ctrl+D");
    setTimeout(() => setLabel(null), 2500);
  };

  return (
    <button
      onClick={handleBookmark}
      aria-label="Bookmark Cherry Pi"
      title="Bookmark this page"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px 5px 6px",
        borderRadius: 12,
        border: `1px solid ${label ? "rgba(208,221,87,0.5)" : "rgba(208,221,87,0.28)"}`,
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: label
          ? "0 0 0 1px rgba(208,221,87,0.2), 0 4px 20px rgba(208,221,87,0.22)"
          : "0 0 0 1px rgba(208,221,87,0.08), 0 2px 12px rgba(208,221,87,0.10), 0 1px 3px rgba(0,0,0,0.04)",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Glow overlay */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          background: "radial-gradient(ellipse at 30% 50%, rgba(208,221,87,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Icon box */}
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          background: "linear-gradient(135deg, rgba(208,221,87,0.18), rgba(174,190,255,0.14))",
          border: "1px solid rgba(208,221,87,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill={label ? "var(--color-lime)" : "none"}
          stroke="var(--color-lime)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </span>

      {/* Label */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: label ? "var(--color-lime)" : "var(--color-foreground-muted)",
          fontFamily: "var(--font-body), sans-serif",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          transition: "color 0.3s ease",
        }}
      >
        {label ?? "Save"}
      </span>
    </button>
  );
}

export default function StickyHeader() {
  return (
    <div
      className="fixed top-0 left-0 z-50 w-full"
      style={{
        background: "rgba(244, 244, 244, 0.60)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Wordmark row */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1">
        <Link href="/" aria-label="Cherry Pi home">
          <div
            className="animate-gradient-text bg-[length:300%_auto]"
            style={{
              width: 90,
              height: 38,
              backgroundImage:
                "linear-gradient(to right, var(--color-cherry), var(--color-lime), var(--color-lavender), var(--color-cherry))",
              WebkitMaskImage: "url(/logos/wordmark-gradient.svg)",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "left center",
              maskImage: "url(/logos/wordmark-gradient.svg)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "left center",
            }}
          />
        </Link>
        <BookmarkButton />
      </div>

      {/* Announcement toasts */}
      <AnnouncementBanner />

      {/* Bottom fade */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: "100%",
          height: 36,
          background: "linear-gradient(to bottom, rgba(244, 244, 244, 0.45), transparent)",
        }}
      />
    </div>
  );
}
