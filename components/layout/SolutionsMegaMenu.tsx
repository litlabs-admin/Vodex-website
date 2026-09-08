"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  BellIcon,
  CheckIcon,
  FunnelIcon,
  PhoneCallIcon,
  WorkflowIcon,
} from "@/components/ui/icons";
import styles from "./SolutionsMegaMenu.module.css";

const MAIN_SOLUTIONS = [
  { label: "Payment Reminders", href: "/solutions/payment-reminders", Icon: BellIcon },
  { label: "Promise-to-Pay Capture", href: "/solutions/promise-to-pay", Icon: CheckIcon },
  { label: "Lead Qualification", href: "/solutions/lead-qualification", Icon: FunnelIcon },
  { label: "Debt Collection", href: "/solutions/debt-collection", Icon: PhoneCallIcon },
  { label: "Collection Software", href: "/solutions/collection-software", Icon: WorkflowIcon },
];

export function SolutionsMegaMenu({ href }: { href: string }) {
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
    <li className={styles.solutionsItem} ref={itemRef}>
      <Link href={href} className={styles.link} aria-haspopup="true">
        Solutions
      </Link>
      <div className={styles.panel}>
        <div className={styles.panelInner}>
          <p className={styles.colLabel}>Main Solutions</p>
          <ul className={styles.solutionsGrid}>
            {MAIN_SOLUTIONS.map(({ label, href, Icon }) => (
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
