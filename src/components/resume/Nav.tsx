import Image from 'next/image';
import PrintButton from './PrintButton';

const LINKS = [
  { href: '#top', label: 'resume' },
  { href: '#fit', label: 'fit' },
  { href: '#work', label: 'work' },
  { href: '#tools', label: 'tools' },
  { href: '#experience', label: 'experience' },
  { href: '#contact', label: 'contact' },
];

export default function Nav() {
  return (
    <>
      <aside className="left-rail no-print" aria-label="primary">
        <a href="#top" className="logo" style={{ background: 'none' }} aria-label="Cherry Pi">
          <Image src="/logos/cherry-icon.svg" width={31} height={40} alt="" />
        </a>
        {LINKS.map((l) => (
          <a key={l.href} className="nav-link" href={l.href}>{l.label}</a>
        ))}
        <div className="vert">vanessa saddi · resume</div>
      </aside>

      <header className="top-bar no-print">
        <div className="top-bar-row">
          <a href="#top" className="wm" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Image src="/logos/cherry-icon.svg" width={22} height={28} alt="" priority />
            <span className="mono" style={{ color: 'var(--ink)', fontSize: 11 }}>vanessa saddi</span>
          </a>
          <PrintButton compact />
        </div>
        <nav className="top-bar-nav">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
      </header>
    </>
  );
}
