import { createContext, useContext, useState, useCallback, useRef } from 'react';

const NotificationContext = createContext(null);

let idCounter = 0;

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Good morning! 🌅',
      message: "Here are your priorities for today.",
      type: 'info',
      read: false,
      timestamp: new Date().toISOString(),
    },
    {
      id: 'n2',
      title: 'Assignment due tomorrow',
      message: 'Your AI Assignment is due tomorrow.',
      type: 'warning',
      read: false,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
  ]);

  const addToast = useCallback(({ title, message, type = 'info', duration = 4000 }) => {
    const id = `toast-${++idCounter}`;
    setToasts((prev) => [...prev, { id, title, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t));
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 350);
    }, duration);
    return id;
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.map((t) => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 350);
  }, []);

  const addNotification = useCallback((notification) => {
    const id = `notif-${++idCounter}`;
    setNotifications((prev) => [{ ...notification, id, read: false, timestamp: new Date().toISOString() }, ...prev]);
  }, []);

  const markRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const dismissNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      toasts, notifications, unreadCount,
      addToast, dismissToast, addNotification, markRead, markAllRead, dismissNotification,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
}
