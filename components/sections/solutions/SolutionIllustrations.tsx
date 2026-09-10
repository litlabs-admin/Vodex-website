"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ArrowRight, HandshakeIcon, ShieldCheckIcon } from "@/components/ui/icons";
import styles from "./SolutionIllustrations.module.css";

/**
 * All six Solutions illustrations + their shared motion grammar live in one
 * file — mirroring the benchmark this section was designed against (a single
 * `Mockups.tsx` holding every illustration for the same reason: the shared
 * "working → resolved" grammar has to stay visible in one place, not spread
 * across six files that could quietly drift apart).
 *
 * None of the *content* below is copied from that benchmark — every visual
 * here is original, built from Vodex's own supplied use-case copy. Only the
 * underlying *techniques* (a ping-pong working/resolved hook, viewport-gated
 * loops, reduced-motion pinned to the informative end state) are reused,
 * because they are the right tools for this job regardless of which project
 * proved them first.
 */

const EASE = [0.44, 0, 0.56, 1] as const;
const SPRING_EASE = [0.22, 1, 0.36, 1] as const;

// Asymmetric dwell: the resolved state is on screen ~64% of the time, so the
// loop sells the outcome, not the process.
const WORK_MS = 1900;
const DONE_MS = 3400;
const STAGGER_MS = 280;

type IlloProps = { hovered: boolean; index: number };

/**
 * Ping-pongs an illustration between "working" and "resolved" via a
 * self-rescheduling setTimeout (not setInterval, so the two phases can have
 * different dwell times). Viewport-gated with no `once`, so five/six
 * simultaneous illustrations don't burn cycles off-screen. Reduced motion
 * pins `active: true` — the informative, resolved state — rather than
 * freezing on "verifying…".
 */
function useSolutionMotion(hovered: boolean, index = 0) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [cycled, setCycled] = useState(false);

  useEffect(() => {
    if (reduce || !inView) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = (next: boolean, wait: number) => {
      timer = setTimeout(() => {
        if (stopped) return;
        setCycled(next);
        schedule(!next, next ? DONE_MS : WORK_MS);
      }, wait);
    };
    schedule(true, 600 + index * STAGGER_MS);
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [reduce, inView, index]);

  const loop = !reduce && inView;
  return { ref, active: reduce ? true : hovered || cycled, loop, inView };
}

/** Fades a chip/element in once `active` flips true; snaps back out otherwise. */
function reveal(active: boolean, delay = 0) {
  return {
    initial: { opacity: 0, y: 10, scale: 0.96 },
    animate: active
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 10, scale: 0.96 },
    transition: { duration: 0.45, ease: SPRING_EASE, delay: active ? delay : 0 },
  } as const;
}

/**
 * Shared illustration shell — a recessed dark "screen" (see the panel's
 * inset box-shadow in the CSS module) with a raised sub-card floating on
 * top, the same elevation grammar as the benchmark translated to a dark
 * surface. `role="img"` + a full prose `aria-label` describes the whole
 * animation; the entire animated subtree is `aria-hidden` — the same
 * pattern already established by `EngagementQueueIllustration` on the DROS
 * section.
 */
function Panel({
  rootRef,
  label,
  children,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  label: string;
  children: ReactNode;
}) {
  return (
    <div ref={rootRef} className={styles.panel} role="img" aria-label={label}>
      <span className={styles.panelSheen} aria-hidden="true" />
      <motion.div
        className={styles.panelInner}
        aria-hidden="true"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <motion.path
        d="M2.5 6.5L5 9L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, ease: EASE }}
      />
    </svg>
  );
}

function LiveDot({ loop }: { loop: boolean }) {
  return (
    <motion.span
      className={styles.liveDot}
      aria-hidden="true"
      animate={loop ? { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] } : { scale: 1, opacity: 1 }}
      transition={loop ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
    />
  );
}

// Normalised peak heights (fraction of the bar's full height) — a
// non-monotonic hand-picked sequence reads as a travelling wave rather than
// an obvious sine, and scaleY (never height) keeps every bar composited.
const WAVE_PEAKS = [0.35, 0.55, 0.85, 0.45, 0.7, 0.3, 0.6, 0.95, 0.4, 0.65, 0.5, 0.8];

