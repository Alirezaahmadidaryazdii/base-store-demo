
import { orders } from "@/data/mock/orders";
import type { Order } from "@/types/order";

export async function getOrders(): Promise<Order[]> {
  return orders;
}

export async function getOrderByTrackingCode(
  trackingCode: string
): Promise<Order | null> {
  return (
    orders.find((order) => order.trackingCode === trackingCode) ?? null
  );
}
