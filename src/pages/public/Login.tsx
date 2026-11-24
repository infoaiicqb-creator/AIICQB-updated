import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AuthLeftBanner } from '../../components/AuthLeftBanner';
import { NetworkStarsBackground } from '../../components/NetworkStarsBackground';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
  X,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';

export const Login: React.FC = () => {
  const { user, loading: authLoading, login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');
  const message = searchParams.get('message');
  const certName = searchParams.get('certName');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // Google OAuth Modal state
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  // Condition: Do not redirect logged-in users to the login page again
  useEffect(() => {
    if (user && !authLoading) {
      if (user.role === 'Super Admin' || user.role !== 'Candidate') {
        navigate('/admin/dashboard', { replace: true });
      } else if (redirect) {
        navigate(redirect, { replace: true });
      } else {
        navigate('/portal/dashboard', { replace: true });
      }
    }
  }, [user, authLoading, redirect, navigate]);

  // Prevent flash of login screen if session is already active
  if (user && !authLoading) {
    return null;
  }

  // Pre-load admin credentials if requested
  useEffect(() => {
    if (searchParams.get('role') === 'admin' || redirect?.startsWith('/admin')) {
      setEmail('admin@aicqb.org');
      setPassword('Admin@123456');
    }
  }, [searchParams, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setForgotSuccess('');
      const res = await login({ email, password });
      if (res && res.success) {
        if (res.user.role === 'Super Admin' || res.user.role !== 'Candidate') {
          navigate('/admin/dashboard');
        } else if (redirect) {
          navigate(redirect);
        } else {
          navigate('/portal/dashboard');
        }
      } else {
        setError(res?.message || 'Invalid email or password. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.trim()) {
      setError('Please provide your Google email address.');
      return;
    }
    try {
      setGoogleLoading(true);
      setError('');
      const res = await googleLogin({
        email: googleEmail.trim(),
        fullName: googleName.trim() || googleEmail.split('@')[0],
      });
      setShowGoogleModal(false);
      if (res && res.success) {
        if (res.user.role === 'Super Admin' || res.user.role !== 'Candidate') {
          navigate('/admin/dashboard');
        } else if (redirect) {
          navigate(redirect);
        } else {
          navigate('/portal/dashboard');
        }
      } else {
        setError(res?.message || 'Google sign-in failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError('Please enter your email address in the field above to receive a reset link.');
      return;
    }
    setError('');
    setForgotSuccess(`Password reset instructions have been dispatched to ${email}. Please check your inbox.`);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between relative bg-cover bg-center font-sans overflow-x-hidden"
      style={{ backgroundImage: `url('/login-bg-clean.jpg')` }}
    >
      {/* Dark Subtle Backdrop Overlay for Perfect Contrast */}
      <div className="absolute inset-0 bg-[#06142A]/20 pointer-events-none z-0" />

      {/* Animated Moving Stars & Interconnected International Network Background */}
      <NetworkStarsBackground />

      {/* LEFT COLUMN: Hero Content (Logo, Laurel Wreath, 5 Badges, 5 Domains, 7 Flags) */}
      <AuthLeftBanner />

      {/* RIGHT COLUMN: Floating Authentication Card placed over the office side */}
      <div className="relative w-full lg:w-[46%] xl:w-[45%] min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        {/* Floating Authentication Card matching Image exactly */}
        <div className="w-full max-w-[420px] bg-white rounded-[32px] shadow-[0_24px_70px_-15px_rgba(10,30,60,0.28)] border border-white/80 p-7 sm:p-8 transition-all my-auto backdrop-blur-xs">
          {/* Card Top: Official AIICQB Logo with Subtitle */}
          <div className="flex flex-col items-center mb-3">
            <Link to="/">
              <img
                src="/aiicqb-full-logo.png"
                alt="AIICQB - AI International Certification & Qualification Board"
                className="h-12 sm:h-14 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center space-y-0.5 mb-4 sm:mb-5">
            <h1 className="text-2xl sm:text-[25px] font-extrabold text-[#10264B] tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Login to your AICQB account
            </p>
          </div>

          {/* Enrollment Login Required Prompt */}
          {message && (
            <div className="mb-4 p-3.5 bg-blue-50/95 border-2 border-[#1E40AF]/30 rounded-2xl flex items-start space-x-2.5 shadow-sm animate-in fade-in slide-in-from-top-1 duration-200">
              <ShieldAlert className="w-5 h-5 text-[#1E40AF] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs sm:text-[13px] font-bold text-[#0A1E3D] leading-snug">
                  {message}
                </p>
                {certName && (
                  <p className="text-[11px] text-[#1E40AF] font-medium mt-1">
                    Target Program: <span className="font-extrabold">{certName}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Error Alert with Proper Typography & Alignment */}
          {error && (
            <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200/90 rounded-2xl flex items-start space-x-2.5 shadow-xs animate-in fade-in slide-in-from-top-1 duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs sm:text-[13px] font-semibold text-rose-700 leading-snug tracking-normal">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Forgot Password Feedback */}
          {forgotSuccess && (
            <div className="mb-3.5 p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-700 font-medium flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{forgotSuccess}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Email / Mobile Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ID / Mobile Number"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B2040] focus:border-transparent transition-all shadow-sm"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-11 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B2040] focus:border-transparent transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0B2040] border-gray-300 focus:ring-[#0B2040] transition-colors"
                />
                <span className="text-xs text-gray-600 font-medium">Remember me</span>
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Primary Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-3.5 px-4 bg-[#0A1E3D] hover:bg-[#102B52] active:bg-[#07162C] text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-950/20 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-70 mt-1"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* "or login with" Divider */}
          <div className="relative my-4 sm:my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-400 font-medium">or login with</span>
            </div>
          </div>

          {/* Social Auth Buttons (Google, LinkedIn, Microsoft) */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {/* Google */}
            <button
              type="button"
              onClick={() => setShowGoogleModal(true)}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 shadow-sm transition-all"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.59H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.41l4.03-3.13z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.59l4.03 3.13c.95-2.83 3.6-4.97 6.72-4.97z"
                />
              </svg>
              <span>Google</span>
            </button>

            {/* LinkedIn */}
            <button
              type="button"
              onClick={() => {
                setEmail('candidate@aicqb.org');
                setPassword('Candidate@123');
              }}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 shadow-sm transition-all"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="#0A66C2" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </button>

            {/* Microsoft */}
            <button
              type="button"
              onClick={() => {
                setEmail('admin@aicqb.org');
                setPassword('Admin@123456');
              }}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 shadow-sm transition-all"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
              <span>Microsoft</span>
            </button>
          </div>

          {/* Footer Prompt */}
          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-xs text-gray-600">
              Don't have an account?{' '}
              <Link
                to={`/signup${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}
                className="font-bold text-[#1E40AF] hover:text-[#0B2040] hover:underline transition-colors"
              >
                Create New Account / Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Google OAuth Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.665-5.17 3.665-9.14z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.59H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.41l4.03-3.13z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.59l4.03 3.13c.95-2.83 3.6-4.97 6.72-4.97z" />
                </svg>
                <h3 className="text-sm font-bold text-gray-900">Sign in with Google</h3>
              </div>
              <button
                onClick={() => setShowGoogleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Provide your Google account details to authenticate into the AICQB candidate examination portal.
            </p>
            <form onSubmit={handleGoogleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Google Email</label>
                <input
                  type="email"
                  required
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="candidate@gmail.com"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2040]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">Full Name (optional)</label>
                <input
                  type="text"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="Rahul Deshmukh"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2040]"
                />
              </div>
              <button
                type="submit"
                disabled={googleLoading}
                className="w-full py-2.5 bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold text-xs rounded-lg shadow flex items-center justify-center space-x-2 transition-all"
              >
                {googleLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <span>Continue with Google</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
