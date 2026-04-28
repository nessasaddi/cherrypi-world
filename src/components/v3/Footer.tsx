export default function Footer() {
  const cols = [
    { t: 'work',    items: ['case studies', 'stack', 'process'] },
    { t: 'connect', items: ['hello@cherrypi.world', 'github', 'linkedin'] },
    { t: 'studio',  items: ['about', 'field notes', 'availability'] },
    { t: 'meta',    items: ['california · pt', 'est 2023', '∞ · never resolves'] },
  ];

  return (
    <footer className="footer">
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
          <span className="h-display" style={{ fontSize: 56, color: 'var(--paper)', fontStyle: 'italic', backgroundImage: 'linear-gradient(90deg, var(--cherry), var(--blush), var(--lavender), var(--lime), var(--cherry))', backgroundSize: '300% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'cp-shimmer 8s ease-in-out infinite' }}>
            Cherry Pi
          </span>
          <span className="hand signoff-hand" style={{ fontSize: 20, color: 'var(--butter)', transform: 'rotate(-2deg)' }}>That&apos;s a wrap ✿</span>
        </div>

        <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(11px, 1vw, 13px)', color: 'rgba(255,250,240,0.5)', margin: '0 0 24px' }}>
{`❯ cherry --help

  CHERRY PI STUDIO · v3.2 · 2026
  a creative studio, engineered like software.

  commands:`}
        </pre>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 28 }}>
          {cols.map((c) => (
            <div key={c.t}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--butter)', textTransform: 'uppercase' }}>$ {c.t}</div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {c.items.map((x) => (
                  <div key={x} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,250,240,0.7)' }}>→ {x}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 44, paddingTop: 22, borderTop: '1px dashed rgba(255,250,240,0.16)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,250,240,0.4)', letterSpacing: '0.12em', flexWrap: 'wrap', gap: 10 }}>
          <span>© 2026 cherry pi creative studio · DBA dvnci digital LLC · california</span>
          <span>RUNNING · ∞</span>
        </div>
      </div>
    </footer>
  );
}
