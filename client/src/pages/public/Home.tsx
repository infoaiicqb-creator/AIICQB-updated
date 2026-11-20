import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Certification } from '../../types';
import {
  Award,
  Globe2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Search,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import {
  WiproLogo,
  CapgeminiLogo,
  InfosysLogo,
  TelusLogo,
  DnbLogo,
  AwsLogo,
  IrisSoftwareLogo,
  TcsLogo,
  CognizantLogo,
  AccentureLogo,
  HclTechLogo,
  MicrosoftLogo,
} from '../../components/PartnerLogos';

export const Home: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      setLoading(true);
      const res = await api.getCertifications();
      if (res.success) {
        setCertifications(res.certifications);
      }
    } catch (err) {
      console.error('Failed to load certifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const partnerLogos = [
    { name: 'Wipro', label: 'wipro' },
    { name: 'Capgemini', label: 'Capgemini' },
    { name: 'Infosys', label: 'Infosys' },
    { name: 'TELUS', label: 'TELUS' },
    { name: 'DNB', label: 'DNB' },
    { name: 'AWS', label: 'aws' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section matching Image 3 #1 */}
      <section className="relative bg-gradient-to-r from-[#10264B] via-[#152e5a] to-[#0d1e38] text-white py-16 lg:py-24 overflow-hidden border-b-4 border-[#F47716]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-semibold tracking-wide text-orange-300">
                <Sparkles className="w-3.5 h-3.5 text-[#F47716]" />
                <span>AI International Certification & Qualification Board</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Globally Recognized <span className="text-[#F47716]">Professional</span> Certifications
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Validate your skills, advance your career, and become industry ready with AICQB credentials across
                Artificial Intelligence, Quality Engineering, Cloud, Data Science, and Modern Technology disciplines.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/certifications"
                  className="px-6 py-3.5 rounded-lg text-sm font-bold text-white bg-[#F47716] hover:bg-[#DC660E] shadow-lg hover:shadow-orange-500/30 transition-all flex items-center space-x-2"
                >
                  <span>Explore Certifications</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/verify"
                  className="px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#F47716]" />
                  <span>Verify Certificate</span>
                </Link>
              </div>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-700/60 text-xs">
                <div className="flex items-center space-x-2 text-slate-200">
                  <Globe2 className="w-4 h-4 text-[#F47716] flex-shrink-0" />
                  <span>Global Standards</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#F47716] flex-shrink-0" />
                  <span>Industry Relevant</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-200">
                  <BookOpen className="w-4 h-4 text-[#F47716] flex-shrink-0" />
                  <span>Online Exams</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-200">
                  <Award className="w-4 h-4 text-[#F47716] flex-shrink-0" />
                  <span>Digital Certificate</span>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl max-w-md w-full text-center space-y-4">
                <div className="bg-white px-4 py-3 rounded-2xl shadow-lg max-w-fit mx-auto">
                  <img src="/aicqb-logo.png" alt="AICQB Board" className="h-18 sm:h-20 w-auto object-contain" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">AICQB Global Registry</h3>
                  <p className="text-xs text-slate-300">
                    Empowering technical professionals across 40+ countries with independent, verifiable qualifications.
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700 text-left space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Active Domain Programs:</span>
                    <span className="text-white font-semibold">16 Domains</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Independent Proctored Engine:</span>
                    <span className="text-green-400 font-semibold">Live Online</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Cryptographic Verification:</span>
                    <span className="text-[#F47716] font-semibold">QR Authenticated</span>
                  </div>
                </div>
                <Link
                  to="/signup"
                  className="block w-full py-2.5 bg-gradient-to-r from-[#F47716] to-[#DC660E] text-white font-bold text-xs rounded-lg shadow hover:opacity-95 transition-opacity"
                >
                  Create Candidate Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Certifications Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#F47716] uppercase tracking-wider">Multi-Industry Catalog</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10264B] mt-1">
              Explore Featured Certifications
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
              From Artificial Intelligence and Playwright Automation to Cybersecurity and Cloud Computing.
            </p>
          </div>
          <Link
            to="/certifications"
            className="inline-flex items-center text-xs font-bold text-[#10264B] hover:text-[#F47716] transition-colors"
          >
            <span>View Full Catalogue</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Cert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.slice(0, 3).map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
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

                <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                    <span>Duration: {cert.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                    <span>Passing Criteria: {cert.passingCriteria}%</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Exam Fee</span>
                  <span className="text-lg font-black text-[#10264B]">₹{cert.examFee.toLocaleString('en-IN')}</span>
                </div>
                <Link
                  to={`/certifications/${cert.code || cert.id}`}
                  className="px-4 py-2 bg-[#F47716] hover:bg-[#DC660E] text-white font-semibold text-xs rounded-md shadow-sm transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verify Certificate Banner matching Image 3 #7 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#10264B] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-slate-700 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 bg-[#F47716] text-white font-bold text-xs uppercase tracking-wider rounded">
              Online Credential Registry
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Verify Any AICQB Certificate Instantly
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Employers, institutions, and candidates can validate certificate authenticity in real time against the
              official AICQB central verification database.
            </p>
            <div className="pt-2">
              <Link
                to="/verify"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-[#10264B] font-bold text-xs rounded-lg hover:bg-gray-100 shadow transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#F47716]" />
                <span>Go to Certificate Verification Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section matching Image 3 #10 in FULL COLOR */}
      <section className="bg-white py-14 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <div className="space-y-2">
            <span className="inline-block text-sm sm:text-base md:text-lg font-black uppercase tracking-wider text-[#F47716]">
              Global Industry Collaboration
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#10264B] tracking-tight">
              Collaborating with industry leaders, training institutes and organizations worldwide
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 items-center justify-items-center">
            {/* 1. Wipro */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-gray-100 flex items-center justify-center h-20 w-full hover:shadow-md transition-all hover:bg-white hover:border-orange-300 group">
              <WiproLogo className="h-8 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
            </div>
            {/* 2. Capgemini */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-gray-100 flex items-center justify-center h-20 w-full hover:shadow-md transition-all hover:bg-white hover:border-orange-300 group">
              <CapgeminiLogo className="h-8 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
            </div>
            {/* 3. Infosys */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-gray-100 flex items-center justify-center h-20 w-full hover:shadow-md transition-all hover:bg-white hover:border-orange-300 group">
              <InfosysLogo className="h-8 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
            </div>
            {/* 4. TELUS */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-gray-100 flex items-center justify-center h-20 w-full hover:shadow-md transition-all hover:bg-white hover:border-orange-300 group">
              <TelusLogo className="h-8 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
            </div>
            {/* 5. DNB */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-gray-100 flex items-center justify-center h-20 w-full hover:shadow-md transition-all hover:bg-white hover:border-orange-300 group">
              <DnbLogo className="h-8 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
            </div>
            {/* 6. AWS */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-gray-100 flex items-center justify-center h-20 w-full hover:shadow-md transition-all hover:bg-white hover:border-orange-300 group">
              <AwsLogo className="h-8 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
            </div>
            {/* 7. Iris Software */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-gray-100 flex items-center justify-center h-20 w-full hover:shadow-md transition-all hover:bg-white hover:border-orange-300 group">
              <IrisSoftwareLogo className="h-8 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
            </div>
            {/* 8. TCS */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-gray-100 flex items-center justify-center h-20 w-full hover:shadow-md transition-all hover:bg-white hover:border-orange-300 group">
              <TcsLogo className="h-8 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
            </div>
            {/* 9. Cognizant */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-gray-100 flex items-center justify-center h-20 w-full hover:shadow-md transition-all hover:bg-white hover:border-orange-300 group">
              <CognizantLogo className="h-8 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
            </div>
            {/* 10. Accenture */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-gray-100 flex items-center justify-center h-20 w-full hover:shadow-md transition-all hover:bg-white hover:border-orange-300 group">
              <AccentureLogo className="h-8 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
            </div>
            {/* 11. HCLTech */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-gray-100 flex items-center justify-center h-20 w-full hover:shadow-md transition-all hover:bg-white hover:border-orange-300 group">
              <HclTechLogo className="h-8 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
            </div>
            {/* 12. Microsoft */}
            <div className="p-4 bg-slate-50/70 rounded-xl border border-gray-100 flex items-center justify-center h-20 w-full hover:shadow-md transition-all hover:bg-white hover:border-orange-300 group">
              <MicrosoftLogo className="h-8 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

