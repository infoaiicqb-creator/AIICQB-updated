import React from 'react';
import { Lock, Shield, Eye, Database, FileCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#F7F9FC] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-[#10264B] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            <Lock className="w-4 h-4 text-[#F47716]" />
            <span>Candidate Data Privacy & Security</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10264B] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            How AICQB collects, safeguards, and handles candidate information, examination records, and verification credentials.
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
              <span>Information We Collect</span>
            </h2>
            <p>
              To provide international certification standards and authenticated credentials, AICQB collects the following categories of information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
              <li><strong>Candidate Profile Data:</strong> Full legal name, email address, phone number, physical address, and unique candidate ID.</li>
              <li><strong>Academic & Professional Details:</strong> Educational background, job title, industry domain, and enrolled certification programs.</li>
              <li><strong>Examination Records:</strong> Exam start/end timestamps, question response logs, scores, grade metrics, and verification hash.</li>
              <li><strong>Billing & Transaction Details:</strong> Invoices, payment transaction IDs, and Razorpay order identifiers (AICQB does not store sensitive card or bank details directly).</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">2</span>
              <span>How We Use Your Information</span>
            </h2>
            <p>
              Your data is collected and processed strictly for legitimate operational purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
              <li>Administering and grading proctored online examinations.</li>
              <li>Generating verifiable cryptographic certificates with official QR codes.</li>
              <li>Allowing prospective employers, institutions, and verifying parties to validate certificate authenticity via public registry.</li>
              <li>Delivering critical account updates, examination schedules, and digital receipts.</li>
              <li>Maintaining comprehensive audit logs to ensure testing integrity and regulatory compliance.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Data Protection & Security Infrastructure</span>
            </h2>
            <p>
              We implement industry-standard technical and organizational security protocols, including AES-256 data encryption in transit
              (TLS 1.3) and at rest, zero-trust cloud infrastructure backed by Google Firebase and Firestore, strict role-based access controls
              (RBAC), and automated threat detection. We do not sell or monetize personal data under any circumstances.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">4</span>
              <span>Public Certificate Verification Registry</span>
            </h2>
            <p>
              To uphold global qualification standards, certificates issued by AICQB are public verifiable documents. Scanning the
              QR code or querying the verification engine displays the candidate's name, certification title, credential number, issue date,
              and validation status. Candidates may request privacy masking of specific personal markers through their candidate portal settings.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#10264B] flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-[#10264B] text-white flex items-center justify-center text-xs font-bold">5</span>
              <span>Candidate Rights & Data Management</span>
            </h2>
            <p>
              Under applicable data protection frameworks (including India's Digital Personal Data Protection Act and global privacy standards),
              you have the right to access, rectify, or request an export of your stored profile information. To submit a data request, please
              contact our Data Privacy Officer.
            </p>
          </section>

          {/* Contact Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-bold text-[#10264B] text-sm flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-[#F47716]" />
                <span>Data Privacy Inquiries</span>
              </h3>
              <p className="text-xs text-gray-500">
                Contact our Data Protection Officer at <a href="mailto:privacy@aiicqb.org" className="text-[#F47716] font-semibold underline">privacy@aiicqb.org</a>
              </p>
            </div>
            <Link
              to="/contact"
              className="px-4 py-2 bg-[#10264B] text-white rounded-xl text-xs font-bold hover:bg-[#0A1D37] transition-colors"
            >
              Contact Advisory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
