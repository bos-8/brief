// @file: src/components/layout/SubpageControls.tsx
"use client";

import { HouseDoor } from "react-bootstrap-icons";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Tooltip } from "@/components/ui/Tooltip";
import { ThemeControls } from "@/components/ui/ThemeControls";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { Button } from "@/components/ui/Button";
import styles from "./SubpageControls.module.css";

export function SubpageControls() {
  const t = useTranslations("common.navbar");

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Tooltip content={t("home")} placement="bottom">
          <span className="inline-flex">
            <Link href="/" aria-label={t("home")} className={styles.homeButtonLink}>
              <Button
                aria-hidden="true"
                tabIndex={-1}
                tone="main"
                className="h-8 min-w-8 px-0"
              >
                <HouseDoor size={14} className="shrink-0" />
              </Button>
            </Link>
          </span>
        </Tooltip>

        <LocaleSwitcher variant="icon" />
        <ThemeControls variant="icon" />
      </div>
    </div>
  );
}
