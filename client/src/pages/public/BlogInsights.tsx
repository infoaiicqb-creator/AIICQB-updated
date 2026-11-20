import React from 'react';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export const BlogInsights: React.FC = () => {
  const posts = [
    {
      title: 'Top AI Skills to Boost Your Career in 2026',
      date: '05 Nov 2026',
      readTime: '8 min read',
      category: 'Artificial Intelligence',
      summary:
        'From prompt engineering and RAG architecture to autonomous agents and model evaluation, explore the indispensable skill standards for technical leaders.',
    },
    {
      title: 'Playwright vs Selenium – Which Automation Framework to Choose?',
      date: '28 Oct 2026',
      readTime: '6 min read',
      category: 'Test Automation',
      summary:
        'A comprehensive benchmark comparing architecture, multi-browser speed, execution flakiness, and CI/CD integration across modern testing stacks.',
    },
    {
      title: 'Top 10 Career Paths in Software Testing and Quality Engineering',
      date: '18 Oct 2026',
      readTime: '7 min read',
      category: 'Career Guidance',
      summary:
        'Navigating the transition from manual verification to SDET, Performance Engineer, Security Auditor, and Quality Engineering Director.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#F47716] uppercase tracking-wider">Knowledge Base</span>
        <h1 className="text-3xl font-extrabold text-[#10264B]">Blog & Insights</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Latest updates, industry trends, exam tips and career guidance from the AICQB board.
        </p>
      </div>

      {/* Cards matching Image 3 #14 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <article
            key={i}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="px-2.5 py-0.5 bg-orange-50 text-[#F47716] font-semibold rounded">
                  {post.category}
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h2 className="text-base font-bold text-[#10264B] leading-snug hover:text-[#F47716] transition-colors cursor-pointer">
                {post.title}
              </h2>

              <p className="text-xs text-gray-500 leading-relaxed">{post.summary}</p>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400">{post.date}</span>
              <span className="font-bold text-[#10264B] hover:text-[#F47716] flex items-center space-x-1 cursor-pointer">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

