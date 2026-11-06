
import type { Product, ProductVariant } from "./product";

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}
