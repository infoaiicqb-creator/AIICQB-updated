import React from 'react';
import { Briefcase, CheckCircle2, ArrowRight, Globe2, HeartHandshake } from 'lucide-react';

export const Careers: React.FC = () => {
  const jobs = [
    {
      title: 'Senior Examination Psychometrician & Evaluator',
      department: 'Examination Board',
      location: 'Pune, India (Hybrid)',
      type: 'Full-Time',
    },
    {
      title: 'Lead Curriculum Designer – AI & Machine Learning',
      department: 'Content & Standards',
      location: 'Remote / Global',
      type: 'Full-Time',
    },
    {
      title: 'Quality Engineering Assessment Specialist',
      department: 'Technical Advisory',
      location: 'Bengaluru / Pune (Hybrid)',
      type: 'Full-Time',
    },
    {
      title: 'Enterprise Partner Success Manager',
      department: 'Institutional Partnerships',
      location: 'Mumbai / Pune',
      type: 'Full-Time',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#F47716] uppercase tracking-wider">Join Our Mission</span>
        <h1 className="text-3xl font-extrabold text-[#10264B]">Careers at AICQB</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Help build an independent, accessible, and transparent global certification ecosystem.
        </p>
      </div>

      {/* Culture Highlights matching Image 3 #12 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#F47716] flex items-center justify-center mx-auto">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">Global Brand Impact</h3>
          <p className="text-xs text-gray-500">Shape skill benchmarking standards reaching thousands of practitioners across continents.</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#10264B] flex items-center justify-center mx-auto">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">Hybrid & Flexible Work</h3>
          <p className="text-xs text-gray-500">Modern operational freedom designed around results, technical curiosity, and ownership.</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">Continuous Development</h3>
          <p className="text-xs text-gray-500">Generous professional learning stipends and immediate access to all certification programs.</p>
        </div>
      </div>

      {/* Open Positions List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-[#10264B]">Current Open Positions</h3>
        <div className="divide-y divide-gray-100">
          {jobs.map((job, idx) => (
            <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#10264B]">{job.title}</h4>
                <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                  <span>{job.department}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span className="text-[#F47716] font-semibold">{job.type}</span>
                </div>
              </div>
              <button
                onClick={() => alert(`Applying for: ${job.title}. Send resume to careers@aicqb.org.`)}
                className="px-4 py-2 bg-[#10264B] hover:bg-[#1E3A6E] text-white text-xs font-semibold rounded-md shadow-sm transition-colors flex items-center justify-center space-x-1.5 self-start sm:self-auto"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

