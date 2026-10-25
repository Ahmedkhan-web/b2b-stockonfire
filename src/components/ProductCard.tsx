import React from 'react';
import { Heart, Eye, ShoppingCart, FileText, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { 
    isInWishlist, 
    toggleWishlist, 
    addToCart, 
    setQuickViewProduct, 
    openRFQModal,
    navigateToProduct 
  } = useShop();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* Modern Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex flex-col gap-1.5 items-start">
          {product.featured && (
            <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded tracking-wide uppercase shadow-lg shadow-blue-600/30">
              Featured
            </span>
          )}
          {product.trending && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded tracking-wide uppercase shadow-lg shadow-orange-500/30">
              Trending
            </span>
          )}
          {product.newArrival && (
            <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded tracking-wide uppercase shadow-lg shadow-emerald-500/30">
              New
            </span>
          )}
        </div>

        {/* Modern Wishlist Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`pointer-events-auto p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm ${
            isFavorited 
              ? 'bg-gradient-to-br from-rose-500 to-rose-600 text-white border border-rose-400 shadow-lg shadow-rose-500/30' 
              : 'bg-white/90 text-slate-400 hover:text-rose-600 hover:bg-white border border-slate-200/70 hover:border-rose-200'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4.5 h-4.5 ${isFavorited ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Modern Product Image Area */}
      <div 
        onClick={() => navigateToProduct(product)}
        className="cursor-pointer relative pt-4 pb-3 px-4 bg-gradient-to-br from-slate-50 to-white flex items-center justify-center overflow-hidden h-52 sm:h-56"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-lg mix-blend-multiply"
          loading="lazy"
        />
        
        {/* Modern Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 bg-white/95 text-slate-800 text-xs font-bold py-2 px-4 rounded-full shadow-xl border border-slate-200 hover:bg-white hover:scale-105 flex items-center gap-2 backdrop-blur-md"
        >
          <Eye className="w-4 h-4 text-blue-600" />
          <span>Quick View</span>
        </button>

        {/* Modern Stock Badge */}
        <div className="absolute top-3 right-3">
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm ${
            product.inStock 
              ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' 
              : 'bg-slate-700 text-slate-300'
          }`}>
            <CheckCircle2 className="w-3 h-3" />
            <span>{product.inStock ? 'In Stock' : 'Made to Order'}</span>
          </div>
        </div>
      </div>

      {/* Modern Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Part Number */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] truncate">
              {product.brand}
            </span>
            <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[120px]" title={product.partNumber}>
              {product.partNumber}
            </span>
          </div>

          {/* Modern Product Title */}
          <h4 
            onClick={() => navigateToProduct(product)}
            className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer leading-snug mb-3"
            title={product.name}
          >
            {product.name}
          </h4>

          {/* Modern Short Specs */}
          {!compact && product.shortSpecs && product.shortSpecs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.shortSpecs.slice(0, 3).map((spec, i) => (
                <span 
                  key={i} 
                  className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium border border-slate-200/50"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}

          {/* Modern Availability Row */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              {product.inStock && <Clock className="w-3.5 h-3.5 text-emerald-500" />}
              <span className="text-xs font-medium">
                {product.inStock ? `${product.leadTime}` : 'Made to Order'}
              </span>
            </div>
            <span className="text-xs font-medium text-slate-500">
              MOQ: <span className="text-slate-900 font-bold">{product.moq} {product.moqUnit}</span>
            </span>
          </div>
        </div>

        {/* Modern Pricing and Actions */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              {product.isQuoteOnly ? (
                <div>
                  <div className="text-sm font-black text-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Enterprise Quote
                  </div>
                  <div className="text-[10px] text-slate-400">Volume tiered pricing</div>
                </div>
              ) : (
                <div>
                  <div className="text-lg sm:text-xl font-black text-slate-900">
                    ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[10px] text-slate-500">excl. tax & freight</div>
                </div>
              )}
            </div>

            <button
              onClick={() => openRFQModal(product)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RFQ</span>
            </button>
          </div>

          {/* Modern Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => addToCart(product, product.moq)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => openRFQModal(product)}
              className="w-full bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-200 py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center"
            >
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
