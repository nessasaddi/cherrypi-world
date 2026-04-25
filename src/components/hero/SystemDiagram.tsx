const C = {
  cherry: '#EF5541', lavender: '#AEBEFF', lime: '#D0DD57',
  blush: '#EDA599', fg: '#242424', fgMuted: '#5c5c5c',
};

const NODES = [
  { a: 0,   l1: 'brand voice',        l2: 'copy',           c: C.cherry },
  { a: 60,  l1: 'generative content', l2: 'image · video',  c: C.lavender },
  { a: 120, l1: 'quality scoring',    l2: 'evals',          c: C.lime },
  { a: 180, l1: 'composition',        l2: 'layout',         c: C.blush },
  { a: 240, l1: 'scheduling',         l2: 'posting',        c: C.cherry },
  { a: 300, l1: 'shipping',           l2: 'publishing',     c: C.lavender },
];

export default function SystemDiagram() {
  const cx = 150, cy = 150;

  return (
    <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%' }}>
      <style>{`@media (max-width: 820px) { .cp-diag-label { font-size: 9px; } }`}</style>
      {/* Concentric dashed rings */}
      {[60, 100, 140].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={`${C.fg}26`} strokeDasharray="2 4" />
      ))}

      {/* Spoke lines from center to nodes */}
      {NODES.map((n, i) => {
        const x = cx + Math.cos((n.a * Math.PI) / 180) * 110;
        const y = cy + Math.sin((n.a * Math.PI) / 180) * 110;
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={`${n.c}55`} strokeWidth="1" />;
      })}

      {/* Center circle + rotating ring */}
      <circle cx={cx} cy={cy} r={24} fill={C.fg} />
      <circle cx={cx} cy={cy} r={30} fill="none" stroke={C.cherry} strokeWidth="1" strokeDasharray="2 3">
        <animateTransform
          attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`}
          dur="20s" repeatCount="indefinite"
        />
      </circle>
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="14" fill={C.cherry} fontWeight="500">π</text>

      {/* Orbit nodes */}
      {NODES.map((n, i) => {
        const x = cx + Math.cos((n.a * Math.PI) / 180) * 110;
        const y = cy + Math.sin((n.a * Math.PI) / 180) * 110;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={14} fill="white" stroke={n.c} strokeWidth="1.5" />
            <circle cx={x} cy={y} r={5} fill={n.c}>
              <animate attributeName="opacity" values="1;0.4;1" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <text className="cp-diag-label" x={x} y={y + 28} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill={C.fgMuted}>
              <tspan x={x}>{n.l1}</tspan>
              <tspan x={x} dy="11">/ {n.l2}</tspan>
            </text>
          </g>
        );
      })}

      {/* Animated data packets */}
      {NODES.map((n, i) => {
        const x1 = cx + Math.cos((n.a * Math.PI) / 180) * 24;
        const y1 = cy + Math.sin((n.a * Math.PI) / 180) * 24;
        const x2 = cx + Math.cos((n.a * Math.PI) / 180) * 96;
        const y2 = cy + Math.sin((n.a * Math.PI) / 180) * 96;
        return (
          <circle key={`p${i}`} r="2.5" fill={n.c}>
            <animate attributeName="cx" values={`${x1};${x2};${x1}`} dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${y1};${y2};${y1}`} dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </svg>
  );
}
