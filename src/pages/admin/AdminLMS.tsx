import React, { useState } from 'react';
import { BookOpen, Plus, Search, Edit2, CheckCircle2 } from 'lucide-react';

export const AdminLMS: React.FC = () => {
  const [courses, setCourses] = useState([
    {
      courseCode: 'LMS-AI-01',
      title: 'AI & ML Fundamentals',
      domain: 'AI & Machine Learning',
      type: 'Course',
      status: 'Active',
    },
    {
      courseCode: 'LMS-DS-01',
      title: 'Data Science Essentials',
      domain: 'Data & Analytics',
      type: 'Course',
      status: 'Active',
    },
    {
      courseCode: 'LMS-CY-01',
      title: 'Cybersecurity Basics',
      domain: 'Cybersecurity',
      type: 'Course',
      status: 'Active',
    },
    {
      courseCode: 'LMS-PM-01',
      title: 'Project Management',
      domain: 'Management',
      type: 'Course',
      status: 'Active',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header matching Image 5 #9 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#10264B]">Content & Learning Management (LMS)</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage courses, study materials and learning content for certification training.
          </p>
        </div>
        <button
          onClick={() => alert('Add new LMS learning course or module')}
          className="px-4 py-2.5 bg-[#F47716] hover:bg-[#DC660E] text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Filter Bar matching Image 5 #9 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row gap-3 text-xs">
        <select className="px-3 py-2 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none text-gray-700 font-medium">
          <option>Domain: All</option>
          <option>AI & Machine Learning</option>
          <option>Data & Analytics</option>
          <option>Cybersecurity</option>
          <option>Management</option>
        </select>

        <select className="px-3 py-2 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none text-gray-700 font-medium">
          <option>Type: All</option>
          <option>Course</option>
          <option>Study Material</option>
          <option>Practice Test</option>
        </select>

        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search course title or code..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F47716]"
          />
        </div>
      </div>

      {/* Table matching Image 5 #9 */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-gray-600 font-semibold uppercase tracking-wider text-[11px] border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-6">Course ID</th>
                <th className="py-3.5 px-6">Course Title</th>
                <th className="py-3.5 px-6">Domain</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((c) => (
                <tr key={c.courseCode} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#F47716]">{c.courseCode}</td>
                  <td className="py-4 px-6 font-bold text-[#10264B]">{c.title}</td>
                  <td className="py-4 px-6 text-gray-600">{c.domain}</td>
                  <td className="py-4 px-6 text-gray-600 font-medium">{c.type}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
                      {c.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => alert(`Edit course: ${c.title}`)}
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

