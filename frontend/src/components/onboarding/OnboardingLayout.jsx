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
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#06040a] text-neutral-100 selection:bg-purple-600/30 selection:text-purple-200">
      <DemoBanner />
      <ToastContainer />

      {/* Cosmic background glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 right-1/4 h-[550px] w-[550px] rounded-full bg-purple-900/12 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-950/15 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 80px 100px, rgba(216,180,254,0.7), rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 150px 70px, #ffffff, rgba(0,0,0,0))`,
            backgroundSize: '240px 240px'
          }}
        />
      </div>

      <div className="relative z-10 flex items-center gap-3 border-b border-purple-500/15 bg-[#0a0714]/85 px-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-violet-600 to-purple-800 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <Zap size={15} color="white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-neutral-100 font-serif">Calibrating your digital twin</span>
            <span className="text-xs font-semibold text-purple-300 font-mono">
              {currentIdx + 1} / {STEPS.length}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-violet-400 to-pink-500 transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-1.5 overflow-x-auto border-b border-purple-500/10 px-4 py-3 sm:px-6">
        {STEPS.map((step, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <div key={step.path} className="flex shrink-0 items-center gap-1.5">
              <div
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-all ${
                  done
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                    : active
                      ? 'border-purple-500/40 bg-purple-500/15 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                      : 'border-white/[0.08] bg-white/[0.03] text-neutral-500'
                }`}
              >
                {done ? <Check size={10} /> : <span className="w-3.5 text-center font-mono">{i + 1}</span>}
                {step.label}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-3 ${i < currentIdx ? 'bg-emerald-500/30' : 'bg-white/10'}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="relative z-10 flex flex-1 justify-center px-4 py-8 sm:px-6">
        <div className="step-in w-full max-w-[640px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
