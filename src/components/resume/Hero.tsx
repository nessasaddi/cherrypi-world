import { person, shecodes } from '@/data/resume';
import PrintButton from './PrintButton';

export default function Hero() {
  return (
    <section id="top" className="section resume-hero">
      <div aria-hidden className="blob no-print" style={{ bottom: '-20%', left: '10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(184,227,201,0.28) 0%, transparent 60%)', animation: 'cp-drift 28s ease-in-out infinite reverse' }} />

      <div className="container hero">
        <p className="mono hero-eyebrow">
          <span style={{ color: 'var(--ink)' }}>{person.name}</span>
          <span aria-hidden> · </span>
          {person.target.title}
        </p>

        <h1 className="h-display hero-title">
          <span style={{ display: 'block' }}>{person.headline[0]}</span>
          <em className="shimmer" style={{ display: 'block', fontStyle: 'italic' }}>{person.headline[1]}</em>
        </h1>

        <p className="lede hero-lede">{person.summary}</p>

        <ul className="contact-row" aria-label="contact">
          <li><a href={`mailto:${person.email}`}>{person.email}</a></li>
          {person.links.map((l) => (
            <li key={l.href}><a href={l.href} target="_blank" rel="noopener">{l.label}</a></li>
          ))}
        </ul>
        <p className="mono hero-where">{person.location}</p>

        <div className="hero-actions no-print">
          <a href="#fit" className="btn primary">→ see the fit</a>
          <PrintButton />
          <a href={shecodes.href} className="btn hero-badge">✦ {shecodes.label} ↓</a>
        </div>
      </div>
    </section>
  );
}
