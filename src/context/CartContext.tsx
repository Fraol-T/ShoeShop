"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  activeCategory: string;
  selectedColor: string;
  selectedSize: string;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, colorName: string, size: string) => void;
  updateQuantity: (id: string, colorName: string, size: string, delta: number) => void;
  clearCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setActiveCategory: (category: string) => void;
  setSelectedColor: (color: string) => void;
  setSelectedSize: (size: string) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("MEN");
  const [selectedColor, setSelectedColor] = useState("orange");
  const [selectedSize, setSelectedSize] = useState("US 9.5");

  // Load initial cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("nike_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      // Ignore fallback
    }
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("nike_cart", JSON.stringify(cart));
    } catch {
      // Ignore fallback
    }
  }, [cart]);

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.colorName === newItem.colorName &&
          item.size === newItem.size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, colorName: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.id === id && item.colorName === colorName && item.size === size)
      )
    );
  };

  const updateQuantity = (
    id: string,
    colorName: string,
    size: string,
    delta: number
  ) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (
            item.id === id &&
            item.colorName === colorName &&
            item.size === size
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        isSearchOpen,
        activeCategory,
        selectedColor,
        selectedSize,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setIsCartOpen,
        setIsSearchOpen,
        setActiveCategory,
        setSelectedColor,
        setSelectedSize,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
