import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  ChevronRight, 
  SlidersHorizontal, 
  Grid3X3, 
  LayoutList, 
  Search, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import { ProductCard } from '../components/ProductCard';

export const CatalogPage: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategoryFilter, 
    setSelectedCategoryFilter,
    selectedBrandFilter,
    setSelectedBrandFilter,
    setActivePage
  } = useShop();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
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

      // 2. Category
      if (selectedCategoryFilter) {
        if (product.categorySlug !== selectedCategoryFilter) return false;
      }

      // 3. Brand
      if (selectedBrandFilter) {
        if (product.brand !== selectedBrandFilter) return false;
      }

      // 4. In Stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // 5. Certification
      if (selectedCert !== 'All') {
        if (!product.certifications?.includes(selectedCert)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // default order
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

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => setActivePage('home')} className="hover:text-slate-900">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">
            {activeCategoryObj ? activeCategoryObj.name : 'All Industrial Products'}
          </span>
        </div>

        {/* Page Banner Title */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {activeCategoryObj ? activeCategoryObj.name : 'Industrial Product Catalog'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {activeCategoryObj 
                  ? activeCategoryObj.description 
                  : 'Source verified plant components, industrial automation hardware, instrumentation, and certified security hardware.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-700 font-mono text-xs font-bold border border-slate-200">
                {filteredProducts.length} Products Found
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden col-span-12 flex justify-between items-center mb-2">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-xs font-bold text-slate-700 shadow-sm"
            >
              <Filter className="w-4 h-4 text-orange-600" />
              <span>Filter Catalog {hasActiveFilters ? '(Active)' : ''}</span>
            </button>
          </div>

          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-orange-600" />
                <span>Filters</span>
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-bold text-orange-600 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Categories
              </div>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategoryFilter('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    !selectedCategoryFilter ? 'bg-[#0B192C] text-white font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] font-mono opacity-80">{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategoryFilter(c.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      selectedCategoryFilter === c.slug ? 'bg-[#0B192C] text-white font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-2">{c.name}</span>
                    <span className="text-[10px] font-mono opacity-80">{c.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Brand / Manufacturer
              </div>
              <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedBrandFilter('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    !selectedBrandFilter ? 'bg-orange-50 text-orange-700 font-bold border border-orange-200' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Brands</span>
                </button>
                {BRANDS.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBrandFilter(b.name)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      selectedBrandFilter === b.name ? 'bg-orange-50 text-orange-700 font-bold border border-orange-200' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{b.name}</span>
                    {selectedBrandFilter === b.name && <Check className="w-3.5 h-3.5 text-orange-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center justify-between cursor-pointer text-xs">
                <span className="font-bold text-slate-700">In-Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </label>
            </div>

            {/* Certifications Filter */}
            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Accredited Certification
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'ISO 9001', 'CE', 'UL Listed', 'ATEX', 'RoHS', 'FM Approved'].map(cert => (
                  <button
                    key={cert}
                    onClick={() => setSelectedCert(cert)}
                    className={`px-2 py-1 rounded text-[11px] font-mono font-medium transition-colors border ${
                      selectedCert === cert 
                        ? 'bg-[#0B192C] text-white border-slate-900' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cert}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Main Product Catalog Content */}
          <main className="col-span-12 lg:col-span-9 space-y-6">
            {/* Catalog Top Controls Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-sm flex flex-wrap items-center justify-between gap-4">
              {/* Active Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {selectedCategoryFilter && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                    <span>Category: {activeCategoryObj?.name}</span>
                    <button onClick={() => setSelectedCategoryFilter('')} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedBrandFilter && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                    <span>Brand: {selectedBrandFilter}</span>
                    <button onClick={() => setSelectedBrandFilter('')} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 text-orange-800 text-xs font-semibold border border-orange-200">
                    <span>Query: "{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')} className="hover:text-rose-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {/* Sort By & View Modes */}
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-slate-50 border border-slate-300 text-slate-700 font-semibold py-1.5 px-2.5 rounded-lg text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured / Best Match</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Product Name (A-Z)</option>
                  </select>
                </div>

                <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
                    title="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
                    title="List view"
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Listing */}
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    compact={viewMode === 'list'}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">No Industrial Products Match Your Filters</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try clearing some filter criteria, or submit a custom Request for Quote (RFQ) to our sourcing engineering team.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#0B192C] text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-[#142742]"
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
