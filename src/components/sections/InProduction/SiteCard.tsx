'use client';

import { useState, useRef } from 'react';
import { SITES } from './data';

type Site = typeof SITES[number];

export default function SiteCard({ site, idx }: { site: Site; idx: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, on: false });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: px, y: py, on: true });
  };
  const onLeave = () => setTilt({ x: 0, y: 0, on: false });

  return (
    <a
      ref={ref}
      href={`https://${site.url}`}
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        display: 'block',
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: tilt.on ? `${site.accent}66` : 'rgba(255,255,255,0.1)',
        background: '#1a1a1a',
        textDecoration: 'none',
        color: 'inherit',
        transform: tilt.on
          ? `perspective(1000px) rotateY(${tilt.x * 6}deg) rotateX(${-tilt.y * 6}deg) translateZ(0)`
          : 'perspective(1000px) rotateY(0) rotateX(0)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s',
      }}
    >
      {/* Browser chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: '#0e0e0e', borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: 'var(--font-mono)', fontSize: 10 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        <span style={{ marginLeft: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{site.url}</span>
        <span style={{ marginLeft: 'auto', color: site.accent, fontSize: 9, letterSpacing: '0.16em' }}>● LIVE</span>
      </div>

      {/* Mock preview */}
      <div style={{ position: 'relative', aspectRatio: '16/10', background: site.bg, overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.18, backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 14px)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: 'clamp(16px, 3vw, 28px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em' }}>
            <span style={{ textTransform: 'uppercase' }}>{site.brand}</span>
            <span style={{ display: 'flex', gap: 12, opacity: 0.7 }}>
              <span>WORK</span><span>STORY</span><span>SHOP</span>
            </span>
          </div>
          <div style={{ transform: tilt.on ? `translate(${tilt.x * 8}px, ${tilt.y * 6}px)` : 'none', transition: 'transform 0.3s' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 3vw, 2.6rem)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 500, marginBottom: 8, textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>
              {site.headline}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, opacity: 0.75, maxWidth: 280 }}>{site.sub}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', opacity: 0.65 }}>
            <span>{site.tag}</span><span>{site.year}</span>
          </div>
        </div>
        {tilt.on && (
          <div aria-hidden style={{
            position: 'absolute',
            left: `${(tilt.x + 0.5) * 100}%`,
            top: `${(tilt.y + 0.5) * 100}%`,
            width: 200, height: 200,
            transform: 'translate(-50%,-50%)',
            background: `radial-gradient(circle, ${site.accent}33 0%, transparent 70%)`,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }} />
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
        <span style={{ color: 'var(--bg)' }}>CPW-0{20 + idx} · {site.name}</span>
        <span style={{ color: site.accent, fontSize: 10, letterSpacing: '0.14em' }}>VISIT →</span>
      </div>
    </a>
  );
}
