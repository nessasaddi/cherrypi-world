const FOOTER_COLS = [
  { t: 'work',    items: ['case studies', 'stack', 'process'] },
  { t: 'connect', items: ['hello@cherrypi.world', 'github', 'linkedin'] },
  { t: 'studio',  items: ['about', 'field notes', 'availability'] },
  { t: 'meta',    items: ['california · pt', 'est 2023', '∞ · never resolves'] },
];

export default function Footer() {
  return (
    <footer style={{ position: 'relative', padding: 'clamp(60px, 10vh, 100px) clamp(20px, 5vw, 80px) 40px', background: '#1a1a1a', color: '#f4f4f4' }}>
      <div style={{ marginBottom: 40 }}>
        <div
          role="img"
          aria-label="Cherry Pi"
          style={{
            display: 'inline-block',
            height: 53,
            width: 97,
            backgroundImage: 'linear-gradient(90deg, #EF5541, #EDA599, #AEBEFF, #D0DD57, #E9F2B1, #EF5541)',
            backgroundSize: '300% 100%',
            WebkitMaskImage: 'url(/logos/wordmark.svg)',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            WebkitMaskPosition: 'center left',
            maskImage: 'url(/logos/wordmark.svg)',
            maskRepeat: 'no-repeat',
            maskSize: 'contain',
            maskPosition: 'center left',
            animation: 'cp-shimmer 5s ease-in-out infinite',
          }}
        />
      </div>

      <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(11px, 1vw, 13px)', color: 'rgba(244,244,244,0.5)', margin: 0, whiteSpace: 'pre-wrap' }}>
{`❯ cherry --help

  CHERRY PI STUDIO · v3.2 · 2026
  A creative studio, engineered like software.

  Commands:`}
      </pre>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24, marginTop: 24 }}>
        {FOOTER_COLS.map((col) => (
          <div key={col.t}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(244,244,244,0.4)', textTransform: 'uppercase' }}>
              $ {col.t}
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {col.items.map((x) => (
                <div key={x} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(244,244,244,0.7)' }}>→ {x}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 36, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(244,244,244,0.4)', letterSpacing: '0.1em', flexWrap: 'wrap', gap: 10 }}>
        <span>© 2026 Cherry Pi Creative Studio · DBA of{' '}<a href="http://dvncidigital.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(244,244,244,0.4)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Dvnci Digital LLC</a>{' '}· California</span>
        <span>RUNNING · ∞</span>
      </div>
    </footer>
  );
}
