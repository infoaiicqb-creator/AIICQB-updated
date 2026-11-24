import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { AuthLeftBanner } from '../../components/AuthLeftBanner';
import { NetworkStarsBackground } from '../../components/NetworkStarsBackground';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export const SignUp: React.FC = () => {
  const { user, register, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user && !authLoading) {
      navigate('/portal/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (user && !authLoading) {
    return null;
  }

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // New user program enrollment
  const [certList, setCertList] = useState<any[]>(() => {
    try {
      const c = localStorage.getItem('aicqb_all_certifications');
      return c ? JSON.parse(c) : [];
    } catch (_) {
      return [];
    }
  });
  const [selectedCertificationId, setSelectedCertificationId] = useState('');

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      const res = await api.getCertifications();
      if (res.success && res.certifications) {
        setCertList(res.certifications);
        const queryCert = searchParams.get('enroll') || searchParams.get('cert') || '';
        if (queryCert) {
          const matched = res.certifications.find(
            (c: any) =>
              c.id === queryCert ||
              c.code?.toLowerCase() === queryCert.toLowerCase() ||
              c.name?.toLowerCase().includes(queryCert.toLowerCase())
          );
          if (matched) {
            setSelectedCertificationId(matched.id);
          }
        }
      }
    } catch (e) {
      console.error('Failed to load certifications on signup:', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('You must accept the AICQB Terms & Conditions and Privacy Policy.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await register({
        fullName,
        email,
        phoneNumber: '',
        countryCode: '+1',
        password,
        confirmPassword,
        agreeTerms,
        selectedCertificationId,
      });

      if (res && res.success) {
        const redirect = searchParams.get('redirect');
        if (redirect) {
          navigate(redirect);
        } else if (selectedCertificationId) {
          navigate('/portal/exams');
        } else {
          navigate('/portal/dashboard');
        }
      } else {
        setError(res?.message || 'Registration failed. Please check your details.');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
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

      {/* LEFT COLUMN: Hero Content */}
      <AuthLeftBanner />

      {/* RIGHT COLUMN: Floating Registration Card */}
      <div className="relative w-full lg:w-[46%] xl:w-[45%] min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        <div className="w-full max-w-[440px] bg-white rounded-[32px] shadow-[0_24px_70px_-15px_rgba(10,30,60,0.28)] border border-white/80 p-7 sm:p-8 transition-all my-auto backdrop-blur-xs">
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
              Create Account
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Register for your AICQB certification portal
            </p>
          </div>

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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name (e.g. Rahul Deshmukh)"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B2040] focus:border-transparent transition-all shadow-sm"
              />
            </div>

            {/* Email Address */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B2040] focus:border-transparent transition-all shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (minimum 6 characters)"
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

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B2040] focus:border-transparent transition-all shadow-sm"
              />
            </div>

            {/* Optional Target Certification */}
            {certList.length > 0 && (
              <div>
                <select
                  value={selectedCertificationId}
                  onChange={(e) => setSelectedCertificationId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0B2040]"
                >
                  <option value="">Optional: Select Target Certification</option>
                  {certList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Agree Terms Checkbox */}
            <div className="flex items-start space-x-2 pt-0.5">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#0B2040] border-gray-300 focus:ring-[#0B2040]"
              />
              <label htmlFor="terms" className="text-[11px] text-gray-600 cursor-pointer select-none leading-relaxed">
                I agree to the{' '}
                <span className="text-[#1E40AF] font-medium hover:underline">AICQB Terms of Service</span> &amp;{' '}
                <span className="text-[#1E40AF] font-medium hover:underline">Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-3.5 px-4 bg-[#0A1E3D] hover:bg-[#102B52] active:bg-[#07162C] text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-950/20 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-70 mt-1"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* "or register with" Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-400 font-medium">or register with</span>
            </div>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <Link
              to="/login"
              className="flex items-center justify-center space-x-1.5 py-2 px-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 shadow-sm transition-all"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.665-5.17 3.665-9.14z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.59H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.41l4.03-3.13z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.59l4.03 3.13c.95-2.83 3.6-4.97 6.72-4.97z" />
              </svg>
              <span>Google</span>
            </Link>

            <Link
              to="/login"
              className="flex items-center justify-center space-x-1.5 py-2 px-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 shadow-sm transition-all"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="#0A66C2" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </Link>

            <Link
              to="/login"
              className="flex items-center justify-center space-x-1.5 py-2 px-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 shadow-sm transition-all"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
              <span>Microsoft</span>
            </Link>
          </div>

          {/* Footer Prompt */}
          <div className="mt-5 text-center">
            <p className="text-xs text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#1E40AF] hover:text-[#0B2040] hover:underline transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
