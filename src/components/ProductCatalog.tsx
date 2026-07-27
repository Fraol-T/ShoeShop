"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ShoppingBag, Star, Zap, Eye, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  colorName: string;
  colorHex: string;
  isNew?: boolean;
}

const CATALOG_PRODUCTS: Product[] = [
  {
    id: "air-max-270-orange",
    name: "NIKE AIR MAX 270",
    subtitle: "Hot Orange Air Bubble Edition",
    category: "MEN",
    price: 199,
    rating: 4.9,
    reviewsCount: 342,
    image: "/images/nike_air_max_270_orange.png",
    colorName: "Hot Orange",
    colorHex: "#FF5500",
    isNew: true,
  },
  {
    id: "air-max-270-black",
    name: "NIKE AIR MAX 270",
    subtitle: "Triple Black Stealth Mesh",
    category: "MEN",
    price: 199,
    rating: 4.8,
    reviewsCount: 289,
    image: "/images/nike_air_max_270_black.png",
    colorName: "Triple Black",
    colorHex: "#111111",
  },
  {
    id: "air-jordan-1-chicago",
    name: "AIR JORDAN 1 HIGH OG",
    subtitle: "Heritage Chicago Red/White",
    category: "NEW RELEASE",
    price: 180,
    rating: 5.0,
    reviewsCount: 890,
    image: "/images/nike_air_jordan_1.png",
    colorName: "Chicago Red",
    colorHex: "#D00000",
    isNew: true,
  },
  {
    id: "vapormax-flyknit",
    name: "NIKE AIR VAPORMAX",
    subtitle: "Full-Length Vapor Pods",
    category: "SALE",
    price: 210,
    rating: 4.7,
    reviewsCount: 194,
    image: "/images/nike_vapormax.png",
    colorName: "Neon Flyknit",
    colorHex: "#39FF14",
  },
  {
    id: "dunk-low-panda",
    name: "NIKE DUNK LOW RETRO",
    subtitle: "Monochrome Panda Edition",
    category: "KIDS",
    price: 115,
    rating: 4.9,
    reviewsCount: 1240,
    image: "/images/nike_dunk_low.png",
    colorName: "Panda Black/White",
    colorHex: "#000000",
  },
  {
    id: "air-max-270-blue",
    name: "NIKE AIR MAX 270",
    subtitle: "Hyper Royal Blue Edition",
    category: "WOMEN",
    price: 199,
    rating: 4.8,
    reviewsCount: 156,
    image: "/images/nike_air_max_270_blue.png",
    colorName: "Hyper Blue",
    colorHex: "#0066FF",
  },
];

export default function ProductCatalog() {
  const { activeCategory, setActiveCategory, addToCart, selectedSize } = useCart();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredProducts =
    activeCategory === "ALL"
      ? CATALOG_PRODUCTS
      : CATALOG_PRODUCTS.filter(
          (p) => p.category === activeCategory || activeCategory === "MEN"
        );

  const handleQuickAdd = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      colorName: product.colorName,
      colorHex: product.colorHex,
      size: selectedSize,
      price: product.price,
      image: product.image,
    });

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section className="mt-16 sm:mt-24 space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[#ff5500] font-extrabold text-xs tracking-widest uppercase mb-1">
            <Zap size={16} />
            <span>NIKE INNOVATION LAB</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-wide">
            EXPLORE THE AIR COLLECTION
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {["MEN", "WOMEN", "KIDS", "SALE", "NEW RELEASE"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-extrabold tracking-wider uppercase rounded-xl transition-all ${
                activeCategory === cat
                  ? "bg-[#ff5500] text-white shadow-lg"
                  : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map((product) => {
          const isAdded = addedIds[product.id];
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-[#18181c] border border-white/10 rounded-3xl p-6 flex flex-col justify-between group relative overflow-hidden transition-all shadow-xl hover:border-[#ff5500]/50"
            >
              {/* Badge */}
              {product.isNew && (
                <span className="absolute top-6 left-6 z-10 bg-[#ff5500] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                  NEW RELEASE
                </span>
              )}

              {/* Shoe Render Showcase */}
              <div className="relative h-64 sm:h-72 w-full flex items-center justify-center bg-[#111113] rounded-2xl p-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Details & Specs */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold">
                    <Star size={14} className="fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-neutral-500">({product.reviewsCount})</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <span
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: product.colorHex }}
                    />
                    <span className="text-[11px] text-neutral-400 font-semibold">
                      {product.colorName}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-white leading-tight group-hover:text-[#ff5500] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-400">{product.subtitle}</p>
                </div>

                {/* Price and Add to Bag */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-sm font-bold text-[#ff5500]">$</span>
                    <span className="text-2xl font-black text-white">{product.price}</span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickAdd(product)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md ${
                      isAdded
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-black hover:bg-[#ff5500] hover:text-white"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} />
                        <span>ADDED!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>ADD TO BAG</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Feature Showcase Banner (Air Max 270 Tech Spec) */}
      <div className="bg-gradient-to-r from-[#18181c] via-[#222228] to-[#18181c] rounded-3xl p-8 lg:p-12 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
        <div className="lg:col-span-7 space-y-4 z-10">
          <span className="inline-block px-3 py-1 bg-[#ff5500]/20 text-[#ff5500] text-xs font-extrabold uppercase tracking-widest rounded-full">
            REVOLUTIONARY HEEL TECH
          </span>
          <h3 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-none">
            270 DEGREES OF VISIBLE AIR
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
            Boasting Nike&apos;s biggest heel Air unit yet, the Air Max 270 delivers a super-soft ride that feels as impossible as it looks. Engineered mesh upper provides breathability and structured support where you need it most.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4 text-center">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
              <span className="font-display text-2xl sm:text-3xl font-black text-[#ff5500]">32mm</span>
              <p className="text-[10px] text-neutral-400 font-bold uppercase mt-0.5">Tallest Heel Air Unit</p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
              <span className="font-display text-2xl sm:text-3xl font-black text-white">Dual</span>
              <p className="text-[10px] text-neutral-400 font-bold uppercase mt-0.5">Density Foam Sole</p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
              <span className="font-display text-2xl sm:text-3xl font-black text-white">100%</span>
              <p className="text-[10px] text-neutral-400 font-bold uppercase mt-0.5">Engineered Mesh</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative h-64 sm:h-80 flex items-center justify-center z-10">
          <Image
            src="/images/nike_air_max_270_orange.png"
            alt="Air Max 270 Tech"
            fill
            className="object-contain filter drop-shadow-[0_20px_40px_rgba(255,85,0,0.4)] transform -rotate-12 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}
