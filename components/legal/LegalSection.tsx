"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./LegalPage.module.css";

type LegalSectionProps = {
  children: ReactNode;
  className?: string;
  /** Set by lib/rehype-legal-sections.ts on every h2 section ("01", "02"…). */
  "data-number"?: string;
  /** Set on the content before the first h2 — no divider above it. */
  "data-preamble"?: boolean | string;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const LIFT = 28;

/**
 * One section of a legal document. MDX `section` elements map here (see
 * LegalPage). Fades and lifts in once as it scrolls ~14% into the viewport.
 * Reduced motion is handled in CSS (LegalPage.module.css), because the
 * server can't know the preference and renders the hidden start state.
 */
export function LegalSection({
  children,
  className,
  "data-number": number,
  "data-preamble": preamble,
}: LegalSectionProps) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);
  const index = number ? Number(number) - 1 : 0;

  return (
    <motion.section
      className={[
        styles.section,
        preamble ? styles.preamble : "",
        // While still lifted, a TOC jump would land LIFT px low and then
        // slide up under the navbar — .pending adds LIFT to scroll-margin.
        shown || reduce ? "" : styles.pending,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-number={number}
      initial={reduce ? false : { opacity: 0, y: LIFT }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setShown(true)}
      // The lift moves headings without firing a scroll event, so ArticleToc
      // would keep its last measurement (taken while still 28px low) and
      // highlight the previous item. Ask it to re-measure once settled.
      onAnimationComplete={() => window.dispatchEvent(new Event("scroll"))}
      viewport={{ once: true, margin: "0px 0px -14% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: Math.min(index * 0.02, 0.1) }}
    >
      {children}
    </motion.section>
  );
}
