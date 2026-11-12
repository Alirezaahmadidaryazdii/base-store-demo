
"use client";

import Link from "next/link";
import Image from "next/image";
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
  X,
} from "lucide-react";

import { storeConfig } from "@/config/store.config";

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

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("parna-admin-auth");
    onClose();
    router.replace("/admin/login");
  }

  return (
    <>
      <button
        type="button"
        aria-label="بستن منو"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="منوی مدیریت"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-[min(85vw,260px)] flex-col border-l border-border/10 bg-surface p-5 shadow-xl transition-transform duration-300 ease-in-out lg:w-[260px] lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between lg:mb-10">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-3 px-2"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
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

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن منو"
            className="flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-background hover:text-primary lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          <p className="mb-4 px-3 text-xs font-semibold text-muted">
            منوی اصلی
          </p>

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
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white shadow-soft"
                    : "text-muted hover:bg-background hover:text-primary"
                }`}
              >
                <Icon size={19} />
                <span>{item.label}</span>

                {isActive && (
                  <ChevronLeft size={16} className="mr-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-border/10 pt-5">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted transition-colors hover:bg-background hover:text-primary"
          >
            <Store size={19} />
            مشاهده فروشگاه
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={19} />
            خروج از حساب
          </button>
        </div>
      </aside>
    </>
  );
}
