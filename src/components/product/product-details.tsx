
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import type { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
}

const formatPrice = (value: number) =>
  `${value.toLocaleString("fa-IR")} تومان`;

export function ProductDetails({ product }: ProductDetailsProps) {
  const addItem = useCartStore((state) => state.addItem);

  const toggleWishlistItem = useWishlistStore(
    (state) => state.toggleItem,
  );

  const isWishlisted = useWishlistStore((state) =>
    state.isInWishlist(product.id),
  );

  const [selectedVariantId, setSelectedVariantId] = useState<
    string | null
  >(
    () =>
      product.variants.find((variant) => variant.stock > 0)?.id ??
      null,
  );

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] =
    useState(false);

  const selectedVariant =
    product.variants.find(
      (variant) => variant.id === selectedVariantId,
    ) ?? null;

  const isAvailable =
    selectedVariant !== null && selectedVariant.stock > 0;

  const price = selectedVariant?.price ?? product.price;

  const hasDiscount =
    selectedVariant !== null &&
    selectedVariant.price === product.price &&
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - price) /
          product.compareAtPrice!) *
          100,
      )
    : 0;

  const handleVariantChange = (variantId: string) => {
    setSelectedVariantId(variantId);
    setQuantity(1);
    setAdded(false);
  };

  const handleQuantityChange = (value: number) => {
    if (!selectedVariant) return;

    setQuantity(
      Math.max(1, Math.min(value, selectedVariant.stock)),
    );

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
    <>
      <section className="flex w-full flex-col pb-[calc(180px+env(safe-area-inset-bottom))] pt-1 lg:pb-0">
        {product.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-(--color-surface) px-3 py-1.5 text-[10px] font-medium text-(--color-muted)"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-xl font-semibold leading-8 text-(--color-foreground) md:text-2xl">
          {product.name}
        </h1>

        {product.description && (
          <div className="mt-3">
            <p
              className={`text-xs leading-7 text-(--color-muted) md:text-sm ${
                descriptionExpanded ? "" : "line-clamp-3"
              }`}
            >
              {product.description}
            </p>

            {product.description.length > 130 && (
              <button
                type="button"
                onClick={() =>
                  setDescriptionExpanded((previous) => !previous)
                }
                className="mt-1 text-xs font-medium text-(--color-primary)"
              >
                {descriptionExpanded ? "بستن توضیحات" : "مشاهده بیشتر"}
              </button>
            )}
          </div>
        )}

        <div className="my-6 border-t border-(--color-border)" />

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xl font-bold text-(--color-primary)">
            {formatPrice(price)}
          </span>

          {hasDiscount && (
            <>
              <span className="text-xs text-(--color-muted) line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>

              <span className="rounded-md bg-(--color-surface) px-2.5 py-1 text-[10px] font-semibold text-(--color-primary)">
                {discountPercentage}٪ تخفیف
              </span>
            </>
          )}
        </div>

        <div className="my-6 border-t border-(--color-border)" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-(--color-foreground)">
              انتخاب رنگ و سایز
            </h2>

            {selectedVariant && (
              <span className="text-[10px] text-(--color-muted)">
                {product.variants.length.toLocaleString("fa-IR")} گزینه
              </span>
            )}
          </div>

          {product.variants.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => {
                const isSelected =
                  selectedVariantId === variant.id;

                const isVariantAvailable = variant.stock > 0;

                return (
                  <button
                    key={variant.id}
                    type="button"
                    disabled={!isVariantAvailable}
                    onClick={() =>
                      handleVariantChange(variant.id)
                    }
                    aria-pressed={isSelected}
                    className={`flex min-w-[76px] flex-col items-center gap-2 rounded-xl border px-3 py-3 transition-all ${
                      isSelected
                        ? "border-(--color-primary) bg-(--color-surface)"
                        : "border-(--color-border) bg-transparent"
                    } ${
                      !isVariantAvailable
                        ? "cursor-not-allowed opacity-40"
                        : "hover:border-(--color-primary)"
                    }`}
                  >
                    {variant.color && (
                      <span className="flex items-center gap-1.5 text-xs">
                        {variant.colorCode && (
                          <span
                            className="size-3.5 rounded-full border border-black/10"
                            style={{
                              backgroundColor: variant.colorCode,
                            }}
                          />
                        )}

                        {variant.color}
                      </span>
                    )}

                    {variant.size && (
                      <span className="text-sm font-semibold text-(--color-foreground)">
                        {variant.size}
                      </span>
                    )}

                    <span
                      className={`text-[10px] ${
                        isVariantAvailable
                          ? "text-green-700"
                          : "text-(--color-muted)"
                      }`}
                    >
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

        <div className="my-6 border-t border-(--color-border)" />

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-(--color-foreground)">
            وضعیت موجودی
          </span>

          <span
            className={`text-xs font-medium ${
              isAvailable
                ? "text-green-700"
                : "text-(--color-muted)"
            }`}
          >
            {isAvailable && selectedVariant
              ? `${selectedVariant.stock.toLocaleString("fa-IR")} عدد موجود`
              : "ناموجود"}
          </span>
        </div>

        {isAvailable && selectedVariant && (
          <div className="mt-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-(--color-foreground)">
                تعداد
              </span>

              <p className="mt-1 text-[10px] text-(--color-muted)">
                حداکثر {selectedVariant.stock.toLocaleString("fa-IR")} عدد
              </p>
            </div>

            <div className="flex h-10 items-center rounded-xl border border-(--color-border)">
              <button
                type="button"
                onClick={() =>
                  handleQuantityChange(quantity - 1)
                }
                disabled={quantity <= 1}
                aria-label="کاهش تعداد"
                className="flex size-10 items-center justify-center text-lg text-(--color-muted) transition-colors hover:text-(--color-primary) disabled:opacity-30"
              >
                −
              </button>

              <span className="min-w-9 text-center text-sm font-semibold tabular-nums">
                {quantity.toLocaleString("fa-IR")}
              </span>

              <button
                type="button"
                onClick={() =>
                  handleQuantityChange(quantity + 1)
                }
                disabled={quantity >= selectedVariant.stock}
                aria-label="افزایش تعداد"
                className="flex size-10 items-center justify-center text-lg text-(--color-muted) transition-colors hover:text-(--color-primary) disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>
        )}

        <div className="mt-7 hidden flex-col gap-3 lg:flex">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className="h-12 w-full rounded-xl bg-(--color-primary) text-sm font-semibold text-white transition-colors hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:bg-(--color-surface) disabled:text-(--color-muted)"
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
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors ${
              isWishlisted
                ? "border-(--color-primary) bg-(--color-surface) text-(--color-primary)"
                : "border-(--color-border) text-(--color-foreground) hover:border-(--color-primary) hover:text-(--color-primary)"
            }`}
          >
            <Heart
              size={18}
              strokeWidth={1.8}
              fill={isWishlisted ? "currentColor" : "none"}
            />

            {isWishlisted
              ? "حذف از علاقه‌مندی‌ها"
              : "افزودن به علاقه‌مندی‌ها"}
          </button>
        </div>

        <div className="mt-6 hidden flex-col gap-3 lg:flex">
          <Link
            href="/cart"
            className="text-center text-xs text-(--color-primary) transition-colors hover:text-(--color-primary-hover)"
          >
            مشاهده سبد خرید
          </Link>

          <Link
            href="/shop"
            className="text-center text-xs text-(--color-muted) transition-colors hover:text-(--color-primary)"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </section>

      {/* Mobile Sticky Purchase Bar */}
      <div className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+96px)] z-[45] rounded-2xl border border-white/60 bg-[var(--color-background)]/90 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label={
              isWishlisted
                ? "حذف از علاقه‌مندی‌ها"
                : "افزودن به علاقه‌مندی‌ها"
            }
            aria-pressed={isWishlisted}
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
              isWishlisted
                ? "border-(--color-primary) bg-(--color-surface) text-(--color-primary)"
                : "border-(--color-border) text-(--color-foreground)"
            }`}
          >
            <Heart
              size={20}
              strokeWidth={1.8}
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </button>

          <div className="min-w-0 flex-1">
            <span className="block text-[10px] text-(--color-muted)">
              قیمت محصول
            </span>

            <span className="mt-0.5 block truncate text-sm font-bold text-(--color-primary)">
              {formatPrice(price)}
            </span>

            {hasDiscount && (
              <span className="block text-[10px] text-(--color-muted) line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className="flex h-11 shrink-0 items-center justify-center rounded-xl bg-(--color-primary) px-4 text-xs font-semibold text-white transition-colors hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:bg-(--color-surface) disabled:text-(--color-muted)"
          >
            {!isAvailable
              ? "ناموجود"
              : added
                ? "اضافه شد ✓"
                : "افزودن به سبد"}
          </button>
        </div>
      </div>
    </>
  );
}
