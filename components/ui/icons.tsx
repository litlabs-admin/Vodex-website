import type { SVGProps } from "react";

const base = {
  "aria-hidden": true,
  focusable: "false",
} as const;

/** Long right arrow used on every CTA in the design. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      {...base}
      className={className}
      viewBox="0 0 24 13"
      width="24"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M0 6.5h21.5" />
      <path d="m16 1 5.8 5.5L16 12" />
    </svg>
  );
}

/** "Log in" glyph — arrow entering a bracket. */
export function LoginIcon({ className }: { className?: string }) {
  return (
    <svg
      {...base}
      className={className}
      viewBox="0 0 20 20"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.5 2.5h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-4" />
      <path d="M8 14.5 12.5 10 8 5.5" />
      <path d="M12.5 10h-10" />
    </svg>
  );
}

/** Five-bar audio waveform — the Vodex mark's inner glyph. */
export function Waveform({ className }: { className?: string }) {
  const bars: Array<[number, number]> = [
    [4, 8],
    [9, 14],
    [14, 20],
    [19, 10],
    [24, 4],
  ];
  return (
    <svg
      {...base}
      className={className}
      viewBox="0 0 28 28"
      fill="currentColor"
    >
      {bars.map(([cx, h], i) => (
        <rect key={i} x={cx - 1.1} y={14 - h / 2} width={2.2} height={h} rx={1.1} />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Trust-strip icons                                                          */
/* -------------------------------------------------------------------------- */

/* Each icon carries its own natural viewBox so it fills the 42px slot the way
   the reference artwork does. Height is set in CSS; width follows. */

type IconProps = SVGProps<SVGSVGElement>;

const strokeIcon = {
  ...base,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Gauge / speedometer — SOC 2. */
export function GaugeIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 44 35" {...props}>
      <path d="M6.4 31.5a19 19 0 1 1 31.2 0Z" strokeLinejoin="round" />
      <path d="m32.5 12.5-8 10.5" />
      <circle cx="22" cy="26" r="3.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Shield with a check — ISO 27001. */
export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 36 44" {...props}>
      <path d="M18 1.8 34.2 8.6v11.7c0 9.8-7 17-16.2 20.3C8.8 37.3 1.8 30.1 1.8 20.3V8.6Z" />
      <path d="m11.4 21.3 4.8 4.8 9.2-9.3" />
    </svg>
  );
}

/** Phone with call-log lines — conversations automated. */
export function PhoneLinesIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 42 42" {...props}>
      <path d="M24.5 3.4h16M24.5 12.2h16M24.5 21h16" />
      <path d="M2.6 9.6A3 3 0 0 1 5.6 6.6h4.2a1.8 1.8 0 0 1 1.8 1.5l1 4.9a1.8 1.8 0 0 1-.5 1.7l-2.4 2.5a21 21 0 0 0 9.6 9.6l2.4-2.5a1.8 1.8 0 0 1 1.7-.5l4.9 1a1.8 1.8 0 0 1 1.5 1.8v4.2a3 3 0 0 1-3 3A25.6 25.6 0 0 1 2.6 9.6Z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Introducing-DROS feature icons                                             */
/* -------------------------------------------------------------------------- */

/** Three stacked layers — end-to-end engagement operations. */
export function LayersIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 36 28" {...props}>
      <path d="M18 1.5 33.5 9 18 16.5 2.5 9Z" />
      <path d="M2.5 14.3 18 21.8l15.5-7.5" />
      <path d="M2.5 19.3 18 26.8l15.5-7.5" />
    </svg>
  );
}

/** Dotted ring around a "C" swirl — context-aware AI agents. */
export function ContextIcon(props: IconProps) {
  const dots = 12;
  return (
    <svg {...strokeIcon} viewBox="0 0 36 36" fill="none" {...props}>
      {Array.from({ length: dots }, (_, i) => {
        const angle = (i * 360) / dots;
        const rad = (angle * Math.PI) / 180;
        const cx = 18 + 16.5 * Math.sin(rad);
        const cy = 18 - 16.5 * Math.cos(rad);
        return <circle key={i} cx={cx} cy={cy} r="1.6" fill="currentColor" stroke="none" />;
      })}
      <path d="M21.8 12.5a7 7 0 1 0 0 11" />
      <circle cx="18" cy="18" r="1.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Document with content lines and a tick — AI-powered workflows. */
export function WorkflowIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 34 30" {...props}>
      <path d="M2 6 6.5 21.5 12 17.5" />
      <rect x="10.5" y="1.5" width="21.5" height="18" rx="2.2" />
      <path d="M15 8h8M15 12.5h5" />
    </svg>
  );
}

/** Speech-bubble — "have more questions?" side card (FAQ). */
export function ChatIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M4 4.5h16a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H9.8l-4.3 3.6a.6.6 0 0 1-1-.46V16.5H4A1.5 1.5 0 0 1 2.5 15V6A1.5 1.5 0 0 1 4 4.5Z" />
    </svg>
  );
}

/** Small external-link arrow — footer links that leave the site. */
export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 12 12" {...props}>
      <path d="M4 2h6v6" />
      <path d="M10 2 2 10" />
    </svg>
  );
}

/** Plain checkmark — PTP-captured confirmation in the engagement queue. */
export function CheckIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 16 16" {...props}>
      <path d="m3 8.5 3.2 3.2L13 5" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Call Samples player                                                        */
/* -------------------------------------------------------------------------- */

/** Filled play triangle. */
export function PlayIcon(props: IconProps) {
  return (
    <svg
      {...base}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      <path d="M7 4.7c0-1.1 1.2-1.8 2.2-1.2l11 6.3c1 .6 1 2 0 2.6l-11 6.3c-1 .6-2.2-.1-2.2-1.2Z" />
    </svg>
  );
}

/** Two rounded pause bars. */
export function PauseIcon(props: IconProps) {
  return (
    <svg
      {...base}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      <rect x="5.5" y="4" width="5" height="16" rx="1.8" />
      <rect x="13.5" y="4" width="5" height="16" rx="1.8" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Final-CTA orbiting icon cluster                                            */
/* -------------------------------------------------------------------------- */

/** Trending-up chart. */
export function TrendingUpIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 24 24" {...props}>
      <path d="m3 16 6-6 4 4 8-9" />
      <path d="M14 5h7v7" />
    </svg>
  );
}

/** Sync / exchange arrows. */
export function SyncIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 24 24" {...props}>
      <path d="M4 12a8 8 0 0 1 13.66-5.66L20 8.5" />
      <path d="M20 4v4.5h-4.5" />
      <path d="M20 12a8 8 0 0 1-13.66 5.66L4 15.5" />
      <path d="M4 20v-4.5h4.5" />
    </svg>
  );
}
