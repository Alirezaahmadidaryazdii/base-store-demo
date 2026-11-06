
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  UserRound,
  Mail,
  CalendarDays,
  Pencil,
  LogOut,
  X,
  Save,
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";
import { notify } from "@/lib/notification";

export default function AccountPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const [hydrated, setHydrated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login");
    }

    if (user) {
      setForm({
        name: user.name,
        email: user.email,
      });
    }
  }, [hydrated, user, router]);

  const handleEdit = () => {
    if (!user) return;

    setForm({
      name: user.name,
      email: user.email,
    });

    setIsEditing(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      updateProfile(form);

      setIsEditing(false);
      notify.success("اطلاعات حساب با موفقیت به‌روزرسانی شد.");
    } catch (error) {
      notify.error(
        error instanceof Error ? error.message : "ویرایش اطلاعات انجام نشد."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    notify.success("از حساب کاربری خارج شدید.");
    router.replace("/");
  };

  if (!hydrated || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(user.createdAt));

  const inputClass =
    "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-primary)]";

  return (
    <main
      dir="rtl"
      className="min-h-[75vh] bg-[var(--color-background)] py-12 sm:py-16"
    >
      <div className="container max-w-3xl">
        <div className="mb-8">
          <p className="mb-2 text-sm text-[var(--color-muted)]">
            حساب کاربری
          </p>

          <h1 className="text-2xl font-bold sm:text-3xl">
            حساب کاربری من
          </h1>

          <p className="mt-2 text-sm text-[var(--color-muted)]">
            اطلاعات شخصی و حساب خود را مدیریت کنید.
          </p>
        </div>

        <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-5 border-b border-[var(--color-border)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <UserRound size={30} strokeWidth={1.5} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold">
                  {user.name}
                </h2>

                <p className="mt-1 truncate text-sm text-[var(--color-muted)]" dir="ltr">
                  {user.email}
                </p>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                <Pencil size={16} />
                ویرایش اطلاعات
              </button>
            )}
          </div>

          <div className="p-6 sm:p-8">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    نام و نام خانوادگی
                  </label>

                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className={inputClass}
                    placeholder="نام خود را وارد کنید"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    ایمیل
                  </label>

                  <input
                    required
                    type="email"
                    dir="ltr"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className={inputClass}
                    placeholder="example@email.com"
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
                  >
                    <Save size={17} />
                    {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm transition-colors hover:bg-[var(--color-surface)]"
                  >
                    <X size={17} />
                    انصراف
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <UserRound
                    size={20}
                    className="mt-1 shrink-0 text-[var(--color-primary)]"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-[var(--color-muted)]">
                      نام و نام خانوادگی
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold">
                      {user.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail
                    size={20}
                    className="mt-1 shrink-0 text-[var(--color-primary)]"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-[var(--color-muted)]">
                      ایمیل
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold" dir="ltr">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={20}
                    className="mt-1 shrink-0 text-[var(--color-primary)]"
                  />

                  <div>
                    <p className="text-xs text-[var(--color-muted)]">
                      تاریخ عضویت
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/50 p-6 sm:px-8">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-red-600 transition-colors hover:text-red-700"
            >
              <LogOut size={18} />
              خروج از حساب کاربری
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
