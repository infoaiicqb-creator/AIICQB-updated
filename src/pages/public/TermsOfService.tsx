import React from 'react';
import { ShieldCheck, FileText, Scale, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsOfService: React.FC = () => {
  return (
    <div className="bg-[#F7F9FC] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-[#F47716] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            <Scale className="w-4 h-4" />
            <span>Official Legal Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10264B] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Governing the use of AICQB examinations, certification standards, candidate portals, and professional credential services.
          </p>
          <p className="text-xs text-gray-400">
            Last Updated & Effective Date: November 24, 2026
          </p>
        </div>

        {/* Card Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-10 space-y-8 text-sm text-gray-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">1</span>
              <span>Acceptance of Terms</span>
            </h2>
            <p>
              By accessing, browsing, registering on, or utilizing the services provided by the{' '}
              <strong>AI International Certification & Qualification Board (AICQB)</strong>, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service, along with our Privacy Policy and Examination Code of Ethics.
              If you do not agree, you must discontinue the use of our services immediately.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">2</span>
              <span>Candidate Eligibility & Account Integrity</span>
            </h2>
            <p>
              Candidates must provide accurate, current, and complete information during registration. You are solely responsible for
              safeguarding your account credentials. Impersonation, falsification of identity, or sharing portal access with unauthorized
              parties will result in immediate suspension, exam disqualification, and permanent credential forfeiture.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
              <li>Candidates must be at least 18 years old or possess written parental/guardian consent.</li>
              <li>Government-issued photo identification is required for proctored examination validation.</li>
              <li>One candidate may maintain only one verified AICQB candidate ID.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Examination & Certification Standards</span>
            </h2>
            <p>
              AICQB awards certifications strictly upon candidate demonstration of competence meeting or exceeding established benchmark
              criteria (mandatory 70% passing standard). Examinations are administered through our timed, proctored online testing
              engine. Candidates agree to submit answers generated solely through their own knowledge and skills without automated,
              external, or unauthorized third-party intervention.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">4</span>
              <span>Payment Terms & Refund Policy</span>
            </h2>
            <p>
              All certification registration and examination fees are processed securely through our authorized payment partner,{' '}
              <strong>Razorpay</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
              <li>Fees must be settled in full before examination scheduling and access to study modules are unlocked.</li>
              <li>Refund requests submitted prior to launching an examination session will be evaluated within 7 business days.</li>
              <li>Once an examination attempt has been initiated or a certificate issued, fees become non-refundable.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">5</span>
              <span>Intellectual Property & Credential Verification</span>
            </h2>
            <p>
              All courseware, examination questions, syllabi, software interfaces, digital certificate templates, gold seals, and
              the AICQB trademark are the exclusive intellectual property of AICQB. Verified certificates display a tamper-resistant
              cryptographic QR code verifiable via our global registry at <code>aiicqb.org/verify</code>. Any unauthorized duplication or
              alteration constitutes criminal forgery.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">6</span>
              <span>Limitation of Liability & Jurisdiction</span>
            </h2>
            <p>
              AICQB does not guarantee employment or specific career outcomes resulting from certification attainment. In no event shall
              AICQB be liable for indirect, incidental, or consequential damages. These Terms shall be governed by and construed under
              the laws of India, with exclusive jurisdiction in the competent courts of Pune, Maharashtra.
            </p>
          </section>

          {/* Contact Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-[#10264B] text-sm flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-[#F47716]" />
                <span>Questions regarding our Terms?</span>
              </h3>
              <p className="text-xs text-gray-500">
                Contact our legal advisory team at <a href="mailto:legal@aiicqb.org" className="text-[#F47716] font-semibold underline">legal@aiicqb.org</a>
              </p>
            </div>
            <Link
              to="/contact"
              className="px-4 py-2 bg-[#10264B] text-white rounded-xl text-xs font-bold hover:bg-[#0A1D37] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
