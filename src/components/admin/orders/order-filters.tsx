
"use client";

import { Search } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";

interface OrderFiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const statusOptions = [
  { label: "همه سفارش‌ها", value: "all" },
  { label: "در انتظار پرداخت", value: "pending" },
  { label: "در حال پردازش", value: "processing" },
  { label: "ارسال شده", value: "shipped" },
  { label: "تحویل شده", value: "delivered" },
  { label: "لغو شده", value: "cancelled" },
];

export function OrderFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: OrderFiltersProps) {
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
          placeholder="جست‌وجوی کد سفارش یا نام مشتری..."
          className="h-11 w-full rounded-lg border border-border bg-background pr-10 pl-4 text-sm outline-none transition focus:border-primary"
        />
      </div>

      <div className="w-full sm:w-56">
        <CustomSelect
          value={status}
          options={statusOptions}
          onChange={onStatusChange}
          placeholder="وضعیت سفارش"
        />
      </div>
    </div>
  );
}
