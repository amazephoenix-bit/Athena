import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { Shield, ChevronLeft, ChevronRight, Plus, X, Info } from 'lucide-react';

const RELATIONSHIPS = ['Mother', 'Father', 'Sibling', 'Spouse', 'Friend', 'Colleague', 'Other'];

function InfoNote({ children }) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '10px 14px', borderRadius: 8, background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', marginBottom: 14 }}>
      <Info size={14} color="#dc2626" style={{ flexShrink: 0, marginTop: 1 }} />
      <p style={{ color: '#fca5a5', fontSize: 12, lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}

export default function OnboardingSafety() {
  const { data, updateData } = useOnboarding();
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({ name: '', phone: '', relationship: 'Friend' });

  const addContact = () => {
    if (data.emergencyContacts.length >= 3) return;
    if (contactForm.name && contactForm.phone) {
      updateData({ emergencyContacts: [...data.emergencyContacts, { ...contactForm, id: Date.now() }] });
      setContactForm({ name: '', phone: '', relationship: 'Friend' });
    }
  };

  const removeContact = (id) => updateData({ emergencyContacts: data.emergencyContacts.filter((c) => c.id !== id) });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={20} color="#dc2626" />
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800 }}>Safety & Emergency</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: 14 }}>Add up to 3 emergency contacts. ATHENA will never contact them without your explicit permission.</p>
      </div>

      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>🚨 Emergency Contacts <span style={{ color: '#475569', fontSize: 13, fontWeight: 400 }}>({data.emergencyContacts.length}/3)</span></h3>
        <InfoNote>ATHENA will only contact your emergency contacts if you explicitly enable automatic safety escalation in Settings. Mood changes alone will never trigger SOS automatically.</InfoNote>

        {data.emergencyContacts.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {data.emergencyContacts.map((c) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 12, background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(220,38,38,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                  {c.name[0].toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 14 }}>{c.name}</p>
                  <p style={{ color: '#94a3b8', fontSize: 12 }}>{c.phone} · {c.relationship}</p>
                </div>
                <button onClick={() => removeContact(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}><X size={15} /></button>
              </div>
            ))}
          </div>
        )}

        {data.emergencyContacts.length < 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div><label className="athena-label">Name *</label><input className="athena-input" placeholder="Contact name" value={contactForm.name} onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))} /></div>
              <div><label className="athena-label">Phone number *</label><input className="athena-input" placeholder="+91 XXXXX XXXXX" value={contactForm.phone} onChange={(e) => setContactForm((p) => ({ ...p, phone: e.target.value }))} /></div>
            </div>
            <div>
              <label className="athena-label">Relationship</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {RELATIONSHIPS.map((r) => (
                  <button key={r} onClick={() => setContactForm((p) => ({ ...p, relationship: r }))} style={{
                    padding: '5px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer',
                    background: contactForm.relationship === r ? 'rgba(220,38,38,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${contactForm.relationship === r ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: contactForm.relationship === r ? '#dc2626' : '#94a3b8', transition: 'all 0.2s',
                  }}>{r}</button>
                ))}
              </div>
            </div>
            <button onClick={addContact} className="athena-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <Plus size={14} /> Add Contact
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <button onClick={() => navigate('/onboarding/integrations')} className="athena-btn-secondary"><ChevronLeft size={16} /> Back</button>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('/onboarding/permissions')} className="athena-btn-secondary">Skip</button>
          <button onClick={() => navigate('/onboarding/permissions')} className="athena-btn-primary">Continue <ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}
