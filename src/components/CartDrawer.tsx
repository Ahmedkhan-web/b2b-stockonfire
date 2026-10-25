import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, FileCheck, FileSpreadsheet } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    cartDrawerOpen, 
    setCartDrawerOpen, 
    removeFromCart, 
    updateCartQuantity, 
    cartTotal, 
    setActivePage,
    openRFQModal
  } = useShop();

  if (!cartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={() => setCartDrawerOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0B192C]" />
            <h3 className="text-base font-bold text-slate-900">Procurement Cart</h3>
            <span className="text-xs font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
              {cart.length} line items
            </span>
          </div>

          <button
            onClick={() => setCartDrawerOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-12 h-12 stroke-1 mb-3 text-slate-300" />
              <div className="font-bold text-slate-700 text-sm">Your Procurement Cart is Empty</div>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Browse our catalog of verified industrial automation, CCTV surveillance, and mechanical parts.
              </p>
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  setActivePage('catalog');
                }}
                className="mt-4 bg-[#0B192C] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#142742]"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex gap-3 text-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded bg-white border border-slate-200 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 line-clamp-1 leading-snug">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {item.product.partNumber} • {item.product.brand}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-300 rounded bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-slate-900 text-sm">
                        ${(item.product.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Estimated Goods Total:</span>
                <span className="font-bold text-slate-900 text-sm">
                  ${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Standard Delivery Freight:</span>
                <span className="text-emerald-700 font-medium">Calculated upon destination</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Payment Terms:</span>
                <span className="text-slate-800 font-medium">Net 30 / Escrow Eligible</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  setActivePage('cart');
                }}
                className="w-full bg-[#0B192C] hover:bg-[#142742] text-white py-3 rounded-lg text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
              >
                <span>Review Order & Generate Pro-Forma Invoice</span>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </button>

              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  openRFQModal();
                }}
                className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Convert Cart to Official RFQ</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Institutional Trade Guarantee • Fully Insured Global Freight</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
