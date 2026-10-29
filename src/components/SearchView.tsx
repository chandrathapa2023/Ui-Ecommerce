import React, { useState, useMemo } from 'react';
import { useShopifyStore } from '../context/ShopifyStoreContext';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const SearchView: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    closeSearch,
    navigate,
  } = useShopifyStore();

  const [inputVal, setInputVal] = useState(searchQuery);

  const popularSearches = ['Bouclé', 'Brass Pendant', 'Ceramics', 'Walnut', 'White Oak'];

  const searchResults = useMemo(() => {
    const q = inputVal.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchType = p.productType.toLowerCase().includes(q);
      const matchVendor = p.vendor.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchType || matchVendor || matchTags;
    });
  }, [products, inputVal]);

  if (!isSearchOpen) return null;

  const handleChipClick = (term: string) => {
    setInputVal(term);
    setSearchQuery(term);
  };

  const handleSelectProduct = (handle: string) => {
    closeSearch();
    navigate(`/products/${handle}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/50 backdrop-blur-xs flex items-start justify-center pt-12 sm:pt-20 px-4 pb-12">
      <div className="w-full max-w-3xl bg-[#faf9f6] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Header Bar */}
        <div className="p-4 sm:p-6 bg-white border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search products, materials, collections (e.g. Oak, Bouclé, Brass)..."
            autoFocus
            className="flex-1 text-base sm:text-lg text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-hidden"
          />
          {inputVal && (
            <button
              onClick={() => {
                setInputVal('');
                setSearchQuery('');
              }}
              className="p-1 text-stone-400 hover:text-stone-700"
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Searches & Suggestions */}
        <div className="px-6 py-3 bg-stone-100/70 border-b border-stone-200 flex flex-wrap items-center gap-2 text-xs text-stone-600">
          <span className="font-semibold text-stone-500">Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => handleChipClick(term)}
              className="px-2.5 py-1 bg-white hover:bg-stone-200 text-stone-700 rounded-md transition-colors border border-stone-200/60"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {inputVal.trim() === '' ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-sm font-semibold text-stone-700">Type to search the Shopify storefront</p>
              <p className="text-xs text-stone-500">
                Queries are matched live against catalog handles, tags, variants, and product types.
              </p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Found {searchResults.length} results for "{inputVal}"</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.handle)}
                    className="flex gap-3 p-3 bg-white border border-stone-200 rounded-xl hover:shadow-sm cursor-pointer transition-all group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      {product.images[0] && (
                        <img
                          src={product.images[0].url}
                          alt={product.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-semibold text-stone-400">
                        {product.productType}
                      </span>
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                        {product.title}
                      </h4>
                      <div className="text-xs font-mono font-semibold text-stone-900 mt-1 tabular-nums">
                        ${product.priceRange.minVariantPrice.amount}
                      </div>
                    </div>
                    <div className="self-center text-stone-300 group-hover:text-stone-700">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <p className="text-sm font-semibold text-stone-800">
                No matching objects found for "{inputVal}"
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try searching for broader keywords like "Chair", "Lighting", or "Oak".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
