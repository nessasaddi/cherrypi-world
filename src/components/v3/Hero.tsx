import React from 'react';

function StudioMap() {
  const nodes = [
    { id: 'brand',   label: 'BRAND',   color: 'var(--cherry)' },
    { id: 'design',  label: 'DESIGN',  color: 'var(--lavender)' },
    { id: 'content', label: 'CONTENT', color: 'var(--lime)' },
    { id: 'code',    label: 'CODE',    color: 'var(--blush)' },
  ];
  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 30px)', background: 'var(--bg-deep)', borderRadius: 14, overflow: 'hidden' }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id="dotgrid" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="0.4" fill="rgba(43,38,34,0.18)" />
          </pattern>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--cherry)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--cherry)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#dotgrid)" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="var(--ink)" strokeOpacity="0.10" strokeWidth="0.4" strokeDasharray="1 1.5" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="var(--cherry)" strokeOpacity="0.55" strokeWidth="0.5"
                strokeDasharray="6 195" pathLength="200">
          <animate attributeName="stroke-dashoffset" from="0" to="-200" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="50" r="22" fill="url(#coreGlow)">
          <animate attributeName="r" values="20;24;20" dur="3.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="50" r="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="0.6" />
      </svg>

      {nodes.map((n, i) => (
        <div key={n.id} style={{
          position: 'absolute', inset: 0,
          animation: `cp-orbit 24s linear infinite`,
          animationDelay: `${-i * 6}s`,
        }}>
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%) translateY(-32%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            animation: 'cp-counter-orbit 24s linear infinite',
            animationDelay: `${-i * 6}s`,
          }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: n.color, border: '1.5px solid var(--ink)', boxShadow: '2px 2px 0 var(--ink)' }} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.2em', color: 'var(--ink)', whiteSpace: 'nowrap' }}>{n.label}</div>
          </div>
        </div>
      ))}

      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500,
        fontSize: 32, color: 'var(--cherry)', lineHeight: 1,
        animation: 'cp-pi-breath 3.4s ease-in-out infinite',
        textShadow: '0 0 18px rgba(239,85,65,0.35)',
      }}>π</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="section" style={{ paddingTop: 'clamp(40px, 6vh, 80px)', paddingBottom: 'clamp(60px, 8vh, 100px)' }}>
      <div aria-hidden style={{ position: 'absolute', top: '-10%', right: '-8%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(239,85,65,0.18) 0%, transparent 60%)', filter: 'blur(50px)', animation: 'cp-drift 22s ease-in-out infinite', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-15%', left: '15%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(184,227,201,0.32) 0%, transparent 60%)', filter: 'blur(60px)', animation: 'cp-drift 28s ease-in-out infinite reverse', pointerEvents: 'none' }} />

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 'clamp(32px, 4vw, 64px)', alignItems: 'center', position: 'relative' }}>
        <div>
          <div className="section-tag" style={{ marginBottom: 24 }}>
            <span className="num">CHERRY PI · STUDIO OS · <span style={{ textTransform: 'none' }}>/home</span></span>
          </div>
          <h1 className="h-display" style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(2.8rem, 7.5vw, 6rem)', lineHeight: 0.96, letterSpacing: '-0.025em', margin: 0 }}>
            one operator.<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--cherry)', position: 'relative', display: 'inline-block' }}>
              full stack
              <svg viewBox="0 0 280 30" preserveAspectRatio="none" style={{ position: 'absolute', left: '-2%', right: '-2%', bottom: -6, width: '104%', height: 14, overflow: 'visible' }}>
                <path d="M5 18 Q 70 6, 140 14 T 275 12" stroke="var(--cherry)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
              </svg>
            </em>.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.6, color: 'var(--ink-soft)', margin: '28px 0 0', maxWidth: 520 }}>
            design, content, code, and fully autonomous pipelines running as one operating system. <span className="marker">one mind. all layers.</span>
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <a href="#connect" className="btn primary">→ start a project</a>
            <a href="#stack" className="btn ghost">read the stack</a>
          </div>
        </div>

        <div style={{ position: 'relative', justifySelf: 'center' }}>
          <div className="panel" style={{ padding: 22, width: 'min(420px, 90vw)', aspectRatio: '1', transform: 'rotate(-1.5deg)', position: 'relative' }}>
            <span className="tape r" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <span className="hand" style={{ fontSize: 22, color: 'var(--cherry)', transform: 'rotate(-2deg)', display: 'inline-block' }}>studio map ✿</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 0 3px rgba(208,221,87,0.3)', animation: 'cp-pulse 1.8s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-soft)', letterSpacing: '0.18em' }}>ONLINE</span>
              </div>
            </div>
            <StudioMap />
          </div>
          <div className="hand scribble" style={{ position: 'absolute', top: -36, right: -12, fontSize: 22, color: 'var(--cherry)', transform: 'rotate(8deg)', textAlign: 'center', lineHeight: 1.1 }}>
            yes it really runs<br/>itself ✦
          </div>
        </div>
      </div>
    </section>
  );
}
