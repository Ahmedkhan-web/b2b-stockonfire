import React from 'react';
import { Check, X, Shield, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WhyChooseUs: React.FC = () => {
  const { setActivePage, openRFQModal } = useShop();

  const comparisons = [
    {
      feature: 'Quotation Turnaround',
      traditional: '2–7 business days via email ping-pong',
      stockonfire: 'Instant volume pricing & guaranteed 4-hour RFQ turnaround',
      icon: '⚡',
    },
    {
      feature: 'Pricing Transparency',
      traditional: 'Opaque markup with hidden middleman margins',
      stockonfire: 'Direct OEM factory pricing with tier discount transparency',
      icon: '💎',
    },
    {
      feature: 'Part Authenticity',
      traditional: 'Spot checks; mill test reports often delayed',
      stockonfire: '100% genuine with MTR/3.1 & ISO batch certificates',
      icon: '🛡️',
    },
    {
      feature: 'Enterprise Payment',
      traditional: 'Months of manual credit bureau vetting',
      stockonfire: 'Immediate Net-30/60 trade terms & escrow protection',
      icon: '💳',
    },
    {
      feature: 'Multi-Vendor',
      traditional: 'Separate deliveries, invoices, and customs bills',
      stockonfire: 'Unified shipment, single clearance, consolidated invoice',
      icon: '📦',
    },
  ];

  return (
    <section className="py-20 bg-[#F7F3EC]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D7] text-xs font-bold text-[#4E5463] uppercase tracking-wider mb-3 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-[#C8181E]" />
            <span>The Modern Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-[2.2rem] font-black text-[#111624] tracking-tight leading-tight mb-3">
            Why Modern Procurement Teams Choose StockOnFire
          </h2>
          <p className="text-[15px] text-[#4E5463] leading-relaxed">
            Eliminating weeks of procurement delays, obsolete catalog pricing, and fragmented logistics.
          </p>
        </div>

        {/* Comparison table */}
        <div className="bg-white rounded-3xl border border-[#E8E2D7] shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden max-w-5xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-12 bg-[#F7F3EC] p-5 sm:p-6 border-b border-[#E8E2D7]">
            <div className="col-span-4 text-[#111624] font-bold text-xs uppercase tracking-wider">Requirement</div>
            <div className="col-span-4 text-[#7A8092] font-semibold text-xs uppercase tracking-wider">Traditional Sourcing</div>
            <div className="col-span-4 text-[#C8181E] font-black text-xs uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8181E]" />
              StockOnFire B2B
            </div>
          </div>

          <div className="divide-y divide-[#F0EAE1]">
            {comparisons.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-4 sm:p-5 items-start hover:bg-[#FDF8F3] transition-colors group"
              >
                <div className="col-span-4 font-bold text-[#111624] pr-3 flex items-center gap-3 text-sm">
                  <span className="text-xl leading-none">{item.icon}</span>
                  <span className="group-hover:text-[#C8181E] transition-colors">{item.feature}</span>
                </div>
                <div className="col-span-4 text-[#7A8092] pr-3 flex items-start gap-2 text-xs">
                  <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>{item.traditional}</span>
                </div>
                <div className="col-span-4 flex items-start gap-2 text-xs bg-[#FDF2F2] p-3 rounded-xl border border-[#F0E0E0]">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[#111624] font-medium">{item.stockonfire}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="p-5 sm:p-6 bg-[#F7F3EC] border-t border-[#E8E2D7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-medium text-[#4E5463]">
              Ready to modernize your manufacturing procurement?
            </p>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => openRFQModal()}
                className="flex-1 sm:flex-none bg-[#C8181E] hover:bg-[#A81216] text-white font-bold py-3 px-6 rounded-2xl text-sm transition-all shadow-[0_4px_12px_rgba(200,24,30,0.25)] flex items-center justify-center gap-2"
              >
                <span>Request Custom RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActivePage('about')}
                className="flex-1 sm:flex-none bg-white border border-[#E8E2D7] hover:border-[#C8181E]/40 text-[#111624] font-bold py-3 px-6 rounded-2xl text-sm transition-all"
              >
                Learn About Quality
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
