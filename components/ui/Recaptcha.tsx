"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  render: (el: HTMLElement, opts: Record<string, unknown>) => number;
  reset: (id?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    __vodexRecaptchaOnload?: () => void;
  }
}

export type RecaptchaHandle = { reset: () => void };

type Props = {
  onChange: (token: string | null) => void;
  theme?: "light" | "dark";
  className?: string;
};

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
const SCRIPT_ID = "google-recaptcha-v2";

let loadPromise: Promise<Grecaptcha> | null = null;

/** Loads Google's script once per page, however many widgets mount. */
function loadRecaptcha(): Promise<Grecaptcha> {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve, reject) => {
    window.__vodexRecaptchaOnload = () => resolve(window.grecaptcha!);
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      "https://www.google.com/recaptcha/api.js?onload=__vodexRecaptchaOnload&render=explicit";
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("reCAPTCHA failed to load"));
    };
    document.head.appendChild(script);
  });
  return loadPromise;
}

/**
 * Google reCAPTCHA v2 checkbox ("I'm not a robot"), rendered explicitly so it
 * mounts inside React's tree. The token it yields is single-use and is
 * verified server-side in `app/api/initiate-call/route.ts` — never trust it
 * on the client.
 */
export const Recaptcha = forwardRef<RecaptchaHandle, Props>(function Recaptcha(
  { onChange, theme = "dark", className },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
      onChangeRef.current(null);
    },
  }));

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    let cancelled = false;
    loadRecaptcha()
      .then((g) => {
        if (cancelled || !containerRef.current || widgetId.current !== null) return;
        widgetId.current = g.render(containerRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme,
          callback: (token: string) => onChangeRef.current(token),
          "expired-callback": () => onChangeRef.current(null),
          "error-callback": () => onChangeRef.current(null),
        });
      })
      .catch(() => onChangeRef.current(null));
    return () => {
      cancelled = true;
    };
  }, [theme]);

  if (!RECAPTCHA_SITE_KEY) return null;
  return <div ref={containerRef} className={className} />;
});
