
import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";
import { WishlistButton } from "@/components/product/wishlist-heart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const compareAtPrice = product.compareAtPrice;

  const hasDiscount =
    compareAtPrice !== undefined &&
    compareAtPrice > product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((compareAtPrice - product.price) / compareAtPrice) * 100,
      )
    : 0;

  const isAvailable = product.variants.some(
    (variant) => variant.stock > 0,
  );

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.04]">
      <div className="relative">
        <Link
          href={`/product/${product.slug}`}
          aria-label={`مشاهده ${product.name}`}
          className="relative block aspect-[4/5] overflow-hidden bg-[var(--color-surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </Link>

        <div className="absolute left-2.5 top-2.5 z-20 sm:left-3 sm:top-3">
          <WishlistButton product={product} />
        </div>

        {hasDiscount && (
          <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-[var(--color-primary)] px-2.5 py-1 text-[10px] font-semibold text-white sm:right-3 sm:top-3 sm:text-xs">
            {discountPercentage}٪ تخفیف
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-3.5 md:p-4">
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 min-h-10 text-xs font-medium leading-5 text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)] sm:text-sm sm:leading-6"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex min-h-10 items-end justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="whitespace-nowrap text-sm font-bold text-[var(--color-primary)] sm:text-base">
              {product.price.toLocaleString("fa-IR")}
              <span className="mr-1 text-[10px] font-normal text-[var(--color-muted)] sm:text-xs">
                تومان
              </span>
            </span>

            {hasDiscount && (
              <span className="text-[10px] text-[var(--color-muted)] line-through sm:text-xs">
                {compareAtPrice.toLocaleString("fa-IR")}
              </span>
            )}
          </div>

          {!isAvailable && (
            <span className="shrink-0 rounded-md bg-[var(--color-surface)] px-2 py-1 text-[10px] font-medium text-[var(--color-muted)] sm:text-xs">
              ناموجود
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
