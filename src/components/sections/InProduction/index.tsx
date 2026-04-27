'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlitchTitle from './GlitchTitle';
import ReelCarousel from './ReelCarousel';
import Countdown from './Countdown';
import Marquee from './Marquee';
import SitesGrid from './SitesGrid';
import CaseStudy from './CaseStudy';

gsap.registerPlugin(ScrollTrigger);

export default function InProduction() {
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
      id="in-production"
      ref={ref}
      style={{
        position: 'relative',
        padding: 'clamp(48px, 8vh, 96px) clamp(20px, 5vw, 80px)',
        background: 'var(--fg)',
        color: 'var(--bg)',
        overflow: 'hidden',
        borderTopLeftRadius: 'clamp(24px, 4vw, 48px)',
        borderTopRightRadius: 'clamp(24px, 4vw, 48px)',
        marginTop: -1,
      }}
    >
      {/* Ambient blobs */}
      <div aria-hidden style={{ position: 'absolute', top: '-15%', right: '-10%', width: 720, height: 720, background: 'radial-gradient(circle, rgba(239,85,65,0.33) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '10%', left: '-15%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(174,190,255,0.28) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* === Section header === */}
      <div data-reveal style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'end', marginBottom: 'clamp(40px, 5vw, 70px)' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--blush)', fontWeight: 500 }}>
              § 04 · Live
            </span>
          </div>
          <GlitchTitle>
            <span>Built. Shipped.<br />
              <em style={{ fontWeight: 400, fontStyle: 'normal', color: 'rgba(244,244,244,0.45)' }}>Open-sourcing.</em>
            </span>
          </GlitchTitle>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'rgba(255,255,255,0.7)', maxWidth: 620, marginTop: 22, lineHeight: 1.55 }}>
            What the studio actually ships, in three frames: the engine running, the websites it powers, and the open-source drop coming for product-led founders.
          </p>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', textAlign: 'right', lineHeight: 1.8 }}>
          <div>SCROLL_BIAS · LEFT</div>
          <div>FRAMES · 04 of 04</div>
          <div style={{ color: 'var(--cherry)' }}>● UPDATED · 04.27</div>
        </div>
      </div>

      {/* === Frame 01 / Generator === */}
      <div data-reveal style={{ position: 'relative', marginBottom: 'clamp(60px, 8vw, 110px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 280px) 1fr', gap: 'clamp(20px, 3vw, 40px)', alignItems: 'start', marginBottom: 18 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cherry)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
              FRAME 01 / GENERATOR
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', color: 'var(--bg)', letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0 }}>
              7 stories.<br />Same engine.
            </h3>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.6)', maxWidth: 520, lineHeight: 1.6, paddingTop: 6 }}>
            Swipe through real outputs the autonomous content generator produced this week — across seven brands, all 9:16, all on-brand.{' '}
            <em style={{ color: 'rgba(255,255,255,0.85)', fontStyle: 'normal' }}>No prompt-wrangling. No design hours.</em>
          </div>
        </div>
        <ReelCarousel count={7} />
      </div>

      {/* === Frame 02 / Countdown === */}
      <div data-reveal style={{ marginBottom: 'clamp(60px, 8vw, 110px)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cherry)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>
          FRAME 02 / OPEN-SOURCE_LAUNCH
        </div>
        <Countdown />
      </div>

      <Marquee />

      {/* === Frame 03 / In the wild === */}
      <div data-reveal style={{ marginBottom: 'clamp(60px, 8vw, 110px)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cherry)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>
          FRAME 03 / IN_THE_WILD
        </div>
        <SitesGrid />
      </div>

      {/* === Frame 04 / Case study === */}
      <div data-reveal>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cherry)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>
          FRAME 04 / CASE_STUDY
        </div>
        <CaseStudy />
      </div>

      <style>{`@keyframes dropMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
