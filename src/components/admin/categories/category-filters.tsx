
"use client";

import { Search } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";

interface CategoryFiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const statusOptions = [
  { label: "همه وضعیت‌ها", value: "all" },
  { label: "فعال", value: "active" },
  { label: "غیرفعال", value: "inactive" },
];

export function CategoryFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: CategoryFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="جست‌وجوی نام یا شناسه دسته‌بندی..."
          className="h-11 w-full rounded-lg border border-border bg-background pr-10 pl-4 text-sm outline-none transition focus:border-primary"
        />
      </div>

      <div className="w-full sm:w-48">
        <CustomSelect
          value={status}
          options={statusOptions}
          onChange={onStatusChange}
          placeholder="وضعیت"
        />
      </div>
    </div>
  );
}
