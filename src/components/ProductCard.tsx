import React, { useState } from 'react';
import { Product } from '../types/shopify';
import { useShopifyStore } from '../context/ShopifyStoreContext';
import { Plus, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate, addToCart, isB2BMode } = useShopifyStore();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const defaultVariant = product.variants[0];
  const regularPrice = parseFloat(defaultVariant.price.amount);
  const b2bPrice = defaultVariant.b2bWholesalePrice
    ? parseFloat(defaultVariant.b2bWholesalePrice.amount)
    : regularPrice * 0.75;
  const compareAtPrice = defaultVariant.compareAtPrice
    ? parseFloat(defaultVariant.compareAtPrice.amount)
    : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(defaultVariant, product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div
      onClick={() => navigate(`/products/${product.handle}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
    >
      {/* Image Container with 4:3 Aspect Ratio and Neutral Backdrop */}
      <div className="relative aspect-4/3 w-full bg-stone-100/70 overflow-hidden">
        {product.images[0] ? (
          <img
            src={product.images[0].url}
            alt={product.images[0].altText || product.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-100">
            <span>No image available</span>
          </div>
        )}

        {/* Subtle Text Tag (Max 1 subtle indicator, zero pills) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-xs text-stone-900 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded shadow-2xs font-medium">
          <span>{product.vendor}</span>
        </div>

        {/* Quick Add Floating Button on Hover */}
        <div className="absolute bottom-3 right-3 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg shadow-sm transition-all ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
            title="Quick add to cart"
            aria-label="Quick add to cart"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Card Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Status: Clean unboxed metadata with separators */}
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-500 mb-1">
            <span>{product.productType}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-medium">In Stock</span>
            {isB2BMode && product.minOrderQuantityB2B && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-800 font-semibold">MOQ {product.minOrderQuantityB2B}</span>
              </>
            )}
          </div>

          <h3 className="text-base font-semibold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
            {product.title}
          </h3>
        </div>

        {/* Price Baseline with Tabular Figures */}
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            {isB2BMode ? (
              <>
                <span className="text-base font-bold text-amber-900 font-mono tabular-nums">
                  ${b2bPrice.toFixed(2)}
                </span>
                <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                  ${regularPrice.toFixed(2)}
                </span>
                <span className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider">
                  B2B Net
                </span>
              </>
            ) : (
              <>
                <span className="text-base font-semibold text-stone-900 font-mono tabular-nums">
                  ${regularPrice.toFixed(2)}
                </span>
                {compareAtPrice && compareAtPrice > regularPrice && (
                  <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                    ${compareAtPrice.toFixed(2)}
                  </span>
                )}
              </>
            )}
          </div>

          <span className="text-xs text-stone-500 group-hover:text-stone-900 transition-colors font-medium flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </span>
        </div>
      </div>
    </div>
  );
};
