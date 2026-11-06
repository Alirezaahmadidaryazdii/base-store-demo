import { storeConfig } from "@/config/store.config";
import { getDashboardData } from "@/services/dashboard.service";

import { StatsCards } from "@/components/admin/dashboard/stats-cards";
import { OrderOverview } from "@/components/admin/dashboard/order-overview";
import { RecentOrders } from "@/components/admin/dashboard/recent-orders";
import { TopProducts } from "@/components/admin/dashboard/top-products";

export default async function AdminDashboardPage() {
  const dashboard = await getDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          داشبورد {storeConfig.name}
        </h1>

        <p className="mt-2 text-sm text-muted">
          {storeConfig.description}
        </p>
      </div>

      <StatsCards stats={dashboard.stats} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <OrderOverview data={dashboard.orderOverview} />
        <TopProducts products={dashboard.topProducts} />
      </div>

      <RecentOrders orders={dashboard.recentOrders} />
    </div>
  );
}