import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 24, className = '', fullPage = false }) {
  if (fullPage) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-11 w-11 rounded-full border-2 border-white/10 border-t-rose-500" style={{ animation: 'spin 0.9s linear infinite' }} />
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <Loader2 size={size} className={className} style={{ animation: 'spin 1s linear infinite', color: '#fb7185' }} />
  );
}
