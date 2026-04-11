// @file: src/components/layout/presentation-controls.tsx
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import LocaleSwitcher from "@/components/ui/locale-switcher";
import ThemeToggle from "@/components/ui/theme-toggle";

type PresentationControlsProps = {
  locale: AppLocale;
  currentPath: string;
  switcherLabel: string;
  themeLabel: string;
  printHref: string;
  printLabel: string;
};

export default function PresentationControls({
  locale,
  currentPath,
  switcherLabel,
  themeLabel,
  printHref,
  printLabel,
}: PresentationControlsProps) {
  return (
    <div className="presentation-control-dock">
      <LocaleSwitcher
        currentLocale={locale}
        href={currentPath}
        label={switcherLabel}
        className="presentation-control-group"
        linkClassName="presentation-control-link"
      />
      <ThemeToggle
        label={themeLabel}
        className="presentation-control-link presentation-theme-toggle"
      />
      <Link href={printHref} locale={locale} className="presentation-control-link">
        {printLabel}
      </Link>
    </div>
  );
}
