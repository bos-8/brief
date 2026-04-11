// @file: src/components/ui/theme-toggle.tsx
"use client";

import { MoonStars, Sun } from "react-bootstrap-icons";
import { useState } from "react";
import type { Theme } from "@/types/theme";

const THEME_STORAGE_KEY = "theme";

function getThemeFromDocument(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.body.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

type ThemeToggleProps = {
  label: string;
  className?: string;
};

export default function ThemeToggle({ label, className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document === "undefined" ? "light" : getThemeFromDocument(),
  );

  function handleToggle() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={label}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full border border-border bg-card/85 px-4 py-2 text-sm font-medium text-card-foreground transition hover:border-accent/45 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      }
    >
      {theme === "light" ? (
        <MoonStars className="size-4" />
      ) : (
        <Sun className="size-4" />
      )}
      <span>{theme === "light" ? "Dark" : "Light"}</span>
    </button>
  );
}
