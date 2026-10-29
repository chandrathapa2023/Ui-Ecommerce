export interface Money {
  amount: string;
  currencyCode: string;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string; // gid://shopify/ProductVariant/12345
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice?: Money;
  selectedOptions: SelectedOption[];
  quantityAvailable: number;
  sku: string;
  image?: {
    url: string;
    altText: string;
  };
  b2bWholesalePrice?: Money; // B2B Tier Pricing
}

export interface Product {
  id: string; // gid://shopify/Product/12345
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange?: {
    minVariantPrice: Money;
  };
  images: Array<{
    id: string;
    url: string;
    altText: string;
    width?: number;
    height?: number;
  }>;
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  variants: ProductVariant[];
  metafields?: {
    material?: string;
    dimensions?: string;
    origin?: string;
    care?: string;
  };
  minOrderQuantityB2B?: number;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: {
    url: string;
    altText: string;
  };
  productsCount: number;
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant & {
    product: {
      id: string;
      title: string;
      handle: string;
      vendor: string;
      image?: { url: string; altText: string };
    };
  };
  cost: {
    totalAmount: Money;
  };
  sellingPlanAllocation?: {
    sellingPlan: {
      id: string;
      name: string;
      discountPercentage: number;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  cost: {
    subtotalAmount: Money;
    totalTaxAmount: Money;
    totalAmount: Money;
  };
  discountCodes?: Array<{
    code: string;
    applicable: boolean;
    amount?: Money;
  }>;
  note?: string;
}

export interface CustomerAddress {
  id: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface CustomerOrderLine {
  title: string;
  variantTitle: string;
  quantity: number;
  price: Money;
  imageUrl: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  processedAt: string;
  financialStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  fulfillmentStatus: 'FULFILLED' | 'UNFULFILLED' | 'IN_TRANSIT';
  totalPrice: Money;
  trackingNumber?: string;
  trackingCompany?: string;
  lineItems: CustomerOrderLine[];
  shippingAddress: CustomerAddress;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: CustomerAddress[];
  defaultAddress?: CustomerAddress;
  orders: CustomerOrder[];
}

export interface B2BCompany {
  id: string;
  name: string;
  location: string;
  paymentTerms: 'NET_30' | 'NET_60' | 'DUE_ON_RECEIPT';
  tierDiscount: number; // e.g. 0.25 (25% off)
  taxExempt: boolean;
  creditLimit: Money;
  availableCredit: Money;
}
