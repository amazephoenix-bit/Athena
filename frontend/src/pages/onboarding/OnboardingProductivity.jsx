import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { CheckSquare, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

const PRIORITIES = ['low', 'medium', 'high'];
const CATEGORIES = ['Academic', 'Work', 'Personal', 'Fitness', 'Health', 'Other'];

export default function OnboardingProductivity() {
  const { data, updateData } = useOnboarding();
  const navigate = useNavigate();
  const [taskForm, setTaskForm] = useState({ title: '', deadline: '', priority: 'medium', category: 'Academic', estimatedDuration: '' });
  const [goalInput, setGoalInput] = useState('');

  const addTask = () => {
    if (taskForm.title) {
      updateData({ tasks: [...(data.tasks || []), { ...taskForm, id: Date.now(), status: 'todo' }] });
      setTaskForm({ title: '', deadline: '', priority: 'medium', category: 'Academic', estimatedDuration: '' });
    }
  };

  const removeTask = (id) => updateData({ tasks: (data.tasks || []).filter((t) => t.id !== id) });

  const addGoal = () => {
    if (goalInput.trim()) {
      updateData({ dailyGoals: [...(data.dailyGoals || []), { text: goalInput.trim(), id: Date.now() }] });
      setGoalInput('');
    }
  };

  const removeGoal = (id) => updateData({ dailyGoals: (data.dailyGoals || []).filter((g) => g.id !== id) });

  const priorityColor = { low: '#4ade80', medium: '#fbbf24', high: '#f87171' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckSquare size={20} color="#dc2626" />
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800 }}>Productivity Setup</h1>
        </div>
        <p style={{ color: '#64748b', fontSize: 14 }}>Add your initial tasks, assignments, and daily goals. You can always add more later.</p>
      </div>

      {/* Tasks */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📋 Initial Tasks & Assignments</h3>

        {(data.tasks || []).length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {data.tasks.map((t) => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 600 }}>{t.title}</p>
                  <p style={{ color: '#64748b', fontSize: 11 }}>
                    {t.category} · <span style={{ color: priorityColor[t.priority] }}>{t.priority}</span>
                    {t.deadline && ` · Due ${new Date(t.deadline).toLocaleDateString()}`}
                  </p>
                </div>
                <button onClick={() => removeTask(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}><X size={14} /></button>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input className="athena-input" placeholder="Task title *" value={taskForm.title} onChange={(e) => setTaskForm((p) => ({ ...p, title: e.target.value }))} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label className="athena-label">Deadline</label>
              <input type="date" className="athena-input" value={taskForm.deadline} onChange={(e) => setTaskForm((p) => ({ ...p, deadline: e.target.value }))} />
            </div>
            <div>
              <label className="athena-label">Est. duration (min)</label>
              <input type="number" className="athena-input" placeholder="60" value={taskForm.estimatedDuration} onChange={(e) => setTaskForm((p) => ({ ...p, estimatedDuration: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label className="athena-label">Priority</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {PRIORITIES.map((p) => (
                  <button key={p} onClick={() => setTaskForm((prev) => ({ ...prev, priority: p }))} style={{
                    flex: 1, padding: '8px 6px', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontWeight: 600, textTransform: 'capitalize',
                    background: taskForm.priority === p ? `rgba(${p === 'high' ? '248,113,113' : p === 'medium' ? '251,191,36' : '74,222,128'},0.12)` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${taskForm.priority === p ? priorityColor[p] + '66' : 'rgba(255,255,255,0.08)'}`,
                    color: taskForm.priority === p ? priorityColor[p] : '#64748b', transition: 'all 0.2s',
                  }}>{p}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="athena-label">Category</label>
              <select className="athena-select" value={taskForm.category} onChange={(e) => setTaskForm((p) => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={addTask} className="athena-btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
            <Plus size={14} /> Add Task
          </button>
        </div>
      </div>

      {/* Daily Goals */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🎯 Daily Goals</h3>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 14 }}>What do you want to accomplish each day?</p>
        {(data.dailyGoals || []).length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            {data.dailyGoals.map((g) => (
              <div key={g.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p style={{ color: '#f1f5f9', fontSize: 13 }}>{g.text}</p>
                <button onClick={() => removeGoal(g.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}><X size={13} /></button>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="athena-input" placeholder="e.g. Study 2 hours, Read 30 minutes..." value={goalInput} onChange={(e) => setGoalInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addGoal()} style={{ flex: 1 }} />
          <button onClick={addGoal} className="athena-btn-secondary" style={{ padding: '10px 14px', flexShrink: 0 }}><Plus size={14} /></button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <button onClick={() => navigate('/onboarding/wellness')} className="athena-btn-secondary"><ChevronLeft size={16} /> Back</button>
        <button onClick={() => navigate('/onboarding/pets')} className="athena-btn-primary">Continue <ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
