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
    <div onClick={onClose} className="fixed inset-0 z-[800] bg-black/45 backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-enter absolute top-16 right-3 w-[min(360px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-white/10 bg-[#14171f] shadow-2xl"
        style={{ maxHeight: '80vh' }}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-2">
            <Bell size={16} color="#fb7185" />
            <span className="text-[15px] font-semibold text-slate-50">Notifications</span>
          </div>
          <div className="flex items-center gap-2">
            {notifications.some((n) => !n.read) && (
              <button type="button" onClick={markAllRead} className="border-0 bg-transparent text-xs font-semibold text-rose-400">
                Mark all read
              </button>
            )}
            <button type="button" onClick={onClose} className="icon-btn">
              <X size={15} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 60px)' }}>
          {notifications.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Bell size={28} color="#475569" className="mx-auto mb-3" />
              <p className="text-sm text-slate-500">No notifications</p>
            </div>
          ) : (
            notifications.map((n) => {
              const config = TYPE_CONFIG[n.type] || TYPE_CONFIG.info;
              return (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`flex cursor-pointer items-start gap-3 border-b border-white/[0.04] px-5 py-3.5 ${n.read ? 'bg-transparent' : 'bg-rose-500/[0.05]'}`}
                >
                  <div className="mt-0.5 shrink-0">{config.icon}</div>
                  <div className="min-w-0 flex-1">
                    <p className={`mb-0.5 text-[13px] text-slate-50 ${n.read ? 'font-normal' : 'font-semibold'}`}>{n.title}</p>
                    <p className="text-xs leading-5 text-slate-400">{n.message}</p>
                    <p className="mt-1 text-[11px] text-slate-600">{formatTime(n.timestamp)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); dismissNotification(n.id); }}
                    className="shrink-0 border-0 bg-transparent text-slate-600"
                  >
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
