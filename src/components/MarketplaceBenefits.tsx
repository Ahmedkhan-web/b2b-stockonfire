import React from 'react';
import { ShieldCheck, Lock, Truck, Headphones, FileCheck } from 'lucide-react';

export const MarketplaceBenefits: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Audited Supplier Verification',
      description: 'Every seller undergoes financial, operational, and ISO 9001 compliance verification before listing products.',
    },
    {
      icon: Lock,
      title: 'Escrow & Trade Assurance',
      description: 'Your capital is held securely and released only after inspection against technical specifications.',
    },
    {
      icon: Truck,
      title: 'Consolidated Global Freight',
      description: 'Combine multiple line items into a single containerised shipment with pre-cleared customs.',
    },
    {
      icon: Headphones,
      title: 'Technical Application Engineers',
      description: 'Controls and mechanical engineers review your BOM for compatibility and compliance.',
    },
  ];

  return (
    <section className="py-20 bg-[#F7F3EC]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D7] text-xs font-bold text-[#4E5463] uppercase tracking-wider mb-3 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8181E]" />
            <span>Enterprise Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-[2.2rem] font-black text-[#111624] tracking-tight leading-tight mb-3">
            Risk-Free Industrial Procurement
          </h2>
          <p className="text-[15px] text-[#4E5463] leading-relaxed">
            Solving traditional supply chain friction with institutional safeguards, transparent pricing, 
            and engineering support for enterprise-grade operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, index) => {
            const Icon = b.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-[#E8E2D7] hover:border-[#C8181E]/30 shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F7F3EC] flex items-center justify-center text-[#C8181E] mb-5 border border-[#E8E2D7] group-hover:bg-[#C8181E] group-hover:text-white group-hover:border-[#C8181E] transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#111624] mb-2.5 group-hover:text-[#C8181E] transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-sm text-[#4E5463] leading-relaxed">
                    {b.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#E8E2D7] flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Guaranteed Policy Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
