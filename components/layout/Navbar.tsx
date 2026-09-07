"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { LoginIcon } from "@/components/ui/icons";
import { SolutionsMegaMenu } from "./SolutionsMegaMenu";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Vodex — home">
          <Logo height={38} />
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map((item) =>
            item.label === "Solutions" ? (
              <SolutionsMegaMenu key={item.label} href={item.href} />
            ) : (
              <li key={item.label}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            )
          )}
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
