import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Certification } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { RazorpayModal } from '../../components/RazorpayModal';
import { SelectExamLevelModal } from '../../components/SelectExamLevelModal';
import {
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  Calendar,
  FileText,
  ShieldCheck,
  ChevronRight,
  Loader2,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const CertificationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cert, setCert] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'exam' | 'prerequisites'>('overview');
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [enrollLevelData, setEnrollLevelData] = useState<any>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    if (id) {
      loadCertification();
    }
  }, [id]);

  // Handle post-login redirection with preserved certification
  useEffect(() => {
    if (searchParams.get('enroll') && cert) {
      if (!user) {
        navigate(
          `/login?redirect=${encodeURIComponent(`/certifications/${id}?enroll=true`)}&enroll=${cert.id}&certName=${encodeURIComponent(cert.name)}&message=${encodeURIComponent('Please log in or create your account to continue with certification enrollment.')}`,
          { replace: true }
        );
      } else {
        setShowLevelModal(true);
      }
    }
  }, [searchParams, cert, user, id, navigate]);

  const loadCertification = async () => {
    try {
      setLoading(true);
      const res = await api.getCertificationById(id!);
      if (res.success && res.certification) {
        setCert(res.certification);
      }
    } catch (err) {
      console.error('Failed to load certification details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollClick = () => {
    if (!user) {
      navigate(
        `/login?redirect=${encodeURIComponent(`/certifications/${id}?enroll=true`)}&enroll=${cert?.id || id}&certName=${encodeURIComponent(cert?.name || '')}&message=${encodeURIComponent('Please log in or create your account to continue with certification enrollment.')}`
      );
      return;
    }
    setShowLevelModal(true);
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#F47716] mx-auto" />
        <p className="text-xs text-gray-500 mt-2">Loading certification program details...</p>
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#10264B]">Certification Not Found</h2>
        <p className="text-xs text-gray-500">The requested certification program could not be located.</p>
        <Link to="/certifications" className="text-xs font-semibold text-[#F47716] hover:underline">
          Return to All Certifications
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-[#F47716]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/certifications" className="hover:text-[#F47716]">Certifications</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#10264B] font-semibold">{cert.name}</span>
      </nav>

      {/* Program Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F47716] flex-shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 bg-orange-100 text-[#F47716] rounded">
                {cert.code}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded">
                {cert.level}
              </span>
              <span className="text-xs font-medium text-gray-400">• Domain: {cert.domain}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#10264B]">{cert.name}</h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">{cert.description}</p>
          </div>
        </div>

        {/* Enroll Callout */}
        <div className="md:text-right flex-shrink-0 space-y-2 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
          <p className="text-xs text-gray-400 font-medium">Standard Examination Fee</p>
          <p className="text-3xl font-black text-[#10264B]">₹{cert.examFee.toLocaleString('en-IN')}</p>
          <button
            onClick={handleEnrollClick}
            className="w-full md:w-auto px-8 py-3 bg-[#F47716] hover:bg-[#DC660E] text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Enroll Now &gt;
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Tab Navigation matching Image 3 #4 */}
          <div className="flex border-b border-gray-200 space-x-6 text-xs sm:text-sm font-semibold">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'syllabus', label: 'Syllabus' },
              { id: 'exam', label: 'Exam Details' },
              { id: 'prerequisites', label: 'Prerequisites' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#F47716] text-[#F47716] font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#10264B] mb-3">Key Learning Objectives</h3>
                  <div className="space-y-3">
                    {cert.learningObjectives.map((obj, i) => (
                      <div key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-base font-bold text-[#10264B] mb-2">Program Value</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Passing this examination awards the formal {cert.code} designation, demonstrating verified
                    operational proficiency. Credential holders are registered in the AICQB Global Registry and can share
                    direct QR verification badges on LinkedIn, resumes, and enterprise portfolios.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'syllabus' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#10264B]">Official Module Syllabus</h3>
                <div className="space-y-3">
                  {cert.syllabus.map((mod, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs sm:text-sm text-[#10264B]">{mod.title}</h4>
                        <span className="text-[11px] font-semibold text-[#F47716]">{mod.hours} Hours Content</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {mod.topics.map((t, ti) => (
                          <span key={ti} className="text-[11px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'exam' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#10264B]">Examination Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-gray-400 block font-medium">Exam Duration</span>
                    <span className="text-sm font-bold text-[#10264B]">{cert.duration}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-gray-400 block font-medium">Passing Threshold</span>
                    <span className="text-sm font-bold text-[#10264B]">{cert.passingCriteria}% Score</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-gray-400 block font-medium">Exam Format</span>
                    <span className="text-sm font-bold text-[#10264B]">{cert.examPattern}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-gray-400 block font-medium">Validity Period</span>
                    <span className="text-sm font-bold text-[#10264B]">{cert.validityYears} Years with renewal option</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'prerequisites' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#10264B]">Eligibility & Requirements</h3>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {cert.eligibility}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Enrollment Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4 sticky top-28">
            <h3 className="font-bold text-sm text-[#10264B] uppercase tracking-wider">Candidate Enrollment</h3>
            <div className="border-b border-gray-100 pb-4">
              <span className="text-3xl font-black text-[#10264B]">₹{cert.examFee.toLocaleString('en-IN')}</span>
              <span className="text-xs text-gray-400 ml-1">all inclusive</span>
            </div>

            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                <span>Immediate Syllabus & Learning Access</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                <span>1 Online Proctored Exam Attempt</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                <span>Verifiable Digital Certificate & Badge</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                <span>Razorpay Secured Instant Checkout</span>
              </li>
            </ul>

            <button
              onClick={handleEnrollClick}
              className="w-full py-3.5 bg-[#F47716] hover:bg-[#DC660E] text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Enroll in Program</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Select Exam Level Modal */}
      {showLevelModal && cert && (
        <SelectExamLevelModal
          certification={cert}
          onClose={() => {
            setShowLevelModal(false);
            if (searchParams.get('enroll')) {
              const newParams = new URLSearchParams(searchParams);
              newParams.delete('enroll');
              newParams.delete('certName');
              newParams.delete('message');
              setSearchParams(newParams, { replace: true });
            }
          }}
          onContinue={(selectedLevel) => {
            setEnrollLevelData(selectedLevel);
            setShowLevelModal(false);
            setShowCheckout(true);
          }}
        />
      )}

      {/* Razorpay Modal Trigger */}
      {showCheckout && cert && (
        <RazorpayModal
          certificationId={cert.id}
          certificationName={cert.name}
          certificationCode={enrollLevelData?.code || cert.code}
          certificationLevel={enrollLevelData?.levelName || cert.level}
          amount={enrollLevelData?.amount ?? cert.examFee}
          amountUSD={enrollLevelData?.amountUSD ?? cert.examFeeUSD}
          currency={cert.currency}
          onSuccess={() => {
            setShowCheckout(false);
            setEnrollLevelData(null);
            navigate(`/portal/exams?enrolled=${encodeURIComponent(cert.name)}`);
          }}
          onClose={() => {
            setShowCheckout(false);
            setEnrollLevelData(null);
            if (searchParams.get('enroll')) {
              const newParams = new URLSearchParams(searchParams);
              newParams.delete('enroll');
              newParams.delete('certName');
              newParams.delete('message');
              setSearchParams(newParams, { replace: true });
            }
          }}
        />
      )}
    </div>
  );
};

