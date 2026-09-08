import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import { Entrance } from "@/components/ui/Entrance";
import popularBadge from "@/public/assets/pricing-badge-popular.jpg";
import bestValueBadge from "@/public/assets/pricing-badge-best-value.jpg";
import styles from "./PricingPlans.module.css";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  badge?: { src: StaticImageData; alt: string };
  dark?: boolean;
};

/* Feature lists are grounded in facts already established elsewhere on this
   site (integrations, compliance, RPC verification, auto re-dial) rather
   than the reference's generic "10 Web Components / 5 Web Templates"
   website-builder copy — confirmed with the user before writing these. */
const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    description: "Try Voice AI with no upfront commitment, no credit card.",
    features: [
      "1 AI voice agent",
      "100 call minutes / month",
      "Core call scripts & disposition codes",
      "Standard TCPA / FDCPA guardrails",
      "Email support",
    ],
    cta: { label: "Get Started", href: "/demo" },
  },
  {
    name: "Starter",
    price: "$100",
    description: "For small teams.",
    features: [
      "3 AI voice agents",
      "1,000 call minutes / month",
      "Auto re-dial & promise-to-pay capture",
      "HubSpot & Twilio integrations",
      "Email support",
    ],
    cta: { label: "Get Started", href: "/demo" },
  },
  {
    name: "Standard",
    price: "$250",
    description: "For growing teams.",
    features: [
      "8 AI voice agents",
      "5,000 call minutes / month",
      "RPC verification & disposition analytics",
      "HubSpot, Twilio & Make integrations",
      "Priority chat & email support",
    ],
    cta: { label: "Get Started", href: "/demo" },
    badge: { src: popularBadge, alt: "Popular" },
  },
  {
    name: "Premium",
    price: "$500",
    description: "For performance teams.",
    features: [
      "20 AI voice agents",
      "15,000 call minutes / month",
      "Advanced compliance audit trails (SOC 2, ISO 27001)",
      "VICIdial & HighLevel integrations",
      "Dedicated account manager",
    ],
    cta: { label: "Get Started", href: "/demo" },
    badge: { src: bestValueBadge, alt: "Best Value" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For larger teams and call volumes.",
    features: [
      "Unlimited AI voice agents",
      "Custom call volume & concurrency",
      "Full API access & custom integrations",
      "Dedicated compliance & security review",
      "24/7 priority support with SLA",
    ],
    cta: { label: "Get Started", href: "/demo" },
    dark: true,
  },
];

export function PricingPlans() {
  return (
    <section className={styles.section} aria-labelledby="pricing-plans-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Pricing Plans</p>
          <h2 id="pricing-plans-title" className={styles.title}>
            A plan for every <span className="accent">stage</span>
          </h2>
          <p className={styles.lead}>
            Start free, scale to enterprise. Every plan includes the AI Agent builder and full
            platform access.
          </p>
        </Entrance>

        <div className={styles.grid}>
          {PLANS.map((plan, i) => (
            <Entrance key={plan.name} delay={i * 70} as="article" className={styles.cardWrap}>
              <div className={[styles.card, plan.dark ? styles.cardDark : ""].filter(Boolean).join(" ")}>
                {plan.badge ? (
                  <div className={styles.ribbon}>
                    <Image src={plan.badge.src} alt={plan.badge.alt} className={styles.ribbonImage} />
                    <span className={styles.ribbonSheen} aria-hidden="true" />
                  </div>
                ) : null}

                <p className={styles.planName}>{plan.name}</p>
                <p className={styles.price}>
                  {plan.price}
                  <span className={styles.priceSuffix}>/per month</span>
                </p>
                <p className={styles.description}>{plan.description}</p>

                <Button href={plan.cta.href} variant="dark" size="sm" className={styles.cta}>
                  {plan.cta.label}
                </Button>

                <div className={styles.divider} />

                <ul className={styles.features}>
                  {plan.features.map((feature, fi) => (
                    <li
                      key={feature}
                      className={styles.feature}
                      style={{ "--i": fi } as CSSProperties}
                    >
                      <span className={styles.checkIcon}>
                        <CheckIcon />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Entrance>
          ))}
        </div>

        <Entrance className={styles.closing}>
          <p>
            Running a collections operation?{" "}
            <Link href="/solutions/debt-collection" className={styles.closingLink}>
              See Vodex for Debt Collection
            </Link>
          </p>
        </Entrance>
      </div>
    </section>
  );
}
