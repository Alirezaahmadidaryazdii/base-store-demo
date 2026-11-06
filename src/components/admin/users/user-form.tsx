
"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import type { User, UserRole } from "@/types/user";
import type {
  AdminUser,
  CreateUserData,
  UpdateUserData,
} from "@/services/user.service";

import { Modal } from "@/components/ui/modal";
import { CustomSelect } from "@/components/ui/custom-select";

interface UserFormProps {
  open: boolean;
  user: AdminUser | null;
  users: AdminUser[];
  onClose: () => void;
  onSubmit: (data: CreateUserData | UpdateUserData) => void;
}

export function UserForm({
  open,
  user,
  users,
  onClose,
  onSubmit,
}: UserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [isActive, setIsActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhone(user?.phone ?? "");
    setPassword("");
    setRole(user?.role ?? "customer");
    setIsActive(user?.isActive ?? true);
    setShowPassword(false);
    setError("");
  }, [open, user]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim() || !normalizedEmail) {
      setError("نام و ایمیل الزامی هستند.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("فرمت ایمیل معتبر نیست.");
      return;
    }

    if (!user && password.trim().length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }

    const duplicateEmail = users.some(
      (item) =>
        item.email.toLowerCase() === normalizedEmail &&
        item.id !== user?.id
    );

    if (duplicateEmail) {
      setError("این ایمیل قبلاً برای کاربر دیگری ثبت شده است.");
      return;
    }

    if (user) {
      onSubmit({
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        role,
        isActive,
      });
    } else {
      onSubmit({
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        password,
        role,
        isActive,
      });
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={user ? "ویرایش کاربر" : "افزودن کاربر جدید"}
      description={
        user
          ? "اطلاعات حساب کاربر را ویرایش کنید."
          : "اطلاعات کاربر جدید را وارد کنید."
      }
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              نام و نام خانوادگی
            </label>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="مثلاً علیرضا احمدی"
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              آدرس ایمیل
            </label>

            <input
              type="email"
              dir="ltr"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@email.com"
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-left text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            شماره موبایل
          </label>

          <input
            type="tel"
            dir="ltr"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="09123456789"
            className="h-11 w-full rounded-lg border border-border bg-background px-3 text-left text-sm outline-none focus:border-primary"
          />
        </div>

        {!user && (
          <div>
            <label className="mb-2 block text-sm font-medium">
              رمز عبور
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                dir="ltr"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="حداقل ۶ کاراکتر"
                className="h-11 w-full rounded-lg border border-border bg-background px-3 pl-11 text-left text-sm outline-none focus:border-primary"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium">
            نقش کاربر
          </label>

          <CustomSelect
            value={role}
            onChange={(value) => setRole(value as UserRole)}
            options={[
              { label: "مشتری", value: "customer" },
              { label: "مدیر", value: "admin" },
            ]}
            placeholder="انتخاب نقش"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background p-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
            className="h-4 w-4 accent-primary"
          />

          <span className="text-sm">حساب کاربری فعال باشد</span>
        </label>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-5 py-2.5 text-sm transition hover:bg-background"
          >
            انصراف
          </button>

          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm text-white transition hover:bg-primary-hover"
          >
            {user ? "ذخیره تغییرات" : "ایجاد کاربر"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
