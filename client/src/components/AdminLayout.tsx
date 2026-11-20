import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Award,
  CalendarCheck,
  Users,
  Building2,
  BadgeCheck,
  FileCheck2,
  ShieldCheck,
  BookOpen,
  Megaphone,
  BarChart3,
  CreditCard,
  Settings,
  Database,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminNav = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Certifications', path: '/admin/certifications', icon: Award },
    { label: 'Examinations', path: '/admin/examinations', icon: CalendarCheck },
    { label: 'Candidates', path: '/admin/candidates', icon: Users },
    { label: 'Training Partners', path: '/admin/partners', icon: Building2 },
    { label: 'Membership', path: '/admin/memberships', icon: BadgeCheck },
    { label: 'Certificates', path: '/admin/certificates', icon: FileCheck2 },
    { label: 'Verification', path: '/admin/verification', icon: ShieldCheck },
    { label: 'Content (LMS)', path: '/admin/lms', icon: BookOpen },
    { label: 'Communication', path: '/admin/announcements', icon: Megaphone },
    { label: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
    { label: 'Finance & Payments', path: '/admin/finance', icon: CreditCard },
    { label: 'Firebase Cloud DB', path: '/admin/firebase', icon: Database },
    { label: 'System & Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#10264B] text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/aicqb-logo.png" alt="AICQB Logo" className="h-10 w-auto bg-white p-1 rounded-lg" />
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded text-white hover:bg-slate-700">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Left Sidebar: Increased size to w-80 (320px), Increased Font, Separate Dedicated Scrollbar */}
      <aside
        className={`${
          sidebarOpen ? 'fixed inset-0 z-50 bg-[#10264B]' : 'hidden'
        } md:flex md:sticky md:top-0 md:h-screen w-full md:w-80 bg-[#10264B] text-white flex-col justify-between flex-shrink-0 z-30 select-none border-r border-slate-800 shadow-xl`}
      >
        {/* Top: Pinned Logo Header */}
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between flex-shrink-0 bg-[#10264B]">
          <Link to="/" className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl w-full justify-center shadow-md hover:opacity-95 transition-opacity">
            <img src="/aicqb-logo.png" alt="AICQB Logo" className="h-14 sm:h-16 w-auto object-contain" />
          </Link>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 text-white ml-2">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* 13 Nav Items: Increased Font, Larger Icons & Dedicated Separate Scroll */}
        <nav className="flex-1 overflow-y-auto p-3.5 space-y-1.5 sidebar-scroll min-h-0">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#F47716] text-white shadow-md font-bold scale-[1.01]'
                    : 'text-slate-300 hover:bg-[#1E3A6E] hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate tracking-wide text-[14px]">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions: Pinned at bottom */}
        <div className="p-4 border-t border-slate-700/60 bg-[#0d203f]/80 space-y-2 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3.5 py-2 text-xs text-red-300 hover:text-red-100 rounded-xl hover:bg-red-900/40 transition-colors font-semibold cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Topbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center space-x-4 flex-1 max-w-lg">
            <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-white bg-[#10264B] px-3 py-1 rounded-md">
              Super Admin Portal
            </span>
            <div className="relative w-full max-w-xs">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Global search candidates, certs..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F47716]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer p-1.5 text-gray-500 hover:text-[#10264B]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#F47716] rounded-full ring-2 ring-white"></span>
            </div>

            <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#F47716] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                SA
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-[#10264B] leading-none">{user?.fullName || 'Super Admin'}</p>
                <p className="text-[11px] text-[#F47716] font-semibold leading-none mt-1">AICQB Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
