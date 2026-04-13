// @file: apps/web/src/components/ui/ThemeControls.tsx
"use client";

import { useTranslations } from "next-intl";
import type { ThemeControlsProps } from "@/schema/ui";
import {
  AppTheme,
  isAppTheme,
  THEME_COOKIE_NAME,
} from "@/schema/theme";
import { MoonStars, Sun } from "react-bootstrap-icons";
import { Tooltip } from "@/components/ui/Tooltip";
import { useEffect, useState, useTransition } from "react";

const THEME_CHANGED_EVENT = "brief:themechange";

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const m = document.cookie.match(new RegExp(`(?:^|; )${escapeRegExp(name)}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;

  const secure = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie =
    `${name}=${encodeURIComponent(value)}; ` +
    `Max-Age=31536000; Path=/; SameSite=Lax` +
    (secure ? "; Secure" : "");
}

function emitThemeChange(theme: AppTheme): void {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent(THEME_CHANGED_EVENT, { detail: theme }));
}

function applyTheme(theme: AppTheme) {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.theme = theme;
  setCookie(THEME_COOKIE_NAME, theme);
  emitThemeChange(theme);
}

function resolveInitialTheme(): AppTheme {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return AppTheme.LIGHT;
  }

  const root = document.documentElement;

  const cookieTheme = getCookie(THEME_COOKIE_NAME);
  if (isAppTheme(cookieTheme)) return cookieTheme;

  const dataTheme = root.dataset.theme;
  if (isAppTheme(dataTheme)) return dataTheme;

  // optional fallback: system preference (only if nothing else is set)
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? AppTheme.DARK
    : AppTheme.LIGHT;
}

export function ThemeControls({ variant = "default" }: ThemeControlsProps) {
  const t = useTranslations("common.theme");
  const [theme, setTheme] = useState<AppTheme>(() => resolveInitialTheme());
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const syncTheme = () => {
      const nextTheme = document.documentElement.dataset.theme;
      if (isAppTheme(nextTheme)) {
        setTheme(nextTheme);
      }
    };

    const onThemeChanged = (event: Event) => {
      const detailTheme = (event as CustomEvent).detail;
      if (isAppTheme(detailTheme)) {
        setTheme(detailTheme);
      }
    };

    syncTheme();
    window.addEventListener(THEME_CHANGED_EVENT, onThemeChanged);
    return () => window.removeEventListener(THEME_CHANGED_EVENT, onThemeChanged);
  }, []);

  function toggleTheme() {
    if (isPending) return;

    const next: AppTheme = theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;
    startTransition(() => {
      setTheme(next);
    });
    applyTheme(next);
  }

  if (variant === "icon") {
    return (
      <Tooltip content={t("toggle")} placement="bottom">
        <button
          onClick={toggleTheme}
          disabled={isPending}
          type="button"
          aria-label={t("toggle")}
          className="theme-control inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm text-foreground shadow-sm transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
        >
          <MoonStars size={16} className="theme-toggle__moon shrink-0" />
          <Sun size={16} className="theme-toggle__sun shrink-0" />
        </button>
      </Tooltip>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Tooltip content={t("toggle")}>
        <button
          onClick={toggleTheme}
          disabled={isPending}
          type="button"
          aria-label={t("toggle")}
          className="theme-control inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-foreground shadow-sm transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
        >
          <MoonStars size={16} className="theme-toggle__moon shrink-0" />
          <Sun size={16} className="theme-toggle__sun shrink-0" />
          <span className="theme-toggle__label-dark">{t("dark")}</span>
          <span className="theme-toggle__label-light">{t("light")}</span>
        </button>
      </Tooltip>
    </div>
  );
}
