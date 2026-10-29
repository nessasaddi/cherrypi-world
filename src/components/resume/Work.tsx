import { work } from '@/data/resume';

export default function Work() {
  return (
    <section id="work" className="section scrollspy-anchor">
      <div aria-hidden className="blob no-print" style={{ top: '10%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(239,85,65,0.14) 0%, transparent 65%)' }} />

      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-tag" style={{ marginBottom: 18 }}>
              <span className="num">§ 03</span>
              <span className="hand" style={{ color: 'var(--cherry)', fontSize: 22, transform: 'rotate(-3deg)', display: 'inline-block' }}>in production ✿</span>
            </div>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', color: 'var(--ink)' }}>
              Six properties. <em>All live.</em>
            </h2>
          </div>
          <p className="lede" style={{ maxWidth: 440 }}>
            Designed, built, deployed and maintained by one person. Every link below was checked the day this page was published.
          </p>
        </div>

        <div className="work-grid">
          {work.map((p, i) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener" className={`panel work-card work-card-${i}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span className="mono" style={{ color: 'var(--ink-soft)' }}>{p.client}</span>
                <span className="mono" style={{ color: 'var(--ink-faint)' }}>{p.year}</span>
              </div>
              <h3 className="h-display" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', margin: '12px 0 0', color: 'var(--ink)', fontWeight: 500 }}>
                {p.name} <span aria-hidden style={{ color: 'var(--cherry)' }}>↗</span>
              </h3>
              <div className="mono" style={{ color: 'var(--cherry)', margin: '10px 0 14px', textTransform: 'none', letterSpacing: '0.06em', fontSize: 11 }}>{p.stack}</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{p.body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
