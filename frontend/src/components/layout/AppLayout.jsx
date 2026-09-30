import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DemoBanner from '../ui/DemoBanner';
import ToastContainer from '../notifications/ToastContainer';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--athena-bg)]">
      <DemoBanner />

      <div className="relative flex min-h-0 flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-[var(--sidebar-width)]">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="page-enter mx-auto w-full max-w-[1180px] flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
