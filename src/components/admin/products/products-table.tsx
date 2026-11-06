"use client";

import Image from "next/image";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";
import { storeConfig } from "@/config/store.config";
import { ProductStatus } from "./product-status";
import { Pencil, Trash2 } from "lucide-react";

interface ProductsTableProps {
  products: Product[];
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onStatusChange: (productId: string, value: boolean) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat(storeConfig.locale).format(price);

export function ProductsTable({
  products,
  categories,
  onEdit,
  onDelete,
  onStatusChange,
}: ProductsTableProps) {
  const getCategoryName = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.name ??
    "بدون دسته‌بندی";

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface px-4 py-16 text-center">
        <p className="font-medium text-foreground">
          محصولی پیدا نشد
        </p>
        <p className="mt-2 text-sm text-muted">
          فیلترها را تغییر دهید یا محصول جدیدی اضافه کنید.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-right text-sm">
          <thead className="border-b border-border bg-background text-muted">
            <tr>
              <th className="px-5 py-4 font-medium">محصول</th>
              <th className="px-5 py-4 font-medium">دسته‌بندی</th>
              <th className="px-5 py-4 font-medium">قیمت</th>
              <th className="px-5 py-4 font-medium">موجودی</th>
              <th className="px-5 py-4 font-medium">وضعیت</th>
              <th className="px-5 py-4 font-medium">عملیات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {products.map((product) => {
              const totalStock = product.variants.reduce(
                (total, variant) => total + variant.stock,
                0
              );

              return (
                <tr
                  key={product.id}
                  className="transition hover:bg-background/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-background">
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-[220px] truncate font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          {product.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {getCategoryName(product.categoryId)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-medium text-foreground">
                      {formatPrice(product.price)} {storeConfig.currency}
                    </div>

                    {product.compareAtPrice && (
                      <div className="mt-1 text-xs text-muted line-through">
                        {formatPrice(product.compareAtPrice)}
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4 text-foreground">
                    {formatPrice(totalStock)} عدد
                  </td>

                  <td className="px-5 py-4">
                    <ProductStatus
                      isActive={product.isActive}
                      onChange={(value) =>
                        onStatusChange(product.id, value)
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        aria-label="ویرایش محصول"
                        className="text-muted transition hover:text-primary"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(product.id)}
                        aria-label="حذف محصول"
                        className="text-muted transition hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}