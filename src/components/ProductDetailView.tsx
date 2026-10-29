import React, { useState, useMemo } from 'react';
import { useShopifyStore } from '../context/ShopifyStoreContext';
import { ProductVariant } from '../types/shopify';
import {
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  Minus,
  Plus,
  ShoppingBag,
  ChevronRight,
  Code2,
  Sparkles,
  ArrowLeft,
  Building2,
} from 'lucide-react';

interface ProductDetailViewProps {
  handle: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ handle }) => {
  const { getProductByHandle, addToCart, navigate, isB2BMode, b2bCompany } = useShopifyStore();

  const product = getProductByHandle(handle);

  // If not found
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900 font-display">Product Not Found</h2>
        <p className="text-sm text-stone-600">
          The requested object handle "{handle}" does not exist in the Shopify catalog.
        </p>
        <button
          onClick={() => navigate('/collections')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  // Active image gallery index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Selected Options state: e.g. { "Wood Finish": "Solid White Oak", "Textile": "Natural Cream Bouclé" }
  const [selectedOptionValues, setSelectedOptionValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product.variants[0]) {
      product.variants[0].selectedOptions.forEach((opt) => {
        initial[opt.name] = opt.value;
      });
    }
    return initial;
  });

  // Quantity selector
  const [quantity, setQuantity] = useState<number>(1);

  // Selling plan: 'one-time' or 'subscription' (10% discount)
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');

  // Accordion active state
  const [activeAccordion, setActiveAccordion] = useState<string>('specs');

  // GraphQL Inspector drawer toggle
  const [showGraphqlInspector, setShowGraphqlInspector] = useState<boolean>(false);

  // Feedback state on Add to Cart
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  // Resolve matching ProductVariant based on selected options
  const activeVariant = useMemo<ProductVariant>(() => {
    const match = product.variants.find((v) =>
      v.selectedOptions.every((opt) => selectedOptionValues[opt.name] === opt.value)
    );
    return match || product.variants[0];
  }, [product, selectedOptionValues]);

  // Pricing calculations
  const basePrice = parseFloat(activeVariant.price.amount);
  const effectiveBasePrice =
    isB2BMode && activeVariant.b2bWholesalePrice
      ? parseFloat(activeVariant.b2bWholesalePrice.amount)
      : basePrice;

  const comparePrice = activeVariant.compareAtPrice
    ? parseFloat(activeVariant.compareAtPrice.amount)
    : null;

  // Apply 10% discount if subscription selected
  const finalPrice =
    purchaseType === 'subscription' ? effectiveBasePrice * 0.9 : effectiveBasePrice;

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptionValues((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  const handleAddToCart = () => {
    const sellingPlan =
      purchaseType === 'subscription'
        ? {
            sellingPlan: {
              id: 'gid://shopify/SellingPlan/sub-10',
              name: 'Delivery Every 3 Months (10% Off)',
              discountPercentage: 10,
            },
          }
        : undefined;

    addToCart(activeVariant, product, quantity, sellingPlan);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  // GraphQL Query Payload for display
  const sampleGraphQLQuery = `query GetProductByHandle($handle: String!) {
  product(handle: $handle) {
    id: "${product.id}"
    title: "${product.title}"
    handle: "${product.handle}"
    availableForSale: ${product.availableForSale}
    selectedVariant(id: "${activeVariant.id}") {
      title: "${activeVariant.title}"
      sku: "${activeVariant.sku}"
      quantityAvailable: ${activeVariant.quantityAvailable}
      price: {
        amount: "${finalPrice.toFixed(2)}"
        currencyCode: "USD"
      }
    }
  }
}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <button onClick={() => navigate('/')} className="hover:text-stone-900 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <button
          onClick={() => navigate('/collections')}
          className="hover:text-stone-900 transition-colors"
        >
          {product.productType}
        </button>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        <span className="text-stone-900 font-medium truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main Contiguous Purchase Module Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
        {/* Left Column: Media Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-4/3 sm:aspect-1/1 w-full bg-stone-100/80 rounded-2xl overflow-hidden border border-stone-200/80 relative">
            {product.images[activeImageIndex] ? (
              <img
                src={product.images[activeImageIndex].url}
                alt={product.images[activeImageIndex].altText || product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400">
                <span>No photography available</span>
              </div>
            )}

            {/* Vendor / Studio Marker */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded text-xs font-semibold text-stone-900 shadow-2xs">
              {product.vendor}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-stone-900 shadow-2xs'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.altText}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Architecture Trust Markers */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-stone-900 shrink-0" />
              <span>Complimentary freight over $250</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-stone-900 shrink-0" />
              <span>30-Day in-home trial</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-stone-900 shrink-0" />
              <span>10-Year heirloom guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (Sticky on desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-xs">
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase font-semibold tracking-wider text-stone-500">
                {product.vendor} · {product.productType}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>In Stock ({activeVariant.quantityAvailable} units ready)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
              {product.title}
            </h1>
          </div>

          {/* Pricing Row with B2B Support */}
          <div className="pb-4 border-b border-stone-100 flex items-baseline gap-3">
            {isB2BMode ? (
              <>
                <span className="text-2xl font-bold text-amber-950 font-mono tabular-nums">
                  ${finalPrice.toFixed(2)}
                </span>
                <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                  ${basePrice.toFixed(2)}
                </span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-xs font-semibold rounded">
                  Trade Net (-25%)
                </span>
              </>
            ) : (
              <>
                <span className="text-2xl font-bold text-stone-900 font-mono tabular-nums">
                  ${finalPrice.toFixed(2)}
                </span>
                {comparePrice && comparePrice > basePrice && (
                  <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                    ${comparePrice.toFixed(2)}
                  </span>
                )}
                {purchaseType === 'subscription' && (
                  <span className="text-xs text-emerald-700 font-semibold">
                    10% Recurring Discount Applied
                  </span>
                )}
              </>
            )}
          </div>

          {/* Product Description */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Variant Option Selectors (Zero-pill discipline: segmented or clean buttons) */}
          <div className="space-y-4 pt-2">
            {product.options.map((option) => (
              <div key={option.id} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-700">{option.name}</span>
                  <span className="text-stone-500 font-medium">
                    {selectedOptionValues[option.name]}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {option.values.map((val) => {
                    const isSelected = selectedOptionValues[option.name] === val;
                    return (
                      <button
                        key={val}
                        onClick={() => handleOptionChange(option.name, val)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                          isSelected
                            ? 'bg-stone-900 text-white shadow-2xs font-semibold'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Selling Plans / Subscription Selector */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-stone-700">Purchase Option</span>
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-lg">
              <button
                type="button"
                onClick={() => setPurchaseType('one-time')}
                className={`py-2 px-3 text-xs font-medium rounded-md transition-all ${
                  purchaseType === 'one-time'
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                One-Time Purchase
              </button>
              <button
                type="button"
                onClick={() => setPurchaseType('subscription')}
                className={`py-2 px-3 text-xs font-medium rounded-md transition-all ${
                  purchaseType === 'subscription'
                    ? 'bg-white text-emerald-800 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Subscribe & Save (10%)
              </button>
            </div>
          </div>

          {/* Quantity Stepper & Add to Cart Action */}
          <div className="space-y-3 pt-3">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 py-2 text-xs font-semibold text-stone-900 font-mono tabular-nums min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!activeVariant.availableForSale}
                className={`flex-1 py-3 px-6 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all ${
                  isAddedFeedback
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart · ${(finalPrice * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* B2B Wholesale Notice */}
            {isB2BMode && (
              <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 shrink-0 text-amber-700" />
                <span>
                  B2B Trade Buyer: {b2bCompany.name}. Net 30 invoicing applied at checkout.
                </span>
              </div>
            )}
          </div>

          {/* Accordion Tabs for Metafields & Care */}
          <div className="pt-4 border-t border-stone-200 space-y-2">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
              {[
                { id: 'specs', label: 'Specifications' },
                { id: 'shipping', label: 'Shipping & Returns' },
                { id: 'care', label: 'Care Instructions' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAccordion(tab.id)}
                  className={`text-xs font-medium py-1 px-2.5 rounded transition-colors ${
                    activeAccordion === tab.id
                      ? 'bg-stone-100 text-stone-900 font-semibold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-stone-600 leading-relaxed py-2">
              {activeAccordion === 'specs' && (
                <div className="space-y-1.5 font-mono">
                  {product.metafields?.material && (
                    <div>
                      <strong className="font-sans text-stone-900">Materials:</strong>{' '}
                      {product.metafields.material}
                    </div>
                  )}
                  {product.metafields?.dimensions && (
                    <div>
                      <strong className="font-sans text-stone-900">Dimensions:</strong>{' '}
                      {product.metafields.dimensions}
                    </div>
                  )}
                  {product.metafields?.origin && (
                    <div>
                      <strong className="font-sans text-stone-900">Origin:</strong>{' '}
                      {product.metafields.origin}
                    </div>
                  )}
                  <div>
                    <strong className="font-sans text-stone-900">SKU:</strong> {activeVariant.sku}
                  </div>
                </div>
              )}

              {activeAccordion === 'shipping' && (
                <div className="space-y-1">
                  <p>
                    Freight items are shipped via white-glove specialized furniture couriers.
                    Delivery includes room of choice placement and packing material removal.
                  </p>
                  <p className="text-stone-500">
                    Returns are accepted within 30 days in original protective condition.
                  </p>
                </div>
              )}

              {activeAccordion === 'care' && (
                <div>
                  <p>{product.metafields?.care || 'Wipe with soft clean cloth. Protect from direct heating sources.'}</p>
                </div>
              )}
            </div>
          </div>

          {/* GraphQL Inspector Feature Button */}
          <div className="pt-2">
            <button
              onClick={() => setShowGraphqlInspector(!showGraphqlInspector)}
              className="w-full flex items-center justify-between text-xs text-stone-500 hover:text-stone-900 py-1.5 px-2 rounded bg-stone-50 border border-stone-200/60"
            >
              <span className="flex items-center gap-1.5 font-mono">
                <Code2 className="w-3.5 h-3.5 text-stone-700" />
                <span>Shopify Storefront GraphQL Query</span>
              </span>
              <span className="text-[11px] font-semibold">{showGraphqlInspector ? 'Hide' : 'Inspect'}</span>
            </button>

            {showGraphqlInspector && (
              <div className="mt-2 p-3 bg-stone-900 text-stone-200 rounded-lg text-[11px] font-mono overflow-x-auto">
                <pre>{sampleGraphQLQuery}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
