import React, { useState } from 'react';
import { useShopifyStore } from '../context/ShopifyStoreContext';
import { ArrowRight, Check, ShieldCheck, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, isB2BMode, toggleB2BMode } = useShopifyStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currency, setCurrency] = useState('USD');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl font-bold tracking-tight text-white font-display">
              A E T H E L
            </span>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Headless Shopify storefront for architectural furniture, sculptural luminaires, and handmade ceramic objects. Built for calm living spaces.
            </p>
            <div className="pt-2 text-[11px] text-stone-500 font-mono space-y-1">
              <div>Next.js 16 App Router · Shopify Storefront API 2026-01</div>
              <div>Shopify Customer Account API · B2B Wholesale Ready</div>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Catalog Collections
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => navigate('/collections/minimalist-living')}
                  className="hover:text-white transition-colors"
                >
                  Living & Seating
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/collections/lighting-fixtures')}
                  className="hover:text-white transition-colors"
                >
                  Luminaires & Ambient
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/collections/ceramics-accents')}
                  className="hover:text-white transition-colors"
                >
                  Ceramics & Accents
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/collections/architectural-audio')}
                  className="hover:text-white transition-colors"
                >
                  Acoustics & Technology
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/collections')}
                  className="hover:text-white transition-colors"
                >
                  Complete Catalog
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Client Care */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Client Care
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => navigate('/account')}
                  className="hover:text-white transition-colors"
                >
                  Customer Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/account')}
                  className="hover:text-white transition-colors"
                >
                  Order Status & Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/pages/shipping-returns')}
                  className="hover:text-white transition-colors"
                >
                  White-Glove Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/pages/shipping-returns')}
                  className="hover:text-white transition-colors"
                >
                  30-Day Returns Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/pages/about')}
                  className="hover:text-white transition-colors"
                >
                  Design Philosophy
                </button>
              </li>
            </ul>
          </div>

          {/* Trade & Newsletter */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Trade & B2B
            </div>
            <p className="text-stone-400 text-xs">
              Architects and interior specifiers receive wholesale tiered pricing and Net 30 terms.
            </p>
            <button
              onClick={toggleB2BMode}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                isB2BMode
                  ? 'bg-amber-400 text-stone-950'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
              }`}
            >
              <span>{isB2BMode ? 'Disable B2B Wholesale' : 'Enable B2B Wholesale Mode'}</span>
            </button>

            {/* Newsletter input */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-stone-400 block mb-1.5">
                Dispatch Gazette
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@studio.com"
                  className="w-full bg-stone-800 text-white placeholder:text-stone-500 text-xs px-3 py-1.5 rounded-lg border border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-stone-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-white text-stone-900 rounded-lg font-semibold hover:bg-stone-200 transition-colors"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </form>
              {subscribed && (
                <div className="text-[10px] text-emerald-400 mt-1">
                  Thank you for subscribing to our studio gazette.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-xs">
          <div>
            © {new Date().getFullYear()} Studio Aethel Inc. All rights reserved. Powered by Shopify Storefront API.
          </div>

          <div className="flex items-center gap-6">
            {/* Market & Currency Selector */}
            <div className="flex items-center gap-1.5 text-stone-400">
              <Globe className="w-3.5 h-3.5" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-stone-300 font-mono text-xs focus:outline-hidden cursor-pointer"
              >
                <option value="USD" className="bg-stone-900 text-white">United States (USD $)</option>
                <option value="EUR" className="bg-stone-900 text-white">European Union (EUR €)</option>
                <option value="GBP" className="bg-stone-900 text-white">United Kingdom (GBP £)</option>
                <option value="CAD" className="bg-stone-900 text-white">Canada (CAD $)</option>
                <option value="AUD" className="bg-stone-900 text-white">Australia (AUD $)</option>
              </select>
            </div>

            <button onClick={() => navigate('/pages/about')} className="hover:text-stone-300">
              Privacy & Legal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
