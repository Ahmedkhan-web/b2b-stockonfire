import React, { useState } from 'react';
import { X, Send, FileSpreadsheet, CheckCircle2, ShieldCheck, Upload, Building2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const RFQModal: React.FC = () => {
  const { rfqModalOpen, closeRFQModal, rfqProduct, showToast } = useShop();

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(rfqProduct?.moq ? String(rfqProduct.moq) : '10');
  const [targetPrice, setTargetPrice] = useState('');
  const [shippingCountry, setShippingCountry] = useState('United States');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!rfqModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email || !email.includes('@')) {
      setError('Please provide your company name and a valid corporate email.');
      return;
    }

    setSubmitted(true);
    showToast('Request for Quote (RFQ) submitted successfully! Quote reference: RFQ-2026-' + Math.floor(1000 + Math.random() * 9000));
  };

  const handleReset = () => {
    setSubmitted(false);
    closeRFQModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B192C] flex items-center justify-center text-orange-400">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-none">
                Submit Request for Quote (RFQ)
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Guaranteed 4-hour pricing turnaround from certified manufacturers
              </p>
            </div>
          </div>

          <button
            onClick={closeRFQModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">RFQ Successfully Logged!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your RFQ has been routed to our technical engineering and vendor desk. We have dispatched a confirmation receipt with quotation ID <span className="font-mono font-bold text-slate-900">#RFQ-94218</span> to <span className="font-bold text-slate-900">{email}</span>.
              </p>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-sm mx-auto text-xs text-left space-y-1.5 text-slate-600">
                <div><span className="font-semibold text-slate-800">Target Item:</span> {rfqProduct ? rfqProduct.name : 'Custom BOM / Project Specs'}</div>
                <div><span className="font-semibold text-slate-800">Volume:</span> {quantity} Units</div>
                <div><span className="font-semibold text-slate-800">Destination:</span> {shippingCountry}</div>
                <div><span className="font-semibold text-slate-800">Payment Standard:</span> Net-30 Escrow Approved</div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="bg-[#0B192C] text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-[#142742] transition-colors"
                >
                  Return to Marketplace
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Reference Notice (if opened from product card) */}
              {rfqProduct && (
                <div className="p-3 bg-orange-50/70 border border-orange-200 rounded-xl flex items-center gap-3">
                  <img
                    src={rfqProduct.image}
                    alt={rfqProduct.name}
                    className="w-12 h-12 object-cover rounded bg-white border border-slate-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="font-bold text-slate-900 truncate">{rfqProduct.name}</div>
                    <div className="text-slate-500 font-mono text-[11px] mt-0.5">
                      Part #: {rfqProduct.partNumber} • Brand: {rfqProduct.brand}
                    </div>
                  </div>
                </div>
              )}

              {/* Company & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Industrial Automation LLC"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Procurement Officer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Corporate Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="s.jenkins@acme-ind.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Direct Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              {/* Volume & Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Quantity *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Unit Price ($)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 420.00"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Delivery Destination *
                  </label>
                  <select
                    value={shippingCountry}
                    onChange={(e) => setShippingCountry(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800 bg-white"
                  >
                    <option value="United States">United States</option>
                    <option value="Germany">Germany (EU Hub)</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Singapore">Singapore (APAC Hub)</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              {/* Technical Notes / Requirements */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Technical Specifications or Special Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify required test certifications (e.g. EN 10204 3.1 MTR), hazardous location ratings, custom voltages, or scheduled release dates..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                />
              </div>

              {/* File Attachment Simulation */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Bill of Materials (BOM) / Specification PDF (Optional)
                </label>
                <div className="border border-dashed border-slate-300 rounded-lg p-3 bg-slate-50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Upload className="w-4 h-4 text-orange-600" />
                    <span>{fileName || 'Drop Excel (.xlsx), CSV, or engineering drawings (PDF)'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFileName('Acme_Plant_BOM_Rev3.xlsx')}
                    className="text-[11px] font-bold text-slate-700 hover:text-orange-600 underline"
                  >
                    {fileName ? 'Replace' : 'Attach Sample BOM'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-xs text-rose-600 font-semibold">{error}</div>
              )}

              {/* Bottom Submit */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Trade Secret NDA Enforced</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={closeRFQModal}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-[#D9531E] hover:bg-[#c04616] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow flex items-center gap-2"
                  >
                    <span>Submit RFQ to Engineering Desk</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
