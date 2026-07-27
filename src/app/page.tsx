"use client";

import React from "react";
import HeaderNav from "@/components/HeaderNav";
import HeroShowcase from "@/components/HeroShowcase";
import ProductQuickWidget from "@/components/ProductQuickWidget";
import ProductCatalog from "@/components/ProductCatalog";
import CartDrawer from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import { CartProvider } from "@/context/CartContext";
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0d0d0f] text-white flex flex-col justify-between selection:bg-[#ff5500] selection:text-white">
        {/* Top Announcement Bar */}
        <div className="bg-[#ff5500] text-white text-[11px] font-extrabold uppercase tracking-widest text-center py-2 px-4 shadow-sm">
          🔥 FREE EXPRESS SHIPPING ON ALL ORDERS OVER $150 | USE CODE &apos;NIKE20&apos; FOR 20% OFF
        </div>

        {/* Main Application Container */}
        <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
          {/* Header Bar */}
          <HeaderNav />

          {/* Centered Dual-Pane Card Showcase (Matches reference screenshot layout) */}
          <div className="shadow-2xl rounded-3xl overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-12 bg-[#111113]">
            {/* Left Hero Pane (7 Cols on desktop) */}
            <div className="lg:col-span-8">
              <HeroShowcase />
            </div>

            {/* Right White Card Widget Pane (4 Cols on desktop) */}
            <div className="lg:col-span-4 bg-white">
              <ProductQuickWidget />
            </div>
          </div>

          {/* Trust Value Props Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-6 bg-[#18181c] border border-white/5 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-[#ff5500]/10 text-[#ff5500] rounded-xl">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">FREE EXPRESS DELIVERY</h4>
                <p className="text-xs text-neutral-400">On all domestic orders over $150</p>
              </div>
            </div>

            <div className="p-6 bg-[#18181c] border border-white/5 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-[#ff5500]/10 text-[#ff5500] rounded-xl">
                <RefreshCw size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">30-DAY EASY RETURNS</h4>
                <p className="text-xs text-neutral-400">Hassle-free size exchange policy</p>
              </div>
            </div>

            <div className="p-6 bg-[#18181c] border border-white/5 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-[#ff5500]/10 text-[#ff5500] rounded-xl">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">100% AUTHENTIC GUARANTEE</h4>
                <p className="text-xs text-neutral-400">Directly from Nike Supply Chain</p>
              </div>
            </div>
          </div>

          {/* Extended Nike Product Catalog */}
          <ProductCatalog />

          {/* Newsletter VIP Club */}
          <div className="bg-gradient-to-r from-[#ff5500] to-[#e64d00] rounded-3xl p-8 lg:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full">
                JOIN THE NIKE CLUB
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black tracking-wide">
                GET 15% OFF YOUR FIRST ORDER
              </h3>
              <p className="text-xs sm:text-sm opacity-90 max-w-md">
                Subscribe for exclusive drops, early access to new colorways, and member-only rewards.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for joining the Nike VIP Club!");
              }}
              className="w-full md:w-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                required
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 rounded-xl bg-white text-black text-xs font-semibold placeholder-neutral-500 focus:outline-none w-full sm:w-72"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-black hover:bg-neutral-900 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-colors whitespace-nowrap"
              >
                <span>JOIN NOW</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </main>

        {/* Global Slide-Over Drawers & Modals */}
        <CartDrawer />
        <SearchModal />

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#111113] mt-16 py-12 px-6">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
            <div className="space-y-4">
              <div className="font-display text-3xl font-black text-white">NIKE</div>
              <p className="text-neutral-400 leading-relaxed">
                Bringing inspiration and innovation to every athlete in the world. If you have a body, you are an athlete.
              </p>
              <p className="text-neutral-500 text-[11px]">
                © {new Date().getFullYear()} NIKE, Inc. All Rights Reserved.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-4">PRODUCTS</h4>
              <ul className="space-y-2 text-neutral-400 font-medium">
                <li><a href="#" className="hover:text-[#ff5500]">Air Max 270</a></li>
                <li><a href="#" className="hover:text-[#ff5500]">Air Jordan 1</a></li>
                <li><a href="#" className="hover:text-[#ff5500]">VaporMax Flyknit</a></li>
                <li><a href="#" className="hover:text-[#ff5500]">Dunk Low Retro</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-4">GET HELP</h4>
              <ul className="space-y-2 text-neutral-400 font-medium">
                <li><a href="#" className="hover:text-[#ff5500]">Order Status</a></li>
                <li><a href="#" className="hover:text-[#ff5500]">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-[#ff5500]">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-[#ff5500]">Payment Options</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-4">SOCIAL</h4>
              <ul className="space-y-2 text-neutral-400 font-medium">
                <li><a href="#" className="hover:text-[#ff5500]">Instagram</a></li>
                <li><a href="#" className="hover:text-[#ff5500]">Twitter / X</a></li>
                <li><a href="#" className="hover:text-[#ff5500]">YouTube</a></li>
                <li><a href="#" className="hover:text-[#ff5500]">Facebook</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
