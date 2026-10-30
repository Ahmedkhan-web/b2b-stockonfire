import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, ArrowRight, Award, CheckCircle2, Globe, Clock, Flame } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';

export const Footer: React.FC = () => {
  const { setActivePage, navigateToCategory, openRFQModal } = useShop();

  return (
    <footer className="bg-[#0C1119] text-[#7A8899] text-sm border-t border-[#1A2230]">

      {/* Trust strip */}
      <div className="border-b border-[#1A2230] py-10 bg-[#0A0F18]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck,  title: 'Verified Suppliers', subtitle: 'Strict compliance audit',    color: 'text-[#C8181E]'  },
            { icon: Award,        title: 'ISO 9001 Certified', subtitle: 'Quality management system',  color: 'text-amber-400'  },
            { icon: CheckCircle2, title: 'Net 30/60 Terms',    subtitle: 'Enterprise invoicing',       color: 'text-emerald-400'},
            { icon: Globe,        title: 'Global Logistics',   subtitle: 'Freight consolidation',      color: 'text-[#60A5FA]'  },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3.5 group">
              <div className={`w-11 h-11 rounded-xl bg-[#131B27] flex items-center justify-center ${item.color} border border-[#1E2A3A] flex-shrink-0 group-hover:border-[#C8181E]/30 transition-colors`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm mb-0.5">{item.title}</div>
                <div className="text-xs text-[#4E5B6A]">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <div
              onClick={() => setActivePage('home')}
              className="cursor-pointer flex items-center gap-2.5 select-none group"
            >
              {/* Flame icon matching header */}
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 relative">
                <div className="absolute inset-0 bg-[#C8181E]/20 rounded-full blur-md group-hover:bg-[#C8181E]/30 transition-all" />
                <svg className="w-8 h-8 relative drop-shadow-[0_2px_8px_rgba(200,24,30,0.4)]" viewBox="0 0 32 32" fill="none">
                  <path d="M16 2C16 2 9.5 9.5 9.5 17.5C9.5 22.1944 13.3056 26 18 26C22.6944 26 26.5 22.1944 26.5 17.5C26.5 11.5 20.5 7.5 20.5 7.5C20.5 7.5 21.5 11.5 19.5 13.5C17.5 15.5 15.5 13.5 15.5 10.5C15.5 7.5 16 2 16 2Z" fill="url(#footerFlameGrad)" />
                  <path d="M17 12C17 12 13.5 16 13.5 19.5C13.5 22 15.5 24 18 24C20.5 24 22.5 22 22.5 19.5C22.5 16.5 19.5 14.5 19.5 14.5C19.5 14.5 20 16.5 19 17.5C18 18.5 17 17.5 17 16C17 14.5 17 12 17 12Z" fill="#FF9233" />
                  <defs>
                    <linearGradient id="footerFlameGrad" x1="9.5" y1="2" x2="26.5" y2="26" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E21D24" />
                      <stop offset="1" stopColor="#8C0D11" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  Stock<span className="text-[#C8181E]">OnFire</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.16em] text-[#4E5B6A] font-bold mt-0.5">
                  Industrial Marketplace
                </span>
              </div>
            </div>

            <p className="text-[#5E6E7E] text-sm leading-relaxed max-w-sm">
              StockOnFire is the Middle East's premier B2B industrial marketplace connecting certified 
              manufacturers and verified suppliers with enterprise procurement teams.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { icon: MapPin,  text: 'Riyadh, Saudi Arabia · JAFZA, Dubai' },
                { icon: Phone,   text: '+966 59 489 1832 · Enterprise B2B Desk' },
                { icon: Mail,    text: 'procurement@stockonfire.com' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-[#7A8899]">
                  <div className="w-8 h-8 rounded-lg bg-[#131B27] flex items-center justify-center text-[#C8181E] border border-[#1E2A3A] flex-shrink-0">
                    <item.icon className="w-3.5 h-3.5" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-5 pb-2 border-b border-[#1A2230]">
              Product Catalog
            </h4>
            <ul className="space-y-2.5">
              {CATEGORIES.slice(0, 7).map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => navigateToCategory(c.slug)}
                    className="flex items-center justify-between w-full text-left hover:text-white transition-colors group"
                  >
                    <span className="text-sm text-[#5E6E7E] group-hover:text-white transition-colors truncate pr-2">{c.name}</span>
                    <span className="text-xs text-[#3A4555] font-mono group-hover:text-[#C8181E] transition-colors flex-shrink-0">{c.itemCount.toLocaleString()}</span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => setActivePage('catalog')}
                  className="text-[#C8181E] hover:text-[#F87171] font-semibold text-sm flex items-center gap-1 transition-colors group"
                >
                  View All Categories
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-5 pb-2 border-b border-[#1A2230]">
              Procurement Services
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Request for Quote (RFQ)',  action: () => openRFQModal()                    },
                { label: 'Upload Project BOM',        action: () => openRFQModal()                    },
                { label: 'Net 30/60 Credit Terms',    action: () => setActivePage('become-supplier')  },
                { label: 'Trade Assurance',            action: () => setActivePage('about')            },
                { label: 'Freight Consolidation',      action: () => setActivePage('about')            },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={item.action}
                    className="hover:text-white transition-colors flex items-center gap-2 text-sm text-[#5E6E7E] group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C8181E]/60 group-hover:bg-[#C8181E] transition-colors flex-shrink-0" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-5 pb-2 border-b border-[#1A2230]">
              Corporate
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About StockOnFire',         action: () => setActivePage('about')            },
                { label: 'Supplier Portal',            action: () => setActivePage('become-supplier')  },
                { label: 'Contact Technical Sales',    action: () => setActivePage('contact')          },
                { label: 'Compliance',                 action: () => setActivePage('about')            },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={item.action}
                    className="hover:text-white transition-colors flex items-center gap-2 text-sm text-[#5E6E7E] group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C8181E]/60 group-hover:bg-[#C8181E] transition-colors flex-shrink-0" />
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-3 border-t border-[#1A2230] mt-3">
                <div className="flex items-center gap-2 text-xs text-[#3A4555]">
                  <Clock className="w-3 h-3" />
                  <span>Mon–Fri: 8AM–6PM AST</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-7 border-t border-[#1A2230] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {['ISO 9001:2015', 'CE MARKED', 'UL LISTED', 'RoHS 3', 'ATEX ZONE', 'ITAR COMPLIANT'].map((cert, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-[#131B27] border border-[#1E2A3A] text-[#5E6E7E] hover:text-[#C8181E] hover:border-[#C8181E]/30 transition-all cursor-default"
              >
                {cert}
              </span>
            ))}
          </div>
          <div className="text-[#3A4555] text-xs">
            © 2026 StockOnFire International · All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
