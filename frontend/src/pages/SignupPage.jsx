import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { Eye, EyeOff, Zap, Mail, Lock, User, ArrowRight } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import DemoBanner from '../components/ui/DemoBanner';
import ToastContainer from '../components/notifications/ToastContainer';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      addToast({ title: 'Missing fields', message: 'Please fill in all fields.', type: 'warning' }); return;
    }
    if (form.password !== form.confirmPassword) {
      addToast({ title: 'Password mismatch', message: 'Passwords do not match.', type: 'error' }); return;
    }
    if (form.password.length < 6) {
      addToast({ title: 'Weak password', message: 'Password must be at least 6 characters.', type: 'warning' }); return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      addToast({ title: 'Welcome to ATHENA!', message: "Let's set up your digital twin.", type: 'success' });
      navigate('/onboarding/personal');
    } catch (err) {
      addToast({ title: 'Registration failed', message: err?.response?.data?.detail || 'Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <DemoBanner />
      <ToastContainer />
      <div style={{ position: 'absolute', top: -150, right: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'inline-flex', marginBottom: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 15, background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(220,38,38,0.35)' }}>
                <Zap size={24} color="white" />
              </div>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #f1f5f9, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ATHENA</h1>
            <p style={{ color: '#64748b', fontSize: 14 }}>Start your digital twin journey</p>
          </div>

          <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Create your account</h2>

            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { id: 'name', label: 'Full name', type: 'text', field: 'name', icon: User, placeholder: 'Your name', auto: 'name' },
                { id: 'email', label: 'Email', type: 'email', field: 'email', icon: Mail, placeholder: 'you@example.com', auto: 'email' },
                { id: 'password', label: 'Password', type: showPass ? 'text' : 'password', field: 'password', icon: Lock, placeholder: 'Min. 6 characters', auto: 'new-password' },
                { id: 'confirm', label: 'Confirm password', type: showPass ? 'text' : 'password', field: 'confirmPassword', icon: Lock, placeholder: 'Repeat password', auto: 'new-password' },
              ].map(({ id, label, type, field, icon: Icon, placeholder, auto }) => (
                <div key={id}>
                  <label className="athena-label" htmlFor={id}>{label}</label>
                  <div style={{ position: 'relative' }}>
                    <Icon size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                    <input
                      id={id} type={type} value={form[field]} onChange={set(field)}
                      placeholder={placeholder} className="athena-input"
                      style={{ paddingLeft: 40 }} autoComplete={auto}
                    />
                    {field === 'confirmPassword' && (
                      <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#475569', display: 'flex' }}>
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button type="submit" disabled={loading} className="athena-btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px 24px', fontSize: 15, marginTop: 8 }}>
                {loading ? <LoadingSpinner size={18} /> : <><span>Create Account</span><ArrowRight size={16} /></>}
              </button>
            </form>

            <p style={{ textAlign: 'center', color: '#64748b', fontSize: 13, marginTop: 20 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#dc2626', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
