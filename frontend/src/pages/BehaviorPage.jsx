import { useState, useEffect } from 'react';
import { behaviorApi } from '../api/behaviorApi';
import { useNotification } from '../contexts/NotificationContext';
import { Activity, AlertCircle } from 'lucide-react';
import ProgressBar from '../components/ui/ProgressBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';

export default function BehaviorPage() {
  const { addToast } = useNotification();
  const [patterns, setPatterns] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const [p, ins] = await Promise.all([behaviorApi.getPatterns(), behaviorApi.getInsights()]);
      setPatterns(Array.isArray(p) ? p : []);
      setInsights(Array.isArray(ins) ? ins : []);
    } catch { setError('Unable to load behavior data.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="page-enter">
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={22} color="#dc2626" />
          </div>
          <div>
            <h1 style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 800 }}>My Twin</h1>
            <p style={{ color: '#64748b', fontSize: 13 }}>Your digital behavioral profile</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', marginBottom: 24 }}>
        <p style={{ color: '#93c5fd', fontSize: 12, lineHeight: 1.7 }}>
          ℹ️ Behavior patterns are based on your recorded activity and preferences. ATHENA uses language like "noticed" and "suggests" intentionally — patterns are observations, not definitive facts. Uncertain patterns are shown with lower confidence scores.
        </p>
      </div>

      {loading && <LoadingSpinner fullPage />}
      {error && <EmptyState icon={AlertCircle} title="Load failed" message={error} action={load} />}

      {!loading && !error && (
        <>
          {/* Patterns grid */}
          {patterns.length > 0 ? (
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Detected Patterns</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
                {patterns.map((p) => (
                  <div key={p.id} className="glass-card" style={{ padding: '20px 22px' }}>
                    <p style={{ color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{p.label}</p>
                    <p style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{p.value}</p>
                    <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>
                      {p.detail.startsWith('ATHENA') || p.detail.startsWith('Based') || p.detail.startsWith('Your')
                        ? p.detail
                        : `ATHENA noticed: ${p.detail}`}
                    </p>
                    {p.confidence !== undefined && (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ color: '#475569', fontSize: 11 }}>Pattern confidence</span>
                          <span style={{ color: p.confidence > 0.7 ? '#4ade80' : p.confidence > 0.5 ? '#fbbf24' : '#f87171', fontSize: 11, fontWeight: 600 }}>{Math.round(p.confidence * 100)}%</span>
                        </div>
                        <ProgressBar
                          value={p.confidence * 100}
                          showLabel={false}
                          color={p.confidence > 0.7 ? 'green' : p.confidence > 0.5 ? 'amber' : 'red'}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: 28 }}>
              <EmptyState icon={Activity} title="No patterns detected yet" message="ATHENA is learning about you. Check back after a few days of using the app." />
            </div>
          )}

          {/* Insights */}
          {insights.length > 0 && (
            <div>
              <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>ATHENA's Observations</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {insights.map((ins, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderLeft: '3px solid rgba(220,38,38,0.5)' }}>
                    <span style={{ color: '#dc2626', fontSize: 16, flexShrink: 0 }}>💡</span>
                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{ins}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lifestyle patterns */}
          <div style={{ marginTop: 28 }}>
            <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Lifestyle Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { label: 'Most Productive Time', value: 'Evening', icon: '⚡', detail: 'Based on your recorded activity' },
                { label: 'Study Style', value: 'Night Owl', icon: '🦉', detail: 'ATHENA noticed late-night study sessions' },
                { label: 'Workout Consistency', value: '4x/week', icon: '💪', detail: 'Based on your workout log' },
                { label: 'Social Media Tendency', value: 'Post 10 PM', icon: '📱', detail: 'Your recent activity suggests higher usage late at night' },
              ].map((item, i) => (
                <div key={i} className="glass-card" style={{ padding: '16px 18px' }}>
                  <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>{item.icon}</span>
                  <p style={{ color: '#64748b', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{item.label}</p>
                  <p style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{item.value}</p>
                  <p style={{ color: '#475569', fontSize: 11, fontStyle: 'italic' }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
