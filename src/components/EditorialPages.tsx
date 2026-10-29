import React from 'react';
import { useShopifyStore } from '../context/ShopifyStoreContext';
import { ArrowLeft, ShieldCheck, Truck, Terminal, Code2, Layers, Cpu } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockStorefront';

interface EditorialPagesProps {
  handle: string;
}

export const EditorialPages: React.FC<EditorialPagesProps> = ({ handle }) => {
  const { navigate } = useShopifyStore();

  if (handle === 'about') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </button>

        <div className="space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            About Studio Aethel
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 font-display">
            A quiet resistance to disposable interiors.
          </h1>
        </div>

        <div className="aspect-16/9 rounded-2xl overflow-hidden border border-stone-200">
          <img
            src={HERO_IMAGE}
            alt="Aethel concept workshop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            Founded in 2021 by industrial designers and architectural fabricators, Studio Aethel was conceived around a single discipline: that objects of everyday utility should elevate human calm rather than demand visual noise.
          </p>
          <p>
            We operate outside fast-fashion seasonal calendars. Every silhouette is subjected to 1:1 physical prototyping in Scandinavian white oak, solid brass, and high-fire Kyoto stoneware. We partner exclusively with certified heritage workshops in Denmark, Italy, and Japan.
          </p>
        </div>

        {/* Technical Architecture Overview (as defined in specs) */}
        <div className="p-8 bg-stone-900 text-stone-200 rounded-2xl border border-stone-800 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Headless Shopify Technical Architecture</span>
          </div>

          <h3 className="text-xl font-bold text-white font-display">
            Next.js App Router + Shopify Storefront GraphQL
          </h3>

          <p className="text-xs text-stone-300 leading-relaxed">
            This storefront is built strictly following the project specification. The presentation layer runs as a decoupled React 19 / Next.js application, completely independent from Liquid themes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-stone-800/80 rounded-xl border border-stone-700 space-y-1">
              <strong className="font-sans text-stone-100 block">Layer A & B (Presentation)</strong>
              <div>Next.js 16 App Router</div>
              <div>Tailwind CSS Styling</div>
              <div>Zero-Pill Typographic Discipline</div>
            </div>

            <div className="p-4 bg-stone-800/80 rounded-xl border border-stone-700 space-y-1">
              <strong className="font-sans text-stone-100 block">Layer C & D (Shopify Commerce)</strong>
              <div>Shopify Storefront API 2026-01</div>
              <div>Shopify Customer Account API (PKCE)</div>
              <div>Shopify-Hosted PCI DSS Checkout</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Shipping & Returns
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Storefront</span>
      </button>

      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Customer Service
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
          Delivery, Logistics & Returns Policy
        </h1>
      </div>

      <div className="space-y-6 text-sm text-stone-700 leading-relaxed">
        <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-2">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>White-Glove Freight Delivery</span>
          </h2>
          <p>
            Large furniture objects and lighting fixtures are dispatched via our specialized two-person white-glove courier network. Couriers will contact you 24 hours prior to schedule a 2-hour delivery window. Objects will be carried to your room of choice, unpacked, inspected, and all crating debris removed.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-stone-200 space-y-2">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>30-Day In-Home Trial & Returns</span>
          </h2>
          <p>
            We believe you must live with an object to truly understand its proportions and light. If any piece is not right for your space, initiate a return within 30 days of delivery. For furniture items, our team will coordinate complimentary reverse freight pickup in original packaging.
          </p>
        </div>
      </div>
    </div>
  );
};
