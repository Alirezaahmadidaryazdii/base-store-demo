import { getOrders } from "@/services/order.service";
import { getProducts } from "@/services/product.service";

import type { OrderStatus } from "@/types/order";
import type {
  DashboardData,
  OrderStatusSummary,
  TopProduct,
} from "@/types/dashboard";

const statusLabels: Record<OrderStatus, string> = {
  pending: "در انتظار پرداخت",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

export async function getDashboardData(): Promise<DashboardData> {
  const [orders, products] = await Promise.all([
    getOrders(),
    getProducts(),
  ]);

  const activeOrders = orders.filter(
    (order) => order.status !== "cancelled"
  );

  const variants = products.flatMap((product) => product.variants);

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(
      (order) => order.status === "pending"
    ).length,
    activeProducts: products.length,
    lowStockVariants: variants.filter(
      (variant) => variant.stock <= 5
    ).length,
    totalStock: variants.reduce(
      (sum, variant) => sum + variant.stock,
      0
    ),
    orderValue: activeOrders.reduce(
      (sum, order) => sum + order.total,
      0
    ),
  };

  const statuses: OrderStatus[] = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const orderOverview: OrderStatusSummary[] = statuses.map(
    (status) => ({
      status,
      label: statusLabels[status],
      count: orders.filter((order) => order.status === status).length,
    })
  );

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const productSales = new Map<string, TopProduct>();

  for (const order of activeOrders) {
    for (const item of order.items) {
      const productId = item.product.id;
      const existing = productSales.get(productId);

      if (existing) {
        existing.quantitySold += item.quantity;
        existing.revenue += item.variant.price * item.quantity;
      } else {
        productSales.set(productId, {
          product: item.product,
          quantitySold: item.quantity,
          revenue: item.variant.price * item.quantity,
        });
      }
    }
  }

  const topProducts = [...productSales.values()]
    .sort((a, b) => b.quantitySold - a.quantitySold)
    .slice(0, 5);

  return {
    stats,
    orderOverview,
    recentOrders,
    topProducts,
  };
}