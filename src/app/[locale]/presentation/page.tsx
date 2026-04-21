// @file: src/app/[locale]/presentation/page.tsx
import { Fragment, type ComponentType, type ReactNode, type SVGProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Activity,
  ArrowRight,
  BarChartLine,
  BoundingBoxCircles,
  CheckCircle,
  Check2Circle,
  Cpu,
  Database,
  Diagram3,
  ExclamationTriangle,
  FileEarmarkLock2,
  FileText,
  Gear,
  HeartPulse,
  Hexagon,
  Hospital,
  Layers,
  People,
  Person,
  Robot,
  Server,
  ShieldLock,
  Stars,
  XCircle,
} from "react-bootstrap-icons";
import { getPresentationDeck } from "@/content/presentationDeck";
import { SubpageControls } from "@/components/layout/SubpageControls";
import { PresentationBackdrop } from "@/components/presentation/PresentationBackdrop";
import { PresentationModeButton } from "@/components/presentation/PresentationModeButton";
import { Slide, slideDeckClassName } from "@/components/presentation/Slide";
import { SlideIndicators } from "@/components/presentation/SlideIndicators";
import { SlideKeyboardNavigation } from "@/components/presentation/SlideKeyboardNavigation";
import { PresentationWordmark } from "@/components/presentation/PresentationWordmark";
import { PodcastControls } from "@/components/ui/PodcastControls";
import { routing } from "@/i18n/routing";
import type { LocalePageProps } from "@/schema/app";
import { isAppLocale } from "@/schema/i18n";
import styles from "./page.module.css";

type SlideItem = {
  id: string;
  index: number;
  title: string;
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = repositoryName ? `/${repositoryName}` : "";
const presentationPodcastSrc = `${basePath}/presentation.mp3`;

const titleClass = `${styles["type-2"]} text-foreground`;
const cardTitleClass = `${styles["type-3"]} text-foreground`;
const subTitleClass = `${styles["type-4"]} text-foreground`;
const bodyClass = `${styles["type-4"]} text-foreground/85`;
const smallBodyClass = `${styles["type-5"]} text-foreground/70`;
const eyebrowClass = `${styles["type-6"]} ${styles.overline} ${styles.tagContrast}`;
const metaLabelClass = `${styles["type-6"]} ${styles.overline} ${styles.tagContrast}`;
const mutedLabelClass = `${styles["type-5"]} ${styles.overline} text-slate-400`;
const mainTextClass = "text-foreground";
const panelClass =
  "rounded-[1.6rem] border border-white/12 bg-slate-950/60 p-5 shadow-[0_18px_50px_rgba(2,6,23,0.28)] backdrop-blur-sm";
const darkCardClass =
  "rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(10,15,30,0.92))] p-5 text-slate-100 shadow-[0_16px_40px_rgba(2,6,23,0.32)]";

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function SlideEyebrow({ children }: { children: ReactNode }) {
  return <p className={eyebrowClass}>{children}</p>;
}

function SlideHeadline({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-4xl">
      <SlideEyebrow>{eyebrow}</SlideEyebrow>
      <h1 className={cx("mt-3", titleClass)}>{title}</h1>
      {subtitle ? <p className={cx("mt-4 max-w-3xl", bodyClass)}>{subtitle}</p> : null}
    </div>
  );
}

function Surface({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx(panelClass, className)}>{children}</div>;
}

function DarkCard({
  icon: Icon,
  title,
  body,
  className,
}: {
  icon: IconComponent;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={cx(darkCardClass, className)}>
      <div className="flex items-center gap-3">
        <div className="rounded-full border border-cyan-400/35 bg-cyan-400/12 p-2 text-cyan-200">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className={cardTitleClass}>{title}</h2>
      </div>
      <p className={cx("mt-4", bodyClass)}>{body}</p>
    </div>
  );
}

function NumberedCard({
  index,
  title,
  body,
  tone = "cyan",
  className,
}: {
  index: number;
  title: string;
  body: string;
  tone?: "cyan" | "amber" | "emerald";
  className?: string;
}) {
  const toneClasses =
    tone === "amber"
      ? "border-amber-400/25 bg-amber-500/10 text-amber-100"
      : tone === "emerald"
        ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-100"
        : "border-cyan-400/25 bg-cyan-500/10 text-cyan-100";

  return (
    <div className={cx(panelClass, toneClasses, className)}>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-current/35 text-sm font-bold">
          {String(index).padStart(2, "0")}
        </div>
        <h2 className={subTitleClass}>{title}</h2>
      </div>
      <p className={cx("mt-3", styles["type-4"], "text-current/85")}>{body}</p>
    </div>
  );
}

function MiniMetric({
  icon: Icon,
  label,
  className,
}: {
  icon: IconComponent;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "inline-flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1.5 text-slate-200",
        styles["type-6"],
        styles.overline,
        styles.pill,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
  );
}

function BulletCards({
  items,
  tone = "default",
}: {
  items: readonly string[];
  tone?: "default" | "danger" | "success";
}) {
  const toneClass =
    tone === "danger"
      ? "border-red-400/18 bg-red-500/10 text-red-100"
      : tone === "success"
        ? "border-emerald-400/18 bg-emerald-500/10 text-emerald-100"
        : "border-white/10 bg-white/5 text-slate-200";

  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <div key={item} className={cx("rounded-[1rem] border px-4 py-3", styles["type-4"], toneClass)}>
          {item}
        </div>
      ))}
    </div>
  );
}

function EquationNode({
  icon: Icon,
  label,
  accent = "cyan",
}: {
  icon: IconComponent;
  label: string;
  accent?: "cyan" | "emerald" | "violet";
}) {
  const accentClass =
    accent === "emerald"
      ? "border-emerald-400/35 bg-emerald-500/12 text-emerald-100"
      : accent === "violet"
        ? "border-fuchsia-400/35 bg-fuchsia-500/12 text-fuchsia-100"
        : "border-cyan-400/35 bg-cyan-500/12 text-cyan-100";

  return (
    <div className={cx("flex flex-col items-center gap-3 rounded-[1.45rem] border px-5 py-5 text-center", accentClass)}>
      <div className="rounded-full border border-current/30 p-3">
        <Icon className="h-7 w-7" />
      </div>
      <span className={cx(styles["type-6"], styles.overline)}>{label}</span>
    </div>
  );
}

function GoalNode({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[999px] border border-cyan-300/30 bg-cyan-400/10 px-5 py-5 text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/14 text-cyan-100">
        <CheckCircle className="h-5 w-5" />
      </div>
      <h2 className={subTitleClass}>{title}</h2>
      <p className={cx("mt-2", smallBodyClass)}>{body}</p>
    </div>
  );
}

function ToneColumn({
  tone,
  label,
  body,
  icon: Icon,
}: {
  tone: "civil" | "military";
  label: string;
  body: string;
  icon: IconComponent;
}) {
  const toneClass =
    tone === "civil"
      ? "border-emerald-400/26 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.24),transparent_46%),linear-gradient(180deg,rgba(6,22,17,0.98),rgba(6,18,15,0.92))]"
      : "border-red-400/26 bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.24),transparent_46%),linear-gradient(180deg,rgba(33,12,18,0.98),rgba(22,7,12,0.94))]";

  return (
    <div className={cx("flex h-full flex-col justify-between rounded-[1.65rem] border p-5 text-white", toneClass)}>
      <div className="flex items-center gap-3">
        <div className="rounded-full border border-white/15 bg-white/8 p-3">
          <Icon className="h-6 w-6" />
        </div>
        <p className={cx(styles["type-6"], styles.overline, "text-white/80")}>{label}</p>
      </div>
      <p className={cx("mt-6", cardTitleClass)}>{body}</p>
      <div className={cx("mt-8 h-px w-full bg-white/14", styles.stream)} />
    </div>
  );
}

