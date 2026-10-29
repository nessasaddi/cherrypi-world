import { tools } from '@/data/resume';

export default function Tools() {
  return (
    <section id="tools" className="section scrollspy-anchor" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="panel tools-panel">
          <span className="tape l" style={{ background: 'rgba(174,190,255,0.5)' }} />
          <div className="section-head" style={{ marginBottom: 'clamp(24px, 4vh, 40px)' }}>
            <div>
              <div className="section-tag" style={{ marginBottom: 14 }}>
                <span className="num">§ 04</span>
                <span className="hand" style={{ color: 'var(--cherry)', fontSize: 22, transform: 'rotate(-2deg)', display: 'inline-block' }}>the tooling ✿</span>
              </div>
              <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: 'var(--ink)' }}>
                Internal tools, <em>in daily use.</em>
              </h2>
            </div>
            <p className="lede" style={{ maxWidth: 440 }}>
              The studio is one operator, so every repeated job became a skill, a script or a pipeline. Eighteen custom Claude skills installed; the ones below do the heavy lifting.
            </p>
          </div>

          <ul className="tools-grid">
            {tools.map((t) => (
              <li key={t.name}>
                <div className="mono" style={{ color: 'var(--ink)', textTransform: 'none', letterSpacing: '0.04em', fontSize: 12 }}>{t.name}</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-soft)', marginTop: 4 }}>{t.what}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
