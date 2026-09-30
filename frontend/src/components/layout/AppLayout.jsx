import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DemoBanner from '../ui/DemoBanner';
import ToastContainer from '../notifications/ToastContainer';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col bg-[#06040a] text-neutral-100 selection:bg-purple-600/30 selection:text-purple-200">
      <DemoBanner />

      {/* Atmospheric ambient glows matching the reference theme */}
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

      <div className="relative z-10 flex min-h-0 flex-1">
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
