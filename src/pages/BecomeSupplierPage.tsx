import React, { useState } from 'react';
import {
  Building2, CheckCircle2, ShieldCheck,
  ArrowRight, ChevronRight,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';

export const BecomeSupplierPage: React.FC = () => {
  const { setActivePage, showToast } = useShop();

  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState('OEM Manufacturer');
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('Saudi Arabia');
  const [selectedCats, setSelectedCats] = useState<string[]>(['cctv-security']);
  const [certifications, setCertifications] = useState<string[]>(['ISO 9001:2015', 'CE']);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleCategory = (id: string) =>
    setSelectedCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  const toggleCert = (c: string) =>
    setCertifications(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Supplier application received! Vendor ID: #VEND-2026-' + Math.floor(1000 + Math.random() * 9000));
  };

  const inputCls = "w-full text-xs p-2.5 rounded-xl border border-[#E8E2D7] bg-[#F7F3EC] focus:bg-white focus:outline-none focus:border-[#C8181E]/50 focus:ring-2 focus:ring-[#C8181E]/10 transition-all";

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#8C93A0] mb-6">
          <button onClick={() => setActivePage('home')} className="hover:text-[#111624] transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#111624] font-semibold">Become a Verified Supplier</span>
        </div>

        {/* Hero banner */}
        <div className="bg-[#111624] text-white rounded-3xl p-8 sm:p-12 mb-10 border border-[#1E2A3A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8181E]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8181E]/20 text-[#F87171] text-xs font-bold uppercase tracking-wider mb-4 border border-[#C8181E]/30">
              <Building2 className="w-3.5 h-3.5" />
              OEM & Master Distributor Network
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
              Sell Directly to 120,000+<br />Enterprise Procurement Officers
            </h1>

            <p className="text-[#A8B4C2] text-sm sm:text-[15px] leading-relaxed mb-8 max-w-2xl">
              StockOnFire gives qualified industrial manufacturers, authorised stocking distributors, and precision 
              component fabricators direct access to pre-cleared buyers across Saudi Arabia, the UAE, and the wider Middle East.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-7 border-t border-[#1E2A3A]">
              {[
                'Zero Listing Fees. Pay only on completed transactions.',
                'Guaranteed 7-day payment settlement backed by LC.',
                'Automated multi-currency and customs compliance.',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#A8B4C2]">
                  <CheckCircle2 className="w-4 h-4 text-[#C8181E] flex-shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application card */}
        <div className="bg-white rounded-2xl border border-[#E8E2D7] shadow-sm p-6 sm:p-10 max-w-4xl mx-auto">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-xl font-bold text-[#111624]">Application Transmitted for Verification</h2>
              <p className="text-sm text-[#7A8092] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-[#111624]">{contactPerson}</span> from{' '}
                <span className="font-bold text-[#111624]">{companyName}</span>. Your supplier dossier has been 
                assigned to our Vendor Onboarding & Quality Assurance Committee.
              </p>
              <div className="p-4 bg-[#F7F3EC] rounded-xl border border-[#E8E2D7] text-xs text-left max-w-md mx-auto space-y-1.5 text-[#7A8092]">
                <div><span className="font-semibold text-[#111624]">Status:</span> Pending Audit Review (24–48 Hours)</div>
                <div><span className="font-semibold text-[#111624]">Categories:</span> {selectedCats.length} Industrial Sectors</div>
                <div><span className="font-semibold text-[#111624]">Certifications:</span> {certifications.join(', ')}</div>
                <div><span className="font-semibold text-[#111624]">Confirmation To:</span> {email}</div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => { setSubmitted(false); setStep(1); setActivePage('home'); }}
                  className="bg-[#C8181E] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#A81216] transition-all"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Step indicators */}
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-[#E8E2D7]">
                {[1, 2, 3].map((s) => (
                  <React.Fragment key={s}>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        step >= s ? 'bg-[#C8181E] text-white' : 'bg-[#F7F3EC] text-[#8C93A0] border border-[#E8E2D7]'
                      }`}>
                        {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                      </div>
                      <span className={`text-xs font-bold hidden sm:block transition-colors ${step >= s ? 'text-[#111624]' : 'text-[#8C93A0]'}`}>
                        {s === 1 ? 'Company Profile' : s === 2 ? 'Catalog & Certifications' : 'Authorised Representative'}
                      </span>
                    </div>
                    {s < 3 && <div className="flex-1 h-px bg-[#E8E2D7] mx-3 hidden sm:block" />}
                  </React.Fragment>
                ))}
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="text-sm font-bold text-[#111624]">Step 1: Organisation Details</h3>

                  <div>
                    <label className="block text-xs font-bold text-[#111624] mb-1.5">Business Classification *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {['OEM Manufacturer', 'Authorized Master Distributor', 'Precision Fabricator'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setBusinessType(t)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all font-semibold ${
                            businessType === t
                              ? 'bg-[#FDF2F2] border-[#C8181E] text-[#C8181E]'
                              : 'border-[#E8E2D7] text-[#4E5463] hover:bg-[#F7F3EC]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#111624] mb-1">Legal Entity / Company Name *</label>
                      <input type="text" required placeholder="e.g. Siemens Industrial GmbH" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#111624] mb-1">Country of Manufacturing / HQ *</label>
                      <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputCls}>
                        {['Saudi Arabia', 'United Arab Emirates', 'Germany', 'United States', 'Japan', 'Switzerland', 'France', 'United Kingdom', 'Italy', 'Singapore'].map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      disabled={!companyName}
                      onClick={() => setStep(2)}
                      className="bg-[#C8181E] hover:bg-[#A81216] disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                    >
                      Proceed to Step 2
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-sm font-bold text-[#111624]">Step 2: Manufacturing Disciplines & Accreditations</h3>

                  <div>
                    <label className="block text-xs font-bold text-[#111624] mb-1.5">Select Categories You Provide:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => toggleCategory(cat.id)}
                          className={`p-2.5 text-xs text-left rounded-xl border transition-colors flex items-center justify-between ${
                            selectedCats.includes(cat.id)
                              ? 'bg-[#C8181E] text-white border-[#C8181E] font-bold'
                              : 'bg-[#F7F3EC] text-[#4E5463] border-[#E8E2D7] hover:bg-white'
                          }`}
                        >
                          <span className="truncate pr-1">{cat.name}</span>
                          {selectedCats.includes(cat.id) && <CheckCircle2 className="w-3 h-3 flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#111624] mb-1.5">Quality Standards & Factory Certifications:</label>
                    <div className="flex flex-wrap gap-2">
                      {['ISO 9001:2015', 'CE Marking', 'UL Listed', 'ATEX Zone 1/2', 'RoHS 3', 'AS9100 Aerospace', 'API 607 Fire-Safe', 'NSF-61 Drinking Water'].map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleCert(c)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-colors ${
                            certifications.includes(c)
                              ? 'bg-[#C8181E] text-white border-[#C8181E]'
                              : 'bg-white text-[#4E5463] border-[#E8E2D7] hover:bg-[#F7F3EC]'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 flex justify-between">
                    <button type="button" onClick={() => setStep(1)} className="px-4 py-2 text-xs font-bold text-[#7A8092] hover:text-[#111624] transition-colors">
                      ← Back
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="bg-[#C8181E] hover:bg-[#A81216] text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all">
                      Proceed to Step 3
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  <h3 className="text-sm font-bold text-[#111624]">Step 3: Authorised Executive Sign-off</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#111624] mb-1">Authorised Contact Officer *</label>
                      <input type="text" required placeholder="e.g. Ahmed Al-Rashid (VP Sales)" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#111624] mb-1">Corporate Email *</label>
                      <input type="email" required placeholder="a.rashid@company.sa" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#111624] mb-1">Direct Phone / WhatsApp *</label>
                      <input type="tel" required placeholder="+966 5X XXX XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#111624] mb-1">Estimated Annual Catalog Value</label>
                      <select className={inputCls}>
                        <option>$500k – $2M USD</option>
                        <option>$2M – $10M USD</option>
                        <option>$10M+ Enterprise OEM</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F7F3EC] rounded-xl border border-[#E8E2D7] text-[11px] text-[#7A8092] flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    By submitting, you certify all listed components are genuine, factory-tested OEM products with verifiable test certificates and serial traceability.
                  </div>

                  <div className="pt-3 flex justify-between">
                    <button type="button" onClick={() => setStep(2)} className="px-4 py-2 text-xs font-bold text-[#7A8092] hover:text-[#111624] transition-colors">
                      ← Back
                    </button>
                    <button type="submit" className="bg-[#C8181E] hover:bg-[#A81216] text-white px-7 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-[0_4px_12px_rgba(200,24,30,0.25)] transition-all">
                      Submit Verified Supplier Application
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
