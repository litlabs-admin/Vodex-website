"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Mockup, type IlloSpec } from "./SolutionIllustrations";
import styles from "./SolutionsTabs.module.css";

const EASE = [0.44, 0, 0.56, 1] as const;
const DWELL_MS = 8000;

type Card = {
  id: string;
  title: string;
  bullets: [string, string];
  link?: { text: string; href: string };
  illo: IlloSpec;
};

type Industry = {
  id: string;
  label: string;
  cards: Card[];
};

/**
 * Content is verbatim from the client's supplied copy (11 use cases across
 * 4 industries). The 11 cards resolve to exactly 6 illustration archetypes —
 * "Lead Qualification" (BPO/Insurance/Mortgage) and "Payment reminders"
 * (Debt Collection/BPO/Insurance/Mortgage) are near-identical in shape
 * across industries, so each archetype is parameterised via `illo.props`
 * rather than rebuilt per-industry. Kept inline rather than in `lib/` —
 * this project's established precedent for single-use static section
 * content (WhyItWorks, CoreFeatures, SolutionWorkflows).
 */
const INDUSTRIES: Industry[] = [
  {
    id: "debt-collection",
    label: "Debt Collection",
    cards: [
      {
        id: "dc-rpc",
        title: "Verifying Right-Party Contact (RPC)",
        bullets: [
          "Ensures secure interactions by verifying debtor identity before proceeding.",
          "Reduces compliance risks while maintaining a seamless experience.",
        ],
        illo: { id: "identity-check" },
      },
      {
        id: "dc-reminders",
        title: "Payment reminders",
        bullets: [
          "Our AI agents can handle thousands of reminder calls effortlessly, helping you increase connect rates and debt recovery rates.",
          "Timely, structured follow-ups that keep accounts on track, reducing delinquency rates.",
        ],
        link: { text: "Learn more about payment reminders", href: "/solutions/payment-reminders" },
        illo: {
          id: "reminder-call",
          props: { contact: "Andrew Cole", subject: "credit card payment", amount: "$184.50", due: "Due in 3 days" },
        },
      },
      {
        id: "dc-negotiation",
        title: "Payment plan negotiation",
        bullets: [
          "AI offers flexible repayment options based on debtor needs.",
          "Encourages successful resolutions while maintaining a positive experience.",
        ],
        illo: { id: "plan-negotiation" },
      },
      {
        id: "dc-redial",
        title: "Auto Re-dial",
        bullets: [
          "If a call goes unanswered, Vodex's AI automatically redials at optimal intervals, ensuring consistent follow-up.",
          "This feature increases the likelihood of connecting with debtors, maximizing collection opportunities and reducing missed contacts.",
        ],
        illo: { id: "redial-ladder" },
      },
    ],
  },
  {
    id: "bpo",
    label: "BPO",
    cards: [
      {
        id: "bpo-lead-qual",
        title: "Lead Qualification",
        bullets: [
          "Vodex AI screens leads with initial qualification calls, passing only high-quality prospects to clients.",
          "AI agents are available 24/7, ensuring lead qualification happens anytime, across all time zones.",
        ],
        illo: { id: "lead-funnel", props: { total: 879, noun: "prospects" } },
      },
      {
        id: "bpo-debt-collection",
        title: "Debt collection",
        bullets: [
          "Vodex AI agents initiate, timely follow-ups with debtors, improving recovery rates without manual intervention.",
          "Automates reminders and payment confirmations, and reducing workload for BPO clients.",
        ],
        link: { text: "Learn more about Voice AI for collections", href: "/solutions/debt-collection" },
        illo: {
          id: "reminder-call",
          props: { contact: "Daniel R.", subject: "outstanding balance", amount: "$412.00", due: "5 days overdue" },
        },
      },
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    cards: [
      {
        id: "ins-lead-qual",
        title: "Lead Qualification",
        bullets: [
          "AI conducts initial qualification calls, gathering key information from potential policyholders to assess their needs and eligibility.",
          "AI agents are available 24/7, ensuring lead qualification happens anytime, across all time zones.",
        ],
        illo: { id: "lead-funnel", props: { total: 800, noun: "policyholders" } },
      },
      {
        id: "ins-reminders",
        title: "Payment reminders",
        bullets: [
          "Send timely reminders to policyholders about upcoming payments, reducing missed deadlines and ensuring prompt renewals.",
          "Automating the process and minimizing manual intervention for insurance agents.",
        ],
        illo: {
          id: "reminder-call",
          props: { contact: "Daniel M.", subject: "premium payment", amount: "$96.20", due: "Due in 2 days" },
        },
      },
      {
        id: "ins-claims",
        title: "Claim qualification",
        bullets: [
          "AI collects key claim details, streamlining the process before passing it to human agents.",
          "This reduces wait times and ensures qualified claims are quickly escalated to agents.",
        ],
        illo: { id: "claim-intake" },
      },
    ],
  },
  {
    id: "mortgage",
    label: "Mortgage",
    cards: [
      {
        id: "mtg-lead-qual",
        title: "Lead Qualification",
        bullets: [
          "Our AI Agent verifies basic financial details, ensuring that only eligible mortgage leads advance in the pipeline.",
          "AI agents are available 24/7, ensuring lead qualification happens anytime, across all time zones.",
        ],
        illo: { id: "lead-funnel", props: { total: 800, noun: "applicants" } },
      },
      {
        id: "mtg-reminders",
        title: "Payment reminders",
        bullets: [
          "Vodex's AI sends timely calls to borrowers about upcoming mortgage payments, helping to prevent missed payments and late fees.",
          "Automating the process and minimizing manual intervention.",
        ],
        illo: {
          id: "reminder-call",
          props: { contact: "Mathew K.", subject: "mortgage payment", amount: "$1,240.00", due: "Due in 4 days" },
        },
      },
    ],
  },
];

const cardsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function SolutionsTabs() {
  const uid = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [autoplayStopped, setAutoplayStopped] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focusedWithin, setFocusedWithin] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const active = INDUSTRIES[activeIndex];
  const autoplayActive = !reduce && !autoplayStopped && !hovering && !focusedWithin && inView;

  // Self-rescheduling timer: cleans up and reschedules a fresh DWELL_MS
  // window whenever activeIndex or autoplayActive changes, rather than a
  // setInterval that would keep ticking through a paused state.
  useEffect(() => {
    if (!autoplayActive) return;
    const timer = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % INDUSTRIES.length);
    }, DWELL_MS);
    return () => clearTimeout(timer);
  }, [autoplayActive, activeIndex]);

  const selectIndex = (index: number) => {
    setAutoplayStopped(true);
    setActiveIndex(index);
    setHoveredId(null);
  };

  const focusTab = (index: number) => {
    selectIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = INDUSTRIES.length - 1;
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(activeIndex === last ? 0 : activeIndex + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(activeIndex === 0 ? last : activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(last);
        break;
    }
  };

  return (
    <div
      ref={rootRef}
      className={styles.lifecycle}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setFocusedWithin(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setFocusedWithin(false);
        }
      }}
    >
      <div
        className={styles.tabSwitcher}
        role="tablist"
        aria-label="Industry"
        onKeyDown={handleKeyDown}
      >
        {INDUSTRIES.map((industry, i) => {
          const isActive = i === activeIndex;
          const tabId = `${uid}-tab-${industry.id}`;
          const panelId = `${uid}-panel-${industry.id}`;
          return (
            <button
              key={industry.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              className={[styles.tab, isActive ? styles.tabActive : ""].join(" ").trim()}
              onClick={() => selectIndex(i)}
            >
              {isActive && (
                <motion.span
                  layoutId="solutionsTabFill"
                  className={styles.tabFill}
                  transition={{ duration: reduce ? 0 : 0.42, ease: EASE }}
                />
              )}
              <span className={styles.tabLabel}>{industry.label}</span>
              {isActive && !reduce && !autoplayStopped && (
                <span
                  key={activeIndex}
                  className={styles.tabProgress}
                  data-active={autoplayActive || undefined}
                  style={{ ["--dwell" as string]: `${DWELL_MS}ms` }}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          id={`${uid}-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active.id}`}
          tabIndex={0}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <motion.div
            className={styles.grid}
            data-count={active.cards.length}
            variants={reduce ? undefined : cardsContainer}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
          >
            {active.cards.map((card, i) => (
              <motion.article
                key={card.id}
                className={styles.card}
                variants={reduce ? undefined : cardVariant}
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ duration: 0.25, ease: EASE }}
                onMouseEnter={() => setHoveredId(card.id)}
                onMouseLeave={() => setHoveredId((h) => (h === card.id ? null : h))}
              >
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <ul className={styles.cardBullets}>
                    {card.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  {card.link && (
                    <a className={styles.cardLink} href={card.link.href}>
                      {card.link.text}
                    </a>
                  )}
                </div>
                <Mockup spec={card.illo} hovered={hoveredId === card.id} index={i} />
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
