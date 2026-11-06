
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, X, ArrowLeft } from "lucide-react";

import { useCartStore } from "@/store/cart.store";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.variant.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="باز کردن سبد خرید"
        className="relative flex size-10 items-center justify-center text-(--color-foreground) transition-colors hover:text-(--color-primary)"
      >
        <ShoppingBag size={21} strokeWidth={1.6} />

        {totalItems > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex size-[17px] items-center justify-center rounded-full bg-(--color-primary) text-[9px] font-medium text-white">
            {totalItems > 99 ? "۹۹+" : totalItems.toLocaleString("fa-IR")}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="بستن سبد خرید"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <aside
            role="dialog"
            aria-modal="true"
            aria-label="سبد خرید"
            className="absolute left-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-(--color-background) shadow-2xl"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-(--color-border) px-5">
              <div>
                <h2 className="text-sm font-semibold text-(--color-foreground)">
                  سبد خرید
                </h2>
                <p className="text-[10px] text-(--color-muted)">
                  {totalItems.toLocaleString("fa-IR")} کالا
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="بستن"
                className="flex size-9 items-center justify-center rounded-md text-(--color-muted) transition-colors hover:bg-(--color-surface) hover:text-(--color-foreground)"
              >
                <X size={19} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <ShoppingBag
                  size={38}
                  strokeWidth={1.3}
                  className="mb-4 text-(--color-muted)"
                />

                <p className="text-sm font-medium text-(--color-foreground)">
                  سبد خرید خالی است
                </p>

                <p className="mt-2 text-xs text-(--color-muted)">
                  هنوز محصولی به سبد خرید اضافه نکرده‌اید.
                </p>

                <Link
                  href="/shop"
                  onClick={() => setIsOpen(false)}
                  className="mt-5 flex h-10 items-center gap-2 rounded-md bg-(--color-primary) px-5 text-xs font-medium text-white"
                >
                  مشاهده محصولات
                  <ArrowLeft size={14} />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5">
                  {items.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.variant.id}`}
                      className={
                        index !== items.length - 1
                          ? "border-b border-(--color-border)"
                          : ""
                      }
                    >
                      <CartItem item={item} compact />
                    </div>
                  ))}
                </div>

                <div className="shrink-0 border-t border-(--color-border) p-4">
                  <CartSummary
                    totalItems={totalItems}
                    subtotal={subtotal}
                    compact
                  />

                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="mt-3 block text-center text-xs text-(--color-muted) transition-colors hover:text-(--color-primary)"
                  >
                    مشاهده سبد خرید کامل
                  </Link>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
