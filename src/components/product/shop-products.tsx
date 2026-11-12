"use client";

import { useMemo, useState } from "react";
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  PackageSearch,
  Check,
} from "lucide-react";

import { ProductCard } from "@/components/product/product-card";
import { CustomSelect } from "@/components/ui/custom-select";
import { categories } from "@/data/mock/categories";
import type { Product } from "@/types/product";

interface ShopProductsProps {
  products: Product[];
}

const sortOptions = [
  { label: "جدیدترین", value: "newest" },
  { label: "ارزان‌ترین", value: "cheapest" },
  { label: "گران‌ترین", value: "expensive" },
  { label: "پرفروش‌ترین", value: "popular" },
];

function FilterContent({
  idPrefix,
  categoryId,
  setCategoryId,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  inStockOnly,
  setInStockOnly,
  onReset,
}: {
  idPrefix: string;
  categoryId: string;
  setCategoryId: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-7">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">دسته‌بندی</h3>

          {categoryId && (
            <button
              type="button"
              onClick={() => setCategoryId("")}
              className="text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
            >
              حذف
            </button>
          )}
        </div>

        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center justify-between text-sm"
            >
              <span
                className={
                  categoryId === category.id
                    ? "font-semibold text-[var(--color-primary)]"
                    : "text-[var(--color-foreground)]"
                }
              >
                {category.name}
              </span>

              <span className="relative flex size-5 shrink-0 items-center justify-center">
  <input
    type="radio"
    name={`${idPrefix}-category`}
    checked={categoryId === category.id}
    onChange={() => setCategoryId(category.id)}
    className="peer absolute inset-0 size-full cursor-pointer opacity-0"
  />

  <span
    className={`flex size-[18px] items-center justify-center rounded-full border transition-all ${
      categoryId === category.id
        ? "border-[var(--color-primary)]"
        : "border-[var(--color-border)]"
    } peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary)] peer-focus-visible:ring-offset-2`}
  >
    {categoryId === category.id && (
      <span className="size-2.5 rounded-full bg-[var(--color-primary)]" />
    )}
  </span>
</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-[var(--color-border)]" />

      <label
        htmlFor={`${idPrefix}-in-stock`}
        className="flex cursor-pointer items-center justify-between"
      >
        <span className="text-sm text-[var(--color-foreground)]">
          فقط محصولات موجود
        </span>

        <span className="relative flex items-center">
          <input
            id={`${idPrefix}-in-stock`}
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => setInStockOnly(event.target.checked)}
            className="peer sr-only"
          />

          <span
            className={`flex size-5 items-center justify-center rounded-[5px] border transition-all ${
              inStockOnly
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                : "border-[var(--color-border)] bg-[var(--color-background)]"
            } peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary)] peer-focus-visible:ring-offset-2`}
          >
            {inStockOnly && (
              <Check size={13} strokeWidth={3} className="text-white" />
            )}
          </span>
        </span>
      </label>

      <button
        type="button"
        onClick={onReset}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] text-xs transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
      >
        <RotateCcw size={14} />
        پاک کردن فیلترها
      </button>
    </div>
  );
}

export function ShopProducts({ products }: ShopProductsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const resetFilters = () => {
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryId) {
      result = result.filter((product) => product.categoryId === categoryId);
    }

    if (minPrice) {
      result = result.filter((product) => product.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter((product) => product.price <= Number(maxPrice));
    }

    if (inStockOnly) {
      result = result.filter((product) =>
        product.variants.some((variant) => variant.stock > 0),
      );
    }

    switch (sortBy) {
      case "cheapest":
        result.sort((a, b) => a.price - b.price);
        break;

      case "expensive":
        result.sort((a, b) => b.price - a.price);
        break;

      case "popular":
        result.sort(
          (a, b) =>
            Number(b.tags.includes("پرفروش")) -
            Number(a.tags.includes("پرفروش")),
        );
        break;

      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }

    return result;
  }, [products, categoryId, minPrice, maxPrice, inStockOnly, sortBy]);

  const activeFiltersCount = [
    categoryId,
    minPrice,
    maxPrice,
    inStockOnly,
  ].filter(Boolean).length;

  return (
    <section>
      <div className="mb-6 flex min-h-14 items-center justify-between border-b border-[var(--color-border)] py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(true)}
            className="flex h-9 items-center gap-2 text-xs transition-colors hover:text-[var(--color-primary)] lg:hidden"
          >
            <SlidersHorizontal size={16} />
            فیلترها
            {activeFiltersCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <span className="text-xs text-[var(--color-muted)]">
            {filteredProducts.length.toLocaleString("fa-IR")} محصول
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-[var(--color-muted)] sm:block">
            مرتب‌سازی:
          </span>

          <CustomSelect
            value={sortBy}
            options={sortOptions}
            onChange={setSortBy}
            className="w-36"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] p-5">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-base font-bold">فیلتر محصولات</h2>
              <SlidersHorizontal
                size={17}
                className="text-[var(--color-muted)]"
              />
            </div>

            <FilterContent
              idPrefix="desktop"
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              onReset={resetFilters}
            />
          </div>
        </aside>

        <div className="min-w-0">
          {activeFiltersCount > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {categoryId && (
                <button
                  onClick={() => setCategoryId("")}
                  className="flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-3 py-2 text-xs"
                >
                  {categories.find((item) => item.id === categoryId)?.name}
                  <X size={12} />
                </button>
              )}

              {minPrice && (
                <button
                  onClick={() => setMinPrice("")}
                  className="flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-3 py-2 text-xs"
                >
                  حداقل {Number(minPrice).toLocaleString("fa-IR")}
                  <X size={12} />
                </button>
              )}

              {maxPrice && (
                <button
                  onClick={() => setMaxPrice("")}
                  className="flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-3 py-2 text-xs"
                >
                  حداکثر {Number(maxPrice).toLocaleString("fa-IR")}
                  <X size={12} />
                </button>
              )}

              {inStockOnly && (
                <button
                  onClick={() => setInStockOnly(false)}
                  className="flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-3 py-2 text-xs"
                >
                  فقط موجود
                  <X size={12} />
                </button>
              )}

              <button
                onClick={resetFilters}
                className="text-xs text-[var(--color-primary)]"
              >
                حذف همه
              </button>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] px-5 text-center">
              <PackageSearch
                size={38}
                strokeWidth={1.3}
                className="mb-4 text-[var(--color-muted)]"
              />
              <h3 className="text-base font-semibold">محصولی پیدا نشد</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                فیلترهای انتخاب‌شده را تغییر دهید.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 text-sm font-medium text-[var(--color-primary)]"
              >
                پاک کردن فیلترها
              </button>
            </div>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            aria-label="بستن فیلترها"
            onClick={() => setShowFilters(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[24px] bg-[var(--color-background)] p-6 animate-in slide-in-from-bottom duration-300">
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-base font-bold">فیلتر محصولات</h2>
              <button
                onClick={() => setShowFilters(false)}
                aria-label="بستن"
                className="flex size-9 items-center justify-center rounded-full bg-[var(--color-surface)]"
              >
                <X size={18} />
              </button>
            </div>

            <FilterContent
              idPrefix="desktop"
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              onReset={resetFilters}
            />

            <button
              onClick={() => setShowFilters(false)}
              className="mt-6 h-12 w-full rounded-[var(--radius-md)] bg-[var(--color-primary)] text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              نمایش {filteredProducts.length} محصول
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
