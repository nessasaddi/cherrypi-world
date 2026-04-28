'use client';

import { useState, useEffect, useRef } from 'react';
import FlowChart from './FlowChart';

// ── GlitchTitle ──────────────────────────────────────────────────────────────

function GlitchTitle({ children, accent = 'var(--cherry)', alt = 'var(--lavender)' }: {
  children: React.ReactNode; accent?: string; alt?: string;
}) {
  const [glitching, setG] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      setG(true);
      setTimeout(() => setG(false), 240);
      t = setTimeout(loop, 1600 + Math.random() * 1800);
    };
    t = setTimeout(loop, 800);
    return () => clearTimeout(t);
  }, []);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <style>{`.gt-layer, .gt-layer * { color: inherit !important; }`}</style>
      <span style={{ position: 'relative', display: 'inline-block', transform: glitching ? 'translate(-1px,1px)' : 'translate(0,0)', transition: glitching ? 'none' : 'transform 0.15s' }}>
        {children}
        <span aria-hidden className="glitch-layer gt-layer" style={{ position: 'absolute', inset: 0, color: accent, clipPath: 'inset(8% 0 60% 0)', transform: glitching ? 'translate(-3px,0)' : 'translate(0,0)', opacity: glitching ? 0.85 : 0, pointerEvents: 'none' }}>{children}</span>
        <span aria-hidden className="glitch-layer gt-layer" style={{ position: 'absolute', inset: 0, color: alt, clipPath: 'inset(55% 0 8% 0)', transform: glitching ? 'translate(3px,0)' : 'translate(0,0)', opacity: glitching ? 0.85 : 0, pointerEvents: 'none' }}>{children}</span>
      </span>
    </span>
  );
}


// ── Countdown ────────────────────────────────────────────────────────────────

function useCountdown(target: number) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const raw = Math.max(0, target - now);
  return {
    d: Math.floor(raw / 86400000),
    h: Math.floor(raw / 3600000) % 24,
    m: Math.floor(raw / 60000) % 60,
    s: Math.floor(raw / 1000) % 60,
    raw,
  };
}

function Countdown() {
  const target = new Date('2027-05-05T16:00:00Z').getTime();
  const { d, h, m, s, raw } = useCountdown(target);
  const total = 60 * 86400000;
  const pct = Math.max(0, Math.min(1, 1 - raw / total)) * 100;

  const Cell = ({ v, label }: { v: number; label: string }) => (
    <div style={{ flex: 1, textAlign: 'center', padding: '20px 8px', borderRight: '1px dashed rgba(255,250,240,0.15)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', color: 'var(--paper)', fontVariantNumeric: 'tabular-nums', lineHeight: 0.95, fontStyle: 'italic' }}>{String(v).padStart(2, '0')}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,250,240,0.5)', letterSpacing: '0.22em', marginTop: 6 }}>{label}</div>
    </div>
  );

  return (
    <div style={{ background: 'rgba(255,250,240,0.04)', border: '1px solid rgba(255,250,240,0.12)', borderRadius: 22, padding: 'clamp(28px, 4vw, 48px)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', top: '-30%', right: '-10%', width: 360, height: 360, background: 'radial-gradient(circle, rgba(208,221,87,0.18) 0%, transparent 60%)', filter: 'blur(40px)' }} />
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22, position: 'relative' }}>
        <span className="sticker cherry" style={{ '--tilt': '-2deg' } as React.CSSProperties}>● dropping soon</span>
        <span className="sticker lime" style={{ '--tilt': '1.5deg' } as React.CSSProperties}>⌥ free · open-source</span>
      </div>
      <h3 className="h-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', color: 'var(--paper)', lineHeight: 1.02, position: 'relative' }}>
        We&apos;re <em style={{ fontStyle: 'italic', color: 'var(--lime)' }}>open-sourcing</em><br/>
        the autonomous content generator.
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.6, color: 'rgba(255,250,240,0.7)', margin: '18px 0 0', maxWidth: 580, position: 'relative' }}>
        The same engine running in the reels above. Free repo, public on GitHub. Plug your product in, ship a month of on-brand content in an afternoon.
      </p>
      <div style={{ display: 'flex', marginTop: 32, borderTop: '1px solid rgba(255,250,240,0.12)', borderBottom: '1px solid rgba(255,250,240,0.12)', position: 'relative' }}>
        <Cell v={d} label="DAYS" />
        <Cell v={h} label="HRS" />
        <Cell v={m} label="MIN" />
        <div style={{ flex: 1, textAlign: 'center', padding: '20px 8px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', color: 'var(--cherry)', fontVariantNumeric: 'tabular-nums', lineHeight: 0.95, fontStyle: 'italic' }}>{String(s).padStart(2, '0')}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,250,240,0.5)', letterSpacing: '0.22em', marginTop: 6 }}>SEC</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,250,240,0.4)', letterSpacing: '0.18em', margin: '18px 0 8px' }}>
        <span>repo · private</span>
        <span>{pct.toFixed(0)}% · countdown to public</span>
        <span>repo · public</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,250,240,0.08)', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--lime)', borderRadius: 2, transition: 'width 1s' }} />
      </div>
      <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', position: 'relative' }}>
        <a className="btn primary" href="#connect" style={{ background: 'var(--lime)', color: 'var(--ink)', borderColor: 'var(--ink)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          Notify me on drop
        </a>
        <span className="hand" style={{ fontSize: 19, color: 'var(--butter)' }}>Or just bookmark this →</span>
      </div>
    </div>
  );
}


