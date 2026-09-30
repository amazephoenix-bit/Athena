import { useNotification } from '../../contexts/NotificationContext';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ICONS = {
  success: <CheckCircle size={18} color="#4ade80" />,
  error: <AlertCircle size={18} color="#f87171" />,
  warning: <AlertTriangle size={18} color="#fbbf24" />,
  info: <Info size={18} color="#60a5fa" />,
};

const COLORS = {
  success: '#4ade80',
  error: '#f87171',
  warning: '#fbbf24',
  info: '#60a5fa',
};

function Toast({ toast, onDismiss }) {
  return (
    <div
      className={toast.exiting ? 'toast-exit' : 'toast-enter'}
      style={{
        background: '#1a1a24', border: '1px solid rgba(255,255,255,0.1)',
        borderLeft: `3px solid ${COLORS[toast.type] || COLORS.info}`,
        borderRadius: 12, padding: '14px 16px',
        display: 'flex', alignItems: 'flex-start', gap: 12,
        width: 340, boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        position: 'relative',
      }}
    >
      <div style={{ flexShrink: 0, marginTop: 1 }}>{ICONS[toast.type] || ICONS.info}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {toast.title && <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{toast.title}</p>}
        {toast.message && <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{toast.message}</p>}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: 2, flexShrink: 0 }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, dismissToast } = useNotification();

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 2000,
      display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end',
    }}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}
