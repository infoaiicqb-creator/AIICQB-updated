import React from 'react';
import { Calendar, Clock, Video, Users, ArrowRight, Sparkles } from 'lucide-react';

export const EventsWebinars: React.FC = () => {
  const events = [
    {
      title: 'AI in Software Testing – Industry Use Cases & Practical Implementation',
      type: 'Live Webinar',
      date: '15 Nov 2026',
      time: '04:00 PM (IST)',
      speaker: 'AICQB Technical Advisory Council',
      free: true,
      description: 'Explore how generative AI is transforming test design, automated defect triage, and synthetic test data creation.',
    },
    {
      title: 'Mastering Playwright Automation: Zero to Enterprise Framework',
      type: 'Technical Workshop',
      date: '22 Nov 2026',
      time: '06:00 PM (IST)',
      speaker: 'Senior QA Architects',
      free: true,
      description: 'Deep dive into Page Object Models, API route mocks, and GitHub Actions parallel CI/CD runners.',
    },
    {
      title: 'Global Career Drive: Becoming an AICQB Certified AI Professional',
      type: 'Certification Drive',
      date: '28 Nov 2026',
      time: '05:00 PM (IST)',
      speaker: 'Director – Certification AICQB',
      free: true,
      description: 'Step-by-step guidance on exam preparation, syllabus breakdown, and career opportunities.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#F47716] uppercase tracking-wider">Community Knowledge</span>
        <h1 className="text-3xl font-extrabold text-[#10264B]">Events & Webinars</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Join our live masterclasses, hands-on workshops and certification drives with global industry leaders.
        </p>
      </div>

      <div className="space-y-4">
        {events.map((ev, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-orange-100 text-[#F47716] text-[11px] font-bold rounded-full flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-[#F47716] rounded-full animate-ping"></span>
                  <span>{ev.type}</span>
                </span>
                <span className="text-xs text-gray-400 font-medium">• {ev.speaker}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#10264B]">{ev.title}</h3>
              <p className="text-xs text-gray-500 max-w-2xl">{ev.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-600 pt-1 font-medium">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-[#F47716]" />
                  <span>{ev.date}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-[#F47716]" />
                  <span>{ev.time}</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => alert(`Registered for: ${ev.title}. Webinar link will be sent to your email.`)}
                className="w-full md:w-auto px-6 py-2.5 bg-[#F47716] hover:bg-[#DC660E] text-white font-bold text-xs rounded-lg shadow-sm transition-colors"
              >
                Free Registration
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

