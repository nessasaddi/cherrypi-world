'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const ref = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');

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
    <section id="connect" ref={ref} style={{ position: 'relative', padding: 'clamp(80px, 14vh, 160px) clamp(20px, 5vw, 80px)' }}>
      <div data-reveal style={{ background: 'var(--fg)', color: 'var(--bg)', borderRadius: 24, padding: 'clamp(32px, 5vw, 72px)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: '-30%', right: '-20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(239,85,65,0.45) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div aria-hidden style={{ position: 'absolute', bottom: '-30%', left: '-20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(174,190,255,0.30) 0%, transparent 70%)', filter: 'blur(50px)' }} />

        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--blush)', fontWeight: 500 }}>§ 06 · subscribe</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(2rem, 4vw, 3.4rem)', lineHeight: 1, letterSpacing: '-0.035em', margin: '18px 0 0' }}>
              Field Notes.<br />
              <em style={{ fontWeight: 400, color: 'rgba(244,244,244,0.55)' }}>Monthly.</em>
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.55, color: 'rgba(244,244,244,0.65)', margin: '16px 0 0', maxWidth: 380 }}>
              What&rsquo;s actually working in autonomous systems and creative infrastructure. Nothing else.
            </p>
          </div>

          <div>
            <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(244,244,244,0.5)', margin: '0 0 10px' }}>❯ cherry subscribe</pre>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'flex', gap: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: 6 }}
            >
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, border: 'none', background: 'transparent', padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none', color: 'var(--bg)', minWidth: 0 }}
              />
              <button
                type="submit"
                style={{ background: 'var(--cherry)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 18px', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                → enter
              </button>
            </form>
            <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(244,244,244,0.4)', letterSpacing: '0.1em' }}>
              → 776 readers · → no spam · → unsub anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
