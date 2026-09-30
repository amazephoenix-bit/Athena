import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { Zap, Check } from 'lucide-react';
import DemoBanner from '../ui/DemoBanner';
import ToastContainer from '../notifications/ToastContainer';

const STEPS = [
  { path: '/onboarding/personal', label: 'Personal' },
  { path: '/onboarding/lifestyle', label: 'Lifestyle' },
  { path: '/onboarding/wellness', label: 'Wellness' },
  { path: '/onboarding/productivity', label: 'Productivity' },
  { path: '/onboarding/pets', label: 'Pets' },
  { path: '/onboarding/integrations', label: 'Integrations' },
  { path: '/onboarding/safety', label: 'Safety' },
  { path: '/onboarding/permissions', label: 'Permissions' },
];

export default function OnboardingLayout() {
  const location = useLocation();
  const currentIdx = STEPS.findIndex((s) => s.path === location.pathname);
  const progress = ((currentIdx + 1) / STEPS.length) * 100;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column' }}>
      <DemoBanner />
      <ToastContainer />

      {/* Header */}
      <div style={{
        padding: '16px 24px',
        background: 'rgba(13,13,20,0.8)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(220,38,38,0.4)', flexShrink: 0 }}>
          <Zap size={16} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 600 }}>
              Setting up your digital twin
            </span>
            <span style={{ color: '#dc2626', fontSize: 12, fontWeight: 700 }}>
              {currentIdx + 1} / {STEPS.length}
            </span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 100, height: 3, overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(90deg, #dc2626, #ef4444)', borderRadius: 100, height: '100%', width: `${progress}%`, transition: 'width 0.5s ease', boxShadow: '0 0 6px rgba(220,38,38,0.5)' }} />
          </div>
        </div>
      </div>

      {/* Step pills */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '12px 24px',
        overflowX: 'auto', borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        {STEPS.map((step, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <div key={step.path} style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 100,
                background: done ? 'rgba(34,197,94,0.1)' : active ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${done ? 'rgba(34,197,94,0.3)' : active ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.08)'}`,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.03em',
                color: done ? '#4ade80' : active ? '#dc2626' : '#475569',
              }}>
                {done ? <Check size={10} /> : <span style={{ width: 14, textAlign: 'center' }}>{i + 1}</span>}
                {step.label}
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ width: 16, height: 1, background: i < currentIdx ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)' }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '32px 20px' }}>
        <div style={{ width: '100%', maxWidth: 640 }} className="step-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
