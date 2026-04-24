'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { l: 'HOM', href: '#hero',     section: 'hero' },
  { l: 'STK', href: '#stack',    section: 'stack' },
  { l: 'OPS', href: '#operator', section: 'operator' },
  { l: 'WRK', href: '#work',     section: 'work' },
  { l: 'LAB', href: '#live',     section: 'live' },
  { l: 'MSG', href: '#connect',  section: 'connect' },
];

export default function LeftRail() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(section); },
        { threshold: 0.3, rootMargin: '-5% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <aside style={{
      position: 'fixed', top: 0, bottom: 0, left: 0, width: 72, zIndex: 50,
      background: 'var(--bg)', borderRight: '1px solid rgba(36,36,36,0.08)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '22px 0',
    }}
    className="cp-rail-desktop"
    >
      <a href="#hero" style={{ display: 'block', lineHeight: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/cherry-animated.gif" alt="Cherry Pi" style={{ width: 36, height: 'auto', mixBlendMode: 'multiply' }} />
      </a>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 32 }}>
        {NAV_ITEMS.map((n) => {
          const isActive = active === n.section;
          return (
            <a
              key={n.l}
              href={n.href}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: isActive ? 'var(--fg)' : 'transparent',
                border: isActive ? 'none' : '1px solid rgba(36,36,36,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.06em',
                color: isActive ? 'var(--bg)' : 'var(--fg-muted)',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
            >
              {n.l}
            </a>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <span style={{
          display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
          background: 'var(--cherry)', boxShadow: '0 0 0 3px rgba(239,85,65,0.22)',
          animation: 'cp-pulse 1.8s ease-in-out infinite',
        }} />
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--fg-faint)',
          letterSpacing: '0.1em', writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        }}>
          v3.2 · 2026
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) { .cp-rail-desktop { display: none !important; } }
      `}</style>
    </aside>
  );
}
