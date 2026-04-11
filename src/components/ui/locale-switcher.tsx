// @file: src/components/ui/locale-switcher.tsx
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

type LocaleSwitcherProps = {
  currentLocale: AppLocale;
  href: string;
  label: string;
  className?: string;
  linkClassName?: string;
};

export default function LocaleSwitcher({
  currentLocale,
  href,
  label,
  className,
  linkClassName,
}: LocaleSwitcherProps) {
  return (
    <nav aria-label={label} className={className ?? "flex items-center gap-2"}>
      {routing.locales.map((locale) => {
        const isActive = locale === currentLocale;
        const stateClassName = linkClassName
          ? isActive
            ? "presentation-control-link--active"
            : "presentation-control-link--muted"
          : isActive
            ? "bg-accent text-accent-foreground"
            : "border border-border bg-card/78 text-muted-foreground hover:border-accent/45 hover:text-foreground";

        return (
          <Link
            key={locale}
            href={href}
            locale={locale}
            className={`${linkClassName ?? "rounded-full px-4 py-2 text-sm font-medium transition"} ${stateClassName}`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
