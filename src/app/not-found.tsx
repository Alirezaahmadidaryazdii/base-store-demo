
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--color-background)] px-5 py-16 text-center">

      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[var(--color-primary)]/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[var(--color-accent)]/[0.10] blur-3xl" />

      <div className="relative mb-8">
        <span className="select-none text-[clamp(140px,28vw,240px)] font-black leading-none tracking-[-0.1em] text-[var(--color-primary)]/[0.07]">
          404
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-[var(--color-accent)]/50 bg-[var(--color-background)] px-5 py-2 text-[10px] font-semibold tracking-[0.3em] text-[var(--color-primary)] sm:text-xs">
            PAGE NOT FOUND
          </span>
        </div>
      </div>

      <div className="relative max-w-md">
        <span className="mb-3 block text-xs font-semibold tracking-widest text-[var(--color-accent)]">
          PARNA COLLECTION
        </span>

        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-secondary)] sm:text-3xl">
          این صفحه پیدا نشد!
        </h1>

        <p className="mt-4 text-sm leading-8 text-[var(--color-muted)] sm:text-base">
          به نظر می‌رسد مسیری که دنبالش هستید وجود ندارد
          یا آدرس آن تغییر کرده است. نگران نباشید،
          هنوز می‌توانید مسیرتان را پیدا کنید.
        </p>
      </div>

      <div className="relative mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-7 py-3.5 text-sm font-medium text-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:bg-[var(--color-primary-hover)]"
        >
          <Home size={17} />
          صفحه اصلی
        </Link>

        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-7 py-3.5 text-sm font-medium text-[var(--color-secondary)] transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-primary)]"
        >
          مشاهده فروشگاه
          <ArrowLeft size={17} />
        </Link>
      </div>

      <Link
        href="/shop"
        className="relative mt-8 inline-flex items-center gap-2 text-xs text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
      >
        <Search size={14} />
        جستجو در محصولات
      </Link>

      <div className="relative mt-16 flex items-center gap-3">
        <span className="h-px w-8 bg-[var(--color-accent)]/50" />
        <span className="text-sm font-bold tracking-[0.35em] text-[var(--color-primary)]">
          PARNA
        </span>
        <span className="h-px w-8 bg-[var(--color-accent)]/50" />
      </div>
    </main>
  );
}
