'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AGENTS = [
  { name: 'HARUSPEX', status: 'strategy · ready',      color: '#EF5541' },
  { name: 'AUGUR',    status: 'running · 36/36 PASS',  color: '#AEBEFF' },
  { name: 'IMAGO',    status: 'running · 9/10',         color: '#D0DD57' },
  { name: 'HERALD',   status: 'ready · paused',         color: '#EDA599' },
  { name: 'VIGIL',    status: 'monitor · wk 1/2',       color: '#EF5541' },
  { name: 'KRONOS',   status: 'sat · 9am · queued',     color: '#AEBEFF' },
];

export default function Lab() {
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
    <section id="live" ref={ref} style={{ position: 'relative', padding: 'clamp(48px, 8vh, 96px) clamp(20px, 5vw, 80px)', background: 'var(--fg)', color: 'var(--bg)', overflow: 'hidden', borderTopLeftRadius: 'clamp(24px, 4vw, 48px)', borderTopRightRadius: 'clamp(24px, 4vw, 48px)', marginTop: -1 }}>
      <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(239,85,65,0.35) 0%, transparent 65%)', filter: 'blur(50px)' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(174,190,255,0.30) 0%, transparent 65%)', filter: 'blur(50px)' }} />

      {/* Section header */}
      <div data-reveal style={{ position: 'relative', marginBottom: 'clamp(36px, 6vh, 60px)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--blush)', boxShadow: '0 0 0 3px rgba(237,165,153,0.22)', animation: 'cp-pulse 1.8s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--blush)', fontWeight: 500 }}>§ 05 · Lab · live right now</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(2rem, 5vw, 4.2rem)', lineHeight: 0.95, letterSpacing: '-0.04em', margin: '18px 0 0' }}>
          The multi-agent layer,<br />
          <em style={{ fontWeight: 400, color: 'rgba(244,244,244,0.55)' }}>actually running.</em>
        </h2>
      </div>

      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'clamp(20px, 3vw, 28px)' }}>

        {/* Terminal card */}
        <div data-reveal style={{ background: '#1a1a1a', borderRadius: 14, padding: 'clamp(18px, 2.5vw, 28px)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'var(--font-mono)', fontSize: 'clamp(11px, 1vw, 13px)', color: '#d0d0d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: 10, fontSize: 10, color: '#888' }}>cherrypi@studio · ~/oracle-batch</span>
          </div>
          <div style={{ lineHeight: 1.85 }}>
            <div><span style={{ color: '#EF5541' }}>❯</span> oracle-batch --cycle=0419 --instruments=3</div>
            <div style={{ color: '#6ac' }}>→ signal pull · meta ads · 14d window</div>
            <div style={{ color: '#EF5541' }}>{'  '}[FATIGUE_CPM] all instruments detected</div>
            <div style={{ color: '#6ac' }}>→ dispatching 5-stage pipeline</div>
            <div style={{ color: '#D0DD57' }}>{'  '}✓ HARUSPEX · strategy brief ready</div>
            <div style={{ color: '#D0DD57' }}>{'  '}✓ AUGUR · 36 components · 36/36 PASS</div>
            <div style={{ color: '#AEBEFF' }}>{'  '}⊙ IMAGO · gemini gen · 9/10 staged</div>
            <div style={{ color: '#D0DD57' }}>{'  '}✓ HERALD · 3 campaigns built · paused</div>
            <div style={{ color: '#888' }}>{'  '}· VIGIL · monitoring · week 1 of 2</div>
            <div>
              <span style={{ color: '#EF5541' }}>❯</span>{' '}
              <span style={{ display: 'inline-block', width: 8, height: 14, background: '#d0d0d0', verticalAlign: 'middle', animation: 'cp-blink 1s step-end infinite' }} />
            </div>
          </div>
        </div>

        {/* Agent status list */}
        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {AGENTS.map((a) => (
            <div key={a.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, boxShadow: `0 0 0 4px ${a.color}38`, animation: 'cp-pulse 2s ease-in-out infinite', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--bg)' }}>{a.name}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(244,244,244,0.55)' }}>{a.status}</span>
            </div>
          ))}
          <div style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'linear-gradient(90deg, rgba(239,85,65,0.25), rgba(174,190,255,0.25))', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(244,244,244,0.75)', letterSpacing: '0.1em' }}>COMPONENTS / RUN</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--bg)', fontWeight: 500 }}>36 · QA'd</span>
          </div>
        </div>
      </div>
    </section>
  );
}
