/**
 * Mock content for /resources/blog. Plain data module — this project has no
 * CMS/repository layer elsewhere, so this stays a simple typed array rather
 * than an async abstraction. Copy is invented but grounded in product facts
 * already established elsewhere in this codebase (DROS, RPC verification,
 * auto re-dial, promise-to-pay capture, FDCPA/Reg F/TCPA compliance) — same
 * approach already used for the FAQ rewrite. Pending the user's review.
 *
 * Categories reuse the exact 3 the landing page's Resources.tsx already
 * established ("Debt Collection", "AI & Technology", "Voice Technology") for
 * sitewide taxonomy consistency, per explicit user direction.
 *
 * Only the featured post ("introducing-dros...") has a fully fleshed-out
 * body; the other 5 have shorter stub bodies — enough for a working TOC, but
 * flagged as pending real content, same treatment as every other "mock for
 * now" area in this project (e.g. Call Samples' placeholder audio).
 */

export type PostBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  thumb: string;
  featured?: boolean;
  body: PostBlock[];
};

export const CATEGORIES = ["Debt Collection", "AI & Technology", "Voice Technology"] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "introducing-dros-engagement-operating-system",
    title: "Introducing DROS: The Engagement Operating System Built for Collections Teams",
    excerpt:
      "Why we built a layer above the dialer — and what it means for how collections teams run outreach, capture promises, and stay compliant.",
    category: "AI & Technology",
    date: "2026-08-18",
    readMinutes: 7,
    thumb: "/assets/results-bg.jpg",
    featured: true,
    body: [
      {
        type: "paragraph",
        text: "Most collections stacks are built around a single unit of work: the call. A dialer places it, an agent (human or AI) runs it, and a disposition code gets written down at the end. That's fine for any one call — but a portfolio isn't one call, it's thousands of accounts moving through attempts, promises, breaks and re-engagement at once. DROS is our answer to that gap: an engagement operating system that sits above individual calls and manages the whole account lifecycle.",
      },
      {
        type: "heading",
        id: "why-teams-needed-more-than-another-dialer",
        text: "Why collections teams needed more than another dialer",
      },
      {
        type: "paragraph",
        text: "Ask any collections manager what actually eats their week, and it's rarely \"we need more calls.\" It's re-work: chasing which accounts already got an RPC today, which promises are coming due, which numbers are burned, and which agent last touched a file. Every one of those is a coordination problem, not a calling problem — and coordination problems don't get solved by making the dialer faster.",
      },
      {
        type: "heading",
        id: "what-dros-actually-does",
        text: "What DROS actually does",
      },
      {
        type: "paragraph",
        text: "DROS treats every account as a queue item with state, not a phone number with a call history. It decides who gets called next, with what script context, and re-prioritizes automatically the moment something changes — a promise gets made, a call goes unanswered, a right-party contact gets confirmed.",
      },
      {
        type: "list",
        items: [
          "Right-party contact verification at the top of every call, before a single collections line is spoken",
          "Attempt-based auto re-dial that respects call-frequency limits instead of a fixed retry count",
          "Structured promise-to-pay capture written back as a scheduled, trackable commitment",
          "Disposition codes and full call recordings/transcripts attached to every account automatically",
        ],
      },
      {
        type: "heading",
        id: "from-single-calls-to-a-managed-queue",
        text: "From single calls to a managed queue",
      },
      {
        type: "paragraph",
        text: "In practice this looks like a live queue: an account gets worked, a promise gets captured, and the row structurally leaves the active queue while the next account advances in. Nothing about that reprioritization needs a supervisor to trigger it — it's the direct result of what happened on the last call.",
      },
      {
        type: "heading",
        id: "where-compliance-fits-into-the-loop",
        text: "Where compliance fits into the loop",
      },
      {
        type: "paragraph",
        text: "Compliance isn't a report generated after the fact — it's enforced at the point of the call. Wrong-party contact gets caught by verification before disclosure. Re-dial pacing is bounded by the same call-frequency rules FDCPA and Reg F already require. Every conversation is recorded and time-stamped, so an audit isn't a fire drill.",
      },
      {
        type: "quote",
        text: "The goal was never to make the call faster. It was to make sure the right call happens, to the right person, at the right time — and that the system remembers what happened well enough that no one has to ask twice.",
        attribution: "Vodex product team",
      },
      {
        type: "heading",
        id: "whats-next",
        text: "What's next",
      },
      {
        type: "paragraph",
        text: "DROS is rolling out first to existing Vodex collections customers, with the same voice agents already handling reminders, follow-ups and payment negotiation now running on top of it. We'll be writing more here as real portfolios move through it — including the numbers, once we have a full quarter of them.",
      },
    ],
  },
  {
    slug: "rpc-verification-cutting-wrong-party-contact-risk",
    title: "RPC Verification: Cutting Wrong-Party Contact Risk to Near Zero",
    excerpt:
      "How automated right-party confirmation at the top of every call protects your agency from wrong-party contact exposure — without slowing down connect rates.",
    category: "Debt Collection",
    date: "2026-07-30",
    readMinutes: 5,
    thumb: "/assets/resources-1.jpg",
    body: [
      {
        type: "paragraph",
        text: "Wrong-party contact is one of the few collections risks that doesn't shrink as your team gets better at their job — it's a function of volume. The more accounts you work, the more chances there are to disclose debt details to someone who isn't the debtor. Verification has to happen before a single collections word is spoken, every time, regardless of how busy the queue is.",
      },
      {
        type: "heading",
        id: "why-wrong-party-contact-is-the-risk-that-never-goes-away",
        text: "Why wrong-party contact is the risk that never goes away",
      },
      {
        type: "paragraph",
        text: "A human agent working a full shift of calls is verifying identity dozens of times a day, under time pressure, often from a script they've said hundreds of times before. That's exactly the condition under which a verification step gets rushed or skipped — not out of carelessness, but fatigue.",
      },
      {
        type: "heading",
        id: "how-verification-works-before-the-conversation-starts",
        text: "How verification works before the conversation even starts",
      },
      {
        type: "paragraph",
        text: "Vodex's agents run identity confirmation as a hard gate at the start of every call — the collections conversation simply doesn't begin until the person on the line is confirmed as the right party. If verification fails, the call ends there, with no debt information disclosed at any point.",
      },
    ],
  },
  {
    slug: "auto-re-dial-logic-more-right-party-contacts",
    title: "Auto Re-Dial Logic: More Right-Party Contacts Without More Agents",
    excerpt:
      "A look at how attempt-based re-dial scheduling lifts right-party contact rates across a portfolio without adding headcount or breaching call-frequency limits.",
    category: "Debt Collection",
    date: "2026-07-14",
    readMinutes: 5,
    thumb: "/assets/action-3.jpg",
    body: [
      {
        type: "paragraph",
        text: "Most missed connections aren't unreachable numbers — they're timing. The same person who doesn't pick up at 10am on a Tuesday might answer without hesitation at 6pm. The question isn't whether to re-dial, it's how to do it without burning attempts on a number that's already been called three times today.",
      },
      {
        type: "heading",
        id: "attempt-based-scheduling-not-a-fixed-retry-count",
        text: "Attempt-based scheduling, not a fixed retry count",
      },
      {
        type: "paragraph",
        text: "Instead of a flat \"retry 3 times a day\" rule, re-dial attempts are spaced against each account's own contact history and the call-frequency ceilings that already apply to it — so an account that's due for a legitimate re-attempt gets one, and an account that's already at its limit doesn't get called again regardless of queue pressure.",
      },
      {
        type: "heading",
        id: "the-effect-on-connect-rate",
        text: "The effect on connect rate",
      },
      {
        type: "paragraph",
        text: "The result isn't more calls — it's better-timed ones. Portfolios running on this logic see meaningfully higher right-party contact rates on the same call volume, simply because more of that volume lands when someone's actually available to answer.",
      },
    ],
  },
  {
    slug: "fdcpa-regf-tcpa-compliance-checklist",
    title: "FDCPA, Reg F & TCPA: A Practical Compliance Checklist for AI-Led Collections",
    excerpt:
      "A field checklist for evaluating whether a voice AI vendor's calling, disclosure and record-keeping practices actually hold up under FDCPA, Reg F and TCPA.",
    category: "Debt Collection",
    date: "2026-06-25",
    readMinutes: 6,
    thumb: "/assets/security-4.jpg",
    body: [
      {
        type: "paragraph",
        text: "\"Our AI is compliant\" is a claim, not a control. Before putting any voice AI vendor in front of your portfolio, it's worth asking exactly how each requirement is enforced — not just whether the vendor says it is. Here's the checklist we'd want to see answered if we were on the other side of the table.",
      },
      {
        type: "heading",
        id: "call-conduct-and-disclosure",
        text: "Call conduct and disclosure",
      },
      {
        type: "list",
        items: [
          "Right-party identity verification enforced before any debt disclosure",
          "Required FDCPA disclosures delivered consistently, every call, not just on a sample",
          "Call-frequency limits enforced automatically against Reg F's 7-in-7 guidance, not left to a supervisor to police",
          "Consent and do-not-call flags checked before dialing, not after",
        ],
      },
      {
        type: "heading",
        id: "records-and-auditability",
        text: "Records and auditability",
      },
      {
        type: "paragraph",
        text: "Every call should leave behind a recording, a transcript, and a disposition code tied to the account — not a manual note someone has to remember to write. When a regulator or an internal audit asks for evidence, it should already exist, timestamped, rather than needing to be reconstructed.",
      },
      {
        type: "paragraph",
        text: "Vodex is SOC 2 Type II and ISO 27001 aligned, with call handling built around FDCPA, Reg F and TCPA requirements from the ground up — not bolted on after the fact.",
      },
    ],
  },
  {
    slug: "what-makes-voice-ai-sound-human",
    title: "What Makes a Voice AI Agent Sound Human? Inside Conversation Design",
    excerpt:
      "Latency, turn-taking, and knowing when to just listen — the small design decisions that separate a voice agent people talk to naturally from one they talk over.",
    category: "Voice Technology",
    date: "2026-06-05",
    readMinutes: 6,
    thumb: "/assets/why-works-1.jpg",
    body: [
      {
        type: "paragraph",
        text: "People don't judge a voice agent on vocabulary — they judge it on rhythm. A conversation that technically says the right words but responds a beat too slow, or talks over an interruption, reads as robotic no matter how natural the voice model itself sounds.",
      },
      {
        type: "heading",
        id: "latency-is-a-conversation-design-problem",
        text: "Latency is a conversation-design problem, not just an engineering one",
      },
      {
        type: "paragraph",
        text: "Human conversation has response gaps of a few hundred milliseconds. Cross that threshold and a caller starts to feel like they're talking to a system, not a person — even before they can articulate why. Getting under that line end-to-end, from speech recognition through to generated audio, shapes almost every other design decision in the agent.",
      },
      {
        type: "heading",
        id: "knowing-when-to-just-listen",
        text: "Knowing when to just listen",
      },
      {
        type: "paragraph",
        text: "Real conversations have interruptions, side comments, and pauses to think. An agent that can't tell the difference between \"I'm done talking\" and \"I'm thinking\" will either cut people off or sit in awkward silence. Handling that distinction well is most of what makes a call feel like a conversation instead of an interrogation.",
      },
    ],
  },
  {
    slug: "promise-to-pay-capture-turning-conversations-into-payments",
    title: "Promise-to-Pay Capture: Turning Conversations into Committed Payments",
    excerpt:
      "How structured PTP capture turns a verbal commitment made mid-call into a scheduled, tracked payment — instead of a note buried in a call summary.",
    category: "AI & Technology",
    date: "2026-05-22",
    readMinutes: 5,
    thumb: "/assets/action-2.jpg",
    body: [
      {
        type: "paragraph",
        text: "A promise to pay made on a call is only useful if something happens after the call ends. Too often it lives as a line in a disposition note — real, but not connected to anything that reminds the account, tracks the date, or flags a broken promise for follow-up.",
      },
      {
        type: "heading",
        id: "capturing-the-commitment-not-just-the-conversation",
        text: "Capturing the commitment, not just the conversation",
      },
      {
        type: "paragraph",
        text: "When a caller commits to a date and amount, that commitment gets written back as a structured, scheduled record immediately — not transcribed after the fact. It's the difference between \"the agent said the customer will pay Friday\" and an actual entry the system will act on Friday.",
      },
      {
        type: "heading",
        id: "what-happens-after-the-promise",
        text: "What happens after the promise",
      },
      {
        type: "paragraph",
        text: "A captured PTP drives what happens next automatically: a reminder ahead of the due date, a follow-up call if the payment doesn't land, and a clean record either way. The conversation becomes the start of a tracked process, not the end of one.",
      },
    ],
  },
];

export function getFeaturedPost(): BlogPost {
  return BLOG_POSTS.find((post) => post.featured) ?? BLOG_POSTS[0];
}

export function getGridPosts(): BlogPost[] {
  const featured = getFeaturedPost();
  return BLOG_POSTS.filter((post) => post.slug !== featured.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Same-category-first, backfilled with the rest — mirrors the reference's related-posts logic. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const rest = BLOG_POSTS.filter((post) => post.slug !== slug);
  const sameCategory = rest.filter((post) => post.category === current.category);
  const others = rest.filter((post) => post.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

/**
 * Derives the table of contents straight from the body's own heading blocks
 * — single source of truth for both the sidebar and the in-body anchors, so
 * they can never drift apart (same principle as the Chapeau benchmark this
 * was ported from).
 */
export function tocFromBlocks(body: PostBlock[]): Array<{ id: string; text: string }> {
  return body
    .filter((block): block is Extract<PostBlock, { type: "heading" }> => block.type === "heading")
    .map((block) => ({ id: block.id, text: block.text }));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
