import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Globe, User, LogOut, ChevronDown, Award } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Certifications', path: '/certifications' },
    { label: 'Exams', path: '/exams' },
    { label: 'Learning', path: '/learning' },
    { label: 'About Us', path: '/about' },
    { label: 'Support', path: '/support' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* AICQB Logo */}
          <Link to="/" className="flex items-center space-x-3 group py-2">
            <img src="/aicqb-logo.png" alt="AICQB Logo" className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-[#F47716] font-semibold border-b-2 border-[#F47716]'
                    : 'text-[#10264B] hover:text-[#F47716]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/verify"
              className="inline-flex items-center text-xs font-semibold text-[#10264B] bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-md transition-colors"
            >
              <Award className="w-3.5 h-3.5 mr-1.5 text-[#F47716]" />
              Verify Certificate
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-[#10264B] text-white px-3.5 py-2 rounded-md text-sm font-medium hover:bg-[#1E3A6E] transition-colors"
                >
                  <User className="w-4 h-4 text-[#F47716]" />
                  <span>{user.fullName || user.email}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 z-50 text-sm">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="font-semibold text-[#10264B] truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-orange-100 text-[#F47716] font-medium rounded">
                        {user.role}
                      </span>
                    </div>

                    {user.role === 'Candidate' ? (
                      <>
                        <Link
                          to="/portal/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-[#10264B] hover:bg-gray-50 font-medium"
                        >
                          Candidate Portal
                        </Link>
                        <Link
                          to="/portal/certificates"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-[#10264B] hover:bg-gray-50 font-medium"
                        >
                          My Certificates
                        </Link>
                        <Link
                          to="/portal/exams"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-[#10264B] hover:bg-gray-50 font-medium"
                        >
                          My Exams
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-[#10264B] hover:bg-gray-50 font-medium"
                        >
                          Super Admin Portal
                        </Link>
                        <Link
                          to="/portal/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium text-xs"
                        >
                          Candidate Portal View
                        </Link>
                      </>
                    )}

                    <Link
                      to="/portal/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
                    >
                      My Profile
                    </Link>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-red-50 border-t border-gray-100 mt-1"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-semibold text-[#10264B] hover:text-[#F47716] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-md text-sm font-semibold text-white bg-[#F47716] hover:bg-[#DC660E] shadow-sm transition-all transform active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#10264B] hover:text-[#F47716] hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#10264B] hover:text-[#F47716] hover:bg-gray-50"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/verify"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#F47716] bg-orange-50 rounded-md"
          >
            Verify Certificate
          </Link>
          {user ? (
            <div className="pt-4 border-t border-gray-200">
              <Link
                to={user.role === 'Candidate' ? '/portal/dashboard' : '/admin/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 px-4 rounded-md font-medium text-white bg-[#10264B]"
              >
                Go to {user.role === 'Candidate' ? 'Candidate Portal' : 'Admin Portal'}
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 px-4 rounded-md font-semibold text-[#10264B] border border-gray-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 px-4 rounded-md font-semibold text-white bg-[#F47716]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

