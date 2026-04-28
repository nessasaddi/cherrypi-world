export default function Newsletter() {
  return (
    <section id="connect" className="section">
      <div className="container">
        <div className="panel" style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(36px, 5vw, 80px)', position: 'relative', overflow: 'hidden', borderRadius: 28, border: 'none' }}>
          <div aria-hidden style={{ position: 'absolute', top: '-30%', right: '-20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,217,122,0.42) 0%, transparent 70%)', filter: 'blur(50px)' }} />
          <div aria-hidden style={{ position: 'absolute', bottom: '-30%', left: '-20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(174,190,255,0.28) 0%, transparent 70%)', filter: 'blur(50px)' }} />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'center' }}>
            <div>
              <div className="section-tag" style={{ marginBottom: 18 }}>
                <span className="num" style={{ color: 'rgba(255,250,240,0.5)' }}>§ 06</span>
                <span className="hand" style={{ color: 'var(--butter)', fontSize: 22 }}>Field notes ✿</span>
              </div>
              <h3 className="h-display" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', color: 'var(--paper)', lineHeight: 1 }}>
                Field notes.<br/>
                <em style={{ fontStyle: 'italic', color: 'rgba(255,250,240,0.55)' }}>Monthly.</em>
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.6, color: 'rgba(255,250,240,0.7)', margin: '18px 0 0', maxWidth: 380 }}>
                What&apos;s actually working in autonomous systems and creative infrastructure. <span style={{ color: 'var(--paper)' }}>Nothing else.</span>
              </p>
            </div>
            <div>
              <form action="https://ch3rrypi.substack.com/subscribe" method="GET" target="_blank" rel="noopener" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,250,240,0.4)', margin: '0 0 4px', letterSpacing: '0.1em' }}>❯ cherry subscribe</pre>
                <input
                  type="email" name="email" required placeholder="you@domain.com"
                  style={{ border: '1px solid rgba(255,250,240,0.22)', background: 'rgba(255,250,240,0.06)', borderRadius: 12, padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: 14, outline: 'none', color: 'var(--paper)', width: '100%', boxSizing: 'border-box' }}
                />
                <button type="submit" className="btn primary" style={{ width: '100%', justifyContent: 'center', padding: '16px 24px', background: 'var(--cherry)', borderColor: 'var(--cherry)', color: 'var(--paper)', fontSize: 14, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                  join the list →
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)', flexShrink: 0, display: 'inline-block' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,250,240,0.38)', letterSpacing: '0.12em' }}>monthly · no spam · unsubscribe anytime</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
