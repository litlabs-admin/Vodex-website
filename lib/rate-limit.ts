import "server-only";

/**
 * Best-effort fixed-window limiter held in module memory. On Vercel each
 * serverless instance has its own memory, so traffic spread across instances
 * can exceed these limits — reCAPTCHA is the primary spam gate, this only
 * blunts bursts. Swap the body of `rateLimit` for Upstash Redis
 * (`@upstash/ratelimit`) to make it global; callers won't need to change.
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

/** Returns true if the request is allowed. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_KEYS) {
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
      const oldest = buckets.keys().next().value;
      if (buckets.size >= MAX_KEYS && oldest !== undefined) buckets.delete(oldest);
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
}
