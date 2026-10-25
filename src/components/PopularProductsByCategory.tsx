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
      products: PRODUCTS.filter(p => p.categorySlug === 'cctv-security-systems')
    },
    automation: {
      name: 'Industrial Automation',
      slug: 'industrial-automation',
      icon: Cpu,
      description: 'High-performance PLCs, distributed I/O racks, HMIs, and motion control inverters.',
      products: PRODUCTS.filter(p => p.categorySlug === 'industrial-automation')
    },
    pumps: {
      name: 'Pumps & Motors',
      slug: 'pumps-motors',
      icon: Activity,
      description: 'Multistage centrifugal pumps, continuous IE3 motors, and chemical dosing systems.',
      products: PRODUCTS.filter(p => p.categorySlug === 'pumps-motors')
    },
    safety: {
      name: 'Safety Equipment (PPE)',
      slug: 'safety-equipment',
      icon: ShieldCheck,
      description: 'Confined space 4-gas detectors, PAPR respiratory setups, and arc flash safety apparel.',
      products: PRODUCTS.filter(p => p.categorySlug === 'safety-equipment')
    }
  };

  const currentConfig = categoryConfigs[selectedCat];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                <span className="text-sm font-bold">↓</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Category Deep Dives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Popular Products by Discipline
            </h2>
            <p className="text-slate-600 mt-3 text-lg max-w-xl">
              Inspect vetted technical equipment engineered to industry standards.
            </p>
          </div>

          {/* Modern Category Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
            {(Object.keys(categoryConfigs) as Array<keyof typeof categoryConfigs>).map((key) => {
              const cfg = categoryConfigs[key];
              const Icon = cfg.icon;
              const isActive = selectedCat === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCat(key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{cfg.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modern Category Description */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-2xl p-6 border border-blue-100 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              {currentConfig.name}
            </div>
            <div className="text-sm text-slate-600">{currentConfig.description}</div>
          </div>
          <button
            onClick={() => navigateToCategory(currentConfig.slug)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border-2 border-blue-200 hover:border-blue-300 text-blue-700 font-bold text-sm transition-all"
          >
            <span>View All {currentConfig.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentConfig.products.length > 0 ? (
            currentConfig.products.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))
          ) : (
            PRODUCTS.slice(0, 4).map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
