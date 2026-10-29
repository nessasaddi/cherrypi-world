import Image from 'next/image';
import { person } from '@/data/resume';
import PrintButton from './PrintButton';

export default function Hero() {
  return (
    <section id="top" className="section resume-hero" style={{ paddingTop: 'clamp(48px, 8vh, 100px)', paddingBottom: 'clamp(40px, 6vh, 80px)' }}>
      <div aria-hidden className="blob no-print" style={{ bottom: '-15%', left: '15%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(184,227,201,0.32) 0%, transparent 60%)', animation: 'cp-drift 28s ease-in-out infinite reverse' }} />

      <div className="container hero-grid">
        <div>
          <div className="section-tag" style={{ marginBottom: 24 }}>
            <span className="num"><span style={{ color: 'var(--cherry)' }}>{person.name}</span> · § 01 <span style={{ textTransform: 'none' }}>/resume</span></span>
          </div>

          <p className="mono" style={{ color: 'var(--ink-soft)', margin: '0 0 14px' }}>
            {person.target.title}
          </p>

          <h1 className="h-display" style={{ margin: 0, lineHeight: 1.02 }}>
            <span style={{ display: 'block', fontSize: 'clamp(2.6rem, 6vw, 4.8rem)' }}>{person.headline[0]}</span>
            <em className="shimmer" style={{ display: 'block', fontSize: 'clamp(2.6rem, 6vw, 4.8rem)', fontStyle: 'italic' }}>
              {person.headline[1]}
            </em>
          </h1>

          <p className="lede" style={{ margin: '26px 0 0', maxWidth: 580 }}>
            {person.summary}
          </p>

          <ul className="contact-row" aria-label="contact">
            <li><a href={`mailto:${person.email}`}>{person.email}</a></li>
            {person.links.map((l) => (
              <li key={l.href}><a href={l.href} target="_blank" rel="noopener">{l.label}</a></li>
            ))}
            <li>{person.location}</li>
          </ul>

          <div className="no-print" style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
            <a href="#fit" className="btn primary">→ why this role fits</a>
            <PrintButton />
            <a href={person.target.href} target="_blank" rel="noopener" className="btn ghost">→ the listing</a>
          </div>
        </div>

        <div className="portrait-wrap">
          <div className="portrait">
            <div style={{ width: '100%', aspectRatio: '4/5', position: 'relative', overflow: 'hidden' }}>
              <Image src="/portrait-vsaddi.jpg" alt="Vanessa Saddi" fill sizes="(max-width: 768px) 60vw, 320px" style={{ objectFit: 'cover' }} priority />
            </div>
            <div className="portrait-caption">mom of 3 · sees in systems</div>
          </div>
        </div>
      </div>
    </section>
  );
}
