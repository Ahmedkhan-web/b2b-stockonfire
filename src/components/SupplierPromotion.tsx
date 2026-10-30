import React from 'react';
import { ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SupplierPromotion: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-3xl bg-[#111624] text-white overflow-hidden border border-[#1E2A3A] relative">
          {/* Accent glows */}
          <div className="absolute -right-40 -top-40 w-96 h-96 bg-[#C8181E]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-40 bottom-0 w-80 h-80 bg-[#C8181E]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            {/* Left */}
            <div className="lg:col-span-7 p-8 sm:p-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8181E]/20 text-[#F87171] text-xs font-bold uppercase tracking-wider mb-5 border border-[#C8181E]/30">
                <Building2 className="w-3.5 h-3.5" />
                <span>Wholesale & OEM Partner Program</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-[2.8rem] font-black text-white tracking-tight leading-tight mb-4">
                Expand Your Industrial<br />Reach Globally
              </h2>

              <p className="text-[#A8B4C2] text-[15px] leading-relaxed mb-8 max-w-xl">
                Are you an OEM manufacturer, master distributor, or certified supplier? List your catalog on StockOnFire 
                and connect with verified procurement officers from Fortune 500 plants and infrastructure EPCs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  'Instant ERP & EDI Integration',
                  'Guaranteed Net 7 Settlement',
                  'Automated RFQ Ingestion',
                  'Global Export Compliance',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-[#D1D9E2]">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActivePage('become-supplier')}
                  className="flex-1 sm:flex-none bg-[#C8181E] hover:bg-[#A81216] text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all shadow-[0_4px_16px_rgba(200,24,30,0.3)] flex items-center justify-center gap-2"
                >
                  <span>Apply for Verified Status</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActivePage('contact')}
                  className="flex-1 sm:flex-none bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-2xl text-sm transition-all border border-white/15"
                >
                  Talk to Supplier Relations
                </button>
              </div>
            </div>

            {/* Right stats */}
            <div className="lg:col-span-5 bg-white/5 p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-center gap-4">
              {[
                { label: 'Annual RFQ Volume', value: '$450M+', color: 'text-[#60A5FA]' },
                { label: 'Verified Buyers',    value: '120K+',  color: 'text-[#C8181E]'  },
                { label: 'Countries Served',   value: '48+',    color: 'text-emerald-400' },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                  <div className={`text-3xl sm:text-4xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-[#A8B4C2] font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
