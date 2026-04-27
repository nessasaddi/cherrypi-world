import { MARQUEE_ITEMS } from './data';

export default function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '18px 0', margin: 'clamp(40px, 6vw, 70px) -2vw' }}>
      <div style={{ display: 'flex', gap: 36, width: 'max-content', animation: 'dropMarquee 90s linear infinite' }}>
        {doubled.map((it, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 36, fontFamily: 'var(--font-heading)', fontWeight: 500, fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', color: 'var(--bg)', letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>
            {it}
            <span style={{ color: 'var(--cherry)', fontSize: '0.6em' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
