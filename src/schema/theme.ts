// @file: apps/web/src/schemas/theme.ts
export enum AppTheme {
  LIGHT = "light",
  DARK = "dark",
}

export const THEME_COOKIE_NAME = "ui_theme";

export function isAppTheme(value: unknown): value is AppTheme {
  return value === AppTheme.LIGHT || value === AppTheme.DARK;
}

export function normalizeTheme(value: unknown, fallback: AppTheme = AppTheme.LIGHT): AppTheme {
  return isAppTheme(value) ? value : fallback;
}
