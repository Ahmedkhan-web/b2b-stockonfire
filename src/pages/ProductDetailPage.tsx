import React, { useState } from 'react';
import { 
  ChevronRight, 
  Heart, 
  ShoppingCart, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Building2, 
  Award, 
  FileCheck,
  Truck,
  RotateCcw,
  Scale
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    setActivePage, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    openRFQModal,
    showToast
  } = useShop();

  const product = selectedProduct || PRODUCTS[0];
  const [quantity, setQuantity] = useState(product.moq || 1);
  const [activeTab, setActiveTab] = useState<'specs' | 'datasheet' | 'compliance' | 'pricing'>('specs');

  const isFavorited = isInWishlist(product.id);
  const minQty = product.moq || 1;

  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && p.categorySlug === product.categorySlug
  ).slice(0, 4);

  const handleDownloadDatasheet = () => {
    showToast(`Downloading technical specification PDF for ${product.partNumber}...`);
  };

  const handleDownloadCAD = () => {
    showToast(`Downloading 3D STEP / CAD model for ${product.partNumber}...`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <button onClick={() => setActivePage('home')} className="hover:text-slate-900">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => setActivePage('catalog')} className="hover:text-slate-900">
            Catalog
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-500">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-bold truncate max-w-xs">{product.partNumber}</span>
        </div>

        {/* Main Product Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Product Images & CAD Assets */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex items-center justify-center h-80 sm:h-96 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg mix-blend-multiply"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors shadow ${
                    isFavorited 
                      ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                      : 'bg-white/90 text-slate-400 hover:text-slate-700 hover:bg-white border border-slate-200'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* Technical Asset Download Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadDatasheet}
                  className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4 text-orange-600" />
                  <span>Datasheet (PDF)</span>
                </button>

                <button
                  onClick={handleDownloadCAD}
                  className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-orange-600" />
                  <span>3D CAD / STEP</span>
                </button>
              </div>

              {/* Guarantee Box */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Factory Origin: {product.origin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span>Warranty: {product.warranty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Insured Global Freight & Net-30 Escrow</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Details, Pricing & Sourcing CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs mb-2">
                  <span className="font-bold text-orange-600 uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <span>•</span>
                  <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    MPN: {product.partNumber}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {product.leadTime}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                  {product.name}
                </h1>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Pricing Card */}
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                      {product.isQuoteOnly ? (
                        <div>
                          <div className="text-xl font-black text-orange-600">Enterprise RFQ Required</div>
                          <div className="text-xs text-slate-500">Subject to volume discount and project contract</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-3xl font-black text-slate-900">
                            ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">Unit Price (FOB Origin) • Volume discounts apply</div>
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-600">
                        Minimum Order Quantity: <span className="font-bold text-slate-900">{product.moq} {product.moqUnit}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Stock Availability: <span className="font-semibold text-emerald-700">{product.stockCount || 50}+ Units Ready</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Volume Tier Pricing Table */}
                {product.volumePricing && (
                  <div className="mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Volume Discount Tiers
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {product.volumePricing.map((tier, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                          <div className="text-slate-500 font-medium text-[11px]">{tier.range}</div>
                          <div className="font-bold text-slate-900 text-sm mt-0.5">${tier.pricePerUnit.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase Actions */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(minQty, quantity - 1))}
                      className="px-3.5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={minQty}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(minQty, parseInt(e.target.value) || minQty))}
                      className="w-16 text-center text-sm font-bold text-slate-900 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 bg-[#0B192C] hover:bg-[#142742] text-white py-3.5 px-6 rounded-lg text-sm font-bold transition-all shadow flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add {quantity}x to Procurement Cart</span>
                  </button>

                  {/* Fast RFQ */}
                  <button
                    onClick={() => openRFQModal(product)}
                    className="bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 py-3.5 px-6 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Request Custom RFQ</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                  <span>Questions about compatibility? Call our technical desk: +1 (800) 492-3829</span>
                  <span className="font-semibold text-slate-700">Net 30 Terms Eligible</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-12">
          <div className="flex border-b border-slate-200 gap-6 text-sm font-bold mb-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'specs' ? 'border-[#0B192C] text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Complete Engineering Specifications
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'compliance' ? 'border-[#0B192C] text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Certifications & Laboratory Approvals
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'pricing' ? 'border-[#0B192C] text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Volume Sourcing & Net Terms
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs sm:text-sm">
              {Object.entries(product.fullSpecs || {}).map(([key, value], idx) => (
                <div key={idx} className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">{key}</span>
                  <span className="font-bold text-slate-900 text-right">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <p>
                This industrial component complies with relevant North American and International Electro-technical Commission standards:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.certifications?.map((c, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">{c} Certified</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-xs">
                Mill Test Reports (MTR 3.1) and Certificates of Conformance (CoC) are archived and accessible via our digital customer procurement portal upon order confirmation.
              </p>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <p>
                Qualified industrial accounts and EPC procurement contractors can unlock customized price schedules based on forecast annual run rates.
              </p>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 text-orange-950 text-xs space-y-1">
                <div className="font-bold">Net 30 / Net 60 Enterprise Credit Terms</div>
                <div>Submit your credit application for limits up to $1,000,000 with zero upfront deposit on authorized purchase orders.</div>
              </div>
            </div>
          )}
        </div>

        {/* Related Equipment Recommendations */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Related Equipment & Accessories
              </h3>
              <button
                onClick={() => setActivePage('catalog')}
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                View Category Catalog →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
