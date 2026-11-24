import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  BarChart3,
  Users,
  Award,
  CalendarCheck,
  Building2,
  TrendingUp,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Loader2,
  FileSpreadsheet,
  Globe2,
  Layers,
} from 'lucide-react';

export const AdminReports: React.FC = () => {
  const [data, setData] = useState<any>(() => {
    try {
      const c = localStorage.getItem('aicqb_admin_reports');
      return c ? JSON.parse(c) : null;
    } catch (_) {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [hoveredBar, setHoveredBar] = useState<any | null>(null);

  useEffect(() => {
    loadReportsData();
  }, []);

  const loadReportsData = async (silent = false) => {
    try {
      if (!silent && !data) setLoading(true);
      else setRefreshing(true);

      const res = await api.getReportsAnalytics();
      if (res && res.success && res.data) {
        setData(res.data);
        try { localStorage.setItem('aicqb_admin_reports', JSON.stringify(res.data)); } catch (_) { }
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Failed to load reports and analytics:', err);
    } finally {
      if (!silent) setLoading(false);
      else setRefreshing(false);
    }
  };

  // Export full reports snapshot as CSV
  const handleExportCSV = () => {
    if (!data) return;

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'AICQB Institutional Decision Support - Executive Report\r\n';
    csvContent += `Generated On: ${new Date().toLocaleString()}\r\n\r\n`;

    // 1. Metric Summary
    csvContent += '--- SUMMARY METRICS ---\r\n';
    csvContent += 'Metric,Value\r\n';
    csvContent += `Total Candidates,${data.totalCandidates}\r\n`;
    csvContent += `Total Exams,${data.totalExams}\r\n`;
    csvContent += `Certificates Issued,${data.totalCertificates}\r\n`;
    csvContent += `Training Partners,${data.totalTrainingPartners}\r\n`;
    csvContent += `Average Pass Rate,${data.averagePassRate}%\r\n`;
    csvContent += `Remediation Rate,${data.remediationRate}%\r\n\r\n`;

    // 2. Exam Performance by Month
    csvContent += '--- EXAM PERFORMANCE (LAST 6 MONTHS) ---\r\n';
    csvContent += 'Month,Year,Total Attempts,Exams Evaluated,Passed,Pass Rate (%)\r\n';
    (data.monthlyPerformance || []).forEach((m: any) => {
      csvContent += `${m.month},${m.year},${m.attempts},${m.resultsCount},${m.passed},${m.passRate}%\r\n`;
    });
    csvContent += '\r\n';

    // 3. Top Domains
    csvContent += '--- TOP DOMAINS ENROLLMENT ---\r\n';
    csvContent += 'Domain / Specialization,Enrolled Candidates,Share (%)\r\n';
    (data.topDomains || []).forEach((d: any) => {
      csvContent += `"${d.name}",${d.count},${d.percentage}%\r\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AICQB_Institutional_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const topMetrics = [
    {
      label: 'Total Candidates',
      value: data?.totalCandidates !== undefined ? Number(data.totalCandidates).toLocaleString() : '0',
      icon: Users,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      label: 'Total Exams',
      value: data?.totalExams !== undefined ? Number(data.totalExams).toLocaleString() : '0',
      icon: CalendarCheck,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'Certificates',
      value: data?.totalCertificates !== undefined ? Number(data.totalCertificates).toLocaleString() : '0',
      icon: Award,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      label: 'Training Partners',
      value: data?.totalTrainingPartners !== undefined ? Number(data.totalTrainingPartners).toLocaleString() : '0',
      icon: Building2,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header matching Admin Portal Theme */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#10264B]">Reports & Analytics</h1>
            <span className="text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full border border-orange-200">
              Live Synchronized
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Comprehensive reports and insights for institutional decision making.
          </p>
        </div>

        {/* Action Buttons: Export & Refresh */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            disabled={loading || !data}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-[#10264B] border border-slate-200 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-[#F47716]" />
            <span>Export Report (CSV)</span>
          </button>

          <button
            onClick={() => loadReportsData(true)}
            disabled={loading || refreshing}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-xs"
            title="Refresh Live Analytics"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#F47716]' : ''}`} />
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Pills matching Image 5 #11 (100% Dynamic) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {topMetrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center space-x-4 hover:border-slate-300 transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl ${m.bgColor} border ${m.borderColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${m.color}`} />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#10264B] leading-none font-mono tracking-tight">
                  {loading ? '...' : m.value}
                </p>
                <p className="text-xs text-gray-500 font-semibold mt-1">{m.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Row Charts matching Image 5 #11 (100% Dynamic) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Exam Performance (Last 6 Months) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-black text-sm text-[#10264B]">Exam Performance (Last 6 Months)</h3>
              <p className="text-[11px] text-gray-400">Monthly candidate examination pass trend</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black rounded-lg">
                {loading ? '...' : `${data?.averagePassRate ?? 0}% Average Pass Rate`}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="h-56 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#F47716]" />
            </div>
          ) : (
            <div className="space-y-2">
              {/* Relative tooltip bar */}
              <div className="h-6 text-xs text-center font-mono">
                {hoveredBar ? (
                  <span className="text-[#10264B] font-bold bg-slate-100 px-3 py-1 rounded-md border border-slate-200 animate-fadeIn">
                    {hoveredBar.month} {hoveredBar.year}: {hoveredBar.passRate}% pass rate ({hoveredBar.passed} passed, {hoveredBar.attempts} attempts)
                  </span>
                ) : (
                  <span className="text-slate-400 text-[11px]">Hover over any month to view assessment details</span>
                )}
              </div>

              {/* 6 Monthly Columns matching screenshot */}
              <div className="h-52 flex items-end justify-between gap-3 pt-2 px-3 border-b border-slate-100 pb-2">
                {(data?.monthlyPerformance || []).map((bar: any, idx: number) => {
                  const isHovered = hoveredBar?.month === bar.month;
                  return (
                    <div
                      key={bar.month + idx}
                      className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                      onMouseEnter={() => setHoveredBar(bar)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <span className={`text-[10px] font-mono font-bold transition-colors ${isHovered ? 'text-[#F47716]' : 'text-slate-400'}`}>
                        {bar.passRate > 0 ? `${bar.passRate}%` : `${bar.attempts} att`}
                      </span>
                      <div className="w-full bg-slate-100 h-40 rounded-t-lg flex items-end overflow-hidden p-0.5">
                        <div
                          className={`w-full rounded-t-md transition-all duration-300 ${isHovered
                            ? 'bg-gradient-to-t from-[#E35D00] to-[#F47716] shadow-md'
                            : 'bg-gradient-to-t from-[#F47716] to-[#FA9142]'
                            }`}
                          style={{
                            height: `${Math.max(8, bar.barHeight || (bar.attempts > 0 ? 35 : 8))}%`,
                          }}
                        ></div>
                      </div>
                      <span className={`text-xs font-bold transition-colors ${isHovered ? 'text-[#10264B]' : 'text-gray-500'}`}>
                        {bar.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Chart: Top Domains Enrollment (100% Dynamic) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-black text-sm text-[#10264B]">Top Domains Enrollment</h3>
              <p className="text-[11px] text-gray-400">Share of total candidate specializations</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              {data?.totalEnrollmentsCount ?? 0} Total
            </span>
          </div>

          {loading ? (
            <div className="h-56 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#F47716]" />
            </div>
          ) : (data?.topDomains || []).length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No domain enrollment data available
            </div>
          ) : (
            <div className="space-y-3.5 pt-1 text-xs">
              {(data?.topDomains || []).map((d: any) => (
                <div key={d.name} className="space-y-1">
                  <div className="flex justify-between items-center font-semibold text-gray-700">
                    <span className="truncate pr-2 text-[#10264B] font-bold" title={d.name}>
                      {d.name}
                    </span>
                    <span className="font-mono text-slate-600 flex-shrink-0 font-bold">
                      {d.percentage}% <span className="text-slate-400 font-normal">({d.count})</span>
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full ${d.color || 'bg-[#F47716]'} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.max(4, d.percentage)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: ISO/IEC Quality Standard & Remediation Compliance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        {/* 1. ISO Standard Pass Metric */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Honors Standard Pass Rate
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black text-[#10264B] font-mono">
              {data?.averagePassRate ?? 0}%
            </span>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              {data?.passedCandidates ?? 0} Passed
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Achieving ≥ 70% threshold in proctored examinations qualifying for official AIICQB credentials.
          </p>
        </div>

        {/* 2. Retake & Remediation Rate */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Remediation / Retake Rate
            </span>
            <AlertTriangle className="w-4 h-4 text-orange-500" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black text-[#10264B] font-mono">
              {data?.remediationRate ?? 0}%
            </span>
            <span className="text-xs text-orange-800 font-bold bg-orange-50 px-2 py-0.5 rounded">
              {data?.failedCandidates ?? 0} Retakes
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Candidates offered review remediation and second chance retake as per board standards.
          </p>
        </div>

        {/* 3. System Health & Verification Integrity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Compliance Standard
            </span>
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-black text-[#10264B]">ISO/IEC 17024</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Instant cryptographic employer QR verification with zero-downtime ledger synchronization.
          </p>
        </div>
      </div>
    </div>
  );
};
