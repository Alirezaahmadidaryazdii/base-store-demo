import { storeConfig } from "@/config/store.config";
import type { Order, OrderStatus } from "@/types/order";

interface RecentOrdersProps {
  orders: Order[];
}

const statusLabels: Record<OrderStatus, string> = {
  pending: "در انتظار پرداخت",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const numberFormatter = new Intl.NumberFormat(storeConfig.locale);

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h2 className="font-bold text-foreground">سفارش‌های اخیر</h2>
          <p className="mt-1 text-sm text-muted">
            آخرین سفارش‌های ثبت‌شده
          </p>
        </div>

        <span className="text-sm text-primary">
          {numberFormatter.format(orders.length)} سفارش
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-right text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-5 py-4 font-medium">کد سفارش</th>
              <th className="px-5 py-4 font-medium">مشتری</th>
              <th className="px-5 py-4 font-medium">مبلغ</th>
              <th className="px-5 py-4 font-medium">وضعیت</th>
              <th className="px-5 py-4 font-medium">تاریخ</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-5 py-4 font-medium text-foreground">
                  {order.trackingCode}
                </td>

                <td className="px-5 py-4 text-foreground">
                  {order.customer.fullName}
                </td>

                <td className="px-5 py-4 text-foreground">
                  {numberFormatter.format(order.total)} {storeConfig.currency}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                  >
                    {statusLabels[order.status]}
                  </span>
                </td>

                <td className="px-5 py-4 text-muted">
                  {new Date(order.createdAt).toLocaleDateString(storeConfig.locale)}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted">
                  هنوز سفارشی ثبت نشده است.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}