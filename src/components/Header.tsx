import React, { useState } from 'react';
import { useShopifyStore } from '../context/ShopifyStoreContext';
import { Search, ShoppingBag, User, Menu, X, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPath,
    navigate,
    cart,
    openCart,
    openSearch,
    isB2BMode,
    toggleB2BMode,
    b2bCompany,
  } = useShopifyStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const navLinks = [
    { label: 'Catalog', path: '/collections' },
    { label: 'Living', path: '/collections/minimalist-living' },
    { label: 'Lighting', path: '/collections/lighting-fixtures' },
    { label: 'Ceramics', path: '/collections/ceramics-accents' },
    { label: 'Acoustics', path: '/collections/architectural-audio' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      {/* Slim Promotional Announcement Bar (≤40px) */}
      {showPromoBanner && (
        <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 border-b border-stone-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-medium text-white">Shopify Headless Storefront</span>
              <span className="text-stone-500 hidden sm:inline">·</span>
              <span className="text-stone-300 hidden sm:inline">Complimentary white-glove delivery on orders over $250</span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* B2B Mode Switcher Button */}
              <button
                onClick={toggleB2BMode}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                  isB2BMode
                    ? 'bg-amber-400 text-stone-950 font-semibold shadow-xs'
                    : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700'
                }`}
                title="Toggle between standard B2C and Shopify Plus B2B wholesale pricing"
              >
                <Building2 className="w-3 h-3" />
                <span>{isB2BMode ? 'B2B Wholesale Active (-25%)' : 'Switch to B2B Mode'}</span>
              </button>

              <button
                onClick={() => setShowPromoBanner(false)}
                className="text-stone-400 hover:text-white ml-1 p-0.5"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar — Strict 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line wordmark */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-stone-800 hover:text-stone-950"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => navigate('/')}
            className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 font-display whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
          >
            A E T H E L
          </button>
        </div>

        {/* Zone 2: 4–5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-stone-950 ${
                  isActive ? 'text-stone-950 border-b-2 border-stone-950 font-semibold' : ''
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action Zone */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Search Button */}
          <button
            onClick={openSearch}
            className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 rounded-full transition-colors"
            aria-label="Open search"
            title="Search products and collections"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Customer Account Button */}
          <button
            onClick={() => navigate('/account')}
            className={`p-2 rounded-full transition-colors ${
              currentPath.startsWith('/account')
                ? 'bg-stone-200/80 text-stone-950'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/50'
            }`}
            aria-label="Customer account"
            title="Customer Account"
          >
            <User className="w-4.5 h-4.5" />
          </button>

          {/* Cart Bag with Tabular Number Counter */}
          <button
            onClick={openCart}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
            aria-label={`Shopping cart with ${cart.totalQuantity} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-stone-700 text-stone-100 text-[11px] px-1.5 py-0.2 rounded font-mono tabular-nums">
              {cart.totalQuantity}
            </span>
          </button>
        </div>
      </div>

      {/* B2B Active Banner Indicator if Wholesale is enabled */}
      {isB2BMode && (
        <div className="bg-amber-50 border-t border-amber-200/80 px-4 py-1.5 text-xs text-amber-900 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-amber-700" />
              <span>
                <strong>Shopify Plus B2B Account:</strong> {b2bCompany.name} ({b2bCompany.location})
              </span>
              <span className="text-amber-400 hidden md:inline">·</span>
              <span className="text-amber-800 hidden md:inline">Payment Terms: {b2bCompany.paymentTerms}</span>
            </div>
            <span className="font-semibold text-amber-950 font-mono tabular-nums">Wholesale -25% applied</span>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#faf9f6] border-b border-stone-200 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Collections</span>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-base font-medium text-stone-800 py-1 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 space-y-3">
            <button
              onClick={() => {
                navigate('/account');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-sm font-medium text-stone-700 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Customer Account & Orders</span>
            </button>
            <button
              onClick={() => {
                toggleB2BMode();
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-sm font-medium text-amber-800 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>{isB2BMode ? 'Disable B2B Wholesale' : 'Enable B2B Wholesale Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
