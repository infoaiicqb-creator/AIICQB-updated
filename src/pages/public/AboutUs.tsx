import React from 'react';
import { Target, Compass, Award, ShieldCheck, Users2, CheckCircle2 } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#F47716] uppercase tracking-wider">About AICQB</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10264B]">
          A Global Platform for Professional Certification & Skill Excellence
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          AICQB (AI International Certification & Qualification Board) is an independent professional body dedicated to
          setting global skill standards, conducting assessments, and awarding industry-recognized certifications.
        </p>
      </div>

      {/* Mission, Vision, Values Cards matching Image 3 #2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#F47716] flex items-center justify-center mx-auto">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#10264B]">Our Mission</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Empower skilled professionals globally through accessible, objective, and transparent competency assessments
            that reflect current industry requirements.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#10264B] flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#10264B]">Our Vision</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Be a leading global certification board recognized by tech employers for rigorous evaluation, ethical assessment,
            and practical workforce capability.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#10264B]">Our Values</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Quality, Integrity, Innovation, Diversity, and Impartiality across all syllabus designs and proctored examination
            processes.
          </p>
        </div>
      </div>

      {/* Independent Certification Framework */}
      <div className="bg-[#10264B] text-white rounded-2xl p-8 sm:p-12 space-y-6">
        <h2 className="text-2xl font-bold">Independent Professional Credentialing Standard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#F47716] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Subject Matter Expert Board:</strong> Syllabi designed with international practitioners from
                Fortune 500 tech leaders.
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#F47716] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Objective Scoring Rubrics:</strong> Standardized MCQ and practical code execution grading with no
                subjective bias.
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#F47716] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Cryptographic Verification:</strong> Each awarded credential features a unique Certificate ID and QR
                lookup on the public verification portal.
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#F47716] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Multi-Discipline Breadth:</strong> Covering 16 high-demand professional sectors beyond testing.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

