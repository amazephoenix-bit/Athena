import { X, Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';

const TYPE_CONFIG = {
  success: { icon: <CheckCircle size={16} color="#4ade80" />, color: '#4ade80' },
  warning: { icon: <AlertTriangle size={16} color="#fbbf24" />, color: '#fbbf24' },
  info: { icon: <Info size={16} color="#60a5fa" />, color: '#60a5fa' },
  error: { icon: <AlertTriangle size={16} color="#f87171" />, color: '#f87171' },
};

function formatTime(ts) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function NotificationCenter({ isOpen, onClose }) {
  const { notifications, markRead, markAllRead, dismissNotification } = useNotification();

  if (!isOpen) return null;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 800, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
    }}>
      <div onClick={(e) => e.stopPropagation()} className="modal-enter" style={{
        position: 'absolute', top: 64, right: 12,
        width: 360, maxHeight: '80vh',
        background: '#13131a', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={16} color="#dc2626" />
            <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15 }}>Notifications</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {notifications.some((n) => !n.read) && (
              <button onClick={markAllRead} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#dc2626', fontSize: 12, fontWeight: 600,
              }}>
                Mark all read
              </button>
            )}
            <button onClick={onClose} style={{
              background: 'none', border: 'none', cursor: 'pointer', color: '#475569',
            }}>
              <X size={16} />
            </button>
          </div>
        </div>

        <div style={{ overflowY: 'auto', maxHeight: 'calc(80vh - 60px)' }}>
          {notifications.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center' }}>
              <Bell size={32} color="#334155" style={{ margin: '0 auto 12px' }} />
              <p style={{ color: '#475569', fontSize: 14 }}>No notifications</p>
            </div>
          ) : (
            notifications.map((n) => {
              const config = TYPE_CONFIG[n.type] || TYPE_CONFIG.info;
              return (
                <div key={n.id} onClick={() => markRead(n.id)} style={{
                  padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer', transition: 'background 0.2s',
                  background: n.read ? 'transparent' : 'rgba(220,38,38,0.04)',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}>{config.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: '#f1f5f9', fontSize: 13, fontWeight: n.read ? 400 : 600, marginBottom: 2 }}>{n.title}</p>
                    <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5 }}>{n.message}</p>
                    <p style={{ color: '#475569', fontSize: 11, marginTop: 4 }}>{formatTime(n.timestamp)}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); dismissNotification(n.id); }} style={{
                    background: 'none', border: 'none', cursor: 'pointer', color: '#334155', flexShrink: 0,
                  }}>
                    <X size={13} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
