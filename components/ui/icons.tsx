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

/** Plain X / cross — "traditional process" pain points in the comparison panel. */
export function XIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 16 16" {...props}>
      <path d="m3.5 3.5 9 9M12.5 3.5l-9 9" />
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

/* -------------------------------------------------------------------------- */
/* Solutions page icons                                                       */
/* -------------------------------------------------------------------------- */

/** Bank / institution building — pediment, columns and base. */
export function BankIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 36 32" {...props}>
      <path d="M18 2 33.5 11.5H2.5Z" strokeLinejoin="round" />
      <path d="M5 14.5v12M13 14.5v12M23 14.5v12M31 14.5v12" />
      <path d="M2.5 26.5h31" />
      <path d="M2 30.5h32" />
    </svg>
  );
}

/** Ringing handset — distinct from PhoneLinesIcon's call-log composite. */
export function PhoneCallIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 28 28" {...props}>
      <path d="M4 6.2A2 2 0 0 1 6 4h2.8a1.2 1.2 0 0 1 1.2 1l.7 3.3a1.2 1.2 0 0 1-.3 1.1l-1.6 1.7a14 14 0 0 0 6.4 6.4l1.7-1.6a1.2 1.2 0 0 1 1.1-.3l3.3.7a1.2 1.2 0 0 1 1 1.2V20a2 2 0 0 1-2 2A17 17 0 0 1 4 6.2Z" />
      <path d="M15.5 3.2a6 6 0 0 1 4.8 4.8" />
      <path d="M18 .8a9.5 9.5 0 0 1 7.7 7.7" />
    </svg>
  );
}

/** Shield with a medical plus — same shield silhouette as ShieldCheckIcon. */
export function ShieldPlusIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 36 44" {...props}>
      <path d="M18 1.8 34.2 8.6v11.7c0 9.8-7 17-16.2 20.3C8.8 37.3 1.8 30.1 1.8 20.3V8.6Z" />
      <path d="M18 15v12M12 21h12" />
    </svg>
  );
}

/** Reminder bell. */
export function BellIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 24 24" {...props}>
      <path d="M12 2.5v1.8" />
      <path
        d="M5 17h14l-1.8-2.3A6 6 0 0 1 16 11V9.5a4 4 0 0 0-8 0V11a6 6 0 0 1-1.2 3.7Z"
        strokeLinejoin="round"
      />
      <path d="M9.5 20a2.5 2.5 0 0 0 5 0" />
    </svg>
  );
}

/** Lead funnel. */
export function FunnelIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 24 24" {...props}>
      <path d="M3 4h18l-7 9v6l-4 2v-8Z" strokeLinejoin="round" />
    </svg>
  );
}

/** Broadcast mast with signal ticks — utilities & telecom. */
export function SignalTowerIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 32 32" {...props}>
      <path d="M16 11v17" />
      <path d="M13 11 11 9M10.5 13.5 7 10M8 16.5 3 12" />
      <path d="M19 11 21 9M21.5 13.5 25 10M24 16.5 29 12" />
      <circle cx="16" cy="9" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Four-pointed sparkle — effortless / automated compliance. */
export function SparkleIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 28 28" strokeLinejoin="round" {...props}>
      <path d="M14 2c.8 4.3 1.7 6.2 3.8 8.2 2.1 2 4 3 8.2 3.8-4.3.8-6.2 1.7-8.2 3.8-2 2.1-3 4-3.8 8.2-.8-4.3-1.7-6.2-3.8-8.2-2.1-2-4-3-8.2-3.8 4.3-.8 6.2-1.7 8.2-3.8C12.3 8.2 13.3 6.3 14 2Z" />
    </svg>
  );
}

/** Padlock — script locking / compliance controls. */
export function LockIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 24 24" strokeLinejoin="round" {...props}>
      <rect x="4.5" y="11" width="15" height="10" rx="2" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
      <circle cx="12" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Blog / resources                                                           */
/* -------------------------------------------------------------------------- */

/** Magnifying glass — search input on the blog listing. */
export function SearchIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 20 20" {...props}>
      <circle cx="8.5" cy="8.5" r="6" />
      <path d="m18 18-4.3-4.3" />
    </svg>
  );
}

