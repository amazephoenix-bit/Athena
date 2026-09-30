import { AlertCircle, RefreshCw } from 'lucide-react';

export default function EmptyState({ icon: Icon = AlertCircle, title, message, action, actionLabel = 'Try Again' }) {
  return (
    <div className="glass-card flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
        <Icon size={26} color="#8b93a7" />
      </div>
      <div>
        <p className="mb-1.5 text-base font-semibold text-slate-50">{title}</p>
        {message && <p className="max-w-sm text-sm leading-6 text-slate-400">{message}</p>}
      </div>
      {action && (
        <button type="button" className="athena-btn-secondary mt-1" onClick={action}>
          <RefreshCw size={14} /> {actionLabel}
        </button>
      )}
    </div>
  );
}
