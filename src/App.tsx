/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopifyProvider, useShopifyStore } from './context/ShopifyStoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { CollectionView } from './components/CollectionView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartPageView } from './components/CartPageView';
import { AccountView } from './components/AccountView';
import { EditorialPages } from './components/EditorialPages';
import { CartDrawer } from './components/CartDrawer';
import { SearchView } from './components/SearchView';
import { CheckoutModal } from './components/CheckoutModal';

const StorefrontRouter: React.FC = () => {
  const { currentPath } = useShopifyStore();

  const renderContent = () => {
    if (currentPath === '/') {
      return <HomeView />;
    }

    if (currentPath.startsWith('/products/')) {
      const handle = currentPath.replace('/products/', '').split('?')[0];
      return <ProductDetailView handle={handle} />;
    }

    if (currentPath.startsWith('/collections/')) {
      const handle = currentPath.replace('/collections/', '').split('?')[0];
      return <CollectionView handle={handle} />;
    }

    if (currentPath === '/collections') {
      return <CollectionView />;
    }

    if (currentPath === '/cart') {
      return <CartPageView />;
    }

    if (currentPath.startsWith('/account')) {
      return <AccountView />;
    }

    if (currentPath.startsWith('/pages/')) {
      const handle = currentPath.replace('/pages/', '').split('?')[0];
      return <EditorialPages handle={handle} />;
    }

    return <HomeView />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      <Header />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer />

      {/* Overlays & Drawers */}
      <CartDrawer />
      <SearchView />
      <CheckoutModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopifyProvider>
      <StorefrontRouter />
    </ShopifyProvider>
  );
}
