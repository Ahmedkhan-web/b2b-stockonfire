import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Users, 
  CheckCircle2, 
  FileCheck, 
  Scale, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { setActivePage, openRFQModal } = useShop();

  const values = [
    {
      icon: ShieldCheck,
      title: 'Zero Tolerance for Counterfeits',
      description: 'Every component sold through ForgeMarket carries authenticated batch serial numbers, manufacturer warranty, and traceable Mill Test Reports (MTR 3.1).'
    },
    {
      icon: Scale,
      title: 'Institutional Trade Assurance',
      description: 'We hold escrow until physical receipt, technical inspection, and QA sign-off by your plant engineering staff.'
    },
    {
      icon: Globe2,
      title: 'Cross-Border Supply Chain Reliability',
      description: 'Consolidated freight hubs across North America, Europe, the Middle East, and Asia reduce customs delays and unify multi-vendor shipments.'
    },
    {
      icon: Users,
      title: 'Engineer-to-Engineer Procurement',
      description: 'Our customer support desk is staffed by certified controls, electrical, and mechanical engineers—not generic call center reps.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => setActivePage('home')} className="hover:text-slate-900">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">About ForgeMarket</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#0B192C] text-white rounded-2xl p-8 sm:p-14 mb-12 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-500/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>International B2B Industrial Infrastructure</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
              Connecting Heavy Industry with Verified OEM Excellence
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              ForgeMarket was established to modernize legacy industrial procurement. By uniting audited manufacturers with transparent tier pricing, digital escrow guarantees, and Net-30 credit terms, we keep critical manufacturing plants and infrastructure moving without costly downtime.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-800 text-center sm:text-left">
              <div>
                <div className="text-3xl font-black text-white">50k+</div>
                <div className="text-xs text-slate-400 mt-1">Verified Industrial SKUs</div>
              </div>
              <div>
                <div className="text-3xl font-black text-orange-400">1,200+</div>
                <div className="text-xs text-slate-400 mt-1">Audited OEM Sellers</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">48</div>
                <div className="text-xs text-slate-400 mt-1">Countries Served</div>
              </div>
              <div>
                <div className="text-3xl font-black text-emerald-400">99.8%</div>
                <div className="text-xs text-slate-400 mt-1">On-Spec Quality Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our Core Operational Standards
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              How ForgeMarket safeguards multimillion-dollar capital equipment investments for global enterprise clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-card-hover transition-all">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-orange-600 mb-4 border border-slate-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{val.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Hubs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 mb-12 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Global Logistics & Engineering Desks
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-600">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm mb-1">Frankfurt Hub (EU)</div>
              <p>ForgeMarket Continental Logistics GmbH</p>
              <p className="text-slate-500 mt-1">Cargo City Süd, Geb. 537, 60549 Frankfurt</p>
              <div className="text-[11px] font-mono text-orange-600 mt-2 font-semibold">TÜV / CE Testing Lab</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm mb-1">Chicago Desk (Americas)</div>
              <p>ForgeMarket Americas Inc.</p>
              <p className="text-slate-500 mt-1">100 N Riverside Plaza, Chicago, IL 60606</p>
              <div className="text-[11px] font-mono text-orange-600 mt-2 font-semibold">UL / ANSI Verification</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm mb-1">Singapore (APAC Hub)</div>
              <p>ForgeMarket Asia Pacific Pte Ltd</p>
              <p className="text-slate-500 mt-1">1 Harbourfront Ave, Keppel Bay Tower</p>
              <div className="text-[11px] font-mono text-orange-600 mt-2 font-semibold">Freight Forwarding Center</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm mb-1">Dubai (MENA Desk)</div>
              <p>ForgeMarket Middle East FZCO</p>
              <p className="text-slate-500 mt-1">JAFZA One, Jebel Ali Free Zone, Dubai</p>
              <div className="text-[11px] font-mono text-orange-600 mt-2 font-semibold">Oil & Gas Equipment Depot</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-8 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-base font-bold text-slate-900">Have a Large Capital Equipment Project?</h3>
            <p className="text-xs text-slate-600">Connect with an application engineer to review your Bill of Materials.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => openRFQModal()}
              className="bg-[#0B192C] text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#142742]"
            >
              Submit Project Tender
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="bg-white border border-slate-300 text-slate-800 px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-slate-50"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
