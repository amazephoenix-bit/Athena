import { AlertCircle, RefreshCw } from 'lucide-react';

export default function EmptyState({ icon: Icon = AlertCircle, title, message, action, actionLabel = 'Try Again' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '60px 24px', textAlign: 'center', gap: 16,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={28} color="#dc2626" />
      </div>
      <div>
        <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{title}</p>
        {message && <p style={{ color: '#94a3b8', fontSize: 14 }}>{message}</p>}
      </div>
      {action && (
        <button className="athena-btn-secondary" onClick={action} style={{ marginTop: 8 }}>
          <RefreshCw size={14} /> {actionLabel}
        </button>
      )}
    </div>
  );
}
