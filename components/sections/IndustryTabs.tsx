"use client";

import { useLayoutEffect, useRef, useState } from "react";
import styles from "./IndustryTabs.module.css";

type IndustryTabsProps = {
  industries: string[];
};

/**
 * Segmented tab control with a sliding indicator. Only visual state changes
 * on click — there's no per-industry copy yet, so nothing below the tabs
 * re-renders (see Solutions.tsx).
 */
export function IndustryTabs({ industries }: IndustryTabsProps) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const tab = tabRefs.current[active];
    if (!container || !tab) return;

    const measure = () => {
      const containerRect = container.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();
      setIndicator({
        width: tabRect.width,
        height: tabRect.height,
        x: tabRect.left - containerRect.left,
        y: tabRect.top - containerRect.top,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const focusTab = (index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const last = industries.length - 1;
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(active === last ? 0 : active + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(active === 0 ? last : active - 1);
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
      ref={containerRef}
      className={styles.tabs}
      role="tablist"
      aria-label="Industry"
      onKeyDown={handleKeyDown}
    >
      {indicator && (
        <span
          className={styles.indicator}
          style={{
            width: indicator.width,
            height: indicator.height,
            transform: `translate(${indicator.x}px, ${indicator.y}px)`,
          }}
          aria-hidden="true"
        />
      )}
      {industries.map((industry, i) => (
        <button
          key={industry}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          type="button"
          role="tab"
          aria-selected={i === active}
          tabIndex={i === active ? 0 : -1}
          className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
          onClick={() => setActive(i)}
        >
          {industry}
        </button>
      ))}
    </div>
  );
}
