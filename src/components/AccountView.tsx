import React, { useState } from 'react';
import { useShopifyStore } from '../context/ShopifyStoreContext';
import {
  User,
  Package,
  MapPin,
  Building2,
  LogOut,
  Plus,
  Check,
  Truck,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { CustomerAddress } from '../types/shopify';

export const AccountView: React.FC = () => {
  const {
    customer,
    isCustomerLoggedIn,
    loginCustomer,
    logoutCustomer,
    addCustomerAddress,
    setDefaultAddress,
    navigate,
    isB2BMode,
    b2bCompany,
  } = useShopifyStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile' | 'b2b'>('orders');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Address form modal state
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [newStreet, setNewStreet] = useState<string>('');
  const [newCity, setNewCity] = useState<string>('');
  const [newState, setNewState] = useState<string>('');
  const [newZip, setNewZip] = useState<string>('');

  if (!isCustomerLoggedIn || !customer) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-800">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-stone-900 font-display">
            Shopify Customer Account
          </h1>
          <p className="text-xs text-stone-600 leading-relaxed">
            Sign in with your passwordless Shopify Customer Account API to view order history, track shipments, and manage trade addresses.
          </p>
        </div>

        <button
          onClick={loginCustomer}
          className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <span>Continue with Shopify Single Sign-On</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>OAuth 2.0 PKCE Protected Customer Session</span>
        </div>
      </div>
    );
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity) return;
    addCustomerAddress({
      address1: newStreet,
      city: newCity,
      province: newState || 'CA',
      zip: newZip || '90210',
      country: 'United States',
      isDefault: false,
    });
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewZip('');
    setShowAddressModal(false);
  };

  const selectedOrder = customer.orders.find((o) => o.id === selectedOrderId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Account Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <button onClick={() => navigate('/')} className="hover:text-stone-900">
              Home
            </button>
            <span>/</span>
            <span className="text-stone-900 font-medium">Customer Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-display">
            Welcome, {customer.firstName} {customer.lastName}
          </h1>
          <p className="text-xs text-stone-500 mt-1">{customer.email}</p>
        </div>

        <button
          onClick={logoutCustomer}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 hover:text-stone-900 transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Orders ({customer.orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'addresses'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Saved Addresses ({customer.addresses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-stone-900 text-white'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Customer Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('b2b')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'b2b'
              ? 'bg-amber-900 text-white'
              : 'text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/60'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Shopify Plus B2B Account</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {customer.orders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-3">
              <Package className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-semibold text-stone-800">No previous orders found</p>
              <button
                onClick={() => navigate('/collections')}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            customer.orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-stone-200/80 p-5 space-y-4 hover:shadow-xs transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-stone-900">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-stone-400">·</span>
                    <span className="text-xs text-stone-500">
                      Placed {new Date(order.processedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                      {order.fulfillmentStatus}
                    </span>
                    <span className="text-sm font-bold text-stone-900 font-mono tabular-nums">
                      ${order.totalPrice.amount} {order.totalPrice.currencyCode}
                    </span>
                  </div>
                </div>

                {/* Line Items preview */}
                <div className="space-y-3">
                  {order.lineItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-stone-900">{item.title}</h4>
                        <p className="text-[11px] text-stone-500">{item.variantTitle}</p>
                        <p className="text-[11px] text-stone-400 mt-0.5 font-mono tabular-nums">
                          Qty {item.quantity} · ${item.price.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking & Logistics Footer */}
                {order.trackingNumber && (
                  <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600 bg-stone-50/70 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-stone-800" />
                      <span>
                        Carrier: <strong>{order.trackingCompany}</strong>
                      </span>
                      <span>·</span>
                      <span className="font-mono text-stone-700">
                        Tracking: {order.trackingNumber}
                      </span>
                    </div>

                    <span className="text-emerald-700 font-medium">Delivered to Residence</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">Delivery Addresses</h2>
            <button
              onClick={() => setShowAddressModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customer.addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-5 rounded-xl border transition-all ${
                  addr.isDefault
                    ? 'bg-white border-stone-900 shadow-2xs'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-stone-700" />
                    <span className="text-xs font-semibold text-stone-900">
                      {addr.isDefault ? 'Default Shipping Address' : 'Secondary Address'}
                    </span>
                  </div>
                  {addr.isDefault ? (
                    <span className="px-2 py-0.5 bg-stone-900 text-white text-[10px] font-semibold rounded">
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-xs text-stone-500 hover:text-stone-900 underline"
                    >
                      Make Default
                    </button>
                  )}
                </div>

                <div className="text-xs text-stone-600 leading-relaxed font-mono">
                  <p className="font-sans font-semibold text-stone-900">
                    {customer.firstName} {customer.lastName}
                  </p>
                  <p>{addr.address1}</p>
                  {addr.address2 && <p>{addr.address2}</p>}
                  <p>
                    {addr.city}, {addr.province} {addr.zip}
                  </p>
                  <p>{addr.country}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Modal to add address */}
          {showAddressModal && (
            <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-stone-200 space-y-4">
                <h3 className="text-base font-bold text-stone-900">Add New Address</h3>
                <form onSubmit={handleAddAddress} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      placeholder="e.g. 742 Evergreen Terrace"
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="San Francisco"
                        className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        State / Province
                      </label>
                      <input
                        type="text"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        placeholder="California"
                        className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Postal Code / ZIP
                    </label>
                    <input
                      type="text"
                      value={newZip}
                      onChange={(e) => setNewZip(e.target.value)}
                      placeholder="94107"
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(false)}
                      className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Customer Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 max-w-xl space-y-4">
          <h2 className="text-base font-bold text-stone-900">Personal Information</h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-stone-100">
              <span className="text-stone-500">First Name</span>
              <span className="font-semibold text-stone-900">{customer.firstName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100">
              <span className="text-stone-500">Last Name</span>
              <span className="font-semibold text-stone-900">{customer.lastName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100">
              <span className="text-stone-500">Email Address</span>
              <span className="font-mono text-stone-900">{customer.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-100">
              <span className="text-stone-500">Telephone</span>
              <span className="font-mono text-stone-900">{customer.phone}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-stone-500">Shopify Customer GID</span>
              <span className="font-mono text-stone-400 text-[11px]">{customer.id}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Shopify Plus B2B Account Overview */}
      {activeTab === 'b2b' && (
        <div className="bg-amber-50/50 rounded-2xl border border-amber-200/80 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 text-amber-900 rounded-xl">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">{b2bCompany.name}</h3>
                <p className="text-xs text-amber-900">{b2bCompany.location}</p>
              </div>
            </div>

            <span className="px-3 py-1 bg-amber-200/70 text-amber-950 font-semibold text-xs rounded-full">
              Approved Trade Account
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-amber-200/60 text-xs">
            <div className="bg-white p-4 rounded-xl border border-amber-200/60 space-y-1">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] font-semibold">
                Wholesale Discount
              </span>
              <div className="text-xl font-bold text-amber-950 font-mono">
                {b2bCompany.tierDiscount * 100}% Off MSRP
              </div>
              <p className="text-[11px] text-stone-500">Applied automatically across all variants</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-200/60 space-y-1">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] font-semibold">
                Commercial Payment Terms
              </span>
              <div className="text-xl font-bold text-stone-900 font-mono">
                {b2bCompany.paymentTerms}
              </div>
              <p className="text-[11px] text-stone-500">Invoiced via Purchase Order (PO)</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-200/60 space-y-1">
              <span className="text-stone-500 uppercase tracking-wider text-[10px] font-semibold">
                Available Line of Credit
              </span>
              <div className="text-xl font-bold text-stone-900 font-mono tabular-nums">
                ${b2bCompany.availableCredit.amount}
              </div>
              <p className="text-[11px] text-stone-500">
                Limit: ${b2bCompany.creditLimit.amount} USD
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
