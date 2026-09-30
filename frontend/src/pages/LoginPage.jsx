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
    <div style={{
      minHeight: '100vh', background: '#0a0a0f',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      <DemoBanner />
      <ToastContainer />

      {/* Background glow effects */}
      <div style={{
        position: 'absolute', top: -200, right: -200,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -200, left: -200,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 20px',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="float" style={{ display: 'inline-flex', marginBottom: 20 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: 'linear-gradient(135deg, #dc2626, #7f1d1d)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 40px rgba(220,38,38,0.4)',
              }}>
                <Zap size={30} color="white" />
              </div>
            </div>
            <h1 style={{
              fontSize: 36, fontWeight: 900, letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #f1f5f9, #dc2626)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', marginBottom: 8,
            }}>
              ATHENA
            </h1>
            <p style={{ color: '#64748b', fontSize: 15, fontStyle: 'italic' }}>
              Your evolving digital twin.
            </p>
          </div>

          {/* Card */}
          <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ color: '#f1f5f9', fontSize: 20, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
              Sign in to ATHENA
            </h2>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Email */}
              <div>
                <label className="athena-label" htmlFor="email">Email address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="athena-input"
                    style={{ paddingLeft: 40 }}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="athena-label" htmlFor="password">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="athena-input"
                    style={{ paddingLeft: 40, paddingRight: 44 }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: '#475569',
                      display: 'flex', alignItems: 'center',
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div style={{ textAlign: 'right' }}>
                <button type="button" style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#dc2626', fontSize: 13, fontWeight: 500,
                }}>
                  Forgot password?
                </button>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="athena-btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '13px 24px', fontSize: 15 }}
              >
                {loading ? <LoadingSpinner size={18} /> : <><span>Sign In</span><ArrowRight size={16} /></>}
              </button>
            </form>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0',
            }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ color: '#475569', fontSize: 13 }}>or</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            </div>

            <Link
              to="/signup"
              className="athena-btn-secondary"
              style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
            >
              Create Account
            </Link>
          </div>

          <p style={{ textAlign: 'center', color: '#334155', fontSize: 12, marginTop: 24 }}>
            ATHENA — HumanTwin AI · GATEWAYS 2026
          </p>
        </div>
      </div>
    </div>
  );
}
