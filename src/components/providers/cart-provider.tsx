
"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { useAuthStore } from "@/store/auth.store";

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
    useAuthStore.persist.rehydrate();
  }, []);

  return children;
}
