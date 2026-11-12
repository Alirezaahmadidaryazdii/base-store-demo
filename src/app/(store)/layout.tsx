
import { Suspense } from "react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <main>{children}</main>

      <Footer />
    </div>
  );
}
