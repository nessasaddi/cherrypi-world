'use client';

import { useState, useEffect, useRef } from 'react';
import ReelCard from './ReelCard';
import { REEL_PALETTE } from './data';

export default function ReelCarousel({ count = 7 }: { count?: number }) {
  const cards = REEL_PALETTE.slice(0, count);
  const tripled = [...cards, ...cards, ...cards];
  const [active, setActive] = useState(count); // start in middle copy
  const [dragX, setDragX] = useState(0);
  const [animEnabled, setAnimEnabled] = useState(true);
  const dragStart = useRef<number | null>(null);
  const isDragging = useRef(false);
  const isHovered = useRef(false);

  const next = () => setActive((a) => a + 1);
  const prev = () => setActive((a) => a - 1);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    isDragging.current = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current == null) return;
    const delta = e.clientX - dragStart.current;
    if (Math.abs(delta) > 5) isDragging.current = true;
    setDragX(delta);
  };
  const onPointerUp = () => {
    if (dragStart.current == null) return;
    if (dragX < -60) next();
    else if (dragX > 60) prev();
    dragStart.current = null;
    setDragX(0);
    setTimeout(() => { isDragging.current = false; }, 0);
  };

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Auto-advance — pauses on hover, skips if reduced motion
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const t = setInterval(() => {
      if (!isHovered.current) next();
    }, 3800);
    return () => clearInterval(t);
  }, []);

  // Seamless infinite wrap
  useEffect(() => {
    if (active < count / 2 || active > count * 2.5) {
      const target = ((active % count) + count) % count + count;
      const t = setTimeout(() => {
        setAnimEnabled(false);
        setActive(target);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimEnabled(true)));
      }, 520);
      return () => clearTimeout(t);
    }
  }, [active, count]);

  const cardW = 240;
  const gap = 24;
  const offset = -active * (cardW + gap) + dragX;
  const visibleIdx = ((active % count) + count) % count;

  return (
    <div
      style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '16px 0 8px' }}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
      tabIndex={0}
      aria-label="Reel carousel"
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap,
          paddingLeft: 'calc(50% - 120px)',
          paddingRight: 'calc(50% - 120px)',
          transform: `translateX(${offset}px)`,
          transition: dragStart.current != null || !animEnabled ? 'none' : 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          touchAction: 'pan-y',
          cursor: dragStart.current != null ? 'grabbing' : 'grab',
        }}
      >
        {tripled.map((p, i) => (
          <ReelCard
            key={i}
            idx={i % count}
            total={count}
            palette={p}
            active={i === active}
            onClick={() => {
              if (!isDragging.current) {
                setAnimEnabled(true);
                setActive(i);
              }
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 28, alignItems: 'center' }}>
        <button
          onClick={prev}
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--bg)', borderRadius: 999, width: 36, height: 36, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Previous"
        >‹</button>
        <div style={{ display: 'flex', gap: 6 }}>
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAnimEnabled(true); setActive(count + i); }}
              style={{
                width: i === visibleIdx ? 22 : 6,
                height: 6,
                borderRadius: 999,
                border: 0,
                background: i === visibleIdx ? 'var(--cherry)' : 'rgba(255,255,255,0.22)',
                transition: 'all 0.3s',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Go to ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: 'var(--bg)', borderRadius: 999, width: 36, height: 36, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Next"
        >›</button>
        <span style={{ marginLeft: 14, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.16em' }}>
          {String(visibleIdx + 1).padStart(2, '0')} / {String(count).padStart(2, '0')} · OUTPUT.MP4
        </span>
      </div>
    </div>
  );
}
