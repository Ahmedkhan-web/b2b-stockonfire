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
    showToast('Subscribed to StockOnFire Industrial Procurement Digest');
  };

  return (
    <section className="py-20 bg-[#F7F3EC]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-3xl bg-[#111624] text-white p-8 sm:p-14 relative overflow-hidden border border-[#1E2A3A]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8181E]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/3 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#C8181E] text-white mx-auto flex items-center justify-center mb-5 shadow-[0_4px_16px_rgba(200,24,30,0.35)]">
              <Mail className="w-7 h-7" />
            </div>

            <h2 className="text-3xl sm:text-[2.2rem] font-black text-white tracking-tight leading-tight mb-3">
              Subscribe to the Industrial Procurement Digest
            </h2>

            <p className="text-[15px] text-[#A8B4C2] max-w-2xl mx-auto mb-10 leading-relaxed">
              Weekly market intelligence for plant managers, buyers, and EPC contractors. 
              Receive notifications on surplus batches, raw material price shifts, and lead time forecasts.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-900/40 border border-emerald-500/30 rounded-2xl text-emerald-300 max-w-md mx-auto flex flex-col items-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-3" />
                <div className="font-bold text-xl text-white mb-2">Subscription Confirmed!</div>
                <div className="text-sm text-emerald-200 mb-5">
                  Added <span className="font-mono font-semibold text-white">{email}</span> to the {industryInterest} dispatch list.
                </div>
                <button
                  onClick={() => { setSubmitted(false); setEmail(''); }}
                  className="text-sm font-bold text-[#A8B4C2] hover:text-white underline"
                >
                  Register another address
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5E6A7A]" />
                    <input
                      type="email"
                      placeholder="Enter corporate email address..."
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#5E6A7A] text-sm focus:outline-none focus:border-[#C8181E]/60 focus:ring-2 focus:ring-[#C8181E]/15 transition-all"
                    />
                  </div>

                  <select
                    value={industryInterest}
                    onChange={(e) => setIndustryInterest(e.target.value)}
                    className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold focus:outline-none focus:border-[#C8181E]/60 cursor-pointer"
                  >
                    <option value="All Industrial Sectors">All Sectors</option>
                    <option value="Automation & Robotics">Automation & PLCs</option>
                    <option value="CCTV & Security">CCTV & Security</option>
                    <option value="Pumps & Fluid Handling">Pumps & Valves</option>
                    <option value="Electrical & Power">Electrical Power</option>
                  </select>

                  <button
                    type="submit"
                    className="bg-[#C8181E] hover:bg-[#A81216] text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow-[0_4px_12px_rgba(200,24,30,0.3)] flex items-center justify-center gap-2 flex-shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {error && (
                  <div className="text-xs text-rose-400 text-left font-medium px-1">{error}</div>
                )}

                <div className="flex items-center justify-center gap-2 text-xs text-[#5E6A7A] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero-spam policy · Unsubscribe anytime</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
