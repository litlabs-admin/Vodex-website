"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Entrance } from "@/components/ui/Entrance";
import styles from "./FaqTopics.module.css";

const CATEGORIES = ["Overview", "Product", "Compliance & Security", "Pricing"] as const;

type FaqItem = { question: string; answer: string; category: (typeof CATEGORIES)[number] };

/**
 * ⚠️ Mock/placeholder content per explicit user direction ("use the mock
 * content for now, can be replaced later") — generic, non-fabricated
 * answers, not the deeply Vodex-grounded rewrite style used for the
 * landing page's own FAQ (components/sections/Faq.tsx). Redistributes the
 * source PDF's 10 generic questions across 4 real categories (the PDF's
 * own "Tutorials"/"Podcasts & Interviews" tabs were dropped — no content
 * system exists for either) and adds a few short placeholders so every
 * tab has more than one item.
 */
const FAQS: FaqItem[] = [
  {
    category: "Overview",
    question: "What is Vodex AI?",
    answer:
      "Vodex is a GenAI voice agent platform built for enterprise engagement — reminders, collections, follow-ups, qualification, and payment negotiation, handled by AI voice agents that sound and respond like a real conversation.",
  },
  {
    category: "Overview",
    question: "Can small businesses use Vodex?",
    answer:
      "Vodex is built primarily for enterprise-scale engagement and collections teams. Smaller teams are welcome to reach out — pricing and onboarding are tailored to the size of your operation.",
  },
  {
    category: "Overview",
    question: "What training resources are available?",
    answer:
      "Our team walks every new account through setup, script configuration, and best practices. Additional guides and documentation live in the Help Center.",
  },
  {
    category: "Overview",
    question: "How can I request a new feature?",
    answer:
      "We take product feedback directly from customers. Reach out to your account team or email us and we'll route it to the product team.",
  },
  {
    category: "Overview",
    question: "How does Vodex help increase business efficiency?",
    answer:
      "By automating the repetitive parts of outreach — dialing, verification, re-dial scheduling, and disposition logging — so your team spends time on the conversations that actually need a person.",
  },
  {
    category: "Product",
    question: "What are Vodex's main features?",
    answer:
      "Right-party contact verification, automated re-dial logic, promise-to-pay capture, and compliance-aware call handling — all running on natural-sounding AI voice agents.",
  },
  {
    category: "Product",
    question: "What support options are available?",
    answer:
      "Every account gets a dedicated onboarding contact, plus ongoing support for configuration, integrations, and troubleshooting.",
  },
  {
    category: "Product",
    question: "What are the system requirements?",
    answer:
      "None on your end — Vodex is a cloud-hosted platform. Integration typically happens through your existing CRM or collections software via API.",
  },
  {
    category: "Product",
    question: "What industries can benefit from Vodex?",
    answer:
      "Debt collection, BNPL, healthcare billing, insurance, banking and lending, and any team running high-volume outbound engagement.",
  },
  {
    category: "Compliance & Security",
    question: "How secure is my data with Vodex?",
    answer:
      "Call data is encrypted, access-controlled, and retained according to your account's policy. See our compliance page for full certification details.",
  },
  {
    category: "Compliance & Security",
    question: "Is Vodex compliant with industry regulations?",
    answer:
      "Vodex's call handling is built around FDCPA, Reg F, and TCPA requirements, and our infrastructure follows SOC 2 and ISO 27001 practices.",
  },
  {
    category: "Pricing",
    question: "How is Vodex priced?",
    answer:
      "Pricing depends on call volume, integration complexity, and the specific use cases you need — talk to our team for a quote tailored to your operation.",
  },
  {
    category: "Pricing",
    question: "Is a free trial or demo available?",
    answer:
      "Yes — schedule a demo and we'll walk through a setup tailored to your use case before you commit to anything.",
  },
];

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
  // 4-category list here rather than a generic string[].
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
