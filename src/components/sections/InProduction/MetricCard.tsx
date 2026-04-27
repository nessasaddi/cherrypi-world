'use client';

import { useState, useEffect, useRef } from 'react';
import Sparkline from './Sparkline';

interface MetricCardProps {
  label: string;
  plain: string;
  from: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta: string;
  color: string;
  spark?: number[];
  good?: boolean;
}

function AnimatedNum({ from, to, duration = 1800, prefix = '', suffix = '', decimals = 0 }: {
  from: number; to: number; duration?: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const [val, setVal] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf: number;
    let started: number | undefined;
    const step = (t: number) => {
      if (!started) started = t;
      const p = Math.min(1, (t - started) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { raf = requestAnimationFrame(step); io.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [from, to, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}
    </span>
  );
}

export default function MetricCard({ label, plain, from, to, duration, prefix, suffix, decimals, delta, color, spark, good }: MetricCardProps) {
  const deltaColor = good ? '#D0DD57' : color;
  return (
    <div style={{ position: 'relative', padding: '16px 18px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0))' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', color: 'var(--bg)', letterSpacing: '-0.025em', lineHeight: 1, fontWeight: 500 }}>
        <AnimatedNum from={from} to={to} duration={duration} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
        <span style={{ color: deltaColor, padding: '2px 6px', border: `1px solid ${deltaColor}55`, borderRadius: 4, letterSpacing: '0.06em' }}>{delta}</span>
      </div>
      {spark && (
        <div style={{ marginTop: 10, marginLeft: -6, marginRight: -6 }}>
          <Sparkline data={spark} color={color} height={36} />
        </div>
      )}
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: spark ? 6 : 14, fontStyle: 'italic', lineHeight: 1.4 }}>
        {plain}
      </div>
    </div>
  );
}
