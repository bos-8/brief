// @file: apps/web/src/app/[locale]/not-found.tsx
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section
      className="not-found-bg relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 py-8 font-mono"
    >
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-3xl rounded-3xl bg-black/45 p-7 text-center text-white shadow-2xl backdrop-blur-lg md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Error 404</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-white/90 md:text-base">
          The page you are looking for does not exist or was moved to another location.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-w-28 items-center justify-center rounded-md bg-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/30"
          >
            Main
          </Link>
          <Link
            href="/pl"
            className="inline-flex min-w-28 items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Home PL
          </Link>
          <Link
            href="/en"
            className="inline-flex min-w-28 items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Home EN
          </Link>
        </div>
      </div>
    </section>
  );
}
