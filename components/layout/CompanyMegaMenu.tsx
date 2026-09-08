"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  CaseStudyIcon,
  InfoIcon,
  MailIcon,
  NewsIcon,
  TrendingUpIcon,
} from "@/components/ui/icons";
import styles from "./CompanyMegaMenu.module.css";

const COMPANY_ITEMS = [
  { label: "About Us", href: "/company/about", Icon: InfoIcon },
  { label: "News", href: "/company/news", Icon: NewsIcon },
  { label: "Investors & Partners", href: "/company/investors", Icon: TrendingUpIcon },
  { label: "Careers", href: "/careers", Icon: CaseStudyIcon },
  { label: "Contact Us", href: "/company/contact", Icon: MailIcon },
];

export function CompanyMegaMenu({ href }: { href: string }) {
  const itemRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  // Dropping focus on Escape closes the panel (removes :focus-within),
  // assuming the mouse isn't also hovering it.
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
    <li className={styles.companyItem} ref={itemRef}>
      <Link href={href} className={styles.link} aria-haspopup="true">
        Company
      </Link>
      <div className={styles.panel}>
        <div className={styles.panelInner}>
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
        </div>
      </div>
    </li>
  );
}
