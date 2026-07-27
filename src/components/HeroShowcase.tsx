"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown, Globe } from "lucide-react";
import { useCart } from "@/context/CartContext";

const COLOR_IMAGE_MAP: Record<string, string> = {
  orange: "/images/nike_air_max_270_orange.png",
  black: "/images/nike_air_max_270_black.png",
  blue: "/images/nike_air_max_270_blue.png",
};

export default function HeroShowcase() {
  const { selectedColor } = useCart();
  const [lang, setLang] = useState("EN");
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Parallax Tilt state
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const shoeSrc = COLOR_IMAGE_MAP[selectedColor] || COLOR_IMAGE_MAP.orange;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[580px] lg:min-h-[660px] flex flex-col justify-between p-8 lg:p-12 overflow-hidden bg-[#111113] rounded-b-3xl lg:rounded-bl-3xl lg:rounded-br-none border-t border-white/5"
    >
      {/* Background Urban Street Photo & Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/urban_skate_bg.png"
          alt="Urban Skate Background"
          fill
          priority
          className="object-cover object-center opacity-30 grayscale contrast-125 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0d0d0f] via-[#111113]/80 to-[#18181c]/70" />
      </div>

      {/* Layer 1: Background Typography ("NIKE" + "JUST DO IT.") */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-6 lg:px-12 select-none overflow-hidden">
        {/* Giant "NIKE" Fill/Outline Text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.15, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-[140px] sm:text-[200px] md:text-[260px] lg:text-[320px] leading-none tracking-tighter text-white font-extrabold uppercase -ml-2 drop-shadow-2xl"
        >
          NIKE
        </motion.h1>

        {/* "JUST DO IT." Subtext */}
        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 0.85, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl sm:text-6xl md:text-8xl tracking-widest text-white/90 font-bold uppercase -mt-8 sm:-mt-16 md:-mt-24 ml-2"
        >
          JUST DO IT.
        </motion.p>
      </div>

      {/* Layer 2: Foreground Typography ("2018 AIR MAX 270") */}
      <div className="absolute right-6 sm:right-12 bottom-16 sm:bottom-24 z-15 pointer-events-none text-right select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display leading-none tracking-wider text-white"
        >
          <span className="block text-4xl sm:text-6xl md:text-7xl font-bold text-stroke-white opacity-40">
            2018
          </span>
          <span className="block text-5xl sm:text-7xl md:text-8xl font-black text-stroke-thick opacity-30">
            AIR MAX
          </span>
          <span className="block text-6xl sm:text-8xl md:text-9xl font-black text-stroke-thick opacity-25">
            270
          </span>
        </motion.div>
      </div>

      {/* Layer 3: Floating 3D Interactive Shoe Showcase */}
      <div className="relative z-20 flex-1 flex items-center justify-center my-4">
        <motion.div
          animate={{
            rotateY: tilt.x,
            rotateX: tilt.y,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="relative w-full max-w-[560px] h-[340px] sm:h-[420px] md:h-[480px]"
        >
          {/* Subtle Shoe Shadow Glow */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black/60 blur-xl rounded-full scale-y-50" />
          
          <motion.div
            key={selectedColor}
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full h-full relative flex items-center justify-center"
          >
            <Image
              src={shoeSrc}
              alt="Nike Air Max 270 Showcase"
              fill
              priority
              className="object-contain drop-shadow-[0_25px_35px_rgba(255,85,0,0.35)] filter hover:brightness-110 transition-all duration-300 pointer-events-auto cursor-grab active:cursor-grabbing"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Layer 4: Bottom Language Selector (EN ∨) */}
      <div className="relative z-30 flex items-center justify-between pt-4">
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center space-x-2 text-xs font-bold tracking-wider text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl backdrop-blur-md border border-white/10 transition-all"
          >
            <Globe size={14} className="text-[#ff5500]" />
            <span>{lang}</span>
            <ChevronDown size={14} className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
          </button>

          {isLangOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-0 mb-2 w-32 bg-[#18181c] border border-white/10 rounded-xl p-1 shadow-2xl z-50 overflow-hidden"
            >
              {["EN", "FR", "DE", "ES", "JP"].map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setIsLangOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    lang === l ? "bg-[#ff5500] text-white" : "text-neutral-300 hover:bg-white/5"
                  }`}
                >
                  {l} - {l === "EN" ? "English" : l === "FR" ? "Français" : l === "DE" ? "Deutsch" : l === "ES" ? "Español" : "日本語"}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Swipe/Scroll hint */}
        <div className="hidden sm:flex items-center space-x-2 text-[11px] text-neutral-400 font-semibold uppercase tracking-widest">
          <span>AIR BUBBLE TECH</span>
          <div className="w-8 h-[2px] bg-[#ff5500]" />
        </div>
      </div>
    </div>
  );
}
