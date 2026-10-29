import React, { useState, useMemo } from 'react';
import { useShopifyStore } from '../context/ShopifyStoreContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, ChevronDown, Check, X, ArrowLeft } from 'lucide-react';

interface CollectionViewProps {
  handle?: string;
}

export const CollectionView: React.FC<CollectionViewProps> = ({ handle }) => {
  const { products, collections, getCollectionByHandle, navigate, isB2BMode } = useShopifyStore();

  const currentCollection = handle ? getCollectionByHandle(handle) : null;

  // Filter and Sorting states
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'in_stock'>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // Available categories
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.productType));
    return ['all', ...Array.from(set)];
  }, [products]);

  // Filtered & Sorted items
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by collection if specified
    if (handle) {
      if (handle === 'minimalist-living') {
        list = list.filter((p) => p.productType === 'Seating' || p.tags.includes('Living Room'));
      } else if (handle === 'lighting-fixtures') {
        list = list.filter((p) => p.productType === 'Lighting');
      } else if (handle === 'ceramics-accents') {
        list = list.filter((p) => p.productType === 'Decor' || p.tags.includes('Ceramics'));
      } else if (handle === 'architectural-audio') {
        list = list.filter((p) => p.productType === 'Audio');
      }
    }

    // Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.productType === selectedCategory);
    }

    // Filter by Availability
    if (availabilityFilter === 'in_stock') {
      list = list.filter((p) => p.availableForSale);
    }

    // Filter by Price Range
    if (selectedPriceRange === 'under-300') {
      list = list.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) < 300);
    } else if (selectedPriceRange === '300-800') {
      list = list.filter(
        (p) =>
          parseFloat(p.priceRange.minVariantPrice.amount) >= 300 &&
          parseFloat(p.priceRange.minVariantPrice.amount) <= 800
      );
    } else if (selectedPriceRange === 'over-800') {
      list = list.filter((p) => parseFloat(p.priceRange.minVariantPrice.amount) > 800);
    }

    // Sorting
    if (selectedSort === 'price-low') {
      list.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      );
    } else if (selectedSort === 'price-high') {
      list.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
      );
    } else if (selectedSort === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [products, handle, selectedCategory, availabilityFilter, selectedPriceRange, selectedSort]);

  const activeFiltersCount =
    (availabilityFilter !== 'all' ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0);

  const resetFilters = () => {
    setAvailabilityFilter('all');
    setSelectedPriceRange('all');
    setSelectedCategory('all');
    setSelectedSort('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <button onClick={() => navigate('/')} className="hover:text-stone-900 transition-colors">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigate('/collections')} className="hover:text-stone-900 transition-colors">
          Collections
        </button>
        {currentCollection && (
          <>
            <span>/</span>
            <span className="text-stone-900 font-medium">{currentCollection.title}</span>
          </>
        )}
      </div>

      {/* Collection Header */}
      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display">
          {currentCollection ? currentCollection.title : 'All Architectural Objects'}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          {currentCollection
            ? currentCollection.description
            : 'Explore our complete catalog of precision-crafted furnishings, lighting fixtures, ceramics, and hi-fi acoustic equipment.'}
        </p>

        {isB2BMode && (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900">
            <span className="font-semibold">Shopify Plus Wholesale Tier Active:</span>
            <span>25% Trade Net discount applied across all variants.</span>
          </div>
        )}
      </div>

      {/* Collection Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
        <button
          onClick={() => navigate('/collections')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
            !handle
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
          }`}
        >
          All Objects ({products.length})
        </button>
        {collections.map((col) => (
          <button
            key={col.id}
            onClick={() => navigate(`/collections/${col.handle}`)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              handle === col.handle
                ? 'bg-stone-900 text-white'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            {col.title} ({col.productsCount})
          </button>
        ))}
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-3">
          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-800 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
            {activeFiltersCount > 0 && (
              <span className="bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Quick Active Filter Badges */}
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-xs text-stone-500 hover:text-stone-900 underline flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-stone-500 font-mono tabular-nums">
            Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} objects
          </span>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 hidden sm:inline">Sort:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="text-xs font-medium text-stone-800 bg-white border border-stone-200 rounded-lg px-3 py-2 focus:outline-hidden focus:ring-1 focus:ring-stone-400 cursor-pointer shadow-2xs"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Options Expansion Panel */}
      {isFilterDrawerOpen && (
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-6 transition-all">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Discipline
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 text-xs rounded-md capitalize transition-colors ${
                    selectedCategory === cat
                      ? 'bg-stone-900 text-white font-medium'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat === 'all' ? 'All Types' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Price Range
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'All Prices', val: 'all' },
                { label: 'Under $300', val: 'under-300' },
                { label: '$300 – $800', val: '300-800' },
                { label: 'Over $800', val: 'over-800' },
              ].map((range) => (
                <button
                  key={range.val}
                  onClick={() => setSelectedPriceRange(range.val)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                    selectedPriceRange === range.val
                      ? 'bg-stone-900 text-white font-medium'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Availability
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setAvailabilityFilter('all')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  availabilityFilter === 'all'
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setAvailabilityFilter('in_stock')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  availabilityFilter === 'in_stock'
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                In Stock Only
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button / Pagination */}
          {visibleCount < filteredProducts.length && (
            <div className="pt-8 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="px-6 py-3 text-xs font-semibold text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors shadow-2xs"
              >
                Load More Objects
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State with reset affordance */
        <div className="text-center py-16 px-4 bg-white rounded-xl border border-stone-200/80 space-y-4">
          <p className="text-base font-semibold text-stone-800">
            No products match the selected filters
          </p>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Try adjusting your price range or discipline filters to view available objects from this collection.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
