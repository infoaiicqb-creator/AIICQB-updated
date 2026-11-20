import React, { useState } from 'react';
import { api } from '../../services/api';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Certification Inquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const res = await api.contactSubmit({ name, email, subject, message });
      if (res.success) {
        setSubmitted(true);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#F47716] uppercase tracking-wider">Direct Advisory</span>
        <h1 className="text-3xl font-extrabold text-[#10264B]">Contact Us</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          We're here to help. Reach out to the AICQB administrative and certification advisory council.
        </p>
      </div>

      {/* 2-column layout matching Image 3 #15 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Contact Details */}
        <div className="lg:col-span-5 bg-[#10264B] text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-700 space-y-8">
          <div>
            <h3 className="text-xl font-bold">AICQB Headquarters</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Official administrative operations and global certificate registry validation desk.
            </p>
          </div>

          <div className="space-y-6 text-xs text-slate-200">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-[#F47716]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-400 font-semibold uppercase text-[10px]">Email Addresses</p>
                <p className="text-sm font-bold text-white mt-0.5">support@aicqb.org</p>
                <p className="text-slate-300">contact@aicqb.org</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-[#F47716]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-400 font-semibold uppercase text-[10px]">Candidate Helpline</p>
                <p className="text-sm font-bold text-white mt-0.5">+91 98765 43210</p>
                <p className="text-slate-300">Monday – Friday: 09:00 AM – 06:00 PM IST</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-[#F47716]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-400 font-semibold uppercase text-[10px]">Office Address</p>
                <p className="text-sm font-bold text-white mt-0.5">AICQB Headquarters</p>
                <p className="text-slate-300">Kharadi, Pune, Maharashtra – 411014, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Form matching Image 3 #15 */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-200">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#10264B]">Message Transmitted Successfully</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Thank you for getting in touch. Your ticket has been logged into our support system and an advisor will
                respond via email shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="text-xs font-semibold text-[#F47716] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-[#10264B]">Send a Direct Message</h3>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-600 rounded-md font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Deshmukh"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F47716]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul.deshmukh@gmail.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F47716]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F47716]"
                >
                  <option>Certification Inquiry</option>
                  <option>Exam Scheduling & Proctoring</option>
                  <option>Payment & Invoice Question</option>
                  <option>Certificate Verification Assistance</option>
                  <option>Training Partner Application</option>
                  <option>Other Matter</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Message</label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our board advisors assist you?"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F47716]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#F47716] hover:bg-[#DC660E] text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

