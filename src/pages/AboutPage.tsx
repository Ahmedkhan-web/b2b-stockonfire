import React from 'react';
import {
  Building2, ShieldCheck, Globe2, Users,
  CheckCircle2, Scale, ArrowRight, ChevronRight,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { setActivePage, openRFQModal } = useShop();

  const values = [
    {
      icon: ShieldCheck,
      title: 'Zero Tolerance for Counterfeits',
      description: 'Every component sold through StockOnFire carries authenticated batch serial numbers, manufacturer warranty, and traceable Mill Test Reports (MTR 3.1).',
    },
    {
      icon: Scale,
      title: 'Institutional Trade Assurance',
      description: 'We hold escrow until physical receipt, technical inspection, and QA sign-off by your plant engineering staff.',
    },
    {
      icon: Globe2,
      title: 'Cross-Border Supply Chain Reliability',
      description: 'Consolidated freight hubs across the Middle East, Europe, and Asia reduce customs delays and unify multi-vendor shipments.',
    },
    {
      icon: Users,
      title: 'Engineer-to-Engineer Procurement',
      description: 'Our customer support desk is staffed by certified controls, electrical, and mechanical engineers—not generic call centre agents.',
    },
  ];

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#8C93A0] mb-6">
          <button onClick={() => setActivePage('home')} className="hover:text-[#111624] transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#111624] font-semibold">About StockOnFire</span>
        </div>

        {/* Hero banner */}
        <div className="bg-[#111624] text-white rounded-3xl p-8 sm:p-14 mb-12 border border-[#1E2A3A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8181E]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8181E]/20 text-[#F87171] text-xs font-bold uppercase tracking-wider mb-4 border border-[#C8181E]/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>Saudi Arabia & Middle East Industrial Marketplace</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
              Connecting Heavy Industry with Verified OEM Excellence
            </h1>

            <p className="text-[#A8B4C2] text-sm sm:text-[15px] leading-relaxed mb-10 max-w-2xl">
              StockOnFire was established to modernise legacy industrial procurement in Saudi Arabia and the 
              wider Middle East. By uniting audited manufacturers with transparent tier pricing, digital escrow 
              guarantees, and Net-30 credit terms, we keep critical manufacturing plants and infrastructure 
              moving without costly downtime.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#1E2A3A]">
              {[
                { value: '50k+',  label: 'Verified Industrial SKUs', color: 'text-white'        },
                { value: '1,200+',label: 'Audited OEM Sellers',      color: 'text-[#C8181E]'    },
                { value: '48',    label: 'Countries Served',         color: 'text-white'        },
                { value: '99.8%', label: 'On-Spec Quality Rate',     color: 'text-emerald-400'  },
              ].map((s, i) => (
                <div key={i}>
                  <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-[#5E6E7E] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core pillars */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#111624] tracking-tight mb-2">
              Our Core Operational Standards
            </h2>
            <p className="text-sm text-[#7A8092]">
              How StockOnFire safeguards capital equipment investments for enterprise clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-[#E8E2D7] shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[#C8181E]/30 transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-[#F7F3EC] flex items-center justify-center text-[#C8181E] mb-4 border border-[#E8E2D7] group-hover:bg-[#C8181E] group-hover:text-white group-hover:border-[#C8181E] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#111624] mb-2 group-hover:text-[#C8181E] transition-colors">{val.title}</h3>
                  <p className="text-xs text-[#7A8092] leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global hubs */}
        <div className="bg-white rounded-2xl border border-[#E8E2D7] p-7 sm:p-10 mb-10 shadow-sm">
          <h2 className="text-lg font-bold text-[#111624] mb-6">Global Logistics & Engineering Desks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-[#7A8092]">
            {[
              { city: 'Riyadh (KSA HQ)',    company: 'StockOnFire Saudi Arabia',      address: 'King Fahd Road, Riyadh 12345',                   badge: 'SASO / SABER'         },
              { city: 'Dubai (MENA Hub)',    company: 'StockOnFire Middle East FZCO', address: 'JAFZA One, Jebel Ali Free Zone, Dubai',           badge: 'Oil & Gas Depot'      },
              { city: 'Frankfurt (EU)',      company: 'StockOnFire Continental GmbH', address: 'Cargo City Süd, Geb. 537, Frankfurt',             badge: 'TÜV / CE Lab'         },
              { city: 'Singapore (APAC)',    company: 'StockOnFire Asia Pacific',     address: '1 Harbourfront Ave, Keppel Bay Tower',            badge: 'Freight Forwarding'   },
            ].map((h, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#F7F3EC] border border-[#E8E2D7]">
                <div className="font-bold text-[#111624] text-sm mb-1">{h.city}</div>
                <p>{h.company}</p>
                <p className="text-[#8C93A0] mt-0.5">{h.address}</p>
                <div className="text-[10px] font-mono font-bold text-[#C8181E] mt-2">{h.badge}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-white rounded-2xl border border-[#E8E2D7] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-[#111624]">Have a Large Capital Equipment Project?</h3>
            <p className="text-xs text-[#7A8092] mt-0.5">Connect with an application engineer to review your Bill of Materials.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={() => openRFQModal()}
              className="bg-[#C8181E] hover:bg-[#A81216] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-[0_4px_12px_rgba(200,24,30,0.25)]"
            >
              Submit Project Tender
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="bg-[#F7F3EC] border border-[#E8E2D7] hover:border-[#C8181E]/40 text-[#111624] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-white transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
