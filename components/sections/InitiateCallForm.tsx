"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import { DialCodeSelect } from "@/components/ui/DialCodeSelect";
import { ArrowRight, CheckIcon, PhoneIcon, UserIcon } from "@/components/ui/icons";
import { COUNTRIES } from "@/lib/countries";
import styles from "./InitiateCall.module.css";

type FieldName = "name" | "phone";
type Values = { name: string; phone: string; countryIso2: string };

const INITIAL_VALUES: Values = { name: "", phone: "", countryIso2: "US" };

// Same regexes ContactForm.tsx uses, minus the leading "+" on phone — the
// dial code is a separate control here, so the digits field never carries
// one itself.
const NAME_RE = /^[A-Za-zÀ-ſ' -]+$/;
const PHONE_RE = /^[0-9\s().-]{6,18}$/;

function validate(values: Values): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};

  if (!values.name.trim()) {
    errors.name = "Your name is required.";
  } else if (!NAME_RE.test(values.name.trim())) {
    errors.name = "Enter a valid name.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_RE.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  return errors;
}

/**
 * The interactive form bar — split out from `InitiateCall.tsx` (a server
 * component) since it owns state. Placeholder submit, same precedent as
 * `ContactForm.tsx`: this project has no backend anywhere, so there's a
 * simulated delay + success panel with a comment marking where a real POST
 * goes, rather than a fake claim that a call was actually placed.
 */
export function InitiateCallForm() {
  const [values, setValues] = useState<Values>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [shakeField, setShakeField] = useState<FieldName | null>(null);

  const fieldRefs = useRef<Partial<Record<FieldName, HTMLDivElement | null>>>({});

  const errors = validate(values);
  const dial = COUNTRIES.find((c) => c.iso2 === values.countryIso2)?.dial ?? "+1";
  const fullPhone = `${dial} ${values.phone}`.trim();

  function setValue(field: FieldName, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function setCountry(iso2: string) {
    setValues((v) => ({ ...v, countryIso2: iso2 }));
  }

  function setTouchedField(field: FieldName) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setTouched({ name: true, phone: true });
      const firstInvalid = (["name", "phone"] as FieldName[]).find((f) => nextErrors[f]);
      if (firstInvalid) {
        setShakeField(firstInvalid);
        fieldRefs.current[firstInvalid]?.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => setShakeField(null), 350);
      }
      return;
    }

    // Placeholder submit — no backend/telephony provider is wired up yet, per
    // this project's established ContactForm.tsx precedent. Swap this
    // simulated delay for a real POST (an API route that kicks off the
    // outbound call) once one is chosen, sending { name: values.name, phone: fullPhone }.
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1200);
  }

  function resetForm() {
    setValues(INITIAL_VALUES);
    setTouched({});
    setStatus("idle");
  }

  return (
    <>
      <div className={styles.formRow}>
        {/* Entrance wraps a plain, unstyled positioning element — the bar's
            own hover/focus-within visuals live on a *nested* child, never on
            the element Entrance itself animates. Entrance's `rise` keyframe
            runs with a `both` fill mode that keeps pinning `transform`
            after it finishes, which silently overrides any :hover/
            :focus-within transform declared on that same element (hit and
            documented for the pricing cards, §23 of CLAUDE.md) — splitting
            outer-gate / inner-effect avoids it here too. */}
        <Entrance delay={280} className={styles.barSlot}>
          {status === "success" ? (
            <div className={styles.success}>
              <span className={styles.successIcon}>
                <CheckIcon />
              </span>
              <div>
                <p className={styles.successTitle}>We&apos;re calling you now</p>
                <p className={styles.successBody}>{fullPhone} — pick up in a few seconds.</p>
              </div>
              <button type="button" className={styles.resetLink} onClick={resetForm}>
                Try another number
              </button>
            </div>
          ) : (
            <form className={styles.bar} onSubmit={handleSubmit} noValidate>
              <div
                className={styles.cell}
                ref={(el) => { fieldRefs.current.name = el; }}
              >
                <UserIcon className={styles.cellIcon} />
                <label className="visually-hidden" htmlFor="initiate-call-name">
                  Your Name
                </label>
                <input
                  id="initiate-call-name"
                  className={`${styles.cellInput} ${shakeField === "name" ? styles.shake : ""}`}
                  type="text"
                  placeholder="Your Name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => setValue("name", e.target.value)}
                  onBlur={() => setTouchedField("name")}
                  aria-invalid={Boolean(touched.name && errors.name)}
                />
              </div>

              <div className={styles.divider} aria-hidden="true" />

              <div
                className={styles.cell}
                ref={(el) => { fieldRefs.current.phone = el; }}
              >
                <PhoneIcon className={styles.cellIcon} />
                <DialCodeSelect
                  value={values.countryIso2}
                  onChange={setCountry}
                  className={styles.dialWrap}
                />
                <label className="visually-hidden" htmlFor="initiate-call-phone">
                  Phone Number
                </label>
                <input
                  id="initiate-call-phone"
                  className={`${styles.cellInput} ${shakeField === "phone" ? styles.shake : ""}`}
                  type="tel"
                  inputMode="tel"
                  placeholder="Phone Number"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) => setValue("phone", e.target.value)}
                  onBlur={() => setTouchedField("phone")}
                  aria-invalid={Boolean(touched.phone && errors.phone)}
                />
              </div>

              <button type="submit" className={styles.submit} disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Calling…
                  </>
                ) : (
                  <>
                    Initiate Call
                    <ArrowRight className={styles.submitArrow} />
                  </>
                )}
              </button>
            </form>
          )}
        </Entrance>

        <Entrance delay={280} className={styles.demoWrap}>
          <Button href="/demo" variant="light" size="lg" className={styles.demoButton}>
            Book a Demo
          </Button>
        </Entrance>
      </div>

      {(touched.name && errors.name) || (touched.phone && errors.phone) ? (
        <div className={styles.formErrors} role="alert">
          {touched.name && errors.name ? <p>{errors.name}</p> : null}
          {touched.phone && errors.phone ? <p>{errors.phone}</p> : null}
        </div>
      ) : null}

      {/* reCAPTCHA mount point — the widget renders here once a site key
          exists. Sized to reCAPTCHA v2's own 304x78 footprint so dropping it
          in later causes no layout shift. */}
      <Entrance delay={360} className={styles.captchaSlot} aria-hidden="true">
        {null}
      </Entrance>

      <Entrance delay={440}>
        <p className={styles.fineprint}>
          *By submitting this form, you will receive an automated test call
          from a Vodex AI agent.
        </p>
        <p className={styles.fineprint}>
          Enterprise-Grade Security | ISO 27001, SOC 2, HIPAA, &amp; TCPA
          Compliant.
        </p>
      </Entrance>
    </>
  );
}
