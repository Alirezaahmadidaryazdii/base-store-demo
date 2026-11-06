"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

interface WishlistStore {
  items: Product[];
  toggleItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (product) => {
        const exists = get().items.some((item) => item.id === product.id);

        set((state) => ({
          items: exists
            ? state.items.filter((item) => item.id !== product.id)
            : [...state.items, product],
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      isInWishlist: (productId) =>
        get().items.some((item) => item.id === productId),

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "parna-wishlist",
      skipHydration: true,
    },
  ),
);