import React from 'react';
import { Check, X, Shield, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WhyChooseUs: React.FC = () => {
  const { setActivePage, openRFQModal } = useShop();

  const comparisons = [
    {
      feature: 'Quotation Turnaround',
      traditional: '2 - 7 business days via email ping-pong',
      forgemarket: 'Instant volume pricing & guaranteed 4-hour RFQ turnaround',
      icon: '⚡'
    },
    {
      feature: 'Pricing Transparency',
      traditional: 'Opaque markup with hidden middleman margins',
      forgemarket: 'Direct OEM factory pricing with tier discount transparency',
      icon: '💎'
    },
    {
      feature: 'Part Authenticity',
      traditional: 'Spot checks; mill test reports often delayed',
      forgemarket: '100% genuine with MTR/3.1 & ISO batch certificates',
      icon: '🛡️'
    },
    {
      feature: 'Enterprise Payment',
      traditional: 'Months of manual credit bureau vetting',
      forgemarket: 'Immediate Net-30/60 trade terms & escrow protection',
      icon: '💳'
    },
    {
      feature: 'Multi-Vendor',
      traditional: 'Separate deliveries, invoices, and customs bills',
      forgemarket: 'Unified shipment, single clearance, consolidated invoice',
      icon: '📦'
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-blue-600/20">
            <Shield className="w-4 h-4" />
            <span>The Modern Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Why Modern Procurement Teams Choose ForgeMarket
          </h2>
          <p className="text-lg text-slate-600">
            Eliminating weeks of procurement delays, obsolete catalog pricing, and fragmented logistics.
          </p>
        </div>

        {/* Modern Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-w-5xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b border-slate-200">
            <div className="col-span-4 text-slate-900 font-bold text-sm uppercase tracking-wide">Requirement</div>
            <div className="col-span-4 text-slate-500 font-semibold text-sm uppercase tracking-wide">Traditional Sourcing</div>
            <div className="col-span-4 text-blue-700 font-black text-sm uppercase tracking-wide flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <span>ForgeMarket B2B</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {comparisons.map((item, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-12 p-5 sm:p-6 items-center hover:bg-blue-50/50 transition-colors group"
              >
                <div className="col-span-4 font-bold text-slate-900 pr-3 flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="group-hover:text-blue-600 transition-colors">{item.feature}</span>
                </div>
                <div className="col-span-4 text-slate-500 pr-3 flex items-start gap-2 text-sm">
                  <X className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span className="opacity-80">{item.traditional}</span>
                </div>
                <div className="col-span-4 text-slate-900 font-semibold flex items-start gap-2 text-sm bg-gradient-to-r from-blue-50 to-blue-50/50 p-3 rounded-xl border border-blue-100 group-hover:shadow-sm transition-all">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-800 font-medium">{item.forgemarket}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-slate-600 font-medium">Ready to modernize your manufacturing procurement?</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => openRFQModal()}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                <span>Request Custom RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActivePage('about')}
                className="flex-1 sm:flex-none bg-white border-2 border-slate-200 hover:border-blue-300 text-slate-800 font-bold py-3 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Learn About Quality</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
