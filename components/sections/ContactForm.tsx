"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Entrance } from "@/components/ui/Entrance";
import { FloatingField } from "@/components/ui/FloatingField";
import { Select } from "@/components/ui/Select";
import { CheckIcon } from "@/components/ui/icons";
import { COUNTRIES } from "@/lib/countries";
import { CONTACT_FORM_ID, HubspotSubmitError, submitHubspotForm } from "@/lib/hubspot";
import styles from "./ContactForm.module.css";

type FieldName = "fullName" | "email" | "phone" | "message";

type Values = Record<FieldName, string> & { dialIso: string };

// Field set mirrors the HubSpot form definition (HubSpot is the source of
// truth for which fields exist): firstname ("Full Name"), email, phone, message.
const FIELD_ORDER: FieldName[] = ["fullName", "email", "phone", "message"];

/** Our field → HubSpot internal property name. */
const HUBSPOT_NAMES: Record<FieldName, string> = {
  fullName: "firstname",
  email: "email",
  phone: "phone",
  message: "message",
};

const INITIAL_VALUES: Values = {
  fullName: "",
  email: "",
  dialIso: "US",
  phone: "",
  message: "",
};

const NAME_ALLOWED_RE = /^[\p{L}\p{M}' .-]+$/u;
const EMAIL_RE =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
const PHONE_ALLOWED_RE = /^[0-9\s().-]+$/;
// HubSpot's own phone rule on this form: 7–20 digits.
const PHONE_MIN_DIGITS = 7;
const PHONE_MAX_DIGITS = 20;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 500;

function validate(values: Values): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};

  const name = values.fullName.trim();
  if (!name) {
    errors.fullName = "Full name is required.";
  } else if (!NAME_ALLOWED_RE.test(name) || !/\p{L}/u.test(name)) {
    errors.fullName = "Use letters only (spaces, hyphens and apostrophes are fine).";
  } else if (name.replace(/[^\p{L}]/gu, "").length < 2) {
    errors.fullName = "Enter your full name.";
  } else if (name.length > 100) {
    errors.fullName = "Name is too long.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Email address is required.";
  } else if (email.length > 254 || email.includes("..") || !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address, like name@company.com.";
  }

  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, "").length;
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_ALLOWED_RE.test(phone)) {
    errors.phone = "Use digits only.";
  } else if (digits < PHONE_MIN_DIGITS || digits > PHONE_MAX_DIGITS) {
    errors.phone = `Enter a valid phone number (${PHONE_MIN_DIGITS}–${PHONE_MAX_DIGITS} digits).`;
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = "Tell us a little about what you need.";
  } else if (message.length < MESSAGE_MIN) {
    errors.message = `Message should be at least ${MESSAGE_MIN} characters.`;
  }

  return errors;
}

