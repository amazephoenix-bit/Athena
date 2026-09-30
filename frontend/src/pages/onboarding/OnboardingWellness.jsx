import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { Heart, ChevronLeft, ChevronRight, Plus, X, Info } from 'lucide-react';

const SLEEP_QUALITY = ['Excellent', 'Good', 'Fair', 'Poor'];
const WORKOUT_TYPES = ['Gym', 'Running', 'Yoga', 'Swimming', 'Cycling', 'Home workout', 'Sports', 'Other'];
const WORKOUT_GOALS = ['Lose weight', 'Build muscle', 'Improve endurance', 'Stay healthy', 'Other'];
const PERIOD_SYMPTOMS = ['Cramps', 'Headache', 'Fatigue', 'Mood changes', 'Bloating', 'Back pain', 'Other'];

function InfoNote({ children }) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '10px 14px', borderRadius: 8, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', marginTop: 8 }}>
      <Info size={14} color="#60a5fa" style={{ flexShrink: 0, marginTop: 1 }} />
      <p style={{ color: '#93c5fd', fontSize: 12, lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}

export default function OnboardingWellness() {
  const { data, updateData } = useOnboarding();
  const navigate = useNavigate();
  const [medicineForm, setMedicineForm] = useState({ name: '', dosage: '', frequency: '', time: '', notes: '' });

  const bmi = data.height && data.weight
    ? (data.weight / ((data.height / 100) ** 2)).toFixed(1)
    : null;
  const bmiCategory = bmi
    ? bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese'
    : null;
  const bmiColor = bmi
    ? bmi < 18.5 ? '#60a5fa' : bmi < 25 ? '#4ade80' : bmi < 30 ? '#fbbf24' : '#f87171'
    : '#94a3b8';

  const addMedicine = () => {
    if (medicineForm.name) {
      updateData({ medicines: [...(data.medicines || []), { ...medicineForm, id: Date.now() }] });
      setMedicineForm({ name: '', dosage: '', frequency: '', time: '', notes: '' });
    }
  };

  const removeMedicine = (id) => updateData({ medicines: (data.medicines || []).filter((m) => m.id !== id) });

  const toggleSymptom = (s) => {
    const symptoms = (data.periodData.symptoms || []).includes(s)
      ? (data.periodData.symptoms || []).filter((x) => x !== s)
      : [...(data.periodData.symptoms || []), s];
    updateData({ periodData: { ...data.periodData, symptoms } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={20} color="#dc2626" />
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800 }}>Health & Wellness</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: 14 }}>ATHENA uses this to personalize reminders and wellness support. It does not diagnose medical conditions.</p>
      </div>

      {/* Health conditions */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🏥 Health Information</h3>
        <InfoNote>ATHENA uses the information you provide to personalize reminders and wellness support. It does not diagnose medical conditions.</InfoNote>

        <div style={{ marginTop: 16 }}>
          <label className="athena-label">Health conditions you'd like ATHENA to know about</label>
          <textarea className="athena-input" placeholder="e.g. Asthma, Diabetes (optional)" value={data.healthConditions} onChange={(e) => updateData({ healthConditions: e.target.value })} rows={2} style={{ resize: 'vertical' }} />
        </div>
        <div style={{ marginTop: 12 }}>
          <label className="athena-label">Allergies</label>
          <input className="athena-input" placeholder="e.g. Peanuts, Penicillin (optional)" value={data.allergies} onChange={(e) => updateData({ allergies: e.target.value })} />
        </div>
      </div>

      {/* Medicines */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>💊 Medicines & Reminders</h3>
        {(data.medicines || []).length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {data.medicines.map((m) => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <p style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 600 }}>{m.name}</p>
                  <p style={{ color: '#94a3b8', fontSize: 12 }}>{[m.dosage, m.frequency, m.time].filter(Boolean).join(' · ')}</p>
                </div>
                <button onClick={() => removeMedicine(m.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}><X size={15} /></button>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[['name', 'Medicine name *'], ['dosage', 'Dosage'], ['frequency', 'Frequency'], ['time', 'Time']].map(([field, placeholder]) => (
            <input key={field} className="athena-input" placeholder={placeholder} value={medicineForm[field]} onChange={(e) => setMedicineForm((p) => ({ ...p, [field]: e.target.value }))} />
          ))}
        </div>
        <input className="athena-input" placeholder="Notes (optional)" value={medicineForm.notes} onChange={(e) => setMedicineForm((p) => ({ ...p, notes: e.target.value }))} style={{ marginTop: 10 }} />
        <button onClick={addMedicine} className="athena-btn-secondary" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}>
          <Plus size={14} /> Add Medicine
        </button>
      </div>

      {/* BMI */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>⚖️ BMI Calculator</h3>
        <InfoNote>BMI is a general screening metric, not a medical diagnosis. Always consult a healthcare professional for medical advice.</InfoNote>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
          <div>
            <label className="athena-label">Height (cm)</label>
            <input type="number" className="athena-input" placeholder="175" value={data.height} onChange={(e) => updateData({ height: e.target.value })} />
          </div>
          <div>
            <label className="athena-label">Weight (kg)</label>
            <input type="number" className="athena-input" placeholder="70" value={data.weight} onChange={(e) => updateData({ weight: e.target.value })} />
          </div>
        </div>
        {bmi && (
          <div style={{ display: 'flex', gap: 16, marginTop: 14, padding: '14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ textAlign: 'center', flex: 1 }}><p style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>HEIGHT</p><p style={{ color: '#f1f5f9', fontWeight: 700 }}>{data.height} cm</p></div>
            <div style={{ textAlign: 'center', flex: 1 }}><p style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>WEIGHT</p><p style={{ color: '#f1f5f9', fontWeight: 700 }}>{data.weight} kg</p></div>
            <div style={{ textAlign: 'center', flex: 1 }}><p style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>BMI</p><p style={{ color: bmiColor, fontWeight: 800, fontSize: 18 }}>{bmi}</p><p style={{ color: bmiColor, fontSize: 11 }}>{bmiCategory}</p></div>
          </div>
        )}
      </div>

      {/* Workout */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🏋️ Workout</h3>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          {[true, false].map((v) => (
            <button key={String(v)} onClick={() => updateData({ doesWorkout: v })} style={{
              flex: 1, padding: '10px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: data.doesWorkout === v ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${data.doesWorkout === v ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: data.doesWorkout === v ? '#dc2626' : '#94a3b8', transition: 'all 0.2s',
            }}>
              {v ? 'Yes, I workout' : 'No, I don\'t'}
            </button>
          ))}
        </div>
        {data.doesWorkout && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label className="athena-label">Workout type</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {WORKOUT_TYPES.map((t) => (
                  <button key={t} onClick={() => updateData({ workoutType: t })} style={{
                    padding: '6px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer',
                    background: data.workoutType === t ? 'rgba(220,38,38,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${data.workoutType === t ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: data.workoutType === t ? '#dc2626' : '#94a3b8', transition: 'all 0.2s',
                  }}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div><label className="athena-label">Days per week</label><input type="number" className="athena-input" placeholder="4" min={1} max={7} value={data.workoutDaysPerWeek} onChange={(e) => updateData({ workoutDaysPerWeek: e.target.value })} /></div>
              <div><label className="athena-label">Preferred time</label><input type="time" className="athena-input" value={data.workoutPreferredTime} onChange={(e) => updateData({ workoutPreferredTime: e.target.value })} /></div>
            </div>
            <div>
              <label className="athena-label">Workout goal</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {WORKOUT_GOALS.map((g) => (
                  <button key={g} onClick={() => updateData({ workoutGoal: g })} style={{
                    padding: '6px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer',
                    background: data.workoutGoal === g ? 'rgba(220,38,38,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${data.workoutGoal === g ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: data.workoutGoal === g ? '#dc2626' : '#94a3b8', transition: 'all 0.2s',
                  }}>{g}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sleep */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>😴 Sleep</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div><label className="athena-label">Typical bedtime</label><input type="time" className="athena-input" value={data.bedtime} onChange={(e) => updateData({ bedtime: e.target.value })} /></div>
          <div><label className="athena-label">Typical wake-up time</label><input type="time" className="athena-input" value={data.wakeTime} onChange={(e) => updateData({ wakeTime: e.target.value })} /></div>
        </div>
        <div>
          <label className="athena-label">Sleep quality</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {SLEEP_QUALITY.map((q) => (
              <button key={q} onClick={() => updateData({ sleepQuality: q })} style={{
                flex: 1, padding: '8px 6px', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontWeight: 500,
                background: data.sleepQuality === q ? 'rgba(220,38,38,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${data.sleepQuality === q ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: data.sleepQuality === q ? '#dc2626' : '#94a3b8', transition: 'all 0.2s',
              }}>{q}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Period tracking — optional */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700 }}>🌸 Period Tracking <span style={{ color: '#475569', fontSize: 12, fontWeight: 400 }}>(Optional)</span></h3>
          <button onClick={() => updateData({ periodTrackingEnabled: !data.periodTrackingEnabled })} style={{
            padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            background: data.periodTrackingEnabled ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${data.periodTrackingEnabled ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.1)'}`,
            color: data.periodTrackingEnabled ? '#dc2626' : '#64748b', transition: 'all 0.2s',
          }}>
            {data.periodTrackingEnabled ? 'Enabled' : 'Enable'}
          </button>
        </div>

        {data.periodTrackingEnabled && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <InfoNote>Your next period is an estimate based on the information you provide. This is not a medical prediction.</InfoNote>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div><label className="athena-label">Last period date</label><input type="date" className="athena-input" value={data.periodData.lastPeriodDate} onChange={(e) => updateData({ periodData: { ...data.periodData, lastPeriodDate: e.target.value } })} /></div>
              <div><label className="athena-label">Avg. cycle length (days)</label><input type="number" className="athena-input" placeholder="28" value={data.periodData.averageCycleLength} onChange={(e) => updateData({ periodData: { ...data.periodData, averageCycleLength: e.target.value } })} /></div>
              <div><label className="athena-label">Period duration (days)</label><input type="number" className="athena-input" placeholder="5" value={data.periodData.averagePeriodDuration} onChange={(e) => updateData({ periodData: { ...data.periodData, averagePeriodDuration: e.target.value } })} /></div>
            </div>
            <div>
              <label className="athena-label">Common symptoms (optional)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {PERIOD_SYMPTOMS.map((s) => {
                  const sel = (data.periodData.symptoms || []).includes(s);
                  return (
                    <button key={s} onClick={() => toggleSymptom(s)} style={{
                      padding: '5px 12px', borderRadius: 100, fontSize: 12, cursor: 'pointer',
                      background: sel ? 'rgba(236,72,153,0.12)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${sel ? 'rgba(236,72,153,0.3)' : 'rgba(255,255,255,0.08)'}`,
                      color: sel ? '#f9a8d4' : '#64748b', transition: 'all 0.2s',
                    }}>{s}</button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <button onClick={() => navigate('/onboarding/lifestyle')} className="athena-btn-secondary"><ChevronLeft size={16} /> Back</button>
        <button onClick={() => navigate('/onboarding/productivity')} className="athena-btn-primary">Continue <ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
