"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Founder", href: "#founder" },
  { label: "Connect", href: "#connect" },
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
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 py-5 flex items-center justify-end transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-10 text-[12px] font-body text-foreground-muted tracking-[0.15em] uppercase">
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
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-white/[0.04] md:hidden">
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
          </ul>
        </div>
      )}
    </nav>
  );
}
