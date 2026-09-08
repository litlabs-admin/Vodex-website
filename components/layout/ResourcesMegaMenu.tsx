"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ArticleIcon,
  CaseStudyIcon,
  ChatIcon,
  InfoIcon,
  MailIcon,
  NewsIcon,
  PhoneCallIcon,
  PlayFrameIcon,
  ResearchIcon,
  TrendingUpIcon,
} from "@/components/ui/icons";
import styles from "./ResourcesMegaMenu.module.css";

/* Grouped the same way Footer.tsx already splits its own "Resources" and
   "Company" columns — not an invented grouping, just reflected into the
   mega menu so the two stay in sync. */
const RESOURCES_ITEMS = [
  { label: "Blog", href: "/resources/blog", Icon: ArticleIcon },
  { label: "Videos", href: "/resources/videos", Icon: PlayFrameIcon },
  { label: "Call Samples", href: "/resources/call-samples", Icon: PhoneCallIcon },
  { label: "Case Studies", href: "/resources/case-studies", Icon: CaseStudyIcon },
  { label: "FAQ", href: "/#faq-title", Icon: ChatIcon },
  { label: "Research", href: "/resources/research", Icon: ResearchIcon },
];

const COMPANY_ITEMS = [
  { label: "About", href: "/company/about", Icon: InfoIcon },
  { label: "News", href: "/company/news", Icon: NewsIcon },
  { label: "Investors & Partners", href: "/company/investors", Icon: TrendingUpIcon },
  { label: "Contact Us", href: "/contact", Icon: MailIcon },
];

export function ResourcesMegaMenu({ href }: { href: string }) {
  const itemRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  // Dropping focus on Escape closes the panel (removes :focus-within),
  // assuming the mouse isn't also hovering it. Same mechanism as
  // SolutionsMegaMenu.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const active = document.activeElement as HTMLElement | null;
      if (active && itemRef.current?.contains(active)) {
        active.blur();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Navbar/Footer persist across client-side navigations, so a Link click
  // inside the panel wouldn't otherwise drop :hover/:focus-within once the
  // page swaps underneath it.
  useEffect(() => {
    (document.activeElement as HTMLElement | null)?.blur();
  }, [pathname]);

  return (
    <li className={styles.resourcesItem} ref={itemRef}>
      <Link href={href} className={styles.link} aria-haspopup="true">
        Resources
      </Link>
      <div className={styles.panel}>
        <div className={styles.panelInner}>
          <p className={styles.colLabel}>Resources</p>
          <ul className={styles.grid}>
            {RESOURCES_ITEMS.map(({ label, href, Icon }) => (
              <li key={label}>
                <Link href={href} className={styles.item}>
                  <span className={styles.iconBox}>
                    <Icon />
                  </span>
                  <span className={styles.itemTitle}>{label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <hr className={styles.groupDivider} />

          <p className={styles.colLabel}>Company</p>
          <ul className={styles.grid}>
            {COMPANY_ITEMS.map(({ label, href, Icon }) => (
              <li key={label}>
                <Link href={href} className={styles.item}>
                  <span className={styles.iconBox}>
                    <Icon />
                  </span>
                  <span className={styles.itemTitle}>{label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <hr className={styles.footerDivider} />
          <div className={styles.footerRow}>
            <p>Don&apos;t see what you need?</p>
            <Link href="/resources" className={styles.viewAll}>
              View all resources
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
