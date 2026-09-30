import { Outlet, useLocation } from 'react-router-dom';
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
    <div className="flex min-h-screen flex-col bg-[var(--athena-bg)]">
      <DemoBanner />
      <ToastContainer />

      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#0e1016]/85 px-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rose-400 to-rose-800">
          <Zap size={15} color="white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-100">Setting up your digital twin</span>
            <span className="text-xs font-semibold text-rose-400">
              {currentIdx + 1} / {STEPS.length}
            </span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-600 to-rose-400 transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-white/[0.04] px-4 py-3 sm:px-6">
        {STEPS.map((step, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <div key={step.path} className="flex shrink-0 items-center gap-1.5">
              <div
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${
                  done
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                    : active
                      ? 'border-rose-500/35 bg-rose-500/12 text-rose-400'
                      : 'border-white/[0.08] bg-white/[0.03] text-slate-600'
                }`}
              >
                {done ? <Check size={10} /> : <span className="w-3.5 text-center">{i + 1}</span>}
                {step.label}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-3 ${i < currentIdx ? 'bg-emerald-500/30' : 'bg-white/10'}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-1 justify-center px-4 py-8 sm:px-6">
        <div className="step-in w-full max-w-[640px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
