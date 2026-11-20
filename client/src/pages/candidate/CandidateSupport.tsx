import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { SupportTicket } from '../../types';
import { Headphones, MessageSquare, HelpCircle, Plus, CheckCircle2, Clock, X, Send, Loader2 } from 'lucide-react';

export const CandidateSupport: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Exam Support');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const res = await api.getMyTickets();
      if (res.success && res.tickets) {
        setTickets(res.tickets);
      }
    } catch (err) {
      console.error('Failed to load tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  // Candidate's live support requests (Strict fresh data isolation)
  const displayTickets = tickets;

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    try {
      setSubmitting(true);
      const res = await api.createTicket({ subject, category, message });
      if (res.success) {
        setShowCreateModal(false);
        setSubject('');
        setMessage('');
        loadTickets();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to raise ticket.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header matching Image 2 #9 */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#10264B]">Support</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Get help, raise a request or contact our support team.
        </p>
      </div>

      {/* 3 Shortcut Action Cards matching Image 2 #9 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => setShowCreateModal(true)}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer space-y-3 text-center group"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F47716] flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">Raise a Ticket</h3>
          <p className="text-xs text-gray-500">Get technical or certification support for any issue.</p>
        </div>

        <div
          onClick={() => alert('Live Chat Agent is online. Connecting to advisor...')}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer space-y-3 text-center group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#10264B] flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">Live Chat</h3>
          <p className="text-xs text-gray-500">Chat in real-time with our candidate support desk.</p>
        </div>

        <div
          onClick={() => alert('Accessing AICQB Knowledge Base & Frequently Asked Questions.')}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer space-y-3 text-center group"
        >
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-[#10264B]">FAQ</h3>
          <p className="text-xs text-gray-500">Find instant answers to common candidate questions.</p>
        </div>
      </div>

      {/* Support Requests Table matching Image 2 #9 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-bold text-sm text-[#10264B]">My Support Requests</h3>
          <span className="text-xs font-bold text-[#F47716]">View All</span>
        </div>

        <div className="divide-y divide-gray-100">
          {displayTickets.length > 0 ? (
            displayTickets.map((t, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-gray-500 bg-slate-100 px-2 py-1 rounded">
                    {t.ticketId}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#10264B]">{t.subject}</span>
                </div>

                <div className="flex items-center space-x-4 self-start sm:self-auto text-xs">
                  <span className="text-gray-400">{t.dateFormatted || 'Today'}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      t.status === 'Resolved'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-orange-50 text-[#F47716] border border-orange-200'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center space-y-2">
              <Headphones className="w-8 h-8 text-gray-300 mx-auto" />
              <p className="text-xs font-bold text-[#10264B]">No Support Tickets Raised</p>
              <p className="text-xs text-gray-400">Click &quot;Raise Support Ticket&quot; above if you need assistance with exams, verification or credentials.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-[#10264B] flex items-center space-x-2">
                <Headphones className="w-4 h-4 text-[#F47716]" />
                <span>Raise a Support Ticket</span>
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-gray-300 rounded focus:ring-1 focus:ring-[#F47716] focus:outline-none"
                >
                  <option>Exam Support</option>
                  <option>Certificate Download / Verification</option>
                  <option>Payment & Invoicing</option>
                  <option>Course & Learning Hub Access</option>
                  <option>General Support</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Issue launching exam session"
                  className="w-full p-2.5 bg-slate-50 border border-gray-300 rounded focus:ring-1 focus:ring-[#F47716] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Explain what happened and how our support desk can help..."
                  className="w-full p-2.5 bg-slate-50 border border-gray-300 rounded focus:ring-1 focus:ring-[#F47716] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#F47716] hover:bg-[#DC660E] text-white font-bold rounded shadow transition-colors flex items-center space-x-1.5"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Submit Ticket</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

