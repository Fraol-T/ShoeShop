"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const PRODUCTS = [
  {
    id: "air-max-270-orange",
    name: "NIKE AIR MAX 270",
    colorName: "Orange Air",
    colorHex: "#FF5500",
    category: "MEN",
    price: 199,
    image: "/images/nike_air_max_270_orange.png",
  },
  {
    id: "air-max-270-black",
    name: "NIKE AIR MAX 270",
    colorName: "Triple Black",
    colorHex: "#111111",
    category: "MEN",
    price: 199,
    image: "/images/nike_air_max_270_black.png",
  },
  {
    id: "air-jordan-1",
    name: "AIR JORDAN 1 HIGH OG",
    colorName: "Chicago Red",
    colorHex: "#D00000",
    category: "NEW RELEASE",
    price: 180,
    image: "/images/nike_air_jordan_1.png",
  },
  {
    id: "vapormax",
    name: "NIKE AIR VAPORMAX",
    colorName: "Neon Flyknit",
    colorHex: "#39FF14",
    category: "SALE",
    price: 210,
    image: "/images/nike_vapormax.png",
  },
  {
    id: "dunk-low",
    name: "NIKE DUNK LOW RETRO",
    colorName: "Panda Black/White",
    colorHex: "#000000",
    category: "KIDS",
    price: 115,
    image: "/images/nike_dunk_low.png",
  },
];

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart, selectedSize } = useCart();
  const [query, setQuery] = useState("");

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.colorName.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4 pt-16 sm:pt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-[#18181c] text-white rounded-3xl border border-white/10 p-6 shadow-2xl z-10 overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center border-b border-white/10 pb-4">
              <Search size={22} className="text-[#ff5500] mr-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search Nike models, colorways, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-lg font-medium text-white placeholder-neutral-500 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-neutral-400 hover:text-white p-1"
                >
                  <X size={18} />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="ml-3 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Suggestions */}
            {!query && (
              <div className="py-4">
                <p className="text-xs font-bold text-neutral-400 tracking-wider uppercase mb-2">
                  POPULAR SEARCHES
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Air Max 270", "Jordan 1", "VaporMax", "Dunk Low", "Orange", "Black"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1 bg-white/5 hover:bg-[#ff5500] hover:text-white text-neutral-300 text-xs font-semibold rounded-full border border-white/10 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results Grid */}
            <div className="mt-4 max-h-96 overflow-y-auto space-y-3 pr-1">
              {filteredProducts.length === 0 ? (
                <p className="text-center py-8 text-neutral-400 text-xs font-medium">
                  No sneakers found matching &quot;{query}&quot;.
                </p>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white/5 rounded-xl p-2 flex items-center justify-center relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-1 transform -rotate-12 group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-bold text-white leading-tight">
                          {product.name}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-neutral-400">
                          <span>{product.colorName}</span>
                          <span>•</span>
                          <span className="text-[#ff5500] font-bold">${product.price}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          colorName: product.colorName,
                          colorHex: product.colorHex,
                          size: selectedSize,
                          price: product.price,
                          image: product.image,
                        });
                        setIsSearchOpen(false);
                      }}
                      className="px-4 py-2 bg-[#ff5500] hover:bg-[#e64d00] text-white text-xs font-extrabold uppercase rounded-xl flex items-center space-x-1 shadow-md transition-all"
                    >
                      <ShoppingBag size={14} />
                      <span>ADD</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
