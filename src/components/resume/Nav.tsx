import Image from 'next/image';

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

    </>
  );
}
