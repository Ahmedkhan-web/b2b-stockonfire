import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  ChevronRight,
  Headphones
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
    showToast('Your message has been assigned Ticket #FM-SUPPORT-' + Math.floor(1000 + Math.random() * 9000));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => setActivePage('home')} className="hover:text-slate-900">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Contact Procurement Support</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Headphones className="w-4 h-4 text-orange-600" />
            <span>Industrial Support Helpdesk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Speak Directly with an Application Engineer
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Get technical specification validation, urgent spares replacement, or tender quote assistance within 4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Contact Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                Direct Contact Channels
              </h2>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Enterprise Sales Hotline</div>
                    <div className="text-slate-500 mt-0.5">+1 (800) 492-3829 (Toll-Free USA & Canada)</div>
                    <div className="text-slate-500">+49 (69) 829-4100 (Europe Desk)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Direct Email Routing</div>
                    <div className="text-slate-500 mt-0.5">procurement@forgemarket.com (Tenders & RFQs)</div>
                    <div className="text-slate-500">engineering@forgemarket.com (Specs Validation)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Operational Desks</div>
                    <div className="text-slate-500 mt-0.5">Monday – Friday: 24 Hours (Continuous Shift)</div>
                    <div className="text-slate-500">Saturday: 08:00 – 16:00 UTC (Emergency Spares)</div>
                  </div>
                </div>
              </div>

              {/* Fast RFQ Box */}
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 text-xs">
                <div className="font-bold text-orange-950 mb-1">Need an Immediate Bill of Materials Quote?</div>
                <p className="text-orange-900 mb-3">Skip standard contact email and submit your BOM directly through our automated RFQ workflow.</p>
                <button
                  onClick={() => openRFQModal()}
                  className="w-full bg-[#D9531E] hover:bg-[#c04616] text-white py-2 rounded-lg font-bold transition-colors"
                >
                  Launch Fast RFQ Builder
                </button>
              </div>
            </div>
          </div>

          {/* Right Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Dispatched!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-900">{name}</span>. Your inquiry has been routed to the <span className="font-bold text-slate-900">{department}</span> team. An assigned systems engineer will reach out to <span className="font-bold text-slate-900">{email}</span> within 4 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-4 bg-[#0B192C] text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-[#142742]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Send Technical Inquiry or Support Request
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Chang"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="m.chang@plant-automation.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Acme Manufacturing Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Department *
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800 bg-white"
                    >
                      <option value="Technical Sales & Quotes">Technical Sales & Quotes</option>
                      <option value="PLC & Controls Compatibility">PLC & Controls Compatibility</option>
                      <option value="Net-30 Credit Line Onboarding">Net-30 Credit Line Onboarding</option>
                      <option value="Supplier & OEM Verification">Supplier & OEM Verification</option>
                      <option value="Emergency Spares Dispatch">Emergency Spares Dispatch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Inquiry Details / Technical Context *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about the equipment, required quantities, target operating conditions, or part numbers..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Confidential NDA Guaranteed</span>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0B192C] hover:bg-[#142742] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow flex items-center gap-2"
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
