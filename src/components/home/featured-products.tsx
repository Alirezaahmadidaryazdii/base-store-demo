
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getFeaturedProducts } from "@/services/product.service";
import { ProductSlider } from "../product/product-slider";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-12">
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <div>

          <h2 className="mt-3 text-2xl font-bold text-[var(--color-foreground)] sm:text-3xl">
            محصولات منتخب
          </h2>

          <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
            انتخاب‌هایی خاص برای تکمیل استایل شما
          </p>
        </div>

        <Link
          href="/shop"
          className="group flex shrink-0 items-center gap-2 pb-1 text-xs font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-hover)] sm:text-sm"
        >
          مشاهده همه
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
        </Link>
      </div>

      <ProductSlider products={products} />
    </section>
  );
}
