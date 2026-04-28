import React from 'react';
import Image from 'next/image';

const STICKER_TILTS = ['-1.8deg', '0.7deg', '-1.2deg', '1.5deg', '-0.4deg'];

export default function Operator() {
  const caps: [string, string][] = [
    ['brand',  '↳ systems'],
    ['design', '↳ identity'],
    ['code',   '↳ full-stack'],
    ['content','↳ autonomous'],
    ['voice',  '↳ calibrated'],
    ['ops',    '↳ orchestrated'],
  ];
  const stickers = ['cannabis', 'tech', 'collectibles', 'lifestyle', 'food'];

  return (
    <section id="operator" className="section dark-section">
      <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(239,85,65,0.32) 0%, transparent 65%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(174,190,255,0.22) 0%, transparent 65%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
        <div>
          <div className="section-tag" style={{ marginBottom: 22 }}>
            <span className="num" style={{ color: 'rgba(255,250,240,0.5)' }}>§ 02</span>
            <span className="hand" style={{ color: 'var(--butter)', fontSize: 26, transform: 'rotate(-2deg)' }}>whoami ✿</span>
          </div>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(11px, 1vw, 13px)', color: 'rgba(255,250,240,0.55)', margin: '0 0 28px', lineHeight: 1.85 }}>
{`❯ whoami
→ vanessa saddi
→ location · california, us
→ studio · cherry pi · est 2023
→ role · founder · operator · all-layers`}
          </pre>
          <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', color: 'var(--paper)', lineHeight: 0.98 }}>
            one mind.<br/>
            <em style={{ fontStyle: 'italic', backgroundImage: 'linear-gradient(100deg, var(--cherry), var(--blush), var(--lavender), var(--cherry))', backgroundSize: '300% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'cp-shimmer 8s ease-in-out infinite' }}>
              all layers.
            </em>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.65, color: 'rgba(255,250,240,0.72)', margin: '28px 0 0', maxWidth: 480 }}>
            a closed-loop studio running on proprietary infrastructure. brand strategy, content production, and full-stack engineering &mdash; <span style={{ color: 'var(--paper)' }}>designed, built, and shipped by vanessa.</span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginTop: 30, maxWidth: 480 }}>
            {caps.map(([k, v]) => (
              <div key={k} style={{ padding: '12px 14px', border: '1px solid rgba(255,250,240,0.14)', borderRadius: 12, background: 'rgba(255,250,240,0.04)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper)', fontWeight: 500, letterSpacing: '0.05em' }}>{k}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,250,240,0.5)', marginTop: 3 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 28 }}>
            {stickers.map((t, i) => (
              <span key={t} className="sticker" style={{ background: 'transparent', color: 'var(--lavender)', borderColor: 'rgba(174,190,255,0.4)', boxShadow: 'none', fontSize: 10, '--tilt': STICKER_TILTS[i] } as React.CSSProperties}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', justifySelf: 'center', maxWidth: 380, width: '100%' }}>
          <div style={{ background: 'var(--paper)', padding: '14px 14px 50px', boxShadow: '0 20px 50px -16px rgba(0,0,0,0.5)', transform: 'rotate(-2.5deg)', position: 'relative' }}>
            <span className="tape l" style={{ background: 'rgba(255,217,122,0.7)' }} />
            <div style={{ width: '100%', aspectRatio: '4/5', position: 'relative', overflow: 'hidden' }}>
              <Image src="/portrait-vsaddi.jpg" alt="Vanessa Saddi" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink)', letterSpacing: '0.15em', background: 'rgba(255,250,240,0.85)', padding: '4px 8px', borderRadius: 4 }}>FIG · 01 · V.SADDI</div>
            </div>
            <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-hand)', fontSize: 22, color: 'var(--ink)' }}>
              hi, i&apos;m nessa →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
