import React from 'react';
import { ArrowRight, Building2, CheckCircle2, DollarSign, Globe2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SupplierPromotion: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white overflow-hidden shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -right-40 -top-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-40 bottom-0 w-80 h-80 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            {/* Left Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase tracking-wider mb-5 shadow-lg shadow-amber-500/30">
                  <Building2 className="w-4 h-4" />
                  <span>Wholesale & OEM Partner Program</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                  Expand Your Industrial Reach Globally
                </h2>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                  Are you an OEM manufacturer, master distributor, or certified supplier? List your catalog on ForgeMarket 
                  and connect with verified procurement officers from Fortune 500 plants and infrastructure EPCs.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {[
                    'Instant ERP & EDI Integration',
                    'Guaranteed Net 7 Settlement',
                    'Automated RFQ Ingestion',
                    'Global Export Compliance',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActivePage('become-supplier')}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                >
                  <span>Apply for Verified Status</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActivePage('contact')}
                  className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl text-base transition-all border border-white/20 backdrop-blur-sm"
                >
                  Talk to Supplier Relations
                </button>
              </div>
            </div>

            {/* Modern Stats Cards */}
            <div className="lg:col-span-5 bg-slate-900/60 p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-slate-700 flex flex-col justify-center gap-4">
              {[
                { label: 'Annual RFQ Volume', value: '$450M+', color: 'text-blue-400', bg: 'bg-blue-900/30' },
                { label: 'Verified Buyers', value: '120K+', color: 'text-amber-400', bg: 'bg-amber-900/30' },
                { label: 'Countries Served', value: '48+', color: 'text-emerald-400', bg: 'bg-emerald-900/30' },
              ].map((stat, i) => (
                <div key={i} className={`p-5 rounded-2xl ${stat.bg} border border-slate-700/50 hover:border-slate-600 transition-colors`}>
                  <div className={`text-3xl sm:text-4xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
