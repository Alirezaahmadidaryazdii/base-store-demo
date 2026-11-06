import type { OrderStatusSummary } from "@/types/dashboard";
import { storeConfig } from "@/config/store.config";

interface OrderOverviewProps {
  data: OrderStatusSummary[];
}

export function OrderOverview({ data }: OrderOverviewProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  const storeLocale = storeConfig.locale;
  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-6">
        <h2 className="font-bold text-foreground">وضعیت سفارش‌ها</h2>
        <p className="mt-1 text-sm text-muted">
          توزیع سفارش‌ها بر اساس وضعیت
        </p>
      </div>

      <div className="space-y-5">
        {data.map((item) => {
          const percentage = total > 0 ? (item.count / total) * 100 : 0;

          return (
            <div key={item.status}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-foreground">{item.label}</span>
                <span className="text-muted">
                  {item.count.toLocaleString(storeLocale)}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-border pt-4 text-sm text-muted">
        مجموع سفارش‌ها:
        <span className="mr-2 font-bold text-foreground">
          {total.toLocaleString(storeLocale)}
        </span>
      </div>
    </section>
  );
}