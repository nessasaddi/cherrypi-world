import React from 'react';

interface StackCardData {
  n: string;
  title: string;
  body: string;
  metrics: string[];
  accent: string;
  emoji: string;
}

function StackCard({ c, i }: { c: StackCardData; i: number }) {
  const tilts = [-0.6, 0.4, -0.3, 0.7];
  const tape = i % 2 === 0 ? 'l' : 'r';
  const tapeBg = i === 1 ? 'rgba(174,190,255,0.5)' : i === 2 ? 'rgba(208,221,87,0.5)' : 'var(--tape)';
  return (
    <div className="panel" style={{ padding: 'clamp(24px, 3vw, 36px)', height: '100%', transform: `rotate(${tilts[i]}deg)`, position: 'relative' }}>
      <span className={`tape ${tape}`} style={{ background: tapeBg }} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--ink-soft)' }}>{c.n}</span>
        <span style={{ fontSize: 18, color: c.accent }}>{c.emoji}</span>
      </div>
      <h3 className="h-display" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)', color: 'var(--ink)', lineHeight: 1.05, fontWeight: 500 }}>{c.title}</h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '14px 0 22px' }}>{c.body}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {c.metrics.map((m, j) => (
          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-soft)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.accent, flexShrink: 0 }} />
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const cards: StackCardData[] = [
    { n: '01', title: 'Autonomous content infrastructure', body: 'Brand context in. Thirty days of on-brand content out. End-to-end pipeline, zero manual steps.', metrics: ['Months of content, one input','Ready to post','On-brand, every time'], accent: 'var(--cherry)', emoji: '✦' },
    { n: '02', title: 'Studio operating system', body: 'Unified workspace powering brand context, task routing, and AI orchestration across every engagement.', metrics: ['All your tools, connected','Tasks handled automatically','Runs 24/7'], accent: 'var(--lavender)', emoji: '◌' },
    { n: '03', title: 'Custom AI tooling', body: 'Purpose-built tools encoding domain methodology — not generic prompts. Workflows with guardrails, voice, production output.', metrics: ['Sounds like your brand','Not generic AI','Built for your workflow'], accent: 'var(--lime)', emoji: '✿' },
    { n: '04', title: 'Web infrastructure', body: 'Production applications, CI/CD, direct repo access. Full-stack dev, GitHub-native.', metrics: ['Live sites, not mockups','Updates in hours','You own everything'], accent: 'var(--blush)', emoji: '❀' },
  ];

  return (
    <section id="stack" className="section">
      <div aria-hidden style={{ position: 'absolute', top: '10%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(239,85,65,0.14) 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(20px, 4vw, 80px)', alignItems: 'end', marginBottom: 'clamp(50px, 8vh, 90px)' }}>
          <div>
            <div className="section-tag" style={{ marginBottom: 18 }}>
              <span className="num">§ 03</span>
              <span className="hand" style={{ color: 'var(--cherry)', fontSize: 26, transform: 'rotate(-3deg)', display: 'inline-block' }}>The stack ✿</span>
            </div>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', color: 'var(--ink)' }}>
              Built for <em style={{ fontStyle: 'italic', color: 'var(--cherry)' }}>real</em><br/>work.
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0, maxWidth: 460 }}>
            Live infrastructure. Not demos. Not concepts. Every system below is <span className="marker">built, maintained, and running daily</span> inside the studio.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(18px, 2vw, 28px)' }}>
          {cards.map((c, i) => (
            <div key={c.n} className={`stack-card stack-card-${i}`}>
              <StackCard c={c} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
