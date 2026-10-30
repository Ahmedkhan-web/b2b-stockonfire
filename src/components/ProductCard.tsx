import React from 'react';
import { Heart, Eye, ShoppingCart, FileText, CheckCircle2, Clock } from 'lucide-react';
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
    navigateToProduct,
  } = useShop();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-[#E8E2D7] hover:border-[#C8181E]/30 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between overflow-hidden relative">

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex flex-col gap-1.5 items-start">
          {product.featured && (
            <span className="bg-[#C8181E] text-white text-[10px] font-extrabold px-2.5 py-1 rounded tracking-wide uppercase">
              Featured
            </span>
          )}
          {product.trending && (
            <span className="bg-[#111624] text-white text-[10px] font-extrabold px-2.5 py-1 rounded tracking-wide uppercase">
              Trending
            </span>
          )}
          {product.newArrival && (
            <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded tracking-wide uppercase">
              New
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm ${
            isFavorited
              ? 'bg-[#C8181E] text-white border border-[#C8181E]'
              : 'bg-white/90 text-[#8C93A0] hover:text-[#C8181E] hover:bg-white border border-[#E8E2D7]'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Product Image */}
      <div
        onClick={() => navigateToProduct(product)}
        className="cursor-pointer relative pt-4 pb-3 px-4 bg-[#F7F3EC] flex items-center justify-center overflow-hidden h-52 sm:h-56"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
          loading="lazy"
        />

        {/* Quick View */}
        <button
          onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 bg-[#111624] text-white text-xs font-bold py-2 px-4 rounded-full shadow-xl flex items-center gap-2"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3 pointer-events-none">
          <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
            product.inStock ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
          }`}>
            <CheckCircle2 className="w-2.5 h-2.5" />
            <span>{product.inStock ? 'In Stock' : 'Made to Order'}</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Part Number */}
          <div className="flex items-center justify-between text-[11px] mb-2">
            <span className="font-bold text-[#8C93A0] uppercase tracking-wider truncate">
              {product.brand}
            </span>
            <span className="font-mono text-[#8C93A0] bg-[#F7F3EC] px-1.5 py-0.5 rounded border border-[#E8E2D7] truncate max-w-[110px]" title={product.partNumber}>
              {product.partNumber}
            </span>
          </div>

          {/* Product Name */}
          <h4
            onClick={() => navigateToProduct(product)}
            className="text-sm font-bold text-[#111624] group-hover:text-[#C8181E] transition-colors line-clamp-2 cursor-pointer leading-snug mb-3"
            title={product.name}
          >
            {product.name}
          </h4>

          {/* Short Specs */}
          {!compact && product.shortSpecs && product.shortSpecs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.shortSpecs.slice(0, 3).map((spec, i) => (
                <span key={i} className="text-[10px] bg-[#F7F3EC] text-[#4E5463] px-2 py-0.5 rounded border border-[#E8E2D7] font-medium">
                  {spec}
                </span>
              ))}
            </div>
          )}

          {/* Availability Row */}
          <div className="flex items-center justify-between text-xs text-[#7A8092] mb-4 pt-2 border-t border-[#F0EAE1]">
            <div className="flex items-center gap-1.5">
              {product.inStock && <Clock className="w-3 h-3 text-emerald-500" />}
              <span className="font-medium">{product.inStock ? product.leadTime : 'Made to Order'}</span>
            </div>
            <span className="font-medium">
              MOQ: <span className="text-[#111624] font-bold">{product.moq} {product.moqUnit}</span>
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-[#F0EAE1]">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              {product.isQuoteOnly ? (
                <div>
                  <div className="text-sm font-black text-[#C8181E]">Enterprise Quote</div>
                  <div className="text-[10px] text-[#7A8092]">Volume tiered pricing</div>
                </div>
              ) : (
                <div>
                  <div className="text-lg font-black text-[#111624]">
                    ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-[10px] text-[#7A8092]">excl. tax & freight</div>
                </div>
              )}
            </div>
            <button
              onClick={() => openRFQModal(product)}
              className="text-xs font-bold text-[#C8181E] hover:text-[#A81216] flex items-center gap-1 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RFQ</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, product.moq)}
              className="w-full bg-[#111624] hover:bg-[#C8181E] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={() => openRFQModal(product)}
              className="w-full bg-[#F7F3EC] hover:bg-[#C8181E]/10 text-[#111624] hover:text-[#C8181E] border border-[#E8E2D7] hover:border-[#C8181E]/30 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
