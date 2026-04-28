'use client';

import { useState, useEffect } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────

type Product = { sku: string; name: string; flavor: string };
type Schedule = { IG: string; TT: string; LI: string; YT: string };

type Brand = {
  id: string;
  name: string;
  cat: string;
  hue: string;
  ink: string;
  mark: string;
  voice: string;
  aesthetic: string;
  palette: string[];
  fonts: string[];
  refs: string[];
  dontSay: string[];
  products: Product[];
  moods: string[];
  schedule: Schedule;
  monthTheme: { code: string; tag: string };
};

// ── Data ─────────────────────────────────────────────────────────────────────

const BRANDS: Brand[] = [
  {
    id: 'lumen',
    name: 'Lumen Labs',
    cat: 'Skincare',
    hue: '#AEBEFF',
    ink: '#2b2622',
    mark: 'L',
    voice: 'clinical, soft, evidence-led',
    aesthetic: 'lab-clean, high-key',
    palette: ['#AEBEFF', '#E8EDFF', '#2b2622'],
    fonts: ['Söhne', 'Tiempos'],
    refs: ['/lab notes', '/before-after', '/ingredient close-ups'],
    dontSay: ['glow', 'magic', '!!'],
    products: [
      { sku: 'LL-014', name: 'Barrier serum', flavor: '0.3% retinal' },
      { sku: 'LL-022', name: 'Niac. mist', flavor: '5% · zinc' },
      { sku: 'LL-031', name: 'Recovery balm', flavor: 'ceramide' },
    ],
    moods: ['quiet', 'studied', 'restorative', 'precise'],
    schedule: { IG: 'mon · wed · fri', TT: 'tue · sat', LI: 'thu', YT: 'monthly' },
    monthTheme: { code: 'APR', tag: 'spring repair' },
  },
  {
    id: 'mint',
    name: 'Mint & Co',
    cat: 'F&B',
    hue: '#B8E3C9',
    ink: '#1a3027',
    mark: 'M',
    voice: 'crisp, playful, a bit cheeky',
    aesthetic: 'sunlit, hand-held, grainy',
    palette: ['#B8E3C9', '#FFF8E0', '#1a3027'],
    fonts: ['GT America', 'Caveat'],
    refs: ['/farm scenes', '/hands holding jar', '/menu cards'],
    dontSay: ['artisanal', 'curated', 'finest'],
    products: [
      { sku: 'MC-08', name: 'Cold-press', flavor: 'apple · kale' },
      { sku: 'MC-03', name: 'Kombucha', flavor: 'yuzu' },
      { sku: 'MC-11', name: 'Oats', flavor: 'fig · cardamom' },
    ],
    moods: ['sunny', 'snacky', 'farmhouse', 'a bit silly'],
    schedule: { IG: 'daily', TT: 'mon · thu · sat', LI: '—', YT: '—' },
    monthTheme: { code: 'APR', tag: 'green things' },
  },
  {
    id: 'cookie',
    name: 'Crumb Club',
    cat: 'Cookies',
    hue: '#FFD97A',
    ink: '#3d2914',
    mark: 'C',
    voice: 'cozy, playful, sweet-tooth',
    aesthetic: 'warm, gooey, soft-focus',
    palette: ['#FFD97A', '#fff3a8', '#3d2914'],
    fonts: ['Fraunces', 'Caveat'],
    refs: ['/cookie stacks', '/melty chocolate', '/handwritten tags'],
    dontSay: ['decadent', 'gourmet', 'artisan'],
    products: [
      { sku: 'CC-01', name: 'Choc chunk', flavor: 'brown butter' },
      { sku: 'CC-04', name: 'Miso oat', flavor: 'salted maple' },
      { sku: 'CC-09', name: 'Tahini double', flavor: 'sesame' },
    ],
    moods: ['gooey', 'cozy', 'snacky', 'after-school'],
    schedule: { IG: 'tue · fri · sun', TT: 'wed', LI: '—', YT: '—' },
    monthTheme: { code: 'APR', tag: 'sprinkle szn' },
  },
];

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const KINDS_BY_DAY = ['REEL', 'STORY', 'CAROUSEL', 'STILL', 'REEL', 'CAROUSEL', 'STORY'];

