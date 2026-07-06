export default function Footer() {
  const cols = [
    { t: 'studio', items: [{ label: 'the studio', href: '#studio' }, { label: 'field notes', href: '#connect' }] },
    { t: 'process', items: [{ label: 'how it runs', href: '#process' }] },
    { t: 'contact', items: [
      { label: 'hello@cherrypi.world', href: 'mailto:hello@cherrypi.world' },
      { label: 'github', href: 'https://github.com/nessasaddi' },
      { label: 'linkedin', href: 'https://www.linkedin.com/company/cherrypi' },
    ] },
  ];

  return (
    <footer className="footer">
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
          <div
            aria-label="Cherry Pi"
            style={{
              height: 'clamp(4.5rem, 14vw, 10rem)',
              aspectRatio: '420.74 / 229.55',
              backgroundImage: 'linear-gradient(100deg, var(--cherry) 0%, var(--blush) 28%, var(--lavender) 52%, var(--lime) 76%, var(--cherry) 100%)',
              backgroundSize: '250% 100%',
              animation: 'cp-shimmer 6s ease-in-out infinite',
              WebkitMaskImage: 'url(/logos/wordmark.svg)',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'left center',
              maskImage: 'url(/logos/wordmark.svg)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'left center',
            } as React.CSSProperties}
          />
          <span className="hand signoff-hand" style={{ fontSize: 20, color: 'var(--butter)', transform: 'rotate(-2deg)' }}>That&apos;s a wrap ✿</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 28 }}>
          {cols.map((c) => (
            <div key={c.t}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--butter)', textTransform: 'uppercase' }}>{c.t}</div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {c.items.map((x) => (
                  <a key={x.label} href={x.href} {...(x.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,250,240,0.7)', textDecoration: 'none' }}>→ {x.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 44, paddingTop: 22, borderTop: '1px dashed rgba(255,250,240,0.16)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,250,240,0.4)', letterSpacing: '0.12em', flexWrap: 'wrap', gap: 10 }}>
          <span>© 2026 cherry pi creative studio · DBA dvnci digital LLC · california</span>
          <span>california · pt · est 2023</span>
        </div>
      </div>
    </footer>
  );
}
