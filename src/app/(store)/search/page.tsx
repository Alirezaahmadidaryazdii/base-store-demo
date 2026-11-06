import Link from "next/link";
import { Suspense } from "react";
import { Search, ArrowRight } from "lucide-react";

import { getProducts } from "@/services/product.service";
import { ProductCard } from "@/components/product/product-card";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <Suspense
      fallback={
        <main className="container min-h-[60vh] py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="h-14 animate-pulse rounded-xl bg-[var(--color-surface)]" />
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-64 animate-pulse rounded-xl bg-[var(--color-surface)]"
                />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <SearchPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SearchPageContent({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const searchQuery = q?.trim() ?? "";

  const products = searchQuery
    ? await getProducts({ search: searchQuery })
    : [];

  return (
    <main className="container min-h-[60vh] py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <Link
            href="/shop"
            className="mb-6 inline-flex items-center gap-2 text-xs text-[var(--color-muted)] transition hover:text-[var(--color-primary)]"
          >
            <ArrowRight size={15} />
            بازگشت به فروشگاه
          </Link>

          <h1 className="text-2xl font-bold md:text-3xl">
            جست‌وجوی محصولات
          </h1>

          <p className="mt-2 text-sm text-[var(--color-muted)]">
            محصول موردنظرت را در فروشگاه PARNA پیدا کن.
          </p>
        </div>

        <form action="/search" method="GET" className="mb-10">
          <div className="flex h-14 items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white px-4 transition focus-within:border-[var(--color-primary)]">
            <Search
              size={20}
              className="shrink-0 text-[var(--color-muted)]"
            />

            <input
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder="نام محصول یا عبارت موردنظر..."
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-muted)]"
            />

            <button
              type="submit"
              className="h-10 shrink-0 rounded-lg bg-[var(--color-primary)] px-5 text-xs font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
            >
              جست‌وجو
            </button>
          </div>
        </form>

        {!searchQuery ? (
          <div className="py-16 text-center">
            <Search
              size={38}
              strokeWidth={1.3}
              className="mx-auto mb-4 text-[var(--color-muted)]"
            />

            <h2 className="font-semibold">دنبال چه محصولی هستی؟</h2>

            <p className="mt-2 text-sm text-[var(--color-muted)]">
              نام محصول یا بخشی از توضیحات آن را وارد کن.
            </p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-base font-semibold">
                نتایج جست‌وجو برای «{searchQuery}»
              </h2>

              <span className="text-xs text-[var(--color-muted)]">
                {products.length.toLocaleString("fa-IR")} محصول
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-[var(--color-border)] bg-white px-5 py-16 text-center">
            <Search
              size={38}
              strokeWidth={1.3}
              className="mx-auto mb-4 text-[var(--color-muted)]"
            />

            <h2 className="text-lg font-bold">محصولی پیدا نشد</h2>

            <p className="mt-3 text-sm text-[var(--color-muted)]">
              محصولی با عبارت «{searchQuery}» پیدا نکردیم.
              عبارت دیگری را امتحان کن.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
            >
              مشاهده همه محصولات
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}