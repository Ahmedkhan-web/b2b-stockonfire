import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const TrendingProducts: React.FC = () => {
  const { setActivePage } = useShop();

  const trendingList = PRODUCTS.filter(p => p.trending || p.newArrival).slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Market Trends</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              New Arrivals & Trending Equipment
            </h2>
            <p className="text-slate-600 mt-3 text-lg max-w-xl">
              High-demand components frequently requested by enterprise facilities and system integrators this month.
            </p>
          </div>

          <button
            onClick={() => setActivePage('catalog')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-slate-200 hover:border-blue-300 text-slate-800 font-bold text-base shadow-sm hover:shadow-lg transition-all group"
          >
            <span>Explore All Trending</span>
            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingList.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
};
