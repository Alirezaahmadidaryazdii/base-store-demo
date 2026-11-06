
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart.store";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fa-IR").format(price) + " تومان";

const shippingMethods = [
  { id: "post", title: "پست پیشتاز", description: "۳ تا ۵ روز کاری", price: 45000 },
  { id: "courier", title: "پیک موتوری", description: "فقط برای شهرهای تحت پوشش", price: 85000 },
];

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [shippingMethod, setShippingMethod] = useState("post");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    province: "",
    city: "",
    postalCode: "",
    address: "",
    description: "",
  });

  const subtotal = items.reduce(
    (total, item) => total + item.variant.price * item.quantity,
    0
  );

  const selectedShipping =
    shippingMethods.find((method) => method.id === shippingMethod) ??
    shippingMethods[0];

  const shippingCost = selectedShipping.price;
  const total = subtotal + shippingCost;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!items.length) return;

    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <main className="container flex min-h-[65vh] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[var(--shadow-soft)]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl text-green-600">
            ✓
          </div>

          <h1 className="mb-3 text-2xl font-bold">
            سفارش آزمایشی ثبت شد
          </h1>

          <p className="mb-7 text-sm leading-7 text-[var(--color-muted)]">
            این یک ثبت سفارش نمایشی است. هنوز سفارش واقعی، پرداخت یا ارسال
            اطلاعات به سرور انجام نمی‌شود.
          </p>

          <Link
            href="/shop"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--color-primary)] px-8 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </main>
    );
  }

  if (!items.length) {
    return (
      <main className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <div className="mb-5 text-5xl">🛍️</div>

        <h1 className="mb-3 text-2xl font-bold">
          سبد خرید شما خالی است
        </h1>

        <p className="mb-7 text-sm text-[var(--color-muted)]">
          برای ثبت سفارش ابتدا محصولی به سبد خرید اضافه کنید.
        </p>

        <Link
          href="/shop"
          className="rounded-lg bg-[var(--color-primary)] px-8 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
        >
          مشاهده محصولات
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-10 pb-20">
      <div className="mb-9">
        <p className="mb-2 text-xs text-[var(--color-muted)]">
          خانه / سبد خرید / تکمیل سفارش
        </p>

        <h1 className="text-2xl font-bold md:text-3xl">
          تکمیل سفارش
        </h1>

        <p className="mt-2 text-sm text-[var(--color-muted)]">
          اطلاعات ارسال سفارش خود را وارد کنید.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {/* Buyer information */}
            <section className="rounded-xl border border-[var(--color-border)] bg-white p-5 md:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-surface)] text-sm font-semibold">
                  ۱
                </span>
                <h2 className="text-lg font-bold">اطلاعات خریدار</h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    نام
                  </label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    placeholder="نام خود را وارد کنید"
                    className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm outline-none transition focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    نام خانوادگی
                  </label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    placeholder="نام خانوادگی"
                    className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm outline-none transition focus:border-[var(--color-primary)]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    شماره موبایل
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    pattern="09[0-9]{9}"
                    maxLength={11}
                    placeholder="09123456789"
                    className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-left text-sm outline-none transition focus:border-[var(--color-primary)]"
                    dir="ltr"
                  />
                </div>
              </div>
            </section>

            {/* Address */}
            <section className="rounded-xl border border-[var(--color-border)] bg-white p-5 md:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-surface)] text-sm font-semibold">
                  ۲
                </span>
                <h2 className="text-lg font-bold">آدرس تحویل سفارش</h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    استان
                  </label>
                  <input
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    required
                    placeholder="مثلاً قم"
                    className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    شهر
                  </label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    placeholder="نام شهر"
                    className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    آدرس کامل
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="خیابان، کوچه، پلاک و واحد..."
                    className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-sm outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    کد پستی
                  </label>
                  <input
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="۱۰ رقم"
                    className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-left text-sm outline-none focus:border-[var(--color-primary)]"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    توضیحات (اختیاری)
                  </label>
                  <input
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="مثلاً زنگ واحد ۲"
                    className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="rounded-xl border border-[var(--color-border)] bg-white p-5 md:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-surface)] text-sm font-semibold">
                  ۳
                </span>
                <h2 className="text-lg font-bold">روش ارسال</h2>
              </div>

              <div className="space-y-3">
                {shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 transition ${
                      shippingMethod === method.id
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                        : "border-[var(--color-border)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={() => setShippingMethod(method.id)}
                        className="accent-[var(--color-primary)]"
                      />

                      <div>
                        <p className="text-sm font-semibold">
                          {method.title}
                        </p>
                        <p className="mt-1 text-xs text-[var(--color-muted)]">
                          {method.description}
                        </p>
                      </div>
                    </div>

                    <span className="whitespace-nowrap text-sm font-medium">
                      {formatPrice(method.price)}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-xl border border-[var(--color-border)] bg-white p-5 md:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-surface)] text-sm font-semibold">
                  ۴
                </span>
                <h2 className="text-lg font-bold">روش پرداخت</h2>
              </div>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--color-primary)] bg-[var(--color-primary)]/5 p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="accent-[var(--color-primary)]"
                  />
                  <div>
                    <p className="text-sm font-semibold">پرداخت آنلاین</p>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      پرداخت از طریق درگاه بانکی
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--color-border)] p-4">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-[var(--color-primary)]"
                  />
                  <div>
                    <p className="text-sm font-semibold">پرداخت هنگام تحویل</p>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      این روش فعلاً نمایشی است.
                    </p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Order summary */}
          <aside className="h-fit rounded-xl border border-[var(--color-border)] bg-white p-5 md:p-6 lg:sticky lg:top-24">
            <h2 className="mb-5 text-lg font-bold">خلاصه سفارش</h2>

            <div className="mb-5 max-h-72 space-y-4 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="flex items-center gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {item.product.name}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      {item.variant.size && `سایز ${item.variant.size}`}
                      {item.variant.color && ` / ${item.variant.color}`}
                      {" "} | تعداد: {item.quantity}
                    </p>
                  </div>

                  <span className="whitespace-nowrap text-xs font-semibold">
                    {formatPrice(item.variant.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-[var(--color-border)] pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">جمع محصولات</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">هزینه ارسال</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border)] pt-5">
              <span className="font-bold">مبلغ نهایی</span>
              <span className="text-lg font-bold text-[var(--color-primary)]">
                {formatPrice(total)}
              </span>
            </div>

            <button
              type="submit"
              className="mt-6 h-12 w-full rounded-lg bg-[var(--color-primary)] text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
            >
              ثبت سفارش آزمایشی
            </button>

            <p className="mt-4 text-center text-xs leading-6 text-[var(--color-muted)]">
              با ثبت سفارش، قوانین و شرایط خرید را می‌پذیرید.
            </p>

            <Link
              href="/cart"
              className="mt-4 block text-center text-xs text-[var(--color-muted)] transition hover:text-[var(--color-primary)]"
            >
              بازگشت به سبد خرید
            </Link>
          </aside>
        </div>
      </form>
    </main>
  );
}
