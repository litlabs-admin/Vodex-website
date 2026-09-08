"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Entrance } from "@/components/ui/Entrance";
import { FloatingField } from "@/components/ui/FloatingField";
import { Select } from "@/components/ui/Select";
import { CheckIcon } from "@/components/ui/icons";
import { COUNTRIES } from "@/lib/countries";
import styles from "./ContactForm.module.css";

type FieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "company"
  | "country"
  | "phone"
  | "message";

type Values = Record<FieldName, string>;

const FIELD_ORDER: FieldName[] = [
  "firstName",
  "lastName",
  "email",
  "company",
  "country",
  "phone",
  "message",
];

const INITIAL_VALUES: Values = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  country: "United States",
  phone: "",
  message: "",
};

const NAME_RE = /^[A-Za-zÀ-ſ' -]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s().-]{7,20}$/;

function validate(values: Values): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else if (!NAME_RE.test(values.firstName.trim())) {
    errors.firstName = "Enter a valid first name.";
  }

  if (values.lastName.trim() && !NAME_RE.test(values.lastName.trim())) {
    errors.lastName = "Enter a valid last name.";
  }

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.company.trim()) {
    errors.company = "Company name is required.";
  }

  if (!values.country.trim()) {
    errors.country = "Select a country.";
  }

  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.message.trim()) {
    errors.message = "Tell us a little about what you need.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}

const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({
  value: c.name,
  label: c.name,
  meta: c.dial,
}));

const MESSAGE_MAX = 500;

export function ContactForm() {
  const [values, setValues] = useState<Values>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [shakeField, setShakeField] = useState<FieldName | null>(null);

  const fieldRefs = useRef<Partial<Record<FieldName, HTMLDivElement | null>>>({});

  const errors = validate(values);

  function setValue(field: FieldName, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function setTouchedField(field: FieldName) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setTouched(
        FIELD_ORDER.reduce((acc, f) => ({ ...acc, [f]: true }), {}),
      );
      const firstInvalid = FIELD_ORDER.find((f) => nextErrors[f]);
      if (firstInvalid) {
        setShakeField(firstInvalid);
        fieldRefs.current[firstInvalid]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setTimeout(() => setShakeField(null), 350);
      }
      return;
    }

    // Placeholder submit — no backend/email service is wired up yet, per
    // explicit user direction. Swap this simulated delay for a real POST
    // (an API route or a third-party form endpoint) once one is chosen.
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 900);
  }

  function resetForm() {
    setValues(INITIAL_VALUES);
    setTouched({});
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
                  Thanks, {values.firstName || "there"} — we&apos;ll be in touch shortly.
                </p>
                <button type="button" className={styles.resetLink} onClick={resetForm}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row2}>
                  <div ref={(el) => { fieldRefs.current.firstName = el; }}>
                    <FloatingField
                      label="First name"
                      name="firstName"
                      required
                      value={values.firstName}
                      onChange={(v) => setValue("firstName", v)}
                      onBlur={() => setTouchedField("firstName")}
                      touched={touched.firstName}
                      error={errors.firstName}
                      valid={!errors.firstName}
                      shake={shakeField === "firstName"}
                      autoComplete="given-name"
                    />
                  </div>
                  <div ref={(el) => { fieldRefs.current.lastName = el; }}>
                    <FloatingField
                      label="Last name (optional)"
                      name="lastName"
                      value={values.lastName}
                      onChange={(v) => setValue("lastName", v)}
                      onBlur={() => setTouchedField("lastName")}
                      touched={touched.lastName}
                      error={errors.lastName}
                      valid={!errors.lastName}
                      shake={shakeField === "lastName"}
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div ref={(el) => { fieldRefs.current.email = el; }}>
                  <FloatingField
                    label="Email Address"
                    name="email"
                    type="email"
                    inputMode="email"
                    required
                    value={values.email}
                    onChange={(v) => setValue("email", v)}
                    onBlur={() => setTouchedField("email")}
                    touched={touched.email}
                    error={errors.email}
                    valid={!errors.email}
                    shake={shakeField === "email"}
                    autoComplete="email"
                  />
                </div>

                <div ref={(el) => { fieldRefs.current.company = el; }}>
                  <FloatingField
                    label="Company name"
                    name="company"
                    required
                    value={values.company}
                    onChange={(v) => setValue("company", v)}
                    onBlur={() => setTouchedField("company")}
                    touched={touched.company}
                    error={errors.company}
                    valid={!errors.company}
                    shake={shakeField === "company"}
                    autoComplete="organization"
                  />
                </div>

                <div className={styles.row2}>
                  <div ref={(el) => { fieldRefs.current.country = el; }}>
                    <Select
                      label="Country"
                      required
                      value={values.country}
                      onChange={(v) => setValue("country", v)}
                      onBlur={() => setTouchedField("country")}
                      touched={touched.country}
                      error={errors.country}
                      options={COUNTRY_OPTIONS}
                    />
                  </div>
                  <div ref={(el) => { fieldRefs.current.phone = el; }}>
                    <FloatingField
                      label="Phone #"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      value={values.phone}
                      onChange={(v) => setValue("phone", v)}
                      onBlur={() => setTouchedField("phone")}
                      touched={touched.phone}
                      error={errors.phone}
                      valid={!errors.phone}
                      shake={shakeField === "phone"}
                      autoComplete="tel"
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
                  <p className={styles.counter}>
                    {values.message.length}/{MESSAGE_MAX}
                  </p>
                </div>

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
                  <Link href="/terms">Terms and conditions</Link>
                  <span className={styles.legalDot}>•</span>
                  <Link href="/privacy">Privacy policy</Link>
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
