import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";
import { AdminAuthGuard } from "@/components/layout/admin-auth-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div dir="rtl" className="min-h-screen bg-background">
        <AdminSidebar />

        <div className="mr-[260px] min-h-screen">
          <AdminHeader />

          <main className="p-6">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}