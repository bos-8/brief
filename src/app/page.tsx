// @file: src/app/page.tsx
import LocaleEntry from "@/components/layout/locale-entry";
import { siteConfig } from "@/lib/site";

const localeCards = [
  {
    locale: "pl",
    title: "Polski",
    description:
      "Wersja dla odbiorcy lokalnego z małym landing page i prezentacją slajdową bez scrolla.",
  },
  {
    locale: "en",
    title: "English",
    description:
      "Version for international readers with a small landing page and a slide-based presentation flow.",
  },
] as const;

export default function Home() {
  return (
    <LocaleEntry
      siteName={siteConfig.name}
      eyebrow="PL / EN"
      title="Static scientific deck with a dedicated landing page and slide routing."
      lead="Wybierz wersję językową. Każda prowadzi do osobnego landingu, a właściwa prezentacja działa pod routem `presentation/slide/[id]` bez pionowego scrolla."
      localeCards={localeCards}
      themeLabel="Change theme"
    />
  );
}
