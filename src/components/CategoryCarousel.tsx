import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useShop } from '../context/ShopContext';

export const CategoryCarousel: React.FC = () => {
  const { navigateToCategory } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -360 : 360, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 -mt-12 sm:-mt-16 z-20">
      <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] border border-[#E8E2D7] p-5 sm:p-8 relative overflow-hidden">

        <button
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E8E2D7] shadow-md text-[#4E5463] hover:text-[#C8181E] hover:border-[#C8181E]/40 flex items-center justify-center z-10 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E8E2D7] shadow-md text-[#4E5463] hover:text-[#C8181E] hover:border-[#C8181E]/40 flex items-center justify-center z-10 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2"
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.slug)}
              className="flex-shrink-0 w-36 sm:w-40 flex flex-col items-center text-center cursor-pointer group select-none p-3 rounded-2xl transition-all duration-300 hover:bg-[#F7F3EC]"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center p-2.5 mb-3 bg-[#F7F3EC] group-hover:bg-white border border-transparent group-hover:border-[#C8181E]/20 transition-all duration-300 group-hover:shadow-md">
                <img
                  src={cat.iconImage}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <h3 className="text-xs font-bold text-[#111624] group-hover:text-[#C8181E] transition-colors line-clamp-2 h-9 flex items-center justify-center leading-snug mb-1.5">
                {cat.name}
              </h3>

              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F7F3EC] text-[#7A8092] font-mono text-[10px] font-semibold border border-[#E8E2D7] group-hover:bg-[#C8181E] group-hover:text-white group-hover:border-[#C8181E] transition-all">
                {cat.itemCount.toLocaleString().replace(/,/g, ' ')}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigateToCategory(CATEGORIES[0].slug)}
            className="inline-flex items-center gap-1.5 text-[#C8181E] hover:text-[#A81216] font-bold text-sm transition-colors"
          >
            <span>Browse All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
