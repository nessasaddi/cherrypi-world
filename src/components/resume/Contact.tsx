import { person } from '@/data/resume';

export default function Contact() {
  return (
    <footer id="contact" className="footer scrollspy-anchor">
      <div className="container" style={{ position: 'relative' }}>
        <div className="section-tag" style={{ marginBottom: 18 }}>
          <span className="num" style={{ color: 'rgba(255,250,240,0.5)' }}>§ 06</span>
          <span className="hand" style={{ color: 'var(--butter)', fontSize: 22 }}>say hello ✿</span>
        </div>
        <h2 className="h-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.4rem)', color: 'var(--paper)', lineHeight: 1 }}>
          Let&apos;s build <em className="shimmer" style={{ fontStyle: 'italic' }}>the next page.</em>
        </h2>

        <div className="contact-grid">
          <div>
            <div className="mono" style={{ color: 'var(--butter)' }}>email</div>
            <a href={`mailto:${person.email}`} className="contact-big">{person.email}</a>
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--butter)' }}>elsewhere</div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {person.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener" className="contact-link">→ {l.label}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="mono" style={{ color: 'var(--butter)' }}>where</div>
            <div className="contact-link" style={{ marginTop: 12 }}>{person.location}</div>
          </div>
        </div>

        <div className="footer-legal">
          <span>© 2026 vanessa saddi · cherry pi creative studio · DBA dvnci digital LLC · california</span>
          <span>this page is the resume. print it for the pdf.</span>
        </div>
      </div>
    </footer>
  );
}
