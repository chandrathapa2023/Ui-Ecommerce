import React from 'react';
import { useShopifyStore } from '../context/ShopifyStoreContext';
import { X, Minus, Plus, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
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

  if (!isCartOpen) return null;

  const subtotalNum = parseFloat(cart.cost.subtotalAmount.amount);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotalNum);
  const progressPercent = Math.min(100, (subtotalNum / freeShippingThreshold) * 100);

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    applyDiscountCode(discountCodeInput);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#faf9f6] shadow-2xl flex flex-col border-l border-stone-200">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-base font-bold text-stone-900">Your Cart</h2>
              <span className="text-xs text-stone-500 font-mono tabular-nums">
                ({cart.totalQuantity} items)
              </span>
            </div>

            <button
              onClick={closeCart}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-stone-100/80 border-b border-stone-200 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between text-stone-700">
                  <span>Add <strong className="font-mono tabular-nums">${remainingForFreeShipping.toFixed(2)}</strong> for free freight</span>
                  <span className="font-mono tabular-nums text-stone-500">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-stone-900 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>You have unlocked complimentary white-glove shipping!</span>
              </div>
            )}
          </div>

          {/* Cart Item Lines */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.lines.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
                <p className="text-sm font-semibold text-stone-700">Your cart is currently empty</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Browse our architectural furniture, luminaires, and handmade ceramic objects.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/collections');
                  }}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.lines.map((line) => {
                const unitPrice = isB2BMode && line.merchandise.b2bWholesalePrice
                  ? parseFloat(line.merchandise.b2bWholesalePrice.amount)
                  : parseFloat(line.merchandise.price.amount);
                const lineTotal = unitPrice * line.quantity;

                return (
                  <div
                    key={line.id}
                    className="flex gap-4 p-3 bg-white border border-stone-200/80 rounded-xl"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      {line.merchandise.image ? (
                        <img
                          src={line.merchandise.image.url}
                          alt={line.merchandise.image.altText || line.merchandise.product.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-100" />
                      )}
                    </div>

                    {/* Item Information */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                            {line.merchandise.product.title}
                          </h4>
                          <button
                            onClick={() => removeLine(line.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Selected Options summary */}
                        <div className="text-[11px] text-stone-500 mt-0.5 space-x-1">
                          {line.merchandise.selectedOptions.map((opt, i) => (
                            <span key={opt.name}>
                              {opt.value}
                              {i < line.merchandise.selectedOptions.length - 1 && ' · '}
                            </span>
                          ))}
                        </div>

                        {line.sellingPlanAllocation && (
                          <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
                            Auto-delivery (10% Off)
                          </div>
                        )}
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-stone-200 rounded-md bg-stone-50 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            className="px-2 py-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-0.5 text-xs font-mono font-medium text-stone-900 tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            className="px-2 py-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-xs font-bold text-stone-900 font-mono tabular-nums">
                          ${lineTotal.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer & Checkout Handoff */}
          {cart.lines.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-white space-y-4">
              {/* Discount Code Form */}
              <form onSubmit={handleApplyDiscount} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={discountCodeInput}
                    onChange={(e) => setDiscountCodeInput(e.target.value)}
                    placeholder="Discount code (e.g. WELCOME10)"
                    className="w-full text-xs pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-400 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Applied Discount pill */}
              {cart.discountCodes && cart.discountCodes.length > 0 && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3 h-3" />
                    <span>{cart.discountCodes[0].code} applied</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono tabular-nums">
                      -${cart.discountCodes[0].amount?.amount}
                    </span>
                    <button
                      onClick={removeDiscountCode}
                      className="text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums font-medium text-stone-900">
                    ${cart.cost.subtotalAmount.amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-mono tabular-nums">
                    {isB2BMode ? 'Exempt (Trade)' : `$${cart.cost.totalTaxAmount.amount}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-stone-900">
                    {remainingForFreeShipping === 0 ? 'Complimentary' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-100 text-sm font-bold text-stone-900">
                  <span>Total Due</span>
                  <span className="font-mono tabular-nums text-base">
                    ${cart.cost.totalAmount.amount}
                  </span>
                </div>
              </div>

              {/* Order Delivery Note */}
              <div className="pt-1">
                <input
                  type="text"
                  value={cartNote}
                  onChange={(e) => setCartNote(e.target.value)}
                  placeholder="Special instructions for white-glove courier..."
                  className="w-full text-xs px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md focus:outline-hidden text-stone-700 placeholder:text-stone-400"
                />
              </div>

              {/* Checkout Handoff Button (Shopify hosted) */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={openCheckout}
                  className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <span>Proceed to Shopify Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Encrypted 256-bit Shopify SSL checkout handoff</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
