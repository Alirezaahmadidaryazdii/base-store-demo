
"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCartStore } from "@/store/cart.store";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  compact?: boolean;
}

export function CartItem({ item, compact = false }: CartItemProps) {
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const formatPrice = (price: number) =>
    `${price.toLocaleString("fa-IR")} تومان`;

  return (
    <article className={`flex gap-3 ${compact ? "py-3" : "p-3 sm:gap-5 sm:p-5"}`}>
      <Link
        href={`/product/${item.product.slug}`}
        className={`relative shrink-0 overflow-hidden rounded-md bg-(--color-surface) ${
          compact ? "size-20" : "size-24 sm:size-28"
        }`}
      >
        <Image
          src={item.product.thumbnail}
          alt={item.product.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/product/${item.product.slug}`}
              className="line-clamp-2 text-xs font-medium text-(--color-foreground) transition-colors hover:text-(--color-primary) sm:text-sm"
            >
              {item.product.name}
            </Link>

            <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-(--color-muted)">
              {item.variant.color && <span>رنگ: {item.variant.color}</span>}
              {item.variant.size && <span>سایز: {item.variant.size}</span>}
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              removeItem(item.product.id, item.variant.id)
            }
            aria-label={`حذف ${item.product.name}`}
            className="shrink-0 rounded-md p-1.5 text-(--color-muted) transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-2">
          <div className="flex h-8 items-center rounded-md border border-(--color-border)">
            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.variant.id,
                  item.quantity - 1
                )
              }
              disabled={item.quantity <= 1}
              aria-label="کاهش تعداد"
              className="flex size-8 items-center justify-center text-(--color-muted) transition-colors hover:text-(--color-primary) disabled:opacity-30"
            >
              <Minus size={13} />
            </button>

            <span className="min-w-7 text-center text-xs font-medium">
              {item.quantity.toLocaleString("fa-IR")}
            </span>

            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.variant.id,
                  item.quantity + 1
                )
              }
              disabled={item.quantity >= item.variant.stock}
              aria-label="افزایش تعداد"
              className="flex size-8 items-center justify-center text-(--color-muted) transition-colors hover:text-(--color-primary) disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Plus size={13} />
            </button>
          </div>

          <div className="text-left">
            <p className="text-xs font-semibold text-(--color-primary) sm:text-sm">
              {formatPrice(item.variant.price * item.quantity)}
            </p>

            {item.quantity > 1 && (
              <p className="mt-1 text-[10px] text-(--color-muted)">
                هر عدد: {formatPrice(item.variant.price)}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
