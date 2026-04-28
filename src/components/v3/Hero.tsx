import React from 'react';
import SystemDiagram from '@/components/hero/SystemDiagram';

export default function Hero() {
  return (
    <section id="hero" className="section" style={{ paddingTop: 'clamp(40px, 6vh, 80px)', paddingBottom: 'clamp(60px, 8vh, 100px)' }}>
      <div aria-hidden style={{ position: 'absolute', top: '-10%', right: '-8%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(239,85,65,0.18) 0%, transparent 60%)', filter: 'blur(50px)', animation: 'cp-drift 22s ease-in-out infinite', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-15%', left: '15%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(184,227,201,0.32) 0%, transparent 60%)', filter: 'blur(60px)', animation: 'cp-drift 28s ease-in-out infinite reverse', pointerEvents: 'none' }} />

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 'clamp(32px, 4vw, 64px)', alignItems: 'center', position: 'relative' }}>
        <div>
          <div className="section-tag" style={{ marginBottom: 24 }}>
            <span className="num"><span style={{ color: 'var(--cherry)' }}>CHERRY PI</span> · § 01 <span style={{ textTransform: 'none' }}>/home</span></span>
          </div>
          <h1 className="h-display" style={{ fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 0.96, letterSpacing: '-0.025em', margin: 0 }}>
            <span style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)' }}>One operator.</span>
            <em style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 'clamp(3.65rem, 6.85vw, 5.5rem)', fontStyle: 'italic', backgroundImage: 'linear-gradient(100deg, var(--cherry), var(--cherry-soft), var(--lavender), var(--blush), var(--cherry))', backgroundSize: '300% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'cp-shimmer 4s ease-in-out infinite' }}>
              Full stack.
            </em>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.6, color: 'var(--ink-soft)', margin: '28px 0 0', maxWidth: 520 }}>
            Design, content, code, and fully autonomous pipelines running as one operating system. <span className="marker">One mind. All layers.</span>
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <a href="#connect" className="btn primary">→ subscribe</a>
            <a href="#stack" className="btn ghost">read the stack</a>
          </div>
        </div>

        <div style={{ position: 'relative', justifySelf: 'center', width: '100%', maxWidth: 420 }}>
          <div className="panel" style={{ padding: '14px 14px 52px', width: '100%', borderRadius: 6, transform: 'rotate(-1.5deg)', boxShadow: '0 20px 50px -16px rgba(43,38,34,0.3)', position: 'relative' }}>
            <span className="tape r" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cherry)', letterSpacing: '0.18em' }}>LIVE · STUDIO MAP</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 0 3px rgba(208,221,87,0.3)', animation: 'cp-pulse 1.8s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-soft)', letterSpacing: '0.18em' }}>ONLINE</span>
              </div>
            </div>
            <div style={{ width: '100%', aspectRatio: '1' }}>
              <SystemDiagram />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
