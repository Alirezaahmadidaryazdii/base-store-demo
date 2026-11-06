
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  User,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (username.trim() === "admin" && password === "1234") {
      localStorage.setItem("parna-admin-auth", "true");
      router.replace("/admin");
      return;
    }

    setError("نام کاربری یا رمز عبور اشتباه است.");
  }

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground"
    >
      <div className="w-full max-w-[440px]">
        <Link href="/" className="mb-10 flex justify-center">
          <span className="text-3xl font-bold tracking-wider text-primary">
            PARNA
          </span>
        </Link>

        <div className="rounded-2xl border border-border/10 bg-surface p-7 shadow-card sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LockKeyhole size={25} />
            </div>

            <h1 className="text-2xl font-bold">
              ورود به پنل مدیریت
            </h1>

            <p className="mt-3 text-sm leading-7 text-muted">
              برای مدیریت فروشگاه پرنا وارد حساب مدیریتی خود شوید.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium">
                نام کاربری
              </label>

              <div className="relative">
                <User
                  size={19}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  placeholder="نام کاربری خود را وارد کنید"
                  autoComplete="username"
                  required
                  className="h-13 w-full rounded-xl border border-border/15 bg-background pr-12 pl-4 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                رمز عبور
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="رمز عبور خود را وارد کنید"
                  autoComplete="current-password"
                  required
                  className="h-13 w-full rounded-xl border border-border/15 bg-background pr-12 pl-12 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-primary"
                  aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover active:scale-[0.99]"
            >
              ورود به پنل مدیریت
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-7 border-t border-border/10 pt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
            >
              <ArrowRight size={16} />
              بازگشت به فروشگاه
            </Link>
          </div>
        </div>

        <p className="mt-7 text-center text-xs text-muted">
          © 2026 PARNA. تمامی حقوق محفوظ است.
        </p>
      </div>
    </main>
  );
}
