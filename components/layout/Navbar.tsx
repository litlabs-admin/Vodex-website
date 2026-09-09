"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ChevronDownIcon, LoginIcon } from "@/components/ui/icons";
import { useIsomorphicLayoutEffect } from "@/components/ui/useIsomorphicLayoutEffect";
import { SolutionsMegaMenu, MAIN_SOLUTIONS } from "./SolutionsMegaMenu";
import { ResourcesMegaMenu, RESOURCES_ITEMS } from "./ResourcesMegaMenu";
import { CompanyMegaMenu, COMPANY_ITEMS } from "./CompanyMegaMenu";
import styles from "./Navbar.module.css";

// "Solutions"/"Resources"/"Company" have no hub page (none is planned — see
// CLAUDE.md) — they're hover-only triggers on desktop (each renders its own
// mega-menu, see the imports above) and tap-to-expand accordions on mobile
// (built inline below, since there's no hover on touch). "Products"/
// "Pricing" are the only two plain, directly-navigable top-level links —
// both the desktop <ul> and the mobile panel below hand-place all five
// entries in the same Products/Solutions/Resources/Company/Pricing order.
const MOBILE_GROUPS = [
  { label: "Solutions", items: MAIN_SOLUTIONS },
  { label: "Resources", items: RESOURCES_ITEMS },
  { label: "Company", items: COMPANY_ITEMS },
] as const;

// Below this, the navbar reads as part of the hero (transparent, blended
// into its backdrop); past it, it solidifies. A small non-zero value (not 0)
// so rubber-band/momentum micro-scroll right at the top doesn't flicker
// between states.
const SCROLL_THRESHOLD = 24;

type NavbarProps = {
  // Pages with no dark hero directly underneath (e.g. a blog post's white
  // ArticleHeader) must stay permanently solid — a transparent bar there
  // would put white nav text over a white body with nothing behind it.
  solid?: boolean;
};

export function Navbar({ solid = false }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (solid) return;

    // Synchronous pre-paint check covers the rare case where the page
    // doesn't load scrolled to the top (e.g. browser scroll-position
    // restoration on back/forward navigation) — avoids a flash of
    // transparent-then-solid on that path.
    setScrolled(window.scrollY > SCROLL_THRESHOLD);

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const isSolid = solid || scrolled;

  return (
    <nav
      className={`${styles.nav} ${isSolid ? styles.navSolid : ""}`}
      aria-label="Primary"
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Vodex — home">
          <Logo height={38} />
        </Link>

        <ul className={styles.links}>
          <li>
            <Link href="/products" className={styles.link}>
              Products
            </Link>
          </li>
          <SolutionsMegaMenu />
          <ResourcesMegaMenu />
          <CompanyMegaMenu />
          <li>
            <Link href="/pricing" className={styles.link}>
              Pricing
            </Link>
          </li>
        </ul>

        <div className={styles.actions}>
          <Link href="/login" className={styles.login}>
            Login
            <LoginIcon />
          </Link>
          <Button
            href="/demo"
            variant="light"
            size="sm"
            withArrow
            className={styles.navCta}
          >
            Book a Demo
          </Button>
          <button
            type="button"
            className={`${styles.toggle} ${open ? styles.open : ""}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() =>
              setOpen((value) => {
                const next = !value;
                if (!next) setOpenMobileGroup(null);
                return next;
              })
            }
          >
            <span className={styles.toggleBar} />
            <span className={styles.toggleBar} />
            <span className={styles.toggleBar} />
            <span className="visually-hidden">
              {open ? "Close menu" : "Open menu"}
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
      >
        <div className={`container ${styles.panelInner}`}>
          <Link
            href="/products"
            className={styles.panelLink}
            onClick={() => setOpen(false)}
          >
            Products
          </Link>

          {MOBILE_GROUPS.map((group) => {
            const isGroupOpen = openMobileGroup === group.label;
            return (
              <div key={group.label} className={styles.mobileGroup}>
                <button
                  type="button"
                  className={`${styles.panelLink} ${styles.mobileGroupTrigger}`}
                  aria-expanded={isGroupOpen}
                  onClick={() =>
                    setOpenMobileGroup((current) =>
                      current === group.label ? null : group.label
                    )
                  }
                >
                  {group.label}
                  <ChevronDownIcon
                    className={`${styles.mobileGroupChevron} ${
                      isGroupOpen ? styles.mobileGroupChevronOpen : ""
                    }`}
                  />
                </button>
                <div
                  className={styles.mobileSubPanel}
                  data-open={isGroupOpen}
                >
                  <div className={styles.mobileSubInner}>
                    {group.items.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className={styles.mobileSubLink}
                        onClick={() => {
                          setOpen(false);
                          setOpenMobileGroup(null);
                        }}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <Link
            href="/pricing"
            className={styles.panelLink}
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>

          <div className={styles.panelActions}>
            <Link href="/login" className={styles.login} style={{ display: "inline-flex" }}>
              Login
              <LoginIcon />
            </Link>
            <Button href="/demo" variant="light" size="sm" withArrow>
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
