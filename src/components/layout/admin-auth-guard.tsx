  "use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("parna-admin-auth") === "true";

    if (!isAuthenticated) {
      router.replace("/admin/login");
      return;
    }

    setIsAuthorized(true);
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted">در حال بررسی دسترسی...</p>
      </div>
    );
  }

  return <>{children}</>;
}