// @file: src/app/[locale]/presentation/page.tsx
import type { ComponentType, ReactNode, SVGProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  Activity,
  ArrowRight,
  BarChartLine,
  BoundingBoxCircles,
  CheckCircle,
  Check2Circle,
  ClipboardPulse,
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
  LightningCharge,
  People,
  Person,
  Robot,
  Server,
  ShieldCheck,
  ShieldLock,
  Stars,
  XCircle,
} from "react-bootstrap-icons";
import { getPresentationDeck } from "@/content/presentationDeck";
import { SubpageControls } from "@/components/layout/SubpageControls";
import { PresentationBackdrop } from "@/components/presentation/PresentationBackdrop";
import { Slide, slideDeckClassName } from "@/components/presentation/Slide";
import { SlideIndicators } from "@/components/presentation/SlideIndicators";
import { SlideKeyboardNavigation } from "@/components/presentation/SlideKeyboardNavigation";
import { PresentationWordmark } from "@/components/presentation/PresentationWordmark";
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

  const deck = getPresentationDeck(locale);
  const deckId = "presentation-deck";

  const slideItems: readonly SlideItem[] = [
    { id: "slide-01", index: 1, title: deck.hero.navTitle },
    { id: "slide-02", index: 2, title: deck.evolution.navTitle },
    { id: "slide-03", index: 3, title: deck.objective.navTitle },
    { id: "slide-04", index: 4, title: deck.ethics.navTitle },
    { id: "slide-05", index: 5, title: deck.dualUse.navTitle },
    { id: "slide-06", index: 6, title: deck.genomeRisk.navTitle },
    { id: "slide-07", index: 7, title: deck.bias.navTitle },
    { id: "slide-08", index: 8, title: deck.legal.navTitle },
    { id: "slide-09", index: 9, title: deck.anonymization.navTitle },
    { id: "slide-10", index: 10, title: deck.lawAsCode.navTitle },
    { id: "slide-11", index: 11, title: deck.framework.navTitle },
    { id: "slide-12", index: 12, title: deck.dataModels.navTitle },
    { id: "slide-13", index: 13, title: deck.decisions.navTitle },
    { id: "slide-14", index: 14, title: deck.caseStudy.navTitle },
    { id: "slide-15", index: 15, title: deck.closing.navTitle },
  ];
  const visibleSlideItems = slideItems.slice(0, 2);
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const basePath = repositoryName ? `/${repositoryName}` : "";
  const openingFigureSrc = `${basePath}/prezentation_s1.png`;
  const openingLightLogoSrc = `${basePath}/logo_opole_univercity_of_technology_light.png`;
  const openingDarkLogoSrc = `${basePath}/logo_opole_univercity_of_technology_dark.png`;
  const openingTitle = "A Rights-Based Governance Framework for AI-Enabled Human Enhancement";
  const openingSubtitle =
    "Introducing the Codex of Augmented Humanity as a governance layer for structural risks in AI-enabled augmentation";
  const openingAuthorsLabel = locale === "pl" ? "AUTORZY" : "AUTHORS";
  const openingAffiliation = "Opole University of Technology";

  return (
    <section className="relative bg-background text-foreground">
      <PresentationBackdrop />
      <PresentationWordmark />

      <div id={deckId} className={cx("relative z-10 h-[100dvh] overflow-y-auto snap-y snap-mandatory", slideDeckClassName)}>
        <SubpageControls />
        <SlideIndicators deckId={deckId} items={visibleSlideItems} />
        <SlideKeyboardNavigation slideIds={visibleSlideItems.map((item) => item.id)} />

        <Slide id={visibleSlideItems[0].id} index={visibleSlideItems[0].index} title={visibleSlideItems[0].title}>
          <div className={styles.openingSlide}>
            <div className={styles.openingContent}>
              <div className={styles.openingHeader}>
                <h1 className={cx(styles["type-2"], styles.openingTitle, "text-foreground")}>{openingTitle}</h1>
                <p className={cx(styles["type-4"], styles.openingSubtitle, styles.openingCompactCopy, "text-foreground/78")}>
                  {openingSubtitle}
                </p>
              </div>

              <div className={styles.openingMeta}>
                <div className={styles.openingLogoWrap}>
                  <Image
                    src={openingLightLogoSrc}
                    alt={openingAffiliation}
                    width={280}
                    height={96}
                    priority
                    className={cx(styles.openingLogo, styles.logoLight)}
                  />
                  <Image
                    src={openingDarkLogoSrc}
                    alt={openingAffiliation}
                    width={280}
                    height={96}
                    priority
                    className={cx(styles.openingLogo, styles.logoDark)}
                  />
                </div>

                <div className={styles.openingAuthors}>
                  <p className={cx(styles["type-6"], styles.tagContrast)}>{openingAuthorsLabel}</p>
                  <div className={styles.openingAuthorList}>
                    {deck.hero.authors.map((author) => (
                      <p key={author} className={cx(styles["type-4"], styles.openingCompactCopy, "text-right text-foreground/90")}>
                        {author}
                      </p>
                    ))}
                  </div>
                  <p className={cx(styles["type-6"], styles.tagContrast, styles.openingAffiliationLine)}>{openingAffiliation}</p>
                </div>
              </div>
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
          <div className="flex h-full flex-col justify-center gap-4">
            <h2 className={cx(mainTextClass, styles["type-2"])}>{deck.evolution.title}</h2>
            <p className={cx(styles["type-6"], styles.tagContrast)}>Kto to zrobił</p>
            <p className={cx(subTitleClass, "text-foreground/90")}>{deck.hero.authors.join(", ")}</p>
          </div>
        </Slide>
      </div>
    </section>
  );
}
