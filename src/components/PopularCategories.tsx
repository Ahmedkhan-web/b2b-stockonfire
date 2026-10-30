import React from 'react';
import { ArrowRight, Layers, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useShop } from '../context/ShopContext';

export const PopularCategories: React.FC = () => {
  const { navigateToCategory, setActivePage } = useShop();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Sourcing Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Popular Product Categories
            </h2>
            <p className="text-slate-600 mt-3 text-lg max-w-xl">
              Quickly browse specialized industrial equipment across certified disciplines.
            </p>
          </div>

          <button
            onClick={() => setActivePage('catalog')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border-2 border-slate-200 hover:border-blue-300 text-slate-800 font-bold text-base shadow-sm hover:shadow-lg transition-all"
          >
            <span>All Categories ({CATEGORIES.length})</span>
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        {/* Modern Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.slug)}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden flex-shrink-0 border border-slate-200/60 p-1.5 group-hover:border-blue-200 transition-colors">
                    <img
                      src={cat.iconImage}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-100 group-hover:bg-blue-100 transition-colors">
                    {cat.itemCount.toLocaleString()} SKUs
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-3 flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </h3>

                <p className="text-sm text-slate-600 line-clamp-2 mb-5 leading-relaxed">
                  {cat.description}
                </p>

                {cat.popularSubcategories && (
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    {cat.popularSubcategories.slice(0, 2).map((sub, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500" />
                        <span className="truncate">{sub}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-slate-700 group-hover:text-blue-600">
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
