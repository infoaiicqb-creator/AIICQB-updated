import React from 'react';
import { BarChart3, Users, Award, CalendarCheck, Building2, TrendingUp } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const topMetrics = [
    { label: 'Total Candidates', value: '124,560', icon: Users, color: 'text-orange-500' },
    { label: 'Total Exams', value: '3,240', icon: CalendarCheck, color: 'text-blue-500' },
    { label: 'Certificates', value: '96,780', icon: Award, color: 'text-green-500' },
    { label: 'Training Partners', value: '1,025', icon: Building2, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header matching Image 5 #11 */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#10264B]">Reports & Analytics</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Comprehensive reports and insights for institutional decision making.
        </p>
      </div>

      {/* 4 Summary Stat Pills matching Image 5 #11 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {topMetrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <div>
                <p className="text-xl font-black text-[#10264B] leading-none">{m.value}</p>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5">{m.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Row Charts matching Image 5 #11 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Exam Performance */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-sm text-[#10264B]">Exam Performance (Last 6 Months)</h3>
            <span className="text-xs text-green-600 font-bold">88.4% Average Pass Rate</span>
          </div>

          <div className="h-52 flex items-end justify-between gap-4 pt-4 px-2">
            {[
              { m: 'Jan', val: 40 },
              { m: 'Feb', val: 50 },
              { m: 'Mar', val: 65 },
              { m: 'Apr', val: 78 },
              { m: 'May', val: 88 },
              { m: 'Jun', val: 100 },
            ].map((bar) => (
              <div key={bar.m} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-[#F47716] rounded-t-md hover:bg-[#DC660E] transition-all"
                  style={{ height: `${bar.val}%` }}
                ></div>
                <span className="text-[11px] font-semibold text-gray-500">{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Chart: Top Domains */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-sm text-[#10264B]">Top Domains Enrollment</h3>
            <span className="text-xs text-gray-400">Share of Total</span>
          </div>

          <div className="space-y-3 pt-1 text-xs">
            {[
              { name: 'Technology & IT', p: 32, c: 'bg-blue-600' },
              { name: 'Data & AI', p: 16, c: 'bg-[#F47716]' },
              { name: 'Business & Mgmt', p: 12, c: 'bg-indigo-600' },
              { name: 'Finance & Compliance', p: 10, c: 'bg-purple-600' },
              { name: 'Healthcare', p: 8, c: 'bg-emerald-600' },
            ].map((d) => (
              <div key={d.name} className="space-y-1">
                <div className="flex justify-between font-semibold text-gray-700">
                  <span>{d.name}</span>
                  <span>{d.p}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${d.c} rounded-full`} style={{ width: `${d.p}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

