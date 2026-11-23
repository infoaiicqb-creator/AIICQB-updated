import React from 'react';
import { BookOpen, FileCode2, FileDown, Layers, HelpCircle, Briefcase } from 'lucide-react';

export const Resources: React.FC = () => {
  const resourceCategories = [
    {
      title: 'Study Guides',
      desc: 'Official candidate study handbooks mapping core conceptual frameworks and recommended readings.',
      icon: BookOpen,
      count: '16 Guides',
    },
    {
      title: 'Sample Questions',
      desc: 'Practice problem sets with rationale explanations and exam pattern previews.',
      icon: HelpCircle,
      count: '450+ Questions',
    },
    {
      title: 'Syllabus (PDF)',
      desc: 'Downloadable syllabus outlines for all multi-industry certification schemes.',
      icon: FileDown,
      count: 'Complete PDF Pack',
    },
    {
      title: 'eBooks & Whitepapers',
      desc: 'In-depth research documents covering AI engineering ethics and modern automated quality standards.',
      icon: Layers,
      count: '12 Publications',
    },
    {
      title: 'Templates & Cheatsheets',
      desc: 'Ready-to-use Page Object Model boilerplates, test design matrices, and data science notebooks.',
      icon: FileCode2,
      count: '25+ Templates',
    },
    {
      title: 'Career Resources',
      desc: 'Resume optimization guides, credential showcase templates, and technical interview checklists.',
      icon: Briefcase,
      count: 'Career Kit',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#F47716] uppercase tracking-wider">Candidate Toolkit</span>
        <h1 className="text-3xl font-extrabold text-[#10264B]">Resources & Learning Assets</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Access study materials, sample questions, syllabus PDFs and technical templates.
        </p>
      </div>

      {/* Grid matching Image 3 #11 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourceCategories.map((res, i) => {
          const Icon = res.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F47716] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#10264B]">{res.title}</h3>
                  <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    {res.count}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{res.desc}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert(`Accessing: ${res.title}. Included with your AICQB candidate account.`)}
                  className="w-full py-2 bg-slate-50 hover:bg-[#10264B] hover:text-white text-[#10264B] text-xs font-semibold rounded border border-gray-200 transition-colors"
                >
                  Access Resource
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

