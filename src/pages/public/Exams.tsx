import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Certification } from '../../types';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Laptop,
  Award,
  ArrowRight,
  ShieldCheck,
  UserPlus,
  BookOpen,
} from 'lucide-react';

export const Exams: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    api.getCertifications().then((res) => {
      if (res.success) setCertifications(res.certifications);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#F47716] uppercase tracking-wider">Examination Engine</span>
        <h1 className="text-3xl font-extrabold text-[#10264B]">Online Examinations & Qualifications</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Register, schedule, and take AICQB certification exams online from anywhere in the world.
        </p>
      </div>

      {/* 4 Steps matching Image 3 #5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#F47716] flex items-center justify-center mx-auto font-bold">
            1
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">Register</h3>
          <p className="text-xs text-gray-500">Create your account and receive your unique AICQB Candidate ID.</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#10264B] flex items-center justify-center mx-auto font-bold">
            2
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">Enroll</h3>
          <p className="text-xs text-gray-500">Choose your certification program and complete the fee payment.</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-bold">
            3
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">Take Exam</h3>
          <p className="text-xs text-gray-500">Join the proctored online test environment within your window.</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto font-bold">
            4
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">Get Certified</h3>
          <p className="text-xs text-gray-500">Receive instant evaluation and globally verifiable digital certificate.</p>
        </div>
      </div>

      {/* Upcoming Exam Windows Table matching Image 3 #5 */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-4 p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#10264B]">Active Examination Schedules</h3>
            <p className="text-xs text-gray-500">Standard proctored exam cycles conducted daily across all time zones.</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 rounded-md">
            Slots Open
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-gray-600 font-semibold uppercase tracking-wider text-[11px] border-y border-gray-200">
              <tr>
                <th className="py-3 px-4">Certification</th>
                <th className="py-3 px-4">Exam Code</th>
                <th className="py-3 px-4">Available Window</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {certifications.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#10264B]">{c.name}</td>
                  <td className="py-3.5 px-4 font-mono text-[#F47716] font-semibold">{c.code}</td>
                  <td className="py-3.5 px-4 text-gray-600">Daily Slots (On-Demand)</td>
                  <td className="py-3.5 px-4 text-gray-600">Online Proctored</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/certifications/${c.code || c.id}`}
                      className="px-3.5 py-1.5 bg-[#F47716] hover:bg-[#DC660E] text-white font-semibold rounded text-xs transition-colors"
                    >
                      Register
                    </Link>
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

