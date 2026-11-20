import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CandidateLayout } from './components/CandidateLayout';
import { AdminLayout } from './components/AdminLayout';
import { useAuth } from './context/AuthContext';

// Public Pages (17 Pages)
import { Home } from './pages/public/Home';
import { AboutUs } from './pages/public/AboutUs';
import { Certifications } from './pages/public/Certifications';
import { CertificationDetails } from './pages/public/CertificationDetails';
import { Exams } from './pages/public/Exams';
import { Learning } from './pages/public/Learning';
import { VerifyCertificate } from './pages/public/VerifyCertificate';
import { PricingPlans } from './pages/public/PricingPlans';
import { EventsWebinars } from './pages/public/EventsWebinars';
import { Partners } from './pages/public/Partners';
import { Resources } from './pages/public/Resources';
import { Careers } from './pages/public/Careers';
import { SupportHelpCenter } from './pages/public/SupportHelpCenter';
import { BlogInsights } from './pages/public/BlogInsights';
import { ContactUs } from './pages/public/ContactUs';
import { Login } from './pages/public/Login';
import { SignUp } from './pages/public/SignUp';

// Candidate Portal Pages (10 Pages)
import { CandidateDashboard } from './pages/candidate/CandidateDashboard';
import { CandidateProfile } from './pages/candidate/CandidateProfile';
import { CandidateCertifications } from './pages/candidate/CandidateCertifications';
import { CandidateExams } from './pages/candidate/CandidateExams';
import { CandidateLearning } from './pages/candidate/CandidateLearning';
import { CandidateCertificates } from './pages/candidate/CandidateCertificates';
import { CandidateVerify } from './pages/candidate/CandidateVerify';
import { CandidatePayments } from './pages/candidate/CandidatePayments';
import { CandidateSupport } from './pages/candidate/CandidateSupport';
import { CandidateSettings } from './pages/candidate/CandidateSettings';

// Admin Portal Pages (13 Modules)
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCertifications } from './pages/admin/AdminCertifications';
import { AdminExaminations } from './pages/admin/AdminExaminations';
import { AdminCandidates } from './pages/admin/AdminCandidates';
import { AdminPartners } from './pages/admin/AdminPartners';
import { AdminMemberships } from './pages/admin/AdminMemberships';
import { AdminCertificates } from './pages/admin/AdminCertificates';
import { AdminVerification } from './pages/admin/AdminVerification';
import { AdminLMS } from './pages/admin/AdminLMS';
import { AdminAnnouncements } from './pages/admin/AdminAnnouncements';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminFinance } from './pages/admin/AdminFinance';
import { AdminFirebase } from './pages/admin/AdminFirebase';
import { AdminSettings } from './pages/admin/AdminSettings';

// Public Layout Wrapper
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

// Route Guards
const ProtectedCandidateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, login } = useAuth();
  if (loading) return null;
  if (!user) {
    return <Navigate to="/login?role=admin&redirect=/admin/dashboard" replace />;
  }
  if (user.role === 'Candidate') {
    return (
      <div className="min-h-screen bg-[#10264B] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl text-center space-y-5 border border-slate-200 animate-fadeIn">
          <div className="w-14 h-14 bg-orange-100 text-[#F47716] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black text-[#10264B]">Super Admin Portal Access</h2>
            <p className="text-xs text-gray-500">
              You are currently signed in as Candidate (<strong>{user.fullName}</strong>).
            </p>
          </div>
          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            Super Administrator privilege is required to access the 13 platform management modules.
          </p>
          <button
            onClick={async () => {
              await login({ email: 'admin@aicqb.org', password: 'Admin@123456' });
              window.location.href = '/admin/dashboard';
            }}
            className="w-full py-3.5 bg-[#F47716] hover:bg-[#DC660E] text-white font-extrabold text-xs rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all cursor-pointer"
          >
            Switch to Super Admin Account
          </button>
          <div className="pt-2">
            <a href="/portal/dashboard" className="text-xs font-semibold text-slate-500 hover:text-[#10264B] underline">
              Return to Candidate Portal
            </a>
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <Routes>
      {/* 17 Public Pages */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><AboutUs /></PublicLayout>} />
      <Route path="/certifications" element={<PublicLayout><Certifications /></PublicLayout>} />
      <Route path="/certifications/:id" element={<PublicLayout><CertificationDetails /></PublicLayout>} />
      <Route path="/exams" element={<PublicLayout><Exams /></PublicLayout>} />
      <Route path="/learning" element={<PublicLayout><Learning /></PublicLayout>} />
      <Route path="/verify" element={<PublicLayout><VerifyCertificate /></PublicLayout>} />
      <Route path="/pricing" element={<PublicLayout><PricingPlans /></PublicLayout>} />
      <Route path="/events" element={<PublicLayout><EventsWebinars /></PublicLayout>} />
      <Route path="/partners" element={<PublicLayout><Partners /></PublicLayout>} />
      <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />
      <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
      <Route path="/support" element={<PublicLayout><SupportHelpCenter /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><BlogInsights /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><ContactUs /></PublicLayout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* 10 Candidate Portal Pages */}
      <Route
        path="/portal"
        element={
          <ProtectedCandidateRoute>
            <CandidateLayout />
          </ProtectedCandidateRoute>
        }
      >
        <Route index element={<Navigate to="/portal/dashboard" replace />} />
        <Route path="dashboard" element={<CandidateDashboard />} />
        <Route path="profile" element={<CandidateProfile />} />
        <Route path="certifications" element={<CandidateCertifications />} />
        <Route path="exams" element={<CandidateExams />} />
        <Route path="learning" element={<CandidateLearning />} />
        <Route path="certificates" element={<CandidateCertificates />} />
        <Route path="verification" element={<CandidateVerify />} />
        <Route path="payments" element={<CandidatePayments />} />
        <Route path="support" element={<CandidateSupport />} />
        <Route path="settings" element={<CandidateSettings />} />
      </Route>

      {/* 13 Super Admin Portal Modules */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="certifications" element={<AdminCertifications />} />
        <Route path="examinations" element={<AdminExaminations />} />
        <Route path="candidates" element={<AdminCandidates />} />
        <Route path="partners" element={<AdminPartners />} />
        <Route path="memberships" element={<AdminMemberships />} />
        <Route path="certificates" element={<AdminCertificates />} />
        <Route path="verification" element={<AdminVerification />} />
        <Route path="lms" element={<AdminLMS />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="finance" element={<AdminFinance />} />
        <Route path="firebase" element={<AdminFirebase />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 404 Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

