import { useState } from 'react';
import { lifestyleApi } from '../api/lifestyleApi';
import { useNotification } from '../contexts/NotificationContext';
import { Sparkles, Music, Tv, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { DEMO_MODE } from '../api/apiClient';

const MOOD_OPTIONS = [
  { icon: '😊', label: 'Good', value: 'good' },
  { icon: '😐', label: 'Okay', value: 'okay' },
  { icon: '😔', label: 'Not great', value: 'not_great' },
  { icon: '🆘', label: 'Need help', value: 'help' },
];

export default function LifestylePage() {
  const { addToast } = useNotification();
  const [spotifyUser, setSpotifyUser] = useState('');
  const [connecting, setConnecting] = useState({ spotify: false, youtube: false });
  const [spotifyStatus, setSpotifyStatus] = useState('not_connected');
  const [youtubeStatus, setYoutubeStatus] = useState('not_connected');
  const [mood, setMood] = useState(null);

  const connectSpotify = async () => {
    setConnecting((p) => ({ ...p, spotify: true }));
    try {
      const res = await lifestyleApi.connectSpotify(spotifyUser);
      setSpotifyStatus(res.connected ? 'connected' : 'not_connected');
      addToast({ title: res.connected ? 'Spotify connected!' : 'Spotify requires backend integration', message: res.message, type: res.connected ? 'success' : 'info' });
    } catch { addToast({ title: 'Error', type: 'error' }); }
    finally { setConnecting((p) => ({ ...p, spotify: false })); }
  };

  const connectYouTube = async () => {
    setConnecting((p) => ({ ...p, youtube: true }));
    try {
      const res = await lifestyleApi.connectYouTube();
      setYoutubeStatus(res.connected ? 'connected' : 'not_connected');
      addToast({ title: 'YouTube', message: res.message, type: 'info' });
    } catch { addToast({ title: 'Error', type: 'error' }); }
    finally { setConnecting((p) => ({ ...p, youtube: false })); }
  };

  const statusBadge = (status) => ({
    not_connected: { label: 'Not Connected', color: '#475569', bg: 'rgba(255,255,255,0.06)' },
    connected: { label: 'Connected', color: '#4ade80', bg: 'rgba(34,197,94,0.1)' },
    denied: { label: 'Permission Denied', color: '#f87171', bg: 'rgba(248,113,113,0.1)' },
  }[status] || { label: status, color: '#94a3b8', bg: 'rgba(255,255,255,0.06)' });

  return (
    <div className="page-enter">
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={22} color="#dc2626" />
          </div>
          <div>
            <h1 style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 800 }}>Lifestyle</h1>
            <p style={{ color: '#64748b', fontSize: 13 }}>Music · Activity · Mood Signals</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {/* Spotify */}
        <div className="glass-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(30,215,96,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Music size={20} color="#1ed760" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700 }}>Spotify</h2>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 100, background: statusBadge(spotifyStatus).bg, marginTop: 3 }}>
                <span style={{ color: statusBadge(spotifyStatus).color, fontSize: 11, fontWeight: 600 }}>{statusBadge(spotifyStatus).label}</span>
              </div>
            </div>
          </div>
          <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(30,215,96,0.05)', border: '1px solid rgba(30,215,96,0.15)', marginBottom: 14 }}>
            <p style={{ color: '#6ee7b7', fontSize: 12, lineHeight: 1.6 }}>🎵 Music is used as a lifestyle context signal only. ATHENA will never use your music preferences to diagnose health or mood conditions.</p>
          </div>
          <label className="athena-label">Spotify username</label>
          <input className="athena-input" placeholder="your_spotify_username" value={spotifyUser} onChange={(e) => setSpotifyUser(e.target.value)} style={{ marginBottom: 10 }} />
          {DEMO_MODE && <p style={{ color: '#64748b', fontSize: 11, marginBottom: 10 }}>⚡ Demo Mode — Spotify requires backend integration to connect.</p>}
          <button onClick={connectSpotify} disabled={connecting.spotify} className="athena-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
            {connecting.spotify ? <LoadingSpinner size={16} /> : '🎵 Connect Spotify'}
          </button>
        </div>

        {/* YouTube */}
        <div className="glass-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tv size={20} color="#ff4444" />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700 }}>YouTube</h2>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 100, background: statusBadge(youtubeStatus).bg, marginTop: 3 }}>
                <span style={{ color: statusBadge(youtubeStatus).color, fontSize: 11, fontWeight: 600 }}>{statusBadge(youtubeStatus).label}</span>
              </div>
            </div>
          </div>
          <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,68,68,0.05)', border: '1px solid rgba(255,68,68,0.15)', marginBottom: 14 }}>
            <p style={{ color: '#fca5a5', fontSize: 12, lineHeight: 1.6 }}>📺 ATHENA does not access your YouTube history without explicit permission. Activity data is never shared externally.</p>
          </div>
          {DEMO_MODE && <p style={{ color: '#64748b', fontSize: 11, marginBottom: 10 }}>⚡ Demo Mode — YouTube requires backend integration to connect.</p>}
          <button onClick={connectYouTube} disabled={connecting.youtube} className="athena-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
            {connecting.youtube ? <LoadingSpinner size={16} /> : '📺 Connect YouTube'}
          </button>
        </div>

        {/* Mood signals */}
        <div className="glass-card" style={{ padding: 22 }}>
          <h2 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Mood Signals</h2>
          <p style={{ color: '#64748b', fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>ATHENA uses your explicit mood check-ins, not app usage, to understand how you're feeling. How are you today?</p>
          {mood === 'not_great' && (
            <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', marginBottom: 12 }}>
              <p style={{ color: '#93c5fd', fontSize: 12 }}>💙 We noticed a change. If you want to talk, ATHENA is here — or reach out to someone you trust.</p>
            </div>
          )}
          {mood === 'help' && (
            <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', marginBottom: 12 }}>
              <p style={{ color: '#fca5a5', fontSize: 12 }}>🆘 You don't have to go through this alone. Consider reaching out to a trusted person or emergency services if needed.</p>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {MOOD_OPTIONS.map((m) => (
              <button key={m.value} onClick={() => setMood(m.value)} style={{ padding: '12px', borderRadius: 10, cursor: 'pointer', textAlign: 'center', background: mood === m.value ? 'rgba(220,38,38,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${mood === m.value ? 'rgba(220,38,38,0.35)' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.2s' }}>
                <span style={{ fontSize: 22, display: 'block', marginBottom: 4 }}>{m.icon}</span>
                <span style={{ color: mood === m.value ? '#f1f5f9' : '#94a3b8', fontSize: 12 }}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lifestyle preferences */}
        <div className="glass-card" style={{ padding: 22 }}>
          <h2 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Lifestyle Preferences</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Favorite Music Genre', value: 'Not set', icon: '🎵' },
              { label: 'Preferred Activities', value: 'Not set', icon: '⚽' },
              { label: 'Relaxation Style', value: 'Not set', icon: '🧘' },
              { label: 'Weekend Preference', value: 'Not set', icon: '🏠' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>{item.icon} {item.label}</span>
                <span style={{ color: '#475569', fontSize: 13 }}>{item.value}</span>
              </div>
            ))}
          </div>
          <p style={{ color: '#475569', fontSize: 11, marginTop: 12 }}>Complete your profile in Settings to fill in preferences.</p>
        </div>
      </div>
    </div>
  );
}
