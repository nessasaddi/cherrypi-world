import React from 'react';

interface Step {
  n: string;
  title: string;
  body: string;
  accent: string;
  emoji: string;
}

function StepCard({ s, i }: { s: Step; i: number }) {
  const tilts = [-0.6, 0.4, -0.3];
  const tape = i % 2 === 0 ? 'l' : 'r';
  const tapeBg = i === 1 ? 'rgba(174,190,255,0.5)' : i === 2 ? 'rgba(208,221,87,0.5)' : 'var(--tape)';
  return (
    <div className="panel" style={{ padding: 'clamp(24px, 3vw, 36px)', height: '100%', transform: `rotate(${tilts[i]}deg)`, position: 'relative' }}>
      <span className={`tape ${tape}`} style={{ background: tapeBg }} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--ink-soft)' }}>{s.n}</span>
        <span style={{ fontSize: 18, color: s.accent }}>{s.emoji}</span>
      </div>
      <h3 className="h-display" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)', color: 'var(--ink)', lineHeight: 1.05, fontWeight: 500 }}>{s.title}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '14px 0 0' }}>{s.body}</p>
    </div>
  );
}

export default function Process() {
  const steps: Step[] = [
    { n: '01', title: 'understand', body: 'The brand, the audience, the constraints. What exists, what’s missing, what actually moves the work forward.', accent: 'var(--cherry)', emoji: '✦' },
    { n: '02', title: 'design', body: 'Identity, direction, the system. Every piece designed by hand, held to a thirteen-year craft standard.', accent: 'var(--lavender)', emoji: '○' },
    { n: '03', title: 'ship', body: 'Built, deployed, handed over — updates in hours, not sprints. The studio’s own tooling keeps it moving.', accent: 'var(--lime)', emoji: '✿' },
  ];

  return (
    <section id="process" className="section">
      <div aria-hidden style={{ position: 'absolute', top: '10%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(239,85,65,0.14) 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(20px, 4vw, 80px)', alignItems: 'end', marginBottom: 'clamp(50px, 8vh, 90px)' }}>
          <div>
            <div className="section-tag" style={{ marginBottom: 18 }}>
              <span className="num">§ 03</span>
              <span className="hand" style={{ color: 'var(--cherry)', fontSize: 22, transform: 'rotate(-3deg)', display: 'inline-block' }}>The process ✿</span>
            </div>
            <h2 className="h-display" style={{ fontSize: 'clamp(3.2rem, 6vw, 5rem)', color: 'var(--ink)' }}>
              Three steps. <em style={{ fontStyle: 'italic', color: 'var(--cherry)' }}>No ceremony.</em>
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0, maxWidth: 460 }}>
            How every engagement runs — <span className="marker">understand, design, ship.</span> Small enough to move fast, senior enough to get it right.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(18px, 2vw, 28px)' }}>
          {steps.map((s, i) => (
            <StepCard key={s.n} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
