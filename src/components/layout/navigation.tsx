"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const navigationItems = [
  { label: "صفحه اصلی", href: "/" },
  { label: "فروشگاه", href: "/shop" },
  { label: "مردانه", href: "/category/men" },
  { label: "زنانه", href: "/category/women" },
  { label: "اکسسوری", href: "/category/accessories" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigationItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative py-2 text-sm transition-colors hover:text-[var(--color-primary)] ${
              isActive
                ? "font-semibold text-[var(--color-primary)]"
                : "text-[var(--color-foreground)]"
            }`}
          >
            {item.label}

            {isActive && (
              <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[var(--color-primary)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
