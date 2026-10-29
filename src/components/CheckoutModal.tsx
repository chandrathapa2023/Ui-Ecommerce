import React, { useState } from 'react';
import { useShopifyStore } from '../context/ShopifyStoreContext';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  Building2,
  Truck,
  CreditCard,
  X,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    customer,
    completeCheckout,
    checkoutSuccessOrderNumber,
    resetCheckout,
    isB2BMode,
    b2bCompany,
    purchaseOrderNumber,
    setPurchaseOrderNumber,
    navigate,
  } = useShopifyStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'white-glove'>('white-glove');

  if (!isCheckoutOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      completeCheckout();
    }, 1500);
  };

  const handleFinishAndReturn = () => {
    resetCheckout();
    navigate('/account');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Shopify Hosted Checkout Header Bar */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                Shopify Hosted Checkout
              </div>
              <div className="text-sm font-bold">Aethel Storefront Checkout Gateway</div>
            </div>
          </div>

          <button
            onClick={closeCheckout}
            className="p-1 text-stone-400 hover:text-white"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Order Complete */}
        {checkoutSuccessOrderNumber ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Shopify Order Confirmed
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
                Thank you for your order!
              </h2>
              <p className="text-sm font-mono text-stone-600 font-bold">
                Order Reference: {checkoutSuccessOrderNumber}
              </p>
              <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed pt-1">
                A confirmation receipt with white-glove courier dispatch details has been sent to{' '}
                <strong className="text-stone-800">{customer?.email || 'your email'}</strong>.
              </p>
            </div>

            {isB2BMode && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 max-w-md mx-auto text-left space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-800" />
                  <span>B2B Commercial Invoice Generated</span>
                </div>
                <div>Company: {b2bCompany.name}</div>
                <div>Terms: Net 30 Days · PO Reference: {purchaseOrderNumber}</div>
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleFinishAndReturn}
                className="px-6 py-3 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
              >
                View Order in Customer Portal
              </button>
              <button
                onClick={() => {
                  resetCheckout();
                  navigate('/collections');
                }}
                className="px-5 py-3 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          /* Checkout In-Flight Form */
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Attribution & Cart Token Info */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono text-stone-600 space-y-1">
              <div className="flex justify-between">
                <span>Shopify Cart ID:</span>
                <span className="font-bold text-stone-800">{cart.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Attribution Source:</span>
                <span className="text-stone-800">headless_nextjs_storefront</span>
              </div>
            </div>

            {/* B2B Mode PO Form if active */}
            {isB2BMode && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <Building2 className="w-4 h-4 text-amber-800" />
                  <span>Shopify Plus B2B Purchase Order Workflow</span>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Customer Purchase Order (PO) Number
                  </label>
                  <input
                    type="text"
                    value={purchaseOrderNumber}
                    onChange={(e) => setPurchaseOrderNumber(e.target.value)}
                    placeholder="e.g. PO-2026-ARCH-801"
                    className="w-full text-xs p-2.5 bg-white border border-amber-300 rounded-lg font-mono"
                  />
                  <p className="text-[11px] text-amber-800 mt-1">
                    Invoice will be dispatched with Net 30 payment terms to {b2bCompany.name}.
                  </p>
                </div>
              </div>
            )}

            {/* Express Checkout Options (Shop Pay / Apple Pay simulation) */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block text-center">
                Express Checkout
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="py-3 px-4 bg-[#5a31f4] hover:bg-[#4924d4] text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Shop Pay</span>
                </button>
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Apple Pay</span>
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-stone-200"></div>
              <span className="flex-shrink mx-4 text-stone-400 text-xs uppercase font-medium">
                Or Continue Below
              </span>
              <div className="flex-grow border-t border-stone-200"></div>
            </div>

            {/* Contact & Shipping Destination */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Shipping Destination
              </h3>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700 space-y-1">
                <div className="font-semibold text-stone-900">
                  {customer?.firstName} {customer?.lastName} · {customer?.email}
                </div>
                <div>{customer?.defaultAddress?.address1 || '420 Design Boulevard, Suite 5A'}</div>
                <div>
                  {customer?.defaultAddress?.city || 'San Francisco'},{' '}
                  {customer?.defaultAddress?.province || 'CA'}{' '}
                  {customer?.defaultAddress?.zip || '94107'}
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Delivery Service
              </h3>
              <div className="p-3 bg-white border border-stone-200 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-stone-800" />
                  <div>
                    <div className="font-semibold text-stone-900">
                      White-Glove In-Room Furniture Freight
                    </div>
                    <div className="text-stone-500">Scheduled delivery with debris removal</div>
                  </div>
                </div>
                <span className="font-semibold text-emerald-800">Complimentary</span>
              </div>
            </div>

            {/* Order Summary in Checkout */}
            <div className="border-t border-stone-200 pt-4 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal ({cart.totalQuantity} items)</span>
                <span className="font-mono tabular-nums text-stone-900 font-semibold">
                  ${cart.cost.subtotalAmount.amount}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes</span>
                <span className="font-mono tabular-nums">
                  {isB2BMode ? 'Exempt (Trade)' : `$${cart.cost.totalTaxAmount.amount}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Handling</span>
                <span className="font-semibold text-emerald-700">Complimentary</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-100 text-base font-bold text-stone-900">
                <span>Total Amount Due</span>
                <span className="font-mono tabular-nums text-lg">${cart.cost.totalAmount.amount}</span>
              </div>
            </div>

            {/* Authorize & Place Order */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                {isProcessing ? (
                  <span>Connecting to Shopify Payment Vault...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>
                      {isB2BMode
                        ? `Authorize Net 30 Invoice ($${cart.cost.totalAmount.amount})`
                        : `Pay $${cart.cost.totalAmount.amount} with Shopify Secure`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