function flag(iso2: string) {
  return String.fromCodePoint(
    ...iso2.toUpperCase().split("").map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}

// `Select` filters on `label`, so the label carries the dial code *and* the
// country name — typing "+44" or "united" both find a match.
const DIAL_OPTIONS = COUNTRIES.map((c) => ({
  value: c.iso2,
  label: `${flag(c.iso2)} ${c.dial} ${c.name}`,
  triggerLabel: `${flag(c.iso2)} ${c.dial}`,
}));

export function ContactForm() {
  const [values, setValues] = useState<Values>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [shakeField, setShakeField] = useState<FieldName | null>(null);

  const fieldRefs = useRef<Partial<Record<FieldName, HTMLDivElement | null>>>({});

  const errors = { ...serverErrors, ...validate(values) };

  function setValue(field: FieldName | "dialIso", value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (field !== "dialIso" && serverErrors[field]) {
      setServerErrors((e) => ({ ...e, [field]: undefined }));
    }
    if (status === "error") setStatus("idle");
  }

  function setTouchedField(field: FieldName) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function flagInvalid(nextErrors: Partial<Record<FieldName, string>>) {
    setTouched(FIELD_ORDER.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    const firstInvalid = FIELD_ORDER.find((f) => nextErrors[f]);
    if (firstInvalid) {
      setShakeField(firstInvalid);
      fieldRefs.current[firstInvalid]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setTimeout(() => setShakeField(null), 350);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      flagInvalid(nextErrors);
      return;
    }

    const dial = COUNTRIES.find((c) => c.iso2 === values.dialIso)?.dial ?? "";
    setStatus("submitting");
    setFormError(null);

    try {
      await submitHubspotForm(CONTACT_FORM_ID, {
        [HUBSPOT_NAMES.fullName]: values.fullName.trim(),
        [HUBSPOT_NAMES.email]: values.email.trim(),
        [HUBSPOT_NAMES.phone]: `${dial} ${values.phone.trim()}`,
        [HUBSPOT_NAMES.message]: values.message.trim(),
      });
      setStatus("success");
    } catch (err) {
      const fieldErrors: Partial<Record<FieldName, string>> = {};
      if (err instanceof HubspotSubmitError) {
        for (const f of FIELD_ORDER) {
          const msg = err.fieldErrors[HUBSPOT_NAMES[f]];
          if (msg) fieldErrors[f] = msg;
        }
      }
      if (Object.keys(fieldErrors).length > 0) {
        setServerErrors(fieldErrors);
        flagInvalid(fieldErrors);
        setStatus("idle");
      } else {
        setFormError(
          err instanceof Error
            ? err.message
            : "Something went wrong sending your message. Please try again.",
        );
        setStatus("error");
      }
    }
  }

  function resetForm() {
    setValues(INITIAL_VALUES);
    setTouched({});
    setServerErrors({});
    setFormError(null);
    setStatus("idle");
  }

  return (
    <section className={styles.section} aria-labelledby="contact-form-title">
      <div className="container">
        <Entrance className={styles.header}>
          <p className={styles.eyebrow}>Write to us</p>
          <h2 id="contact-form-title" className={styles.title}>
            Send us a <span className="accent">message</span>
          </h2>
          <p className={styles.lead}>
            Fill out the quick form and we&apos;ll get in touch with you shortly.
          </p>
        </Entrance>

        <div className={styles.layout}>
          <Entrance delay={70}>
            {status === "success" ? (
              <div className={styles.success}>
                <span className={styles.successIcon}>
                  <CheckIcon />
                </span>
                <p className={styles.successTitle}>Message sent</p>
                <p className={styles.successBody}>
                  Thanks, {values.fullName.trim().split(/\s+/)[0] || "there"} — we&apos;ll be in touch shortly.
                </p>
                <button type="button" className={styles.resetLink} onClick={resetForm}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row2}>
                  <div ref={(el) => { fieldRefs.current.fullName = el; }}>
                    <FloatingField
                      label="Full name"
                      name="fullName"
                      required
                      value={values.fullName}
                      // Digits can never be part of a name — drop them as typed.
                      onChange={(v) => setValue("fullName", v.replace(/[0-9]/g, ""))}
                      onBlur={() => setTouchedField("fullName")}
                      touched={touched.fullName}
                      error={errors.fullName}
                      valid={!errors.fullName}
                      shake={shakeField === "fullName"}
                      autoComplete="name"
                    />
                  </div>
                  <div ref={(el) => { fieldRefs.current.email = el; }}>
                    <FloatingField
                      label="Email address"
                      name="email"
                      type="email"
                      inputMode="email"
                      required
                      value={values.email}
                      onChange={(v) => setValue("email", v.replace(/\s/g, ""))}
                      onBlur={() => setTouchedField("email")}
                      touched={touched.email}
                      error={errors.email}
                      valid={!errors.email}
                      shake={shakeField === "email"}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className={styles.phoneRow}>
                  <Select
                    className={styles.dialSelect}
                    label="Code"
                    required
                    value={values.dialIso}
                    onChange={(v) => setValue("dialIso", v)}
                    options={DIAL_OPTIONS}
                  />
                  <div ref={(el) => { fieldRefs.current.phone = el; }}>
                    <FloatingField
                      label="Phone number"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      required
                      value={values.phone}
                      // Only digits and common separators can be typed.
                      onChange={(v) => setValue("phone", v.replace(/[^0-9\s().-]/g, "").slice(0, 26))}
                      onBlur={() => setTouchedField("phone")}
                      touched={touched.phone}
                      error={errors.phone}
                      valid={!errors.phone}
                      shake={shakeField === "phone"}
                      autoComplete="tel-national"
                    />
                  </div>
                </div>

                <div ref={(el) => { fieldRefs.current.message = el; }}>
                  <FloatingField
                    as="textarea"
                    label="Message"
                    name="message"
                    required
                    rows={4}
                    maxLength={MESSAGE_MAX}
                    value={values.message}
                    onChange={(v) => setValue("message", v)}
                    onBlur={() => setTouchedField("message")}
                    touched={touched.message}
                    error={errors.message}
                    valid={!errors.message}
                    shake={shakeField === "message"}
                  />
                  <p
                    className={styles.counter}
                    data-limit={values.message.length >= MESSAGE_MAX}
                  >
                    {values.message.length}/{MESSAGE_MAX}
                  </p>
                </div>

                {status === "error" && formError && (
                  <p className={styles.formError} role="alert">
                    {formError}
                  </p>
                )}

                <button type="submit" className={styles.submit} disabled={status === "submitting"}>
                  {status === "submitting" ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <p className={styles.legal}>
                  <Link href="/terms-of-use">Terms and conditions</Link>
                  <span className={styles.legalDot}>•</span>
                  <Link href="/privacy-policy">Privacy policy</Link>
                </p>
              </form>
            )}
          </Entrance>

          <Entrance delay={140} className={styles.imageFrame}>
            <Image
              src="/assets/contact-form-image.jpg"
              alt=""
              fill
              quality={90}
              sizes="(max-width: 900px) 100vw, 460px"
              style={{ objectFit: "cover" }}
            />
          </Entrance>
        </div>

        <p className={styles.closing}>
          Running a collections operation?{" "}
          <Link href="/solutions/debt-collection" className={styles.closingLink}>
            See Vodex for Debt Collection
          </Link>
        </p>
      </div>
    </section>
  );
}
