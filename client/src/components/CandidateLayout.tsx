import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  User,
  Award,
  CalendarCheck,
  BookOpen,
  FileCheck2,
  ShieldCheck,
  CreditCard,
  Headphones,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
} from 'lucide-react';

export const CandidateLayout: React.FC = () => {
  const { user, candidate, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const candidateNav = [
    { label: 'Dashboard', path: '/portal/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/portal/profile', icon: User },
    { label: 'Certifications', path: '/portal/certifications', icon: Award },
    { label: 'My Exams', path: '/portal/exams', icon: CalendarCheck },
    { label: 'My Learning', path: '/portal/learning', icon: BookOpen },
    { label: 'My Certificates', path: '/portal/certificates', icon: FileCheck2 },
    { label: 'Verification', path: '/portal/verification', icon: ShieldCheck },
    { label: 'Payments', path: '/portal/payments', icon: CreditCard },
    { label: 'Support', path: '/portal/support', icon: Headphones },
    { label: 'Settings', path: '/portal/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName = user?.fullName || candidate?.fullName || 'Candidate';
  const candidateId = user?.candidateId || candidate?.candidateId || (user?.id ? `AICQB-${user.id.slice(0, 6).toUpperCase()}` : '');

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

      {/* Candidate Left Sidebar: Width increased to 320px (w-80), Sticky Top 0, Screen Height, STRICTLY NO SCROLLING */}
      <aside
        className={`${
          sidebarOpen ? 'fixed inset-0 z-50 bg-[#10264B]' : 'hidden'
        } md:flex md:sticky md:top-0 md:h-screen w-full md:w-80 bg-[#10264B] text-white flex-col justify-between flex-shrink-0 z-30 select-none overflow-hidden border-r border-slate-800 shadow-xl`}
      >
        {/* Top: AICQB Logo Header & Navigation */}
        <div className="flex flex-col flex-1 min-h-0 justify-start">
          <div className="px-5 py-4 border-b border-slate-700/60 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl w-full justify-center shadow-md hover:opacity-95 transition-opacity">
              <img src="/aicqb-logo.png" alt="AICQB Logo" className="h-14 sm:h-16 w-auto object-contain" />
            </Link>
            {sidebarOpen && (
              <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 text-white ml-2">
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Navigation Items: Increased size, bold typography, fits screen height with ZERO scrollbar */}
          <nav className="p-4 space-y-1.5 flex-1 flex flex-col justify-evenly">
            {candidateNav.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3.5 px-4 py-2.5 rounded-xl text-[15px] font-semibold transition-all ${
                    active
                      ? 'bg-[#F47716] text-white shadow-lg font-bold scale-[1.02]'
                      : 'text-slate-300 hover:bg-[#1E3A6E] hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate tracking-wide">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: Fixed at bottom with no vertical overflow */}
        <div className="p-4 border-t border-slate-700/60 bg-[#0d203f]/60 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-300 hover:text-red-100 rounded-xl hover:bg-red-900/40 transition-colors font-semibold cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Candidate Topbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-[#10264B] bg-slate-100 px-3 py-1 rounded-md">
              Candidate Portal
            </span>
            <span className="text-xs text-slate-500">
              Candidate ID: <span className="font-mono font-bold text-[#F47716]">{candidateId}</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative cursor-pointer p-1.5 text-gray-500 hover:text-[#10264B]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#F47716] rounded-full ring-2 ring-white"></span>
            </div>

            {/* Candidate User Pill */}
            <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#10264B] text-white flex items-center justify-center font-bold text-xs ring-2 ring-orange-200">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-[#10264B] leading-none">{displayName}</p>
                <p className="text-[11px] text-gray-500 leading-none mt-1">Candidate</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
