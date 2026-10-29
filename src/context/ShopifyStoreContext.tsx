import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductVariant,
  Cart,
  CartLine,
  Customer,
  CustomerAddress,
  B2BCompany,
} from '../types/shopify';
import {
  MOCK_PRODUCTS,
  MOCK_COLLECTIONS,
  MOCK_CUSTOMER,
  MOCK_B2B_COMPANY,
} from '../data/mockStorefront';

interface ShopifyContextType {
  // Navigation / Routing
  currentPath: string;
  navigate: (path: string) => void;

  // Catalog
  products: Product[];
  collections: typeof MOCK_COLLECTIONS;
  getProductByHandle: (handle: string) => Product | undefined;
  getCollectionByHandle: (handle: string) => typeof MOCK_COLLECTIONS[0] | undefined;

  // Cart
  cart: Cart;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    variant: ProductVariant,
    product: Product,
    quantity?: number,
    sellingPlanAllocation?: CartLine['sellingPlanAllocation']
  ) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  discountCodeInput: string;
  setDiscountCodeInput: (code: string) => void;
  cartNote: string;
  setCartNote: (note: string) => void;
  freeShippingThreshold: number;

  // B2B Commerce Mode
  isB2BMode: boolean;
  toggleB2BMode: () => void;
  b2bCompany: B2BCompany;
  purchaseOrderNumber: string;
  setPurchaseOrderNumber: (po: string) => void;

  // Customer Account
  customer: Customer | null;
  isCustomerLoggedIn: boolean;
  loginCustomer: () => void;
  logoutCustomer: () => void;
  addCustomerAddress: (address: Omit<CustomerAddress, 'id'>) => void;
  setDefaultAddress: (id: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // Checkout modal
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  checkoutSuccessOrderNumber: string | null;
  completeCheckout: () => void;
  resetCheckout: () => void;
}

const ShopifyContext = createContext<ShopifyContextType | null>(null);

const FREE_SHIPPING_THRESHOLD = 250;

