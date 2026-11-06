
"use client";

import { useEffect, useState } from "react";
import {
  Package,
  MapPin,
  UserRound,
  Phone,
  CalendarDays,
} from "lucide-react";

import type { Order, OrderStatus } from "@/types/order";
import { storeConfig } from "@/config/store.config";
import { Modal } from "@/components/ui/modal";
import { CustomSelect } from "@/components/ui/custom-select";
import { OrderStatus as OrderStatusBadge } from "./order-status";

interface OrderDetailsModalProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

const statusOptions = [
  { label: "در انتظار پرداخت", value: "pending" },
  { label: "در حال پردازش", value: "processing" },
  { label: "ارسال شده", value: "shipped" },
  { label: "تحویل شده", value: "delivered" },
  { label: "لغو شده", value: "cancelled" },
];

const formatter = new Intl.NumberFormat(storeConfig.locale);

function formatPrice(value: number) {
  return `${formatter.format(value)} ${storeConfig.currency}`;
}

export function OrderDetailsModal({
  open,
  order,
  onClose,
  onStatusChange,
}: OrderDetailsModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("pending");

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
    }
  }, [order]);

  if (!order) return null;

  function handleSaveStatus() {
    if (!order || selectedStatus === order.status) return;

    onStatusChange(order.id, selectedStatus);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`جزئیات سفارش ${order.trackingCode}`}
      description="اطلاعات کامل سفارش و وضعیت ارسال"
      size="xl"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background p-4">
          <div>
            <p className="text-xs text-muted">کد پیگیری سفارش</p>
            <p className="mt-1 font-semibold" dir="ltr">
              {order.trackingCode}
            </p>
          </div>

          <OrderStatusBadge status={order.status} />
        </div>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <UserRound size={19} className="text-primary" />
            <h3 className="font-semibold">اطلاعات مشتری</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-background p-4 sm:grid-cols-2">
            <InfoItem label="نام و نام خانوادگی" value={order.customer.fullName} />

            <InfoItem
              label="شماره تماس"
              value={order.customer.phone}
              icon={<Phone size={15} />}
            />

            {order.customer.email && (
              <InfoItem label="ایمیل" value={order.customer.email} />
            )}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <MapPin size={19} className="text-primary" />
            <h3 className="font-semibold">آدرس ارسال</h3>
          </div>

          <div className="space-y-3 rounded-xl border border-border bg-background p-4">
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="استان" value={order.shippingAddress.province} />
              <InfoItem label="شهر" value={order.shippingAddress.city} />
            </div>

            <InfoItem label="آدرس کامل" value={order.shippingAddress.address} />

            <InfoItem
              label="کد پستی"
              value={order.shippingAddress.postalCode}
            />
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <Package size={19} className="text-primary" />
            <h3 className="font-semibold">محصولات سفارش</h3>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[550px] text-right">
                <thead className="bg-background text-xs text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">محصول</th>
                    <th className="px-4 py-3 font-medium">تنوع</th>
                    <th className="px-4 py-3 font-medium">تعداد</th>
                    <th className="px-4 py-3 font-medium">قیمت</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {order.items.map((item) => (
                    <tr key={`${item.product.id}-${item.variant.id}`}>
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium">
                          {item.product.name}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          {item.variant.sku}
                        </p>
                      </td>

                      <td className="px-4 py-4 text-sm text-muted">
                        {[item.variant.size, item.variant.color]
                          .filter(Boolean)
                          .join(" / ") || "بدون تنوع"}
                      </td>

                      <td className="px-4 py-4 text-sm">
                        {item.quantity}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium">
                        {formatPrice(item.variant.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-3 rounded-xl border border-border bg-background p-4">
          <PriceRow label="مبلغ محصولات" value={order.subtotal} />
          <PriceRow label="هزینه ارسال" value={order.shippingCost} />
          <PriceRow label="تخفیف" value={order.discount} />
          <div className="border-t border-border pt-3">
            <PriceRow label="مبلغ نهایی" value={order.total} strong />
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-primary" />
            <h3 className="font-semibold">تاریخ ثبت سفارش</h3>
          </div>

          <p className="text-sm text-muted">
            {new Date(order.createdAt).toLocaleString(storeConfig.locale)}
          </p>
        </section>

        <section className="space-y-3 border-t border-border pt-5">
          <h3 className="font-semibold">تغییر وضعیت سفارش</h3>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <CustomSelect
                value={selectedStatus}
                options={statusOptions}
                onChange={(value) => setSelectedStatus(value as OrderStatus)}
              />
            </div>

            <button
              type="button"
              disabled={selectedStatus === order.status}
              onClick={handleSaveStatus}
              className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              ذخیره وضعیت
            </button>
          </div>
        </section>
      </div>
    </Modal>
  );
}

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-1 text-xs text-muted">{label}</p>
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        <span className="break-words">{value}</span>
      </div>
    </div>
  );
}

function PriceRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={`text-sm ${strong ? "font-bold" : "text-muted"}`}>
        {label}
      </span>

      <span className={`text-sm ${strong ? "font-bold text-primary" : "font-medium"}`}>
        {formatPrice(value)}
      </span>
    </div>
  );
}
