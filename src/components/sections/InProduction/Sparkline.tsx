'use client';

import { useMemo } from 'react';

interface SparklineProps {
  data: number[];
  color: string;
  height?: number;
}

export default function Sparkline({ data, color, height = 50 }: SparklineProps) {
  const w = 200;
  const h = height;

  const { pts } = useMemo(() => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return { pts };
  }, [data, h]);

  const lastY = pts[pts.length - 1].split(',')[1];
  const gradId = `sp-${color.replace('#', '')}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height, display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`0,${h} ${pts.join(' ')} ${w},${h}`} fill={`url(#${gradId})`} stroke="none" />
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w} cy={lastY} r="3" fill={color}>
        <animate attributeName="r" values="3;5;3" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
