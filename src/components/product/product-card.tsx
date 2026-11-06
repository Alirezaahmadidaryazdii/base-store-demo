
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import type { Product } from "@/types/product";
import { WishlistButton } from "@/components/product/wishlist-heart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount =
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.price) /
          product.compareAtPrice!) *
          100,
      )
    : 0;

  const isAvailable = product.variants.some(
    (variant) => variant.stock > 0,
  );

  return (
    <article className="group min-w-0 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative">
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-square overflow-hidden bg-[var(--color-surface)] sm:aspect-[4/3]"
        >
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        <WishlistButton product={product} />

        {hasDiscount && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-[var(--color-primary)] px-2.5 py-1 text-[10px] font-semibold text-white sm:right-3 sm:top-3 sm:text-xs">
            {discountPercentage}٪ تخفیف
          </span>
        )}
      </div>

      <div className="flex min-h-[150px] flex-col justify-between gap-3 p-3 sm:min-h-[125px] sm:gap-3.5 sm:p-3.5 md:p-4">
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 min-h-10 text-xs font-medium leading-5 text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)] sm:text-sm sm:leading-6"
        >
          {product.name}
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="whitespace-nowrap text-sm font-bold text-[var(--color-primary)] sm:text-base">
              {product.price.toLocaleString("fa-IR")}
              <span className="mr-1 text-[10px] font-normal text-[var(--color-muted)] sm:text-xs">
                تومان
              </span>
            </span>

            {hasDiscount && (
              <span className="text-[10px] text-[var(--color-muted)] line-through sm:text-xs">
                {product.compareAtPrice!.toLocaleString("fa-IR")}
              </span>
            )}
          </div>

          {isAvailable ? (
            <Link
              href={`/product/${product.slug}`}
              aria-label={`مشاهده و انتخاب ${product.name}`}
              className="flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-3 text-[11px] font-medium !text-white transition-all duration-200 hover:bg-[var(--color-primary-hover)] sm:h-10 sm:w-auto sm:px-4 sm:text-xs"
            >
              <ShoppingCart size={15} strokeWidth={1.8} />
              مشاهده
            </Link>
          ) : (
            <span
              aria-label="محصول ناموجود است"
              className="flex h-9 w-full shrink-0 cursor-not-allowed items-center justify-center gap-1.5 rounded-lg bg-[var(--color-surface)] px-3 text-[11px] font-medium text-[var(--color-muted)] sm:h-10 sm:w-auto sm:px-4 sm:text-xs"
            >
              <ShoppingCart size={15} strokeWidth={1.8} />
              ناموجود
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
