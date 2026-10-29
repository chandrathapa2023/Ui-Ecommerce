import React from 'react';
import { useShopifyStore } from '../context/ShopifyStoreContext';
import { ProductCard } from './ProductCard';
import { HERO_IMAGE } from '../data/mockStorefront';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Sparkles, SlidersHorizontal } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { products, collections, navigate, isB2BMode } = useShopifyStore();

  const featuredProducts = products.filter((p) => p.tags.includes('Featured')).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Campaign Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 text-white min-h-[520px] lg:min-h-[600px] flex items-center">
          {/* Hero Photography Backdrop */}
          <img
            src={HERO_IMAGE}
            alt="Aethel architectural interior showroom with sculptural oak furniture"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-65"
          />

          {/* Measured Scrim for WCAG AA Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />

          {/* Hero Content Box */}
          <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-12 lg:py-16 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-300">
              <span>Collection 2026</span>
              <span aria-hidden="true">·</span>
              <span>Architectural Living</span>
              {isB2BMode && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400">Trade & Contract Catalog</span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-display leading-[1.1] text-balance">
              Form distilled to its quietest essence.
            </h1>

            <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-xl">
              Engineered with solid Scandinavian oak, hand-blown triplex glass, and raw mineral stoneware. Designed for discerning spaces that value permanence over trends.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/collections/minimalist-living')}
                className="px-6 py-3.5 text-sm font-semibold text-stone-950 bg-white rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Explore Living Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/collections')}
                className="px-5 py-3.5 text-sm font-medium text-stone-200 border border-stone-400/40 rounded-lg hover:bg-white/10 transition-colors"
              >
                View Full Catalog (Shopify Storefront)
              </button>
            </div>

            {/* Quantitative Claim-to-Proof Adjacency */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-6 text-stone-300">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">100%</div>
                <div className="text-xs text-stone-400 mt-0.5">FSC Solid Hardwood</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">10-Year</div>
                <div className="text-xs text-stone-400 mt-0.5">Structural Warranty</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">24-Hour</div>
                <div className="text-xs text-stone-400 mt-0.5">Dispatch Readiness</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Collection Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              Curated Domains
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              Explore by Discipline
            </h2>
          </div>
          <button
            onClick={() => navigate('/collections')}
            className="text-sm font-semibold text-stone-900 hover:text-stone-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Browse All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => navigate(`/collections/${col.handle}`)}
              className="group cursor-pointer bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="aspect-4/3 overflow-hidden bg-stone-100">
                {col.image && (
                  <img
                    src={col.image.url}
                    alt={col.image.altText || col.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
                  <span>{col.productsCount} Objects</span>
                  <span className="text-stone-900 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              Storefront Highlights
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              Featured Objects of Daily Life
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">Live Shopify Variant Inventory</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Craftsmanship & Architectural Editorial Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100/90 rounded-2xl border border-stone-200/90 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs uppercase font-semibold tracking-wider text-stone-500">
              Material Provenance & Craft
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 font-display leading-tight">
              Honest materials. Built to outlive the architecture they inhabit.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
              Each piece begins in certified family-operated mills and artisanal workshops across Scandinavia, Italy, and Japan. We reject disposable seasonal cycles in favor of solid joinery, repairable components, and finishes that age with grace.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-stone-700 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-stone-900" />
                <span>Non-toxic plant-based wax finishes</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-stone-900" />
                <span>Plastic-free crating</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-stone-900">The Headless Storefront Architecture</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              This storefront presentation layer renders on Next.js App Router using the Shopify Storefront GraphQL API. Checkout and financial orders are sealed on Shopify’s secure PCI DSS Level 1 engine.
            </p>
            <div className="p-3 bg-stone-50 rounded-lg text-xs font-mono text-stone-700 space-y-1">
              <div>Storefront API: 2026-01 (Pinned)</div>
              <div>Checkout: Shopify Authoritative</div>
              <div>Identity: Shopify Customer Account API</div>
            </div>
            <button
              onClick={() => navigate('/pages/about')}
              className="text-xs font-semibold text-stone-900 hover:text-stone-700 flex items-center gap-1 pt-1"
            >
              <span>Read Architecture & Craft Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Brand Pillars Trust Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-200">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-white border border-stone-200 shrink-0 text-stone-900">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">White-Glove In-Room Delivery</h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Complimentary on orders over $250. Unpacking, placement, and debris removal included.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-white border border-stone-200 shrink-0 text-stone-900">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">30-Day In-Home Trial</h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Experience the craftsmanship in your own space. Hassle-free pickup and full refund.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-white border border-stone-200 shrink-0 text-stone-900">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-900">10-Year Heirloom Guarantee</h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Every frame and fixture is backed against manufacturing flaws for a decade.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
