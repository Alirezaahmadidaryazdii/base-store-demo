
"use client";

import { Eye } from "lucide-react";

import type { Order } from "@/types/order";
import { storeConfig } from "@/config/store.config";
import { OrderStatus } from "./order-status";

interface OrdersTableProps {
  orders: Order[];
  onView: (order: Order) => void;
}

const formatter = new Intl.NumberFormat(storeConfig.locale);

export function OrdersTable({ orders, onView }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface py-16 text-center">
        <p className="font-medium">سفارشی پیدا نشد</p>
        <p className="mt-1 text-sm text-muted">
          عبارت جست‌وجو یا فیلتر انتخاب‌شده را تغییر دهید.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-right">
          <thead className="border-b border-border bg-background text-xs text-muted">
            <tr>
              <th className="px-5 py-4 font-medium">کد سفارش</th>
              <th className="px-5 py-4 font-medium">مشتری</th>
              <th className="px-5 py-4 font-medium">تاریخ سفارش</th>
              <th className="px-5 py-4 font-medium">تعداد محصولات</th>
              <th className="px-5 py-4 font-medium">مبلغ کل</th>
              <th className="px-5 py-4 font-medium">وضعیت</th>
              <th className="px-5 py-4 text-center font-medium">جزئیات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="transition hover:bg-background/70"
              >
                <td className="px-5 py-4">
                  <span className="font-medium" dir="ltr">
                    {order.trackingCode}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div>
                    <p className="text-sm font-medium">
                      {order.customer.fullName}
                    </p>
                    <p className="mt-1 text-xs text-muted" dir="ltr">
                      {order.customer.phone}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-muted">
                  {new Date(order.createdAt).toLocaleDateString(
                    storeConfig.locale
                  )}
                </td>

                <td className="px-5 py-4 text-sm">
                  {order.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </td>

                <td className="px-5 py-4 text-sm font-medium">
                  {formatter.format(order.total)}
                  <span className="mr-1 text-xs text-muted">
                    {storeConfig.currency}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <OrderStatus status={order.status} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => onView(order)}
                      title="مشاهده جزئیات"
                      className="rounded-lg p-2 text-muted transition hover:bg-primary/10 hover:text-primary"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
