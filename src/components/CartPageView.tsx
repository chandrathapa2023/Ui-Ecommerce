import React from 'react';
import { useShopifyStore } from '../context/ShopifyStoreContext';
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, ArrowLeft } from 'lucide-react';

export const CartPageView: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeLine,
    applyDiscountCode,
    removeDiscountCode,
    discountCodeInput,
    setDiscountCodeInput,
    cartNote,
    setCartNote,
    freeShippingThreshold,
    openCheckout,
    navigate,
    isB2BMode,
  } = useShopifyStore();

  const subtotalNum = parseFloat(cart.cost.subtotalAmount.amount);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotalNum);

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    applyDiscountCode(discountCodeInput);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <button onClick={() => navigate('/')} className="hover:text-stone-900 transition-colors">
          Home
        </button>
        <span>/</span>
        <span className="text-stone-900 font-medium">Cart</span>
      </div>

      <div className="flex items-baseline justify-between border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 font-display">
          Shopping Cart
        </h1>
        <span className="text-sm text-stone-500 font-mono tabular-nums">
          {cart.totalQuantity} items
        </span>
      </div>

      {cart.lines.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 space-y-4">
          <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
          <h2 className="text-xl font-bold text-stone-900">Your shopping bag is empty</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Discover our collection of timeless architectural furniture and handcrafted interior objects.
          </p>
          <button
            onClick={() => navigate('/collections')}
            className="px-6 py-3 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Lines Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200/80 p-6 space-y-6">
            <div className="space-y-6 divide-y divide-stone-100">
              {cart.lines.map((line) => {
                const unitPrice =
                  isB2BMode && line.merchandise.b2bWholesalePrice
                    ? parseFloat(line.merchandise.b2bWholesalePrice.amount)
                    : parseFloat(line.merchandise.price.amount);
                const lineTotal = unitPrice * line.quantity;

                return (
                  <div key={line.id} className="pt-6 first:pt-0 flex flex-col sm:flex-row gap-5">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      {line.merchandise.image && (
                        <img
                          src={line.merchandise.image.url}
                          alt={line.merchandise.image.altText || line.merchandise.product.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                            {line.merchandise.product.vendor}
                          </span>
                          <h3 className="text-base font-semibold text-stone-900">
                            {line.merchandise.product.title}
                          </h3>
                          <div className="text-xs text-stone-500 mt-1 space-x-1">
                            {line.merchandise.selectedOptions.map((opt, i) => (
                              <span key={opt.name}>
                                {opt.name}: <strong>{opt.value}</strong>
                                {i < line.merchandise.selectedOptions.length - 1 && ' · '}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-base font-bold text-stone-900 font-mono tabular-nums">
                            ${lineTotal.toFixed(2)}
                          </div>
                          <div className="text-xs text-stone-400 font-mono tabular-nums">
                            ${unitPrice.toFixed(2)} each
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-2">
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            className="px-3 py-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1 text-xs font-mono font-semibold text-stone-900 tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            className="px-3 py-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeLine(line.id)}
                          className="text-xs text-stone-400 hover:text-rose-600 flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-stone-100">
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Order Notes & Delivery Requirements
              </label>
              <textarea
                value={cartNote}
                onChange={(e) => setCartNote(e.target.value)}
                rows={2}
                placeholder="Specific entry instructions, gate code, or delivery appointment preferences..."
                className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden text-stone-700"
              />
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200/80 p-6 space-y-6">
            <h2 className="text-base font-bold text-stone-900">Order Summary</h2>

            {/* Discount Form */}
            <form onSubmit={handleApplyDiscount} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={discountCodeInput}
                  onChange={(e) => setDiscountCodeInput(e.target.value)}
                  placeholder="Promo code (WELCOME10)"
                  className="w-full text-xs pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-lg transition-colors"
              >
                Apply
              </button>
            </form>

            {cart.discountCodes && cart.discountCodes.length > 0 && (
              <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-2 rounded-lg border border-emerald-200">
                <span className="font-semibold">Code: {cart.discountCodes[0].code}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono tabular-nums">
                    -${cart.discountCodes[0].amount?.amount}
                  </span>
                  <button onClick={removeDiscountCode}>
                    <Trash2 className="w-3 h-3 text-emerald-600 hover:text-emerald-900" />
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900 font-semibold">
                  ${cart.cost.subtotalAmount.amount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-mono tabular-nums">
                  {isB2BMode ? 'Exempt' : `$${cart.cost.totalTaxAmount.amount}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>White-Glove Shipping</span>
                <span className="text-stone-900 font-medium">
                  {remainingForFreeShipping === 0 ? 'Complimentary' : 'Calculated at checkout'}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-stone-100 text-base font-bold text-stone-900">
                <span>Total Due</span>
                <span className="font-mono tabular-nums">${cart.cost.totalAmount.amount}</span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <span>Proceed to Shopify Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-xs text-stone-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Shopify PCI DSS Level 1 Certified Secure Handoff</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
