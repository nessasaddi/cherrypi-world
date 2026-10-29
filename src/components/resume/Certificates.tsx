'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

export type Cert = { name: string; src: string };

export default function Certificates({ certs }: { certs: Cert[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [start, setStart] = useState(0);
  const perView = 3;
  const maxStart = Math.max(0, certs.length - perView);

  const show = useCallback((i: number) => {
    setZoom(false);
    setOpen(((i % certs.length) + certs.length) % certs.length);
  }, [certs.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') show(open + 1);
      if (e.key === 'ArrowLeft') show(open - 1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, show]);

  return (
    <div className="certs" id="certificates">
      <div className="certs-row">
        <button type="button" className="certs-arrow no-print" aria-label="Previous certificates" disabled={start === 0} onClick={() => setStart((s) => Math.max(0, s - 1))}>←</button>
        <div className="certs-track-wrap">
          <ul className="certs-track" style={{ transform: `translateX(calc(-${start} * (100% / ${perView})))` }}>
            {certs.map((c, i) => (
              <li key={c.src} style={{ flex: `0 0 calc(100% / ${perView})` }}>
                <button type="button" className="cert-thumb" onClick={() => show(i)} aria-label={`Open ${c.name} certificate`}>
                  <Image src={c.src} alt={`SheCodes ${c.name} certificate`} width={351} height={248} sizes="(max-width: 600px) 40vw, 160px" />
                  <span className="mono cert-label">{c.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" className="certs-arrow no-print" aria-label="Next certificates" disabled={start >= maxStart} onClick={() => setStart((s) => Math.min(maxStart, s + 1))}>→</button>
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${certs[open].name} certificate`} onClick={() => setOpen(null)}>
          <button type="button" className="lb-close" aria-label="Close" onClick={() => setOpen(null)}>✕</button>
          <button type="button" className="lb-arrow lb-prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); show(open - 1); }}>←</button>
          <div className={`lb-stage ${zoom ? 'zoomed' : ''}`} onClick={(e) => { e.stopPropagation(); setZoom((z) => !z); }}>
            <Image src={certs[open].src} alt={`SheCodes ${certs[open].name} certificate`} width={3508} height={2479} sizes="100vw" priority />
          </div>
          <button type="button" className="lb-arrow lb-next" aria-label="Next" onClick={(e) => { e.stopPropagation(); show(open + 1); }}>→</button>
          <div className="mono lb-caption">
            SheCodes {certs[open].name} · {open + 1} / {certs.length} · click to {zoom ? 'shrink' : 'zoom'}
          </div>
        </div>
      )}
    </div>
  );
}
