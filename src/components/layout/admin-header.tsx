
"use client";

import { Bell, UserRound, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin": "داشبورد",
  "/admin/products": "مدیریت محصولات",
  "/admin/orders": "مدیریت سفارش‌ها",
  "/admin/customers": "مدیریت مشتریان",
  "/admin/categories": "مدیریت دسته‌بندی‌ها",
  "/admin/settings": "تنظیمات",
};

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-[68px] items-center justify-between border-b border-border/10 bg-background/95 px-3 backdrop-blur sm:h-[76px] sm:px-6">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="باز کردن منوی مدیریت"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/10 bg-surface text-muted transition-colors hover:text-primary lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-base font-bold sm:text-lg">
            {pageTitles[pathname] ?? "پنل مدیریت"}
          </h2>

          <p className="mt-1 hidden text-xs text-muted sm:block">
            به پنل مدیریت فروشگاه پرنا خوش آمدید.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="اعلان‌ها"
          className="relative flex size-9 items-center justify-center rounded-xl border border-border/10 bg-surface text-muted transition-colors hover:text-primary sm:size-10"
        >
          <Bell size={19} />
        </button>

        <div className="flex items-center gap-2 border-r border-border/10 pr-2 sm:gap-3 sm:pr-4">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary sm:size-10">
            <UserRound size={20} />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">
              مدیر فروشگاه
            </p>
            <p className="text-xs text-muted">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
