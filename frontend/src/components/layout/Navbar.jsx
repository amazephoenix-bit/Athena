import { useState } from 'react';
import { Menu, Bell, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useNavigate, useLocation } from 'react-router-dom';
import NotificationCenter from '../notifications/NotificationCenter';

const TITLES = {
  '/dashboard': 'Dashboard',
  '/chat': 'Chat',
  '/tasks': 'Tasks',
  '/reminders': 'Reminders',
  '/memory': 'Memory',
  '/behavior': 'My Twin',
  '/wellness': 'Wellness',
  '/lifestyle': 'Lifestyle',
  '/pets': 'Pets',
  '/safety': 'Safety',
  '/rewards': 'Rewards',
  '/feedback': 'Feedback',
  '/settings': 'Settings',
};

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const { unreadCount } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const name = user?.name || user?.personalInformation?.fullName || 'there';
  const title = TITLES[location.pathname] || 'ATHENA';

  return (
    <>
      <header className="sticky top-0 z-[300] flex h-16 items-center gap-3 border-b border-purple-500/15 bg-[#0a0714]/90 px-4 backdrop-blur-xl sm:px-6">
        <button type="button" onClick={onMenuClick} className="icon-btn lg:hidden" aria-label="Open menu">
          <Menu size={18} />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold tracking-tight text-white font-serif">{title}</p>
          <p className="hidden truncate text-xs text-neutral-400 sm:block">Welcome back, {name.split(' ')[0]}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/safety')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/15 px-2.5 py-1.5 text-[11px] font-bold tracking-wide text-purple-300 uppercase shadow-xs"
          >
            <Shield size={13} />
            SOS
          </button>

          <button
            type="button"
            onClick={() => setShowNotifications(true)}
            className="icon-btn relative"
            aria-label="Notifications"
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-800 text-sm font-bold text-white"
            aria-label="Open settings"
          >
            {(user?.name || user?.personalInformation?.fullName || 'A')[0].toUpperCase()}
          </button>
        </div>
      </header>

      <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </>
  );
}
