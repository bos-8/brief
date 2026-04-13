// @file: apps/web/src/schemas/navigation.ts
export type NavItem = {
  label: string;
  href: string;
};

export type NavbarLinksProps = {
  items: NavItem[];
  mobile?: boolean;
};
