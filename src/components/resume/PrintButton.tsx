'use client';

export default function PrintButton({ compact = false }: { compact?: boolean }) {
  return (
    <button
      type="button"
      className={`btn ${compact ? 'ghost' : 'dark'} no-print`}
      onClick={() => window.print()}
      style={compact ? { padding: '8px 14px' } : undefined}
    >
      → {compact ? 'pdf' : 'save as pdf'}
    </button>
  );
}
