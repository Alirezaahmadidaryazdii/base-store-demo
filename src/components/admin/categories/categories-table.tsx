
"use client";

import Image from "next/image";
import { Pencil, Trash2, Folder } from "lucide-react";

import type { Category } from "@/types/category";
import { CategoryStatus } from "./category-status";

interface CategoriesTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onStatusChange: (id: string, value: boolean) => void;
}

export function CategoriesTable({
  categories,
  onEdit,
  onDelete,
  onStatusChange,
}: CategoriesTableProps) {
  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface py-16 text-center">
        <Folder size={36} className="mb-3 text-muted" />
        <p className="font-medium">دسته‌بندی‌ای پیدا نشد</p>
        <p className="mt-1 text-sm text-muted">
          عبارت جست‌وجو یا فیلتر انتخاب‌شده را تغییر دهید.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-right">
          <thead className="border-b border-border bg-background text-xs text-muted">
            <tr>
              <th className="px-5 py-4 font-medium">دسته‌بندی</th>
              <th className="px-5 py-4 font-medium">شناسه</th>
              <th className="px-5 py-4 font-medium">توضیحات</th>
              <th className="px-5 py-4 font-medium">وضعیت</th>
              <th className="px-5 py-4 text-center font-medium">عملیات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {categories.map((category) => (
              <tr
                key={category.id}
                className="transition hover:bg-background/70"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-background">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <Folder
                          size={20}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-muted"
                        />
                      )}
                    </div>

                    <span className="font-medium">{category.name}</span>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-muted">
                  {category.slug}
                </td>

                <td className="max-w-xs px-5 py-4 text-sm text-muted">
                  <span className="line-clamp-2">
                    {category.description || "بدون توضیحات"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <CategoryStatus
                    isActive={category.isActive}
                    onChange={(value) =>
                      onStatusChange(category.id, value)
                    }
                  />
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(category)}
                      title="ویرایش"
                      className="rounded-lg p-2 text-muted transition hover:bg-primary/10 hover:text-primary"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(category)}
                      title="حذف"
                      className="rounded-lg p-2 text-muted transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
