import { useState } from 'react';
import { Menu, Bell, Search, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import NotificationCenter from '../notifications/NotificationCenter';

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const { unreadCount } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const name = user?.name || user?.personalInformation?.fullName || 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      <header style={{
        height: 60, background: 'rgba(13,13,20,0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center',
        padding: '0 20px', gap: 16,
        backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 300,
      }}>
        {/* Menu button */}
        <button
          onClick={onMenuClick}
          style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: '#94a3b8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          <Menu size={18} />
        </button>

        {/* Greeting */}
        <div style={{ flex: 1 }}>
          <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 15 }}>
            {greeting}, <span style={{ color: '#dc2626' }}>{name.split(' ')[0]}</span> 👋
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Safety button */}
          <button
            onClick={() => navigate('/safety')}
            style={{
              background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)',
              borderRadius: 8, padding: '6px 12px', cursor: 'pointer', color: '#dc2626',
              display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700,
              transition: 'all 0.2s', letterSpacing: '0.05em',
            }}
          >
            <Shield size={14} />
            SOS
          </button>

          {/* Notifications */}
          <button
            onClick={() => setShowNotifications(true)}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: '#94a3b8',
              position: 'relative', display: 'flex', alignItems: 'center', transition: 'all 0.2s',
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 8, height: 8, borderRadius: '50%',
                background: '#dc2626', boxShadow: '0 0 6px rgba(220,38,38,0.8)',
              }} />
            )}
          </button>

          {/* Avatar */}
          <div
            onClick={() => navigate('/settings')}
            style={{
              width: 34, height: 34, borderRadius: '50%', cursor: 'pointer',
              background: 'linear-gradient(135deg, #dc2626, #7f1d1d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: 14,
              boxShadow: '0 0 10px rgba(220,38,38,0.3)',
            }}
          >
            {(user?.name || user?.personalInformation?.fullName || 'A')[0].toUpperCase()}
          </div>
        </div>
      </header>

      <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </>
  );
}
