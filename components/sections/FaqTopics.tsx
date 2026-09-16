"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./FaqTopics.module.css";
import { FAQ_PAGE_CATEGORIES as CATEGORIES, FAQ_PAGE_FAQS as FAQS } from "@/lib/faqs";

export function FaqTopics() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  const activeCategory = CATEGORIES[activeIndex];
  const items = FAQS.filter((item) => item.category === activeCategory);

  // Same measuring approach as IndustryTabs.tsx, adapted for a fixed
  // category list here rather than a generic string[].
  useLayoutEffect(() => {
    const container = containerRef.current;
    const tab = tabRefs.current[activeIndex];
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
  }, [activeIndex]);

  // Unlike IndustryTabs (purely decorative today), selecting a category here
  // actually swaps the list below — reset openIndex so it never points at an
  // item that's no longer in the filtered list.
  const selectIndex = (index: number) => {
    setActiveIndex(index);
    setOpenIndex(-1);
  };

  const focusTab = (index: number) => {
    selectIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const last = CATEGORIES.length - 1;
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
    <section className={styles.section} aria-labelledby="faq-topics-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Help &amp; answers</p>
          <h2 id="faq-topics-title" className={styles.title}>
            Answer by <span className="accent">topic</span>
          </h2>
          <p className={styles.lead}>
            Security certifications held by Vodex and the collection regulations the platform
            enforces on every conversation.
          </p>
        </Entrance>

        <div
          ref={containerRef}
          className={styles.tabs}
          role="tablist"
          aria-label="FAQ category"
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
          {CATEGORIES.map((category, i) => (
            <button
              key={category}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              tabIndex={i === activeIndex ? 0 : -1}
              className={`${styles.tab} ${i === activeIndex ? styles.tabActive : ""}`}
              onClick={() => selectIndex(i)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.list}>
          {items.map(({ question, answer }, i) => {
            const open = i === openIndex;
            return (
              <div key={question} className={`${styles.item} ${open ? styles.itemOpen : ""}`}>
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={open}
                  aria-controls={`faq-topic-panel-${i}`}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  {question}
                  <svg
                    className={styles.plus}
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M8 1.5v13M1.5 8h13" />
                  </svg>
                </button>
                <div id={`faq-topic-panel-${i}`} className={styles.panel}>
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
