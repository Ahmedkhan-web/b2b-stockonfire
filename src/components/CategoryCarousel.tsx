import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useShop } from '../context/ShopContext';

export const CategoryCarousel: React.FC = () => {
  const { navigateToCategory } = useShop();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 z-20">
      {/* Modern White Container */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-5 sm:p-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Modern Navigation Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-slate-200 shadow-xl shadow-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center z-10 transition-all hover:scale-110 active:scale-95"
          aria-label="Previous categories"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-slate-200 shadow-xl shadow-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center z-10 transition-all hover:scale-110 active:scale-95"
          aria-label="Next categories"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Horizontal Scrollable Row */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2"
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.slug)}
              className="flex-shrink-0 w-40 sm:w-44 flex flex-col items-center text-center cursor-pointer group select-none p-3 rounded-2xl transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-50 to-blue-100/50 hover:shadow-lg"
            >
              {/* Modern Product Thumbnail */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center p-3 mb-4 bg-gradient-to-br from-slate-50 to-white group-hover:from-blue-100 group-hover:to-blue-50 transition-all duration-300 shadow-md group-hover:shadow-xl group-hover:scale-105">
                <img
                  src={cat.iconImage}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
              </div>

              {/* Category Name */}
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 h-12 flex items-center justify-center leading-snug mb-2">
                {cat.name}
              </h3>

              {/* Modern Item Count Pill */}
              <div className="mt-2">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-mono text-xs font-semibold border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                  {cat.itemCount.toLocaleString().replace(/,/g, ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modern CTA at bottom */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigateToCategory(CATEGORIES[0].slug)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors"
          >
            <span>Browse All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