/** Filled play triangle in a screen frame — video/podcast overlays. */
export function PlayFrameIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 28 24" {...props}>
      <rect x="2" y="2" width="24" height="20" rx="3" />
      <path d="M11.5 8.3v7.4l6.5-3.7Z" fill="currentColor" stroke="none" strokeLinejoin="round" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Resources mega menu icons                                                  */
/* -------------------------------------------------------------------------- */

/** Article page — a headline plus body lines. */
export function ArticleIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 28 32" {...props}>
      <rect x="2" y="2" width="24" height="28" rx="2" />
      <path d="M8 10h12M8 16h12M8 22h7" />
    </svg>
  );
}

/** Briefcase — case studies. */
export function CaseStudyIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 28 24" {...props}>
      <rect x="2" y="7" width="24" height="15" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      <path d="M2 14h24" />
    </svg>
  );
}

/** Lab flask — research & reports. */
export function ResearchIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 24 28" {...props}>
      <path d="M9 2h6M10 2v7.5L3.8 21.6A2 2 0 0 0 5.6 24.5h12.8a2 2 0 0 0 1.8-2.9L14 9.5V2" strokeLinejoin="round" />
      <path d="M6.5 17.5h11" />
    </svg>
  );
}

/** Circled "i" — About. */
export function InfoIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 11v6" />
      <circle cx="12" cy="7.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Folded newspaper — News. */
export function NewsIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 28 24" {...props}>
      <path
        d="M4 4h16a2 2 0 0 1 2 2v13a1.5 1.5 0 0 0 1.5 1.5H6.5A2.5 2.5 0 0 1 4 18Z"
        strokeLinejoin="round"
      />
      <path d="M8 8.5h8M8 12.5h8M8 16h5" />
    </svg>
  );
}

/** Envelope — Contact Us. */
export function MailIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 28 22" {...props}>
      <rect x="2" y="2" width="24" height="18" rx="2.5" />
      <path d="m3.2 4 10.8 8L24.8 4" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact page icons                                                         */
/* -------------------------------------------------------------------------- */

/** Small bar chart — Sales. */
export function ChartBarIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 24 24" strokeLinejoin="round" {...props}>
      <rect x="3.5" y="12" width="5" height="9" />
      <rect x="9.5" y="7" width="5" height="14" />
      <rect x="15.5" y="3" width="5" height="18" />
    </svg>
  );
}

/** Megaphone — Marketing. */
export function MegaphoneIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 28 24" strokeLinejoin="round" {...props}>
      <path d="M2 9v6h4l8 6V3L6 9Z" />
      <path d="M14 3a11 11 0 0 1 0 18" />
      <path d="M10.5 15v5a2 2 0 0 1-2 2h-.5a2 2 0 0 1-2-2v-4" />
    </svg>
  );
}

/** Linked heart — Partnership. */
export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 28 26" {...props}>
      <path d="M14 23.5 3.4 13.2a6 6 0 0 1 0-8.5 5.9 5.9 0 0 1 8.4 0L14 6.9l2.2-2.2a5.9 5.9 0 0 1 8.4 0 6 6 0 0 1 0 8.5Z" />
      <path d="m9.5 12.5 3 3 6-6" />
    </svg>
  );
}

/** Cloud with a padlock — Data Protection Officer. */
export function CloudLockIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 32 26" strokeLinejoin="round" {...props}>
      <path d="M9 20.5a6.5 6.5 0 0 1-1.2-12.9A7.5 7.5 0 0 1 22 6.6a5.6 5.6 0 0 1-1 11.1" />
      <rect x="12.5" y="13.5" width="10" height="8" rx="1.6" />
      <path d="M14.7 13.5v-2a2.8 2.8 0 0 1 5.6 0v2" />
    </svg>
  );
}

/** Chevron down — dropdown/select triggers. */
export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...strokeIcon} viewBox="0 0 16 10" {...props}>
      <path d="m2 2.5 6 5 6-5" />
    </svg>
  );
}
