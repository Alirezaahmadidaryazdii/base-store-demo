import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { CartProvider } from "@/components/providers/cart-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/Toaster";

const pelak = localFont({
  src: [
    {
      path: "../../public/Fonts/Pelak/Pelak-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Pelak/Pelak-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Pelak/Pelak-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/Fonts/Pelak/Pelak-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pelak",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PARNA | فروشگاه آنلاین",
  description: "فروشگاه آنلاین PARNA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={pelak.variable}>
        <ThemeProvider>
          <CartProvider>
            <main className="pb-28 lg:pb-0">{children}</main>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
