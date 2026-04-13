// @file: apps/web/src/components/layout/NavbarLinks.tsx
"use client";

import { Fragment } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { NavbarLinksProps } from "@/schema/navigation";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavbarLinks({ items, mobile = false }: NavbarLinksProps) {
  const pathname = usePathname();

  const linkBase = [
    "relative shrink-0 rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
    "bg-transparent",
    "hover:bg-muted/60 hover:text-foreground",
  ].join(" ");

  if (mobile) {
    return (
      <nav className="flex flex-wrap items-center gap-1 pb-1">
        {items.map((item, index) => {
          const active = isActive(pathname, item.href);

          return (
            <Fragment key={item.href}>
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="h-4 w-px shrink-0 rounded-full bg-border"
                />
              ) : null}
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  linkBase,
                  active ? "text-foreground" : "text-foreground/80",
                  active
                    ? "after:absolute after:inset-x-1 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent"
                    : "",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </Fragment>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {items.map((item, index) => {
        const active = isActive(pathname, item.href);

        return (
          <Fragment key={item.href}>
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="h-4 w-px shrink-0 rounded-full bg-border"
              />
            ) : null}
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={[
                linkBase,
                active ? "bg-muted text-foreground" : "text-foreground/80",
                active
                  ? "after:absolute after:inset-x-1 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent"
                  : "",
              ].join(" ")}
            >
              {item.label}
            </Link>
          </Fragment>
        );
      })}
    </nav>
  );
}
