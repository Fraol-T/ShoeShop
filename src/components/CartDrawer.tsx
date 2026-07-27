"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, CreditCard } from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form states for checkout
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "4242 •••• •••• 4242",
  });

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");

    if (promoCode.trim().toUpperCase() === "NIKE20") {
      setDiscount(0.2);
      setPromoSuccess("20% NIKE VIP Discount Applied!");
    } else if (promoCode.trim().toUpperCase() === "FREESHIP") {
      setPromoSuccess("Free Express Shipping Applied!");
    } else {
      setPromoError("Invalid code. Try 'NIKE20'");
    }
  };

  const shippingCost = cartTotal > 150 || promoSuccess.includes("Shipping") || cartTotal === 0 ? 0 : 15;
  const discountAmount = cartTotal * discount;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingCost);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#ff5500", "#111111", "#10b981", "#ffffff"],
    });

    setTimeout(() => {
      clearCart();
      setIsCheckoutModalOpen(false);
      setOrderComplete(false);
      setIsCartOpen(false);
    }, 4000);
  };

  return (
    <>
      {/* Slide-Over Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-screen max-w-md bg-[#111113] text-white shadow-2xl flex flex-col justify-between border-l border-white/10"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#18181c]">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-[#ff5500]/20 text-[#ff5500]">
                      <ShoppingBag size={22} />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold tracking-wide">
                        YOUR BAG
                      </h2>
                      <p className="text-xs text-neutral-400 font-medium">
                        {cart.length} {cart.length === 1 ? "item" : "items"} selected
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-neutral-400">
                      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-neutral-500">
                        <ShoppingBag size={40} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-white">
                          YOUR BAG IS EMPTY
                        </h3>
                        <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                          Explore our latest Air Max collection and pick your favorite colorway!
                        </p>
                      </div>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4 px-6 py-2.5 rounded-xl bg-[#ff5500] hover:bg-[#e64d00] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg"
                      >
                        BROWSE STORE
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.colorName}-${item.size}`}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-[#18181c] border border-white/5 rounded-2xl p-4 flex items-center space-x-4 relative group"
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-20 bg-white/5 rounded-xl p-2 flex items-center justify-center relative flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-1 transform -rotate-12"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-lg font-bold truncate text-white">
                            {item.name}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-neutral-400 mt-0.5">
                            <span
                              className="w-3 h-3 rounded-full inline-block border border-white/20"
                              style={{ backgroundColor: item.colorHex }}
                            />
                            <span>{item.colorName}</span>
                            <span>•</span>
                            <span className="font-bold text-white">{item.size}</span>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <span className="font-bold text-base text-[#ff5500]">
                              ${item.price * item.quantity}
                            </span>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2 bg-white/5 rounded-lg border border-white/10 p-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.colorName, item.size, -1)
                                }
                                className="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.colorName, item.size, 1)
                                }
                                className="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove item */}
                        <button
                          onClick={() =>
                            removeFromCart(item.id, item.colorName, item.size)
                          }
                          className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Footer / Total & Checkout Button */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-white/10 bg-[#18181c] space-y-4">
                    {/* Promo Code Input */}
                    <form onSubmit={handleApplyPromo} className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Promo Code (e.g. NIKE20)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff5500] uppercase"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        APPLY
                      </button>
                    </form>

                    {promoSuccess && (
                      <p className="text-xs text-emerald-400 font-semibold">{promoSuccess}</p>
                    )}
                    {promoError && (
                      <p className="text-xs text-rose-400 font-semibold">{promoError}</p>
                    )}

                    {/* Breakdown */}
                    <div className="space-y-1.5 text-xs text-neutral-400">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="text-white font-medium">${cartTotal.toFixed(2)}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Discount (20%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-white font-medium">
                          {shippingCost === 0 ? "FREE" : `$${shippingCost}`}
                        </span>
                      </div>

                      <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                        <span>Total Amount</span>
                        <span className="text-[#ff5500]">${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsCheckoutModalOpen(true)}
                      className="w-full py-3.5 bg-[#ff5500] hover:bg-[#e64d00] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg"
                    >
                      <span>PROCEED TO CHECKOUT</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Simulated Checkout Modal */}
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#18181c] text-white rounded-3xl border border-white/10 p-8 shadow-2xl z-10 my-8"
            >
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white"
              >
                <X size={20} />
              </button>

              {orderComplete ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white">
                    ORDER CONFIRMED!
                  </h3>
                  <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                    Thank you for shopping at NIKE. Your order confirmation and tracking info have been sent to your email.
                  </p>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-left text-xs space-y-1">
                    <p className="text-neutral-400">Order Ref: <span className="text-white font-bold">#NK-270-9842</span></p>
                    <p className="text-neutral-400">Estimated Delivery: <span className="text-emerald-400 font-bold">2-3 Business Days</span></p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCompleteOrder} className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-[#ff5500]/20 text-[#ff5500]">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold">
                        SECURE CHECKOUT
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Total Payable: <span className="text-[#ff5500] font-bold">${finalTotal.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>

                  {/* Express Pay */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, name: "Fraol T.", email: "customer@nike.com" })}
                      className="py-2.5 bg-white text-black font-extrabold text-xs rounded-xl flex items-center justify-center space-x-2 hover:bg-neutral-200 transition-colors"
                    >
                      <span>Pay</span>
                    </button>
                    <button
                      type="button"
                      className="py-2.5 bg-blue-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
                    >
                      <CreditCard size={14} />
                      <span>CARD PAY</span>
                    </button>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-neutral-400 font-semibold mb-1">FULL NAME</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 font-semibold mb-1">EMAIL ADDRESS</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 font-semibold mb-1">SHIPPING ADDRESS</label>
                      <input
                        required
                        type="text"
                        placeholder="123 Nike Blvd, Suite 100"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#ff5500] hover:bg-[#e64d00] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-lg transition-all"
                  >
                    COMPLETE PAYMENT (${finalTotal.toFixed(2)})
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
