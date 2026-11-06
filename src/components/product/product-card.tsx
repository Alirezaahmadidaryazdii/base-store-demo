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
    <article className="group min-w-0 overflow-hidden rounded-lg border border-[var(--color-border)] bg-white transition-shadow duration-300 hover:shadow-md">
      <div className="relative">
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-[3/2] overflow-hidden bg-[var(--color-surface)]"
        >
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        <WishlistButton product={product} />

        {hasDiscount && (
          <span className="absolute right-2 top-2 rounded-full bg-[var(--color-primary)] px-2 py-1 text-[9px] font-medium text-white">
            {discountPercentage}٪
          </span>
        )}
      </div>

      <div className="flex min-h-[54px] items-center justify-between gap-2 px-2 py-2 sm:px-2.5">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
          <Link
            href={`/product/${product.slug}`}
            className="w-full truncate text-[10px] font-medium text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)] sm:text-[11px]"
          >
            {product.name}
          </Link>

          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
            <span className="text-[10px] font-semibold text-[var(--color-primary)] sm:text-[11px]">
              {product.price.toLocaleString("fa-IR")}
              <span className="mr-1 text-[9px] font-normal text-[var(--color-muted)]">
                تومان
              </span>
            </span>

            {hasDiscount && (
              <span className="text-[9px] text-[var(--color-muted)] line-through">
                {product.compareAtPrice!.toLocaleString("fa-IR")}
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/product/${product.slug}`}
          aria-label={`مشاهده و انتخاب ${product.name}`}
          aria-disabled={!isAvailable}
          tabIndex={isAvailable ? 0 : -1}
          className={`flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 text-[10px] font-medium transition-all duration-200 sm:h-9 sm:px-3.5 sm:text-xs ${
            isAvailable
              ? "bg-[var(--color-primary)] !text-white hover:bg-[var(--color-primary-hover)]"
              : "cursor-not-allowed bg-[var(--color-surface)] !text-[var(--color-muted)]"
          }`}
        >
          <ShoppingCart size={13} strokeWidth={1.8} />
          {isAvailable ? "مشاهده" : "ناموجود"}
        </Link>
      </div>
    </article>
  );
}