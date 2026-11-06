"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist.store";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  return (
    <main className="container py-10 sm:py-14">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-2 text-xs text-[var(--color-muted)]">
            محصولات موردعلاقه شما
          </p>
          <h1 className="text-xl font-semibold text-[var(--color-foreground)] sm:text-2xl">
            لیست علاقه‌مندی‌ها
          </h1>
        </div>

        <span className="text-xs text-[var(--color-muted)]">
          {items.length.toLocaleString("fa-IR")} محصول
        </span>
      </div>

      {items.length === 0 ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-center">
          <Heart
            size={36}
            strokeWidth={1.3}
            className="mb-4 text-[var(--color-muted)]"
          />

          <h2 className="mb-2 text-base font-semibold">
            لیست علاقه‌مندی‌های شما خالی است
          </h2>

          <p className="mb-6 text-sm text-[var(--color-muted)]">
            محصولاتی که دوست دارید را با انتخاب آیکون قلب ذخیره کنید.
          </p>

          <Link
            href="/shop"
            className="flex h-11 items-center gap-2 rounded-md bg-[var(--color-primary)] px-6 text-sm font-medium !text-white transition-colors hover:bg-[var(--color-primary-hover)]"
          >
            <ShoppingBag size={16} />
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]"
            >
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

                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  aria-label={`حذف ${product.name} از علاقه‌مندی‌ها`}
                  className="absolute left-2 top-2 flex size-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)]/95 text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 p-3">
                <div className="min-w-0">
                  <Link
                    href={`/product/${product.slug}`}
                    className="block truncate text-xs font-medium hover:text-[var(--color-primary)]"
                  >
                    {product.name}
                  </Link>

                  <p className="mt-1 text-xs font-semibold text-[var(--color-primary)]">
                    {product.price.toLocaleString("fa-IR")} تومان
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}