"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tags,
  Settings,
  LogOut,
  Store,
  ChevronLeft,
} from "lucide-react";
import { storeConfig } from "@/config/store.config";
import Image from "next/image";

const navigationItems = [
  {
    label: "داشبورد",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "محصولات",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "سفارش‌ها",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "کاربران",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "دسته‌بندی‌ها",
    href: "/admin/categories",
    icon: Tags,
  },
  {
    label: "تنظیمات",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("parna-admin-auth");
    router.replace("/admin/login");
  }

  return (
    <aside className="fixed right-0 top-0 z-40 flex h-screen w-[260px] flex-col border-l border-border/10 bg-surface p-5">
      <Link href="/admin" className="mb-10 flex items-center gap-3 px-2">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-white">
          <Store size={22} />
        </div>

        <div>
          <Image
            src={storeConfig.logo}
            alt={storeConfig.name}
            width={120}
            height={48}
            priority
            className="h-9 w-auto object-contain"
          />
          <p className="text-xs text-muted">پنل مدیریت</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-2">
        <p className="mb-4 px-3 text-xs font-semibold text-muted">منوی اصلی</p>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white shadow-soft"
                  : "text-muted hover:bg-background hover:text-primary"
              }`}
            >
              <Icon size={19} />
              <span>{item.label}</span>

              {isActive && <ChevronLeft size={16} className="mr-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-border/10 pt-5">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted transition-colors hover:bg-background hover:text-primary"
        >
          <Store size={19} />
          مشاهده فروشگاه
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut size={19} />
          خروج از حساب
        </button>
      </div>
    </aside>
  );
}
