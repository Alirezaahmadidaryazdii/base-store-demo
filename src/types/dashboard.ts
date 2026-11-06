import type { Order, OrderStatus } from "@/types/order";
import type { Product } from "@/types/product";

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  activeProducts: number;
  lowStockVariants: number;
  totalStock: number;
  orderValue: number;
}

export interface OrderStatusSummary {
  status: OrderStatus;
  label: string;
  count: number;
}

export interface TopProduct {
  product: Product;
  quantitySold: number;
  revenue: number;
}

export interface DashboardData {
  stats: DashboardStats;
  orderOverview: OrderStatusSummary[];
  recentOrders: Order[];
  topProducts: TopProduct[];
}