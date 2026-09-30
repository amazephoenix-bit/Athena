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
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--athena-bg)]">
      <DemoBanner />
      <ToastContainer />
      <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.07),transparent_70%)]" />

      <div className="relative flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-[420px]">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-rose-800">
              <Zap size={22} color="white" />
            </div>
            <h1 className="text-gradient text-3xl font-bold tracking-tight">ATHENA</h1>
            <p className="mt-1 text-sm text-slate-500">Start your digital twin journey</p>
          </div>

          <div className="glass-card p-8">
            <h2 className="mb-6 text-center text-lg font-semibold text-slate-50">Create your account</h2>
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              {[
                { id: 'name', label: 'Full name', type: 'text', field: 'name', icon: User, placeholder: 'Your name', auto: 'name' },
                { id: 'email', label: 'Email', type: 'email', field: 'email', icon: Mail, placeholder: 'you@example.com', auto: 'email' },
                { id: 'password', label: 'Password', type: showPass ? 'text' : 'password', field: 'password', icon: Lock, placeholder: 'Min. 6 characters', auto: 'new-password' },
                { id: 'confirm', label: 'Confirm password', type: showPass ? 'text' : 'password', field: 'confirmPassword', icon: Lock, placeholder: 'Repeat password', auto: 'new-password' },
              ].map(({ id, label, type, field, icon: Icon, placeholder, auto }) => (
                <div key={id}>
                  <label className="athena-label" htmlFor={id}>{label}</label>
                  <div className="relative">
                    <Icon size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500" />
                    <input
                      id={id} type={type} value={form[field]} onChange={set(field)}
                      placeholder={placeholder} className="athena-input pl-10" autoComplete={auto}
                    />
                    {field === 'confirmPassword' && (
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute top-1/2 right-3 -translate-y-1/2 border-0 bg-transparent text-slate-500">
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button type="submit" disabled={loading} className="athena-btn-primary mt-2 w-full justify-center py-3 text-[15px]">
                {loading ? <LoadingSpinner size={18} /> : <><span>Create Account</span><ArrowRight size={16} /></>}
              </button>
            </form>
            <p className="mt-5 text-center text-[13px] text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-rose-400 no-underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
