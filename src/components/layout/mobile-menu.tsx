
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { navigationItems } from "./navigation";

interface MobileMenuProps {
  onNavigate: () => void;
}

export function MobileMenu({ onNavigate }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col">
      {navigationItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`group flex items-center justify-between border-b border-[var(--color-border)]/70 py-4 text-sm transition-colors ${
              isActive
                ? "font-semibold text-[var(--color-primary)]"
                : "text-[var(--color-foreground)] hover:text-[var(--color-primary)]"
            }`}
          >
            {item.label}

            <ChevronLeft
              size={17}
              className={`transition-transform group-hover:-translate-x-1 ${
                isActive
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-muted)]"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
