"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "@/types/product";
import { useWishlistStore } from "@/store/wishlist.store";

interface WishlistButtonProps {
  product: Product;
}

export function WishlistButton({ product }: WishlistButtonProps) {
  const [hydrated, setHydrated] = useState(false);
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isFavorite = useWishlistStore((state) =>
    state.isInWishlist(product.id),
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <button
      type="button"
      aria-label={
        hydrated && isFavorite
          ? "حذف از علاقه‌مندی‌ها"
          : "افزودن به علاقه‌مندی‌ها"
      }
      aria-pressed={hydrated && isFavorite}
      onClick={() => toggleItem(product)}
      className="absolute left-2 top-2 z-10 flex size-7 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)]/95 transition-colors hover:text-[var(--color-primary)]"
    >
      <Heart
        size={15}
        strokeWidth={1.6}
        className={
          hydrated && isFavorite
            ? "fill-[var(--color-primary)] text-[var(--color-primary)]"
            : "text-[var(--color-foreground)]"
        }
      />
    </button>
  );
}