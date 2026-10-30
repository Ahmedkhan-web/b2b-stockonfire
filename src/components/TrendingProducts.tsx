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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-6 rounded-full bg-[#C8181E]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#C8181E]">Market Trends</span>
            </div>
            <h2 className="text-3xl sm:text-[2.2rem] font-black text-[#111624] tracking-tight leading-tight">
              New Arrivals & Trending Equipment
            </h2>
            <p className="text-[#4E5463] mt-2.5 text-[15px] max-w-xl leading-relaxed">
              High-demand components frequently requested by enterprise facilities and system integrators.
            </p>
          </div>

          <button
            onClick={() => setActivePage('catalog')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-[#E8E2D7] hover:border-[#C8181E]/40 text-[#111624] font-bold text-sm shadow-sm hover:shadow transition-all group flex-shrink-0"
          >
            <span>Explore All Trending</span>
            <ArrowRight className="w-4 h-4 text-[#C8181E] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingList.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
};
