import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, Award, FileText, Video, HelpCircle, ArrowRight } from 'lucide-react';

export const Learning: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Banner matching Image 3 #6 */}
      <div className="bg-gradient-to-r from-[#10264B] to-[#1E3A6E] text-white rounded-2xl p-8 sm:p-12 border border-slate-700 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-6">
          <span className="text-xs font-bold text-[#F47716] uppercase tracking-wider">LMS & Curriculum</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">AICQB Learning Hub</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Prepare, practice, and get certified with comprehensive curriculum-aligned study materials, practice questions,
            and interactive hands-on code laboratories.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#F47716] flex-shrink-0" />
              <span>Certification-aligned courses</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#F47716] flex-shrink-0" />
              <span>Study materials & eBooks</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#F47716] flex-shrink-0" />
              <span>Practice tests & mock exams</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#F47716] flex-shrink-0" />
              <span>Expert-led masterclasses</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/certifications"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#F47716] hover:bg-[#DC660E] text-white font-bold text-xs rounded-lg shadow transition-colors"
            >
              <span>Explore Learning Resources</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-3">
            <BookOpen className="w-16 h-16 text-[#F47716] mx-auto" />
            <h3 className="font-bold text-base text-white">Full Syllabus Coverage</h3>
            <p className="text-xs text-slate-300">
              Access unlocked immediately inside your Candidate Workspace upon certification enrollment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

