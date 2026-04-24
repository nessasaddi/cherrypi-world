'use client';

import { useState } from 'react';

export interface CardData {
  n: string;
  title: string;
  body: string;
  metric: string;
  accent: string;
}

export default function GlassSpecimen({ card }: { card: CardData }) {
  const [hovered, setHovered] = useState(false);

  // Lime (#D0DD57) needs darkening for readable text on light backgrounds
  const textAccent = card.accent === '#D0DD57' ? '#6e7a1f' : card.accent;

  const shadow = hovered
    ? `0 1px 0 rgba(255,255,255,0.9) inset, 0 40px 70px -30px rgba(0,0,0,0.2), 0 0 90px ${card.accent}4d`
    : `0 1px 0 rgba(255,255,255,0.9) inset, 0 30px 60px -30px rgba(0,0,0,0.15), 0 0 70px ${card.accent}1f`;

  return (
    <div
      data-reveal
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.58) 100%)',
        backdropFilter: 'blur(26px) saturate(180%)', WebkitBackdropFilter: 'blur(26px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.7)', borderRadius: 24,
        padding: 'clamp(24px, 3vw, 42px)', minHeight: 280,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        boxShadow: shadow,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(.2,.7,.2,1), box-shadow 0.4s cubic-bezier(.2,.7,.2,1)',
      }}
    >
      {/* Shine stripe */}
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)' }} />
      {/* Accent corner glow */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, background: `radial-gradient(circle, ${card.accent}59 0%, transparent 70%)`, filter: 'blur(10px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: textAccent, fontWeight: 500 }}>{card.n}</span>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${card.accent}40`, border: `1px solid ${card.accent}88`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: card.accent }} />
          </div>
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0, color: 'var(--fg)' }}>
          {card.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(14px, 1.1vw, 15px)', lineHeight: 1.6, color: 'var(--fg-muted)', margin: '16px 0 0' }}>
          {card.body}
        </p>
      </div>

      <div style={{ position: 'relative', marginTop: 24, display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, background: `${card.accent}38`, border: `1px solid ${card.accent}66` }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: card.accent, flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: textAccent, letterSpacing: '0.1em' }}>{card.metric}</span>
      </div>
    </div>
  );
}
