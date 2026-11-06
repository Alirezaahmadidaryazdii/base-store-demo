
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, ProductVariant } from "@/types/product";
import type { CartItem } from "@/types/cart";

interface CartStore {
  items: CartItem[];
  addItem: (
    product: Product,
    variant: ProductVariant,
    quantity?: number
  ) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant, quantity = 1) => {
        if (variant.stock <= 0 || quantity <= 0) return;

        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.variant.id === variant.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) => {
                if (
                  item.product.id === product.id &&
                  item.variant.id === variant.id
                ) {
                  return {
                    ...item,
                    quantity: Math.min(
                      item.quantity + quantity,
                      variant.stock
                    ),
                  };
                }

                return item;
              }),
            };
          }

          return {
            items: [
              ...state.items,
              { product, variant, quantity: Math.min(quantity, variant.stock) },
            ],
          };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.variant.id === variantId
              )
          ),
        }));
      },

      updateQuantity: (productId, variantId, quantity) => {
        set((state) => ({
          items: state.items
            .map((item) => {
              if (
                item.product.id === productId &&
                item.variant.id === variantId
              ) {
                return {
                  ...item,
                  quantity: Math.min(quantity, item.variant.stock),
                };
              }

              return item;
            })
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce(
          (total, item) => total + item.variant.price * item.quantity,
          0
        ),
    }),
    {
      name: "parna-cart",
      skipHydration: true,
    }
  )
);
