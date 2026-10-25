import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, ArrowRight, Award, CheckCircle2, Globe, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';

export const Footer: React.FC = () => {
  const { setActivePage, navigateToCategory, openRFQModal } = useShop();

  return (
    <footer className="bg-[#0F172A] text-slate-400 text-sm border-t border-slate-800">
      {/* Modern Trust Features Strip */}
      <div className="border-b border-slate-800/80 py-10 bg-[#0B111F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-slate-300">
          {[
            { icon: ShieldCheck, title: 'Verified Suppliers', subtitle: 'Strict compliance audit', color: 'text-blue-400' },
            { icon: Award, title: 'ISO 9001 Certified', subtitle: 'Quality management system', color: 'text-amber-400' },
            { icon: CheckCircle2, title: 'Net 30/60 Terms', subtitle: 'Enterprise invoicing', color: 'text-emerald-400' },
            { icon: Globe, title: 'Global Logistics', subtitle: 'Freight consolidation', color: 'text-purple-400' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 group">
              <div className={`w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center ${item.color} border border-slate-700 group-hover:bg-slate-800 transition-colors`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-white text-sm mb-1 group-hover:text-blue-400 transition-colors">{item.title}</div>
                <div className="text-xs text-slate-500">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div 
              onClick={() => setActivePage('home')}
              className="cursor-pointer flex items-center gap-2.5 select-none group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:shadow-xl transition-all">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Forge<span className="text-blue-500">Market</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              ForgeMarket is the premier global B2B industrial marketplace connecting certified manufacturers, 
              plant managers, and OEMs with direct factory pricing and verified industrial equipment.
            </p>

            <div className="space-y-3 pt-3">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-blue-400 border border-slate-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Global Procurement Hub • Frankfurt & Chicago</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-blue-400 border border-slate-700">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1 (800) 492-3829 • Enterprise B2B Desk</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-blue-400 border border-slate-700">
                  <Mail className="w-4 h-4" />
                </div>
                <span>procurement@forgemarket.com</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-5 pb-2 border-b border-slate-800">
              Product Catalog
            </h4>
            <ul className="space-y-3">
              {CATEGORIES.slice(0, 7).map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => navigateToCategory(c.slug)}
                    className="flex items-center justify-between w-full text-left hover:text-blue-400 transition-colors group"
                  >
                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{c.name}</span>
                    <span className="text-xs text-slate-600 font-mono group-hover:text-blue-400 transition-colors">{c.itemCount.toLocaleString()}</span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => setActivePage('catalog')}
                  className="text-blue-400 hover:underline font-semibold text-sm flex items-center gap-1 group"
                >
                  View All Categories
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-5 pb-2 border-b border-slate-800">
              Procurement Services
            </h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => openRFQModal()} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Request for Quote (RFQ)
                </button>
              </li>
              <li>
                <button onClick={() => openRFQModal()} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Upload Project BOM
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('become-supplier')} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Net 30/60 Credit Terms
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Trade Assurance
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Freight Consolidation
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-5 pb-2 border-b border-slate-800">
              Corporate
            </h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  About ForgeMarket
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('become-supplier')} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Supplier Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Contact Technical Sales
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Compliance
                </button>
              </li>
              <li className="pt-3 border-t border-slate-800 mt-3">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Clock className="w-3 h-3" />
                  <span>Mon-Fri: 8AM-6PM EST</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Modern Certifications Row */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {[
              'ISO 9001:2015',
              'CE MARKED',
              'UL LISTED',
              'RoHS 3',
              'ATEX ZONE',
              'ITAR COMPLIANT',
            ].map((cert, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-slate-800 transition-all cursor-default"
              >
                {cert}
              </span>
            ))}
          </div>

          <div className="text-slate-500 text-xs flex items-center gap-2">
            <span>© 2026 ForgeMarket International Inc.</span>
            <span>•</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
