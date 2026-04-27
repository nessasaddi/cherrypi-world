'use client';

import { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import { EVENTS } from './data';

function useTickingSpark(seed = 50, drift = 0.02, count = 32) {
  const [data, setData] = useState(() =>
    Array.from({ length: count }, (_, i) => seed + Math.sin(i * 0.4) * 8 + Math.random() * 6)
  );
  useEffect(() => {
    const t = setInterval(() => {
      setData((d) => {
        const last = d[d.length - 1];
        const next = Math.max(0, last + (Math.random() - 0.5 + drift) * 6);
        return [...d.slice(1), next];
      });
    }, 1100);
    return () => clearInterval(t);
  }, [drift]);
  return data;
}

export default function CaseStudy() {
  const ctrSpark = useTickingSpark(2.4, 0.04);
  const cpaSpark = useTickingSpark(38, -0.06);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--cherry)', textTransform: 'uppercase' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/meta.svg" alt="" width={14} height={14} style={{ filter: 'invert(1) brightness(2)' }} />
          // CASE_STUDY · META_ADS · AUTO-PUBLISH
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.4vw, 2.8rem)', color: 'var(--bg)', marginTop: 12, letterSpacing: '-0.035em', lineHeight: 1.05, maxWidth: 760 }}>
          We bolted the engine straight into Meta Ads.{' '}
          <em style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'normal' }}>The campaigns now ship themselves.</em>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 14, maxWidth: 620, lineHeight: 1.55 }}>
          When the system spots ad fatigue it briefs new creative, generates it, QAs it, and pushes the next round to Meta — without a person in the loop.{' '}
          <em style={{ color: 'rgba(255,255,255,0.85)', fontStyle: 'normal' }}>Plain-English: your ads refresh themselves before they get tired.</em>
        </p>
      </div>

      {/* Client meta */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 14, marginBottom: 18, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em' }}>
        {([['CLIENT', '▓▓▓▓▓▓▓▓▓ · DTC'], ['INDUSTRY', 'consumer goods'], ['WINDOW', '60d · live'], ['INTEGRATIONS', 'meta · gemini · gpt']] as const).map(([k, v]) => (
          <div key={k} style={{ padding: '12px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, background: 'rgba(255,255,255,0.025)' }}>
            <div style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{k}</div>
            <div style={{ color: 'var(--bg)', fontSize: 12, letterSpacing: '0.04em' }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 14, marginBottom: 24 }}>
        <MetricCard label="CPA · cost / acquisition" plain="It costs less to get a customer." from={58} to={38} duration={2000} prefix="$" decimals={2} delta="-34%" color="#D0DD57" spark={cpaSpark} good />
        <MetricCard label="CTR · click-through" plain="More people are tapping the ads." from={1.4} to={2.5} duration={2000} suffix="%" decimals={2} delta="+1.81x" color="#AEBEFF" spark={ctrSpark} good />
        <MetricCard label="CREATIVE / WK" plain="Variants tested per week." from={4} to={42} duration={1800} delta="+10.5x" color="#EF5541" />
        <MetricCard label="HUMAN_TOUCH" plain="Hours of manual work per cycle." from={18} to={1.5} duration={1800} suffix="h" decimals={1} delta="-92%" color="#EDA599" good />
      </div>

      {/* Event log */}
      <div style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 'clamp(18px, 2.5vw, 26px)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', boxShadow: '0 0 0 4px rgba(40,200,64,0.18)', animation: 'cp-pulse 1.6s infinite', display: 'inline-block' }} />
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, letterSpacing: '0.14em' }}>auto-publish · cycle_0419</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: '0.14em' }}>↻ LIVE</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {EVENTS.map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 80px 1fr', alignItems: 'center', gap: 12, paddingBottom: 10, borderBottom: i < EVENTS.length - 1 ? '1px dashed rgba(255,255,255,0.06)' : 'none' }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>{e.t}</span>
              <span style={{ color: e.color, fontSize: 10, letterSpacing: '0.12em', fontWeight: 500 }}>{e.c}</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>{e.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
