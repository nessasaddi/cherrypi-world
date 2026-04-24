'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 'CPW-026', name: 'Prism Brand',      stack: ['content-os', 'brand', 'email'],         year: '2026', industry: 'cannabis',     accent: '#D0DD57' },
  { id: 'CPW-025', name: 'Meridian Objects', stack: ['content-engine', 'meta-ads', 'ai-gen'], year: '2025', industry: 'collectibles', accent: '#AEBEFF' },
  { id: 'CPW-024', name: 'Flux Brand',       stack: ['content-engine', 'social', 'brand'],    year: '2025', industry: 'cannabis',     accent: '#EF5541' },
  { id: 'CPW-023', name: 'Slate Studio',     stack: ['data', 'web', 'crm'],                   year: '2025', industry: 'cannabis',     accent: '#EDA599' },
  { id: 'CPW-022', name: 'Crest Co.',        stack: ['brand', 'listings', 'crm'],             year: '2025', industry: 'cannabis',     accent: '#D0DD57' },
];

type Project = typeof PROJECTS[0];

function WorkRow({ project: p, isLast }: { project: Project; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);
  const textAccent = p.accent === '#D0DD57' ? '#6e7a1f' : p.accent;

  return (
    <div
      className="cp-work-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid', gridTemplateColumns: '100px 1.5fr 1fr 1fr 80px',
        padding: '20px 24px',
        borderBottom: isLast ? 'none' : '1px solid rgba(36,36,36,0.08)',
        alignItems: 'center', gap: 10, cursor: 'pointer',
        background: hovered ? 'var(--bg)' : 'transparent',
        transition: 'background 0.2s',
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: textAccent, fontWeight: 500 }}>{p.id}</span>
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(16px, 1.6vw, 22px)', color: 'var(--fg)', letterSpacing: '-0.02em' }}>{p.name}</div>
      <div className="cp-work-stack" style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {p.stack.map((s) => (
          <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px', background: `${p.accent}2e`, color: textAccent, borderRadius: 4 }}>{s}</span>
        ))}
      </div>
      <span className="cp-work-industry" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)' }}>{p.industry}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-faint)', textAlign: 'right' }}>{p.year} →</span>
    </div>
  );
}

export default function WorkLog() {
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
    <section id="work" ref={ref} style={{ position: 'relative', padding: 'clamp(80px, 14vh, 160px) clamp(20px, 5vw, 80px)' }}>
      <div data-reveal style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cherry)', fontWeight: 500 }}>§ 04 · Work</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 0.95, letterSpacing: '-0.04em', margin: '18px 0 0', color: 'var(--fg)' }}>
            Shipped. <em style={{ fontWeight: 400, color: 'var(--fg-muted)' }}>Running.</em>
          </h2>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.08em' }}>
          showing 5 of 11 · under construction
        </div>
      </div>

      <div data-reveal style={{ background: '#fff', border: '1px solid rgba(36,36,36,0.10)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 14px 40px -20px rgba(0,0,0,0.08)' }}>
        <div className="cp-work-header" style={{ display: 'grid', gridTemplateColumns: '100px 1.5fr 1fr 1fr 80px', padding: '14px 24px', background: 'var(--surface)', borderBottom: '1px solid rgba(36,36,36,0.10)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-faint)', textTransform: 'uppercase', gap: 10 }}>
          <span>ID</span><span>Project</span><span>Stack</span><span>Industry</span><span>Year</span>
        </div>
        {PROJECTS.map((p, i) => (
          <WorkRow key={p.id} project={p} isLast={i === PROJECTS.length - 1} />
        ))}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .cp-work-header { grid-template-columns: 80px 1fr 50px !important; }
          .cp-work-header > span:nth-child(3),
          .cp-work-header > span:nth-child(4) { display: none; }
          .cp-work-row { grid-template-columns: 80px 1fr 50px !important; }
          .cp-work-stack, .cp-work-industry { display: none !important; }
        }
      `}</style>
    </section>
  );
}
