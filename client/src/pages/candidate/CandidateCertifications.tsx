import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Certification, Certificate } from '../../types';
import { RazorpayModal } from '../../components/RazorpayModal';
import { CertificateModal } from '../../components/CertificateModal';
import {
  Search,
  Award,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Sparkles,
  CalendarCheck,
  FileCheck2,
  ExternalLink,
  BookOpen,
  X,
} from 'lucide-react';

export const CandidateCertifications: React.FC = () => {
  const navigate = useNavigate();

  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [activeTab, setActiveTab] = useState<'all' | 'enrolled' | 'completed'>('all');

  // Candidate status (Enrolled & Completed)
  const [enrolledCertIds, setEnrolledCertIds] = useState<string[]>([]);
  const [completedCertIds, setCompletedCertIds] = useState<string[]>([]);
  const [candidateCertificates, setCandidateCertificates] = useState<Certificate[]>([]);

  // Modals
  const [selectedForEnroll, setSelectedForEnroll] = useState<Certification | null>(null);
  const [selectedCertificateModal, setSelectedCertificateModal] = useState<Certificate | null>(null);
  const [enrolledSuccessBanner, setEnrolledSuccessBanner] = useState<{ name: string; code: string } | null>(null);

  useEffect(() => {
    loadData();
  }, [searchTerm, selectedDomain]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [certRes, statusRes] = await Promise.all([
        api.getCertifications({
          search: searchTerm,
          domain: selectedDomain === 'All Categories' ? 'All' : selectedDomain,
        }).catch(() => ({ success: false, certifications: [] })),
        api.getCandidateCertificationStatus().catch(() => ({ success: false, enrolledCertIds: [], completedCertIds: [] })),
      ]);

      if (certRes.success && Array.isArray(certRes.certifications)) {
        setCertifications(certRes.certifications);
      }

      if (statusRes.success) {
        setEnrolledCertIds(statusRes.enrolledCertIds || []);
        setCompletedCertIds(statusRes.completedCertIds || []);
        if (Array.isArray(statusRes.certificates)) {
          setCandidateCertificates(statusRes.certificates);
        }
      }
    } catch (err) {
      console.error('Failed to load certifications data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Dynamically derive category domains from active catalog
  const domainOptions = [
    'All Categories',
    ...Array.from(new Set(certifications.map((c) => c.domain).filter(Boolean))),
  ];

  // Helper matchers
  const isCertEnrolled = (cert: Certification) => {
    return enrolledCertIds.includes(cert.id) || enrolledCertIds.includes(cert.code);
  };

  const isCertCompleted = (cert: Certification) => {
    return completedCertIds.includes(cert.id) || completedCertIds.includes(cert.code);
  };

  const getCertificateForCert = (cert: Certification) => {
    return candidateCertificates.find(
      (c) => c.certificationId === cert.id || c.certificationCode === cert.code
    );
  };

  // Dynamic filter collections
  const enrolledCerts = certifications.filter((c) => isCertEnrolled(c));
  const completedCerts = certifications.filter((c) => isCertCompleted(c));

  const displayCertifications =
    activeTab === 'enrolled'
      ? enrolledCerts
      : activeTab === 'completed'
        ? completedCerts
        : certifications;

  return (
    <div className="space-y-6">
      {/* Title matching Image 2 #3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#10264B]">Certifications</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Explore and enroll in AICQB professional certifications.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Catalog: {certifications.length} Programs Available
          </span>
        </div>
      </div>

      {/* Real-time Enrolled & Exam Added Alert Banner */}
      {enrolledSuccessBanner && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-950">
                Payment Confirmed & Exam Scheduled!
              </p>
              <p className="text-xs text-emerald-800">
                You are enrolled in <span className="font-bold">{enrolledSuccessBanner.name} ({enrolledSuccessBanner.code})</span>. The examination has been automatically added to your <strong>My Exams</strong> section!
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => navigate('/portal/exams')}
              className="px-4 py-2 bg-[#10264B] hover:bg-[#1E3A6E] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>View in My Exams</span>
              <ChevronRight className="w-4 h-4 text-[#F47716]" />
            </button>
            <button
              onClick={() => setEnrolledSuccessBanner(null)}
              className="p-1.5 text-emerald-700 hover:text-emerald-900 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters matching Image 2 #3 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search certifications by name, code, domain..."
              className="w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F47716]"
            />
          </div>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-3.5 py-2 text-xs bg-slate-50 border border-gray-300 rounded-lg focus:outline-none font-medium text-gray-700 sm:w-64 cursor-pointer"
          >
            {domainOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Tab Pills matching Image 2 #3 - 100% Dynamic Counts & Real Filtering */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'all'
              ? 'bg-[#F47716] text-white shadow-sm'
              : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
              }`}
          >
            All Certifications ({certifications.length})
          </button>
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${activeTab === 'enrolled'
              ? 'bg-[#10264B] text-white shadow-sm'
              : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
              }`}
          >
            <span>Enrolled</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'enrolled' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                }`}
            >
              {enrolledCerts.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${activeTab === 'completed'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
              }`}
          >
            <span>Completed</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'completed' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}
            >
              {completedCerts.length}
            </span>
          </button>
        </div>
      </div>

      {/* Certification Rows matching Image 2 #3 */}
      {loading ? (
        <div className="py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#F47716] mx-auto" />
          <p className="text-xs text-gray-500 mt-2">Loading catalog...</p>
        </div>
      ) : displayCertifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F47716] flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-[#10264B]">
            {activeTab === 'enrolled'
              ? 'No enrolled certifications yet'
              : activeTab === 'completed'
                ? 'No completed certifications yet'
                : 'No matching certifications found'}
          </h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            {activeTab === 'enrolled'
              ? 'Browse the All Certifications catalog and click "Enroll Now" to register for international exams.'
              : activeTab === 'completed'
                ? 'Take your scheduled examinations to pass and unlock verifiable international digital credentials.'
                : 'Try clearing your search query or selecting "All Categories" from the domain filter.'}
          </p>
          {activeTab !== 'all' && (
            <button
              onClick={() => setActiveTab('all')}
              className="px-4 py-2 bg-[#F47716] hover:bg-[#DC660E] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Browse All Certifications
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3.5">
          {displayCertifications.map((cert) => {
            const completed = isCertCompleted(cert);
            const enrolled = isCertEnrolled(cert);
            const matchedCertificate = getCertificateForCert(cert);

            return (
              <div
                key={cert.id}
                className={`bg-white rounded-xl border p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${completed
                  ? 'border-emerald-200 bg-emerald-50/10'
                  : enrolled
                    ? 'border-blue-200 bg-blue-50/10'
                    : 'border-gray-200'
                  }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${completed
                      ? 'bg-emerald-100 text-emerald-700'
                      : enrolled
                        ? 'bg-blue-100 text-[#10264B]'
                        : 'bg-slate-100 text-[#10264B]'
                      }`}
                  >
                    <Award className="w-6 h-6 text-[#F47716]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-[#10264B]">{cert.name}</h3>
                      <span className="text-[11px] font-mono text-gray-500 font-semibold">
                        ({cert.code})
                      </span>
                      {completed ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Certified ✓</span>
                        </span>
                      ) : enrolled ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                          <CalendarCheck className="w-3 h-3 text-blue-600" />
                          <span>Enrolled</span>
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500">
                      <span className="font-medium text-gray-700">{cert.domain}</span>
                      <span>•</span>
                      <span>{cert.duration}</span>
                      <span>•</span>
                      <span className="text-green-600 font-medium">
                        Pass: {cert.passingCriteria}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Level, Price & Action matching Image 2 #3 */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-[11px] font-semibold rounded-md border border-purple-200">
                    {cert.level}
                  </span>

                  <div className="text-right">
                    <span className="text-base font-black text-[#10264B]">
                      ₹{cert.examFee.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Dynamic Action Button depending on Candidate Status */}
                  {completed ? (
                    <button
                      onClick={() => {
                        if (matchedCertificate) {
                          setSelectedCertificateModal(matchedCertificate);
                        } else {
                          navigate('/portal/certificates');
                        }
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center space-x-1 cursor-pointer"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>View Certificate &gt;</span>
                    </button>
                  ) : enrolled ? (
                    <button
                      onClick={() => navigate('/portal/exams')}
                      className="px-4 py-2 bg-[#10264B] hover:bg-[#1E3A6E] text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center space-x-1 cursor-pointer"
                    >
                      <CalendarCheck className="w-3.5 h-3.5 text-[#F47716]" />
                      <span>Schedule Exam &gt;</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedForEnroll(cert)}
                      className="px-4 py-2 bg-[#F47716] hover:bg-[#DC660E] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      Enroll Now &gt;
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Razorpay Checkout Trigger */}
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
            const enrolledItem = selectedForEnroll;
            setSelectedForEnroll(null);
            if (enrolledItem) {
              setEnrolledSuccessBanner({
                name: enrolledItem.name,
                code: enrolledItem.code,
              });
            }
            loadData();
          }}
          onClose={() => setSelectedForEnroll(null)}
        />
      )}

      {/* Full Certificate Modal */}
      {selectedCertificateModal && (
        <CertificateModal
          certificate={selectedCertificateModal}
          onClose={() => setSelectedCertificateModal(null)}
        />
      )}
    </div>
  );
};
