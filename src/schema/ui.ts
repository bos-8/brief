// @file: apps/web/src/schemas/ui.ts
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonTone = "main" | "accent";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  tone?: ButtonTone;
  colorClass?: string;
};

export type PanelVariant = "glass" | "soft";

export type PanelProps = ComponentPropsWithoutRef<"section"> & {
  variant?: PanelVariant;
};

export type ThemeControlsVariant = "default" | "icon";

export type ThemeControlsProps = {
  variant?: ThemeControlsVariant;
};

export type LocaleSwitcherVariant = "full" | "icon";

export type LocaleSwitcherProps = {
  variant?: LocaleSwitcherVariant;
};

export type PopupProps = {
  children?: ReactNode;
  onClose: () => void;
  ariaLabel?: string;
  closeButtonAriaLabel?: string;
  title?: ReactNode;
  content?: ReactNode;
  actions?: ReactNode;
  disableClose?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
};
