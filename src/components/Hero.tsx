import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ShieldCheck,
  Truck,
  BadgePercent,
  Headphones,
  ArrowRight,
  Flame,
  Shield,
  Fan,
  Zap,
  Cog,
  Cpu,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';

const TRUST_ITEMS = [
  { icon: ShieldCheck, title: 'Verified Suppliers', sub: 'Trusted & certified' },
  { icon: Truck, title: 'Fast Delivery', sub: 'Global shipping' },
  { icon: BadgePercent, title: 'Best Prices', sub: 'Compare & save' },
  { icon: Headphones, title: '24/7 Support', sub: 'Always here' },
];

const TOP_CATEGORIES = [
  {
    name: 'Fire Safety & Protection',
    slug: 'fire-safety-equipment',
    icon: Flame,
    color: '#C8181E',
    bgColor: '#FDF2F2',
  },
  {
    name: 'Security Systems',
    slug: 'cctv-security-systems',
    icon: Shield,
    color: '#C8181E',
    bgColor: '#FDF2F2',
  },
  {
    name: 'HVAC & Building Management',
    slug: 'hvac-ventilation',
    icon: Fan,
    color: '#C8181E',
    bgColor: '#FDF2F2',
  },
  {
    name: 'Electrical Equipment',
    slug: 'electrical-equipment',
    icon: Zap,
    color: '#C8181E',
    bgColor: '#FDF2F2',
  },
  {
    name: 'Mechanical Equipment',
    slug: 'plumbing-fittings',
    icon: Cog,
    color: '#C8181E',
    bgColor: '#FDF2F2',
  },
  {
    name: 'Industrial Automation',
    slug: 'industrial-automation',
    icon: Cpu,
    color: '#C8181E',
    bgColor: '#FDF2F2',
  },
];

