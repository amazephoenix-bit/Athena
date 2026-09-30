import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 24, className = '', fullPage = false }) {
  if (fullPage) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(220,38,38,0.2)', borderTop: '2px solid #dc2626', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <Loader2 size={size} className={className} style={{ animation: 'spin 1s linear infinite', color: '#dc2626', ...({}) }} />
  );
}
