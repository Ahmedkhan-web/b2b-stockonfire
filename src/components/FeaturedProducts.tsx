import React, { useState } from 'react';
import { ArrowRight, Flame, Sparkles, CheckCircle2, Shield } from 'lucide-react';
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

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Enterprise Selections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Industrial Products
            </h2>
            <p className="text-slate-600 mt-3 max-w-xl text-lg">
              Strictly vetted OEM components with complete material traceability, 
              manufacturer warranties, and enterprise-grade quality assurance.
            </p>
          </div>

          {/* Modern Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'automation', label: 'Automation & PLCs' },
              { id: 'security', label: 'CCTV & Security' },
              { id: 'stock', label: 'Ready to Ship' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modern Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Modern CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setActivePage('catalog')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white border-2 border-slate-200 hover:border-blue-300 text-slate-800 font-bold text-base shadow-sm hover:shadow-lg transition-all group"
          >
            <span>View Full Industrial Catalog</span>
            <span className="text-2xl font-black text-blue-600 group-hover:text-blue-700 transition-colors">50K+</span>
            <span className="text-slate-400">SKUs</span>
            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
