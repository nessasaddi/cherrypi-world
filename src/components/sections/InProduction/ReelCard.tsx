import { REEL_PALETTE } from './data';

type ReelPalette = typeof REEL_PALETTE[number];

interface ReelCardProps {
  idx: number;
  total: number;
  palette: ReelPalette;
  active: boolean;
  onClick: () => void;
}

export default function ReelCard({ idx, total, palette, active, onClick }: ReelCardProps) {
  const { bg, tag, caption, brand, accent } = palette;
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: 'clamp(180px, 22vw, 240px)',
        aspectRatio: '9/16',
        borderRadius: 22,
        overflow: 'hidden',
        cursor: 'pointer',
        transform: active ? 'scale(1)' : 'scale(0.86)',
        opacity: active ? 1 : 0.55,
        transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s',
        boxShadow: active
          ? `0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12), 0 0 80px -20px ${accent}55`
          : '0 14px 30px -16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      {/* IG-style progress bar */}
      <div style={{ position: 'absolute', top: 6, left: 14, right: 14, display: 'flex', gap: 3, zIndex: 2 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 2, borderRadius: 2, background: i <= 1 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)' }} />
        ))}
      </div>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: bg }} />
      {/* Scanlines */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 3px)', mixBlendMode: 'overlay', opacity: 0.5 }} />
      {/* Vignette */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.6) 100%)' }} />
      {/* Top chrome */}
      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.12em', zIndex: 2 }}>
        <span style={{ textTransform: 'uppercase', padding: '3px 7px', background: 'rgba(0,0,0,0.35)', borderRadius: 4, backdropFilter: 'blur(6px)' }}>{brand}</span>
        <span style={{ textTransform: 'uppercase', padding: '3px 7px', background: 'rgba(0,0,0,0.35)', borderRadius: 4, backdropFilter: 'blur(6px)', color: accent }}>{tag}</span>
      </div>
      {/* Play button */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
        <div style={{ width: '62%', aspectRatio: '1', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)', background: 'rgba(255,255,255,0.04)' }}>
          <div style={{ width: 0, height: 0, borderLeft: '16px solid rgba(255,255,255,0.85)', borderTop: '11px solid transparent', borderBottom: '11px solid transparent', marginLeft: 4 }} />
        </div>
      </div>
      {/* Caption */}
      <div style={{ position: 'absolute', bottom: 16, left: 14, right: 14, zIndex: 2 }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 500, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 6, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
          {caption}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>
          <span>OUTPUT_{String(idx + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
          <span>0:{(15 + idx * 2).toString().padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
