import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="section" style={{ paddingTop: 'clamp(60px, 10vh, 120px)', paddingBottom: 'clamp(60px, 8vh, 100px)' }}>
      <div aria-hidden style={{ position: 'absolute', top: '-10%', right: '-8%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(239,85,65,0.18) 0%, transparent 60%)', filter: 'blur(50px)', animation: 'cp-drift 22s ease-in-out infinite', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-15%', left: '15%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(184,227,201,0.32) 0%, transparent 60%)', filter: 'blur(60px)', animation: 'cp-drift 28s ease-in-out infinite reverse', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', maxWidth: 900 }}>
        <div className="section-tag" style={{ marginBottom: 28 }}>
          <span className="num"><span style={{ color: 'var(--cherry)' }}>CHERRY PI</span> · § 01 <span style={{ textTransform: 'none' }}>/home</span></span>
        </div>
        <h1 className="h-display" style={{ fontFamily: 'var(--font-display)', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-0.025em', margin: 0 }}>
          <span style={{ display: 'block', fontSize: 'clamp(2.6rem, 6vw, 4.8rem)' }}>built by hand.</span>
          <em style={{ display: 'block', fontSize: 'clamp(2.6rem, 6vw, 4.8rem)', fontStyle: 'italic', backgroundImage: 'linear-gradient(100deg, var(--cherry), var(--cherry-soft), var(--lavender), var(--blush), var(--cherry))', backgroundSize: '300% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'cp-shimmer 4s ease-in-out infinite' }}>
            shipped like software.
          </em>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.6, color: 'var(--ink-soft)', margin: '28px 0 0', maxWidth: 560 }}>
          cherry pi is a one-person creative studio — brand, design, and full-stack engineering under one roof. <span className="marker">california, est. 2023.</span>
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
          <a href="#connect" className="btn primary">→ get in touch</a>
          <a href="#studio" className="btn ghost">→ the studio</a>
        </div>
      </div>
    </section>
  );
}
