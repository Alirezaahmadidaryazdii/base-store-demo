
import type { CartItem } from "./cart";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
}

export interface ShippingAddress {
  province: string;
  city: string;
  address: string;
  postalCode: string;
}

export interface Order {
  id: string;
  trackingCode: string;
  customer: CustomerInfo;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}
