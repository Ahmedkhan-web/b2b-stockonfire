import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useShop } from '../context/ShopContext';

export const PopularCategories: React.FC = () => {
  const { navigateToCategory, setActivePage } = useShop();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-6 rounded-full bg-[#C8181E]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#C8181E]">Sourcing Directory</span>
            </div>
            <h2 className="text-3xl sm:text-[2.2rem] font-black text-[#111624] tracking-tight leading-tight">
              Popular Product Categories
            </h2>
            <p className="text-[#4E5463] mt-2.5 text-[15px] max-w-xl leading-relaxed">
              Quickly browse specialised industrial equipment across certified disciplines.
            </p>
          </div>

          <button
            onClick={() => setActivePage('catalog')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-[#E8E2D7] hover:border-[#C8181E]/40 text-[#111624] font-bold text-sm shadow-sm hover:shadow transition-all group flex-shrink-0"
          >
            <span>All Categories ({CATEGORIES.length})</span>
            <ArrowRight className="w-4 h-4 text-[#C8181E] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.slug)}
              className="group bg-[#F7F3EC] hover:bg-white rounded-2xl border border-[#E8E2D7] hover:border-[#C8181E]/30 shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-white overflow-hidden flex-shrink-0 border border-[#E8E2D7] p-1.5 group-hover:border-[#C8181E]/20 transition-colors shadow-sm">
                    <img
                      src={cat.iconImage}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-white text-[#C8181E] font-mono text-[10px] font-bold border border-[#E8E2D7] group-hover:bg-[#C8181E] group-hover:text-white group-hover:border-[#C8181E] transition-all">
                    {cat.itemCount.toLocaleString()} SKUs
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#111624] group-hover:text-[#C8181E] transition-colors mb-2 flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#DFD7CB] group-hover:text-[#C8181E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                </h3>

                <p className="text-xs text-[#7A8092] line-clamp-2 mb-4 leading-relaxed">
                  {cat.description}
                </p>

                {cat.popularSubcategories && (
                  <div className="space-y-1 pt-3 border-t border-[#E8E2D7]">
                    {cat.popularSubcategories.slice(0, 2).map((sub, idx) => (
                      <div key={idx} className="text-[11px] text-[#7A8092] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#DFD7CB] group-hover:bg-[#C8181E] transition-colors flex-shrink-0" />
                        <span className="truncate">{sub}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E2D7] flex items-center justify-between text-xs font-bold text-[#7A8092] group-hover:text-[#C8181E] transition-colors">
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
