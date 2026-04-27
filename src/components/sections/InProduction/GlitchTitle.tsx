'use client';

import { useState, useEffect } from 'react';

export default function GlitchTitle({ children }: { children: React.ReactNode }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 220);
      t = setTimeout(loop, 1600 + Math.random() * 1400);
    };
    t = setTimeout(loop, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <h2
      style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 500,
        fontSize: 'clamp(2.4rem, 6.5vw, 5.6rem)',
        lineHeight: 0.92,
        letterSpacing: '-0.045em',
        margin: '20px 0 0',
        position: 'relative',
      }}
    >
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          transform: glitching ? 'translate(-1px, 1px)' : undefined,
          transition: glitching ? 'none' : 'transform 0.15s',
        }}
      >
        {children}
        {glitching && (
          <>
            <span
              aria-hidden
              style={{
                position: 'absolute', inset: 0,
                color: 'var(--cherry)',
                clipPath: 'inset(20% 0 55% 0)',
                transform: 'translate(-2px, 0)',
                mixBlendMode: 'screen',
              }}
            >{children}</span>
            <span
              aria-hidden
              style={{
                position: 'absolute', inset: 0,
                color: 'var(--lavender)',
                clipPath: 'inset(60% 0 10% 0)',
                transform: 'translate(2px, 0)',
                mixBlendMode: 'screen',
              }}
            >{children}</span>
          </>
        )}
      </span>
    </h2>
  );
}
