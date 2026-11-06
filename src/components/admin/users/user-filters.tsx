
"use client";

import { Search, X } from "lucide-react";

import { CustomSelect } from "@/components/ui/custom-select";

interface UserFiltersProps {
  search: string;
  status: string;
  role: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRoleChange: (value: string) => void;
}

const statusOptions = [
  { label: "همه وضعیت‌ها", value: "all" },
  { label: "فعال", value: "active" },
  { label: "غیرفعال", value: "inactive" },
];

const roleOptions = [
  { label: "همه نقش‌ها", value: "all" },
  { label: "مشتری", value: "customer" },
  { label: "مدیر", value: "admin" },
];

export function UserFilters({
  search,
  status,
  role,
  onSearchChange,
  onStatusChange,
  onRoleChange,
}: UserFiltersProps) {
  const hasFilters =
    search.trim() !== "" || status !== "all" || role !== "all";

  const clearFilters = () => {
    onSearchChange("");
    onStatusChange("all");
    onRoleChange("all");
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="جست‌وجو بر اساس نام، ایمیل یا شماره تماس..."
            className="h-11 w-full rounded-lg border border-border bg-background pr-10 pl-4 text-sm outline-none transition placeholder:text-muted focus:border-primary"
          />
        </div>

        <div className="w-full lg:w-44">
          <CustomSelect
            value={status}
            options={statusOptions}
            onChange={onStatusChange}
            placeholder="وضعیت حساب"
          />
        </div>

        <div className="w-full lg:w-44">
          <CustomSelect
            value={role}
            options={roleOptions}
            onChange={onRoleChange}
            placeholder="نقش کاربر"
          />
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm text-muted transition hover:border-red-300 hover:text-red-500"
          >
            <X size={16} />
            پاک کردن فیلترها
          </button>
        )}
      </div>
    </div>
  );
}
