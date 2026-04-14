"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "What we build", href: "#what-we-build" },
  { label: "How we work", href: "#how-we-work" },
  { label: "Services", href: "#services" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-black/[0.06]"
          : "bg-transparent"
      }`}
    >
      {/* Wordmark */}
      <a href="#" aria-label="CherryPi home">
        <div
          className="w-[90px] h-[38px] animate-gradient-text bg-[length:300%_auto]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-cherry), var(--color-lime), var(--color-lavender), var(--color-cherry))",
            WebkitMaskImage: "url(/logos/wordmark-gradient.svg)",
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskImage: "url(/logos/wordmark-gradient.svg)",
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
          }}
        />
      </a>

      {/* Desktop links + CTA */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex items-center gap-8 text-[11px] font-body text-foreground-muted tracking-[0.15em] uppercase">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-cherry after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/chat"
          className="text-[11px] font-body tracking-[0.1em] uppercase px-5 py-2 rounded-full transition-all duration-300"
          style={{
            background: "var(--color-foreground)",
            color: "var(--color-background)",
          }}
        >
          Start a project
        </a>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-foreground-muted hover:text-foreground transition-colors p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {mobileOpen ? (
            <path d="M6 6l12 12M6 18L18 6" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-black/[0.06] md:hidden">
          <ul className="flex flex-col px-8 py-8 gap-6 text-sm font-body tracking-[0.15em] uppercase">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-foreground-muted hover:text-foreground transition-colors duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/chat"
                className="text-cherry font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Start a project →
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
