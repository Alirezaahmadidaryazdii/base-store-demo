
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";

interface CartSummaryProps {
  totalItems: number;
  subtotal: number;
  compact?: boolean;
}

export function CartSummary({
  totalItems,
  subtotal,
  compact = false,
}: CartSummaryProps) {
  const [discountCode, setDiscountCode] = useState("");
  const [message, setMessage] = useState("");

  const formatPrice = (price: number) =>
    `${price.toLocaleString("fa-IR")} تومان`;

  const handleDiscount = () => {
    if (!discountCode.trim()) {
      setMessage("لطفاً کد تخفیف را وارد کنید.");
      return;
    }

    setMessage("اعتبارسنجی کد تخفیف هنوز فعال نیست.");
  };

  return (
    <aside className="rounded-lg border border-(--color-border) bg-(--color-background) p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-(--color-foreground)">
        خلاصه سفارش
      </h2>

      <div className="my-4 space-y-3">
        <div className="flex justify-between text-xs text-(--color-muted)">
          <span>تعداد کالا</span>
          <span>{totalItems.toLocaleString("fa-IR")} عدد</span>
        </div>

        <div className="flex justify-between text-xs text-(--color-muted)">
          <span>جمع محصولات</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>

      <div className="border-t border-(--color-border) pt-4">
        <div className="mb-3 flex items-center gap-2">
          <Tag size={15} className="text-(--color-primary)" />
          <h3 className="text-xs font-semibold text-(--color-foreground)">
            کد تخفیف دارید؟
          </h3>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={discountCode}
            onChange={(event) => {
              setDiscountCode(event.target.value);
              setMessage("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleDiscount();
            }}
            placeholder="کد تخفیف را وارد کنید"
            dir="ltr"
            className="h-10 min-w-0 flex-1 rounded-md border border-(--color-border) bg-transparent px-3 text-left text-xs text-(--color-foreground) outline-none transition-colors placeholder:text-(--color-muted) focus:border-(--color-primary)"
          />

          <button
            type="button"
            onClick={handleDiscount}
            className="h-10 shrink-0 rounded-md border border-(--color-primary) px-3 text-xs font-medium text-(--color-primary) transition-colors hover:bg-(--color-primary) hover:text-white"
          >
            اعمال
          </button>
        </div>

        {message && (
          <p className="mt-2 text-[10px] leading-5 text-red-600">
            {message}
          </p>
        )}
      </div>

      <div className="my-4 border-t border-(--color-border) pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-(--color-foreground)">
            مبلغ قابل پرداخت
          </span>

          <span className="text-sm font-bold text-(--color-primary)">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-(--color-primary) text-xs font-medium text-white transition-colors hover:bg-(--color-primary-hover)"
      >
        ادامه و تسویه‌حساب
        <ArrowLeft size={15} />
      </Link>

      {!compact && (
        <p className="mt-3 text-center text-[10px] leading-5 text-(--color-muted)">
          هزینه ارسال در مرحله بعد محاسبه می‌شود.
        </p>
      )}
    </aside>
  );
}
