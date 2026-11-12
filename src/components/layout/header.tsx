
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  Heart,
  X,
  LogIn,
  Store,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";
import { storeConfig } from "@/config/store.config";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";

import { Navigation } from "./navigation";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { logo } = storeConfig;
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  const totalWishlistItems = useWishlistStore(
    (state) => state.items.length,
  );

  const accountHref = isAuthenticated ? "/account" : "/login";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/70 bg-[var(--color-background)]/85 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[76px] lg:px-8">

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] lg:hidden"
          >
            {isMenuOpen ? (
              <X size={22} strokeWidth={1.7} />
            ) : (
              <Menu size={22} strokeWidth={1.7} />
            )}
          </button>

          {/* Logo */}
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
              className="h-8 w-auto object-contain sm:h-9"
            />
          </Link>

          {/* Desktop Navigation */}
          <Suspense
            fallback={<nav className="hidden lg:flex" />}
          >
            <div className="hidden lg:block">
              <Navigation />
            </div>
          </Suspense>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 lg:flex">

            <Link
              href="/search"
              aria-label="جستجوی محصولات"
              className="text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)]"
            >
              <Search size={20} strokeWidth={1.7} />
            </Link>

            <Link
              href="/wishlist"
              aria-label={`علاقه‌مندی‌ها، ${totalWishlistItems} محصول`}
              className="relative text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)]"
            >
              <Heart size={20} strokeWidth={1.7} />

              {totalWishlistItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[10px] font-medium text-white">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              aria-label={`سبد خرید، ${totalItems} محصول`}
              className="relative text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)]"
            >
              <ShoppingBag size={21} strokeWidth={1.7} />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[10px] font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href={accountHref}
              aria-label={isAuthenticated ? "حساب کاربری" : "ورود و ثبت‌نام"}
              className="flex h-10 max-w-44 items-center gap-2 rounded-full bg-[var(--color-primary)] px-4 text-white transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              {isAuthenticated ? (
                <UserRound size={18} strokeWidth={1.8} />
              ) : (
                <LogIn size={18} strokeWidth={1.8} />
              )}

              <span className="truncate text-sm font-medium">
                {isAuthenticated
                  ? user?.name || "حساب کاربری"
                  : "ورود / ثبت‌نام"}
              </span>
            </Link>
          </div>

          {/* Mobile Search */}
          <Link
            href="/search"
            aria-label="جستجوی محصولات"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] lg:hidden"
          >
            <Search size={21} strokeWidth={1.7} />
          </Link>
        </div>
      </header>

      {/* Mobile Overlay */}
      <button
        type="button"
        aria-label="بستن منو"
        tabIndex={isMenuOpen ? 0 : -1}
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-[3px] transition-opacity duration-300 lg:hidden ${
          isMenuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Drawer */}
      <aside
        id="mobile-menu"
        aria-label="منوی موبایل"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-[min(85vw,360px)] flex-col border-l border-[var(--color-border)] bg-[var(--color-background)] shadow-[var(--shadow-dropdown)] transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[var(--color-border)] px-5">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
          >
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
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)]"
          >
            <X size={19} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-5 py-7">
          <p className="mb-5 text-xs font-semibold text-[var(--color-muted)]">
            منوی اصلی
          </p>

          <Suspense fallback={<nav className="flex flex-col" />}>
            <MobileMenu onNavigate={() => setIsMenuOpen(false)} />
          </Suspense>
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

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="دسترسی سریع"
        className="fixed inset-x-4 bottom-[calc(env(safe-area-inset-bottom)+12px)] z-40 rounded-2xl border border-white/60 bg-[var(--color-background)]/80 px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
      >
        <div className="grid grid-cols-4 items-center">

          {/* Shop */}
          <Link
            href="/shop"
            aria-current={isActive("/shop") ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl py-2 transition-colors ${
              isActive("/shop")
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-primary)]"
            }`}
          >
            <Store size={21} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">فروشگاه</span>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-current={isActive("/wishlist") ? "page" : undefined}
            aria-label={`علاقه‌مندی‌ها، ${totalWishlistItems} محصول`}
            className={`relative flex flex-col items-center justify-center gap-1 rounded-xl py-2 transition-colors ${
              isActive("/wishlist")
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-primary)]"
            }`}
          >
            <span className="relative">
              <Heart size={21} strokeWidth={1.8} />

              {totalWishlistItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[9px] text-white">
                  {totalWishlistItems}
                </span>
              )}
            </span>
            <span className="text-[10px] font-medium">
              علاقه‌مندی
            </span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-current={isActive("/cart") ? "page" : undefined}
            aria-label={`سبد خرید، ${totalItems} محصول`}
            className={`relative flex flex-col items-center justify-center gap-1 rounded-xl py-2 transition-colors ${
              isActive("/cart")
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-primary)]"
            }`}
          >
            <span className="relative">
              <ShoppingBag size={21} strokeWidth={1.8} />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[9px] text-white">
                  {totalItems}
                </span>
              )}
            </span>
            <span className="text-[10px] font-medium">
              سبد خرید
            </span>
          </Link>

          {/* Account */}
          <Link
            href={accountHref}
            aria-current={isActive("/account") || isActive("/login") ? "page" : undefined}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl py-2 transition-colors ${
              isActive("/account") || isActive("/login")
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-primary)]"
            }`}
          >
            <UserRound size={21} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">
              حساب کاربری
            </span>
          </Link>

        </div>
      </nav>
    </>
  );
}