export const ShopifyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPath, setCurrentPath] = useState<string>('/');

  // Handle browser back/forward buttons or hash routing
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // B2B Wholesale mode
  const [isB2BMode, setIsB2BMode] = useState<boolean>(false);
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState<string>('PO-2026-KANSO-094');

  const toggleB2BMode = () => {
    setIsB2BMode((prev) => !prev);
  };

  // Cart state initialized with 1 item for immediate visual richness
  const [cartLines, setCartLines] = useState<CartLine[]>([
    {
      id: 'gid://shopify/CartLine/1',
      quantity: 1,
      merchandise: {
        ...MOCK_PRODUCTS[0].variants[0],
        product: {
          id: MOCK_PRODUCTS[0].id,
          title: MOCK_PRODUCTS[0].title,
          handle: MOCK_PRODUCTS[0].handle,
          vendor: MOCK_PRODUCTS[0].vendor,
          image: MOCK_PRODUCTS[0].images[0],
        },
      },
      cost: {
        totalAmount: { amount: '1280.00', currencyCode: 'USD' },
      },
    },
  ]);

  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    percentage: number;
  } | null>(null);
  const [discountCodeInput, setDiscountCodeInput] = useState<string>('');
  const [cartNote, setCartNote] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Compute Cart Calculations
  const subtotal = cartLines.reduce((acc, line) => {
    const effectiveUnitPrice =
      isB2BMode && line.merchandise.b2bWholesalePrice
        ? parseFloat(line.merchandise.b2bWholesalePrice.amount)
        : parseFloat(line.merchandise.price.amount);
    
    // Check selling plan discount (e.g. 10% off for subscription)
    const subscriptionDiscount = line.sellingPlanAllocation
      ? line.sellingPlanAllocation.sellingPlan.discountPercentage / 100
      : 0;

    const unitPriceAfterPlan = effectiveUnitPrice * (1 - subscriptionDiscount);
    return acc + unitPriceAfterPlan * line.quantity;
  }, 0);

  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percentage) / 100 : 0;
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  // B2B is tax exempt
  const totalTax = isB2BMode ? 0 : taxableSubtotal * 0.0825;
  const totalAmount = taxableSubtotal + totalTax;
  const totalQuantity = cartLines.reduce((sum, item) => sum + item.quantity, 0);

  const cart: Cart = {
    id: 'gid://shopify/Cart/c1-9f28a3048b',
    checkoutUrl: 'https://checkout.shopify.com/c/c1-9f28a3048b',
    totalQuantity,
    lines: cartLines,
    cost: {
      subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
      totalTaxAmount: { amount: totalTax.toFixed(2), currencyCode: 'USD' },
      totalAmount: { amount: totalAmount.toFixed(2), currencyCode: 'USD' },
    },
    discountCodes: appliedDiscount
      ? [
          {
            code: appliedDiscount.code,
            applicable: true,
            amount: { amount: discountAmount.toFixed(2), currencyCode: 'USD' },
          },
        ]
      : [],
    note: cartNote,
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (
    variant: ProductVariant,
    product: Product,
    quantity = 1,
    sellingPlanAllocation?: CartLine['sellingPlanAllocation']
  ) => {
    setCartLines((prev) => {
      const existingIndex = prev.findIndex((l) => l.merchandise.id === variant.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          cost: {
            totalAmount: {
              amount: (parseFloat(variant.price.amount) * newQty).toFixed(2),
              currencyCode: variant.price.currencyCode,
            },
          },
        };
        return updated;
      }

      const newLine: CartLine = {
        id: `gid://shopify/CartLine/${Date.now()}`,
        quantity,
        merchandise: {
          ...variant,
          product: {
            id: product.id,
            title: product.title,
            handle: product.handle,
            vendor: product.vendor,
            image: product.images[0],
          },
        },
        cost: {
          totalAmount: {
            amount: (parseFloat(variant.price.amount) * quantity).toFixed(2),
            currencyCode: variant.price.currencyCode,
          },
        },
        sellingPlanAllocation,
      };
      return [newLine, ...prev];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeLine(lineId);
      return;
    }
    setCartLines((prev) =>
      prev.map((line) => {
        if (line.id === lineId) {
          return {
            ...line,
            quantity,
            cost: {
              totalAmount: {
                amount: (parseFloat(line.merchandise.price.amount) * quantity).toFixed(2),
                currencyCode: line.merchandise.price.currencyCode,
              },
            },
          };
        }
        return line;
      })
    );
  };

  const removeLine = (lineId: string) => {
    setCartLines((prev) => prev.filter((l) => l.id !== lineId));
  };

  const applyDiscountCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) return { success: false, message: 'Please enter a discount code' };

    if (clean === 'WELCOME10') {
      setAppliedDiscount({ code: 'WELCOME10', percentage: 10 });
      return { success: true, message: '10% discount applied to your order' };
    }
    if (clean === 'ARCHITECT25' || clean === 'VIP25') {
      setAppliedDiscount({ code: clean, percentage: 25 });
      return { success: true, message: '25% trade discount applied' };
    }
    return { success: false, message: 'Discount code is not valid for items in your cart' };
  };

  const removeDiscountCode = () => {
    setAppliedDiscount(null);
    setDiscountCodeInput('');
  };

  // Customer Authentication & Account
  const [customer, setCustomer] = useState<Customer | null>(MOCK_CUSTOMER);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState<boolean>(true);

  const loginCustomer = () => {
    setCustomer(MOCK_CUSTOMER);
    setIsCustomerLoggedIn(true);
  };

  const logoutCustomer = () => {
    setIsCustomerLoggedIn(false);
  };

  const addCustomerAddress = (addressData: Omit<CustomerAddress, 'id'>) => {
    if (!customer) return;
    const newAddress: CustomerAddress = {
      ...addressData,
      id: `gid://shopify/MailingAddress/${Date.now()}`,
    };
    setCustomer({
      ...customer,
      addresses: [...customer.addresses, newAddress],
    });
  };

  const setDefaultAddress = (id: string) => {
    if (!customer) return;
    const updated = customer.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    const newDefault = updated.find((a) => a.id === id);
    setCustomer({
      ...customer,
      addresses: updated,
      defaultAddress: newDefault,
    });
  };

  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  // Checkout simulation modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutSuccessOrderNumber, setCheckoutSuccessOrderNumber] = useState<string | null>(null);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const completeCheckout = () => {
    const orderNum = `#AET-${Math.floor(10000 + Math.random() * 90000)}`;
    setCheckoutSuccessOrderNumber(orderNum);
    setCartLines([]);
  };

  const resetCheckout = () => {
    setCheckoutSuccessOrderNumber(null);
    setIsCheckoutOpen(false);
  };

  const getProductByHandle = (handle: string) => {
    return MOCK_PRODUCTS.find((p) => p.handle === handle);
  };

  const getCollectionByHandle = (handle: string) => {
    return MOCK_COLLECTIONS.find((c) => c.handle === handle);
  };

  return (
    <ShopifyContext.Provider
      value={{
        currentPath,
        navigate,
        products: MOCK_PRODUCTS,
        collections: MOCK_COLLECTIONS,
        getProductByHandle,
        getCollectionByHandle,
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeLine,
        applyDiscountCode,
        removeDiscountCode,
        discountCodeInput,
        setDiscountCodeInput,
        cartNote,
        setCartNote,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isB2BMode,
        toggleB2BMode,
        b2bCompany: MOCK_B2B_COMPANY,
        purchaseOrderNumber,
        setPurchaseOrderNumber,
        customer,
        isCustomerLoggedIn,
        loginCustomer,
        logoutCustomer,
        addCustomerAddress,
        setDefaultAddress,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        openSearch,
        closeSearch,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        checkoutSuccessOrderNumber,
        completeCheckout,
        resetCheckout,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
};

export const useShopifyStore = () => {
  const context = useContext(ShopifyContext);
  if (!context) {
    throw new Error('useShopifyStore must be used within a ShopifyProvider');
  }
  return context;
};
