
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ShoppingBag,
  Clock3,
  Truck,
  CheckCircle2,
} from "lucide-react";

import type { Order, OrderStatus } from "@/types/order";
import { orders as mockOrders } from "@/data/mock/orders";
import { storeConfig } from "@/config/store.config";

import { OrderFilters } from "@/components/admin/orders/order-filters";
import { OrdersTable } from "@/components/admin/orders/orders-table";
import { OrderDetailsModal } from "@/components/admin/orders/order-details-modal";

const STORAGE_KEY = "parna-admin-orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isLoaded, setIsLoaded] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setOrders(parsed as Order[]);
        }
      }
    } catch {
      console.error("Failed to load orders from localStorage.");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders, isLoaded]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchTerm = search.trim().toLowerCase();

      const matchesSearch =
        !searchTerm ||
        order.trackingCode.toLowerCase().includes(searchTerm) ||
        order.customer.fullName.toLowerCase().includes(searchTerm) ||
        order.customer.phone.includes(searchTerm);

      const matchesStatus =
        status === "all" || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  const pendingCount = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const processingCount = orders.filter(
    (order) => order.status === "processing"
  ).length;

  const shippedCount = orders.filter(
    (order) => order.status === "shipped"
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status === "delivered")
    .reduce((total, order) => total + order.total, 0);

  const formatter = new Intl.NumberFormat(storeConfig.locale);

  function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );

    setSelectedOrder((current) =>
      current?.id === orderId
        ? { ...current, status: newStatus }
        : current
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">مدیریت سفارش‌ها</h1>
        <p className="mt-2 text-sm text-muted">
          سفارش‌های ثبت‌شده در فروشگاه {storeConfig.name} را مدیریت کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="کل سفارش‌ها"
          value={orders.length}
          icon={<ShoppingBag size={20} />}
        />

        <StatCard
          title="در انتظار پرداخت"
          value={pendingCount}
          icon={<Clock3 size={20} />}
        />

        <StatCard
          title="در حال پردازش و ارسال"
          value={processingCount + shippedCount}
          icon={<Truck size={20} />}
        />

        <StatCard
          title="تحویل شده"
          value={deliveredCount}
          icon={<CheckCircle2 size={20} />}
        />
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <p className="text-sm text-muted">
          مجموع درآمد سفارش‌های تحویل‌شده
        </p>

        <p className="mt-3 text-2xl font-bold tabular-nums">
          {formatter.format(totalRevenue)}
          <span className="mr-2 text-sm font-normal text-muted">
            {storeConfig.currency}
          </span>
        </p>
      </div>

      <OrderFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <div className="flex items-center justify-between">
        <h2 className="font-semibold">لیست سفارش‌ها</h2>

        <span className="text-sm text-muted">
          {formatter.format(filteredOrders.length)} سفارش
        </span>
      </div>

      <OrdersTable
        orders={filteredOrders}
        onView={setSelectedOrder}
      />

      <OrderDetailsModal
        open={Boolean(selectedOrder)}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{title}</span>

        <span className="rounded-lg bg-primary/10 p-2 text-primary">
          {icon}
        </span>
      </div>

      <p className="mt-4 text-2xl font-bold tabular-nums">{value}</p>
    </div>
  );
}
