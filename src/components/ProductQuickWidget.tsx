"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Share2, Check, ShoppingBag } from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";

const COLOR_VARIANTS = [
  { id: "orange", name: "Orange Air", hex: "#FF5500", image: "/images/nike_air_max_270_orange.png" },
  { id: "black", name: "Triple Black", hex: "#111111", image: "/images/nike_air_max_270_black.png" },
  { id: "blue", name: "Hyper Blue", hex: "#0066FF", image: "/images/nike_air_max_270_blue.png" },
  { id: "grey", name: "Stealth Grey", hex: "#7A8B99", image: "/images/nike_air_max_270_black.png" },
];

const AVAILABLE_SIZES = ["US 7", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11", "US 12"];

export default function ProductQuickWidget() {
  const {
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    addToCart,
  } = useCart();

  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const activeVariant = COLOR_VARIANTS.find((v) => v.id === selectedColor) || COLOR_VARIANTS[0];

  const handleAddToCart = () => {
    addToCart({
      id: "air-max-270",
      name: "NIKE AIR MAX 270",
      colorName: activeVariant.name,
      colorHex: activeVariant.hex,
      size: selectedSize,
      price: 199,
      image: activeVariant.image,
    });

    // Trigger visual feedback & confetti burst
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#ff5500", "#111111", "#ffffff"],
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="relative h-full flex flex-col justify-between p-8 lg:p-10 bg-white text-neutral-900 rounded-b-3xl lg:rounded-tr-3xl lg:rounded-bl-none border-t border-neutral-100 shadow-xl">
      {/* Top Header Label */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-400">
          FEATURED MODEL
        </span>
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-neutral-100 text-[11px] font-bold text-[#ff5500] rounded-full">
          <span>IN STOCK</span>
        </span>
      </div>

      {/* Main Product Quick Card Widget (Matches screenshot layout) */}
      <div className="my-auto py-6">
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 shadow-sm transition-all"
        >
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Left Thumbnail Shoe Image */}
            <div className="col-span-5 relative h-28 sm:h-32 flex items-center justify-center bg-white rounded-xl p-2 border border-neutral-100 shadow-inner">
              <Image
                src={activeVariant.image}
                alt="Air Max 270 Preview"
                fill
                className="object-contain p-1 transform -rotate-12 hover:rotate-0 transition-transform duration-300"
              />
            </div>

            {/* Right Product Details */}
            <div className="col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-neutral-900 leading-none">
                    AIR MAX
                  </h3>
                  <span className="font-display text-3xl font-black text-neutral-900 leading-none block">
                    270
                  </span>
                </div>

                {/* Color Swatch Picker */}
                <div className="grid grid-cols-2 gap-1.5">
                  {COLOR_VARIANTS.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedColor(v.id)}
                      title={v.name}
                      className={`w-3.5 h-3.5 rounded-sm transition-transform ${
                        selectedColor === v.id
                          ? "ring-2 ring-offset-1 ring-neutral-900 scale-110"
                          : "hover:scale-110 opacity-80"
                      }`}
                      style={{ backgroundColor: v.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline space-x-1">
                <span className="text-sm font-bold text-[#ff5500]">$</span>
                <span className="text-2xl font-black text-neutral-900">199</span>
                <span className="text-[11px] text-neutral-400 font-medium ml-2">USD</span>
              </div>

              {/* Size Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsSizeOpen(!isSizeOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-neutral-700 bg-white border border-neutral-300 px-3 py-2 rounded-xl hover:border-neutral-900 transition-colors"
                >
                  <span className="flex items-center space-x-1">
                    <ChevronDown size={14} className={`text-neutral-500 transition-transform ${isSizeOpen ? "rotate-180" : ""}`} />
                    <span>SIZE: {selectedSize}</span>
                  </span>
                </button>

                {/* Size Menu Overlay */}
                <AnimatePresence>
                  {isSizeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-300 rounded-xl p-2 shadow-2xl z-50 grid grid-cols-3 gap-1 max-h-40 overflow-y-auto"
                    >
                      {AVAILABLE_SIZES.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => {
                            setSelectedSize(sz);
                            setIsSizeOpen(false);
                          }}
                          className={`py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                            selectedSize === sz
                              ? "bg-neutral-900 text-white"
                              : "text-neutral-700 hover:bg-neutral-100"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Add to Cart Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md ${
                  addedAnimation
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-900 hover:bg-[#ff5500] text-white"
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check size={16} />
                    <span>ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ADD TO CART</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Controls: Vertical Social Media rotated links & Share button */}
      <div className="flex items-end justify-between pt-4 border-t border-neutral-100">
        {/* Rotated Social Links (matches reference design right side margin) */}
        <div className="flex items-center space-x-6 text-[11px] font-bold text-neutral-400">
          {["Facebook", "Instagram", "Amazon"].map((social) => (
            <a
              key={social}
              href={`#${social.toLowerCase()}`}
              className="hover:text-neutral-900 transition-colors uppercase tracking-wider"
            >
              {social}
            </a>
          ))}
        </div>

        {/* Share Icon */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-colors"
            title="Share Showcase"
          >
            {copiedShare ? <Check size={16} className="text-emerald-500" /> : <Share2 size={16} />}
          </motion.button>
          {copiedShare && (
            <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-neutral-900 text-white text-[10px] rounded whitespace-nowrap">
              Link Copied!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
