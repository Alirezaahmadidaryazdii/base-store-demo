
"use client";

import { Bell, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin": "داشبورد",
  "/admin/products": "مدیریت محصولات",
  "/admin/orders": "مدیریت سفارش‌ها",
  "/admin/customers": "مدیریت مشتریان",
  "/admin/categories": "مدیریت دسته‌بندی‌ها",
  "/admin/settings": "تنظیمات",
};

export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-border/10 bg-background/95 px-6 backdrop-blur">
      <div>
        <h2 className="text-lg font-bold">
          {pageTitles[pathname] ?? "پنل مدیریت"}
        </h2>
        <p className="mt-1 text-xs text-muted">
          به پنل مدیریت فروشگاه پرنا خوش آمدید.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex size-10 items-center justify-center rounded-xl border border-border/10 bg-surface text-muted transition-colors hover:text-primary"
          aria-label="اعلان‌ها"
        >
          <Bell size={19} />
        </button>

        <div className="flex items-center gap-3 border-r border-border/10 pr-4">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserRound size={20} />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">مدیر فروشگاه</p>
            <p className="text-xs text-muted">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
