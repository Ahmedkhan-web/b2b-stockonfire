import React from 'react';
import { Heart, ShoppingCart, Trash2, ArrowRight, Download, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, setActivePage, showToast, openRFQModal } = useShop();

  const savedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const handleExportCSV = () => {
    showToast('Exported saved procurement list as CSV BOM format.');
  };

  const handleAddAllToCart = () => {
    savedProducts.forEach(prod => addToCart(prod, prod.moq || 1));
    showToast(`Added all ${savedProducts.length} saved products to inquiry cart.`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
              <Heart className="w-4 h-4 fill-orange-600" />
              <span>Procurement Wishlist</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Saved Equipment & Components ({savedProducts.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Organize scheduled project BOM items, compare technical ratings, and generate multi-line quotations.
            </p>
          </div>

          {savedProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="p-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors border border-slate-200"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV BOM</span>
              </button>

              <button
                onClick={handleAddAllToCart}
                className="p-2.5 px-5 rounded-lg bg-[#0B192C] hover:bg-[#142742] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Move All to Cart</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {savedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 stroke-1" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Your Procurement Wishlist is Empty</h2>
            <p className="text-xs text-slate-500 mt-2 mb-6">
              You haven't saved any industrial components yet. Click the heart icon on any product card or detail page to bookmark items for scheduled purchase or engineering review.
            </p>
            <button
              onClick={() => setActivePage('catalog')}
              className="bg-[#0B192C] hover:bg-[#142742] text-white font-bold px-6 py-2.5 rounded-lg text-xs transition-colors"
            >
              Browse Industrial Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
