'use client';

import { useEffect, useRef, useState } from 'react';

const OVERLAY_ITEMS = [
  { num: '01', label: 'Home',     href: '#hero' },
  { num: '02', label: 'Operator', href: '#operator' },
  { num: '03', label: 'Stack',    href: '#stack' },
  { num: '04', label: 'Work',     href: '#work' },
  { num: '05', label: 'Lab',      href: '#live' },
  { num: '06', label: 'Connect',  href: '#connect' },
];

export default function MobileTopBar() {
  const [open, setOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Escape key + focus trap
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key === 'Tab') {
        const overlay = overlayRef.current;
        if (!overlay) return;
        const focusable = overlay.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Move focus into overlay when opened
  useEffect(() => {
    if (open) {
      const firstLink = overlayRef.current?.querySelector<HTMLElement>('a[href]');
      firstLink?.focus();
    }
  }, [open]);

  return (
    <>
      {/* Sticky top bar */}
      <div
        className="cp-topbar-mobile"
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          padding: '14px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(244,244,244,0.72)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        }}
      >
        {/* Left — brand anchor */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/cherry-animated.gif" alt="" style={{ width: 30, height: 'auto', mixBlendMode: 'multiply' }} />
          {/* Wordmark with animated shimmer gradient — height matched to cherry visual weight */}
          <svg
            viewBox="0 0 420.74 229.55"
            aria-label="Cherry Pi"
            role="img"
            style={{ height: 40, width: 'auto', display: 'block', flexShrink: 0, paddingTop: 10 }}
          >
            <defs>
              <linearGradient id="cp-wm-shimmer" x1="0" x2="420.74" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%"    stopColor="#EF5541" />
                <stop offset="20%"   stopColor="#EDA599" />
                <stop offset="40%"   stopColor="#AEBEFF" />
                <stop offset="60%"   stopColor="#D0DD57" />
                <stop offset="80%"   stopColor="#E9F2B1" />
                <stop offset="100%"  stopColor="#EF5541" />
                <animate attributeName="x1" from="-420.74" to="420.74" dur="5s" repeatCount="indefinite" />
                <animate attributeName="x2" from="0"       to="841.48" dur="5s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path fill="url(#cp-wm-shimmer)" d="M63.1,62.52c.07.8.06,1.56.05,2.15-.04,2.79-.53,5.74.65,8.38,2.8,6.23,9.54,6.43,14.85,3.19,5.27-3.22,8.33-9.29,8.33-15.4,0-11.61-10.66-22.83-25.72-22.83-27.25,0-52.54,28.17-52.54,57.44,0,20.9,12.66,36.56,31.03,36.56,7.11,0,13.06-3.57,19.21-6.83,1.47-.78,3.82-2.34,5.55-1.97,1.58.33,2.8,2.24,2.98,3.74.57,4.83-6.93,7.93-10.49,9.33-5.37,2.11-11.2,3.15-16.97,3.15C16.86,139.41,0,121.45,0,95.9,0,61.68,28.91,30.55,60.83,30.55c20.17,0,34.78,12.23,34.78,28.96,0,14.56-11.29,26.48-25.14,26.48-6.02,0-11.95-2.85-15.36-7.87-3.23-4.76-4.17-12.09-.85-17.08,1.26-1.89,3.2-3.05,5.52-2.85,2.27.2,3.16,2.32,3.33,4.33ZM351.66,96.8l-10.65,23.24c-1.43,2.99-2.73,5.71-2.73,9.09,0,6.36,5.32,9.48,10.78,9.48,10.26,0,16.1-10.65,19.09-17.14,1.03-2.39-.24-4.97-3-4.91-2.88.06-4.35,2.13-5.25,4.61-.38,1.04-.52,2.22-.97,3.21-.59,1.28-1.53,2.5-2.45,3.57-1.76,2.04-4.08,3.79-6.89,3.79-2.73,0-3.64-1.43-3.64-3.38,0-1.3.39-2.86,1.04-4.16l10.91-24.67c2.73-6.23-4.16-7.14-6.23-2.73ZM361.92,84.98c2.86,0,5.58-2.21,6.1-5.19.65-3.12-1.69-5.84-4.93-5.84-2.73,0-5.45,2.34-5.97,5.32-.52,2.99,1.43,5.71,4.8,5.71ZM322.44,54.33c-18.96,0-34.8,13.25-34.8,30.52,0,4.68,1.04,9.61,3.9,12.6,1.77,1.85,4.03,1.46,5.4-.6,1.24-1.85,1.44-4.19.63-6.26-.66-1.7-1.78-3.16-2.32-4.92-.51-1.64-.53-3.4-.26-5.08.53-3.38,2.16-6.61,4.25-9.29,3.89-4.99,9.68-8.3,15.83-9.64,2.17-.47,4.38-.7,6.6-.7,12.34,0,20.65,7.27,20.65,17.4,0,12.08-10.39,23.24-20.26,23.24-1.95,0-3.64-.52-5.06-1.17l12.73-27.66c2.34-4.93-4.42-7.01-6.36-2.86l-29.09,63.37c-2.08,4.67,4.42,7.14,6.36,2.86l13.5-29.35c1.95,1.04,4.93,1.82,7.66,1.82,13.89,0,27.66-14.28,27.66-30.65,0-14.02-11.17-23.63-27.01-23.63ZM420.74,96.62c-.07,10.51-1.8,21.01-5.13,30.98-1.75,4.96-3.84,9.83-6.17,14.49-2.44,4.65-5.23,9.13-8.42,13.34-6.38,8.4-14.28,15.66-23.21,21.26-13.54,8.08-28.65,12.92-44.18,15.22-5.15.68-10.34,1.05-15.51,1.19-10.36.26-20.7-.52-30.9-2.04-10.2-1.55-20.26-3.8-30.13-6.71-7.81-2.3-15.51-4.99-23.07-8.01-.8,0-1.5.23-1.97,1.02-19,32.15-49.33,52.2-80.71,52.2s-53.89-18.61-53.89-42.18,22.91-42.57,57.93-42.57c25.51,0,49.73,9.63,73.16,21.09.91.52,1.82.13,2.34-.78.39-.91.78-1.69,1.17-2.47l12.5-26.69c-1.82,1.3-4.43,2.08-6.12,2.08-3.93,0-6.91-1.68-8.49-4.57-2.97,2.98-6.71,5.15-11.34,5.15-5.45,0-10-3.12-10-9.22,0-2.47.78-5.58,1.95-8.05l7.27-15.45c.78-1.56,1.17-3.25,1.17-4.29,0-3.51-4.55-4.03-6.23-6.1l-11.81,25.97c-2.99,6.5-8.83,17.15-19.09,17.15-5.45,0-10-3.12-10-9.22,0-2.47.78-5.58,1.95-8.05l6.49-13.63c.91-1.82,1.95-4.16,1.95-7.01s-2.21-5.06-5.32-7.01c-5.71,19.35-16.36,44.93-35.58,44.93-6.69,0-12.55-2.32-15.27-6.72-3.18,3.75-7.37,6.72-12.78,6.72s-10.13-2.99-10.13-9.09c0-2.6.78-5.71,1.95-8.18l7.01-15.19c.91-1.82,1.17-3.38,1.17-4.42,0-1.82-1.3-2.99-3.51-2.99-5.19,0-9.22,5.45-10.65,8.57l-6.36,14.15-5.97,12.86c-2.99,6.36-9.35,3.77-6.75-1.82l5.71-12.47s22.39-52,22.39-52c.82-1.74,2.92-3.16,4.9-2.61,1.11.31,1.55,1.5,1.6,2.57.12,2.66-1.42,5.59-2.49,7.95-1.19,2.62-2.55,5.16-3.73,7.79-2.09,4.67-3.98,9.42-6.05,14.09h.26c1.95-3.38,5.58-5.84,9.48-5.84,4.8,0,8.44,3.64,8.44,8.57,0,2.34-.91,5.97-2.21,8.7l-6.88,14.93c-.91,1.95-1.3,3.64-1.3,4.67,0,2.08,1.56,2.86,3.64,2.86,5.45,0,8.96-5.97,11.69-11.69.09-.21.2-.4.31-.58.42-1.2.92-2.44,1.51-3.7l5.06-10.91c2.08-4.16,6.1-12.86,15.71-12.86,7.4,0,9.87,4.67,9.87,9.35,0,2.21-.65,4.67-1.3,6.36-3.25,8.44-8.7,12.08-14.8,12.08-3.64,0-6.1-1.69-7.27-3.25l-2.21,4.93s-.01.03-.02.04c-.89,1.92-.63,2.56-.63,2.95,0,3.9,3.9,7.4,9.61,7.4,16.88,0,25.19-24.8,29.74-41.29-6.49-3.12-13.25-6.88-13.38-15.19,0-6.36,4.68-9.87,9.87-9.87,7.92,0,11.82,7.66,11.82,14.8,0,1.3-.26,3.77-.78,6.49,5.71,3.38,11.04,7.4,11.04,13.76,0,3.51-1.3,6.49-2.6,9.09l-6.88,14.54c-.65,1.3-1.17,2.99-1.17,4.42,0,1.82.91,3.12,3.38,3.12,5.45,0,8.96-5.97,11.68-11.68,0,0,17.14-37.02,17.14-37.02,2.08-4.42,9.35-3.51,6.36,2.73-4.29,9.09,8.83,3.77,8.83,14.93,0,1.95-1.17,5.84-1.95,7.53l-7.53,15.97c-.65,1.3-1.17,2.99-1.17,4.42,0,1.82.91,3.12,3.38,3.12,5.45,0,8.96-5.97,11.69-11.69.16-.36.35-.68.56-.97l10.57-22.95c2.08-4.43,9.11-3.51,6.25,2.73l-11.32,24.86c-.65,1.56-1.17,3.25-1.17,4.3,0,2.08,1.82,3.12,4.04,3.12,6.25,0,10.02-7.81,11.19-10.41l11.32-24.6c2.08-4.43,9.11-3.51,6.25,2.73l-14.62,32.29c.31-.09.64-.13.99-.13,5.56,0,8.44-5.37,9.63-10,.58-2.22,1.58-4.65,3.73-5.46,3.13-1.18,6.6,2.06,5.25,5.18-2.99,6.51-8.85,17.18-19.13,17.18-1.47,0-2.39-.64-2.84-1.53l-13.08,28.87c-.39,1.04-.91,1.95-1.43,2.99-.14.34-.2.62-.19.86,7.33,3.06,14.81,5.77,22.41,8.09,9.54,2.9,19.25,5.23,29.08,6.74,9.83,1.51,19.76,2.3,29.65,2.1,9.89-.2,19.75-1.36,29.26-3.82,30.66-8.9,50.54-26.79,61.59-56.84,3.01-9.26,4.55-19.02,4.53-28.76-.02-9.74-1.62-19.46-4.72-28.64-3.11-9.18-7.82-17.77-13.85-25.28-6.04-7.51-13.41-13.89-21.63-18.92-4.1-2.53-8.43-4.7-12.89-6.58-2.23-.91-4.52-1.8-6.77-2.55-2.27-.75-4.58-1.4-6.91-1.95-9.32-2.21-19.03-2.85-28.61-2.08-9.57.78-19.04,2.99-27.87,6.59-8.82,3.6-17.07,8.56-23.97,14.86-5.47,4.99-11.27,10.48-14.2,17.43-.97,2.29-1.48,4.86-3,6.87-1.75,2.32-4.64,2.64-7.23,1.57-3.34-1.38-4.92-5.19-3.55-8.53.02-.06.05-.12.08-.18l.02-.05c2.3-5.08,5.2-9.87,8.56-14.25,3.36-4.39,7.19-8.37,11.34-11.92,8.3-7.11,17.84-12.48,27.87-16.25,5.02-1.89,10.17-3.36,15.39-4.45,5.22-1.09,10.51-1.81,15.83-2.12,10.63-.61,21.36.34,31.69,3.05,2.58.68,5.14,1.46,7.66,2.35,2.53.91,4.95,1.9,7.38,2.96,4.83,2.16,9.53,4.64,13.99,7.52,8.94,5.73,16.95,12.97,23.44,21.39,6.5,8.41,11.41,17.99,14.67,28.04,3.24,10.06,4.78,20.62,4.67,31.13ZM137.05,111.21c1.04,1.17,2.86,1.69,4.68,1.69,2.86,0,5.45-2.21,7.53-6.23.65-1.3,1.43-3.12,1.43-4.8s-.65-3.38-3.64-3.38c-2.47,0-4.93,1.95-7.53,7.4l-2.47,5.32ZM173.02,80.31c0-3.77-1.82-8.05-5.19-8.05-1.69,0-3.12.91-3.12,2.99,0,3.25,3.64,5.71,8.05,8.31.26-1.04.26-1.95.26-3.25ZM225.41,171.88c-22.26-11.19-45.35-22.06-69.77-20.57-30.23,1.85-49.29,16.24-49.29,35.77s18.57,35.96,44.22,35.96c30.59,0,58.19-19.66,75.5-48.81.52-.91.26-1.95-.65-2.34Z" />
          </svg>
        </a>

        {/* Right — toggle */}
        <button
          ref={toggleRef}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--fg)',
          }}>
            {open ? 'CLOSE' : 'MENU'}
          </span>
          {/* Animated icon: 22×10 container, two 1.5px lines morphing to × */}
          <span style={{ position: 'relative', display: 'inline-block', width: 22, height: 10, flexShrink: 0 }}>
            <span style={{
              position: 'absolute', left: 0, right: 0, height: 1.5,
              background: 'var(--fg)', borderRadius: 1,
              top: open ? 4 : 0,
              transform: open ? 'rotate(45deg)' : 'none',
              transition: 'top 0.25s cubic-bezier(.2,.7,.2,1), transform 0.25s cubic-bezier(.2,.7,.2,1)',
            }} />
            <span style={{
              position: 'absolute', left: 0, right: 0, height: 1.5,
              background: 'var(--fg)', borderRadius: 1,
              top: open ? 4 : 9,
              transform: open ? 'rotate(-45deg)' : 'none',
              transition: 'top 0.25s cubic-bezier(.2,.7,.2,1), transform 0.25s cubic-bezier(.2,.7,.2,1)',
            }} />
          </span>
        </button>
      </div>

      {/* Overlay — kept in DOM, toggled via opacity + pointer-events */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="cp-topbar-mobile"
        style={{
          position: 'fixed', inset: 0, zIndex: 49,
          background: 'var(--bg)', padding: '80px 24px 32px',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: reducedMotion ? 'opacity 0.01s' : 'opacity 0.3s cubic-bezier(.2,.7,.2,1)',
        }}
      >
        {/* Ambient glows */}
        <div aria-hidden style={{
          position: 'absolute', top: '-20%', right: '-30%',
          width: 500, height: 500, pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(239,85,65,0.13) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: '-25%', left: '-30%',
          width: 500, height: 500, pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(174,190,255,0.16) 0%, transparent 60%)',
          filter: 'blur(45px)',
        }} />

        {/* Nav list */}
        <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {OVERLAY_ITEMS.map((item, i) => {
            const delay = reducedMotion ? 0 : 0.08 + i * 0.05;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '18px 2px',
                  borderBottom: '1px solid rgba(36,36,36,0.08)',
                  textDecoration: 'none',
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateX(-12px)',
                  transition: reducedMotion
                    ? 'opacity 0.01s'
                    : `opacity 0.45s cubic-bezier(.2,.7,.2,1) ${delay}s, transform 0.45s cubic-bezier(.2,.7,.2,1) ${delay}s`,
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em',
                  color: 'var(--fg-faint)', minWidth: 22,
                }}>{item.num}</span>
                <span style={{
                  fontFamily: 'var(--font-heading)', fontSize: 34, fontWeight: 500,
                  letterSpacing: '-0.035em', lineHeight: 1, color: 'var(--fg)', flex: 1,
                }}>{item.label}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--fg-faint)',
                  marginLeft: 'auto',
                }}>→</span>
              </a>
            );
          })}
        </nav>

        {/* Footer strip */}
        <div style={{
          paddingTop: 24, borderTop: '1px solid rgba(36,36,36,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--fg-muted)',
        }}>
          <span>hello@cherrypi.world</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              display: 'inline-block', width: 5, height: 5, borderRadius: '50%',
              background: 'var(--lime)', animation: 'cp-pulse 1.8s ease-in-out infinite',
            }} />
            V3.2
          </span>
        </div>
      </div>

      <style>{`
        @media (min-width: 821px) { .cp-topbar-mobile { display: none !important; } }
      `}</style>
    </>
  );
}
