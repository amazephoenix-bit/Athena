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

  const sidebarStyle = {
    position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 500,
    width: 240, background: '#0d0d14',
    borderRight: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', flexDirection: 'column',
    transition: 'transform 0.3s ease',
    transform: open ? 'translateX(0)' : 'translateX(-100%)',
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 499, backdropFilter: 'blur(4px)',
          }}
        />
      )}

      <nav style={sidebarStyle}>
        {/* Logo */}
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #dc2626, #7f1d1d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 15px rgba(220,38,38,0.4)',
            }}>
              <Zap size={18} color="white" />
            </div>
            <div>
              <span style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>ATHENA</span>
              <p style={{ color: '#dc2626', fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: -2 }}>Digital Twin</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#475569', padding: 4, borderRadius: 6, display: 'flex',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* User avatar */}
        <div style={{ padding: '16px 16px 8px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px', borderRadius: 12,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #dc2626, #7f1d1d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0,
            }}>
              {(user?.name || user?.personalInformation?.fullName || 'A')[0].toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.name || user?.personalInformation?.fullName || 'User'}
              </p>
              <p style={{ color: '#94a3b8', fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.email || ''}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
          {NAV_ITEMS.map((item, i) => {
            if (item.type === 'divider') {
              return (
                <p key={i} style={{
                  color: '#334155', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', padding: '16px 8px 6px',
                }}>
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
                <Icon size={17} />
                {item.label}
              </NavLink>
            );
          })}
        </div>

        {/* Logout */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={handleLogout}
            className="athena-sidebar-item"
            style={{ width: '100%', background: 'none', border: 'none' }}
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
}
