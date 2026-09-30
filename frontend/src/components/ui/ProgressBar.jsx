export default function ProgressBar({ value, max = 100, showLabel = true, height = 6, color = 'red' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const colors = {
    red: { fill: 'linear-gradient(90deg, #dc2626, #ef4444)', glow: 'rgba(220,38,38,0.4)' },
    green: { fill: 'linear-gradient(90deg, #16a34a, #22c55e)', glow: 'rgba(34,197,94,0.3)' },
    blue: { fill: 'linear-gradient(90deg, #1d4ed8, #3b82f6)', glow: 'rgba(59,130,246,0.3)' },
    amber: { fill: 'linear-gradient(90deg, #d97706, #f59e0b)', glow: 'rgba(245,158,11,0.3)' },
  };
  const c = colors[color] || colors.red;
  return (
    <div style={{ width: '100%' }}>
      <div style={{
        background: 'rgba(255,255,255,0.08)', borderRadius: 100, height, overflow: 'hidden',
      }}>
        <div style={{
          background: c.fill, borderRadius: 100, height: '100%', width: `${pct}%`,
          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: `0 0 8px ${c.glow}`,
        }} />
      </div>
      {showLabel && (
        <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 4, textAlign: 'right' }}>{Math.round(pct)}%</p>
      )}
    </div>
  );
}