function Waveform({ active, loop }: { active: boolean; loop: boolean }) {
  return (
    <div className={styles.waveform} aria-hidden="true">
      {WAVE_PEAKS.map((peak, i) => (
        <motion.span
          key={i}
          className={styles.waveBar}
          animate={
            loop
              ? { scaleY: [peak * 0.4, peak, peak * 0.4] }
              : { scaleY: active ? peak : peak * 0.4 }
          }
          transition={
            loop
              ? { duration: 0.85, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

function StatusPill({
  active,
  pendingText,
  doneText,
}: {
  active: boolean;
  pendingText: string;
  doneText: string;
}) {
  return (
    <span className={[styles.statusPill, active ? styles.statusPillDone : ""].join(" ").trim()}>
      {active ? (
        <>
          <Check /> {doneText}
        </>
      ) : (
        <>
          <span className={styles.spinner} aria-hidden="true" /> {pendingText}
        </>
      )}
    </span>
  );
}

/** Counts up once, the first time the card scrolls into view — never runs
 * backwards, so the working/resolved loop can't turn a headline figure into
 * a yo-yo. Driven off `inView` (not `active`) for exactly that reason. */
function CountUp({ active, to, className }: { active: boolean; to: number; className?: string }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("en-US"));
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;
    const controls = animate(mv, to, { duration: 1.1, ease: SPRING_EASE });
    return () => controls.stop();
  }, [active, to, mv]);

  return <motion.span className={className}>{rounded}</motion.span>;
}

function Clock({ loop }: { loop: boolean }) {
  return (
    <span className={styles.clock} aria-hidden="true">
      <motion.span
        className={styles.clockHand}
        animate={loop ? { rotate: 360 } : { rotate: 220 }}
        transition={loop ? { duration: 8, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      />
    </span>
  );
}

/* -------------------------------------------------------------------------
   1 — IdentityCheck (Debt Collection · Verifying Right-Party Contact)
   Three masked fields flip to checks as a verification bar fills, then a
   timestamped compliance chip pops in. A literal read of "verify identity
   before proceeding."
   ------------------------------------------------------------------------- */

function IdentityCheck({ hovered, index }: IlloProps) {
  const { ref, active, loop } = useSolutionMotion(hovered, index);
  const fields = [
    { label: "Date of birth", value: "••/••/••••" },
    { label: "ZIP code", value: "•••••" },
    { label: "Last 4 of SSN", value: "••••" },
  ];

  return (
    <Panel
      rootRef={ref}
      label={
        active
          ? "Identity verification illustration: date of birth, ZIP code and last four of SSN are all confirmed, and a compliance log is written."
          : "Identity verification illustration: date of birth, ZIP code and last four of SSN are being checked before the call proceeds."
      }
    >
      <div className={styles.subCard}>
        <div className={styles.subCardHead}>
          <span className={styles.subCardTitle}>
            Leo Martins · ••••4821
            <span className={styles.microTag}>FDCPA</span>
          </span>
          <StatusPill active={active} pendingText="Verifying…" doneText="Confirmed" />
        </div>
        <div className={styles.thinTrack}>
          <motion.div
            className={styles.thinFill}
            animate={{ width: active ? "100%" : "42%" }}
            transition={{ duration: active ? 0.6 : 0.3, ease: EASE }}
          />
        </div>
        <div className={styles.fieldList}>
          {fields.map((field, i) => (
            <div className={styles.fieldRow} key={field.label}>
              <span className={styles.fieldLabel}>{field.label}</span>
              <span className={styles.fieldValue}>
                <motion.span
                  className={styles.fieldMasked}
                  animate={{ opacity: active ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {field.value}
                </motion.span>
                <motion.span
                  className={styles.fieldCheck}
                  animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
                  transition={{ duration: 0.3, ease: EASE, delay: active && loop ? i * 0.1 : 0 }}
                >
                  <Check />
                </motion.span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <motion.div className={styles.chip} {...reveal(active, 0.32)}>
        <ShieldCheckIcon className={styles.chipIcon} aria-hidden="true" />
        <span>Compliance log written · 0:12</span>
      </motion.div>
    </Panel>
  );
}

/* -------------------------------------------------------------------------
   2 — ReminderCall (Debt Collection · BPO · Insurance · Mortgage)
   A live outbound call resolves to a confirmed payment. The agent's script
   and the customer's reply crossfade in the same slot — a genuine two-sided
   conversation at zero extra height — and the live tag becomes a call
   timer once the call resolves. Prop-driven so the same mechanic serves
   four different reminder use cases.
   ------------------------------------------------------------------------- */

type ReminderCallProps = {
  contact: string;
  subject: string;
  amount: string;
  due: string;
};

function ReminderCall({
  hovered,
  index,
  contact,
  subject,
  amount,
  due,
}: IlloProps & ReminderCallProps) {
  const { ref, active, loop } = useSolutionMotion(hovered, index);
  const firstName = contact.split(" ")[0];

  return (
    <Panel
      rootRef={ref}
      label={
        active
          ? `Reminder call illustration: ${contact} replies that they can pay their ${subject} today, and the payment is confirmed.`
          : `Reminder call illustration: an AI agent is live on a call with ${contact} about their ${subject}.`
      }
    >
      <div className={styles.subCard}>
        <div className={styles.callHead}>
          <span className={styles.avatar} aria-hidden="true">
            V
          </span>
          <div className={styles.callWho}>
            <span className={styles.callName}>{contact}</span>
            <span className={styles.callSubject}>{subject}</span>
          </div>
          <span className={styles.liveTag}>
            <LiveDot loop={loop} /> {active ? "0:42" : "Live"}
          </span>
        </div>
        <Waveform active={active} loop={loop} />
        <div className={styles.scriptSlot}>
          <AnimatePresence mode="wait" initial={false}>
            {active ? (
              <motion.p
                key="reply"
                className={[styles.callScript, styles.callReply].join(" ")}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                &ldquo;{firstName}: Yes — I can take care of that today.&rdquo;
              </motion.p>
            ) : (
              <motion.p
                key="ask"
                className={styles.callScript}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                &ldquo;Hi {firstName}, following up on your {subject}. Have you had a chance to
                take care of it yet?&rdquo;
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className={styles.statusRow}>
          <StatusPill active={active} pendingText="On call…" doneText="Payment confirmed" />
        </div>
      </div>
      <motion.div className={styles.chip} {...reveal(active, 0.2)}>
        <span className={styles.chipAmount}>{amount}</span>
        <span className={active ? styles.chipDone : styles.chipPending}>
          {active ? "Paid" : due}
        </span>
      </motion.div>
    </Panel>
  );
}

/* -------------------------------------------------------------------------
   3 — PlanNegotiation (Debt Collection · Payment plan negotiation)
   One balance splits into three real, dated installments — a literal read
   of "flexible repayment options."
   ------------------------------------------------------------------------- */

function PlanNegotiation({ hovered, index }: IlloProps) {
  const { ref, active, loop } = useSolutionMotion(hovered, index);
  const installments = [
    { date: "Apr 12", amount: "$428" },
    { date: "May 12", amount: "$428" },
    { date: "Jun 12", amount: "$428" },
  ];

  return (
    <Panel
      rootRef={ref}
      label={
        active
          ? "Payment plan illustration: the balance has split into three accepted monthly installments."
          : "Payment plan illustration: an AI agent is negotiating a flexible repayment plan for the balance."
      }
    >
      <div className={styles.subCard}>
        <div className={styles.subCardHead}>
          <span className={styles.subCardTitle}>Amira R. · Balance $1,284</span>
          <StatusPill active={active} pendingText="Negotiating…" doneText="Plan accepted" />
        </div>
        <div className={styles.balanceBar}>
          {installments.map((step, i) => (
            <motion.div
              key={step.date}
              className={styles.balanceSegment}
              animate={{ marginInline: active ? 2 : 0, borderRadius: active ? 6 : 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: active && loop ? i * 0.08 : 0 }}
            />
          ))}
        </div>
        <div className={styles.installmentLabels}>
          {installments.map((step, i) => (
            <motion.div
              key={step.date}
              className={styles.installmentItem}
              animate={{ opacity: active ? 1 : 0, y: active ? 0 : 4 }}
              transition={{
                duration: 0.35,
                ease: EASE,
                delay: active && loop ? 0.2 + i * 0.08 : 0,
              }}
            >
              <span className={styles.installmentDate}>{step.date}</span>
              <span className={styles.installmentAmount}>{step.amount}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div className={styles.chip} {...reveal(active, 0.32)}>
        <HandshakeIcon className={styles.chipIcon} aria-hidden="true" />
        <span>Promise-to-pay captured · 3 installments</span>
      </motion.div>
    </Panel>
  );
}

/* -------------------------------------------------------------------------
   4 — RedialLadder (Debt Collection · Auto Re-dial)
   Two unanswered attempts, then a connector draws down to a third that
   connects — the "optimal intervals, consistent follow-up" story.
   ------------------------------------------------------------------------- */

function RedialLadder({ hovered, index }: IlloProps) {
  const { ref, active, loop } = useSolutionMotion(hovered, index);
  const attempts = [{ time: "9:14 AM" }, { time: "1:40 PM" }, { time: "6:05 PM" }];
  const last = attempts.length - 1;

  return (
    <Panel
      rootRef={ref}
      label={
        active
          ? "Auto re-dial illustration: two attempts went unanswered, and the third attempt connects."
          : "Auto re-dial illustration: the AI agent is retrying an unanswered call at optimal intervals."
      }
    >
      <div className={styles.subCard}>
        <div className={styles.subCardHead}>
          <span className={styles.subCardTitle}>Acct #7734 · Auto re-dial</span>
          <StatusPill
            active={active}
            pendingText="Retrying · 6:05 PM"
            doneText="Connected"
          />
        </div>
        <div className={styles.ladder}>
          {attempts.map((attempt, i) => (
            <div className={styles.ladderRow} key={attempt.time}>
              <div className={styles.ladderTrack}>
                <span
                  className={[styles.ladderDot, active && i === last ? styles.ladderDotDone : ""]
                    .join(" ")
                    .trim()}
                >
                  {active && i === last && <span className={styles.ladderPing} aria-hidden="true" />}
                </span>
                {i < last && (
                  <motion.span
                    className={styles.ladderConnector}
                    animate={{ scaleY: active ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: active && loop ? i * 0.3 : 0 }}
                  />
                )}
              </div>
              <div className={styles.ladderInfo}>
                <span className={styles.ladderTime}>
                  Attempt {i + 1} · {attempt.time}
                </span>
                <motion.span
                  className={i === last ? styles.ladderStatusDone : styles.ladderStatusMuted}
                  animate={{ opacity: active ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: active && loop ? i * 0.3 + 0.15 : 0 }}
                >
                  {i === last ? "Connected · 0:42" : "No answer"}
                </motion.span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* -------------------------------------------------------------------------
   5 — LeadFunnel (BPO · Insurance · Mortgage · Lead Qualification)
   Four leads get screened while a headline count climbs — prop-driven for
   three industries' totals and nouns.
   ------------------------------------------------------------------------- */

type LeadFunnelProps = { total: number; noun: string };

function LeadFunnel({ hovered, index, total, noun }: IlloProps & LeadFunnelProps) {
  const { ref, active, loop, inView } = useSolutionMotion(hovered, index);
  const leads = [
    { name: "Lead #482", initials: "JM", qualified: true },
    { name: "Lead #483", initials: "RK", qualified: true },
    { name: "Lead #484", initials: "TS", qualified: false },
    { name: "Lead #485", initials: "AP", qualified: true },
  ];

  return (
    <Panel
      rootRef={ref}
      label={`Lead qualification illustration: four leads are screened, and the running total climbs to ${total} qualified ${noun}.`}
    >
      <div className={styles.subCard}>
        <div className={styles.subCardHead}>
          <span className={styles.subCardTitle}>Lead qualification</span>
          <span className={styles.clockBadge}>
            <Clock loop={loop} /> 24/7
          </span>
        </div>
        <div className={styles.leadList}>
          {leads.map((lead, i) => (
            <div className={styles.leadRow} key={lead.name}>
              <span className={styles.leadLeft}>
                <span className={styles.leadAvatar} aria-hidden="true">
                  {lead.initials}
                </span>
                <span className={styles.leadName}>{lead.name}</span>
              </span>
              <motion.span
                className={lead.qualified ? styles.leadBadgeDone : styles.leadBadgeMuted}
                animate={{ opacity: active ? 1 : 0.001, y: active ? 0 : 4 }}
                transition={{ duration: 0.3, delay: active && loop ? i * 0.12 : 0 }}
              >
                {lead.qualified ? "Qualified" : "Not a fit"}
              </motion.span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.counterCard}>
        <CountUp active={inView} to={total} className={styles.counterNumber} />
        <span className={styles.counterLabel}>Total {noun} qualified</span>
        <span className={styles.counterDelta}>▲ 12% this week</span>
      </div>
    </Panel>
  );
}

/* -------------------------------------------------------------------------
   6 — ClaimIntake (Insurance · Claim qualification)
   A claim form fills itself field by field — the last field grows a
   photo-thumbnail strip instead of plain text — then hands off with no
   wait.
   ------------------------------------------------------------------------- */

function ClaimIntake({ hovered, index }: IlloProps) {
  const { ref, active, loop } = useSolutionMotion(hovered, index);
  const fields = [
    { label: "Policy #", value: "VA-48213" },
    { label: "Incident date", value: "Sep 8" },
    { label: "Vehicle", value: "2019 Civic" },
  ];

  return (
    <Panel
      rootRef={ref}
      label={
        active
          ? "Claim intake illustration: the claim form is complete, three photos attached, and routed to a claims specialist with no wait."
          : "Claim intake illustration: an AI agent is collecting the policy number, incident date, vehicle and photos for a claim."
      }
    >
      <div className={styles.subCard}>
        <div className={styles.subCardHead}>
          <span className={styles.subCardTitle}>Auto claim · John</span>
          <StatusPill active={active} pendingText="Collecting details…" doneText="Ready for review" />
        </div>
        <div className={styles.fieldList}>
          {fields.map((field, i) => (
            <div className={styles.fieldRow} key={field.label}>
              <span className={styles.fieldLabel}>{field.label}</span>
              <span className={styles.fieldValue}>
                <motion.span
                  className={styles.fieldMasked}
                  animate={{ opacity: active ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  —
                </motion.span>
                <motion.span
                  className={styles.fieldFilled}
                  animate={{ opacity: active ? 1 : 0, x: active ? 0 : 6 }}
                  transition={{ duration: 0.3, ease: EASE, delay: active && loop ? i * 0.1 : 0 }}
                >
                  {field.value}
                </motion.span>
              </span>
            </div>
          ))}
          <div className={styles.fieldRow}>
            <span className={styles.fieldLabel}>Photos</span>
            <span className={styles.photoStrip}>
              {[0, 1, 2].map((p) => (
                <motion.span
                  key={p}
                  className={styles.photoThumb}
                  animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
                  transition={{
                    duration: 0.25,
                    ease: EASE,
                    delay: active && loop ? 0.3 + fields.length * 0.1 + p * 0.05 : 0,
                  }}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
      <motion.div className={styles.chip} {...reveal(active, 0.5)}>
        <ArrowRight className={styles.chipIcon} aria-hidden="true" />
        <span>Routed to claims specialist · Wait 0:00</span>
      </motion.div>
    </Panel>
  );
}

/* -------------------------------------------------------------------------
   Registry
   ------------------------------------------------------------------------- */

export type IlloSpec =
  | { id: "identity-check" }
  | { id: "reminder-call"; props: ReminderCallProps }
  | { id: "plan-negotiation" }
  | { id: "redial-ladder" }
  | { id: "lead-funnel"; props: LeadFunnelProps }
  | { id: "claim-intake" };

export function Mockup({
  spec,
  hovered,
  index,
}: {
  spec: IlloSpec;
  hovered: boolean;
  index: number;
}) {
  switch (spec.id) {
    case "identity-check":
      return <IdentityCheck hovered={hovered} index={index} />;
    case "reminder-call":
      return <ReminderCall hovered={hovered} index={index} {...spec.props} />;
    case "plan-negotiation":
      return <PlanNegotiation hovered={hovered} index={index} />;
    case "redial-ladder":
      return <RedialLadder hovered={hovered} index={index} />;
    case "lead-funnel":
      return <LeadFunnel hovered={hovered} index={index} {...spec.props} />;
    case "claim-intake":
      return <ClaimIntake hovered={hovered} index={index} />;
    default:
      return null;
  }
}
