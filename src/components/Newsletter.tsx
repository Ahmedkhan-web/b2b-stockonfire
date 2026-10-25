import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Newsletter: React.FC = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [industryInterest, setIndustryInterest] = useState('All Industrial Sectors');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid business email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    showToast('Subscribed to ForgeMarket Industrial Procurement Digest');
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-slate-800">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white mx-auto flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
              <Mail className="w-8 h-8" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Subscribe to the Industrial Procurement Digest
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Weekly market intelligence for plant managers, buyers, and EPC contractors. 
              Receive notifications on surplus component batches, raw material price shifts, 
              and lead time forecasts.
            </p>

            {submitted ? (
              <div className="p-8 bg-gradient-to-r from-emerald-900/60 to-emerald-800/60 border border-emerald-500/40 rounded-2xl text-emerald-300 max-w-md mx-auto animate-fade-in flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-4 animate-pulse">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="font-bold text-xl text-white mb-2">Subscription Confirmed!</div>
                <div className="text-sm text-emerald-200 mb-6">
                  We have added <span className="font-mono font-semibold text-white">{email}</span> to the {industryInterest} dispatch list.
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                  className="text-sm font-bold text-slate-300 hover:text-white underline"
                >
                  Register another corporate address
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Enter corporate email address..."
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>

                  <select
                    value={industryInterest}
                    onChange={(e) => setIndustryInterest(e.target.value)}
                    className="px-4 py-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                  >
                    <option value="All Industrial Sectors">All Sectors</option>
                    <option value="Automation & Robotics">Automation & PLCs</option>
                    <option value="CCTV & Security">CCTV & Security</option>
                    <option value="Pumps & Fluid Handling">Pumps & Valves</option>
                    <option value="Electrical & Power">Electrical Power</option>
                  </select>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 flex-shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {error && (
                  <div className="text-xs text-rose-400 text-left font-medium px-2">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Zero-spam policy • Unsubscribe anytime</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
