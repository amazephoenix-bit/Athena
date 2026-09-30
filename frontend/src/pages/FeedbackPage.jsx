import { useState } from 'react';
import { feedbackApi } from '../api/feedbackApi';
import { useNotification } from '../contexts/NotificationContext';
import { MessageSquare, Send, Star, CheckCircle } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const CATEGORIES = ['General Feedback', 'Bug Report', 'Feature Request', 'Agent Performance', 'UI/UX', 'Other'];

export default function FeedbackPage() {
  const { addToast } = useNotification();
  const [form, setForm] = useState({ category: 'General Feedback', rating: 0, message: '', agentName: '' });
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) { addToast({ title: 'Please write a message', type: 'warning' }); return; }
    setSubmitting(true);
    try {
      await feedbackApi.submitFeedback(form);
      setSubmitted(true);
      addToast({ title: 'Thank you! 🙌', message: 'Your feedback helps improve ATHENA.', type: 'success' });
    } catch { addToast({ title: 'Error', message: 'Could not submit feedback. Please try again.', type: 'error' }); }
    finally { setSubmitting(false); }
  };

  if (submitted) {
    return (
      <div className="page-enter" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle size={40} color="#4ade80" />
        </div>
        <h1 style={{ color: '#f1f5f9', fontSize: 28, fontWeight: 800, marginBottom: 10 }}>Feedback submitted!</h1>
        <p style={{ color: '#64748b', fontSize: 15, marginBottom: 28 }}>Thank you for helping us improve ATHENA. Your input matters.</p>
        <button onClick={() => { setSubmitted(false); setForm({ category: 'General Feedback', rating: 0, message: '', agentName: '' }); }} className="athena-btn-secondary">
          Submit More Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={22} color="#dc2626" />
          </div>
          <div>
            <h1 style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 800 }}>Feedback</h1>
            <p style={{ color: '#64748b', fontSize: 13 }}>Help us improve ATHENA · GATEWAYS 2026</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 600 }}>
        <div className="glass-card" style={{ padding: 28 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Category */}
            <div>
              <label className="athena-label">Category</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {CATEGORIES.map((c) => (
                  <button key={c} type="button" onClick={() => set('category', c)} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer', background: form.category === c ? 'rgba(220,38,38,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${form.category === c ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.08)'}`, color: form.category === c ? '#dc2626' : '#94a3b8', transition: 'all 0.2s' }}>{c}</button>
                ))}
              </div>
            </div>

            {/* Agent name (optional, show for performance feedback) */}
            {form.category === 'Agent Performance' && (
              <div>
                <label className="athena-label">Which agent?</label>
                <select className="athena-select" value={form.agentName} onChange={(e) => set('agentName', e.target.value)}>
                  <option value="">All agents / not sure</option>
                  {['Orchestrator', 'Productivity Agent', 'Reminder Agent', 'Memory Agent', 'Behavior Agent', 'Wellness Agent', 'Safety Agent', 'Lifestyle Agent'].map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Star rating */}
            <div>
              <label className="athena-label">Overall Rating</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => set('rating', star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
                  >
                    <Star size={28} fill={(hover || form.rating) >= star ? '#fbbf24' : 'transparent'} color={(hover || form.rating) >= star ? '#fbbf24' : '#334155'} style={{ transition: 'all 0.15s' }} />
                  </button>
                ))}
                {form.rating > 0 && <span style={{ color: '#fbbf24', fontSize: 13, alignSelf: 'center', marginLeft: 8, fontWeight: 600 }}>{['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][form.rating]}</span>}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="athena-label">Your feedback *</label>
              <textarea
                className="athena-input"
                placeholder="Share your experience, suggestions, or report a bug..."
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                rows={5}
                style={{ resize: 'vertical' }}
              />
              <p style={{ color: '#334155', fontSize: 11, marginTop: 4 }}>{form.message.length} characters</p>
            </div>

            <button type="submit" disabled={submitting} className="athena-btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px 24px' }}>
              {submitting ? <LoadingSpinner size={18} /> : <><Send size={15} /> Submit Feedback</>}
            </button>
          </form>
        </div>

        {/* Team info */}
        <div style={{ marginTop: 16, padding: '16px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.7 }}>
            ATHENA — HumanTwin AI · GATEWAYS 2026 Hackathon<br />
            <span style={{ color: '#475569', fontSize: 12 }}>Team: Backend/FastAPI · Frontend React · Memory/MongoDB · Agents + LLM</span>
          </p>
        </div>
      </div>
    </div>
  );
}
