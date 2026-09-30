import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { Music, Tv, ChevronLeft, ChevronRight, Info } from 'lucide-react';

function InfoNote({ children }) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '10px 14px', borderRadius: 8, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
      <Info size={14} color="#60a5fa" style={{ flexShrink: 0, marginTop: 1 }} />
      <p style={{ color: '#93c5fd', fontSize: 12, lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}

export default function OnboardingIntegrations() {
  const { data, updateData } = useOnboarding();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Music size={20} color="#dc2626" />
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800 }}>App Integrations</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: 14 }}>Connect apps to enrich your digital twin. All integrations are optional and permission-controlled.</p>
      </div>

      {/* Spotify */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(30,215,96,0.1)', border: '1px solid rgba(30,215,96,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Music size={20} color="#1ed760" />
          </div>
          <div>
            <h3 style={{ color: '#f1f5f9', fontSize: 15, fontWeight: 700 }}>Spotify</h3>
            <p style={{ color: '#64748b', fontSize: 12 }}>Music patterns as a lifestyle signal</p>
          </div>
          <div style={{
            marginLeft: 'auto', padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 600,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#64748b',
          }}>Not Connected</div>
        </div>
        <InfoNote>Spotify data is used as a contextual lifestyle signal only. ATHENA will never use music preferences to diagnose mental health conditions.</InfoNote>
        <div style={{ marginTop: 14 }}>
          <label className="athena-label">Spotify username (optional)</label>
          <input className="athena-input" placeholder="your_spotify_username" value={data.spotifyUsername} onChange={(e) => updateData({ spotifyUsername: e.target.value })} />
        </div>
        <p style={{ color: '#475569', fontSize: 11, marginTop: 8 }}>Full Spotify connection requires backend API integration. You can configure this later in Settings.</p>
      </div>

      {/* YouTube */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Tv size={20} color="#ff4444" />
          </div>
          <div>
            <h3 style={{ color: '#f1f5f9', fontSize: 15, fontWeight: 700 }}>YouTube</h3>
            <p style={{ color: '#64748b', fontSize: 12 }}>Activity patterns and usage tracking</p>
          </div>
          <div style={{
            marginLeft: 'auto', padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 600,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#64748b',
          }}>Not Connected</div>
        </div>
        <InfoNote>ATHENA will not access your YouTube history without explicit permission. Activity data is never shared externally.</InfoNote>
        <p style={{ color: '#475569', fontSize: 11, marginTop: 8 }}>YouTube connection requires backend API integration. Configure in Settings after onboarding.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <button onClick={() => navigate('/onboarding/pets')} className="athena-btn-secondary"><ChevronLeft size={16} /> Back</button>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('/onboarding/safety')} className="athena-btn-secondary">Skip</button>
          <button onClick={() => navigate('/onboarding/safety')} className="athena-btn-primary">Continue <ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}
