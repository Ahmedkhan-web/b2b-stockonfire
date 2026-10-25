import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  FileSpreadsheet, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight,
  Printer,
  Building2,
  FileCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    cartTotal, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    setActivePage, 
    openRFQModal,
    showToast 
  } = useShop();

  const [paymentMethod, setPaymentMethod] = useState<'net30' | 'wire' | 'card'>('net30');
  const [poNumber, setPoNumber] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const estimatedTax = cartTotal * 0.05; // 5% industrial estimate
  const estimatedFreight = cart.length > 0 ? 180.00 : 0.00;
  const grandTotal = cartTotal + estimatedTax + estimatedFreight;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
    showToast('Pro-Forma Order Logged! Purchase Order reference: PO-2026-' + Math.floor(10000 + Math.random() * 90000));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button onClick={() => setActivePage('home')} className="hover:text-slate-900">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Shopping Cart & Quotation Review</span>
        </div>

        {orderSubmitted ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Pro-Forma Purchase Order Generated!
            </h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Order reference <span className="font-mono font-bold text-slate-900">#PO-2026-88419</span> has been transmitted to our enterprise order fulfillment and escrow desk.
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left max-w-md mx-auto space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span>Billing Standard:</span>
                <span className="font-bold text-slate-900">
                  {paymentMethod === 'net30' ? 'Net-30 Enterprise Credit' : paymentMethod === 'wire' ? 'Commercial Wire / SWIFT' : 'Corporate Purchasing Card'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Internal PO Number:</span>
                <span className="font-mono font-bold text-slate-900">{poNumber || 'PO-GLOBAL-001'}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Invoice Value:</span>
                <span className="font-bold text-slate-900">${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  clearCart();
                  setOrderSubmitted(false);
                  setActivePage('home');
                }}
                className="bg-[#0B192C] hover:bg-[#142742] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-colors"
              >
                Return to Marketplace Home
              </button>

              <button
                onClick={() => showToast('Printing pro-forma commercial invoice PDF...')}
                className="bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Pro-Forma Invoice</span>
              </button>
            </div>
          </div>
        ) : cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 cols: Cart Table */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900">Procurement Line Items</h1>
                    <p className="text-xs text-slate-500 mt-0.5">{cart.length} distinct item(s) selected</p>
                  </div>

                  <button
                    onClick={clearCart}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={item.product.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg bg-slate-50 border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {item.product.brand}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 line-clamp-1 max-w-sm">
                            {item.product.name}
                          </h3>
                          <div className="text-xs text-slate-500 font-mono mt-0.5">
                            Part #: {item.product.partNumber}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls & Line Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        {/* Stepper */}
                        <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-mono font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-bold text-xs"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-black text-slate-900 text-sm">
                            ${(item.product.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            ${item.product.price.toFixed(2)} / unit
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <button
                    onClick={() => setActivePage('catalog')}
                    className="text-[#0B192C] font-bold hover:underline"
                  >
                    ← Continue Sourcing More Products
                  </button>

                  <button
                    onClick={() => openRFQModal()}
                    className="text-orange-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Convert this entire cart into custom formal RFQ</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Order Summary & Checkout Form */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                Procurement Summary
              </h2>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Goods Subtotal:</span>
                  <span className="font-bold text-slate-900">
                    ${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Export Duty / Tax (5%):</span>
                  <span>${estimatedTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Consolidated Freight Logistics:</span>
                  <span>${estimatedFreight.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-slate-900">
                  <span>Total Order Estimate:</span>
                  <span className="text-base text-orange-600">
                    ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckoutSubmit} className="pt-4 border-t border-slate-100 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Payment & Credit Facility Method
                  </label>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'net30'}
                        onChange={() => setPaymentMethod('net30')}
                        className="text-orange-600"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Net 30 / Enterprise PO</div>
                        <div className="text-[10px] text-slate-500">Subject to corporate account credit approval</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'wire'}
                        onChange={() => setPaymentMethod('wire')}
                        className="text-orange-600"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Commercial Wire Transfer (SWIFT)</div>
                        <div className="text-[10px] text-slate-500">Pro-Forma invoice with escrow IBAN routing</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-orange-600"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Corporate Purchasing Card</div>
                        <div className="text-[10px] text-slate-500">Visa Business, Mastercard Corporate, Amex</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Internal Client PO Reference (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PO-NORTH-PLANT-99"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B192C] hover:bg-[#142742] text-white py-3 rounded-lg text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
                >
                  <span>Submit Pro-Forma Purchase Order</span>
                  <ArrowRight className="w-4 h-4 text-orange-400" />
                </button>
              </form>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  Demo Mode: This submits a frontend simulated pro-forma order. In production, this initiates ERP webhook and credit approval checks.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center max-w-lg mx-auto shadow-sm">
            <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4 stroke-1" />
            <h2 className="text-xl font-bold text-slate-800">Your Inquiry Cart is Currently Empty</h2>
            <p className="text-xs text-slate-500 mt-2 mb-6">
              Search or browse through over 50,000 certified industrial products, CCTV systems, PLC drives, and specialized instrumentation.
            </p>
            <button
              onClick={() => setActivePage('catalog')}
              className="bg-[#0B192C] text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-[#142742]"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
