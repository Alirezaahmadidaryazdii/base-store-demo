"use client";

import type { Category } from "@/types/category";
import { CustomSelect } from "@/components/ui/custom-select";

interface ProductFiltersProps {
  search: string;
  categoryId: string;
  status: "all" | "active" | "inactive";
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: "all" | "active" | "inactive") => void;
}

export function ProductFilters({
  search,
  categoryId,
  status,
  categories,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}: ProductFiltersProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-3">
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="جست‌وجوی نام محصول..."
        className="h-11 rounded-[var(--radius-md)] border border-border bg-background px-4 text-xs outline-none transition focus:border-primary"
      />

      <CustomSelect
        value={categoryId}
        onChange={onCategoryChange}
        placeholder="انتخاب دسته‌بندی"
        options={[
          { label: "همه دسته‌بندی‌ها", value: "all" },
          ...categories.map((category) => ({
            label: category.name,
            value: category.id,
          })),
        ]}
      />

      <CustomSelect
        value={status}
        onChange={(value) =>
          onStatusChange(value as "all" | "active" | "inactive")
        }
        placeholder="انتخاب وضعیت"
        options={[
          { label: "همه وضعیت‌ها", value: "all" },
          { label: "فعال", value: "active" },
          { label: "غیرفعال", value: "inactive" },
        ]}
      />
    </div>
  );
}