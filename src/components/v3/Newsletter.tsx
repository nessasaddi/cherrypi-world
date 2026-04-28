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
                <span className="hand" style={{ color: 'var(--butter)', fontSize: 26 }}>field notes ✿</span>
              </div>
              <h3 className="h-display" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', color: 'var(--paper)', lineHeight: 1 }}>
                field notes.<br/>
                <em style={{ fontStyle: 'italic', color: 'rgba(255,250,240,0.55)' }}>monthly.</em>
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.6, color: 'rgba(255,250,240,0.7)', margin: '18px 0 0', maxWidth: 380 }}>
                what&apos;s actually working in autonomous systems and creative infrastructure. <span style={{ color: 'var(--paper)' }}>nothing else.</span>
              </p>
            </div>
            <div>
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,250,240,0.5)', margin: '0 0 12px' }}>❯ cherry subscribe</pre>
              <form action="https://ch3rrypi.substack.com/subscribe" method="GET" target="_blank" rel="noopener" style={{ display: 'flex', gap: 8, background: 'rgba(255,250,240,0.06)', border: '1px solid rgba(255,250,240,0.18)', borderRadius: 14, padding: 6 }}>
                <input type="email" name="email" required placeholder="you@domain.com" style={{ flex: 1, border: 'none', background: 'transparent', padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none', color: 'var(--paper)', minWidth: 0 }} />
                <button type="submit" className="btn primary" style={{ padding: '12px 22px', borderColor: 'var(--paper)', boxShadow: '3px 3px 0 var(--paper)' }}>→ enter</button>
              </form>
              <div style={{ marginTop: 14, fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--butter)' }}>
                no spam, pinky promise ✿
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
