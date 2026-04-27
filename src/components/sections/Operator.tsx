'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  ['brand',   '↳ systems'],
  ['design',  '↳ identity'],
  ['code',    '↳ full-stack'],
  ['content', '↳ autonomous'],
  ['voice',   '↳ calibrated'],
  ['ops',     '↳ orchestrated'],
];

const CORNERS = ['tl', 'tr', 'bl', 'br'] as const;

export default function Operator() {
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
    <section
      id="operator"
      ref={ref}
      style={{
        position: 'relative',
        padding: 'clamp(48px, 8vh, 96px) clamp(20px, 5vw, 80px)',
        background: 'var(--fg)', color: 'var(--bg)', overflow: 'hidden',
        borderTopLeftRadius: 'clamp(24px, 4vw, 48px)',
        borderTopRightRadius: 'clamp(24px, 4vw, 48px)',
        marginTop: -1,
      }}
    >
      <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(239,85,65,0.35) 0%, transparent 65%)', filter: 'blur(50px)' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(174,190,255,0.25) 0%, transparent 65%)', filter: 'blur(50px)' }} />

      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>

        {/* Left column */}
        <div data-reveal>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--blush)', fontWeight: 500 }}>§ 02 · whoami</span>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(11px, 1vw, 13px)', color: 'rgba(244,244,244,0.5)', margin: '20px 0 24px', lineHeight: 1.8, overflowX: 'auto' }}>
{`❯ whoami
→ vanessa saddi
→ location: california, us
→ studio: cherry pi · est 2023
→ role: founder · operator · all-layers`}
          </pre>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1, letterSpacing: '-0.04em', margin: '8px 0 0' }}>
            One mind.<br />
            <span style={{ backgroundImage: 'linear-gradient(100deg, var(--cherry), var(--blush), var(--lavender), var(--cherry))', backgroundSize: '300% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'cp-shimmer 8s ease-in-out infinite' }}>
              All layers.
            </span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.6, color: 'rgba(244,244,244,0.7)', margin: '28px 0 0', maxWidth: 480 }}>
            A closed-loop studio running on proprietary infrastructure. Brand strategy, content production, and full-stack engineering — designed, built, and shipped by Vanessa.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8, marginTop: 28, maxWidth: 480 }}>
            {CAPABILITIES.map(([k, v]) => (
              <div key={k} style={{ padding: '10px 12px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--bg)', fontWeight: 500 }}>{k}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(244,244,244,0.5)', marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
            {['Cannabis', 'Tech', 'Collectibles', 'Lifestyle', 'Food'].map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(174,190,255,0.3)', color: 'rgba(174,190,255,0.75)' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right column — Portrait placeholder */}
        <div data-reveal style={{ position: 'relative', width: '100%', maxWidth: 420, aspectRatio: '4/5', margin: '0 auto' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Image
              src="/portrait-vsaddi.jpg"
              alt="Vanessa Saddi — founder, Cherry Pi"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              sizes="(max-width: 768px) 100vw, 420px"
              priority
            />
          </div>
          {CORNERS.map((p) => (
            <span key={p} style={{ position: 'absolute', width: 18, height: 18, top: p.includes('t') ? -4 : 'auto', bottom: p.includes('b') ? -4 : 'auto', left: p.includes('l') ? -4 : 'auto', right: p.includes('r') ? -4 : 'auto', borderTop: p.includes('t') ? '1px solid var(--cherry)' : 'none', borderBottom: p.includes('b') ? '1px solid var(--cherry)' : 'none', borderLeft: p.includes('l') ? '1px solid var(--cherry)' : 'none', borderRight: p.includes('r') ? '1px solid var(--cherry)' : 'none' }} />
          ))}
          <div style={{ position: 'absolute', bottom: -26, left: 0, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(244,244,244,0.5)', letterSpacing: '0.12em' }}>
            FIG · 01 · V.SADDI · FOUNDER
          </div>
        </div>
      </div>
    </section>
  );
}
