// @file: apps/web/src/schemas/app.ts
export type LocaleParams = {
  locale: string;
};

export type LocalePageProps = {
  params: Promise<LocaleParams>;
};

export type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<LocaleParams>;
};
