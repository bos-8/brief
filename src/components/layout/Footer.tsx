// @file: apps/web/src/components/layout/Footer.tsx
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ThemeControls } from "@/components/ui/ThemeControls";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
const logoSrc =
  `${BASE_PATH ? (BASE_PATH.startsWith("/") ? BASE_PATH : `/${BASE_PATH}`) : ""}/logo.png`;

export async function Footer() {
  const t = await getTranslations("common.footer");
  const year = new Date().getFullYear();
  const licenseText = t("license", { year });

  return (
    <footer className="relative z-20 border-t border-border bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1">
        <div className="flex items-center gap-3">
          <Image src={logoSrc} alt="" width={132} height={54} className="h-7 w-auto object-contain opacity-90" />
          <p className="text-sm text-foreground/70">{licenseText}</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeControls />
          <LocaleSwitcher variant="full" />
        </div>
      </div>
    </footer>
  );
}
