import React, { useState, useMemo } from 'react';
import {
  Filter, X, ChevronRight, SlidersHorizontal,
  Grid3X3, LayoutList, Search, Check, RotateCcw,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import { ProductCard } from '../components/ProductCard';

export const CatalogPage: React.FC = () => {
  const {
    searchQuery, setSearchQuery,
    selectedCategoryFilter, setSelectedCategoryFilter,
    selectedBrandFilter, setSelectedBrandFilter,
    setActivePage,
  } = useShop();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.partNumber.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedCategoryFilter && product.categorySlug !== selectedCategoryFilter) return false;
      if (selectedBrandFilter && product.brand !== selectedBrandFilter) return false;
      if (inStockOnly && !product.inStock) return false;
      if (selectedCert !== 'All' && !product.certifications?.includes(selectedCert)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedCategoryFilter, selectedBrandFilter, inStockOnly, selectedCert, sortBy]);

  const activeCategoryObj = CATEGORIES.find(c => c.slug === selectedCategoryFilter);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategoryFilter('');
    setSelectedBrandFilter('');
    setInStockOnly(false);
    setSelectedCert('All');
    setSortBy('featured');
  };

  const hasActiveFilters = searchQuery || selectedCategoryFilter || selectedBrandFilter || inStockOnly || selectedCert !== 'All';

  /* Sidebar content — shared between desktop & mobile */
  const SidebarContent = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D7]">
        <span className="font-bold text-sm text-[#111624] flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#C8181E]" />
          Filters
        </span>
        {hasActiveFilters && (
          <button onClick={resetFilters} className="text-[11px] font-bold text-[#C8181E] hover:underline flex items-center gap-1">
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C93A0] mb-2">Categories</div>
        <div className="space-y-0.5 max-h-56 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedCategoryFilter('')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
              !selectedCategoryFilter ? 'bg-[#C8181E] text-white font-bold' : 'text-[#4E5463] hover:bg-[#F7F3EC]'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px] font-mono opacity-70">{PRODUCTS.length}</span>
          </button>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategoryFilter(c.slug)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                selectedCategoryFilter === c.slug ? 'bg-[#C8181E] text-white font-bold' : 'text-[#4E5463] hover:bg-[#F7F3EC]'
              }`}
            >
              <span className="truncate pr-2">{c.name}</span>
              <span className="text-[10px] font-mono opacity-70">{c.itemCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="pt-4 border-t border-[#E8E2D7]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C93A0] mb-2">Brand / Manufacturer</div>
        <div className="space-y-0.5 max-h-44 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedBrandFilter('')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
              !selectedBrandFilter ? 'bg-[#F7F3EC] text-[#C8181E] font-bold border border-[#E8E2D7]' : 'text-[#4E5463] hover:bg-[#F7F3EC]'
            }`}
          >
            All Brands
          </button>
          {BRANDS.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBrandFilter(b.name)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                selectedBrandFilter === b.name ? 'bg-[#F7F3EC] text-[#C8181E] font-bold border border-[#E8E2D7]' : 'text-[#4E5463] hover:bg-[#F7F3EC]'
              }`}
            >
              <span>{b.name}</span>
              {selectedBrandFilter === b.name && <Check className="w-3 h-3 text-[#C8181E]" />}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div className="pt-4 border-t border-[#E8E2D7]">
        <label className="flex items-center justify-between cursor-pointer text-xs">
          <span className="font-bold text-[#111624]">In-Stock Only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded text-[#C8181E] focus:ring-0 w-4 h-4 cursor-pointer"
          />
        </label>
      </div>

      {/* Certifications */}
      <div className="pt-4 border-t border-[#E8E2D7]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C93A0] mb-2">Certification</div>
        <div className="flex flex-wrap gap-1.5">
          {['All', 'ISO 9001', 'CE', 'UL Listed', 'ATEX', 'RoHS', 'FM Approved'].map(cert => (
            <button
              key={cert}
              onClick={() => setSelectedCert(cert)}
              className={`px-2 py-1 rounded text-[10px] font-mono font-medium transition-colors border ${
                selectedCert === cert
                  ? 'bg-[#C8181E] text-white border-[#C8181E]'
                  : 'bg-[#F7F3EC] text-[#4E5463] border-[#E8E2D7] hover:bg-white'
              }`}
            >
              {cert}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#F7F3EC] min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#8C93A0] mb-6">
          <button onClick={() => setActivePage('home')} className="hover:text-[#111624] transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#111624] font-semibold">
            {activeCategoryObj ? activeCategoryObj.name : 'All Industrial Products'}
          </span>
        </div>

        {/* Page banner */}
        <div className="bg-white rounded-2xl border border-[#E8E2D7] p-5 sm:p-6 mb-7 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#111624] tracking-tight">
                {activeCategoryObj ? activeCategoryObj.name : 'Industrial Product Catalog'}
              </h1>
              <p className="text-xs sm:text-sm text-[#7A8092] mt-1 max-w-2xl leading-relaxed">
                {activeCategoryObj
                  ? activeCategoryObj.description
                  : 'Source verified plant components, industrial automation hardware, instrumentation, and certified security hardware.'}
              </p>
            </div>
            <span className="px-3 py-1.5 bg-[#F7F3EC] rounded-xl text-[#C8181E] font-mono text-xs font-bold border border-[#E8E2D7] flex-shrink-0">
              {filteredProducts.length} Products Found
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">

          {/* Mobile filter toggle */}
          <div className="lg:hidden col-span-12">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 bg-white border border-[#E8E2D7] px-4 py-2.5 rounded-xl text-xs font-bold text-[#111624] shadow-sm hover:border-[#C8181E]/40 transition-all"
            >
              <Filter className="w-4 h-4 text-[#C8181E]" />
              Filter Catalog {hasActiveFilters ? '(Active)' : ''}
            </button>
          </div>

          {/* Mobile filter drawer */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div className="absolute inset-0 bg-[#111624]/50 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
              <div className="relative ml-auto w-72 max-w-full bg-white h-full overflow-y-auto p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-sm text-[#111624]">Filters</span>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1.5 rounded-lg hover:bg-[#F7F3EC] text-[#7A8092]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <SidebarContent />
              </div>
            </div>
          )}

          {/* Desktop sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-[#E8E2D7] p-5 shadow-sm sticky top-28">
            <SidebarContent />
          </aside>

          {/* Main content */}
          <main className="col-span-12 lg:col-span-9 space-y-5">
            {/* Controls bar */}
            <div className="bg-white rounded-2xl border border-[#E8E2D7] p-3.5 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {selectedCategoryFilter && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F3EC] text-[#111624] text-xs font-semibold border border-[#E8E2D7]">
                    Category: {activeCategoryObj?.name}
                    <button onClick={() => setSelectedCategoryFilter('')} className="hover:text-[#C8181E] transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedBrandFilter && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F3EC] text-[#111624] text-xs font-semibold border border-[#E8E2D7]">
                    Brand: {selectedBrandFilter}
                    <button onClick={() => setSelectedBrandFilter('')} className="hover:text-[#C8181E] transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FDF2F2] text-[#C8181E] text-xs font-semibold border border-[#E8E2D7]">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-[#A81216] transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#8C93A0] font-medium">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#F7F3EC] border border-[#E8E2D7] text-[#111624] font-semibold py-1.5 px-2.5 rounded-lg text-xs focus:outline-none focus:border-[#C8181E]/40 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low–High</option>
                    <option value="price-desc">Price: High–Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name A–Z</option>
                  </select>
                </div>
                <div className="flex items-center border border-[#E8E2D7] rounded-xl p-0.5 bg-[#F7F3EC]">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#C8181E]' : 'text-[#8C93A0]'}`}
                    title="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-[#C8181E]' : 'text-[#8C93A0]'}`}
                    title="List view"
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                : 'space-y-4'
              }>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} compact={viewMode === 'list'} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E8E2D7] p-12 text-center space-y-4 shadow-sm">
                <Search className="w-10 h-10 text-[#DFD7CB] mx-auto" />
                <h3 className="text-base font-bold text-[#111624]">No Products Match Your Filters</h3>
                <p className="text-xs text-[#7A8092] max-w-md mx-auto">
                  Try clearing some filter criteria, or submit a custom RFQ to our sourcing engineering team.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#C8181E] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#A81216] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
