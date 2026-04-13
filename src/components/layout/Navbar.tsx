// @file: apps/web/src/components/layout/Navbar.tsx
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ThemeControls } from "@/components/ui/ThemeControls";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { NavbarLinks } from "@/components/layout/NavbarLinks";
import type { NavItem } from "@/schema/navigation";

type NavbarProps = {
};

export async function Navbar() {
  const t = await getTranslations("common.navbar");
  const navItems = [{ label: t("home"), href: "/" }];

  return (
    <header className="sticky top-0 z-80 border-b border-border bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2">
        <div className="flex items-center gap-6">
          <Link href="/" className="inline-flex items-center" aria-label={t("brand")}>
            <Image src="/logo.png" alt="" width={132} height={54} priority className="h-8 w-auto object-contain" />
          </Link>

          <NavbarLinks items={navItems} />
        </div>

        <div className="flex items-center gap-2">
          <LocaleSwitcher variant="icon" />
          <ThemeControls variant="icon" />
        </div>
      </div>

      {/* Mobile nav (simple) */}
      <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden">
        <NavbarLinks items={navItems} mobile />
      </div>

    </header>
  );
}

