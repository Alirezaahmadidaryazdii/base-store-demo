
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import type { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlistItem = useWishlistStore((state) => state.toggleItem);
  const isWishlisted = useWishlistStore((state) =>
    state.isInWishlist(product.id)
  );

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    () => product.variants.find((variant) => variant.stock > 0)?.id ?? null
  );

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) ??
    null;

  const isAvailable = selectedVariant !== null && selectedVariant.stock > 0;

  const price = selectedVariant?.price ?? product.price;

  const hasDiscount =
    selectedVariant !== null &&
    selectedVariant.price === product.price &&
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - price) / product.compareAtPrice!) * 100
      )
    : 0;

  const formatPrice = (value: number) =>
    `${value.toLocaleString("fa-IR")} تومان`;

  const handleVariantChange = (variantId: string) => {
    setSelectedVariantId(variantId);
    setQuantity(1);
    setAdded(false);
  };

  const handleAddToCart = () => {
    if (!selectedVariant || selectedVariant.stock <= 0) return;

    addItem(product, selectedVariant, quantity);
    setAdded(true);
  };

  const handleWishlistToggle = () => {
    toggleWishlistItem(product);
  };

  return (
    <section className="flex w-full flex-col pt-1">
      {product.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-(--color-surface) px-2.5 py-1 text-[10px] text-(--color-muted)"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h1 className="text-xl font-semibold leading-8 text-(--color-foreground) md:text-2xl">
        {product.name}
      </h1>

      <p className="mt-2 text-xs leading-6 text-(--color-muted) md:text-sm">
        {product.description}
      </p>

      <div className="my-5 border-t border-(--color-border)" />

      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-xl font-bold text-(--color-primary)">
          {formatPrice(price)}
        </span>

        {hasDiscount && (
          <>
            <span className="text-xs text-(--color-muted) line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>

            <span className="rounded bg-(--color-surface) px-2 py-1 text-[10px] text-(--color-primary)">
              {discountPercentage}٪ تخفیف
            </span>
          </>
        )}
      </div>

      <div className="my-5 border-t border-(--color-border)" />

      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-(--color-foreground)">
          انتخاب سایز و رنگ
        </h2>

        {product.variants.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => {
              const isSelected = selectedVariantId === variant.id;
              const isVariantAvailable = variant.stock > 0;

              return (
                <button
                  key={variant.id}
                  type="button"
                  disabled={!isVariantAvailable}
                  onClick={() => handleVariantChange(variant.id)}
                  aria-pressed={isSelected}
                  className={`flex min-w-14 flex-col items-center gap-1 rounded-md border px-3 py-2 transition-colors ${
                    isSelected
                      ? "border-(--color-primary) bg-(--color-surface)"
                      : "border-(--color-border)"
                  } ${
                    !isVariantAvailable
                      ? "cursor-not-allowed opacity-40"
                      : "hover:border-(--color-primary)"
                  }`}
                >
                  {variant.color && (
                    <span className="flex items-center gap-1.5 text-[10px]">
                      {variant.colorCode && (
                        <span
                          className="size-3 rounded-full border border-black/10"
                          style={{
                            backgroundColor: variant.colorCode,
                          }}
                        />
                      )}
                      {variant.color}
                    </span>
                  )}

                  {variant.size && (
                    <span className="text-xs font-medium">
                      {variant.size}
                    </span>
                  )}

                  <span className="text-[9px] text-(--color-muted)">
                    {isVariantAvailable ? "موجود" : "ناموجود"}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-(--color-muted)">
            تنوعی برای این محصول ثبت نشده است.
          </p>
        )}
      </div>

      <div className="my-5 border-t border-(--color-border)" />

      <p
        className={`text-xs ${
          isAvailable ? "text-green-700" : "text-(--color-muted)"
        }`}
      >
        {isAvailable && selectedVariant
          ? `${selectedVariant.stock.toLocaleString("fa-IR")} عدد موجود در انبار`
          : "این محصول ناموجود است"}
      </p>

      {selectedVariant && selectedVariant.stock > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-(--color-foreground)">تعداد</span>

          <div className="flex h-9 items-center rounded-md border border-(--color-border)">
            <button
              type="button"
              onClick={() =>
                setQuantity((current) => Math.max(1, current - 1))
              }
              disabled={quantity <= 1}
              aria-label="کاهش تعداد"
              className="flex size-9 items-center justify-center text-(--color-muted) hover:text-(--color-primary) disabled:opacity-30"
            >
              −
            </button>

            <span className="min-w-8 text-center text-xs font-medium">
              {quantity.toLocaleString("fa-IR")}
            </span>

            <button
              type="button"
              onClick={() =>
                setQuantity((current) =>
                  Math.min(current + 1, selectedVariant.stock)
                )
              }
              disabled={quantity >= selectedVariant.stock}
              aria-label="افزایش تعداد"
              className="flex size-9 items-center justify-center text-(--color-muted) hover:text-(--color-primary) disabled:opacity-30"
            >
              +
            </button>
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className="h-11 w-full rounded-md bg-(--color-primary) text-xs font-medium text-white transition-colors hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:bg-(--color-surface) disabled:text-(--color-muted)"
        >
          {!isAvailable
            ? "ناموجود"
            : added
              ? "به سبد خرید اضافه شد ✓"
              : "افزودن به سبد خرید"}
        </button>

        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-pressed={isWishlisted}
          className={`flex h-11 w-full items-center justify-center gap-2 rounded-md border text-xs font-medium transition-colors ${
            isWishlisted
              ? "border-(--color-primary) bg-(--color-surface) text-(--color-primary)"
              : "border-(--color-border) text-(--color-foreground) hover:border-(--color-primary) hover:text-(--color-primary)"
          }`}
        >
          <Heart
            size={17}
            strokeWidth={1.8}
            fill={isWishlisted ? "currentColor" : "none"}
          />
          {isWishlisted
            ? "حذف از علاقه‌مندی‌ها"
            : "افزودن به علاقه‌مندی‌ها"}
        </button>
      </div>

      <Link
        href="/cart"
        className="mt-4 text-center text-xs text-(--color-primary) transition-colors hover:text-(--color-primary-hover)"
      >
        مشاهده سبد خرید
      </Link>

      <Link
        href="/shop"
        className="mt-3 text-center text-xs text-(--color-muted) transition-colors hover:text-(--color-primary)"
      >
        بازگشت به فروشگاه
      </Link>
    </section>
  );
}
