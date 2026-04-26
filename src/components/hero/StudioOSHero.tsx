'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SystemDiagram from './SystemDiagram';

gsap.registerPlugin(ScrollTrigger);

export default function StudioOSHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = Array.from(el.querySelectorAll('[data-reveal]'));
    const tweens = targets.map((target, i) =>
      gsap.from(target, {
        opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', delay: i * 0.08,
        scrollTrigger: { trigger: target, start: 'top 92%', toggleActions: 'play none none none' },
      })
    );
    return () => tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vh, 120px) clamp(20px, 5vw, 60px) clamp(40px, 5vh, 60px)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient blobs */}
      <div aria-hidden style={{ position: 'absolute', top: '-10%', right: '-10%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(239,85,65,0.22) 0%, transparent 60%)', filter: 'blur(40px)', animation: 'cp-drift 22s ease-in-out infinite' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-20%', left: '20%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(174,190,255,0.30) 0%, transparent 60%)', filter: 'blur(50px)', animation: 'cp-drift 28s ease-in-out infinite reverse' }} />

      {/* Grid overlay */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(36,36,36,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(36,36,36,0.08) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }} />

      {/* Two-column grid */}
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'center' }}>

        {/* Left column */}
        <div data-reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cherry)', fontWeight: 500 }}>
              CHERRY PI · STUDIO OS
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.1em' }}>
              <span style={{ opacity: 0.5, marginRight: 6 }}>/</span>home
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, lineHeight: 0.95, letterSpacing: '-0.045em', color: 'var(--fg)', margin: 0 }}>
            <span style={{ display: 'block', fontSize: 'clamp(2.6rem, 6.8vw, 5.4rem)' }}>One operator.</span>
            <span style={{
              display: 'block', fontSize: 'clamp(3.4rem, 9vw, 7rem)',
              backgroundImage: 'linear-gradient(100deg, var(--cherry), #ff8a6e, var(--lavender), var(--cherry))',
              backgroundSize: '300% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'cp-shimmer 8s ease-in-out infinite',
            }}>
              Full stack.
            </span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(15px, 1.5vw, 19px)', lineHeight: 1.55, color: 'var(--fg-muted)', margin: '28px 0 0', maxWidth: 520 }}>
            Strategy, design, content, code, and fully autonomous pipelines — running as one operating system. One mind. All layers.
          </p>
          <div className="cp-hero-btns" style={{ display: 'flex', gap: 10, marginTop: 32 }}>
            <a href="#connect" className="cp-hero-btn" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 22px', background: 'var(--fg)', color: 'var(--bg)', textDecoration: 'none', borderRadius: 10, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, boxShadow: '0 10px 30px -10px rgba(36,36,36,0.5)', transition: 'opacity 0.2s' }}>
              <span style={{ color: 'var(--cherry)' }}>❯</span> start a project
            </a>
            <a href="#stack" className="cp-hero-btn" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 22px', border: '1px solid rgba(36,36,36,0.15)', color: 'var(--fg)', textDecoration: 'none', borderRadius: 10, fontFamily: 'var(--font-mono)', fontSize: 13, transition: 'border-color 0.2s' }}>
              read the stack →
            </a>
          </div>
        </div>

        {/* Right column — Studio Map */}
        <div data-reveal style={{ position: 'relative', aspectRatio: '1/1', width: '100%', maxWidth: 460, justifySelf: 'center', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.7)', borderRadius: 24, padding: 'clamp(20px, 3vw, 32px)', boxShadow: '0 30px 60px -30px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.9) inset' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--cherry)', fontWeight: 500 }}>Live · studio map</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 0 3px rgba(208,221,87,0.22)', animation: 'cp-pulse 1.8s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.1em' }}>ONLINE</span>
            </div>
          </div>
          <div style={{ height: 'calc(100% - 40px)' }}>
            <SystemDiagram />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .cp-hero-btns { flex-wrap: nowrap; }
          .cp-hero-btn { flex: 1; min-width: 0; padding: 11px 14px !important; font-size: 12px !important; white-space: nowrap; }
        }
      `}</style>
    </section>
  );
}
