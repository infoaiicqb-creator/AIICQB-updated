import React, { useState } from 'react';
import { api } from '../../services/api';
import { Building2, CheckCircle2, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
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

export const Partners: React.FC = () => {
  const [partnerName, setPartnerName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const partnerLogos = [
    { name: 'Wipro', component: WiproLogo },
    { name: 'Capgemini', component: CapgeminiLogo },
    { name: 'Infosys', component: InfosysLogo },
    { name: 'TELUS', component: TelusLogo },
    { name: 'DNB', component: DnbLogo },
    { name: 'AWS', component: AwsLogo },
    { name: 'Iris Software', component: IrisSoftwareLogo },
    { name: 'TCS', component: TcsLogo },
    { name: 'Cognizant', component: CognizantLogo },
    { name: 'Accenture', component: AccentureLogo },
    { name: 'HCLTech', component: HclTechLogo },
    { name: 'Microsoft', component: MicrosoftLogo },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-2.5">
        <span className="inline-block text-sm sm:text-base font-black text-[#F47716] uppercase tracking-wider">
          Global Industry Collaboration
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#10264B] tracking-tight">Our Partners</h1>
        <p className="text-sm sm:text-base text-gray-500 font-medium">
          Collaborating with industry leaders, training institutes and organizations worldwide
        </p>
      </div>

      {/* Partner Logos Grid matching Image 3 #10 in FULL COLOR */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center text-center">
          {partnerLogos.map((p) => {
            const LogoComponent = p.component;
            return (
              <div
                key={p.name}
                className="p-5 rounded-xl border border-gray-100 hover:border-orange-300 transition-all hover:shadow-md bg-white flex items-center justify-center h-24 group"
              >
                <LogoComponent className="h-10 w-auto max-w-[140px] object-contain transition-transform group-hover:scale-105" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Become a Partner Application Form */}
      <div className="bg-[#10264B] text-white rounded-2xl p-8 sm:p-12 shadow-xl border border-slate-700 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold text-[#F47716] uppercase tracking-wider">Partnership Opportunities</span>
          <h2 className="text-2xl sm:text-3xl font-bold">Become an Authorized Training Partner (ATP)</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Deliver official AICQB aligned training curricula, host institutional proctored certification drives, and
            provide students with globally authenticated credentials.
          </p>
          <div className="space-y-2 text-xs text-slate-300 pt-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#F47716]" />
              <span>Official AICQB Syllabus and Teaching Assets</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#F47716]" />
              <span>Institutional bulk candidate examination pricing</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#F47716]" />
              <span>Dedicated Partner Management Dashboard</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white text-[#10264B] p-6 sm:p-8 rounded-xl shadow-lg">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#10264B]">Application Submitted</h3>
              <p className="text-xs text-gray-500">
                Thank you! Our Partner Onboarding Team will review your organization details and contact you within 2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-[#10264B]">Apply for Training Partner Status</h3>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Institution / Organization Name</label>
                <input
                  type="text"
                  required
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="e.g. Apex Learning Institute"
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-[#F47716] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Official Business Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="partner@institution.edu"
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-[#F47716] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">City & Country</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Pune, India"
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-[#F47716] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#F47716] hover:bg-[#DC660E] text-white font-bold rounded shadow transition-colors flex items-center justify-center space-x-2"
              >
                <span>Submit Partner Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

