import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Flame,
  User,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';

export const Header: React.FC = () => {
  const {
    cartCount,
    activePage,
    setActivePage,
    setAccountModalOpen,
    setCartDrawerOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategoryFilter,
    navigateToProduct,
  } = useShop();

  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFilterCategory, setSearchFilterCategory] = useState<string>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Trending search suggestions
  const TRENDING_TAGS = [
    'Honeywell Smoke Detector',
    'Siemens S7-1200 PLC',
    'Schneider MCCB Breaker',
    'Hikvision 4K Dome Camera',
    'Industrial Fire Sprinkler',
    'Fluke 87V Multimeter',
    'FM-200 Deluge Valve',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus input when search overlay opens & handle ESC key
  useEffect(() => {
    if (searchOverlayOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSearchOverlayOpen(false);
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [searchOverlayOpen, setSearchOverlayOpen]);

  // Filter live search suggestions
  const filteredSuggestions = PRODUCTS.filter((p) => {
    if (searchFilterCategory !== 'all' && p.category !== searchFilterCategory) {
      return false;
    }
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.partNumber.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }).slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchFilterCategory !== 'all') {
      setSelectedCategoryFilter(searchFilterCategory);
    }
    setSearchOverlayOpen(false);
    setActivePage('catalog');
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F3EC]/92 backdrop-blur-xl border-b border-[#E2DBD0] shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
            : 'bg-[#F7F3EC]/85 backdrop-blur-md border-b border-[#E8E2D7]/80 shadow-sm'
        }`}
      >
        {/* ────────────────────────────────────────────────────────
            1. TOP ANNOUNCEMENT BAR (With Blur & Professional Finish)
        ──────────────────────────────────────────────────────── */}
        <div className="bg-[#780C10]/95 backdrop-blur-md text-white text-xs py-2 px-4 border-b border-white/10 relative z-20">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
            {/* Live Indicator + Promo text */}
            <div className="flex-1 flex items-center justify-center sm:justify-start gap-2.5 overflow-hidden">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>

              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold tracking-wide uppercase">
                <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                <span>Live Deal</span>
              </div>

              <p className="text-[11px] sm:text-xs text-white/95 truncate">
                <span className="font-bold">Special Promo:</span> Save up to{' '}
                <span className="font-black text-amber-300">20% OFF</span> on selected industrial equipment{' '}
                <span className="opacity-50 hidden md:inline">|</span>{' '}
                <span className="hidden md:inline text-white/85">
                  Over 10,000+ OEM products ready for same-day dispatch
                </span>
              </p>
            </div>

            {/* Right action button */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="hidden lg:inline-flex text-[11px] text-white/75 items-center gap-1 mr-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Verified B2B Suppliers</span>
              </span>
              <button
                onClick={() => setActivePage('catalog')}
                className="bg-white/15 hover:bg-white/25 active:scale-95 text-white border border-white/25 px-3 sm:px-3.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-sm hover:shadow"
              >
                <span>Shop Deals</span>
                <ArrowRight className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────
            2. MAIN NAVBAR (With Bigger Names & Bigger Adjacent Icons)
        ──────────────────────────────────────────────────────── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between gap-4">
          
          {/* BRAND LOGO */}
          <div
            onClick={() => setActivePage('home')}
            className="cursor-pointer flex items-center gap-2.5 select-none flex-shrink-0 group"
          >
            {/* Stylized Red Flame Mark */}
            <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 relative">
              <div className="absolute inset-0 bg-[#C8181E]/15 rounded-full blur-md group-hover:bg-[#C8181E]/30 transition-all" />
              <svg
                className="w-8 h-8 relative group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_2px_10px_rgba(200,24,30,0.35)]"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M16 2C16 2 9.5 9.5 9.5 17.5C9.5 22.1944 13.3056 26 18 26C22.6944 26 26.5 22.1944 26.5 17.5C26.5 11.5 20.5 7.5 20.5 7.5C20.5 7.5 21.5 11.5 19.5 13.5C17.5 15.5 15.5 13.5 15.5 10.5C15.5 7.5 16 2 16 2Z"
                  fill="url(#headerFlameGrad)"
                />
                <path
                  d="M17 12C17 12 13.5 16 13.5 19.5C13.5 22 15.5 24 18 24C20.5 24 22.5 22 22.5 19.5C22.5 16.5 19.5 14.5 19.5 14.5C19.5 14.5 20 16.5 19 17.5C18 18.5 17 17.5 17 16C17 14.5 17 12 17 12Z"
                  fill="#FF9233"
                />
                <defs>
                  <linearGradient
                    id="headerFlameGrad"
                    x1="9.5"
                    y1="2"
                    x2="26.5"
                    y2="26"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E21D24" />
                    <stop offset="1" stopColor="#8C0D11" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <span className="text-xl sm:text-[23px] font-black text-[#111624] tracking-tight leading-none">
                Stock<span className="text-[#C8181E]">OnFire</span>
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] uppercase tracking-[0.16em] text-[#6A707E] font-bold">
                  Industrial Marketplace
                </span>
                <span className="w-1 h-1 rounded-full bg-emerald-500 hidden sm:inline-block" />
              </div>
            </div>
          </div>

          {/* ── CENTER PILL NAVIGATION CAPSULE (Bigger Font Text Sizes) ── */}
          <nav className="hidden lg:flex items-center bg-[#ECE5DC]/75 backdrop-blur-md border border-[#DFD7CB] rounded-full px-3 py-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] gap-1">
            
            {/* Home Tab */}
            <button
              onClick={() => setActivePage('home')}
              className={`px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                activePage === 'home'
                  ? 'text-[#C8181E] font-bold'
                  : 'text-[#3E4450] hover:text-[#C8181E]'
              }`}
            >
              Home
            </button>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button
                onClick={() => setActivePage('catalog')}
                className={`px-3 py-1.5 text-sm font-semibold transition-colors duration-200 flex items-center gap-1 ${
                  activePage === 'catalog'
                    ? 'text-[#C8181E] font-bold'
                    : 'text-[#3E4450] hover:text-[#C8181E]'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 ${activePage === 'catalog' ? 'text-[#C8181E]' : 'text-[#6A707E]'} transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-[#C8181E]' : ''}`} />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#E8E2D7] py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 text-[10px] uppercase font-bold text-[#8C93A0] tracking-wider border-b border-[#F0EAE1] flex items-center justify-between">
                    <span>Industrial Catalog</span>
                    <span className="text-[#C8181E] font-mono">10,000+ SKUs</span>
                  </div>
                  {[
                    { label: 'All Industrial Catalog', sub: 'Complete B2B product range' },
                    { label: 'Trending Equipment', sub: 'Most requested by engineers' },
                    { label: 'New Arrivals 2026', sub: 'Latest factory additions' },
                    { label: 'Verified OEM Suppliers', sub: 'ISO & UL certified partners' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setActivePage('catalog');
                        setProductsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#FDF2F2] flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#2D3139] group-hover:text-[#C8181E] transition-colors">
                          {item.label}
                        </p>
                        <p className="text-[10px] text-[#7E8492]">
                          {item.sub}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C8181E] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button
                onClick={() => setActivePage('catalog')}
                className="px-3 py-1.5 text-sm font-semibold text-[#3E4450] hover:text-[#C8181E] transition-colors duration-200 flex items-center gap-1"
              >
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#6A707E] transition-transform duration-200 ${categoriesDropdownOpen ? 'rotate-180 text-[#C8181E]' : ''}`} />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute top-full -left-20 mt-2 w-[520px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#E8E2D7] p-3.5 grid grid-cols-2 gap-2 z-50 animate-fade-in">
                  <div className="col-span-2 pb-2 mb-1 border-b border-[#F0EAE1] flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#8C93A0] tracking-wider">
                      Major Industrial Categories
                    </span>
                    <button
                      onClick={() => {
                        setActivePage('catalog');
                        setCategoriesDropdownOpen(false);
                      }}
                      className="text-xs font-bold text-[#C8181E] hover:underline"
                    >
                      View All →
                    </button>
                  </div>
                  {CATEGORIES.slice(0, 8).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategoryFilter(cat.slug);
                        setActivePage('catalog');
                        setCategoriesDropdownOpen(false);
                      }}
                      className="text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#2D3139] hover:bg-[#FDF2F2] hover:text-[#C8181E] flex items-center justify-between transition-all group"
                    >
                      <span className="truncate group-hover:translate-x-0.5 transition-transform">{cat.name}</span>
                      <span className="text-[10px] text-[#8C93A0] font-mono group-hover:text-[#C8181E] bg-[#F7F3EC] px-1.5 py-0.5 rounded-md">
                        {cat.itemCount.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Suppliers */}
            <button
              onClick={() => setActivePage('become-supplier')}
              className={`px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                activePage === 'become-supplier'
                  ? 'text-[#C8181E] font-bold'
                  : 'text-[#3E4450] hover:text-[#C8181E]'
              }`}
            >
              Suppliers
            </button>

            {/* About */}
            <button
              onClick={() => setActivePage('about')}
              className={`px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                activePage === 'about'
                  ? 'text-[#C8181E] font-bold'
                  : 'text-[#3E4450] hover:text-[#C8181E]'
              }`}
            >
              About
            </button>

            {/* Contact */}
            <button
              onClick={() => setActivePage('contact')}
              className={`px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                activePage === 'contact'
                  ? 'text-[#C8181E] font-bold'
                  : 'text-[#3E4450] hover:text-[#C8181E]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* ── RIGHT ACTION AREA: THREE BIGGER ICONS WITHOUT BORDERS/BG + CTA ── */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            
            {/* 1. SEARCH ICON BUTTON (No border, no separate bg) */}
            <button
              onClick={() => setSearchOverlayOpen(!searchOverlayOpen)}
              aria-label="Open search bar over navbar"
              title="Search industrial parts"
              className="w-10 h-10 rounded-full text-[#2D3139] hover:text-[#C8181E] hover:bg-black/5 flex items-center justify-center transition-all active:scale-95 group"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* 2. SHOPPING CART ICON BUTTON (No border, no separate bg) */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              aria-label="View shopping cart"
              title="Shopping Cart"
              className="relative w-10 h-10 rounded-full text-[#2D3139] hover:text-[#C8181E] hover:bg-black/5 flex items-center justify-center transition-all active:scale-95 group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 bg-[#C8181E] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* 3. PROFILE / PERSON ICON BUTTON (No border, no separate bg) */}
            <button
              onClick={() => setAccountModalOpen(true)}
              aria-label="Open Profile & Enterprise Account"
              title="User Profile & Account Portal"
              className="relative w-10 h-10 rounded-full text-[#2D3139] hover:text-[#C8181E] hover:bg-black/5 flex items-center justify-center transition-all active:scale-95 group"
            >
              <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {/* Online indicator dot */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
            </button>

            {/* 4. DARK CHARCOAL "GET STARTED →" CTA BUTTON */}
            <button
              onClick={() => setActivePage('catalog')}
              className="ml-1 sm:ml-1.5 bg-[#14171F] hover:bg-[#C8181E] active:scale-95 text-white px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all duration-200 shadow-sm hover:shadow-[0_4px_16px_rgba(200,24,30,0.3)]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* 5. MOBILE MENU HAMBURGER */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation"
              className="lg:hidden p-2 text-[#2D3139] hover:bg-white/80 rounded-xl transition-colors ml-1"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* ────────────────────────────────────────────────────────
          3. NEW SEARCH BAR OVER THE NAVBAR
          Positioned directly over the navbar with blur & suggestions
      ──────────────────────────────────────────────────────── */}
      {searchOverlayOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center animate-fade-in">
          {/* Frosted Glass Backdrop */}
          <div
            onClick={() => setSearchOverlayOpen(false)}
            className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-md transition-opacity"
          />

          {/* Search Console Container (Directly Over Navbar Area) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-3 sm:pt-4"
          >
            <div className="bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-[#E8E2D7] overflow-hidden">
              
              {/* Top Search Bar Row */}
              <form
                onSubmit={handleSearchSubmit}
                className="p-3 sm:p-4 border-b border-[#EAE3D8] flex items-center gap-2 sm:gap-3 bg-white"
              >
                {/* Search Icon with Accent */}
                <div className="w-10 h-10 rounded-xl bg-[#FDF2F2] flex items-center justify-center flex-shrink-0 text-[#C8181E]">
                  <Search className="w-5 h-5" />
                </div>

                {/* Input Field */}
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search 10,000+ products, part numbers, brands, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-[#111624] placeholder-[#8C93A0] font-medium"
                />

                {/* Clear query button */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 text-[#8C93A0] hover:text-[#111624] hover:bg-slate-100 rounded-lg transition-colors"
                    title="Clear input"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-[#C8181E] hover:bg-[#A81216] active:scale-95 text-white px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Close Button / ESC Badge */}
                <button
                  type="button"
                  onClick={() => setSearchOverlayOpen(false)}
                  className="p-2 text-[#8C93A0] hover:text-[#111624] hover:bg-slate-100 rounded-xl transition-colors ml-1"
                  title="Close search (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>

              {/* Category Filter Chips Bar */}
              <div className="px-4 py-2.5 bg-[#FAF7F2] border-b border-[#EAE3D8] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-bold text-[#6A707E] uppercase tracking-wider flex items-center gap-1 mr-1 flex-shrink-0">
                  <SlidersHorizontal className="w-3 h-3 text-[#C8181E]" /> Filter:
                </span>
                {[
                  { slug: 'all', name: 'All Categories' },
                  { slug: 'fire-safety-equipment', name: 'Fire Safety' },
                  { slug: 'cctv-security-systems', name: 'CCTV Security' },
                  { slug: 'electrical-equipment', name: 'Electrical' },
                  { slug: 'industrial-automation', name: 'Automation' },
                  { slug: 'hvac-ventilation', name: 'HVAC' },
                ].map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSearchFilterCategory(cat.slug)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      searchFilterCategory === cat.slug
                        ? 'bg-[#C8181E] text-white shadow-sm'
                        : 'bg-white hover:bg-[#EFE9E0] text-[#373A40] border border-[#E2DBD0]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Overlay Content Area: Trending or Live Results */}
              <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
                
                {/* 1. If user hasn't typed yet, show trending suggestions */}
                {!searchQuery.trim() && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C93A0] uppercase tracking-wider mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-[#C8181E]" />
                      <span>Trending Industrial Searches</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {TRENDING_TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagClick(tag)}
                          className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#F7F3EC] hover:bg-[#FDF2F2] hover:text-[#C8181E] border border-[#E4DBD0] transition-colors flex items-center gap-1.5"
                        >
                          <Tag className="w-3 h-3 opacity-50" />
                          <span>{tag}</span>
                        </button>
                      ))}
                    </div>

                    {/* Quick Popular Categories Grid */}
                    <div className="pt-4 border-t border-[#EAE3D8]">
                      <p className="text-xs font-bold text-[#8C93A0] uppercase tracking-wider mb-2.5">
                        Browse by Category
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {CATEGORIES.slice(0, 4).map((c) => (
                          <div
                            key={c.id}
                            onClick={() => {
                              setSelectedCategoryFilter(c.slug);
                              setSearchOverlayOpen(false);
                              setActivePage('catalog');
                            }}
                            className="cursor-pointer p-2.5 rounded-xl bg-white hover:bg-[#FDF2F2] border border-[#E8E2D7] hover:border-[#C8181E]/40 transition-all text-left group"
                          >
                            <p className="text-xs font-bold text-[#111624] group-hover:text-[#C8181E] truncate">
                              {c.name}
                            </p>
                            <p className="text-[10px] text-[#717784] font-mono mt-0.5">
                              {c.itemCount.toLocaleString()} items
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Live Matching Products when typing */}
                {searchQuery.trim() && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-[#8C93A0] uppercase tracking-wider mb-3">
                      <span>Matching Products ({filteredSuggestions.length})</span>
                      <button
                        onClick={handleSearchSubmit}
                        className="text-[#C8181E] hover:underline font-bold text-xs capitalize"
                      >
                        View all in Catalog →
                      </button>
                    </div>

                    {filteredSuggestions.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-sm font-bold text-[#111624]">
                          No products found matching "{searchQuery}"
                        </p>
                        <p className="text-xs text-[#6A707E] mt-1">
                          Try searching by brand name, part number, or switch the category filter.
                        </p>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSearchFilterCategory('all');
                          }}
                          className="mt-3 px-4 py-1.5 rounded-full text-xs font-bold bg-[#14171F] text-white hover:bg-[#C8181E] transition-colors"
                        >
                          Reset Search Filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {filteredSuggestions.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              navigateToProduct(prod);
                              setSearchOverlayOpen(false);
                            }}
                            className="cursor-pointer p-3 rounded-xl bg-white hover:bg-[#FDF2F2]/60 border border-[#EAE3D8] hover:border-[#C8181E]/40 transition-all flex items-center gap-3 group shadow-sm hover:shadow"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-14 h-14 object-cover rounded-lg bg-[#F7F3EC] flex-shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-[#C8181E] uppercase tracking-wider">
                                {prod.brand}
                              </span>
                              <h4 className="text-xs font-bold text-[#111624] truncate group-hover:text-[#C8181E] transition-colors">
                                {prod.name}
                              </h4>
                              <p className="text-[10px] text-[#717784] font-mono">
                                SKU: {prod.partNumber}
                              </p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs font-black text-[#111624]">
                                  ${prod.price.toLocaleString()}
                                </span>
                                <span className="text-[9.5px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> In Stock
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Bottom Footer Info Bar */}
              <div className="px-4 py-2.5 bg-[#FAF7F2] border-t border-[#EAE3D8] flex items-center justify-between text-[11px] text-[#717784]">
                <div className="flex items-center gap-3">
                  <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D9D1C7] text-[10px] font-mono">ESC</kbd> to close</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Use <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D9D1C7] text-[10px] font-mono">↵</kbd> to view catalog</span>
                </div>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="font-bold text-[#C8181E] hover:underline flex items-center gap-1"
                >
                  <span>Explore full catalog</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          4. MOBILE NAVIGATION DRAWER
      ──────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-fade-in">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />
          <div className="relative w-80 max-w-full bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 p-5 overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D8]">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-[#C8181E]" />
                <span className="text-lg font-black text-[#111624]">
                  Stock<span className="text-[#C8181E]">OnFire</span>
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#5A606D] hover:text-[#111624] rounded-lg hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1.5 py-4">
              {[
                { label: 'Home', page: 'home' },
                { label: 'Product Catalog', page: 'catalog' },
                { label: 'Become a Supplier', page: 'become-supplier' },
                { label: 'About Us', page: 'about' },
                { label: 'Contact Support', page: 'contact' },
              ].map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => {
                    setActivePage(page as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activePage === page
                      ? 'bg-[#C8181E] text-white shadow-sm'
                      : 'text-[#2D3139] hover:bg-black/5'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Profile & CTA in Mobile */}
            <div className="mt-auto pt-4 border-t border-[#EAE3D8] flex flex-col gap-2">
              <button
                onClick={() => {
                  setAccountModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-white border border-[#DFD7CB] text-sm font-bold text-[#111624] flex items-center justify-center gap-2 shadow-sm"
              >
                <User className="w-4 h-4 text-[#C8181E]" />
                <span>My Profile & Account</span>
              </button>
              <button
                onClick={() => {
                  setActivePage('catalog');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-[#14171F] hover:bg-[#C8181E] text-white text-sm font-bold transition-colors"
              >
                Browse Catalog →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
