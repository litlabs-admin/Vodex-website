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

/* Content matches the previous (live) Vodex pricing page: two tiers only —
   a free trial tier and a single Enterprise plan. The old 5-tier ladder
   (Starter/Standard/Premium, with the "Popular"/"Best Value" ribbons) was
   invented copy and is gone; `Plan.badge`/`.ribbon` are kept in place since
   nothing renders them today but the styling is still correct if a tier
   ever needs one again. */
const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    description:
      "Experience Voice AI with our free plan, no upfront commitment, no credit card required.",
    features: [
      "10 Calling minutes (call duration limited to 2 min per call)",
      "AI Agent builder",
      "Platform access",
    ],
    cta: { label: "Get started", href: "/demo" },
  },
  {
    name: "Enterprise Plan",
    price: "Custom",
    description: "For larger teams and call volumes",
    features: [
      "All Pro features",
      "SLAs",
      "Multi Agent workflows",
      "Account manager",
      "Custom Integrations",
      "Training & support",
      "Compliance (SOC 2, HIPAA, ISO 27001, FDCPA, TCPA)",
      "Discounted pricing for larger volumes",
    ],
    cta: { label: "Contact Sales", href: "/company/contact" },
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

        <div className={styles.grid} data-count={PLANS.length}>
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
                  {/* "Custom" is not a per-month figure — only real prices get the suffix. */}
                  {plan.price.startsWith("$") ? (
                    <span className={styles.priceSuffix}>/per month</span>
                  ) : null}
                </p>
                <p className={styles.description}>{plan.description}</p>

                <Button href={plan.cta.href} variant="dark" size="sm" className={styles.cta}>
                  {plan.cta.label}
                </Button>

                <div className={styles.divider} />

                <ul
                  className={[styles.features, plan.features.length > 5 ? styles.featuresTwoCol : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
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
