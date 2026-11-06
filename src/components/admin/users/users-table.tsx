
"use client";

import {
  Eye,
  Pencil,
  Trash2,
  Ban,
  CheckCircle2,
} from "lucide-react";

import type { AdminUser } from "@/services/user.service";
import { UserStatus } from "./user-status";
import { storeConfig } from "@/config/store.config";

interface UsersTableProps {
  users: AdminUser[];
  onView: (user: AdminUser) => void;
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
  onToggleStatus: (user: AdminUser) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat(storeConfig.locale).format(price);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat(storeConfig.locale).format(new Date(date));

export function UsersTable({
  users,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}: UsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface px-4 py-16 text-center">
        <p className="font-medium">کاربری پیدا نشد</p>
        <p className="mt-1 text-sm text-muted">
          عبارت جست‌وجو یا فیلترها را تغییر بده.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full min-w-[1050px] text-right text-sm">
        <thead className="border-b border-border bg-background text-muted">
          <tr>
            <th className="px-5 py-4 font-medium">کاربر</th>
            <th className="px-5 py-4 font-medium">ایمیل</th>
            <th className="px-5 py-4 font-medium">شماره تماس</th>
            <th className="px-5 py-4 font-medium">نقش</th>
            <th className="px-5 py-4 font-medium">سفارش‌ها</th>
            <th className="px-5 py-4 font-medium">مجموع خرید</th>
            <th className="px-5 py-4 font-medium">تاریخ عضویت</th>
            <th className="px-5 py-4 font-medium">وضعیت</th>
            <th className="px-5 py-4 font-medium">عملیات</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {users.map((user) => (
            <tr key={user.id} className="transition hover:bg-background/70">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {user.name.trim().charAt(0) || "؟"}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
              </td>

              <td className="px-5 py-4 text-muted" dir="ltr">
                {user.email}
              </td>

              <td className="px-5 py-4 text-muted" dir="ltr">
                {user.phone || "ثبت نشده"}
              </td>

              <td className="px-5 py-4">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                  {user.role === "admin" ? "مدیر" : "مشتری"}
                </span>
              </td>

              <td className="px-5 py-4">{user.orderCount}</td>

              <td className="px-5 py-4 font-medium">
                {formatPrice(user.totalPurchase)} {storeConfig.currency}
              </td>

              <td className="px-5 py-4 text-muted">
                {formatDate(user.createdAt)}
              </td>

              <td className="px-5 py-4">
                <UserStatus isActive={user.isActive} />
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onView(user)}
                    title="مشاهده جزئیات"
                    className="flex size-9 items-center justify-center rounded-lg border border-border text-muted transition hover:border-primary hover:text-primary"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit(user)}
                    title="ویرایش کاربر"
                    className="flex size-9 items-center justify-center rounded-lg border border-border text-muted transition hover:border-primary hover:text-primary"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleStatus(user)}
                    title={user.isActive ? "غیرفعال کردن" : "فعال کردن"}
                    className={`flex size-9 items-center justify-center rounded-lg border border-border transition ${
                      user.isActive
                        ? "text-red-500 hover:border-red-500 hover:bg-red-50"
                        : "text-green-600 hover:border-green-500 hover:bg-green-50"
                    }`}
                  >
                    {user.isActive ? (
                      <Ban size={16} />
                    ) : (
                      <CheckCircle2 size={16} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(user)}
                    title="حذف کاربر"
                    className="flex size-9 items-center justify-center rounded-lg border border-border text-red-500 transition hover:border-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
