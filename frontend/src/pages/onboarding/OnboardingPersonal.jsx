import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { User, ChevronRight, Plus, X } from 'lucide-react';

const HOBBIES = ['Music', 'Gaming', 'Sports', 'Reading', 'Coding', 'Art', 'Movies', 'Travel', 'Photography', 'Cooking', 'Fitness', 'Dancing'];
const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
  { value: 'other', label: 'Other' },
];
const STATUS_OPTIONS = [
  { value: 'student', label: '🎓 Student' },
  { value: 'working', label: '💼 Working' },
  { value: 'both', label: '📚 Studying & Working' },
  { value: 'other', label: '✨ Other' },
];

export default function OnboardingPersonal() {
  const { data, updateData } = useOnboarding();
  const navigate = useNavigate();
  const [customHobby, setCustomHobby] = useState('');

  const toggleHobby = (hobby) => {
    const hobbies = data.hobbies.includes(hobby)
      ? data.hobbies.filter((h) => h !== hobby)
      : [...data.hobbies, hobby];
    updateData({ hobbies });
  };

  const addCustomHobby = () => {
    const h = customHobby.trim();
    if (h && !data.hobbies.includes(h)) {
      updateData({ hobbies: [...data.hobbies, h] });
      setCustomHobby('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={20} color="#dc2626" />
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800 }}>Tell us about yourself</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: 14 }}>This helps ATHENA personalize your digital twin experience.</p>
      </div>

      {/* Form */}
      <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Name */}
        <div>
          <label className="athena-label" htmlFor="fullName">Full name</label>
          <input id="fullName" className="athena-input" placeholder="Your full name" value={data.fullName} onChange={(e) => updateData({ fullName: e.target.value })} />
        </div>

        {/* Age */}
        <div>
          <label className="athena-label" htmlFor="age">Age</label>
          <input id="age" type="number" className="athena-input" placeholder="Your age" value={data.age} onChange={(e) => updateData({ age: e.target.value })} min={13} max={120} />
        </div>

        {/* Gender */}
        <div>
          <label className="athena-label">Gender</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {GENDER_OPTIONS.map((g) => (
              <button key={g.value} onClick={() => updateData({ gender: g.value })} style={{
                padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                background: data.gender === g.value ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${data.gender === g.value ? 'rgba(220,38,38,0.5)' : 'rgba(255,255,255,0.1)'}`,
                color: data.gender === g.value ? '#dc2626' : '#94a3b8',
                transition: 'all 0.2s',
              }}>
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="athena-label">What are you currently doing?</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {STATUS_OPTIONS.map((s) => (
              <button key={s.value} onClick={() => updateData({ currentStatus: s.value })} style={{
                padding: '10px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'left',
                background: data.currentStatus === s.value ? 'rgba(220,38,38,0.12)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${data.currentStatus === s.value ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: data.currentStatus === s.value ? '#f1f5f9' : '#94a3b8',
                transition: 'all 0.2s',
              }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div>
          <label className="athena-label">What are your hobbies? <span style={{ color: '#475569' }}>(select all that apply)</span></label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {HOBBIES.map((hobby) => (
              <button key={hobby} onClick={() => toggleHobby(hobby)} style={{
                padding: '7px 14px', borderRadius: 100, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                background: data.hobbies.includes(hobby) ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${data.hobbies.includes(hobby) ? 'rgba(220,38,38,0.5)' : 'rgba(255,255,255,0.1)'}`,
                color: data.hobbies.includes(hobby) ? '#dc2626' : '#94a3b8',
                transition: 'all 0.2s',
              }}>
                {hobby}
              </button>
            ))}
          </div>
          {/* Custom hobby */}
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              className="athena-input"
              placeholder="Add a custom hobby..."
              value={customHobby}
              onChange={(e) => setCustomHobby(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomHobby()}
              style={{ flex: 1 }}
            />
            <button onClick={addCustomHobby} className="athena-btn-secondary" style={{ padding: '10px 14px', flexShrink: 0 }}>
              <Plus size={15} />
            </button>
          </div>
          {/* Custom hobbies */}
          {data.hobbies.filter((h) => !HOBBIES.includes(h)).length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              {data.hobbies.filter((h) => !HOBBIES.includes(h)).map((h) => (
                <span key={h} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 100, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa', fontSize: 12 }}>
                  {h}
                  <button onClick={() => toggleHobby(h)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a78bfa', padding: 0, display: 'flex' }}>
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button onClick={() => navigate('/onboarding/lifestyle')} className="athena-btn-primary">
          Continue <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
