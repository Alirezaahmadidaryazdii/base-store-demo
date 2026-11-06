import { storeConfig } from "@/config/store.config";
import type { DashboardStats } from "@/types/dashboard";

interface StatsCardsProps {
  stats: DashboardStats;
}

const numberFormatter = new Intl.NumberFormat(storeConfig.locale);

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "کل سفارش‌ها",
      value: numberFormatter.format(stats.totalOrders),
      description: "تمام سفارش‌های ثبت‌شده",
    },
    {
      title: "سفارش‌های در انتظار",
      value: numberFormatter.format(stats.pendingOrders),
      description: "نیازمند بررسی",
    },
    {
      title: "محصولات فعال",
      value: numberFormatter.format(stats.activeProducts),
      description: "محصولات فعال فروشگاه",
    },
    {
      title: "تنوع کم‌موجودی",
      value: numberFormatter.format(stats.lowStockVariants),
      description: `${numberFormatter.format(stats.totalStock)} عدد موجودی کل`,
    },
    {
      title: "ارزش سفارش‌ها",
      value: `${numberFormatter.format(stats.orderValue)} ${storeConfig.currency}`,
      description: "مجموع سفارش‌های لغونشده",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-border bg-surface p-5"
        >
          <p className="text-sm text-muted">{card.title}</p>

          <p className="mt-4 text-2xl font-bold text-foreground">
            {card.value}
          </p>

          <p className="mt-2 text-xs text-muted">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}