import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Heart, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Building2, 
  Scale, 
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    openRFQModal,
    navigateToProduct
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'pricing' | 'compliance'>('specs');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const minQty = product.moq || 1;

  const handleAddToCart = () => {
    addToCart(product, Math.max(quantity, minQty));
    setQuickViewProduct(null);
  };

  const handleOpenRFQ = () => {
    openRFQModal(product);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <span className="font-mono text-xs text-slate-500">{product.partNumber}</span>
          </div>

          <button
            onClick={() => setQuickViewProduct(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Image & Certifications */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-center h-64 sm:h-72">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg mix-blend-multiply"
              />
            </div>

            {/* Certifications Row */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Certified Standards & Compliance
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.certifications?.map((c, i) => (
                  <span 
                    key={i} 
                    className="text-xs bg-slate-100 text-slate-700 font-mono font-medium px-2 py-1 rounded border border-slate-200"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-800 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Genuine Factory Sealed Guarantee</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Supplied directly from OEM distribution with manufacturer warranty and full Mill Test Report (MTR).
              </p>
            </div>
          </div>

          {/* Right: Specs & Action Form */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {product.brand}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-3">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Price & MOQ Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-5">
                <div className="flex items-baseline justify-between">
                  <div>
                    {product.isQuoteOnly ? (
                      <div>
                        <span className="text-lg font-black text-orange-600">Enterprise Quote Required</span>
                        <div className="text-xs text-slate-500">Tier pricing calculated by project volume</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl font-black text-slate-900">
                          ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[11px] text-slate-500">Unit Price • Excl. Tax & Shipping</div>
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-600 block">
                      MOQ: <span className="text-slate-900 font-bold">{product.moq} {product.moqUnit}</span>
                    </span>
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 mt-0.5 justify-end">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {product.leadTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specification Tabs */}
              <div className="mb-5">
                <div className="flex border-b border-slate-200 text-xs font-bold gap-4 mb-3">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 border-b-2 transition-colors ${activeTab === 'specs' ? 'border-[#0B192C] text-slate-900' : 'border-transparent text-slate-500'}`}
                  >
                    Technical Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('pricing')}
                    className={`pb-2 border-b-2 transition-colors ${activeTab === 'pricing' ? 'border-[#0B192C] text-slate-900' : 'border-transparent text-slate-500'}`}
                  >
                    Volume Pricing Tiers
                  </button>
                </div>

                {activeTab === 'specs' ? (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.fullSpecs || {}).slice(0, 6).map(([key, val], idx) => (
                      <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">{key}</span>
                        <span className="font-semibold text-slate-800 line-clamp-1">{val}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1.5 text-xs">
                    {product.volumePricing?.map((tier, idx) => (
                      <div key={idx} className="flex justify-between p-2 rounded bg-slate-50 border border-slate-100">
                        <span className="text-slate-700 font-medium">{tier.range}</span>
                        <span className="font-bold text-slate-900">${tier.pricePerUnit.toFixed(2)} / unit</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                {/* Quantity input */}
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(minQty, quantity - 1))}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={minQty}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(minQty, parseInt(e.target.value) || minQty))}
                    className="w-14 text-center text-sm font-bold text-slate-900 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#0B192C] hover:bg-[#142742] text-white py-2.5 px-4 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart ({quantity}x)</span>
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isFavorited ? 'bg-rose-50 border-rose-300 text-rose-600' : 'border-slate-300 text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* RFQ and Full Page buttons */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  onClick={handleOpenRFQ}
                  className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 py-2.5 rounded-lg font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Submit Custom RFQ</span>
                </button>

                <button
                  onClick={() => {
                    navigateToProduct(product);
                    setQuickViewProduct(null);
                  }}
                  className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 py-2.5 rounded-lg font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <span>Full Technical Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
