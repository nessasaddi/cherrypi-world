'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

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

// ── ReelCard + ReelCarousel ──────────────────────────────────────────────────

const PALETTES = [
  { bg: 'linear-gradient(160deg, #FFD97A 0%, #EDA599 100%)', label: 'sunset shop' },
  { bg: 'linear-gradient(180deg, #AEBEFF 0%, #8a9ce8 100%)', label: 'lavender labs' },
  { bg: 'linear-gradient(160deg, #B8E3C9 0%, #D0DD57 100%)', label: 'mint notes' },
  { bg: 'linear-gradient(170deg, #EF5541 0%, #b73a2c 100%)', label: 'cherry co.' },
  { bg: 'linear-gradient(180deg, #2b2622 0%, #5a4f47 100%)', label: 'ink studio' },
  { bg: 'linear-gradient(150deg, #FFD97A 0%, #FFF3A8 100%)', label: 'butter lane' },
  { bg: 'linear-gradient(170deg, #EDA599 0%, #AEBEFF 100%)', label: 'softwear' },
];

function ReelCard({ p, i, count }: { p: typeof PALETTES[0]; i: number; count: number }) {
  return (
    <div style={{ width: 240, aspectRatio: '9/16', borderRadius: 22, background: p.bg, position: 'relative', overflow: 'hidden', border: '1.5px solid rgba(255,250,240,0.08)', flexShrink: 0, boxShadow: '0 30px 50px -25px rgba(0,0,0,0.6)' }}>
      <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', gap: 4 }}>
        {Array.from({ length: 4 }).map((_, k) => (
          <div key={k} style={{ flex: 1, height: 2.5, background: 'rgba(255,255,255,0.3)', borderRadius: 2, overflow: 'hidden' }}>
            {k < 2 && <div style={{ height: '100%', background: 'rgba(255,255,255,0.95)', width: k === 1 ? '60%' : '100%' }} />}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 32, left: 14, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', display: 'inline-block' }} />
        {p.label}
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 0, height: 0, borderLeft: '14px solid white', borderTop: '10px solid transparent', borderBottom: '10px solid transparent', marginLeft: 4 }} />
      </div>
      <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
        <span>OUTPUT_{String(i + 1).padStart(2, '0')}/{String(count).padStart(2, '0')}</span>
        <span>0:09</span>
      </div>
    </div>
  );
}

function ReelCarousel({ count = 7 }: { count?: number }) {
  const [active, setActive] = useState(count);
  const [drag, setDrag] = useState(0);
  const [anim, setAnim] = useState(true);
  const data = [...Array(count * 3)].map((_, i) => PALETTES[i % count]);
  const ptr = useRef({ down: false, x0: 0 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((a) => a + 1), 3800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (active < count * 0.5 || active > count * 2.5) {
      const t = setTimeout(() => {
        setAnim(false);
        setActive(((active % count) + count));
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
      }, 520);
      return () => clearTimeout(t);
    }
  }, [active, count]);

  const onDown = (e: React.PointerEvent) => { ptr.current = { down: true, x0: e.clientX }; };
  const onMove = (e: React.PointerEvent) => { if (ptr.current.down) setDrag(e.clientX - ptr.current.x0); };
  const onUp = () => {
    if (Math.abs(drag) > 60) setActive((a) => a + (drag < 0 ? 1 : -1));
    setDrag(0); ptr.current.down = false;
  };

  const cardW = 240, gap = 24;
  const offset = -active * (cardW + gap) + drag;

  return (
    <div style={{ overflow: 'hidden', position: 'relative', padding: '40px 0', userSelect: 'none', cursor: 'grab' }}
         onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
      <div style={{ display: 'flex', gap, transform: `translateX(calc(50% + ${offset}px - ${cardW / 2}px))`, transition: anim ? 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)' : 'none' }}>
        {data.map((p, i) => (
          <div key={i} style={{ transform: `scale(${i === active ? 1 : 0.86})`, opacity: i === active ? 1 : 0.55, transition: anim ? 'transform 0.5s, opacity 0.5s' : 'none' }}>
            <ReelCard p={p} i={i % count} count={count} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
        {[...Array(count)].map((_, i) => (
          <button key={i} onClick={() => setActive(count + i)} style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', background: (active % count) === i ? 'var(--paper)' : 'rgba(255,250,240,0.3)', cursor: 'pointer' }} />
        ))}
      </div>
    </div>
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
        we&apos;re <em style={{ fontStyle: 'italic', color: 'var(--lime)' }}>open-sourcing</em><br/>
        the autonomous content generator.
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.6, color: 'rgba(255,250,240,0.7)', margin: '18px 0 0', maxWidth: 580, position: 'relative' }}>
        the same engine running in the reels above. free repo, public on github. plug your product in, ship a month of on-brand content in an afternoon.
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
          notify me on drop
        </a>
        <span className="hand" style={{ fontSize: 22, color: 'var(--butter)' }}>or just bookmark this →</span>
      </div>
    </div>
  );
}

// ── Sites polaroid grid ──────────────────────────────────────────────────────

const SITES = [
  { name: 'lumen labs', tag: 'consumer goods · DTC', color: 'linear-gradient(135deg, var(--lavender), var(--lime))', tilt: -2 },
  { name: 'cherry pi v1', tag: 'studio · this site', color: 'linear-gradient(160deg, var(--cherry), var(--blush))', tilt: 1.5 },
  { name: 'softwear', tag: 'apparel · marketplace', color: 'linear-gradient(180deg, var(--butter), var(--cherry-soft))', tilt: -1 },
  { name: 'mint & co', tag: 'F&B · packaging', color: 'linear-gradient(135deg, var(--mint), var(--lavender))', tilt: 2.5 },
];

function PolaroidSite({ s }: { s: typeof SITES[0] }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, on: false });
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2, on: true });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0, on: false })}
         style={{ background: 'var(--paper)', padding: '14px 14px 56px', boxShadow: tilt.on ? '0 30px 50px -16px rgba(0,0,0,0.45)' : '0 16px 36px -20px rgba(0,0,0,0.4)', transform: `rotate(${s.tilt}deg) perspective(900px) rotateY(${tilt.x * 4}deg) rotateX(${-tilt.y * 4}deg)`, transition: 'transform 0.25s, box-shadow 0.25s', position: 'relative' }}>
      <span className="tape l" style={{ background: 'rgba(255,217,122,0.65)' }} />
      <div style={{ width: '100%', aspectRatio: '4/3', background: s.color, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.4) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 4 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(255,250,240,0.85)', letterSpacing: '0.15em', background: 'rgba(43,38,34,0.4)', padding: '3px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>{s.name}.world</div>
        <div style={{ position: 'absolute', bottom: 14, left: 14, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, color: 'var(--paper)', fontWeight: 500, lineHeight: 1 }}>
          {s.name}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-hand)', fontSize: 20, color: 'var(--ink)' }}>
        {s.tag} ✿
      </div>
    </div>
  );
}

function SitesGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 3vw, 40px)', padding: '20px 0' }}>
      {SITES.map((s, i) => <PolaroidSite key={i} s={s} />)}
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
    <div className="panel" style={{ padding: 24, position: 'relative' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: 'var(--ink-soft)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 38, color: 'var(--ink)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        <AnimatedNum from={from} to={to} format={format} trigger={trigger} />
      </div>
      <div style={{ marginTop: 8, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="sticker" style={{ background: color, fontSize: 11, padding: '4px 10px', '--tilt': '-1deg', boxShadow: '2px 2px 0 var(--ink)' } as React.CSSProperties}>{delta}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--ink-soft)', marginTop: 12, lineHeight: 1.2 }}>{plain}</div>
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
    <div ref={ref} className="panel" style={{ padding: 'clamp(28px, 4vw, 48px)', position: 'relative' }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
        <span className="sticker lav" style={{ '--tilt': '-2deg' } as React.CSSProperties}>case study</span>
        <span className="sticker mint" style={{ '--tilt': '1.5deg' } as React.CSSProperties}>meta ads · auto-publish</span>
      </div>
      <h3 className="h-display" style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.8rem)', color: 'var(--ink)', lineHeight: 1.05 }}>
        we bolted the engine into <em style={{ fontStyle: 'italic', color: 'var(--cherry)' }}>meta ads</em>.<br/>
        <span style={{ color: 'var(--ink-soft)', fontSize: '0.7em' }}>the campaigns now ship themselves.</span>
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 640, margin: '18px 0 28px' }}>
        when the system spots ad fatigue it briefs new creative, generates it, QAs it, and pushes the next round to meta &mdash; without a person in the loop. <span className="marker">your ads refresh themselves before they get tired.</span>
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 18, marginBottom: 30 }}>
        <MetricCard label="CPA · cost / acquisition" plain="it costs less to get a customer." from={58} to={38} format={(v) => `$${v.toFixed(2)}`} delta="-34%" color="var(--lime)" trigger={trigger} />
        <MetricCard label="CTR · click-through" plain="more people are tapping the ads." from={1.4} to={2.5} format={(v) => `${v.toFixed(2)}%`} delta="+1.81×" color="var(--lavender)" trigger={trigger} />
        <MetricCard label="creative / wk" plain="variants tested per week." from={4} to={42} format={(v) => String(Math.round(v))} delta="+10.5×" color="var(--cherry)" trigger={trigger} />
        <MetricCard label="human_touch" plain="hours of manual work per cycle." from={18} to={1.5} format={(v) => `${v.toFixed(1)}h`} delta="-92%" color="var(--blush)" trigger={trigger} />
      </div>
      <div style={{ background: 'var(--bg-deep)', borderRadius: 14, padding: 20, fontFamily: 'var(--font-mono)', fontSize: 11.5, lineHeight: 1.9, color: 'var(--ink-soft)' }}>
        <div style={{ color: 'var(--ink)', marginBottom: 10, letterSpacing: '0.2em', fontSize: 9 }}>EVENT_LOG · 60d WINDOW · LIVE</div>
        {events.map(([t, c, d], i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 80px 1fr', gap: 12, padding: '4px 0', borderBottom: '1px dashed rgba(43,38,34,0.1)' }}>
            <span style={{ color: 'var(--ink-faint)' }}>{t}</span>
            <span style={{ color: eventColor(c) }}>[{c}]</span>
            <span>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Marquee ──────────────────────────────────────────────────────────────────

function Marquee() {
  const items = ['less prompt-wrangling', 'more shipping', 'on-brand by default', 'agents don\'t sleep', 'autopilot for founders'];
  const all = [...items, ...items, ...items, ...items];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px dashed rgba(255,250,240,0.12)', borderBottom: '1px dashed rgba(255,250,240,0.12)', padding: '18px 0', margin: 'clamp(40px,5vw,60px) 0' }}>
      <div style={{ display: 'flex', gap: 36, animation: 'marquee-l 90s linear infinite', whiteSpace: 'nowrap' }}>
        {all.map((it, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 36, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, color: 'var(--paper)', fontWeight: 400 }}>
            {it} <span style={{ color: 'var(--cherry)' }}>✦</span>
          </span>
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
              <span className="hand" style={{ color: 'var(--butter)', fontSize: 26, transform: 'rotate(-2deg)' }}>in production · live ✿</span>
            </div>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.6rem)', color: 'var(--paper)', lineHeight: 0.96 }}>
              <GlitchTitle>built. shipped.</GlitchTitle><br/>
              <em style={{ fontStyle: 'italic', color: 'var(--lime)', position: 'relative', display: 'inline-block' }}>
                <GlitchTitle accent="var(--cherry)" alt="var(--lavender)">open-sourcing.</GlitchTitle>
              </em>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: 1.6, color: 'rgba(255,250,240,0.7)', maxWidth: 620, margin: '22px 0 0' }}>
              what the studio actually ships, in three frames &mdash; the engine running, the websites it powers, and the open-source drop coming for product-led founders.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: 'clamp(60px, 8vw, 100px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 'clamp(20px, 3vw, 48px)', alignItems: 'start', marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--cherry)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10 }}>frame 01 / generator</div>
              <h3 className="h-display" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)', color: 'var(--paper)', lineHeight: 1.05 }}>
                7 stories.<br/><em style={{ fontStyle: 'italic', color: 'var(--butter)' }}>same engine.</em>
              </h3>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,250,240,0.65)', maxWidth: 520, lineHeight: 1.65, paddingTop: 6 }}>
              swipe through real outputs the autonomous content generator produced this week &mdash; across seven brands, all 9:16, all on-brand. <span style={{ color: 'var(--paper)' }}>no prompt-wrangling. no design hours.</span>
            </div>
          </div>
          <ReelCarousel count={7} />
        </div>

        <div style={{ marginBottom: 'clamp(60px, 8vw, 100px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--cherry)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>frame 02 / open-source_launch</div>
          <Countdown />
        </div>

        <Marquee />

        <div style={{ marginBottom: 'clamp(60px, 8vw, 100px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--cherry)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8 }}>frame 03 / in_the_wild</div>
              <h3 className="h-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.6rem)', color: 'var(--paper)' }}>
                sites running on the <em style={{ fontStyle: 'italic', color: 'var(--mint)' }}>same engine</em>.
              </h3>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,250,240,0.4)', letterSpacing: '0.18em' }}>
              UPTIME · 99.97 · 4 of 11 SHOWN
            </div>
          </div>
          <SitesGrid />
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--cherry)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>frame 04 / case_study</div>
          <CaseStudy />
        </div>
      </div>
    </section>
  );
}
