import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { PawPrint, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

const ANIMALS = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Hamster', 'Turtle', 'Other'];

export default function OnboardingPets() {
  const { data, updateData } = useOnboarding();
  const navigate = useNavigate();

  const setPet = (field, value) => updateData({ petData: { ...data.petData, [field]: value } });

  const addFeedingTime = (time) => {
    if (time && !(data.petData.feedingSchedule || []).includes(time)) {
      setPet('feedingSchedule', [...(data.petData.feedingSchedule || []), time]);
    }
  };

  const removeFeedingTime = (t) => setPet('feedingSchedule', (data.petData.feedingSchedule || []).filter((x) => x !== t));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PawPrint size={20} color="#dc2626" />
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800 }}>Pet Information</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: 14 }}>ATHENA can help you track your pet's feeding schedule, health, and care.</p>
      </div>

      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Do you have a pet?</h3>
        <div style={{ display: 'flex', gap: 10, marginBottom: data.hasPet ? 24 : 0 }}>
          {[true, false].map((v) => (
            <button key={String(v)} onClick={() => updateData({ hasPet: v })} style={{
              flex: 1, padding: '12px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: data.hasPet === v ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${data.hasPet === v ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: data.hasPet === v ? '#dc2626' : '#94a3b8', transition: 'all 0.2s',
            }}>
              {v ? '🐾 Yes, I have a pet' : '❌ No'}
            </button>
          ))}
        </div>

        {data.hasPet && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label className="athena-label">Pet name *</label><input className="athena-input" placeholder="e.g. Bruno" value={data.petData.name} onChange={(e) => setPet('name', e.target.value)} /></div>
              <div><label className="athena-label">Age (years)</label><input type="number" className="athena-input" placeholder="3" value={data.petData.age} onChange={(e) => setPet('age', e.target.value)} min={0} /></div>
            </div>

            <div>
              <label className="athena-label">Animal type</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {ANIMALS.map((a) => (
                  <button key={a} onClick={() => setPet('animal', a)} style={{
                    padding: '6px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer',
                    background: data.petData.animal === a ? 'rgba(220,38,38,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${data.petData.animal === a ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: data.petData.animal === a ? '#dc2626' : '#94a3b8', transition: 'all 0.2s',
                  }}>{a}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label className="athena-label">Breed</label><input className="athena-input" placeholder="e.g. Labrador" value={data.petData.breed} onChange={(e) => setPet('breed', e.target.value)} /></div>
              <div><label className="athena-label">Food</label><input className="athena-input" placeholder="e.g. Royal Canin" value={data.petData.food} onChange={(e) => setPet('food', e.target.value)} /></div>
            </div>

            <div>
              <label className="athena-label">Feeding schedule</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                {(data.petData.feedingSchedule || []).map((t) => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 100, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.25)', color: '#f87171', fontSize: 12 }}>
                    {t}
                    <button onClick={() => removeFeedingTime(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', padding: 0, display: 'flex' }}><X size={10} /></button>
                  </span>
                ))}
              </div>
              <input type="time" className="athena-input" onChange={(e) => { addFeedingTime(e.target.value); e.target.value = ''; }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label className="athena-label">Feeding quantity</label><input className="athena-input" placeholder="e.g. 1 cup" value={data.petData.feedingQuantity} onChange={(e) => setPet('feedingQuantity', e.target.value)} /></div>
              <div><label className="athena-label">Medication (if any)</label><input className="athena-input" placeholder="Optional" value={data.petData.medication} onChange={(e) => setPet('medication', e.target.value)} /></div>
            </div>

            <div><label className="athena-label">Vet information</label><input className="athena-input" placeholder="e.g. Dr. Sharma — City Vet" value={data.petData.vetInfo} onChange={(e) => setPet('vetInfo', e.target.value)} /></div>
            <div><label className="athena-label">Care requirements / notes</label><textarea className="athena-input" placeholder="Any special care notes..." value={data.petData.careRequirements} onChange={(e) => setPet('careRequirements', e.target.value)} rows={2} style={{ resize: 'vertical' }} /></div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <button onClick={() => navigate('/onboarding/productivity')} className="athena-btn-secondary"><ChevronLeft size={16} /> Back</button>
        <button onClick={() => navigate('/onboarding/integrations')} className="athena-btn-primary">Continue <ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
