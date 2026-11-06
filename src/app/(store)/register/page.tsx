
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { notify } from "@/lib/notification";

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password.length < 8) {
      notify.error("رمز عبور باید حداقل ۸ کاراکتر باشد.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      notify.error("تکرار رمز عبور با رمز عبور مطابقت ندارد.");
      return;
    }

    try {
      setLoading(true);

      register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      notify.success("حساب کاربری شما با موفقیت ساخته شد.");

      router.push("/account");
    } catch (error) {
      notify.error(
        error instanceof Error ? error.message : "ثبت‌نام انجام نشد."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition-all placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10";

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-12"
    >
      <div className="w-full max-w-[460px]">
        <Link
          href="/"
          className="mb-8 block text-center text-3xl font-bold tracking-wide text-[var(--color-primary)]"
        >
          PARNA
        </Link>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] sm:p-9">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold">
              ساخت حساب کاربری
            </h1>
            <p className="text-sm text-[var(--color-muted)]">
              به خانواده پارنا خوش آمدید
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                نام و نام خانوادگی
              </label>
              <input
                required
                type="text"
                autoComplete="name"
                placeholder="نام خود را وارد کنید"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                ایمیل
              </label>
              <input
                required
                type="email"
                autoComplete="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className={inputClass}
                dir="ltr"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                رمز عبور
              </label>
              <input
                required
                type="password"
                autoComplete="new-password"
                placeholder="حداقل ۸ کاراکتر"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                تکرار رمز عبور
              </label>
              <input
                required
                type="password"
                autoComplete="new-password"
                placeholder="رمز عبور را دوباره وارد کنید"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmPassword: e.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[var(--color-primary)] py-3.5 font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
            >
              {loading ? "در حال ثبت‌نام..." : "ساخت حساب کاربری"}
            </button>
          </form>

          <div className="mt-7 border-t border-[var(--color-border)] pt-6 text-center text-sm">
            <span className="text-[var(--color-muted)]">
              قبلاً حساب ساخته‌اید؟
            </span>
            <Link
              href="/login"
              className="mr-2 font-semibold text-[var(--color-primary)] hover:underline"
            >
              ورود به حساب
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    </main>
  );
}
