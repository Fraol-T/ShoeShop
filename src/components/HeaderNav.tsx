"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CATEGORIES = ["MEN", "WOMEN", "KIDS", "SALE", "NEW RELEASE"];

export default function HeaderNav() {
  const {
    activeCategory,
    setActiveCategory,
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full z-40 relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left Dark Nav Section (7 Columns on Large Screens) */}
        <div className="lg:col-span-8 flex items-center justify-between px-6 lg:px-10 py-5 bg-[#111113]/90 backdrop-blur-md rounded-t-3xl lg:rounded-tl-3xl lg:rounded-tr-none border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="flex items-center space-x-8">
            {/* Nike Swoosh SVG Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-white"
            >
              <svg
                className="w-16 h-8 fill-current text-white drop-shadow-md"
                viewBox="0 0 24 24"
              >
                <path d="M21.71 4.79c-.58-.33-1.35-.34-1.95-.01l-14.8 8.07c-1.39.76-1.89 2.51-1.13 3.9.76 1.39 2.51 1.89 3.9 1.13l14.8-8.07c.84-.46 1.25-1.42 1.01-2.35-.24-.92-.98-1.61-1.83-1.67zm-14.2 11.23c-.56.31-1.27.1-1.58-.46-.31-.56-.1-1.27.46-1.58l13.11-7.15c.56-.31 1.27-.1 1.58.46.31.56.1 1.27-.46 1.58l-13.11 7.15z" />
              </svg>
            </motion.a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative text-xs tracking-wider uppercase font-bold transition-colors py-1 ${
                      isActive
                        ? "text-white"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {cat}
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff5500]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mobile Hamburger Toggle for Left Section */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#ff5500] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Right Light Nav Section (4 Columns on Large Screens) */}
        <div className="lg:col-span-4 hidden lg:flex items-center justify-between px-8 py-5 bg-white text-neutral-900 rounded-tr-3xl border-b border-neutral-200">
          <div className="flex items-center space-x-6">
            {/* Search Trigger */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-800"
              title="Search Sneakers"
            >
              <Search size={20} className="stroke-[2.2]" />
            </motion.button>

            {/* Cart Trigger with Counter Badge */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-800"
              title="View Shopping Bag"
            >
              <ShoppingBag size={20} className="stroke-[2.2]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 bg-[#ff5500] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Circle Hamburger Menu Icon (matches reference design) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-800 hover:border-neutral-900 transition-colors"
          >
            <div className="flex flex-col space-y-[3.5px] items-center justify-center">
              <span className="w-4 h-[2px] bg-neutral-800 rounded-full" />
              <span className="w-4 h-[2px] bg-neutral-800 rounded-full" />
              <span className="w-4 h-[2px] bg-neutral-800 rounded-full" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#18181c] border-b border-white/10 px-6 py-4 space-y-3"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 text-sm font-bold tracking-wider ${
                  activeCategory === cat ? "text-[#ff5500]" : "text-neutral-300"
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="pt-3 border-t border-white/10 flex items-center justify-around text-white">
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-xs font-semibold py-2"
              >
                <Search size={18} />
                <span>SEARCH</span>
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-xs font-semibold py-2"
              >
                <ShoppingBag size={18} />
                <span>BAG ({cartCount})</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