export const Hero: React.FC = () => {
  const { setActivePage, setSearchQuery, navigateToCategory } = useShop();
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) setSearchQuery(localSearch);
    setActivePage('catalog');
  };

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col justify-between -mt-[64px] sm:-mt-[70px] pt-[64px] sm:pt-[70px] lg:h-[calc(100vh-32px)] lg:min-h-[620px] lg:max-h-[880px]"
      style={{
        backgroundColor: '#F7F3EC',
        position: 'relative',
      }}
    >
      {/* ── Background image: hero-products.png (Continuous background for navbar, hero & category section) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          backgroundImage: "url('/images/hero-products.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right bottom',
          backgroundSize: 'cover',
        }}
      />

      {/* Responsive soft gradient on smaller screens so text remains 100% crisp & readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 lg:hidden"
        style={{
          background:
            'linear-gradient(to right, rgba(247, 243, 236, 0.97) 0%, rgba(247, 243, 236, 0.92) 55%, rgba(247, 243, 236, 0.5) 100%)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          MAIN HERO CONTENT AREA (Centered Vertically)
      ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 sm:pt-6 lg:pt-6 pb-2 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* ──────────────────────────────────────────
              LEFT COLUMN — Typography & Search
          ────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Pill Eyebrow Badge */}
            <div className="mb-2.5 sm:mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-[#E4DBD0] shadow-sm">
                <span className="text-[#C8181E] font-bold text-xs">→</span>
                <span className="text-[11px] sm:text-xs font-semibold text-[#373A40] tracking-tight">
                  Trusted by 1000+ Businesses Worldwide
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-black text-[#111624] tracking-tight leading-[1.08] mb-2.5 sm:mb-3 text-[30px] sm:text-[38px] lg:text-[44px] xl:text-[50px]">
              Industrial Products<br />
              for a <span className="text-[#C8181E]">Safer, Stronger</span><br />
              <span className="text-[#C8181E]">Tomorrow</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-[13.5px] text-[#5A606D] max-w-[430px] leading-relaxed mb-3.5 sm:mb-4">
              Find, compare and buy high-quality industrial products from verified suppliers — all in one place.
            </p>

            {/* Pill Search Bar */}
            <form
              onSubmit={handleSearch}
              className="w-full max-w-[500px] bg-white rounded-full border border-[#D9D1C7] shadow-[0_4px_16px_rgba(0,0,0,0.05)] p-1 flex items-center mb-3.5 sm:mb-4 focus-within:border-[#C8181E] focus-within:ring-2 focus-within:ring-[#C8181E]/15 transition-all"
            >
              {/* Search icon + input */}
              <div className="flex items-center flex-1 pl-3 pr-2 gap-2 min-w-0">
                <Search className="w-4 h-4 text-[#8C93A0] flex-shrink-0" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search for products, brands or categories..."
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-[13px] text-[#111111] placeholder-[#8C93A0] py-1.5"
                />
              </div>

              {/* Category dropdown divider & selector */}
              <div className="hidden sm:flex items-center border-l border-[#E2DBD1] pl-2.5 pr-1.5 gap-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs font-semibold text-[#2D3139] cursor-pointer py-1.5 max-w-[125px] pr-1 appearance-none"
                >
                  <option value="All Categories">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-[#6E7480] pointer-events-none flex-shrink-0" />
              </div>

              {/* Submit circular red button */}
              <button
                type="submit"
                aria-label="Search industrial products"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C8181E] hover:bg-[#AA1318] active:scale-95 text-white flex items-center justify-center transition-all flex-shrink-0 shadow-sm"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>

            {/* 4 Trust Value Props */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-[540px]">
              {TRUST_ITEMS.map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-center gap-2 group">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#C8181E]/30 group-hover:border-[#C8181E] group-hover:bg-[#C8181E]/5 flex items-center justify-center text-[#C8181E] flex-shrink-0 transition-colors">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C8181E]" />
                  </div>
                  <div>
                    <h2 className="text-[11px] sm:text-xs font-bold text-[#111624] leading-tight">
                      {title}
                    </h2>
                    <p className="text-[10px] sm:text-[10.5px] text-[#717784] leading-tight">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ──────────────────────────────────────────
              RIGHT COLUMN — Space for background products
              + Floating Industrial Solutions Label
          ────────────────────────────────────────── */}
          <div className="lg:col-span-5 relative flex flex-col justify-between items-end self-stretch min-h-[140px] lg:min-h-[280px]">

            {/* Floating Top-Right Accent Label */}
            <div className="relative mt-1 lg:mt-2 bg-white/70 backdrop-blur-sm lg:bg-transparent p-2.5 lg:p-0 rounded-xl lg:rounded-none border lg:border-none border-[#EADFD2] shadow-sm lg:shadow-none">
              <div className="border-l-2 border-[#C8181E] pl-2.5 py-0.5">
                <p className="text-[9px] font-bold tracking-[0.14em] text-[#C8181E] uppercase mb-0.5">
                  INDUSTRIAL SOLUTIONS
                </p>
                <p className="text-xs sm:text-[13px] font-extrabold text-[#111624] leading-tight">
                  Quality Products<br />for Every Industry
                </p>
                <button
                  onClick={() => setActivePage('catalog')}
                  aria-label="View all quality industrial products"
                  className="mt-0.5 text-[#C8181E] hover:translate-x-1 transition-transform inline-flex items-center font-bold text-xs"
                >
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* The products are integrated into the background hero-products.png */}
            <div className="hidden lg:block w-full flex-1" />
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          BOTTOM ROW — "Explore Our Top Categories"
          (Floats directly over hero background with NO separate background or border)
      ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full bg-transparent py-2 sm:py-2.5 lg:py-3.5 flex-shrink-0">

        {/* Decorative left swoosh curve */}
        <svg
          aria-hidden="true"
          className="absolute -left-2 bottom-2 w-24 h-16 pointer-events-none opacity-40 sm:opacity-70"
          viewBox="0 0 120 80"
          fill="none"
        >
          <path
            d="M -10 75 C 30 75, 45 25, 115 15"
            stroke="#C8181E"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Decorative right swoosh curve */}
        <svg
          aria-hidden="true"
          className="absolute right-0 bottom-1 w-28 h-16 pointer-events-none opacity-40 sm:opacity-70"
          viewBox="0 0 140 80"
          fill="none"
        >
          <path
            d="M 5 75 C 60 70, 85 30, 145 10"
            stroke="#C8181E"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col xl:flex-row xl:items-center gap-3 xl:gap-5">

          {/* Section Heading */}
          <div
            onClick={() => setActivePage('catalog')}
            className="cursor-pointer group flex-shrink-0"
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2.5 h-0.5 bg-[#C8181E] rounded-full" />
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.14em] text-[#C8181E] uppercase">
                SHOP BY CATEGORY
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-base sm:text-lg font-black text-[#111624] group-hover:text-[#C8181E] transition-colors leading-tight">
              <span>Explore Our<br className="hidden sm:inline" /> Top Categories</span>
              <span className="text-sm text-[#C8181E] group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* 6 Category Pills / Cards */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
            {TOP_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  onClick={() => navigateToCategory(cat.slug)}
                  className="group cursor-pointer bg-white/70 hover:bg-white/95 backdrop-blur-sm rounded-xl p-2 sm:p-2.5 border border-[#E5DDD2]/80 hover:border-[#D5C9BC] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center select-none hover:-translate-y-0.5"
                >
                  {/* Circular Icon Badge */}
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: cat.bgColor, color: cat.color }}
                  >
                    <Icon className="w-4 h-4 text-[#C8181E]" />
                  </div>

                  {/* Category Name with Arrow */}
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-[10.5px] sm:text-[11px] font-bold text-[#111624] group-hover:text-[#C8181E] transition-colors line-clamp-1 leading-tight">
                      {cat.name}
                    </span>
                    <span className="text-[9px] text-[#C8181E] group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
