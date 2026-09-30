import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { Eye, EyeOff, Zap, Mail, Lock, ArrowRight } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import DemoBanner from '../components/ui/DemoBanner';
import ToastContainer from '../components/notifications/ToastContainer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast({ title: 'Missing fields', message: 'Please enter your email and password.', type: 'warning' });
      return;
    }
    setLoading(true);
    try {
      const user = await login(email, password);
      addToast({ title: 'Welcome back!', message: `Good to see you, ${user?.name?.split(' ')[0] || 'there'}.`, type: 'success' });
      if (user?.onboardingComplete) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding/personal');
      }
    } catch (err) {
      addToast({ title: 'Login failed', message: err?.response?.data?.detail || 'Check your credentials and try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--athena-bg)]">
      <DemoBanner />
      <ToastContainer />

      <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.08),transparent_68%)]" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.06),transparent_70%)]" />

      <div className="relative mx-auto grid w-full max-w-5xl flex-1 items-center gap-10 px-5 py-12 lg:grid-cols-2 lg:px-8">
        <div className="hidden lg:block">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-rose-800 shadow-[0_12px_30px_rgba(225,29,72,0.28)]">
            <Zap size={22} color="white" />
          </div>
          <h1 className="text-gradient mb-3 text-5xl font-bold tracking-tight">ATHENA</h1>
          <p className="mb-8 max-w-sm text-lg leading-8 text-slate-400">Your evolving digital twin. Tasks, wellness, memory, and safety — orchestrated by specialized AI agents.</p>
          <div className="grid gap-3">
            {['Seven specialized agents', 'Private by design', 'A companion that learns you'].map((item) => (
              <div key={item} className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[420px]">
          <div className="mb-8 text-center lg:hidden">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-rose-800">
              <Zap size={24} color="white" />
            </div>
            <h1 className="text-gradient text-3xl font-bold tracking-tight">ATHENA</h1>
            <p className="mt-1 text-sm text-slate-500">Your evolving digital twin.</p>
          </div>

          <div className="glass-card p-8">
            <h2 className="mb-6 text-center text-xl font-semibold tracking-tight text-slate-50">Sign in to ATHENA</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="athena-label" htmlFor="email">Email address</label>
                <div className="relative">
                  <Mail size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="athena-input pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label className="athena-label" htmlFor="password">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="athena-input pr-11 pl-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 border-0 bg-transparent text-slate-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <button type="button" className="border-0 bg-transparent text-[13px] font-medium text-rose-400">
                  Forgot password?
                </button>
              </div>
              <button type="submit" disabled={loading} className="athena-btn-primary w-full justify-center py-3 text-[15px]">
                {loading ? <LoadingSpinner size={18} /> : <><span>Sign In</span><ArrowRight size={16} /></>}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[13px] text-slate-500">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <Link to="/signup" className="athena-btn-secondary w-full justify-center no-underline">
              Create Account
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-slate-600">ATHENA — HumanTwin AI · GATEWAYS 2026</p>
        </div>
      </div>
    </div>
  );
}
