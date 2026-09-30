import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard, MessageCircle, CheckSquare, Bell, Brain,
  Activity, Heart, Sparkles, Shield, Gift, Settings,
  MessageSquare, PawPrint, LogOut, X, Zap,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chat', icon: MessageCircle, label: 'Chat with ATHENA' },
  { label: 'MANAGE', type: 'divider' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/reminders', icon: Bell, label: 'Reminders' },
  { to: '/memory', icon: Brain, label: 'My Memory' },
  { label: 'INSIGHTS', type: 'divider' },
  { to: '/behavior', icon: Activity, label: 'My Twin' },
  { to: '/wellness', icon: Heart, label: 'Wellness' },
  { to: '/lifestyle', icon: Sparkles, label: 'Lifestyle' },
  { to: '/pets', icon: PawPrint, label: 'Pets' },
  { label: 'SYSTEM', type: 'divider' },
  { to: '/safety', icon: Shield, label: 'Safety' },
  { to: '/rewards', icon: Gift, label: 'Rewards' },
  { to: '/feedback', icon: MessageSquare, label: 'Feedback' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const name = user?.name || user?.personalInformation?.fullName || 'User';
  const initial = name[0].toUpperCase();

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-[499] bg-black/55 backdrop-blur-sm lg:hidden"
        />
      )}

      <nav
        className={`fixed top-0 bottom-0 left-0 z-[500] flex w-[var(--sidebar-width)] flex-col border-r border-white/[0.06] bg-[#0e1016] transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-rose-800 shadow-[0_8px_20px_rgba(225,29,72,0.25)]">
              <Zap size={17} color="white" />
            </div>
            <div>
              <span className="block text-[17px] font-bold tracking-tight text-slate-50">ATHENA</span>
              <p className="mt-[-2px] text-[9px] font-semibold tracking-[0.16em] text-rose-400 uppercase">Digital Twin</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="icon-btn lg:hidden">
            <X size={15} />
          </button>
        </div>

        <div className="px-3 pt-4 pb-2">
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-800 text-sm font-bold text-white">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-slate-50">{name}</p>
              <p className="truncate text-[11px] text-slate-400">{user?.email || ''}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-1">
          {NAV_ITEMS.map((item, i) => {
            if (item.type === 'divider') {
              return (
                <p key={i} className="mt-4 mb-1 px-3 text-[10px] font-bold tracking-[0.14em] text-slate-600 uppercase">
                  {item.label}
                </p>
              );
            }
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `athena-sidebar-item${isActive ? ' active' : ''}`}
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            );
          })}
        </div>

        <div className="border-t border-white/[0.06] px-2 py-3">
          <button
            type="button"
            onClick={handleLogout}
            className="athena-sidebar-item w-full border-none bg-transparent"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
}
