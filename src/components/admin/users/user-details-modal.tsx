
"use client";

import { CalendarDays, Mail, MapPin, Phone, ShoppingBag, UserRound } from "lucide-react";

import type { Order } from "@/types/order";
import type { AdminUser } from "@/services/user.service";

import { Modal } from "@/components/ui/modal";
import { UserStatus } from "./user-status";
import { storeConfig } from "@/config/store.config";

interface UserDetailsModalProps {
  open: boolean;
  user: AdminUser | null;
  orders: Order[];
  onClose: () => void;
  onEdit: (user: AdminUser) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat(storeConfig.locale).format(price);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat(storeConfig.locale, {
    dateStyle: "medium",
  }).format(new Date(date));

const statusLabels: Record<Order["status"], string> = {
  pending: "در انتظار پرداخت",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل داده شده",
  cancelled: "لغو شده",
};

const statusStyles: Record<Order["status"], string> = {
  pending: "bg-yellow-500/10 text-yellow-600",
  processing: "bg-blue-500/10 text-blue-600",
  shipped: "bg-purple-500/10 text-purple-600",
  delivered: "bg-green-500/10 text-green-600",
  cancelled: "bg-red-500/10 text-red-600",
};

export function UserDetailsModal({
  open,
  user,
  orders,
  onClose,
  onEdit,
}: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="جزئیات کاربر"
      description="اطلاعات حساب کاربری و سوابق خرید"
      size="xl"
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
            {user.name.trim().charAt(0) || "؟"}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="mt-1 text-sm text-muted" dir="ltr">
              {user.email}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                {user.role === "admin" ? "مدیر" : "مشتری"}
              </span>
              <UserStatus isActive={user.isActive} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEdit(user)}
            className="h-10 shrink-0 rounded-lg bg-primary px-4 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            ویرایش کاربر
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-border p-4">
            <Mail className="text-muted" size={19} />
            <div className="min-w-0">
              <p className="text-xs text-muted">ایمیل</p>
              <p className="mt-1 truncate text-sm" dir="ltr">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border p-4">
            <Phone className="text-muted" size={19} />
            <div>
              <p className="text-xs text-muted">شماره تماس</p>
              <p className="mt-1 text-sm" dir="ltr">
                {user.phone || "ثبت نشده"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border p-4">
            <CalendarDays className="text-muted" size={19} />
            <div>
              <p className="text-xs text-muted">تاریخ عضویت</p>
              <p className="mt-1 text-sm">{formatDate(user.createdAt)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border p-4">
            <UserRound className="text-muted" size={19} />
            <div>
              <p className="text-xs text-muted">شناسه کاربر</p>
              <p className="mt-1 text-sm" dir="ltr">
                {user.id}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-muted">
              <ShoppingBag size={18} />
              <span className="text-sm">تعداد سفارش‌ها</span>
            </div>
            <p className="mt-3 text-xl font-bold">{user.orderCount}</p>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-muted">
              <MapPin size={18} />
              <span className="text-sm">مجموع خرید</span>
            </div>
            <p className="mt-3 text-lg font-bold">
              {formatPrice(user.totalPurchase)}
              <span className="mr-1 text-xs font-normal text-muted">
                {storeConfig.currency}
              </span>
            </p>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold">سوابق سفارش‌ها</h4>
            <span className="text-xs text-muted">
              {orders.length} سفارش
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-xl border border-border bg-background py-10 text-center">
              <ShoppingBag className="mx-auto text-muted" size={28} />
              <p className="mt-3 text-sm text-muted">
                این کاربر هنوز سفارشی ثبت نکرده است.
              </p>
            </div>
          ) : (
            <div className="max-h-64 space-y-3 overflow-y-auto">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">
                      سفارش #{order.trackingCode}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {formatDate(order.createdAt)}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {order.items.length} قلم کالا
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${statusStyles[order.status]}`}
                    >
                      {statusLabels[order.status]}
                    </span>
                    <span className="text-sm font-semibold">
                      {formatPrice(order.total)} {storeConfig.currency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
