import { NextResponse, type NextRequest } from "next/server";
import { validateInitiateCall } from "@/lib/initiate-call-validation";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VODEX_URL =
  process.env.VODEX_DEMO_CALL_URL ?? "https://prod.api.vodex.ai/api/v1/trigger-demo-call";
const MAX_BODY_BYTES = 4096;
const MIN_FILL_MS = 3000;
const MAX_FILL_MS = 60 * 60 * 1000;
const GENERIC_UPSTREAM_ERROR = "We couldn't start the call right now. Please try again shortly.";

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function hostOf(url: string): string | null {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

/** Same-origin requests only, plus any origins listed in ALLOWED_ORIGINS (comma-separated). */
function originAllowed(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const originHost = origin ? hostOf(origin) : null;
  if (!originHost) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (host && originHost === host) return true;
  return (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => hostOf(s.trim()))
    .some((h) => h === originHost);
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

async function verifyRecaptcha(token: string, ip: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("[initiate-call] RECAPTCHA_SECRET_KEY is not set");
    return false;
  }
  try {
    const params = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") params.set("remoteip", ip);
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    const data = (await res.json()) as { success?: boolean; hostname?: string };
    if (!data.success) return false;
    // Optional: reject tokens solved on another site that uses the same key.
    const allowedHosts = (process.env.RECAPTCHA_ALLOWED_HOSTNAMES ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return allowedHosts.length === 0 || (!!data.hostname && allowedHosts.includes(data.hostname));
  } catch (err) {
    console.error("[initiate-call] reCAPTCHA verification request failed", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!originAllowed(req)) return json(403, { error: "Forbidden." });
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return json(415, { error: "Unsupported content type." });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: "Request too large." });

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return json(400, { error: "Invalid request." });
  }

  // Honeypot: humans never see or fill this. Pretend success so bots learn nothing.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return json(200, { ok: true });
  }

  // A form completed in under 3 seconds is a script.
  const startedAt = Number(body.startedAt);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
    return json(400, { error: "Please try again." });
  }

  const ip = clientIp(req);
  if (!rateLimit(`ip:${ip}`, 5, 10 * 60 * 1000)) {
    return json(429, { error: "Too many attempts. Please try again later." });
  }

  const token = typeof body.recaptchaToken === "string" ? body.recaptchaToken : "";
  if (!token || token.length > 4000) {
    return json(400, { error: "Please confirm you're not a robot." });
  }
  if (!(await verifyRecaptcha(token, ip))) {
    return json(400, { error: "Verification failed. Please tick the captcha again." });
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const { errors, payload } = validateInitiateCall({
    name: str(body.name),
    email: str(body.email),
    phone: str(body.phone),
    countryIso2: str(body.countryIso2),
  });
  if (!payload) {
    return json(422, { error: "Please fix the highlighted fields.", fieldErrors: errors });
  }

  // Stop one number being called repeatedly, even from different IPs.
  if (!rateLimit(`phone:${payload.phone}`, 2, 60 * 60 * 1000)) {
    return json(429, { error: "This number was called recently. Please try again later." });
  }

  try {
    const res = await fetch(VODEX_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://vodex.ai" },
      body: JSON.stringify({
        email: payload.email,
        phone: payload.phone,
        firstName: payload.name,
        lastName: "(Home Demo Bot)",
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[initiate-call] upstream responded ${res.status} for ${payload.phone.slice(0, -4)}****`);
      return json(502, { error: GENERIC_UPSTREAM_ERROR });
    }
  } catch (err) {
    console.error("[initiate-call] upstream request failed", err);
    return json(502, { error: GENERIC_UPSTREAM_ERROR });
  }

  return json(200, { ok: true });
}
