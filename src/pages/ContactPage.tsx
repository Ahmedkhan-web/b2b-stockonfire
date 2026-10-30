import React, { useState } from 'react';
import {
  Phone, Mail, Clock, Send, CheckCircle2,
  ShieldCheck, ChevronRight, Headphones,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { setActivePage, showToast, openRFQModal } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('Technical Sales & Quotes');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been assigned Ticket #SOF-SUPPORT-' + Math.floor(1000 + Math.random() * 9000));
  };

  const inputCls = "w-full text-xs p-2.5 rounded-xl border border-[#E8E2D7] bg-[#F7F3EC] focus:bg-white focus:outline-none focus:border-[#C8181E]/50 focus:ring-2 focus:ring-[#C8181E]/10 transition-all";

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#8C93A0] mb-6">
          <button onClick={() => setActivePage('home')} className="hover:text-[#111624] transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#111624] font-semibold">Contact Procurement Support</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D7] text-xs font-bold text-[#4E5463] uppercase tracking-wider mb-3 shadow-sm">
            <Headphones className="w-3.5 h-3.5 text-[#C8181E]" />
            Industrial Support Helpdesk
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111624] tracking-tight mb-2">
            Speak Directly with an Application Engineer
          </h1>
          <p className="text-sm text-[#7A8092] leading-relaxed">
            Get technical specification validation, urgent spares replacement, or tender quote assistance within 4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">

          {/* Left info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-2xl border border-[#E8E2D7] p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-[#111624] pb-3 border-b border-[#E8E2D7]">Direct Contact Channels</h2>

              <div className="space-y-4 text-xs text-[#7A8092]">
                {[
                  {
                    icon: Phone,
                    title: 'Enterprise Sales Hotline',
                    lines: ['+966 59 489 1832 (Saudi Arabia)', '+971 4 229-4100 (UAE / Dubai)'],
                  },
                  {
                    icon: Mail,
                    title: 'Direct Email Routing',
                    lines: ['procurement@stockonfire.com (Tenders & RFQs)', 'engineering@stockonfire.com (Specs Validation)'],
                  },
                  {
                    icon: Clock,
                    title: 'Operational Desks',
                    lines: ['Sunday – Thursday: 8AM – 6PM AST', 'Saturday: 9AM – 1PM (Emergency Spares)'],
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F7F3EC] flex items-center justify-center text-[#C8181E] flex-shrink-0 border border-[#E8E2D7]">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-[#111624] text-xs mb-0.5">{item.title}</div>
                      {item.lines.map((l, j) => <div key={j} className="text-[#8C93A0]">{l}</div>)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-[#FDF2F2] rounded-xl border border-[#F0D0D0]">
                <div className="font-bold text-[#111624] text-xs mb-1">Need an Immediate BOM Quote?</div>
                <p className="text-[#7A8092] text-xs mb-3">Submit your BOM directly through our automated RFQ workflow.</p>
                <button
                  onClick={() => openRFQModal()}
                  className="w-full bg-[#C8181E] hover:bg-[#A81216] text-white py-2 rounded-xl font-bold text-xs transition-all"
                >
                  Launch Fast RFQ Builder
                </button>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E2D7] p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#111624]">Message Dispatched!</h3>
                <p className="text-sm text-[#7A8092] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-[#111624]">{name}</span>. Your inquiry has been routed to the{' '}
                  <span className="font-bold text-[#111624]">{department}</span> team and will be answered within 4 business hours at{' '}
                  <span className="font-bold text-[#111624]">{email}</span>.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage(''); }}
                  className="mt-3 bg-[#C8181E] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#A81216] transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-sm font-bold text-[#111624] pb-3 border-b border-[#E8E2D7]">
                  Send Technical Inquiry or Support Request
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111624] mb-1">Full Name *</label>
                    <input type="text" required placeholder="e.g. Ahmed Al-Rashid" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111624] mb-1">Corporate Email *</label>
                    <input type="email" required placeholder="a.rashid@company.sa" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111624] mb-1">Company / Organisation *</label>
                    <input type="text" required placeholder="Saudi Aramco, SABIC…" value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111624] mb-1">Target Department *</label>
                    <select value={department} onChange={(e) => setDepartment(e.target.value)} className={inputCls}>
                      <option>Technical Sales & Quotes</option>
                      <option>PLC & Controls Compatibility</option>
                      <option>Net-30 Credit Line Onboarding</option>
                      <option>Supplier & OEM Verification</option>
                      <option>Emergency Spares Dispatch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111624] mb-1">Inquiry Details *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Equipment details, quantities, operating conditions, or part numbers…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={inputCls}
                  />
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8C93A0]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Confidential NDA Guaranteed
                  </div>
                  <button
                    type="submit"
                    className="bg-[#C8181E] hover:bg-[#A81216] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-[0_4px_12px_rgba(200,24,30,0.25)] flex items-center gap-2"
                  >
                    <span>Submit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