function ComparisonCell({
  title,
  items,
  tone,
}: {
  title: string;
  items: readonly string[];
  tone: "eu" | "us";
}) {
  const toneClass =
    tone === "eu"
      ? "border-emerald-400/26 bg-emerald-500/10"
      : "border-amber-400/26 bg-amber-500/10";

  return (
    <div className={cx("rounded-[1.25rem] border p-4 text-slate-100", toneClass)}>
      <p className={cx(styles["type-6"], styles.overline, "text-white/74")}>{title}</p>
      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <div key={item} className={cx("rounded-[0.95rem] border border-white/10 bg-black/15 px-3 py-2 text-slate-200", styles["type-4"])}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function LayerLegendCard({
  index,
  title,
  body,
  colorClass,
}: {
  index: number;
  title: string;
  body: string;
  colorClass: string;
}) {
  return (
    <div className={cx(panelClass, "flex items-start gap-3")}>
      <div className={cx("mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold", colorClass)}>
        {index}
      </div>
      <div>
        <h2 className={subTitleClass}>{title}</h2>
        <p className={cx("mt-2", smallBodyClass)}>{body}</p>
      </div>
    </div>
  );
}

function HybridFigureVisual({
  overlays,
  callouts,
}: {
  overlays: readonly string[];
  callouts: readonly string[];
}) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_20%_18%,rgba(16,185,129,0.18),transparent_26%),radial-gradient(circle_at_85%_18%,rgba(56,189,248,0.18),transparent_25%),linear-gradient(180deg,rgba(7,12,24,0.96),rgba(8,12,20,0.88))] p-4",
        styles.zoomIn,
      )}
    >
      <div className={cx("absolute inset-0 opacity-35", styles.gridGlow)} />
      <svg viewBox="0 0 620 720" className="relative z-10 h-full w-full">
        <defs>
          <linearGradient id="organicStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#99f6e4" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="mechStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <circle cx="310" cy="120" r="72" fill="rgba(15,23,42,0.75)" stroke="url(#organicStroke)" strokeWidth="3" />
        <path d="M238 86 C258 52 302 38 342 50 C318 92 318 146 342 190 C298 196 254 162 238 86 Z" fill="rgba(16,185,129,0.18)" stroke="url(#organicStroke)" strokeWidth="3" />
        <path d="M342 50 C384 60 410 96 408 142 C406 176 390 206 360 224 L348 224 C324 176 324 92 342 50 Z" fill="rgba(56,189,248,0.18)" stroke="url(#mechStroke)" strokeWidth="3" />
        <path d="M232 228 C252 186 372 186 392 228 L430 406 C440 456 416 552 354 610 L324 638 L296 638 L268 610 C204 552 182 458 194 404 Z" fill="rgba(15,23,42,0.58)" stroke="#dbeafe" strokeOpacity="0.18" strokeWidth="2.5" />
        <path d="M226 242 C240 208 298 200 310 204 C262 280 254 426 284 600 C244 568 214 502 210 424 Z" fill="rgba(16,185,129,0.16)" stroke="url(#organicStroke)" strokeWidth="3" />
        <path d="M310 204 C354 204 384 218 398 246 C412 312 414 436 336 600 C378 568 412 506 420 430 L430 328 C432 290 422 260 398 238 C376 216 344 204 310 204 Z" fill="rgba(56,189,248,0.16)" stroke="url(#mechStroke)" strokeWidth="3" />
        <path d="M310 50 L310 638" stroke="#e2e8f0" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="8 10" />
        <path d="M140 180 L248 180" stroke="#94a3b8" strokeOpacity="0.6" strokeWidth="1.6" />
        <path d="M372 180 L492 140" stroke="#94a3b8" strokeOpacity="0.6" strokeWidth="1.6" />
        <path d="M158 508 L254 522" stroke="#94a3b8" strokeOpacity="0.6" strokeWidth="1.6" />
        <circle cx="248" cy="180" r="5" fill="#99f6e4" />
        <circle cx="372" cy="180" r="5" fill="#67e8f9" />
        <circle cx="254" cy="522" r="5" fill="#99f6e4" />
      </svg>
      <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
        {overlays.map((item, index) => (
          <div
            key={item}
            className={cx(
              "rounded-full border border-white/12 bg-black/35 px-3 py-1 text-slate-100 backdrop-blur-sm",
              styles["type-6"],
              styles.overline,
              styles.pill,
              styles.popIn,
              index === 0 ? styles.delay1 : index === 1 ? styles.delay2 : styles.delay3,
            )}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="absolute left-4 right-4 bottom-4 z-20 grid gap-2 sm:grid-cols-3">
        {callouts.map((item, index) => (
          <div
            key={item}
            className={cx(
              "rounded-[1rem] border border-white/10 bg-black/30 px-3 py-2 text-slate-200",
              styles["type-6"],
              styles.fadeUp,
              index === 0 ? styles.delay2 : index === 1 ? styles.delay3 : styles.delay4,
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function BiasChartVisual() {
  return (
    <div className={cx(panelClass, "relative overflow-hidden")}>
      <div className="mb-4 flex items-center justify-between">
        <MiniMetric icon={Activity} label="Need vs cost proxy" />
        <span className={mutedLabelClass}>algorithmic gap</span>
      </div>
      <svg viewBox="0 0 460 220" className="h-[13rem] w-full">
        <path d="M40 180 H420" stroke="rgba(148,163,184,0.32)" strokeWidth="1.5" />
        <path d="M40 30 V180" stroke="rgba(148,163,184,0.32)" strokeWidth="1.5" />
        <path d="M48 164 C104 132 128 92 178 86 C230 80 280 42 416 46" fill="none" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
        <path d="M48 162 C112 152 154 132 194 126 C252 118 302 86 416 98" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="10 10" strokeLinecap="round" />
        <path d="M218 84 C246 94 256 108 266 122 C248 124 232 128 218 138 C204 128 198 112 218 84 Z" fill="rgba(248,113,113,0.25)" stroke="#f87171" strokeWidth="2.5" />
        <text x="60" y="52" fill="#22c55e" fontSize="13" fontWeight="700">real need</text>
        <text x="300" y="122" fill="#cbd5e1" fontSize="13" fontWeight="700">cost proxy</text>
        <text x="232" y="116" fill="#fda4af" fontSize="12" fontWeight="700">bias gap</text>
      </svg>
    </div>
  );
}

function PulseDeviceVisual() {
  return (
    <div className={cx(panelClass, "relative overflow-hidden")}>
      <div className="mb-4 flex items-center justify-between">
        <MiniMetric icon={HeartPulse} label="Input sensor" />
        <span className={mutedLabelClass}>measurement bias</span>
      </div>
      <svg viewBox="0 0 420 220" className="h-[13rem] w-full">
        <rect x="42" y="64" width="128" height="94" rx="24" fill="rgba(15,23,42,0.8)" stroke="rgba(148,163,184,0.42)" strokeWidth="3" />
        <rect x="146" y="86" width="94" height="52" rx="18" fill="rgba(15,23,42,0.86)" stroke="#67e8f9" strokeWidth="3" />
        <rect x="198" y="96" width="136" height="34" rx="17" fill="rgba(8,47,73,0.76)" stroke="#38bdf8" strokeWidth="3" />
        <path d="M214 113 H240 L248 102 L262 128 L274 113 H314" fill="none" stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="356" cy="104" r="14" fill="rgba(248,113,113,0.18)" stroke="#f87171" strokeWidth="3" />
        <circle cx="356" cy="104" r="7" fill="#f87171" />
        <path d="M94 72 C112 52 146 52 164 72" fill="none" stroke="#34d399" strokeWidth="3" strokeDasharray="8 8" />
        <text x="58" y="188" fill="#cbd5e1" fontSize="13" fontWeight="700">pulse oximeter input</text>
        <text x="300" y="184" fill="#fda4af" fontSize="12" fontWeight="700">risk at entry</text>
      </svg>
    </div>
  );
}

function GenomeLockVisual() {
  return (
    <div className={cx(panelClass, "relative overflow-hidden")}>
      <div className={cx("absolute inset-0 opacity-30", styles.gridGlow)} />
      <svg viewBox="0 0 460 360" className="relative z-10 h-full w-full">
        <rect x="144" y="140" width="176" height="142" rx="30" fill="rgba(15,23,42,0.88)" stroke="#67e8f9" strokeWidth="3" />
        <path d="M178 144 V110 C178 74 204 46 232 46 C260 46 286 74 286 110 V144" fill="none" stroke="#e2e8f0" strokeOpacity="0.74" strokeWidth="10" strokeLinecap="round" />
        <circle cx="232" cy="210" r="28" fill="rgba(6,78,59,0.22)" stroke="#22c55e" strokeWidth="3" />
        <path d="M160 56 C132 96 132 142 160 178 C188 214 188 260 160 300" fill="none" stroke="#34d399" strokeWidth="6" strokeLinecap="round" />
        <path d="M304 56 C332 96 332 142 304 178 C276 214 276 260 304 300" fill="none" stroke="#67e8f9" strokeWidth="6" strokeLinecap="round" />
        <path d="M160 88 C186 98 214 110 304 88" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="8 9" />
        <path d="M160 144 C186 154 214 166 304 144" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="8 9" />
        <path d="M160 208 C186 218 214 230 304 208" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="8 9" />
        <path d="M160 266 C186 276 214 288 304 266" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="8 9" />
        <g className={styles.pulseSlow}>
          <rect x="310" y="90" width="100" height="44" rx="22" fill="rgba(239,68,68,0.18)" stroke="#fb7185" strokeWidth="2.6" />
          <text x="360" y="118" textAnchor="middle" fill="#fecdd3" fontSize="14" fontWeight="700">risk tag</text>
        </g>
      </svg>
    </div>
  );
}

function LawAsCodeVisual() {
  return (
    <div className={cx(panelClass, "grid items-center gap-4 lg:grid-cols-[0.72fr_auto_0.88fr]")}>
      <svg viewBox="0 0 180 180" className="h-40 w-full">
        <rect x="36" y="98" width="96" height="24" rx="8" fill="rgba(51,65,85,0.92)" stroke="#cbd5e1" strokeOpacity="0.22" />
        <rect x="48" y="70" width="92" height="24" rx="8" fill="rgba(15,23,42,0.92)" stroke="#67e8f9" strokeOpacity="0.45" />
        <rect x="58" y="42" width="86" height="24" rx="8" fill="rgba(15,23,42,0.92)" stroke="#22c55e" strokeOpacity="0.45" />
        <text x="102" y="56" textAnchor="middle" fill="#dcfce7" fontSize="12" fontWeight="700">rights</text>
        <text x="94" y="84" textAnchor="middle" fill="#dbeafe" fontSize="12" fontWeight="700">regulation</text>
        <text x="84" y="112" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="700">standards</text>
      </svg>
      <div className="flex items-center justify-center">
        <div className={cx("relative h-2 w-24 rounded-full bg-cyan-400/20 lg:w-32", styles.stream)}>
          <ArrowRight className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-cyan-200" />
        </div>
      </div>
      <svg viewBox="0 0 200 180" className="h-40 w-full">
        <rect x="38" y="42" width="112" height="100" rx="18" fill="rgba(15,23,42,0.86)" stroke="#67e8f9" strokeWidth="2.8" />
        <rect x="56" y="62" width="76" height="14" rx="7" fill="rgba(103,232,249,0.18)" />
        <rect x="56" y="86" width="76" height="14" rx="7" fill="rgba(148,163,184,0.18)" />
        <rect x="56" y="110" width="76" height="14" rx="7" fill="rgba(34,197,94,0.18)" />
        <path d="M150 62 L170 52 L170 130 L150 120" fill="rgba(56,189,248,0.18)" stroke="#67e8f9" strokeWidth="2.5" />
        <text x="94" y="160" textAnchor="middle" fill="#dbeafe" fontSize="13" fontWeight="700">system constraints</text>
      </svg>
    </div>
  );
}

function LayerStackVisual() {
  const layers = [
    { y: 36, label: "Governance", fill: "rgba(56,189,248,0.18)", stroke: "#67e8f9" },
    { y: 72, label: "Decision", fill: "rgba(250,204,21,0.16)", stroke: "#facc15" },
    { y: 108, label: "Model", fill: "rgba(168,85,247,0.16)", stroke: "#c084fc" },
    { y: 144, label: "Data", fill: "rgba(34,197,94,0.16)", stroke: "#4ade80" },
  ] as const;

  return (
    <div className={cx(panelClass, "relative overflow-hidden")}>
      <svg viewBox="0 0 430 320" className="h-full w-full">
        {layers.map((layer, index) => (
          <g key={layer.label} className={cx(styles.fadeUp, index === 0 ? styles.delay1 : index === 1 ? styles.delay2 : index === 2 ? styles.delay3 : styles.delay4)}>
            <path d={`M88 ${layer.y} L288 ${layer.y} L344 ${layer.y + 24} L146 ${layer.y + 24} Z`} fill={layer.fill} stroke={layer.stroke} strokeWidth="2.4" />
            <path d={`M146 ${layer.y + 24} L344 ${layer.y + 24} L344 ${layer.y + 58} L146 ${layer.y + 58} Z`} fill="rgba(15,23,42,0.72)" stroke={layer.stroke} strokeOpacity="0.55" strokeWidth="2" />
            <text x="184" y={layer.y + 44} fill="#e2e8f0" fontSize="15" fontWeight="700">
              {layer.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function OversightVisual() {
  return (
    <div className={cx(panelClass, "relative overflow-hidden")}>
      <div className="absolute inset-x-6 top-1/2 h-[2px] -translate-y-1/2 bg-cyan-400/18" />
      <div className={cx("absolute inset-x-14 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-cyan-300/28", styles.stream)} />
      <div className="relative grid gap-5 md:grid-cols-[0.9fr_1fr_0.9fr]">
        {[
          { icon: Person, title: "Human oversight" },
          { icon: Diagram3, title: "Decision pipeline" },
          { icon: FileText, title: "Audit ticket" },
        ].map(({ icon: Icon, title }) => (
          <div key={title} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-400/12 text-cyan-100">
              <Icon className="h-6 w-6" />
            </div>
            <p className={cx("mt-3", subTitleClass)}>{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WearableHubVisual({ label }: { label: string }) {
  return (
    <div className={cx(panelClass, "relative overflow-hidden text-center")}>
      <div className={cx("absolute inset-0 opacity-25", styles.gridGlow)} />
      <svg viewBox="0 0 340 260" className={cx("relative z-10 mx-auto h-52 w-full max-w-[20rem]", styles.floatSlow)}>
        <circle cx="170" cy="128" r="58" fill="rgba(15,23,42,0.9)" stroke="#67e8f9" strokeWidth="3" />
        <circle cx="170" cy="128" r="28" fill="rgba(34,197,94,0.2)" stroke="#4ade80" strokeWidth="3" />
        <rect x="34" y="104" width="82" height="48" rx="24" fill="rgba(15,23,42,0.88)" stroke="#cbd5e1" strokeOpacity="0.32" strokeWidth="2.8" />
        <rect x="224" y="74" width="78" height="108" rx="22" fill="rgba(15,23,42,0.88)" stroke="#67e8f9" strokeWidth="2.8" />
        <path d="M76 128 H112" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="8 9" />
        <path d="M228 128 H202" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="8 9" />
        <path d="M260 74 C238 110 238 146 260 182" fill="none" stroke="#34d399" strokeWidth="5" strokeLinecap="round" />
        <path d="M282 74 C304 110 304 146 282 182" fill="none" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <p className={cx("relative z-10 text-cyan-200", styles["type-6"], styles.overline)}>{label}</p>
    </div>
  );
}

function ClosingFigure() {
  return (
    <div className={cx(panelClass, "relative overflow-hidden")}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_46%)]" />
      <svg viewBox="0 0 420 360" className="relative z-10 h-full w-full">
        <ellipse cx="210" cy="182" rx="126" ry="150" fill="rgba(15,23,42,0.16)" stroke="#67e8f9" strokeWidth="3" />
        <ellipse cx="210" cy="182" rx="150" ry="172" fill="none" stroke="#cbd5e1" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="10 10" />
        <circle cx="210" cy="108" r="34" fill="rgba(15,23,42,0.8)" stroke="#e2e8f0" strokeOpacity="0.34" strokeWidth="2.5" />
        <path d="M176 154 C188 130 232 130 244 154 L268 256 C276 290 254 322 210 324 C166 322 144 290 152 256 Z" fill="rgba(15,23,42,0.74)" stroke="#67e8f9" strokeOpacity="0.62" strokeWidth="2.8" />
        <path d="M130 108 L164 128" stroke="#22c55e" strokeWidth="2.4" strokeDasharray="8 8" />
        <path d="M292 94 L250 126" stroke="#67e8f9" strokeWidth="2.4" strokeDasharray="8 8" />
        <path d="M108 246 L156 230" stroke="#22c55e" strokeWidth="2.4" strokeDasharray="8 8" />
        <path d="M312 248 L264 230" stroke="#67e8f9" strokeWidth="2.4" strokeDasharray="8 8" />
      </svg>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PresentationPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isAppLocale(locale)) notFound();

  setRequestLocale(locale);

  const deck = await getPresentationDeck(locale);
  const deckId = "presentation-deck";
  const t = await getTranslations({ locale, namespace: "presentation" });

  const slideItems: readonly SlideItem[] = [
    { id: "slide-01", index: 1, title: deck.slide1.navTitle },
    { id: "slide-02", index: 2, title: deck.slide2.navTitle },
    { id: "slide-03", index: 3, title: deck.slide3.navTitle },
    { id: "slide-04", index: 4, title: deck.slide4.navTitle },
    { id: "slide-05", index: 5, title: deck.slide5.navTitle },
    { id: "slide-06", index: 6, title: deck.slide6.navTitle },
    { id: "slide-07", index: 7, title: deck.slide7.navTitle },
    { id: "slide-08", index: 8, title: deck.slide8.navTitle },
    { id: "slide-09", index: 9, title: deck.slide9.navTitle },
    { id: "slide-10", index: 10, title: deck.slide10.navTitle },
    { id: "slide-11", index: 11, title: deck.slide11.navTitle },
    { id: "slide-12", index: 12, title: deck.slide12.navTitle },
    { id: "slide-13", index: 13, title: deck.slide13.navTitle },
    { id: "slide-14", index: 14, title: deck.slide14.navTitle },
    { id: "slide-15", index: 15, title: deck.slide15.navTitle },
    { id: "slide-16", index: 16, title: deck.slide16.navTitle },
  ];
  const visibleSlideItems = slideItems.slice(0, 16);
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const basePath = repositoryName ? `/${repositoryName}` : "";
  const openingFigureSrc = `${basePath}/prezentation_s1.png`;
  const openingLightLogoSrc = `${basePath}/logo_opole_univercity_of_technology_light.png`;
  const openingDarkLogoSrc = `${basePath}/logo_opole_univercity_of_technology_dark.png`;
  const slideFourHumanSrc = `${basePath}/human.png`;
  const slideTwoImageSrc = `${basePath}/presentation_scales.png`;
  const slideSevenImageSrc = `${basePath}/presentation_militaryzation.png`;
  const slideEightImageSrc = `${basePath}/presentation_connectivity.png`;
  const slideNineImageSrc = `${basePath}/presentation_dna.png`;
  const slideTenImageSrc = `${basePath}/presentation_syphon.png`;
  const slideElevenImageSrc = `${basePath}/presentation_heart.png`;
  const slideTwelveImageSrc = `${basePath}/prezentation_stack.png`;
  const slideFifteenImageSrc = `${basePath}/presentation_end.png`;
  const slideSixteenImageSrc = `${basePath}/utopia.png`;
  const openingTitle = t.rich("slides.slide1.title", {
    focus: (chunks) => <>{chunks}</>,
  });
  const openingSubtitle = t.rich("slides.slide1.subtitle", {
    codex: (chunks) => <span className="font-semibold">{chunks}</span>,
  });
  const openingAuthorsLabel = deck.slide1.authorsLabel;
  const openingAffiliation = deck.slide1.affiliation;
  const slideTwoTitle = deck.slide2.title;
  const slideTwoCards = deck.slide2.cards;
  const slideThreeTitle = deck.slide3.title;
  const slideThreeRows = [
    {
      ...deck.slide3.rows[0],
      traditionalIcon: Activity,
      enhancedIcon: BoundingBoxCircles,
    },
    {
      ...deck.slide3.rows[1],
      traditionalIcon: Gear,
      enhancedIcon: Cpu,
    },
    {
      ...deck.slide3.rows[2],
      traditionalIcon: Server,
      enhancedIcon: Diagram3,
    },
    {
      ...deck.slide3.rows[3],
      traditionalIcon: ExclamationTriangle,
      enhancedIcon: ShieldLock,
    },
  ] as const;
  const slideFourTitle = deck.slide4.title;
  const slideFourCards = [
    {
      position: styles.slideFourCardTopLeft,
      tone: styles.slideFourCardFour,
      ...deck.slide4.cards[3],
    },
    {
      position: styles.slideFourCardTopRight,
      tone: styles.slideFourCardOne,
      ...deck.slide4.cards[0],
    },
    {
      position: styles.slideFourCardBottomRight,
      tone: styles.slideFourCardTwo,
      ...deck.slide4.cards[1],
    },
    {
      position: styles.slideFourCardBottomLeft,
      tone: styles.slideFourCardThree,
      ...deck.slide4.cards[2],
    },
  ] as const;
  const slideFourDiagram = deck.slide4.diagram;
  const slideFiveTitle = deck.slide5.title;
  const slideFivePillars = deck.slide5.pillars;
  const slideFivePillarSrc = `${basePath}/presentation_filar.png`;
  const slideFivePanels = [
    { tone: styles.slideFivePanelNeutral, ...deck.slide5.panels[0] },
    { tone: styles.slideFivePanelAmber, ...deck.slide5.panels[1] },
    { tone: styles.slideFivePanelDark, ...deck.slide5.panels[2] },
  ] as const;
  const slideSixTitle = deck.slide6.title;
  const slideSixPanels = [
    { tone: styles.slideSixPanelNeutral, ...deck.slide6.panels[0] },
    { tone: styles.slideSixPanelAmber, ...deck.slide6.panels[1] },
    { tone: styles.slideSixPanelDark, ...deck.slide6.panels[2] },
  ] as const;
  const slideSixDiagram = deck.slide6.diagram;
  const slideSevenTitle = deck.slide7.title;
  const slideSevenPanels = [
    { tone: styles.slideSevenPanelNeutral, ...deck.slide7.panels[0] },
    { tone: styles.slideSevenPanelDark, ...deck.slide7.panels[1] },
  ] as const;
  const slideEightTitle = deck.slide8.title;
  const slideEightPanels = [
    { tone: styles.slideEightPanelNeutral, ...deck.slide8.panels[0] },
    { tone: styles.slideEightPanelNeutral, ...deck.slide8.panels[1] },
  ] as const;
  const slideNineTitle = deck.slide9.title;
  const slideNinePanels = [
    { tone: styles.slideNinePanelNeutral, ...deck.slide9.panels[0] },
    { tone: styles.slideNinePanelAmber, ...deck.slide9.panels[1] },
  ] as const;
  const slideTenTitle = deck.slide10.title;
  const slideTenMechanismTitle = deck.slide10.mechanismTitle;
  const slideTenMechanism = deck.slide10.mechanismText;
  const slideTenConstraintsTitle = deck.slide10.constraintsTitle;
  const slideTenConstraints = deck.slide10.constraints;
  const slideTenOutcomes = deck.slide10.outcomes;
  const slideElevenTitle = deck.slide11.title;
  const slideElevenPanels = deck.slide11.panels;
  const slideTwelveTitle = deck.slide12.title;
  const slideTwelveMechanismTitle = deck.slide12.mechanismTitle;
  const slideTwelveMechanism = deck.slide12.mechanismText;
  const slideTwelveConstraintsTitle = deck.slide12.constraintsTitle;
  const slideTwelveConstraints = deck.slide12.constraints;
  const slideThirteenTitle = deck.slide13.title;
  const slideThirteenHeaders = deck.slide13.headers;
  const slideThirteenRows = [
    { ...deck.slide13.rows[0], icon: ShieldLock, accent: styles.slideThirteenAccentCyan },
    { ...deck.slide13.rows[1], icon: Activity, accent: styles.slideThirteenAccentCyan },
    { ...deck.slide13.rows[2], icon: Diagram3, accent: styles.slideThirteenAccentSlate },
    { ...deck.slide13.rows[3], icon: Database, accent: styles.slideThirteenAccentAmber },
    { ...deck.slide13.rows[4], icon: BarChartLine, accent: styles.slideThirteenAccentAmber },
  ] as const;
  const slideFourteenTitle = deck.slide14.title;
  const slideFourteenDiagram = deck.slide14.diagram;
  const slideFourteenSections = deck.slide14.sections;
  const slideFifteenTitle = deck.slide15.title;
  const slideFifteenStatements = deck.slide15.statements;
  const slideSixteenTitle = deck.slide16.title;
  const slideSixteenCaption = deck.slide16.caption;

  return (
    <section className="relative bg-background text-foreground">
      <PresentationBackdrop />
      <PresentationWordmark />

      <div id={deckId} className={cx("relative z-10 h-[100dvh] overflow-y-auto snap-y snap-mandatory", slideDeckClassName)}>
        <SubpageControls mobileOpacity={1}>
          <PodcastControls src={presentationPodcastSrc} gain={2} />
          <PresentationModeButton deckId={deckId} />
        </SubpageControls>
        <SlideIndicators deckId={deckId} items={visibleSlideItems} />
        <SlideKeyboardNavigation slideIds={visibleSlideItems.map((item) => item.id)} />

        <Slide id={visibleSlideItems[0].id} index={visibleSlideItems[0].index} title={visibleSlideItems[0].title}>
          <div className={styles.openingSlide}>
            <div className={styles.openingHeader}>
              <h1 className={cx(styles["type-2"], styles.openingTitle, "text-foreground")}>{openingTitle}</h1>
              <p className={cx(styles["type-4"], styles.openingSubtitle, styles.openingCompactCopy, "text-foreground/78")}>
                {openingSubtitle}
              </p>
            </div>

            <div aria-hidden="true" className={styles.openingSpace} />

            <div className={styles.openingLogoWrap}>
              <Image
                src={openingLightLogoSrc}
                alt={openingAffiliation}
                width={288}
                height={66}
                priority
                className={cx(styles.openingLogo, styles.logoLight)}
              />
              <Image
                src={openingDarkLogoSrc}
                alt={openingAffiliation}
                width={288}
                height={66}
                priority
                className={cx(styles.openingLogo, styles.logoDark)}
              />
            </div>

            <div className={styles.openingAuthors}>
              <p className={cx(styles["type-6"], styles.openingTag, styles.tagContrast)}>{openingAuthorsLabel}</p>
              {deck.slide1.authors.map((author) => (
                <p key={author} className={cx(styles["type-4"], styles.openingAuthorText, styles.openingCompactCopy, "text-foreground/90")}>
                  {author}
                </p>
              ))}
              <p className={cx(styles["type-6"], styles.openingTag, styles.tagContrast, styles.openingAffiliationLine)}>
                {openingAffiliation}
              </p>
            </div>

            <div className={styles.openingFigureAnchor}>
              <div className={styles.openingFigureWrap}>
                <Image
                  src={openingFigureSrc}
                  alt=""
                  aria-hidden="true"
                  width={980}
                  height={980}
                  priority
                  className={styles.openingFigure}
                />
              </div>
            </div>
          </div>
        </Slide>

        <Slide id={visibleSlideItems[1].id} index={visibleSlideItems[1].index} title={visibleSlideItems[1].title}>
          <div className={styles.slideTwo}>
            <div className={styles.slideTwoHeader}>
              <h1 className={cx(mainTextClass, styles.slideTwoTitle)}>{slideTwoTitle}</h1>
            </div>

            <div className={styles.slideTwoImageSpace}>
              <Image
                src={slideTwoImageSrc}
                alt=""
                aria-hidden="true"
                width={1200}
                height={675}
                priority
                className={styles.slideTwoImage}
              />
            </div>

            {slideTwoCards.map((card, index) => (
              <div
                key={card.title}
                className={cx(
                  styles.slideTwoCard,
                  index === 0 ? styles.slideTwoCardOne : index === 1 ? styles.slideTwoCardTwo : styles.slideTwoCardThree,
                )}
              >
                <h3 className={cx(styles.slideTwoCardTitle, styles.tagContrast)}>{card.title}</h3>
                <p className={styles.slideTwoCardBody}>{card.text1}</p>
              </div>
            ))}
          </div>
        </Slide>

        <Slide id={visibleSlideItems[2].id} index={visibleSlideItems[2].index} title={visibleSlideItems[2].title}>
          <div className={styles.slideThree}>
            <div className={styles.slideThreeHeader}>
              <h1 className={cx(mainTextClass, styles.slideThreeTitle)}>{slideThreeTitle}</h1>
            </div>

            <div aria-hidden="true" className={styles.slideThreeSpacer} />
            <div className={cx(styles.slideThreeColumnHead, styles.slideThreeTraditionalHead)}>{deck.slide3.traditionalLabel}</div>
            <div className={cx(styles.slideThreeColumnHead, styles.slideThreeEnhancedHead)}>{deck.slide3.enhancedLabel}</div>

            {slideThreeRows.map((row, index) => {
              const rowClass =
                index === 0
                  ? styles.slideThreeRowOne
                  : index === 1
                    ? styles.slideThreeRowTwo
                    : index === 2
                      ? styles.slideThreeRowThree
                      : styles.slideThreeRowFour;

              return (
                <Fragment key={row.rowLabel}>
                  <div className={cx(styles.slideThreeLabelCell, rowClass)}>{row.rowLabel}</div>
                  <div className={cx(styles.slideThreeValueCell, styles.slideThreeTraditionalCell, rowClass)}>
                    <div className={styles.slideThreeValueContent}>
                      <span>{row.left}</span>
                      <span className={cx(styles.slideThreeIconWrap, styles.slideThreeTraditionalIconWrap)}>
                        <row.traditionalIcon className={styles.slideThreeIcon} />
                      </span>
                    </div>
                  </div>
                  <div className={cx(styles.slideThreeValueCell, styles.slideThreeEnhancedCell, rowClass)}>
                    <div className={styles.slideThreeValueContent}>
                      <span>{row.right}</span>
                      <span className={cx(styles.slideThreeIconWrap, styles.slideThreeEnhancedIconWrap)}>
                        <row.enhancedIcon className={styles.slideThreeIcon} />
                      </span>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </Slide>

        <Slide id={visibleSlideItems[3].id} index={visibleSlideItems[3].index} title={visibleSlideItems[3].title}>
          <div className={styles.slideFour}>
            <div className={styles.slideFourHeader}>
              <h1 className={cx(mainTextClass, styles.slideFourTitle)}>{slideFourTitle}</h1>
            </div>

            <div className={styles.slideFourCanvas}>
              {slideFourCards.map((card) => (
                <div key={card.title} className={cx(styles.slideFourCard, card.position, card.tone)}>
                  <p className={styles.slideFourCardTitle}>
                    <span className={styles.slideFourCardIndex}>{card.index}</span> {card.title}:
                  </p>
                  <p className={styles.slideFourCardBody}>{card.text1}</p>
                </div>
              ))}

              <div
                className={styles.slideFourCenter}
                style={{
                  backgroundImage: `linear-gradient(hsl(var(--background) / 0.5), hsl(var(--background) / 0.5)), url(${slideFourHumanSrc})`,
                  backgroundPosition: "center, center 108%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%, 60%",
                }}
              >
                <svg viewBox="0 0 760 760" className={styles.slideFourDiagram} aria-hidden="true">
                  <circle cx="380" cy="380" r="276" className={styles.slideFourOuterRing} />
                  <path d="M350 86 L380 104 L350 122" className={styles.slideFourChevron} />
                  <path d="M638 350 L656 380 L674 350" className={styles.slideFourChevron} />
                  <path d="M410 638 L380 656 L410 674" className={styles.slideFourChevron} />
                  <path d="M86 410 L104 380 L122 410" className={styles.slideFourChevron} />

                  <text x="148" y="174" className={cx(styles.slideFourLabelPrimary, styles.slideFourLabelFour)}>
                    {slideFourDiagram.controlSignals.text1}
                  </text>
                  <text x="130" y="208" className={cx(styles.slideFourLabelPrimary, styles.slideFourLabelFour)}>
                    {slideFourDiagram.controlSignals.text2}
                  </text>

                  <text x="484" y="174" className={cx(styles.slideFourLabelPrimary, styles.slideFourLabelOne)}>
                    {slideFourDiagram.telemetry.text1}
                  </text>

                  <text x="486" y="610" className={cx(styles.slideFourLabelPrimary, styles.slideFourLabelTwo)}>
                    {slideFourDiagram.predictions.text1}
                  </text>

                  <text x="110" y="610" className={cx(styles.slideFourLabelPrimary, styles.slideFourLabelThree)}>
                    {slideFourDiagram.dynamicModification.text1}
                  </text>
                  <text x="84" y="644" className={cx(styles.slideFourLabelPrimary, styles.slideFourLabelThree)}>
                    {slideFourDiagram.dynamicModification.text2}
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </Slide>

        <Slide id={visibleSlideItems[4].id} index={visibleSlideItems[4].index} title={visibleSlideItems[4].title}>
          <div className={styles.slideFive}>
            <div className={styles.slideFiveHeader}>
              <h1 className={cx(mainTextClass, styles.slideFiveTitle)}>{slideFiveTitle}</h1>
            </div>

            <div className={styles.slideFiveVisual}>
              {slideFivePillars.map((pillar) => (
                <div key={pillar} className={styles.slideFivePillar}>
                  <div className={styles.slideFivePillarFrame}>
                    <Image
                      src={slideFivePillarSrc}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="20vw"
                      className={styles.slideFivePillarImage}
                    />
                    <span className={styles.slideFivePillarLabel}>{pillar}</span>
                  </div>
                </div>
              ))}
            </div>

            {slideFivePanels.map((panel, index) => (
              <div
                key={panel.text1}
                className={cx(
                  styles.slideFivePanel,
                  panel.tone,
                  index === 0 ? styles.slideFivePanelOne : index === 1 ? styles.slideFivePanelTwo : styles.slideFivePanelThree,
                )}
              >
                <p className={styles.slideFivePanelText}>
                  {panel.lead ? <span className={styles.slideFivePanelLead}>{panel.lead} </span> : null}
                  {panel.text1}
                </p>
              </div>
            ))}
          </div>
        </Slide>

        <Slide id={visibleSlideItems[5].id} index={visibleSlideItems[5].index} title={visibleSlideItems[5].title}>
          <div className={styles.slideSix}>
            <div className={styles.slideSixHeader}>
              <h1 className={cx(mainTextClass, styles.slideSixTitle)}>{slideSixTitle}</h1>
            </div>

            {slideSixPanels.map((panel, index) => (
              <div
                key={panel.text1}
                className={cx(
                  styles.slideSixPanel,
                  panel.tone,
                  index === 0 ? styles.slideSixPanelOne : index === 1 ? styles.slideSixPanelTwo : styles.slideSixPanelThree,
                )}
              >
                <p className={styles.slideSixPanelText}>
                  <span className={styles.slideSixPanelLead}>{panel.lead}</span> {panel.text1}
                </p>
              </div>
            ))}

            <div className={styles.slideSixDiagramWrap}>
              <svg viewBox="0 0 760 760" className={styles.slideSixDiagram} aria-hidden="true">
                <defs>
                  <linearGradient id="slideSixOuterStroke" x1="108" y1="176" x2="652" y2="584" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f7cf74" />
                    <stop offset="46%" stopColor="#d8a037" />
                    <stop offset="100%" stopColor="#b97716" />
                  </linearGradient>
                  <linearGradient id="slideSixMiddleStroke" x1="160" y1="206" x2="600" y2="554" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f5ca69" />
                    <stop offset="50%" stopColor="#d89b2a" />
                    <stop offset="100%" stopColor="#b87415" />
                  </linearGradient>
                  <linearGradient id="slideSixInnerStroke" x1="212" y1="236" x2="548" y2="524" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f7d277" />
                    <stop offset="50%" stopColor="#d79e2f" />
                    <stop offset="100%" stopColor="#b8791b" />
                  </linearGradient>
                  <radialGradient id="slideSixCoreFill" cx="50%" cy="42%" r="66%">
                    <stop offset="0%" stopColor="#b6e0df" />
                    <stop offset="62%" stopColor="#8bc4c8" />
                    <stop offset="100%" stopColor="#6daab2" />
                  </radialGradient>
                  <path id="slideSixOuterArc" d="M128 380 A252 252 0 0 1 632 380" />
                  <path id="slideSixMiddleArc" d="M176 380 A204 204 0 0 1 584 380" />
                  <path id="slideSixInnerArc" d="M228 380 A152 152 0 0 1 532 380" />
                </defs>

                <circle cx="380" cy="380" r="292" className={styles.slideSixGuideRing} />
                <circle cx="380" cy="380" r="246" className={styles.slideSixGuideRing} />
                <circle cx="380" cy="380" r="194" className={styles.slideSixGuideRing} />
                <circle cx="380" cy="380" r="142" className={styles.slideSixGuideRingSoft} />

                <circle cx="380" cy="380" r="272" className={styles.slideSixOuterRing} stroke="url(#slideSixOuterStroke)" />
                <circle cx="380" cy="380" r="220" className={styles.slideSixMiddleRing} stroke="url(#slideSixMiddleStroke)" />
                <circle cx="380" cy="380" r="168" className={styles.slideSixInnerRing} stroke="url(#slideSixInnerStroke)" />
                <circle cx="380" cy="380" r="118" className={styles.slideSixCore} fill="url(#slideSixCoreFill)" />

                <text className={styles.slideSixRingLabel}>
                  <textPath href="#slideSixOuterArc" startOffset="50%" textAnchor="middle" dy="-0.5em">
                    {slideSixDiagram.outerRing}
                  </textPath>
                </text>
                <text className={styles.slideSixRingLabel}>
                  <textPath href="#slideSixMiddleArc" startOffset="50%" textAnchor="middle" dy="-0.5em">
                    {slideSixDiagram.middleRing}
                  </textPath>
                </text>
                <text className={styles.slideSixRingLabel}>
                  <textPath href="#slideSixInnerArc" startOffset="50%" textAnchor="middle" dy="-0.5em">
                    {slideSixDiagram.innerRing}
                  </textPath>
                </text>

                <text x="380" y="340" textAnchor="middle" className={styles.slideSixCoreLabel}>
                  {slideSixDiagram.core.map((line, index) => (
                    <tspan key={line} x="380" dy={index === 0 ? "0" : "1.08em"}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </svg>
            </div>
          </div>
        </Slide>

        <Slide id={visibleSlideItems[6].id} index={visibleSlideItems[6].index} title={visibleSlideItems[6].title}>
          <div className={styles.slideSeven}>
            <div className={styles.slideSevenHeader}>
              <h1 className={cx(mainTextClass, styles.slideSevenTitle)}>{slideSevenTitle}</h1>
            </div>

            <div className={styles.slideSevenVisual}>
              <Image
                src={slideSevenImageSrc}
                alt=""
                aria-hidden="true"
                width={1600}
                height={900}
                priority
                className={styles.slideSevenImage}
              />
            </div>

            {slideSevenPanels.map((panel, index) => (
              <div
                key={panel.lead}
                className={cx(
                  styles.slideSevenPanel,
                  panel.tone,
                  index === 0 ? styles.slideSevenPanelOne : styles.slideSevenPanelTwo,
                )}
              >
                <p className={styles.slideSevenPanelText}>
                  <span className={styles.slideSevenPanelLead}>{panel.lead}</span>
                </p>
                <p className={styles.slideSevenPanelBody}>{panel.text1}</p>
              </div>
            ))}
          </div>
        </Slide>

        <Slide id={visibleSlideItems[7].id} index={visibleSlideItems[7].index} title={visibleSlideItems[7].title}>
          <div className={styles.slideEight}>
            <div className={styles.slideEightHeader}>
              <h1 className={cx(mainTextClass, styles.slideEightTitle)}>{slideEightTitle}</h1>
            </div>

            <div className={styles.slideEightVisual}>
              <Image
                src={slideEightImageSrc}
                alt=""
                aria-hidden="true"
                width={1600}
                height={900}
                priority
                className={styles.slideEightImage}
              />
            </div>

            {slideEightPanels.map((panel, index) => (
              <div
                key={panel.lead}
                className={cx(
                  styles.slideEightPanel,
                  panel.tone,
                  index === 0 ? styles.slideEightPanelOne : styles.slideEightPanelTwo,
                )}
              >
                <p className={styles.slideEightPanelText}>
                  <span className={styles.slideEightPanelLead}>{panel.lead}</span>
                </p>
                <p className={styles.slideEightPanelBody}>{panel.text1}</p>
              </div>
            ))}
          </div>
        </Slide>

        <Slide id={visibleSlideItems[8].id} index={visibleSlideItems[8].index} title={visibleSlideItems[8].title}>
          <div className={styles.slideNine}>
            <div className={styles.slideNineHeader}>
              <h1 className={cx(mainTextClass, styles.slideNineTitle)}>{slideNineTitle}</h1>
            </div>

            {slideNinePanels.map((panel, index) => (
              <div
                key={panel.lead}
                className={cx(
                  styles.slideNinePanel,
                  panel.tone,
                  index === 0 ? styles.slideNinePanelOne : styles.slideNinePanelTwo,
                )}
              >
                <p className={styles.slideNinePanelText}>
                  <span className={styles.slideNinePanelLead}>{panel.lead}</span>
                </p>
                <p className={styles.slideNinePanelBody}>{panel.text1}</p>
              </div>
            ))}

            <div className={styles.slideNineVisual}>
              <Image
                src={slideNineImageSrc}
                alt=""
                aria-hidden="true"
                width={1600}
                height={900}
                className={styles.slideNineImage}
              />
            </div>
          </div>
        </Slide>

        <Slide id={visibleSlideItems[9].id} index={visibleSlideItems[9].index} title={visibleSlideItems[9].title}>
          <div className={styles.slideTen}>
            <div className={styles.slideTenHeader}>
              <h1 className={cx(mainTextClass, styles.slideTenTitle)}>{slideTenTitle}</h1>
            </div>

            <div className={cx(styles.slideTenPanel, styles.slideTenPanelLeft)}>
              <p className={styles.slideTenPanelTitle}>{slideTenMechanismTitle}</p>
              <p className={styles.slideTenPanelBody}>{slideTenMechanism}</p>
            </div>

            <div className={styles.slideTenVisual}>
              <Image
                src={slideTenImageSrc}
                alt=""
                aria-hidden="true"
                width={1600}
                height={900}
                className={styles.slideTenImage}
              />

              <div className={styles.slideTenOutcomeRow}>
                {slideTenOutcomes.map((item) => (
                  <div key={item} className={styles.slideTenOutcomeCard}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className={cx(styles.slideTenPanel, styles.slideTenPanelRight)}>
              <p className={styles.slideTenPanelTitle}>{slideTenConstraintsTitle}</p>
              {slideTenConstraints.map((item) => (
                <p key={item} className={styles.slideTenPanelBody}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </Slide>

        <Slide id={visibleSlideItems[10].id} index={visibleSlideItems[10].index} title={visibleSlideItems[10].title}>
          <div className={styles.slideEleven}>
            <div className={styles.slideElevenHeader}>
              <h1 className={cx(mainTextClass, styles.slideElevenTitle)}>{slideElevenTitle}</h1>
            </div>

            <div className={styles.slideElevenVisual}>
              <Image
                src={slideElevenImageSrc}
                alt=""
                aria-hidden="true"
                width={1600}
                height={900}
                className={styles.slideElevenImage}
              />
            </div>

            {slideElevenPanels.map((panel, index) => (
              <div
                key={panel.title}
                className={cx(styles.slideElevenPanel, index === 0 ? styles.slideElevenPanelOne : styles.slideElevenPanelTwo)}
              >
                <p className={styles.slideElevenPanelTitle}>{panel.title}</p>
                <p className={styles.slideElevenPanelBody}>{panel.text1}</p>
              </div>
            ))}
          </div>
        </Slide>

        <Slide id={visibleSlideItems[11].id} index={visibleSlideItems[11].index} title={visibleSlideItems[11].title}>
          <div className={styles.slideTwelve}>
            <div className={styles.slideTwelveHeader}>
              <h1 className={cx(mainTextClass, styles.slideTwelveTitle)}>{slideTwelveTitle}</h1>
            </div>

            <div className={styles.slideTwelveVisual}>
              <Image
                src={slideTwelveImageSrc}
                alt=""
                aria-hidden="true"
                width={1600}
                height={900}
                className={styles.slideTwelveImage}
              />
            </div>

            <div className={cx(styles.slideTwelvePanel, styles.slideTwelvePanelOne)}>
              <p className={styles.slideTwelvePanelTitle}>{slideTwelveMechanismTitle}</p>
              <p className={styles.slideTwelvePanelBody}>{slideTwelveMechanism}</p>
            </div>

            <div className={cx(styles.slideTwelvePanel, styles.slideTwelvePanelTwo)}>
              <p className={styles.slideTwelvePanelTitle}>{slideTwelveConstraintsTitle}</p>
              <ul className={styles.slideTwelveConstraintList}>
                {slideTwelveConstraints.map((item) => (
                  <li key={item.title} className={styles.slideTwelveConstraintItem}>
                    <span className={styles.slideTwelveConstraintLead}>{item.title}</span> {item.text1}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Slide>

        <Slide id={visibleSlideItems[12].id} index={visibleSlideItems[12].index} title={visibleSlideItems[12].title}>
          <div className={styles.slideThirteen}>
            <div className={styles.slideThirteenHeader}>
              <h1 className={cx(mainTextClass, styles.slideThirteenTitle)}>{slideThirteenTitle}</h1>
            </div>

            <div className={styles.slideThirteenTableWrap}>
              <span aria-hidden="true" className={cx(styles.slideThirteenCorner, styles.slideThirteenCornerTopLeft)} />
              <span aria-hidden="true" className={cx(styles.slideThirteenCorner, styles.slideThirteenCornerTopRight)} />
              <span aria-hidden="true" className={cx(styles.slideThirteenCorner, styles.slideThirteenCornerBottomLeft)} />
              <span aria-hidden="true" className={cx(styles.slideThirteenCorner, styles.slideThirteenCornerBottomRight)} />

              <div className={styles.slideThirteenGrid}>
                <div className={styles.slideThirteenHead}>{slideThirteenHeaders[0]}</div>
                <div className={styles.slideThirteenHead}>{slideThirteenHeaders[1]}</div>
                <div className={styles.slideThirteenHead}>{slideThirteenHeaders[2]}</div>

                {slideThirteenRows.map((row) => (
                  <Fragment key={row.threat}>
                    <div className={styles.slideThirteenThreatCell}>
                      <span className={cx(styles.slideThirteenThreatIconWrap, row.accent)}>
                        <row.icon className={styles.slideThirteenThreatIcon} />
                      </span>
                      <span className={styles.slideThirteenThreatText}>{row.threat}</span>
                    </div>
                    <div className={styles.slideThirteenBodyCell}>{row.risk}</div>
                    <div className={styles.slideThirteenBodyCell}>{row.principle}</div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </Slide>

        <Slide id={visibleSlideItems[13].id} index={visibleSlideItems[13].index} title={visibleSlideItems[13].title}>
          <div className={styles.slideFourteen}>
            <div className={styles.slideFourteenHeader}>
              <h1 className={cx(mainTextClass, styles.slideFourteenTitle)}>{slideFourteenTitle}</h1>
            </div>

            <div className={styles.slideFourteenVisual}>
              <svg viewBox="0 0 760 760" className={styles.slideFourteenDiagram} aria-hidden="true">
                <defs>
                  <linearGradient id="slideFourteenOuterStroke" x1="108" y1="176" x2="652" y2="584" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f7cf74" />
                    <stop offset="46%" stopColor="#d8a037" />
                    <stop offset="100%" stopColor="#b97716" />
                  </linearGradient>
                  <linearGradient id="slideFourteenMiddleStroke" x1="160" y1="206" x2="600" y2="554" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#c5e6e7" />
                    <stop offset="50%" stopColor="#8fc4cb" />
                    <stop offset="100%" stopColor="#6aa8b2" />
                  </linearGradient>
                  <linearGradient id="slideFourteenInnerStroke" x1="212" y1="236" x2="548" y2="524" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#bae0e2" />
                    <stop offset="50%" stopColor="#89c3cb" />
                    <stop offset="100%" stopColor="#6aaab3" />
                  </linearGradient>
                  <radialGradient id="slideFourteenCoreFill" cx="50%" cy="42%" r="66%">
                    <stop offset="0%" stopColor="#b6e0df" />
                    <stop offset="62%" stopColor="#8bc4c8" />
                    <stop offset="100%" stopColor="#6daab2" />
                  </radialGradient>
                  <path id="slideFourteenOuterArc" d="M104 380 A276 276 0 0 1 656 380" />
                  <path id="slideFourteenMiddleArc" d="M160 380 A220 220 0 0 1 600 380" />
                </defs>

                <circle cx="380" cy="380" r="292" className={styles.slideSixGuideRing} />
                <circle cx="380" cy="380" r="236" className={styles.slideSixGuideRing} />
                <circle cx="380" cy="380" r="180" className={styles.slideSixGuideRingSoft} />
                <circle cx="380" cy="380" r="124" className={styles.slideSixGuideRingSoft} />

                <circle cx="380" cy="380" r="274" className={styles.slideSixOuterRing} stroke="url(#slideFourteenOuterStroke)" />
                <circle cx="380" cy="380" r="218" className={styles.slideSixMiddleRing} stroke="url(#slideFourteenMiddleStroke)" />
                <circle cx="380" cy="380" r="162" className={styles.slideSixInnerRing} stroke="url(#slideFourteenInnerStroke)" />
                <circle cx="380" cy="380" r="110" className={styles.slideSixCore} fill="url(#slideFourteenCoreFill)" />

                <text className={styles.slideSixRingLabel}>
                  <textPath href="#slideFourteenOuterArc" startOffset="50%" textAnchor="middle">
                    {slideFourteenDiagram.outerRing}
                  </textPath>
                </text>
                <text className={styles.slideSixRingLabel}>
                  <textPath href="#slideFourteenMiddleArc" startOffset="50%" textAnchor="middle">
                    {slideFourteenDiagram.middleRing}
                  </textPath>
                </text>
                <text x="380" y="394" textAnchor="middle" className={styles.slideFourteenCenterLabel}>
                  {slideFourteenDiagram.center}
                </text>

                <circle cx="380" cy="218" r="14" className={styles.slideFourteenNodeLight} />
                <circle cx="520" cy="276" r="14" className={styles.slideFourteenNodeDark} />
                <circle cx="544" cy="418" r="14" className={styles.slideFourteenNodeLight} />
                <circle cx="438" cy="544" r="14" className={styles.slideFourteenNodeDark} />
                <circle cx="272" cy="514" r="14" className={styles.slideFourteenNodeGold} />
                <circle cx="196" cy="360" r="14" className={styles.slideFourteenNodeDark} />
                <circle cx="278" cy="236" r="14" className={styles.slideFourteenNodeGold} />

                <circle cx="380" cy="128" r="14" className={styles.slideFourteenNodeLight} />
                <circle cx="602" cy="212" r="14" className={styles.slideFourteenNodeDark} />
                <circle cx="632" cy="362" r="14" className={styles.slideFourteenNodeLight} />
                <circle cx="588" cy="578" r="14" className={styles.slideFourteenNodeGold} />
                <circle cx="380" cy="664" r="14" className={styles.slideFourteenNodeDark} />
                <circle cx="168" cy="576" r="14" className={styles.slideFourteenNodeGold} />
                <circle cx="94" cy="362" r="14" className={styles.slideFourteenNodeDark} />
                <circle cx="170" cy="212" r="14" className={styles.slideFourteenNodeDark} />

                <path d="M380 128 L520 276 L632 362 L544 418 L380 664 L168 576 L94 362 L170 212 Z" className={styles.slideFourteenLinkGold} />
                <path d="M170 212 L196 360 L380 664 L602 212 L520 276 L94 362 H632" className={styles.slideFourteenLinkDark} />
                <path d="M278 236 L380 218 L520 276" className={styles.slideFourteenLinkGold} />
                <path d="M272 514 L380 544 L544 418" className={styles.slideFourteenLinkGold} />
                <path d="M278 236 L196 360 L272 514 L438 544" className={styles.slideFourteenLinkDark} />
              </svg>
            </div>

            <div className={styles.slideFourteenDivider} />

            <div className={styles.slideFourteenContent}>
              {slideFourteenSections.map((section) => (
                <div key={section.title} className={styles.slideFourteenSection}>
                  <p className={styles.slideFourteenSectionTitle}>{section.title}</p>
                  <p className={styles.slideFourteenSectionBody}>{section.text1}</p>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        <Slide id={visibleSlideItems[14].id} index={visibleSlideItems[14].index} title={visibleSlideItems[14].title}>
          <div className={styles.slideFifteen}>
            <span aria-hidden="true" className={cx(styles.slideFifteenCorner, styles.slideFifteenCornerTopLeft)} />
            <span aria-hidden="true" className={cx(styles.slideFifteenCorner, styles.slideFifteenCornerTopRight)} />
            <span aria-hidden="true" className={cx(styles.slideFifteenCorner, styles.slideFifteenCornerBottomLeft)} />
            <span aria-hidden="true" className={cx(styles.slideFifteenCorner, styles.slideFifteenCornerBottomRight)} />

            <div className={styles.slideFifteenHeader}>
              <h1 className={cx(mainTextClass, styles.slideFifteenTitle)}>{slideFifteenTitle}</h1>
            </div>

            <div className={styles.slideFifteenVisual}>
              <Image
                src={slideFifteenImageSrc}
                alt=""
                aria-hidden="true"
                width={1600}
                height={900}
                className={styles.slideFifteenImage}
              />
            </div>

            <div className={cx(styles.slideFifteenStatement, styles.slideFifteenStatementLeft)}>
              <p className={styles.slideFifteenStatementText}>{slideFifteenStatements[0]}</p>
            </div>

            <div className={cx(styles.slideFifteenStatement, styles.slideFifteenStatementCenter)}>
              <p className={styles.slideFifteenStatementText}>{slideFifteenStatements[2]}</p>
            </div>

            <div className={cx(styles.slideFifteenStatement, styles.slideFifteenStatementRight)}>
              <p className={styles.slideFifteenStatementText}>{slideFifteenStatements[1]}</p>
            </div>
          </div>
        </Slide>

        <Slide
          id={visibleSlideItems[15].id}
          index={visibleSlideItems[15].index}
          title={visibleSlideItems[15].title}
          fullBleed
        >
          <div className={styles.slideSixteen}>
            <Image
              src={slideSixteenImageSrc}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className={styles.slideSixteenImage}
            />
            <div aria-hidden="true" className={styles.slideSixteenOverlay} />
            <div className={styles.slideSixteenContent}>
              <h1 className={cx(styles.slideSixteenTitle, "text-white")}>{slideSixteenTitle}</h1>
              <p className={styles.slideSixteenCaption}>{slideSixteenCaption}</p>
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
}
