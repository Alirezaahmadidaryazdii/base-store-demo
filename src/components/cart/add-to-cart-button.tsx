
"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";

import { useCartStore } from "@/store/cart.store";
import type { Product, ProductVariant } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  variant: ProductVariant | null;
  quantity?: number;
  className?: string;
}

export function AddToCartButton({
  product,
  variant,
  quantity = 1,
  className = "",
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const isAvailable = Boolean(variant && variant.stock > 0);

  const handleAdd = () => {
    if (!variant || variant.stock <= 0 || quantity <= 0) return;

    addItem(product, variant, quantity);
    setAdded(true);

    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!isAvailable}
      className={`flex h-11 items-center justify-center gap-2 rounded-md bg-(--color-primary) px-4 text-xs font-medium text-white transition-colors hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:bg-(--color-surface) disabled:text-(--color-muted) ${className}`}
    >
      {!isAvailable ? (
        "ناموجود"
      ) : added ? (
        <>
          <Check size={15} />
          اضافه شد
        </>
      ) : (
        <>
          <ShoppingCart size={15} />
          افزودن به سبد خرید
        </>
      )}
    </button>
  );
}
