import React, { useState } from 'react';
import { X, User, Lock, Building2, CheckCircle2, ShieldCheck, ArrowRight, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AccountModal: React.FC = () => {
  const { accountModalOpen, setAccountModalOpen, showToast } = useShop();
  const [role, setRole] = useState<'buyer' | 'supplier'>('buyer');
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [taxId, setTaxId] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  if (!accountModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const demoName = email.split('@')[0] || 'Enterprise Lead';
    setLoggedInUser(demoName);
    showToast(`Logged in as ${demoName} (${role === 'buyer' ? 'Corporate Buyer' : 'OEM Supplier'})`);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    showToast('Signed out of session');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 relative overflow-hidden"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0B192C] flex items-center justify-center text-orange-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-none">
                {loggedInUser ? 'Account Portal' : isRegister ? 'Enterprise Registration' : 'Enterprise Sign In'}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ForgeMarket Global Procurement Network
              </p>
            </div>
          </div>

          <button
            onClick={() => setAccountModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {loggedInUser ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 capitalize">{loggedInUser}</h4>
                <p className="text-xs text-slate-500">
                  {role === 'buyer' ? 'Corporate Procurement Account (Tier 1)' : 'Verified OEM Supplier (Authorized Partner)'}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Net-30 Credit Line:</span>
                  <span className="font-bold text-emerald-700">$250,000 Approved</span>
                </div>
                <div className="flex justify-between">
                  <span>Active RFQ Inquiries:</span>
                  <span className="font-bold text-slate-900">3 Submissions</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Exemption Certificate:</span>
                  <span className="font-bold text-slate-900">Verified (W-9 / VAT)</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setAccountModalOpen(false)}
                  className="flex-1 bg-[#0B192C] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#142742]"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Role Toggle */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  className={`py-2 rounded-lg transition-all ${
                    role === 'buyer' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Enterprise Buyer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('supplier')}
                  className={`py-2 rounded-lg transition-all ${
                    role === 'supplier' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Verified Supplier
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-3.5">
                {isRegister && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Industrial Systems"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Corporate Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="procurement@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Password *
                    </label>
                    {!isRegister && (
                      <span className="text-[11px] text-orange-600 hover:underline cursor-pointer">
                        Forgot password?
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                  />
                </div>

                {isRegister && role === 'buyer' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business Tax ID / DUNS Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="US EIN, EU VAT, or DUNS"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#0B192C] hover:bg-[#142742] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow flex items-center justify-center gap-2 mt-4"
                >
                  <span>{isRegister ? 'Create Enterprise Account' : 'Sign In to Portal'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                </button>

                {/* Autofill quick demo button */}
                <button
                  type="button"
                  onClick={() => {
                    setEmail('sarah.miller@boeing-supplier.com');
                    setPassword('DemoPass2026!');
                    setCompany('Boeing Tier 1 Supplier');
                  }}
                  className="w-full text-center text-[11px] text-slate-500 hover:text-orange-600 underline py-1"
                >
                  Quick Autofill Demo Enterprise Credentials
                </button>
              </form>

              {/* Toggle Register vs Login */}
              <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
                {isRegister ? (
                  <div>
                    Already have a corporate portal account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegister(false)}
                      className="font-bold text-orange-600 hover:underline"
                    >
                      Sign In
                    </button>
                  </div>
                ) : (
                  <div>
                    Need an enterprise procurement account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegister(true)}
                      className="font-bold text-orange-600 hover:underline"
                    >
                      Register Company
                    </button>
                  </div>
                )}
              </div>

              {/* Demo Mode Notice */}
              <div className="mt-4 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[10px] text-slate-500 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>
                  Frontend demo mode: Authentication uses local browser state. Real backend integrations will connect via OAuth 2.0 / SAML SSO.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
