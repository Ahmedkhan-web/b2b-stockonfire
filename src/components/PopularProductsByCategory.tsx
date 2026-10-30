import React, { useState } from 'react';
import { ArrowRight, Video, Cpu, Activity, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const PopularProductsByCategory: React.FC = () => {
  const { navigateToCategory } = useShop();
  const [selectedCat, setSelectedCat] = useState<'cctv' | 'automation' | 'pumps' | 'safety'>('cctv');

  const categoryConfigs = {
    cctv: {
      name: 'CCTV & Security Systems',
      slug: 'cctv-security-systems',
      icon: Video,
      description: 'Industrial-grade IP67/IK10 network video cameras, thermal imaging, and explosion-proof surveillance.',
      products: PRODUCTS.filter(p => p.categorySlug === 'cctv-security-systems'),
    },
    automation: {
      name: 'Industrial Automation',
      slug: 'industrial-automation',
      icon: Cpu,
      description: 'High-performance PLCs, distributed I/O racks, HMIs, and motion control inverters.',
      products: PRODUCTS.filter(p => p.categorySlug === 'industrial-automation'),
    },
    pumps: {
      name: 'Pumps & Motors',
      slug: 'pumps-motors',
      icon: Activity,
      description: 'Multistage centrifugal pumps, continuous IE3 motors, and chemical dosing systems.',
      products: PRODUCTS.filter(p => p.categorySlug === 'pumps-motors'),
    },
    safety: {
      name: 'Safety Equipment (PPE)',
      slug: 'safety-equipment',
      icon: ShieldCheck,
      description: 'Confined space 4-gas detectors, PAPR respiratory setups, and arc flash safety apparel.',
      products: PRODUCTS.filter(p => p.categorySlug === 'safety-equipment'),
    },
  } as const;

  const currentConfig = categoryConfigs[selectedCat];

  return (
    <section className="py-20 bg-[#F7F3EC]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-6 rounded-full bg-[#C8181E]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#C8181E]">Category Deep Dives</span>
            </div>
            <h2 className="text-3xl sm:text-[2.2rem] font-black text-[#111624] tracking-tight leading-tight">
              Popular Products by Discipline
            </h2>
            <p className="text-[#4E5463] mt-2 text-[15px] max-w-xl leading-relaxed">
              Inspect vetted technical equipment engineered to industry standards.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-[#E8E2D7] shadow-sm overflow-x-auto no-scrollbar flex-shrink-0">
            {(Object.keys(categoryConfigs) as Array<keyof typeof categoryConfigs>).map((key) => {
              const cfg = categoryConfigs[key];
              const Icon = cfg.icon;
              const isActive = selectedCat === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCat(key)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#C8181E] text-white shadow-sm'
                      : 'text-[#4E5463] hover:text-[#C8181E] hover:bg-[#F7F3EC]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#8C93A0]'}`} />
                  <span>{cfg.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category description bar */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D7] mb-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="text-sm font-bold text-[#111624] flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#C8181E]" />
              {currentConfig.name}
            </div>
            <div className="text-xs text-[#7A8092]">{currentConfig.description}</div>
          </div>
          <button
            onClick={() => navigateToCategory(currentConfig.slug)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#F7F3EC] border border-[#E8E2D7] hover:border-[#C8181E]/40 text-[#C8181E] font-bold text-xs transition-all flex-shrink-0"
          >
            <span>View All {currentConfig.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(currentConfig.products.length > 0 ? currentConfig.products : PRODUCTS.slice(0, 4)).map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
};
