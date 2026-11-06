import type { Order } from "@/types/order";
import type { CartItem } from "@/types/cart";
import { products } from "@/data/mock/products";

const tshirt = products.find((product) => product.id === "prod-1")!;
const hoodie = products.find((product) => product.id === "prod-2")!;
const shirt = products.find((product) => product.id === "prod-3")!;
const bag = products.find((product) => product.id === "prod-4")!;

const createItem = (
  product: typeof tshirt,
  variantId: string,
  quantity: number
): CartItem => ({
  product,
  variant: product.variants.find((variant) => variant.id === variantId)!,
  quantity,
});

function createOrder(
  data: Omit<Order, "subtotal" | "total">
): Order {
  const subtotal = data.items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  return {
    ...data,
    subtotal,
    total: subtotal + data.shippingCost - data.discount,
  };
}

export const orders: Order[] = [
  createOrder({
    id: "order-1",
    trackingCode: "PRN-10001",
    customer: {
      fullName: "علی محمدی",
      phone: "09121234567",
    },
    shippingAddress: {
      province: "تهران",
      city: "تهران",
      address: "خیابان ولیعصر، پلاک ۱۲",
      postalCode: "1234567890",
    },
    items: [
      createItem(tshirt, "var-1", 2),
      createItem(hoodie, "var-4", 1),
    ],
    shippingCost: 50000,
    discount: 0,
    status: "pending",
    createdAt: "2026-11-06T09:30:00",
  }),
  createOrder({
    id: "order-2",
    trackingCode: "PRN-10002",
    customer: {
      fullName: "سارا رضایی",
      phone: "09123456789",
    },
    shippingAddress: {
      province: "قم",
      city: "قم",
      address: "بلوار امین، کوچه ۸",
      postalCode: "3710000000",
    },
    items: [createItem(shirt, "var-6", 1)],
    shippingCost: 40000,
    discount: 50000,
    status: "processing",
    createdAt: "2026-11-05T16:20:00",
  }),
  createOrder({
    id: "order-3",
    trackingCode: "PRN-10003",
    customer: {
      fullName: "محمد کریمی",
      phone: "09351234567",
    },
    shippingAddress: {
      province: "اصفهان",
      city: "اصفهان",
      address: "خیابان توحید، پلاک ۲۵",
      postalCode: "8150000000",
    },
    items: [
      createItem(tshirt, "var-2", 1),
      createItem(bag, "var-8", 1),
    ],
    shippingCost: 50000,
    discount: 0,
    status: "shipped",
    createdAt: "2026-11-04T12:15:00",
  }),
  createOrder({
    id: "order-4",
    trackingCode: "PRN-10004",
    customer: {
      fullName: "نگار احمدی",
      phone: "09129876543",
    },
    shippingAddress: {
      province: "فارس",
      city: "شیراز",
      address: "معالی‌آباد، خیابان پزشکان",
      postalCode: "7180000000",
    },
    items: [
      createItem(hoodie, "var-5", 2),
      createItem(shirt, "var-7", 1),
    ],
    shippingCost: 60000,
    discount: 100000,
    status: "delivered",
    createdAt: "2026-11-03T10:00:00",
  }),
  createOrder({
    id: "order-5",
    trackingCode: "PRN-10005",
    customer: {
      fullName: "رضا حسینی",
      phone: "09121112233",
    },
    shippingAddress: {
      province: "تهران",
      city: "کرج",
      address: "گوهردشت، خیابان اصلی",
      postalCode: "3150000000",
    },
    items: [createItem(tshirt, "var-3", 1)],
    shippingCost: 50000,
    discount: 0,
    status: "delivered",
    createdAt: "2026-11-02T14:45:00",
  }),
  createOrder({
    id: "order-6",
    trackingCode: "PRN-10006",
    customer: {
      fullName: "مریم موسوی",
      phone: "09123334455",
    },
    shippingAddress: {
      province: "قم",
      city: "قم",
      address: "خیابان صفائیه، کوچه ۴",
      postalCode: "3710000001",
    },
    items: [createItem(bag, "var-8", 1)],
    shippingCost: 40000,
    discount: 0,
    status: "cancelled",
    createdAt: "2026-11-01T11:10:00",
  }),
];