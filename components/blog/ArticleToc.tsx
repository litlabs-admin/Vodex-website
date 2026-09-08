"use client";

import { useEffect, useState } from "react";
import styles from "./ArticleToc.module.css";

// Clears this site's sticky navbar (--nav-h: 64px) plus a little breathing
// room — matches the scroll-margin-top set on every heading in ArticleBody.
const ACTIVE_OFFSET = 96;

type TocItem = { id: string; text: string };

/**
 * Sticky left-hand table of contents that highlights the current section
 * while scrolling — a direct port of the Chapeau benchmark's ArticleToc
 * algorithm (components/insights/ArticleToc.tsx there).
 *
 * Deliberately NOT IntersectionObserver: a fast scroll (Page Down, a large
 * wheel delta) can carry a heading past a narrow observed band in a single
 * frame without ever intersecting it. Recomputing from getBoundingClientRect
 * on every scroll (rAF-throttled) has no such gap — same reasoning as the
 * benchmark's own code comment.
 */
export function ArticleToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length < 2) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    let ticking = false;
    const updateActive = () => {
      ticking = false;
      let current: string | null = null;
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= ACTIVE_OFFSET) {
          current = el.id;
        } else {
          // Headings are in document order — once one is below the line,
          // the rest are too.
          break;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className={styles.nav}>
      <div className={styles.sticky}>
        <p className={styles.label}>On this page</p>
        <ol className={styles.list}>
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "location" : undefined}
                  className={`${styles.link} ${active ? styles.linkActive : ""}`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
