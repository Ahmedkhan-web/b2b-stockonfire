import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const FeaturedProducts: React.FC = () => {
  const { setActivePage } = useShop();
  const [activeTab, setActiveTab] = useState<'all' | 'automation' | 'security' | 'stock'>('all');

  const filteredProducts = PRODUCTS.filter(p => {
    if (activeTab === 'automation') return p.categorySlug === 'industrial-automation';
    if (activeTab === 'security') return p.categorySlug === 'cctv-security-systems';
    if (activeTab === 'stock') return p.inStock && p.leadTime.toLowerCase().includes('ready');
    return true;
  });

  const tabs = [
    { id: 'all',        label: 'All Featured'     },
    { id: 'automation', label: 'Automation & PLCs' },
    { id: 'security',   label: 'CCTV & Security'   },
    { id: 'stock',      label: 'Ready to Ship'     },
  ] as const;

  return (
    <section className="py-20 bg-[#F7F3EC]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-6 rounded-full bg-[#C8181E]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#C8181E]">Enterprise Selections</span>
            </div>
            <h2 className="text-3xl sm:text-[2.2rem] font-black text-[#111624] tracking-tight leading-tight">
              Featured Industrial Products
            </h2>
            <p className="text-[#4E5463] mt-2.5 max-w-xl text-[15px] leading-relaxed">
              Vetted OEM components with complete material traceability, manufacturer warranties, and enterprise-grade quality assurance.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-[#E8E2D7] shadow-sm overflow-x-auto no-scrollbar flex-shrink-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#C8181E] text-white shadow-sm'
                    : 'text-[#4E5463] hover:text-[#C8181E] hover:bg-[#F7F3EC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setActivePage('catalog')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-[#E8E2D7] hover:border-[#C8181E]/40 text-[#111624] font-bold text-sm shadow-sm hover:shadow transition-all group"
          >
            <span>View Full Industrial Catalog</span>
            <span className="text-xl font-black text-[#C8181E]">50K+</span>
            <span className="text-[#7A8092] text-xs">SKUs</span>
            <ArrowRight className="w-4 h-4 text-[#C8181E] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
