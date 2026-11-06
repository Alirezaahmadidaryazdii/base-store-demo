"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      dir="rtl"
      richColors
      closeButton
      duration={3500}
      visibleToasts={3}
      expand={false}
    />
  );
}