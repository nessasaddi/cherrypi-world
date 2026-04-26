'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassSpecimen from './GlassSpecimen';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { n: '01', title: 'Autonomous Content Infrastructure', body: 'Brand context in. Thirty days of on-brand content out. End-to-end pipeline, zero manual steps.', metric: '30 days / single input', accent: '#EF5541' },
  { n: '02', title: 'Studio Operating System', body: 'Unified workspace powering brand context, task routing, and AI orchestration across every engagement.', metric: '90+ tools · one layer', accent: '#AEBEFF' },
  { n: '03', title: 'Custom AI Tooling', body: 'Purpose-built tools encoding domain methodology — not generic prompts. Workflows with guardrails, voice, production output.', metric: '5 platforms · 0 handoffs', accent: '#D0DD57' },
  { n: '04', title: 'Web Infrastructure', body: 'Production applications, CI/CD, direct repo access. Full-stack dev, GitHub-native.', metric: 'Next · React · TS · Vercel', accent: '#EDA599' },
];

export default function Stack() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tweens = Array.from(el.querySelectorAll('[data-reveal]')).map((target) =>
      gsap.from(target, {
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: target, start: 'top 88%', toggleActions: 'play none none none' },
      })
    );
    return () => tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
  }, []);

  return (
    <section id="stack" ref={ref} style={{ position: 'relative', padding: 'clamp(48px, 8vh, 96px) clamp(20px, 5vw, 80px)', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: '10%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(239,85,65,0.18) 0%, transparent 65%)', filter: 'blur(80px)' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '10%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(174,190,255,0.30) 0%, transparent 65%)', filter: 'blur(80px)' }} />

      {/* Header */}
      <div data-reveal style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(20px, 4vw, 80px)', alignItems: 'end', marginBottom: 'clamp(50px, 8vh, 90px)' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cherry)', fontWeight: 500 }}>§ 03 · The Stack</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)', lineHeight: 0.95, letterSpacing: '-0.04em', margin: '20px 0 0', color: 'var(--fg)' }}>
            Built for real work.
          </h2>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.55, color: 'var(--fg-muted)', margin: 0, maxWidth: 440 }}>
          Live infrastructure. Not demos. Not concepts. Every system below is built, maintained, and running daily inside the studio.
        </p>
      </div>

      {/* 12-column card grid */}
      <div className="cp-stack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(16px, 2vw, 24px)' }}>
        {CARDS.map((c, i) => (
          <div key={i} className="cp-stack-card">
            <GlassSpecimen card={c} />
          </div>
        ))}
      </div>

      <style>{`
        .cp-stack-card { grid-column: span 12; }
        @media (min-width: 900px) {
          .cp-stack-grid .cp-stack-card:nth-child(1) { grid-column: span 7; }
          .cp-stack-grid .cp-stack-card:nth-child(2) { grid-column: span 5; }
          .cp-stack-grid .cp-stack-card:nth-child(3) { grid-column: span 5; }
          .cp-stack-grid .cp-stack-card:nth-child(4) { grid-column: span 7; }
        }
      `}</style>
    </section>
  );
}
