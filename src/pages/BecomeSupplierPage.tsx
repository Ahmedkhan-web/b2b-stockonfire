import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  DollarSign, 
  Globe2, 
  ArrowRight, 
  Upload, 
  FileCheck,
  ChevronRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';

export const BecomeSupplierPage: React.FC = () => {
  const { setActivePage, showToast } = useShop();

  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState('OEM Manufacturer');
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('Germany');
  const [selectedCats, setSelectedCats] = useState<string[]>(['cctv-security']);
  const [certifications, setCertifications] = useState<string[]>(['ISO 9001:2015', 'CE']);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleCategory = (id: string) => {
    setSelectedCats(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleCert = (c: string) => {
    setCertifications(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Supplier application received! Vendor Onboarding ID: #VEND-2026-' + Math.floor(1000 + Math.random() * 9000));
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
          <span className="text-slate-800 font-semibold">Become a Verified Supplier</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#0B192C] text-white rounded-2xl p-8 sm:p-12 mb-12 shadow-xl border border-slate-800">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-500/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>OEM & Master Distributor Network</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
              Sell Directly to 120,000+ Enterprise Procurement Officers
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              ForgeMarket gives qualified industrial manufacturers, authorized stocking distributors, and precision component fabricators direct access to pre-cleared buyers across aerospace, energy, robotics, and EPC infrastructure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span>Zero Listing Fees. Pay only on completed transactions.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span>Guaranteed 7-day payment settlement backed by LC.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span>Automated multi-currency and customs compliance.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Card with Steps */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Application Transmitted for Verification</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-900">{contactPerson}</span> from <span className="font-bold text-slate-900">{companyName}</span>. Your supplier dossier has been assigned to our Vendor Onboarding & Quality Assurance Committee.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left max-w-md mx-auto space-y-1.5 text-slate-700">
                <div><span className="font-semibold text-slate-900">Registration Status:</span> Pending Audit Review (24-48 Hours)</div>
                <div><span className="font-semibold text-slate-900">Category Access:</span> {selectedCats.length} Industrial Sectors</div>
                <div><span className="font-semibold text-slate-900">Accreditations:</span> {certifications.join(', ')}</div>
                <div><span className="font-semibold text-slate-900">Confirmation Sent To:</span> {email}</div>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStep(1);
                    setActivePage('home');
                  }}
                  className="bg-[#0B192C] text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-[#142742]"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Step Indicators */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step >= 1 ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    1
                  </div>
                  <span className={`text-xs font-bold ${step >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                    Company Profile
                  </span>
                </div>

                <div className="w-12 h-0.5 bg-slate-200 hidden sm:block" />

                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step >= 2 ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    2
                  </div>
                  <span className={`text-xs font-bold ${step >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                    Catalog & Certifications
                  </span>
                </div>

                <div className="w-12 h-0.5 bg-slate-200 hidden sm:block" />

                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step >= 3 ? 'bg-[#0B192C] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    3
                  </div>
                  <span className={`text-xs font-bold ${step >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>
                    Authorized Representative
                  </span>
                </div>
              </div>

              {/* Step 1 Form */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Step 1: Organization Details</h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Business Classification *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {['OEM Manufacturer', 'Authorized Master Distributor', 'Precision Fabricator'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setBusinessType(t)}
                          className={`p-3 rounded-lg border text-left transition-all font-semibold ${
                            businessType === t 
                              ? 'bg-orange-50 border-orange-500 text-orange-950 shadow-sm' 
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Legal Entity / Company Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Siemens Global Industrial Spares GmbH"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Country of Manufacturing / HQ *</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800 bg-white"
                      >
                        <option value="Germany">Germany</option>
                        <option value="United States">United States</option>
                        <option value="Japan">Japan</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="France">France</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Italy">Italy</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Singapore">Singapore</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={!companyName}
                      onClick={() => setStep(2)}
                      className="bg-[#0B192C] hover:bg-[#142742] disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2"
                    >
                      <span>Proceed to Step 2</span>
                      <ArrowRight className="w-4 h-4 text-orange-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 Form */}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-base font-bold text-slate-900">Step 2: Select Manufacturing Disciplines & Accreditations</h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Select Categories You Provide:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => toggleCategory(cat.id)}
                          className={`p-2.5 text-xs text-left rounded-lg border transition-colors flex items-center justify-between ${
                            selectedCats.includes(cat.id)
                              ? 'bg-[#0B192C] text-white border-slate-900 font-bold'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="truncate pr-1">{cat.name}</span>
                          {selectedCats.includes(cat.id) && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Quality Standards & Factory Certifications:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['ISO 9001:2015', 'CE Marking', 'UL Listed', 'ATEX Zone 1/2', 'RoHS 3', 'AS9100 Aerospace', 'API 607 Fire-Safe', 'NSF-61 Drinking Water'].map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleCert(c)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
                            certifications.includes(c)
                              ? 'bg-orange-600 text-white border-orange-600'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-[#0B192C] hover:bg-[#142742] text-white px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2"
                    >
                      <span>Proceed to Step 3</span>
                      <ArrowRight className="w-4 h-4 text-orange-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 Form */}
              {step === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Step 3: Authorized Executive Sign-off</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Authorized Contact Officer *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Klaus Weber (VP Sales)"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="k.weber@oem-partner.de"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Direct Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+49 (69) 582-109"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Annual Catalog Value</label>
                      <select className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800 bg-white">
                        <option>$500k - $2M USD</option>
                        <option>$2M - $10M USD</option>
                        <option>$10M+ Enterprise OEM</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>
                      By submitting this registration, you certify that all listed components are genuine, factory-tested OEM products with verifiable test certificates and serial traceability.
                    </span>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="bg-[#D9531E] hover:bg-[#c04616] text-white px-7 py-3 rounded-lg text-xs font-bold flex items-center gap-2 shadow"
                    >
                      <span>Submit Verified Supplier Application</span>
                      <CheckCircle2 className="w-4 h-4" />
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
