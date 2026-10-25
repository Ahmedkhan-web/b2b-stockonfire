import React from 'react';
import { ShieldCheck, Lock, Truck, Headphones, CheckCircle, FileCheck, Layers, Star } from 'lucide-react';

export const MarketplaceBenefits: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Audited Supplier Verification',
      description: 'Every seller undergoes financial, operational, and ISO 9001 compliance verification before listing products.',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Lock,
      title: 'Escrow & Trade Assurance',
      description: 'Your capital is held securely and released only after inspection against technical specifications.',
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      icon: Truck,
      title: 'Consolidated Global Freight',
      description: 'Combine multiple line items into a single containerized shipment with pre-cleared customs.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      icon: Headphones,
      title: 'Technical Application Engineers',
      description: 'Controls and mechanical engineers review your BOM for compatibility and compliance.',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-blue-600/20">
            <CheckCircle className="w-4 h-4" />
            <span>Enterprise Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Risk-Free Industrial Procurement
          </h2>
          <p className="text-lg text-slate-600">
            Solving traditional supply chain friction with institutional safeguards, transparent pricing, 
            and engineering support for enterprise-grade operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, index) => {
            const Icon = b.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${b.bg} flex items-center justify-center ${b.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {b.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <FileCheck className="w-4 h-4" />
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
