'use client';

import { useState, useEffect } from 'react';
import { DROP_TARGET_MS, DROP_TOTAL_MS } from './data';

function useCountdown(targetMs: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, targetMs - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    raw: diff,
  };
}

export default function Countdown() {
  const { d, h, m, s, raw } = useCountdown(DROP_TARGET_MS);
  const pct = Math.max(0, Math.min(1, 1 - raw / DROP_TOTAL_MS));
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div style={{ position: 'relative', padding: 'clamp(32px, 5vw, 64px) clamp(28px, 4vw, 56px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0))', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: '-40%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(239,85,65,0.13) 0%, transparent 65%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      {/* Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 10px', border: '1px solid rgba(239,85,65,0.33)', borderRadius: 999, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cherry)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cherry)', animation: 'cp-pulse 1.6s infinite', display: 'inline-block' }} />
          Dropping soon
        </span>
        <span style={{ padding: '5px 10px', background: 'rgba(208,221,87,0.12)', border: '1px solid rgba(208,221,87,0.4)', borderRadius: 999, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--lime)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>
          ⌥ FREE · OPEN-SOURCE
        </span>
      </div>

      {/* Headline */}
      <h3 style={{ position: 'relative', fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', letterSpacing: '-0.035em', lineHeight: 1, color: 'var(--bg)', fontWeight: 500, margin: 0, maxWidth: 880 }}>
        We&apos;re open-sourcing the<br />
        <em style={{ fontStyle: 'normal', color: 'var(--cherry)' }}>autonomous content generator.</em>
      </h3>
      <p style={{ position: 'relative', fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'rgba(255,255,255,0.65)', marginTop: 18, maxWidth: 600, lineHeight: 1.55, fontWeight: 300 }}>
        The same engine running in the reels above. Free repo, public on GitHub. Plug your product in, ship a month of on-brand content in an afternoon.
      </p>

      {/* Countdown row */}
      <div style={{ position: 'relative', display: 'flex', gap: 'clamp(16px, 3vw, 36px)', alignItems: 'flex-end', marginTop: 'clamp(36px, 5vw, 56px)', flexWrap: 'wrap' }}>
        {(['DAYS', 'HRS', 'MIN', 'SEC'] as const).map((l, i) => {
          const v = pad([d, h, m, s][i]);
          return (
            <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 70 }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem, 7vw, 5.6rem)', lineHeight: 0.9, fontWeight: 500, letterSpacing: '-0.045em', color: 'var(--bg)', fontVariantNumeric: 'tabular-nums' }}>{v}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.22em', marginTop: 8 }}>{l}</span>
            </div>
          );
        })}
        <a
          href="https://github.com/cherrypi-world"
          target="_blank"
          rel="noreferrer"
          style={{
            marginLeft: 'auto', alignSelf: 'flex-end',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 22px',
            background: 'var(--cherry)', color: '#1a1a1a',
            border: 0, borderRadius: 999,
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
            textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 600,
            textTransform: 'uppercase',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 8px 24px rgba(239,85,65,0.33)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/github.svg" alt="" width={14} height={14} style={{ filter: 'brightness(0)' }} />
          Notify me on drop
        </a>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'relative', marginTop: 'clamp(28px, 4vw, 40px)' }}>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct * 100}%`, background: 'var(--cherry)', boxShadow: '0 0 20px rgba(239,85,65,0.67)', transition: 'width 0.5s linear' }} />
        </div>
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em' }}>
          <span>repo · private</span>
          <span style={{ color: 'var(--cherry)' }}>{Math.round(pct * 100)}% · countdown to public</span>
          <span>repo · public</span>
        </div>
      </div>
    </div>
  );
}
