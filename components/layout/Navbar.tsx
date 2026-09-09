"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { LoginIcon } from "@/components/ui/icons";
import { useIsomorphicLayoutEffect } from "@/components/ui/useIsomorphicLayoutEffect";
import { SolutionsMegaMenu } from "./SolutionsMegaMenu";
import { ResourcesMegaMenu } from "./ResourcesMegaMenu";
import { CompanyMegaMenu } from "./CompanyMegaMenu";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

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
          {NAV_LINKS.map((item) => {
            if (item.label === "Solutions") {
              return <SolutionsMegaMenu key={item.label} href={item.href} />;
            }
            if (item.label === "Resources") {
              return <ResourcesMegaMenu key={item.label} href={item.href} />;
            }
            if (item.label === "Company") {
              return <CompanyMegaMenu key={item.label} href={item.href} />;
            }
            return (
              <li key={item.label}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            );
          })}
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
            onClick={() => setOpen((value) => !value)}
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
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={styles.panelLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
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
