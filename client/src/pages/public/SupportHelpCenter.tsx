import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Ticket, Mail, ChevronDown, ChevronUp, ShieldCheck, ArrowRight } from 'lucide-react';

export const SupportHelpCenter: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I register and enroll for a certification?',
      a: 'Browse the Certifications catalogue, select your desired program, click "Enroll Now", and complete the secure Razorpay payment. Your candidate account will immediately reflect the active enrollment with full syllabus access.',
    },
    {
      q: 'How does the online proctored exam work?',
      a: 'Once enrolled, navigate to "My Exams" in your Candidate Portal and choose an exam date/time. When your slot opens, click "Join Exam" to enter the secure browser-based testing engine with live timer countdown, automated question palette, and code sandbox.',
    },
    {
      q: 'How and when do I receive my certificate?',
      a: 'Examinations with score 70% and above automatically pass. The system instantly generates an official AICQB Professional Certificate featuring unique Certificate ID (e.g. AICQB-AI-2026-000123), verifiable QR code, and signatures. You can download the PDF or share the verification link immediately.',
    },
    {
      q: 'What is the retake policy if I score below 70%?',
      a: 'Candidates who do not meet the 70% score threshold can review syllabus feedback and schedule a retake directly from "My Exams" after a recommended 48-hour study interval.',
    },
    {
      q: 'Can employers verify my certificate without an account?',
      a: 'Yes. Anyone can navigate to the public Certificate Verification portal at /verify, enter your unique Certificate ID or scan your certificate QR code, and immediately view verified authenticity, issue date, and credential status.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#F47716] uppercase tracking-wider">Candidate Care</span>
        <h1 className="text-3xl font-extrabold text-[#10264B]">Help Center & Support</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Get answers to common queries, raise a support ticket, or contact our support team.
        </p>
      </div>

      {/* 3 Shortcut Cards matching Image 3 #13 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#10264B] flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">FAQs</h3>
          <p className="text-xs text-gray-500">Find quick answers regarding registration, exams, and certificates.</p>
        </div>

        <Link
          to="/portal/support"
          className="bg-white p-6 rounded-xl border border-gray-200 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow block group"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#F47716] flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
            <Ticket className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">Raise a Ticket</h3>
          <p className="text-xs text-gray-500">Submit a formal request directly to our technical support team.</p>
        </Link>

        <a
          href="mailto:support@aiicqb.org"
          className="bg-white p-6 rounded-xl border border-gray-200 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow block group"
        >
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">Email Support</h3>
          <p className="text-xs text-[#F47716] font-bold">support@aiicqb.org</p>
          <p className="text-[11px] text-gray-500">Direct response from our official international candidate helpdesk.</p>
        </a>
      </div>

      {/* Accordion FAQs matching Image 3 #13 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-[#10264B] pb-2 border-b border-gray-100">Popular Questions</h3>
        <div className="divide-y divide-gray-100">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="py-3.5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-[#10264B] hover:text-[#F47716] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#F47716]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {isOpen && (
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