// ── CaseStudy ────────────────────────────────────────────────────────────────

function AnimatedNum({ from, to, format = (v: number) => String(Math.round(v)), trigger }: {
  from: number; to: number; format?: (v: number) => string; trigger: boolean;
}) {
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!trigger) return;
    let raf: number, t0: number | undefined;
    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 1900);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, from, to]);
  return <>{format(v)}</>;
}

function MetricCard({ label, plain, from, to, format, delta, color, trigger }: {
  label: string; plain: string; from: number; to: number; format: (v: number) => string;
  delta: string; color: string; trigger: boolean;
}) {
  return (
    <div style={{ padding: 24, position: 'relative', background: 'rgba(255,250,240,0.06)', border: '1px solid rgba(255,250,240,0.1)', borderRadius: 16 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,250,240,0.5)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 38, color: 'var(--paper)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        <AnimatedNum from={from} to={to} format={format} trigger={trigger} />
      </div>
      <div style={{ marginTop: 8, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="sticker" style={{ background: color, fontSize: 11, padding: '4px 10px', '--tilt': '-1deg', boxShadow: '2px 2px 0 rgba(0,0,0,0.4)' } as React.CSSProperties}>{delta}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-hand)', fontSize: 15, color: 'rgba(255,250,240,0.55)', marginTop: 12, lineHeight: 1.2 }}>{plain}</div>
    </div>
  );
}

function CaseStudy() {
  const ref = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTrigger(true); }, { threshold: 0.3 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  const events = [
    ['T+00:00', 'DETECT', 'ad #4172 fatigue threshold reached'],
    ['T+00:04', 'BRIEF',  'generated brief · ref ad #4172'],
    ['T+00:18', 'GEN',    '12 creative variants generated'],
    ['T+00:24', 'QA',     '8 of 12 passed brand QA'],
    ['T+00:31', 'PUSH',   'next round live on meta'],
    ['T+72:00', 'REPORT', 'CTR +14% vs replaced cohort'],
  ] as const;

  const eventColor = (c: string) => {
    if (c === 'DETECT' || c === 'PUSH') return 'var(--cherry)';
    if (c === 'BRIEF') return 'var(--lavender)';
    if (c === 'GEN' || c === 'QA') return '#7a8a30';
    return 'var(--blush)';
  };

  return (
    <div ref={ref} style={{ padding: 'clamp(28px, 4vw, 48px)', position: 'relative', background: 'rgba(255,250,240,0.04)', border: '1px solid rgba(255,250,240,0.12)', borderRadius: 22, overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
        <span className="sticker lav" style={{ '--tilt': '-2deg' } as React.CSSProperties}>case study</span>
        <span className="sticker mint" style={{ '--tilt': '1.5deg' } as React.CSSProperties}>meta ads · auto-publish</span>
      </div>
      <h3 className="h-display" style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.8rem)', color: 'var(--paper)', lineHeight: 1.05 }}>
        <em style={{ fontStyle: 'italic', color: 'var(--cherry)' }}>Meta Ads</em>, on autopilot.
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'rgba(255,250,240,0.7)', maxWidth: 640, margin: '18px 0 28px' }}>
        When the system spots ad fatigue it briefs new creative, generates it, QAs it, and pushes the next round to Meta &mdash; without a person in the loop. <span style={{ color: 'var(--paper)', fontWeight: 500 }}>Your ads refresh themselves before they get tired.</span>
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 18, marginBottom: 30 }}>
        <MetricCard label="CPA · cost / acquisition" plain="it costs less to get a customer." from={58} to={38} format={(v) => `$${v.toFixed(2)}`} delta="-34%" color="var(--lime)" trigger={trigger} />
        <MetricCard label="CTR · click-through" plain="more people are tapping the ads." from={1.4} to={2.5} format={(v) => `${v.toFixed(2)}%`} delta="+1.81×" color="var(--lavender)" trigger={trigger} />
        <MetricCard label="creative / wk" plain="variants tested per week." from={4} to={42} format={(v) => String(Math.round(v))} delta="+10.5×" color="var(--cherry)" trigger={trigger} />
        <MetricCard label="human_touch" plain="hours of manual work per cycle." from={18} to={1.5} format={(v) => `${v.toFixed(1)}h`} delta="-92%" color="var(--blush)" trigger={trigger} />
      </div>
      <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 14, padding: 20, fontFamily: 'var(--font-mono)', fontSize: 11.5, lineHeight: 1.9, color: 'rgba(255,250,240,0.65)' }}>
        <div style={{ color: 'var(--paper)', marginBottom: 10, letterSpacing: '0.2em', fontSize: 9 }}>EVENT_LOG · 60d WINDOW · LIVE</div>
        {events.map(([t, c, d], i) => (
          <div key={i} style={{ padding: '6px 0', borderBottom: '1px dashed rgba(255,250,240,0.1)' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 2 }}>
              <span style={{ color: 'rgba(255,250,240,0.35)' }}>{t}</span>
              <span style={{ color: eventColor(c) }}>[{c}]</span>
            </div>
            <span>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── InProduction (main export) ───────────────────────────────────────────────

export default function InProduction() {
  return (
    <section id="in-production" className="section dark-section">
      <div aria-hidden style={{ position: 'absolute', top: '-15%', right: '-10%', width: 720, height: 720, background: 'radial-gradient(circle, rgba(239,85,65,0.28) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '10%', left: '-15%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(184,227,201,0.20) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'end', marginBottom: 'clamp(40px, 5vw, 70px)' }}>
          <div>
            <div className="section-tag" style={{ marginBottom: 18 }}>
              <span className="dot" />
              <span className="num" style={{ color: 'rgba(255,250,240,0.5)' }}>§ 04</span>
              <span className="hand" style={{ color: 'var(--butter)', fontSize: 22, transform: 'rotate(-2deg)' }}>In production · live ✿</span>
            </div>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.6rem)', color: 'var(--paper)', lineHeight: 0.96 }}>
              <GlitchTitle>Built. Shipped.</GlitchTitle><br/>
              <em style={{ fontStyle: 'italic', color: 'var(--lime)', position: 'relative', display: 'inline-block' }}>
                <GlitchTitle accent="var(--cherry)" alt="var(--lavender)">Open-sourcing.</GlitchTitle>
              </em>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: 1.6, color: 'rgba(255,250,240,0.7)', maxWidth: 620, margin: '22px 0 0' }}>
              What the studio actually ships &mdash; how the engine works, the open-source drop, and real results from the field.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: 'clamp(60px, 8vw, 100px)' }}>
          <FlowChart />
        </div>

        <div style={{ marginBottom: 'clamp(60px, 8vw, 100px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--cherry)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>frame 02 / open-source_launch</div>
          <Countdown />
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--cherry)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>frame 04 / case_study</div>
          <CaseStudy />
        </div>
      </div>
    </section>
  );
}
