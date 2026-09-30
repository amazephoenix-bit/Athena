import { useState } from 'react';
import { useOnboarding } from '../contexts/OnboardingContext';
import { PawPrint, Plus, X, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const ANIMALS = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Hamster', 'Turtle', 'Other'];

export default function PetsPage() {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [pet, setPet] = useState(() => {
    const p = user?.petData;
    return p || null;
  });
  const [form, setForm] = useState({
    name: '', animal: '', breed: '', age: '', food: '',
    feedingSchedule: [], feedingQuantity: '', medication: '', vetInfo: '', careRequirements: '',
  });
  const [editing, setEditing] = useState(!pet);
  const [timeInput, setTimeInput] = useState('');

  const setField = (f, v) => setForm((p) => ({ ...p, [f]: v }));
  const addTime = (t) => { if (t && !form.feedingSchedule.includes(t)) { setField('feedingSchedule', [...form.feedingSchedule, t]); setTimeInput(''); } };
  const removeTime = (t) => setField('feedingSchedule', form.feedingSchedule.filter((x) => x !== t));

  const handleSave = () => {
    if (!form.name) { addToast({ title: 'Missing pet name', type: 'warning' }); return; }
    setPet(form);
    setEditing(false);
    addToast({ title: `${form.name} saved! 🐾`, message: 'ATHENA will help you remember feeding times.', type: 'success' });
  };

  return (
    <div className="page-enter">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PawPrint size={22} color="#dc2626" />
          </div>
          <div>
            <h1 style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 800 }}>Pet Care</h1>
            <p style={{ color: '#64748b', fontSize: 13 }}>Feeding schedules, vet info, and care reminders</p>
          </div>
        </div>
        {pet && !editing && (
          <button onClick={() => { setForm(pet); setEditing(true); }} className="athena-btn-secondary">Edit Pet Info</button>
        )}
      </div>

      {!pet && !editing && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <span style={{ fontSize: 64, display: 'block', marginBottom: 20 }}>🐾</span>
          <h2 style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: 8 }}>No pet added yet</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Let ATHENA help you care for your furry friend!</p>
          <button onClick={() => setEditing(true)} className="athena-btn-primary"><Plus size={15} /> Add Pet</button>
        </div>
      )}

      {/* Pet profile display */}
      {pet && !editing && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {/* Main info */}
          <div className="glass-card" style={{ padding: 24, gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(220,38,38,0.2), rgba(220,38,38,0.05))', border: '2px solid rgba(220,38,38,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                {pet.animal === 'Dog' ? '🐕' : pet.animal === 'Cat' ? '🐈' : pet.animal === 'Bird' ? '🐦' : pet.animal === 'Fish' ? '🐠' : '🐾'}
              </div>
              <div>
                <h2 style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 800 }}>{pet.name}</h2>
                <p style={{ color: '#dc2626', fontWeight: 600 }}>{pet.breed || pet.animal} · {pet.age ? `${pet.age} years old` : 'Age unknown'}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
              {[
                ['Food', pet.food || '—'],
                ['Quantity per meal', pet.feedingQuantity || '—'],
                ['Medication', pet.medication || 'None'],
                ['Vet', pet.vetInfo || '—'],
              ].map(([label, val]) => (
                <div key={label} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ color: '#64748b', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</p>
                  <p style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 500 }}>{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Feeding schedule */}
          <div className="glass-card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Bell size={16} color="#fbbf24" />
              <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700 }}>Feeding Schedule</h3>
            </div>
            {pet.feedingSchedule?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pet.feedingSchedule.map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <span style={{ color: '#fde68a', fontWeight: 600, fontSize: 15 }}>🍽️ {t}</span>
                    <span style={{ color: '#64748b', fontSize: 12 }}>Feeding {i + 1}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#475569', fontSize: 13 }}>No feeding times configured.</p>
            )}
          </div>

          {/* Care requirements */}
          {pet.careRequirements && (
            <div className="glass-card" style={{ padding: 22 }}>
              <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Care Notes</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{pet.careRequirements}</p>
            </div>
          )}
        </div>
      )}

      {/* Edit / Add form */}
      {editing && (
        <div className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 700 }}>{pet ? 'Edit Pet Info' : 'Add Your Pet'}</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label className="athena-label">Pet name *</label><input className="athena-input" placeholder="e.g. Bruno" value={form.name} onChange={(e) => setField('name', e.target.value)} /></div>
            <div><label className="athena-label">Age (years)</label><input type="number" className="athena-input" placeholder="3" value={form.age} onChange={(e) => setField('age', e.target.value)} /></div>
          </div>

          <div>
            <label className="athena-label">Animal type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {ANIMALS.map((a) => (
                <button key={a} onClick={() => setField('animal', a)} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer', background: form.animal === a ? 'rgba(220,38,38,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${form.animal === a ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.08)'}`, color: form.animal === a ? '#dc2626' : '#94a3b8', transition: 'all 0.2s' }}>{a}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label className="athena-label">Breed</label><input className="athena-input" placeholder="e.g. Labrador" value={form.breed} onChange={(e) => setField('breed', e.target.value)} /></div>
            <div><label className="athena-label">Food</label><input className="athena-input" placeholder="e.g. Royal Canin" value={form.food} onChange={(e) => setField('food', e.target.value)} /></div>
          </div>

          <div>
            <label className="athena-label">Feeding schedule</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {form.feedingSchedule.map((t) => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 100, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#fde68a', fontSize: 12 }}>
                  {t} <button onClick={() => removeTime(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fde68a', padding: 0, display: 'flex' }}><X size={10} /></button>
                </span>
              ))}
            </div>
            <input type="time" className="athena-input" value={timeInput} onChange={(e) => setTimeInput(e.target.value)} onBlur={() => addTime(timeInput)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label className="athena-label">Feeding quantity</label><input className="athena-input" placeholder="e.g. 1 cup" value={form.feedingQuantity} onChange={(e) => setField('feedingQuantity', e.target.value)} /></div>
            <div><label className="athena-label">Medication</label><input className="athena-input" placeholder="Optional" value={form.medication} onChange={(e) => setField('medication', e.target.value)} /></div>
          </div>

          <div><label className="athena-label">Vet info</label><input className="athena-input" placeholder="e.g. Dr. Sharma — City Vet" value={form.vetInfo} onChange={(e) => setField('vetInfo', e.target.value)} /></div>
          <div><label className="athena-label">Care notes</label><textarea className="athena-input" placeholder="Any special care requirements..." value={form.careRequirements} onChange={(e) => setField('careRequirements', e.target.value)} rows={3} style={{ resize: 'vertical' }} /></div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            {pet && <button onClick={() => setEditing(false)} className="athena-btn-secondary">Cancel</button>}
            <button onClick={handleSave} className="athena-btn-primary">Save Pet Info 🐾</button>
          </div>
        </div>
      )}
    </div>
  );
}
