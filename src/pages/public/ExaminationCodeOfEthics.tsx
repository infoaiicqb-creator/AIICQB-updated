import React from 'react';
import { Award, ShieldAlert, CheckCircle2, BookOpen, AlertTriangle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExaminationCodeOfEthics: React.FC = () => {
  return (
    <div className="bg-[#F7F9FC] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-[#F47716] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            <Award className="w-4 h-4" />
            <span>Academic & Professional Integrity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10264B] tracking-tight">
            Examination Code of Ethics
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Mandatory standards of conduct, honesty, and integrity governing all AICQB candidates, proctored examinations, and certified professionals.
          </p>
          <p className="text-xs text-gray-400">
            Adopted & Standardized: AI International Certification & Qualification Board
          </p>
        </div>

        {/* Card Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-10 space-y-8 text-sm text-gray-700 leading-relaxed">
          {/* Core Creed */}
          <div className="bg-orange-50/70 border-l-4 border-[#F47716] p-5 rounded-r-2xl space-y-2">
            <h3 className="font-bold text-[#10264B] text-base">The AICQB Honor Pledge</h3>
            <p className="text-xs sm:text-sm text-gray-700 italic">
              "As a candidate and credentialed professional of the AI International Certification & Qualification Board, I solemnly pledge
              to uphold the highest standards of professional ethics, truthfulness, and intellectual honesty. I affirm that my examination
              responses reflect solely my own competence and preparation."
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">1</span>
              <span>Proctored Online Testing Rules</span>
            </h2>
            <p>
              Candidates participating in AICQB online examinations must comply strictly with the following technical and operational rules:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
              <li><strong>Solo Testing Environment:</strong> The examination must be taken in a quiet, private room with no other individuals present or audible.</li>
              <li><strong>No Unauthorized Aids:</strong> Textbooks, notes, secondary screens, mobile phones, smartwatches, recording hardware, or external reference materials are strictly prohibited.</li>
              <li><strong>No Automated or AI Intermediaries:</strong> Using automated scripts, generative AI assistants, browser extensions, remote desktop access, or screen-sharing tools during an active session is grounds for immediate termination.</li>
              <li><strong>Lockdown & Tab Focus:</strong> Navigating away from the active examination window or switching tabs may trigger automated proctoring alerts and exam invalidation.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">2</span>
              <span>Prohibition of Question Bank Disclosure (NDA)</span>
            </h2>
            <p>
              All AICQB assessment questions, case scenarios, code snippets, multiple-choice items, and evaluation rubrics are confidential,
              proprietary examination materials.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
              <li>Candidates must not memorize, copy, transcribe, photograph, record, or distribute examination questions by any medium.</li>
              <li>Sharing or participating in unauthorized "exam dump" websites or online study groups disclosing real exam questions constitutes actionable copyright infringement.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Disciplinary Actions & Credential Revocation</span>
            </h2>
            <p>
              AICQB maintains an uncompromising zero-tolerance policy regarding academic dishonesty, fraud, and misconduct. If a violation is substantiated:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-1 text-xs">
                <p className="font-bold text-red-800 flex items-center space-x-1">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  <span>Immediate Invalidation</span>
                </p>
                <p className="text-red-700">Exam attempt score set to 0% with forfeiture of all registration and assessment fees.</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-1 text-xs">
                <p className="font-bold text-red-800 flex items-center space-x-1">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Permanent Blacklist</span>
                </p>
                <p className="text-red-700">Permanent ban from retaking any AICQB certification worldwide and revocation of prior credentials.</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">4</span>
              <span>Certified Professional Standards</span>
            </h2>
            <p>
              Upon achieving AICQB certification, professionals are expected to maintain professional integrity throughout their industry careers:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
              <li>Represent credentials, grades, and certification numbers accurately on resumes, LinkedIn, and public platforms without misrepresentation.</li>
              <li>Commit to responsible and ethical artificial intelligence, software quality, and data engineering practices.</li>
              <li>Participate in ongoing professional education and re-certification cycles to uphold modern industry benchmarks.</li>
            </ul>
          </section>

          {/* Section 5: Reporting Ethics Violations */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-[#10264B] text-sm flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-[#F47716]" />
                <span>Report an Ethics Violation</span>
              </h3>
              <p className="text-xs text-gray-500">
                To report fraud, proxy test-taking, or unauthorized question dissemination, email our Ethics Committee at <a href="mailto:ethics@aiicqb.org" className="text-[#F47716] font-semibold underline">ethics@aiicqb.org</a> (confidentiality protected).
              </p>
            </div>
            <Link
              to="/contact"
              className="px-4 py-2 bg-[#10264B] text-white rounded-xl text-xs font-bold hover:bg-[#0A1D37] transition-colors"
            >
              Contact Committee
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
