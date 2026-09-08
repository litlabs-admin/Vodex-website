"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  ArticleIcon,
  CaseStudyIcon,
  ChatIcon,
  LockIcon,
  PhoneCallIcon,
  PlayFrameIcon,
  ResearchIcon,
} from "@/components/ui/icons";
import styles from "./ResourcesMegaMenu.module.css";

/* Single flat list, same shape as SolutionsMegaMenu — the "Company"
   sub-group this used to carry (About/News/Investors & Partners/Contact Us)
   moved out into its own CompanyMegaMenu once "Company" got a real navbar
   entry of its own, so it isn't duplicated across two menus. */
const RESOURCES_ITEMS = [
  { label: "Blog", href: "/resources/blog", Icon: ArticleIcon },
  { label: "Videos", href: "/resources/videos", Icon: PlayFrameIcon },
  { label: "Call Samples", href: "/resources/call-samples", Icon: PhoneCallIcon },
  { label: "Case Studies", href: "/resources/case-studies", Icon: CaseStudyIcon },
  { label: "FAQ", href: "/resources/faq", Icon: ChatIcon },
  { label: "Compliance", href: "/resources/compliance", Icon: LockIcon },
  { label: "Research", href: "/resources/research", Icon: ResearchIcon },
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
        </div>
      </div>
    </li>
  );
}
