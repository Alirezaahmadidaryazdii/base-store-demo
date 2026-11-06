
import type { OrderStatus } from "@/types/order";

interface OrderStatusProps {
  status: OrderStatus;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "در انتظار پرداخت",
    className: "bg-amber-100 text-amber-700",
  },
  processing: {
    label: "در حال پردازش",
    className: "bg-blue-100 text-blue-700",
  },
  shipped: {
    label: "ارسال شده",
    className: "bg-purple-100 text-purple-700",
  },
  delivered: {
    label: "تحویل شده",
    className: "bg-green-100 text-green-700",
  },
  cancelled: {
    label: "لغو شده",
    className: "bg-red-100 text-red-700",
  },
};

export function OrderStatus({ status }: OrderStatusProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
