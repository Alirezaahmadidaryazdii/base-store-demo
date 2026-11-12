
"use client";

import { useEffect, useState } from "react";

import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";
import { AdminAuthGuard } from "@/components/layout/admin-auth-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <AdminAuthGuard>
      <div dir="rtl" className="min-h-screen overflow-x-hidden bg-background">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="mr-0 min-h-screen lg:mr-[260px]">
          <AdminHeader
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          <main className="pt-[68px] sm:pt-[76px]">
            <div className="p-3 sm:p-4 lg:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
