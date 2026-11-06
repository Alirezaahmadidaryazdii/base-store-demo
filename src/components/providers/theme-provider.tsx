
"use client";

import type { CSSProperties, ReactNode } from "react";
import { storeConfig } from "@/config/store.config";

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const theme = storeConfig.theme;

  const themeVariables = {
    "--color-primary": theme.primary,
    "--color-primary-hover": theme.primaryHover,
    "--color-secondary": theme.secondary,
    "--color-background": theme.background,
    "--color-foreground": theme.foreground,
    "--color-surface": theme.surface,
    "--color-accent": theme.accent,
    "--color-muted": theme.muted,
    "--color-border": theme.border,
  } as CSSProperties;

  return (
    <div
      dir={storeConfig.direction}
      lang={storeConfig.locale}
      style={themeVariables}
      className="min-h-screen"
    >
      {children}
    </div>
  );
}
