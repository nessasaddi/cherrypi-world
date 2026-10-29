import { experience, education, stack } from '@/data/resume';
import Certificates from './Certificates';

export default function Experience() {
  return (
    <section id="experience" className="section scrollspy-anchor" style={{ paddingTop: 0 }}>
      <div className="container exp-grid">
        <div>
          <div className="section-tag" style={{ marginBottom: 18 }}>
            <span className="num">§ 05</span>
            <span className="hand" style={{ color: 'var(--cherry)', fontSize: 22, transform: 'rotate(-2deg)', display: 'inline-block' }}>the record ✿</span>
          </div>
          <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: 'var(--ink)', marginBottom: 'clamp(24px, 4vh, 40px)' }}>
            Every chapter <em>added a layer.</em>
          </h2>

          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.when + e.role}>
                <span className="mono tl-when">{e.when}</span>
                <div>
                  <h3 className="h-ui" style={{ fontSize: 17, margin: 0, color: 'var(--ink)' }}>{e.role}</h3>
                  <div style={{ fontSize: 13, color: 'var(--cherry)', marginTop: 2 }}>{e.where}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '8px 0 0' }}>{e.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="exp-side">
          <div className="panel" style={{ padding: 'clamp(20px, 2.5vw, 28px)' }}>
            <div className="mono" style={{ color: 'var(--ink-soft)', marginBottom: 14 }}>education</div>
            {education.map((ed) => (
              <div key={ed.what} style={{ marginBottom: 16 }}>
                <div className="mono" style={{ color: 'var(--cherry)', textTransform: 'none', letterSpacing: '0.1em' }}>{ed.when}</div>
                <div className="h-ui" style={{ fontSize: 15, marginTop: 2 }}>{ed.what}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 2 }}>{ed.detail}</div>
                {ed.certs && <Certificates certs={ed.certs} />}
              </div>
            ))}
          </div>

          <div className="panel" style={{ padding: 'clamp(20px, 2.5vw, 28px)', marginTop: 16 }}>
            <div className="mono" style={{ color: 'var(--ink-soft)', marginBottom: 14 }}>stack</div>
            {stack.map((g) => (
              <div key={g.group} style={{ marginBottom: 14 }}>
                <div className="mono" style={{ color: 'var(--cherry)', marginBottom: 8 }}>{g.group}</div>
                <div className="chips">
                  {g.items.map((i) => <span key={i} className="chip ink">{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
