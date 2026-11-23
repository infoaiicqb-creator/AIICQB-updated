import React, { useState } from 'react';
import { Megaphone, Plus, Search, Edit2, CheckCircle2 } from 'lucide-react';

export const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState([
    {
      title: 'AICQB New Certifications Launched',
      audience: 'All Users',
      scheduledDate: 'Nov 07, 2026',
      status: 'Published',
    },
    {
      title: 'Exam Schedule – Nov 2026',
      audience: 'Candidates',
      scheduledDate: 'Nov 05, 2026',
      status: 'Published',
    },
    {
      title: 'Partner Onboarding Update',
      audience: 'Training Partners',
      scheduledDate: 'Nov 03, 2026',
      status: 'Published',
    },
    {
      title: 'Membership Renewal Reminder',
      audience: 'Members',
      scheduledDate: 'Nov 01, 2026',
      status: 'Published',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header matching Image 5 #10 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#10264B]">Communication & Announcements</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Create and broadcast notices for candidates, training partners, and member institutions.
          </p>
        </div>
        <button
          onClick={() => alert('Compose and broadcast new announcement')}
          className="px-4 py-2.5 bg-[#F47716] hover:bg-[#DC660E] text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Announcement</span>
        </button>
      </div>

      {/* Table matching Image 5 #10 */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-gray-600 font-semibold uppercase tracking-wider text-[11px] border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-6">Title</th>
                <th className="py-3.5 px-6">Audience</th>
                <th className="py-3.5 px-6">Scheduled / Sent</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {announcements.map((a, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#10264B]">{a.title}</td>
                  <td className="py-4 px-6 text-gray-600 font-medium">{a.audience}</td>
                  <td className="py-4 px-6 text-gray-600">{a.scheduledDate}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
                      {a.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => alert(`Edit notice: ${a.title}`)}
                      className="p-1 rounded text-gray-400 hover:text-[#10264B]"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

