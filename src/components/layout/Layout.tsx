import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Automatically close mobile sidebar on any route change!
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#060911] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sidebar for Desktop and Mobile */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(prev => !prev)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col min-w-0 h-screen overflow-hidden">
        <Header
          onMenuClick={() => setMobileSidebarOpen(true)}
        />
        {/* Main Content Area - ZERO horizontal scrolling */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-5 lg:p-6 w-full custom-scrollbar">
          <div className="mx-auto max-w-7xl w-full min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
