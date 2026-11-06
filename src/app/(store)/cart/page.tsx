
"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

import { useCartStore } from "@/store/cart.store";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.variant.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="container flex min-h-[60vh] items-center justify-center py-12">
        <div className="flex max-w-sm flex-col items-center text-center">
          <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-(--color-surface)">
            <ShoppingBag
              size={32}
              strokeWidth={1.3}
              className="text-(--color-muted)"
            />
          </div>

          <h1 className="text-xl font-semibold text-(--color-foreground)">
            سبد خرید شما خالی است
          </h1>

          <p className="mt-2 text-sm leading-7 text-(--color-muted)">
            هنوز محصولی به سبد خرید اضافه نکرده‌اید.
          </p>

          <Link
            href="/shop"
            className="mt-6 flex h-11 items-center gap-2 rounded-md bg-(--color-primary) px-6 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover)"
          >
            مشاهده محصولات
            <ArrowLeft size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-(--color-foreground) md:text-2xl">
              سبد خرید
            </h1>

            <p className="mt-1 text-xs text-(--color-muted)">
              {totalItems.toLocaleString("fa-IR")} کالا در سبد خرید
            </p>
          </div>

          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-xs text-(--color-muted) transition-colors hover:text-(--color-primary)"
          >
            ادامه خرید
            <ArrowLeft size={14} />
          </Link>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_300px]">
          {/* Cart Items */}
          <section className="overflow-hidden rounded-lg border border-(--color-border) bg-(--color-background)">
            {items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.variant.id}`}
                className={
                  index !== items.length - 1
                    ? "border-b border-(--color-border)"
                    : ""
                }
              >
                <CartItem item={item} />
              </div>
            ))}
          </section>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24">
            <CartSummary
              totalItems={totalItems}
              subtotal={subtotal}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