// ── Helpers ───────────────────────────────────────────────────────────────────

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function Mono({
  children,
  style,
  c = 'rgba(255,250,240,0.7)',
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  c?: string;
}) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: c,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ── PostTile ──────────────────────────────────────────────────────────────────

function PostTile({ brand, kind, day, w = 76 }: { brand: Brand; kind: string; day: string; w?: number }) {
  const fg = brand.ink;
  return (
    <div
      style={{
        width: w,
        aspectRatio: '9/16',
        borderRadius: 8,
        background: brand.hue,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 6px 14px -8px rgba(0,0,0,0.5)',
        flexShrink: 0,
      }}
    >
      <div style={{ position: 'absolute', top: 4, left: 4, right: 4, display: 'flex', gap: 1.5 }}>
        {Array.from({ length: 4 }).map((_, k) => (
          <div key={k} style={{ flex: 1, height: 1, background: 'rgba(43,38,34,0.18)', borderRadius: 1 }}>
            {k <= 1 && <div style={{ height: '100%', width: k === 1 ? '50%' : '100%', background: fg, opacity: 0.85 }} />}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 9, left: 4, fontFamily: 'var(--font-mono)', fontSize: 5.5, color: fg, letterSpacing: '0.1em', opacity: 0.8 }}>
        {brand.name.toLowerCase()}
      </div>
      <div style={{ position: 'absolute', inset: 'auto 5px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ height: 1.5, width: '70%', background: fg, opacity: 0.85, borderRadius: 1 }} />
        <div style={{ height: 1.5, width: '50%', background: fg, opacity: 0.5, borderRadius: 1 }} />
        <div style={{ height: 1.5, width: '80%', background: fg, opacity: 0.35, borderRadius: 1 }} />
      </div>
      <div style={{ position: 'absolute', bottom: 3, left: 4, right: 4, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 5, color: fg, opacity: 0.7, letterSpacing: '0.1em' }}>
        <span>{kind}</span>
        <span>{day}</span>
      </div>
    </div>
  );
}

// ── DnaCard ───────────────────────────────────────────────────────────────────

function DnaCard({ brand, w = 240 }: { brand: Brand; w?: number }) {
  const ROW: React.CSSProperties = { fontSize: 7, width: 52, paddingTop: 2, flexShrink: 0 };
  return (
    <div
      style={{
        width: w,
        background: 'rgba(255,250,240,0.04)',
        border: `1px solid ${brand.hue}55`,
        borderLeft: `3px solid ${brand.hue}`,
        borderRadius: 12,
        padding: 12,
      }}
    >
      {/* header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: brand.hue, color: brand.ink, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {brand.mark}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--paper)', lineHeight: 1, fontStyle: 'italic' }}>{brand.name}</div>
          <Mono style={{ fontSize: 7 }}>{brand.cat.toLowerCase()} · {brand.products.length} skus</Mono>
        </div>
      </div>

      {/* monthly theme */}
      <div style={{ marginBottom: 8, padding: '4px 8px', borderRadius: 5, background: 'rgba(255,250,240,0.04)', borderLeft: `2px solid ${brand.hue}`, display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <Mono style={{ fontSize: 6.5 }}>theme</Mono>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 10, color: 'var(--paper)' }}>"{brand.monthTheme.tag}"</span>
      </div>

      {/* voice */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
        <Mono style={ROW}>voice</Mono>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 10.5, color: 'var(--paper)', lineHeight: 1.3 }}>"{brand.voice}"</span>
      </div>

      {/* aesthetic */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
        <Mono style={ROW}>aesthetic</Mono>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(255,250,240,0.85)', lineHeight: 1.3 }}>{brand.aesthetic}</span>
      </div>

      {/* palette */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <Mono style={{ fontSize: 7, width: 52 }}>palette</Mono>
        <div style={{ display: 'flex', gap: 3 }}>
          {brand.palette.map((p, i) => (
            <span key={i} style={{ width: 12, height: 12, borderRadius: 2, background: p, border: '1px solid rgba(255,250,240,0.1)' }} />
          ))}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'rgba(255,250,240,0.55)', marginLeft: 4 }}>{brand.fonts[0]}</span>
      </div>

      {/* moods */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
        <Mono style={ROW}>mood</Mono>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {brand.moods.map((m, i) => (
            <span key={i} style={{ padding: '1px 6px', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 9, background: `${brand.hue}22`, border: `1px solid ${brand.hue}44`, borderRadius: 999, color: 'var(--paper)' }}>{m}</span>
          ))}
        </div>
      </div>

      {/* products */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
        <Mono style={ROW}>skus</Mono>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, minWidth: 0 }}>
          {brand.products.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'rgba(255,250,240,0.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <span style={{ color: brand.hue }}>{p.sku}</span>
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* schedule */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <Mono style={{ fontSize: 7, width: 52 }}>cadence</Mono>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {(Object.entries(brand.schedule) as [string, string][]).filter(([, v]) => v !== '—').map(([k, v]) => (
            <span key={k} style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'rgba(255,250,240,0.7)' }}>
              <span style={{ color: 'var(--paper)' }}>{k}</span> {v.split(' · ').length}×
            </span>
          ))}
        </div>
      </div>

      {/* don't say */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, paddingTop: 6, borderTop: '1px dashed rgba(255,250,240,0.08)' }}>
        <Mono style={{ fontSize: 7, width: 52, paddingTop: 2, color: 'rgba(239,85,65,0.7)' }}>don&apos;t</Mono>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {brand.dontSay.map((r, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(255,250,240,0.4)', textDecoration: 'line-through' }}>{r}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── FlowChartDesktop ──────────────────────────────────────────────────────────

function FlowChartDesktop() {
  const [t, setT] = useState(0);
  const [filledDay, setFilledDay] = useState(0);

  useEffect(() => {
    let raf: number;
    let t0: number | undefined;
    const step = (now: number) => {
      if (!t0) t0 = now;
      const elapsed = (now - t0) / 1000;
      setT(elapsed);
      setFilledDay(Math.floor((elapsed / 1.4) % 8));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const W = 1240, H = 980;
  const dnaX = 270, engineX = 640, gridX = 1000;
  const brandY = (i: number) => 165 + i * 285;
  const period = 4.6;

  const particles = BRANDS.flatMap((b, i) =>
    [0, 1].map((k) => {
      const phase = ((t + i * 0.5 + k * (period / 2)) % period) / period;
      return { brand: b, i, phase };
    })
  );

  return (
    <div
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        borderRadius: 24,
        padding: 'clamp(28px, 3vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 1080,
        border: '1px solid rgba(255,250,240,0.08)',
      }}
    >
      {/* ambient glows */}
      <div aria-hidden style={{ position: 'absolute', top: '-15%', right: '-10%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(239,85,65,0.18) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '5%', left: '-15%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(184,227,201,0.13) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative' }}>
        {/* header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--cherry)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8 }}>
              frame 01 / generator
            </div>
            <h3 className="h-display" style={{ fontSize: 'clamp(2rem, 3.4vw, 2.8rem)', color: 'var(--paper)', lineHeight: 1, margin: 0 }}>
              How the <em style={{ fontStyle: 'italic', color: 'var(--butter)' }}>engine</em> works.<br />
              <span style={{ color: 'rgba(255,250,240,0.55)', fontSize: '0.65em' }}>3 brands shown · scales to dozens.</span>
            </h3>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', background: 'rgba(255,250,240,0.05)', border: '1px solid rgba(255,250,240,0.15)', borderRadius: 999 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 0 4px rgba(208,221,87,0.18)' }} />
            <Mono>generator · running · live</Mono>
          </div>
        </div>

        {/* column headers */}
        <div style={{ position: 'relative', height: 28, marginBottom: 4 }}>
          <div style={{ position: 'absolute', left: `${(dnaX / W) * 100}%`, transform: 'translateX(-50%)' }}>
            <Mono c="var(--paper)">step 1 · brand DNA in</Mono>
          </div>
          <div style={{ position: 'absolute', left: `${(engineX / W) * 100}%`, transform: 'translateX(-50%)' }}>
            <Mono c="var(--cherry)">step 2 · engine</Mono>
          </div>
          <div style={{ position: 'absolute', left: `${(gridX / W) * 100}%` }}>
            <Mono c="var(--butter)">step 3 · 7 days × 3 brands published</Mono>
          </div>
        </div>

        {/* diagram area */}
        <div style={{ position: 'relative', height: H }}>
          {/* SVG: curves + particles */}
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <radialGradient id="fc-engine-glow" cx="50%" cy="50%">
                <stop offset="0%"   stopColor="#EF5541" stopOpacity="0.5" />
                <stop offset="60%"  stopColor="#EF5541" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#EF5541" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={engineX} cy={H / 2} r="160" fill="url(#fc-engine-glow)" />

            {/* DNA → engine */}
            {BRANDS.map((b, i) => {
              const y = brandY(i);
              const d = `M ${dnaX + 80} ${y} C ${dnaX + 200} ${y}, ${engineX - 200} ${H / 2}, ${engineX - 60} ${H / 2}`;
              return <path key={`in${i}`} d={d} fill="none" stroke={b.hue} strokeWidth="1.2" strokeDasharray="2 4" opacity="0.45" />;
            })}

            {/* engine → grid */}
            {BRANDS.map((b, i) => {
              const y = brandY(i);
              const d = `M ${engineX + 60} ${H / 2} C ${engineX + 200} ${H / 2}, ${gridX - 100} ${y}, ${gridX - 8} ${y}`;
              return <path key={`out${i}`} d={d} fill="none" stroke={b.hue} strokeWidth="1.5" strokeDasharray="2 4" opacity="0.6" />;
            })}

            {/* particles */}
            {particles.map((p, idx) => {
              const y = brandY(p.i);
              const ph = p.phase;
              let cx: number, cy: number, opacity = 1, r = 3;
              if (ph < 0.4) {
                const e = smoothstep(ph / 0.4);
                cx = (dnaX + 80) + (engineX - 60 - (dnaX + 80)) * e;
                cy = y + (H / 2 - y) * e;
              } else if (ph < 0.55) {
                cx = engineX; cy = H / 2; opacity = 0.3; r = 2;
              } else {
                const e = smoothstep((ph - 0.55) / 0.45);
                cx = (engineX + 60) + (gridX - 8 - (engineX + 60)) * e;
                cy = H / 2 + (y - H / 2) * e;
                r = 3.5;
              }
              return (
                <circle key={`p${idx}`} cx={cx} cy={cy} r={r} fill={p.brand.hue} opacity={opacity}
                  style={{ filter: `drop-shadow(0 0 5px ${p.brand.hue})` }} />
              );
            })}
          </svg>

          {/* DNA cards */}
          {BRANDS.map((b, i) => (
            <div key={`dna${b.id}`} style={{ position: 'absolute', left: 24, top: `${(brandY(i) / H) * 100}%`, transform: 'translateY(-50%)' }}>
              <DnaCard brand={b} w={270} />
            </div>
          ))}

          {/* engine core */}
          <div style={{
            position: 'absolute', left: `${(engineX / W) * 100}%`, top: '50%', transform: 'translate(-50%, -50%)',
            width: 150, height: 150, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(239,85,65,0.18) 0%, rgba(43,38,34,1) 75%)',
            border: '1px solid rgba(239,85,65,0.5)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 80px rgba(239,85,65,0.3)',
          }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--cherry)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, color: 'var(--paper)', fontWeight: 500, animation: 'pulse-core 2.4s ease-in-out infinite' }}>
              π
            </div>
            <Mono style={{ marginTop: 10, fontSize: 8, color: 'var(--paper)' }}>the engine</Mono>
            <Mono style={{ fontSize: 7, color: 'rgba(255,250,240,0.5)', marginTop: 2 }}>● running</Mono>
          </div>

          {/* engine sub-labels */}
          <div style={{ position: 'absolute', left: `${(engineX / W) * 100}%`, top: 'calc(50% + 96px)', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <Mono style={{ fontSize: 7 }}>brief → gen → QA → push</Mono>
            <Mono style={{ fontSize: 7 }} c="rgba(255,250,240,0.4)">~14s per post</Mono>
          </div>

          {/* output grids */}
          {BRANDS.map((b, brandIdx) => (
            <div key={`grid${b.id}`} style={{ position: 'absolute', left: `${(gridX / W) * 100}%`, top: `${(brandY(brandIdx) / H) * 100}%`, transform: 'translateY(-50%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: b.hue }} />
                <Mono c="var(--paper)" style={{ fontSize: 7 }}>{b.name.toLowerCase()} · this week</Mono>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {DAYS.map((day, dayIdx) => {
                  const filled = dayIdx < filledDay;
                  const isCurrent = dayIdx === filledDay - 1;
                  return (
                    <div key={dayIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                      <div style={{ position: 'relative' }}>
                        {filled ? (
                          <div style={{ animation: isCurrent ? 'tile-pop 0.4s ease-out' : 'none' }}>
                            <PostTile brand={b} kind={KINDS_BY_DAY[dayIdx]} day={day} w={36} />
                          </div>
                        ) : (
                          <div style={{ width: 36, aspectRatio: '9/16', borderRadius: 6, border: '1px dashed rgba(255,250,240,0.18)' }} />
                        )}
                        {isCurrent && (
                          <div style={{ position: 'absolute', top: -3, right: -3, width: 6, height: 6, borderRadius: '50%', background: 'var(--cherry)', boxShadow: '0 0 0 3px rgba(239,85,65,0.25)' }} />
                        )}
                      </div>
                      <Mono style={{ fontSize: 6 }} c={filled ? 'var(--paper)' : 'rgba(255,250,240,0.3)'}>{day}</Mono>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* footer counters */}
        <div style={{ display: 'flex', gap: 12, marginTop: 16, padding: '12px 18px', background: 'rgba(255,250,240,0.04)', border: '1px solid rgba(255,250,240,0.1)', borderRadius: 12, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Mono>● 3 brands · {filledDay * 3} / 21 posts this week</Mono>
          <Mono>● 0 prompts written</Mono>
          <Mono c="var(--lime)">● QA pass · 100%</Mono>
          <Mono>● next run · mon 06:00</Mono>
        </div>
      </div>
    </div>
  );
}

// ── FlowChartMobile ───────────────────────────────────────────────────────────

function FlowChartMobile() {
  const [filledDay, setFilledDay] = useState(0);

  useEffect(() => {
    let raf: number;
    let t0: number | undefined;
    const step = (now: number) => {
      if (!t0) t0 = now;
      const elapsed = (now - t0) / 1000;
      setFilledDay(Math.floor((elapsed / 1.2) % 8));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ color: 'var(--paper)' }}>

        {/* header */}
        <div style={{ paddingBottom: 18, borderBottom: '1px solid rgba(255,250,240,0.08)', marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--cherry)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 8 }}>
            frame 01 / generator
          </div>
          <h3 className="h-display" style={{ fontSize: 28, color: 'var(--paper)', lineHeight: 1.02, margin: 0 }}>
            How the<br /><em style={{ fontStyle: 'italic', color: 'var(--butter)' }}>engine</em> works.
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,250,240,0.6)', lineHeight: 1.55, margin: '12px 0 0' }}>
            Three brands. Three sets of DNA. One generator quietly publishing a week of content for each — without anyone asking.
          </p>
        </div>

        {/* step 1: DNA */}
        <div style={{ padding: '0 0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--paper)', color: 'var(--ink)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</div>
            <Mono c="var(--paper)" style={{ fontSize: 9 }}>brand DNA in</Mono>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,250,240,0.12)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {BRANDS.map((b) => (
              <div key={b.id} style={{ background: 'rgba(255,250,240,0.04)', border: `1px solid ${b.hue}55`, borderLeft: `3px solid ${b.hue}`, borderRadius: 12, padding: 14 }}>
                {/* card header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: b.hue, color: b.ink, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{b.mark}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--paper)', lineHeight: 1, fontStyle: 'italic', whiteSpace: 'nowrap' }}>{b.name}</div>
                    <Mono style={{ fontSize: 7 }}>{b.cat.toLowerCase()} · {b.products.length} skus</Mono>
                  </div>
                  <div style={{ padding: '3px 7px', borderRadius: 4, background: b.hue, color: b.ink, fontFamily: 'var(--font-mono)', fontSize: 7.5, letterSpacing: '0.1em', flexShrink: 0 }}>{b.monthTheme.code}</div>
                </div>

                {/* theme banner */}
                <div style={{ marginBottom: 10, padding: '6px 10px', borderRadius: 6, background: 'rgba(255,250,240,0.04)', borderLeft: `2px solid ${b.hue}` }}>
                  <Mono style={{ fontSize: 6.5, marginRight: 6 }}>this month</Mono>
                  <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 12, color: 'var(--paper)' }}>"{b.monthTheme.tag}"</span>
                </div>

                {/* detail rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Mono style={{ fontSize: 7, width: 56, paddingTop: 1, flexShrink: 0 }}>voice</Mono>
                    <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 12, color: 'var(--paper)', lineHeight: 1.3, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>"{b.voice}"</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Mono style={{ fontSize: 7, width: 56, paddingTop: 1, flexShrink: 0 }}>aesthetic</Mono>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,250,240,0.85)', lineHeight: 1.35, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.aesthetic}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Mono style={{ fontSize: 7, width: 56 }}>palette</Mono>
                    <div style={{ display: 'flex', gap: 3 }}>
                      {b.palette.map((p, j) => <span key={j} style={{ width: 16, height: 16, borderRadius: 3, background: p, border: '1px solid rgba(255,250,240,0.1)' }} />)}
                    </div>
                    <span style={{ flex: 1 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'rgba(255,250,240,0.6)' }}>{b.fonts.join(' / ')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Mono style={{ fontSize: 7, width: 56, paddingTop: 1 }}>mood rot.</Mono>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, flex: 1 }}>
                      {b.moods.map((m, j) => (
                        <span key={j} style={{ padding: '2px 7px', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 10, background: `${b.hue}22`, border: `1px solid ${b.hue}55`, borderRadius: 999, color: 'var(--paper)' }}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Mono style={{ fontSize: 7, width: 56, paddingTop: 1 }}>products</Mono>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                      {b.products.map((p, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'rgba(255,250,240,0.85)', whiteSpace: 'nowrap' }}>
                          <span style={{ color: b.hue, minWidth: 42 }}>{p.sku}</span>
                          <span style={{ color: 'var(--paper)' }}>{p.name}</span>
                          <span style={{ color: 'rgba(255,250,240,0.45)', fontSize: 7.5 }}>· {p.flavor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Mono style={{ fontSize: 7, width: 56, paddingTop: 1 }}>schedule</Mono>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                      {(Object.entries(b.schedule) as [string, string][]).map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 8 }}>
                          <span style={{ color: 'var(--paper)', minWidth: 22 }}>{k}</span>
                          <span style={{ color: v === '—' ? 'rgba(255,250,240,0.3)' : 'rgba(255,250,240,0.7)' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <Mono style={{ fontSize: 7, width: 56, paddingTop: 1 }}>refs</Mono>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, flex: 1 }}>
                      {b.refs.map((r, j) => (
                        <span key={j} style={{ padding: '1px 6px', fontFamily: 'var(--font-mono)', fontSize: 7.5, background: 'rgba(255,250,240,0.06)', borderRadius: 4, color: 'rgba(255,250,240,0.7)' }}>{r}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, paddingTop: 6, borderTop: '1px dashed rgba(255,250,240,0.1)' }}>
                    <Mono style={{ fontSize: 7, width: 56, paddingTop: 1, color: 'rgba(239,85,65,0.7)' }}>don&apos;t</Mono>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
                      {b.dontSay.map((r, j) => (
                        <span key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,250,240,0.4)', textDecoration: 'line-through' }}>{r}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* connector: DNA → engine */}
        <Connector brands={BRANDS} staggerOffset={0} />

        {/* step 2: engine */}
        <div style={{ padding: '0 0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--cherry)', color: 'var(--paper)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</div>
            <Mono c="var(--cherry)" style={{ fontSize: 9 }}>the engine</Mono>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,250,240,0.12)' }} />
          </div>
          <div style={{ position: 'relative', background: 'radial-gradient(circle at 50% 50%, rgba(239,85,65,0.15) 0%, rgba(43,38,34,0.6) 70%)', border: '1px solid rgba(239,85,65,0.4)', borderRadius: 16, padding: '24px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, boxShadow: '0 0 60px rgba(239,85,65,0.2)' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--cherry)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, color: 'var(--paper)', fontWeight: 500, animation: 'pulse-core 2.4s ease-in-out infinite' }}>π</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, color: 'var(--paper)' }}>The engine</div>
              <Mono style={{ fontSize: 8 }}>● running · 24/7</Mono>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['BRIEF', 'GEN', 'QA', 'PUSH'].map((s, i) => (
                <span key={i} style={{ padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 8, background: 'rgba(255,250,240,0.06)', border: '1px solid rgba(255,250,240,0.12)', borderRadius: 4, color: 'var(--paper)', letterSpacing: '0.15em' }}>{s}</span>
              ))}
            </div>
            <Mono style={{ fontSize: 7, color: 'rgba(255,250,240,0.5)' }}>~14 sec / post · 0 prompts written</Mono>
          </div>
        </div>

        {/* connector: engine → posts */}
        <Connector brands={BRANDS} staggerOffset={0.6} />

        {/* step 3: outputs */}
        <div style={{ padding: '0 0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--butter)', color: 'var(--ink)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</div>
            <Mono c="var(--butter)" style={{ fontSize: 9 }}>21 posts published</Mono>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,250,240,0.12)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {BRANDS.map((b) => (
              <div key={b.id} style={{ background: 'rgba(255,250,240,0.03)', border: '1px solid rgba(255,250,240,0.08)', borderRadius: 12, padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: b.hue }} />
                  <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 13, color: 'var(--paper)' }}>{b.name}</span>
                  <Mono style={{ fontSize: 7, marginLeft: 'auto' }}>{filledDay}/7 days</Mono>
                </div>
                <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
                  {DAYS.map((day, dayIdx) => {
                    const filled = dayIdx < filledDay;
                    const isCurrent = dayIdx === filledDay - 1;
                    return (
                      <div key={dayIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flex: 1 }}>
                        <div style={{ position: 'relative' }}>
                          {filled ? (
                            <div style={{ animation: isCurrent ? 'tile-pop 0.4s ease-out' : 'none' }}>
                              <PostTile brand={b} kind={KINDS_BY_DAY[dayIdx]} day={day} w={36} />
                            </div>
                          ) : (
                            <div style={{ width: 36, aspectRatio: '9/16', borderRadius: 5, border: '1px dashed rgba(255,250,240,0.15)' }} />
                          )}
                          {isCurrent && (
                            <div style={{ position: 'absolute', top: -3, right: -3, width: 6, height: 6, borderRadius: '50%', background: 'var(--cherry)', boxShadow: '0 0 0 3px rgba(239,85,65,0.25)' }} />
                          )}
                        </div>
                        <Mono style={{ fontSize: 6 }} c={filled ? 'var(--paper)' : 'rgba(255,250,240,0.3)'}>{day}</Mono>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* status pill */}
          <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(255,250,240,0.04)', border: '1px solid rgba(255,250,240,0.1)', borderRadius: 999, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 0 3px rgba(208,221,87,0.18)' }} />
              <Mono style={{ fontSize: 8 }}>running</Mono>
            </div>
            <Mono style={{ fontSize: 8 }}>{filledDay * 3}/21</Mono>
            <Mono style={{ fontSize: 8 }} c="var(--lime)">100% qa</Mono>
          </div>
        </div>
    </div>
  );
}

// shared vertical connector with animated brand-hue particles
function Connector({ brands, staggerOffset }: { brands: Brand[]; staggerOffset: number }) {
  return (
    <div style={{ height: 80, display: 'flex', justifyContent: 'center' }}>
      <svg width="80" height="80" style={{ overflow: 'visible' }}>
        <line x1="40" y1="0" x2="40" y2="70" stroke="rgba(255,250,240,0.2)" strokeWidth="1.5" strokeDasharray="3 4" />
        {brands.map((b, i) => (
          <circle key={i} cx="40" cy="0" r="3" fill={b.hue} opacity="0.85"
            style={{ filter: `drop-shadow(0 0 4px ${b.hue})`, animation: `flow-down 2.4s ${staggerOffset + i * 0.3}s linear infinite` }} />
        ))}
        <polygon points="36,68 44,68 40,76" fill="rgba(255,250,240,0.4)" />
      </svg>
    </div>
  );
}

// ── FlowChart (responsive entry point) ───────────────────────────────────────

export default function FlowChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 899px)');
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isMobile ? <FlowChartMobile /> : <FlowChartDesktop />;
}
