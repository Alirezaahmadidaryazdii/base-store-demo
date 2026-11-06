"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, UserRound, Menu, Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { useAuthStore } from "@/store/auth.store";
import { storeConfig } from "@/config/store.config";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";

import { Navigation } from "./navigation";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logo } = storeConfig;

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  const totalWishlistItems = useWishlistStore((state) => state.items.length);

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/70 bg-[var(--color-background)]/75 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)]"
            >
              {isMenuOpen ? (
                <X size={23} strokeWidth={1.6} />
              ) : (
                <Menu size={23} strokeWidth={1.6} />
              )}
            </button>
          </div>

          <Link
            href="/"
            aria-label={storeConfig.name}
            className="flex shrink-0 items-center"
          >
            <Image
              src={logo}
              alt={storeConfig.name}
              width={120}
              height={48}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>

          <Suspense
            fallback={<nav className="hidden items-center gap-8 lg:flex" />}
          >
            <Navigation />
          </Suspense>

          <div className="flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              aria-label="جستجوی محصولات"
              onClick={() => router.push("/search")}
              className="text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)]"
            >
              <Search size={20} strokeWidth={1.6} />
            </button>

            <Link
              href="/wishlist"
              aria-label={`لیست علاقه‌مندی‌ها، ${totalWishlistItems} محصول`}
              className="relative text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)]"
            >
              <Heart size={20} strokeWidth={1.6} />

              {totalWishlistItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[10px] text-white">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              aria-label="سبد خرید"
              className="relative text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)]"
            >
              <ShoppingBag size={21} strokeWidth={1.6} />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[10px] text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href={isAuthenticated ? "/account" : "/login"}
              aria-label="حساب کاربری"
              className="hidden sm:flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              <UserRound size={18} strokeWidth={1.8} />

              <span className="max-w-[110px] truncate whitespace-nowrap">
                {isAuthenticated ? user?.name : "ورود / ثبت‌نام"}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Mobile Menu Drawer */}
      <aside
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-[min(85vw,360px)] flex-col border-l border-[var(--color-border)] bg-[var(--color-background)] shadow-[var(--shadow-dropdown)] transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-[var(--color-border)] px-5">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <Image
              src={logo}
              alt={storeConfig.name}
              width={110}
              height={44}
              className="h-8 w-auto object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            aria-label="بستن منو"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-border)]"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-5 py-7">
          <p className="mb-5 text-xs font-semibold tracking-wider text-[var(--color-muted)]">
            منوی اصلی
          </p>

          <Suspense fallback={<nav className="flex flex-col" />}>
            <MobileMenu onNavigate={() => setIsMenuOpen(false)} />
          </Suspense>

          {/* Quick Access */}
          <div className="mt-9">
            <p className="mb-5 text-xs font-semibold tracking-wider text-[var(--color-muted)]">
              دسترسی سریع
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white p-4 transition-colors hover:border-[var(--color-primary)]/40"
              >
                <Heart size={19} className="text-[var(--color-primary)]" />

                <div>
                  <p className="text-xs font-medium text-[var(--color-foreground)]">
                    علاقه‌مندی‌ها
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--color-muted)]">
                    {totalWishlistItems} محصول
                  </p>
                </div>
              </Link>

              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white p-4 transition-colors hover:border-[var(--color-primary)]/40"
              >
                <ShoppingBag
                  size={19}
                  className="text-[var(--color-primary)]"
                />

                <div>
                  <p className="text-xs font-medium text-[var(--color-foreground)]">
                    سبد خرید
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--color-muted)]">
                    {totalItems} محصول
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="shrink-0 border-t border-[var(--color-border)] px-5 py-5">
          <p className="text-center text-xs font-bold tracking-[0.3em] text-[var(--color-primary)]">
            PARNA
          </p>
          <p className="mt-1 text-center text-[10px] text-[var(--color-muted)]">
            زیبایی در سادگی است
          </p>
        </div>
      </aside>
    </>
  );
}
