
"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

interface ProductSliderProps {
  products: Product[];
}

export function ProductSlider({ products }: ProductSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "next" | "prev") => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const amount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  if (products.length === 0) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-[var(--color-foreground)]/60">
          محصولی برای نمایش وجود ندارد.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        dir="ltr"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide sm:gap-6"
      >
        {products.map((product) => (
          <div
            key={product.id}
            dir="rtl"
            className="w-[calc((100%-16px)/2)] shrink-0 snap-start sm:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {products.length > 2 && (
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => scroll("prev")}
            aria-label="محصولات قبلی"
            className="flex h-10 w-10 items-center bg-white justify-center rounded-full border border-[var(--color-border)] text-[var(--color-foreground)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
          >
            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            onClick={() => scroll("next")}
            aria-label="محصولات بعدی"
            className="flex h-10 w-10 items-center bg-white justify-center rounded-full border border-[var(--color-border)] text-[var(--color-foreground)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
