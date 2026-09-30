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
      className={`${toast.exiting ? 'toast-exit' : 'toast-enter'} flex w-[min(340px,calc(100vw-32px))] items-start gap-3 rounded-xl border border-white/10 bg-[#171a22] p-3.5 shadow-2xl`}
      style={{ borderLeft: `3px solid ${COLORS[toast.type] || COLORS.info}` }}
    >
      <div className="mt-0.5 shrink-0">{ICONS[toast.type] || ICONS.info}</div>
      <div className="min-w-0 flex-1">
        {toast.title && <p className="mb-0.5 text-sm font-semibold text-slate-50">{toast.title}</p>}
        {toast.message && <p className="text-[13px] leading-5 text-slate-400">{toast.message}</p>}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 border-0 bg-transparent p-0.5 text-slate-500"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, dismissToast } = useNotification();

  return (
    <div className="fixed right-4 bottom-6 z-[2000] flex flex-col items-end gap-2.5 sm:right-6">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}
