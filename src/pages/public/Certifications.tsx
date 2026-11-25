import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Certification } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { RazorpayModal } from '../../components/RazorpayModal';
import { SelectExamLevelModal } from '../../components/SelectExamLevelModal';
import { Search, Filter, CheckCircle2, ChevronRight, Loader2, Award } from 'lucide-react';

export const Certifications: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedDomain, setSelectedDomain] = useState(searchParams.get('domain') || 'All');
  const [selectedForLevelModal, setSelectedForLevelModal] = useState<Certification | null>(null);
  const [selectedForEnroll, setSelectedForEnroll] = useState<any>(null);

  const domainTabs = [
    { label: 'All', value: 'All' },
    { label: 'Testing', value: 'Software Testing' },
    { label: 'AI & Data', value: 'AI & Machine Learning' },
    { label: 'Development', value: 'Software Engineering' },
    { label: 'Cybersecurity', value: 'Cybersecurity' },
    { label: 'Cloud', value: 'Cloud Computing' },
    { label: 'Business', value: 'Business & Management' },
  ];

  useEffect(() => {
    const domainFromUrl = searchParams.get('domain');
    if (domainFromUrl !== null) {
      setSelectedDomain(domainFromUrl || 'All');
    }
    const qFromUrl = searchParams.get('q');
    if (qFromUrl !== null) {
      setSearchTerm(qFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    loadCertifications();
  }, [selectedDomain, searchTerm]);

  // Handle post-login redirection with preserved certification
  useEffect(() => {
    const enrollId = searchParams.get('enroll');
    if (enrollId && certifications.length > 0) {
      const matched = certifications.find((c) => c.id === enrollId || c.code === enrollId);
      if (matched) {
        if (!user) {
          const returnUrl = `/certifications?enroll=${matched.id}`;
          navigate(
            `/login?redirect=${encodeURIComponent(returnUrl)}&enroll=${matched.id}&certName=${encodeURIComponent(matched.name)}&message=${encodeURIComponent('Please log in or create your account to continue with certification enrollment.')}`,
            { replace: true }
          );
        } else {
          setSelectedForLevelModal(matched);
        }
      }
    }
  }, [searchParams, certifications, user, navigate]);

  const handleEnrollClick = (cert: Certification) => {
    if (!user) {
      const returnUrl = `/certifications?enroll=${cert.id}`;
      navigate(
        `/login?redirect=${encodeURIComponent(returnUrl)}&enroll=${cert.id}&certName=${encodeURIComponent(cert.name)}&message=${encodeURIComponent('Please log in or create your account to continue with certification enrollment.')}`
      );
      return;
    }
    setSelectedForLevelModal(cert);
  };

  const loadCertifications = async () => {
    try {
      setLoading(true);
      const res = await api.getCertifications({
        domain: selectedDomain,
        search: searchTerm,
      });
      if (res.success) {
        setCertifications(res.certifications);
      }
    } catch (err) {
      console.error('Failed to load certifications:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-[#10264B]">Explore Our Certifications</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Industry-aligned professional certifications for IT, AI, Testing, Data and more.
        </p>
      </div>

      {/* Search & Domain Filter Bar */}
      <div className="space-y-4">
        <div className="relative max-w-2xl mx-auto">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search certifications (e.g., Playwright, AI, Testing, Cloud)..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#F47716]"
          />
        </div>

        {/* Filter Pills matching Image 3 #3 */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {domainTabs.map((tab) => {
            const active = selectedDomain === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setSelectedDomain(tab.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#F47716] text-white shadow-sm'
                    : 'bg-white border border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Certification Catalog Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#F47716] mx-auto" />
          <p className="text-xs text-gray-500 mt-2">Loading certification catalog...</p>
        </div>
      ) : certifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center max-w-md mx-auto space-y-3">
          <Award className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-bold text-gray-700">No certifications found</h3>
          <p className="text-xs text-gray-500">Try adjusting your search terms or selecting a different category filter.</p>
          <button
            onClick={() => {
              setSelectedDomain('All');
              setSearchTerm('');
            }}
            className="text-xs font-semibold text-[#F47716] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 bg-orange-50 text-[#F47716] rounded-md font-mono">
                    {cert.code}
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                    {cert.level}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#10264B] leading-snug">{cert.name}</h3>
                  <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{cert.description}</p>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                    <span>Domain: {cert.domain}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                    <span>Format: {cert.duration} • Online Exam</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Exam Fee</span>
                  <span className="text-xl font-black text-[#10264B]">₹{cert.examFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/certifications/${cert.code || cert.id}`}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-md transition-colors"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleEnrollClick(cert)}
                    className="px-4 py-2 bg-[#F47716] hover:bg-[#DC660E] text-white font-bold text-xs rounded-md shadow-sm transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <span>Enroll Now &gt;</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Select Exam Level Modal */}
      {selectedForLevelModal && (
        <SelectExamLevelModal
          certification={selectedForLevelModal}
          onClose={() => setSelectedForLevelModal(null)}
          onContinue={(selectedLevel) => {
            const targetCert = selectedForLevelModal;
            setSelectedForLevelModal(null);
            setSelectedForEnroll({
              ...targetCert,
              level: selectedLevel.levelName,
              code: selectedLevel.code,
              examFee: selectedLevel.amount,
              examFeeUSD: selectedLevel.amountUSD,
              duration: `${selectedLevel.durationMinutes} Minutes`,
              mcqs: selectedLevel.mcqs,
            });
          }}
        />
      )}

      {/* Direct Razorpay Checkout Modal (Active when Logged In) */}
      {selectedForEnroll && (
        <RazorpayModal
          certificationId={selectedForEnroll.id}
          certificationName={selectedForEnroll.name}
          certificationCode={selectedForEnroll.code}
          certificationLevel={selectedForEnroll.level}
          amount={selectedForEnroll.examFee}
          amountUSD={selectedForEnroll.examFeeUSD}
          currency={selectedForEnroll.currency}
          onSuccess={() => {
            const enrolled = selectedForEnroll;
            setSelectedForEnroll(null);
            navigate(`/portal/exams?enrolled=${encodeURIComponent(enrolled.name)}`);
          }}
          onClose={() => {
            setSelectedForEnroll(null);
            // Clean up searchParams if enroll was in URL
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

