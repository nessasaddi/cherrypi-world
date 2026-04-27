import SiteCard from './SiteCard';
import { SITES } from './data';

export default function SitesGrid() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 22 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--cherry)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cherry)', boxShadow: '0 0 0 3px rgba(239,85,65,0.22)', animation: 'cp-pulse 1.8s ease-in-out infinite', display: 'inline-block' }} />
            // SHIPPED · LIVE IN PRODUCTION
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--bg)', marginTop: 10, letterSpacing: '-0.03em', lineHeight: 1 }}>
            Sites running on the same engine.
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em' }}>
          UPTIME · 99.97 · 4 of 11 SHOWN
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 20 }}>
        {SITES.map((s, i) => <SiteCard key={s.name} site={s} idx={i} />)}
      </div>
    </div>
  );
}
