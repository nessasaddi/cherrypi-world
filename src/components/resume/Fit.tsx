import { fit, straightTalk } from '@/data/resume';

export default function Fit() {
  return (
    <section id="fit" className="section dark-section scrollspy-anchor">
      <div aria-hidden className="blob no-print" style={{ top: '-20%', right: '-10%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(239,85,65,0.32) 0%, transparent 65%)' }} />
      <div aria-hidden className="blob no-print" style={{ bottom: '-20%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(174,190,255,0.22) 0%, transparent 65%)' }} />

      <div className="container" style={{ position: 'relative' }}>
        <div className="section-head">
          <div>
            <div className="section-tag" style={{ marginBottom: 18 }}>
              <span className="num">§ 02</span>
              <span className="hand" style={{ color: 'var(--butter)', fontSize: 22, transform: 'rotate(-2deg)', display: 'inline-block' }}>the fit ✿</span>
            </div>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', color: 'var(--paper)', lineHeight: 0.98 }}>
              What you asked for.<br />
              <em className="shimmer" style={{ fontStyle: 'italic' }}>What I have shipped.</em>
            </h2>
          </div>
          <p className="lede" style={{ color: 'rgba(255,250,240,0.72)', maxWidth: 440 }}>
            Each line of the listing, answered with work that is live today. Where the answer is not yet, it says so.
          </p>
        </div>

        <ol className="fit-list">
          {fit.map((f, i) => (
            <li key={f.ask} className="fit-row">
              <div className="fit-ask">
                <span className="mono" style={{ color: f.tag === 'core' ? 'var(--lime)' : 'var(--lavender)' }}>
                  {String(i + 1).padStart(2, '0')} · {f.tag === 'core' ? 'listed' : 'nice to have'}
                </span>
                <p>{f.ask}</p>
              </div>
              <div className="fit-proof">
                <p>{f.proof}</p>
                {f.evidence && (
                  <div className="chips">
                    {f.evidence.map((e) => <span key={e} className="chip">{e}</span>)}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="panel straight" >
          <span className="tape r" />
          <div className="mono" style={{ color: 'var(--butter)', marginBottom: 10 }}>straight talk</div>
          <p style={{ margin: 0 }}>{straightTalk}</p>
        </div>
      </div>
    </section>
  );
}
