import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import {
  LayoutDashboard, Package, FileText, Calendar, Users, MessageSquare,
  Download, Briefcase, Settings, LogOut, Menu, X, ChevronRight,
  Stethoscope, Shield
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Products', icon: Package, path: '/admin/products' },
  { label: 'News & Articles', icon: FileText, path: '/admin/news' },
  { label: 'Events', icon: Calendar, path: '/admin/events' },
  { label: 'Case Studies', icon: Briefcase, path: '/admin/case-studies' },
  { label: 'Quote Requests', icon: MessageSquare, path: '/admin/quotes' },
  { label: 'Service Requests', icon: Stethoscope, path: '/admin/service-requests' },
  { label: 'Downloads', icon: Download, path: '/admin/downloads' },
  { label: 'Job Listings', icon: Users, path: '/admin/jobs' },
];

export default function AdminLayout() {
  const { user, isLoadingAuth } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900">
        <div className="w-8 h-8 border-4 border-slate-600 rounded-full animate-spin border-t-blue-500" />
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    base44.auth.redirectToLogin(window.location.href);
    return null;
  }
  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center p-10 bg-slate-800 rounded-2xl border border-slate-700 max-w-sm">
          <Shield size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-white font-bold text-xl mb-2">Access Denied</h2>
          <p className="text-slate-400 mb-6">You need admin privileges to access this panel.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Back to Site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
          <div className="bg-white rounded-lg px-2 py-1.5 flex-shrink-0">
            <img
              src="https://media.base44.com/images/public/6a2dc1968bf71040c439ca75/b30f0019a_MedTechLogoACCEPTED.png"
              alt="MedTech Special Device"
              className="h-7 w-auto"
            />
          </div>
          <p className="text-slate-400 text-xs">Admin Panel</p>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon size={16} />
                {item.label}
                {active && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {user?.full_name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{user?.full_name || 'Admin'}</p>
              <p className="text-slate-400 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="flex-1 text-center text-xs text-slate-400 hover:text-white py-2 rounded-lg hover:bg-slate-800 transition-colors">
              View Site
            </Link>
            <button
              onClick={() => base44.auth.logout('/')}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-red-400 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-5 py-4 flex items-center gap-3 sm:gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white flex-shrink-0">
            <Menu size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-semibold text-sm truncate">
              {navItems.find(n => n.path === location.pathname)?.label || 'Admin Panel'}
            </h1>
          </div>
          <span className="text-xs bg-blue-600/20 text-blue-400 px-2.5 sm:px-3 py-1 rounded-full font-medium flex-shrink-0">Admin</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}