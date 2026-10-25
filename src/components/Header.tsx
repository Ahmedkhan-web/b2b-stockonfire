import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Flame,
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOverlayOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOverlayOpen]);

  const searchSuggestions = PRODUCTS.filter((p) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.partNumber.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }).slice(0, 5);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOverlayOpen(false);
    setActivePage('catalog');
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F3EC]/85 backdrop-blur-md border-b border-[#E8E2D7]/80 shadow-sm'
          : 'bg-transparent border-none shadow-none backdrop-blur-none'
      }`}
    >
      {/* ────────────────────────────────────────────────────────
          1. TOP ANNOUNCEMENT BAR (Matching Uploaded Image)
      ──────────────────────────────────────────────────────── */}
      <div className="bg-[#780C10] text-white text-xs py-2 px-4 border-none relative z-10 m-0">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          
          {/* Centered / Left promo text */}
          <div className="flex-1 flex items-center justify-center sm:justify-start gap-2 text-center sm:text-left overflow-hidden">
            <span className="flex-shrink-0 text-sm">🔥</span>
            <p className="text-[11px] sm:text-xs text-white/95 truncate">
              <span className="font-bold">Special Deal:</span> Get up to{' '}
              <span className="font-black">20% OFF</span> on selected industrial
              products <span className="opacity-60 hidden md:inline">|</span>{' '}
              <span className="hidden md:inline text-white/80">
                Limited time only – Don't miss out!
              </span>
            </p>
          </div>

          {/* Right action button */}
          <button
            onClick={() => setActivePage('catalog')}
            className="flex-shrink-0 bg-[#95131A] hover:bg-[#A9171F] active:scale-95 text-white px-3.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          2. MAIN NAVBAR (StockOnFire Brand & Capsule Nav)
      ──────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between gap-4">
        
        {/* BRAND LOGO */}
        <div
          onClick={() => setActivePage('home')}
          className="cursor-pointer flex items-center gap-2.5 select-none flex-shrink-0 group"
        >
          {/* Stylized Red Flame Mark */}
          <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-8 h-8 group-hover:scale-105 transition-transform drop-shadow-[0_2px_8px_rgba(200,24,30,0.25)]"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16 2C16 2 9.5 9.5 9.5 17.5C9.5 22.1944 13.3056 26 18 26C22.6944 26 26.5 22.1944 26.5 17.5C26.5 11.5 20.5 7.5 20.5 7.5C20.5 7.5 21.5 11.5 19.5 13.5C17.5 15.5 15.5 13.5 15.5 10.5C15.5 7.5 16 2 16 2Z"
                fill="url(#headerFlameGrad)"
              />
              <path
                d="M17 12C17 12 13.5 16 13.5 19.5C13.5 22 15.5 24 18 24C20.5 24 22.5 22 22.5 19.5C22.5 16.5 19.5 14.5 19.5 14.5C19.5 14.5 20 16.5 19 17.5C18 18.5 17 17.5 17 16C17 14.5 17 12 17 12Z"
                fill="#FF7A30"
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
            <span className="text-xl sm:text-2xl font-black text-[#111624] tracking-tight leading-none">
              Stock<span className="text-[#C8181E]">OnFire</span>
            </span>
            <span className="text-[8.5px] uppercase tracking-[0.14em] text-[#6A707E] font-bold mt-1">
              Industrial Supplies Marketplace
            </span>
          </div>
        </div>

        {/* ── CENTER PILL NAVIGATION CAPSULE (Desktop) ── */}
        <nav className="hidden lg:flex items-center bg-[#EFE9E0]/80 border border-[#E2DBD0] rounded-full p-1 shadow-sm">
          
          {/* Home Tab */}
          <button
            onClick={() => setActivePage('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              activePage === 'home'
                ? 'bg-white text-[#111624] shadow-sm'
                : 'text-[#4A505E] hover:text-[#111624]'
            }`}
          >
            {activePage === 'home' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8181E]" />
            )}
            <span>Home</span>
          </button>

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button
              onClick={() => setActivePage('catalog')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                activePage === 'catalog'
                  ? 'bg-white text-[#111624] shadow-sm'
                  : 'text-[#4A505E] hover:text-[#111624]'
              }`}
            >
              <span>Products</span>
              <ChevronDown className="w-3 h-3 text-[#6A707E]" />
            </button>

            {productsDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-[#EAE3D8] py-2 z-50">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#8C93A0] tracking-wider border-b border-[#F0EAE1]">
                  Featured Collections
                </div>
                {['All Industrial Catalog', 'Trending Products', 'New Arrivals', 'Verified Suppliers'].map(
                  (item, idx) => (
                    <button
                      key={item}
                      onClick={() => {
                        setActivePage('catalog');
                        setProductsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-semibold text-[#2D3139] hover:bg-[#FDF2F2] hover:text-[#C8181E] flex items-center justify-between"
                    >
                      <span>{item}</span>
                      <ArrowRight className="w-3 h-3 opacity-40" />
                    </button>
                  )
                )}
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
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#4A505E] hover:text-[#111624] transition-all flex items-center gap-1"
            >
              <span>Categories</span>
              <ChevronDown className="w-3 h-3 text-[#6A707E]" />
            </button>

            {categoriesDropdownOpen && (
              <div className="absolute top-full -left-20 mt-1 w-[480px] bg-white rounded-2xl shadow-xl border border-[#EAE3D8] p-3 grid grid-cols-2 gap-1.5 z-50">
                {CATEGORIES.slice(0, 8).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategoryFilter(cat.slug);
                      setActivePage('catalog');
                      setCategoriesDropdownOpen(false);
                    }}
                    className="text-left px-3 py-2 rounded-xl text-xs font-medium text-[#2D3139] hover:bg-[#FDF2F2] hover:text-[#C8181E] flex items-center justify-between transition-colors"
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] text-[#8C93A0] font-mono">
                      {cat.itemCount}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Suppliers */}
          <button
            onClick={() => setActivePage('become-supplier')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activePage === 'become-supplier'
                ? 'bg-white text-[#111624] shadow-sm'
                : 'text-[#4A505E] hover:text-[#111624]'
            }`}
          >
            Suppliers
          </button>

          {/* About */}
          <button
            onClick={() => setActivePage('about')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activePage === 'about'
                ? 'bg-white text-[#111624] shadow-sm'
                : 'text-[#4A505E] hover:text-[#111624]'
            }`}
          >
            About
          </button>

          {/* Contact */}
          <button
            onClick={() => setActivePage('contact')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activePage === 'contact'
                ? 'bg-white text-[#111624] shadow-sm'
                : 'text-[#4A505E] hover:text-[#111624]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* ── RIGHT ACTION BUTTONS (Matching Uploaded Image) ── */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Circular Search Button */}
          <button
            onClick={() => setSearchOverlayOpen(!searchOverlayOpen)}
            aria-label="Search items"
            className="w-9 h-9 rounded-full hover:bg-black/5 active:bg-black/10 flex items-center justify-center text-[#2D3139] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Shopping Cart with Red Count Badge */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            aria-label="View shopping cart"
            className="relative w-9 h-9 rounded-full hover:bg-black/5 active:bg-black/10 flex items-center justify-center text-[#2D3139] transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#C8181E] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          </button>

          {/* Login Button */}
          <button
            onClick={() => setAccountModalOpen(true)}
            className="hidden sm:inline-block text-xs font-bold text-[#111624] hover:text-[#C8181E] px-2.5 py-1.5 transition-colors"
          >
            Login
          </button>

          {/* Dark Charcoal "Get Started →" Pill Button */}
          <button
            onClick={() => setActivePage('catalog')}
            className="bg-[#14171F] hover:bg-[#252936] active:scale-95 text-white px-4 sm:px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation"
            className="lg:hidden p-2 text-[#2D3139] hover:bg-black/5 rounded-lg transition-colors ml-1"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* ── Expandable Search Overlay ── */}
      {searchOverlayOpen && (
        <div className="border-t border-[#EAE3D8] bg-white px-4 py-3 shadow-md">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto flex items-center gap-2 bg-[#F6F2EC] rounded-full px-4 py-2 border border-[#D9D1C7]"
          >
            <Search className="w-4 h-4 text-[#8C93A0]" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by product name, part number, or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-[#111111] placeholder-[#8C93A0]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[#8C93A0] hover:text-[#111111] p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="bg-[#C8181E] hover:bg-[#AA1318] text-white px-4 py-1.5 rounded-full text-xs font-bold"
            >
              Search
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {searchQuery.trim().length > 0 && searchSuggestions.length > 0 && (
            <div className="max-w-2xl mx-auto mt-2 bg-white rounded-xl border border-[#EAE3D8] shadow-lg p-2">
              {searchSuggestions.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    navigateToProduct(p);
                    setSearchOverlayOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-[#FDF2F2] rounded-lg cursor-pointer flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-[#111624]">{p.name}</span>
                  <span className="text-[#C8181E] font-bold">${p.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Mobile Navigation Drawer ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
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
                className="p-1.5 text-[#5A606D] hover:text-[#111624]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2 py-4">
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
                  className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    activePage === page
                      ? 'bg-[#C8181E] text-white'
                      : 'text-[#2D3139] hover:bg-black/5'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Categories */}
            <div className="pt-3 border-t border-[#EAE3D8]">
              <p className="text-[10px] uppercase font-bold text-[#8C93A0] tracking-wider mb-2">
                Categories
              </p>
              <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
                {CATEGORIES.slice(0, 6).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCategoryFilter(c.slug);
                      setActivePage('catalog');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-3 py-1.5 text-xs text-[#373A40] hover:text-[#C8181E]"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Login & CTA in Mobile */}
            <div className="mt-auto pt-4 border-t border-[#EAE3D8] flex flex-col gap-2">
              <button
                onClick={() => {
                  setAccountModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-full border border-[#D9D1C7] text-xs font-bold text-[#111624]"
              >
                Sign In / Register
              </button>
              <button
                onClick={() => {
                  setActivePage('catalog');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-full bg-[#14171F] text-white text-xs font-bold"
              >
                Get Started →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
