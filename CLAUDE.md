# Vodex Landing Page — Project Context

> Read this first in any new session, then inspect the code, then continue from
> **Current progress**. Do not restart the project or rewrite approved sections.

---

## 1. Project overview

Vodex sells **GenAI voice agents for enterprise engagement** — reminders,
collections, follow-ups, qualification and payment negotiation. We are
rebuilding the marketing landing page in Next.js, matching an existing Figma
design supplied as a PDF as closely as practically possible.

Visual fidelity to the reference is the highest priority. Do not redesign.

---

## 2. Reference design

`D:\litlabs\Vodex\Vodex - Landing_Page.pdf`

- Single page, **4548 × 37620 pt** — a **3× export of a 1516 × 12540 px**
  artboard. Every measurement in this file is in **1× px (artboard space)**.
- The PDF contains a Figma **layout grid overlay**: pale `#EDEDED` vertical
  rules at x = 37.5 and x = 1475.5, plus faint horizontal rules. **These are
  reference guides, not design elements — ignore them.** (They are how the
  1440 content grid was derived.)

### Working with the PDF

Rendering the whole page at 24 dpi reproduces it at exactly 1516 px wide, so
screenshots can be diffed against the implementation pixel-for-pixel:

```bash
# poppler lives at ~/Downloads/Release-25.11.0-0/poppler-25.11.0/Library/bin
pdftoppm -png -r 24 "Vodex - Landing_Page.pdf" full     # -> full-1.png, 1516x12540
pdftoppm -png -r 192 -x <px> -y <px> -W <w> -H <h> ...  # high-res crops for tracing
pdftotext -layout "Vodex - Landing_Page.pdf" -          # all copy
```

Verification loop used so far: screenshot the running page at a 1516 px
viewport, then compare element bounding boxes against the same boxes measured
in `full-1.png`. Everything in Section 1 lands within 1–5 px.

---

## 3. Technology stack

| Concern     | Choice                                                       |
| ----------- | ------------------------------------------------------------ |
| Framework   | Next.js 15.5 (App Router)                                     |
| Language    | TypeScript (strict)                                           |
| Styling     | **CSS Modules + CSS custom properties** in `app/globals.css`  |
| Animation   | **Plain CSS** (`@keyframes rise` + transitions). No library.   |
| Images      | `next/image` (AVIF/WebP, `qualities: [75, 90]`)               |
| Fonts       | `next/font/google` — Inter + Ancizar Serif                    |
| Package mgr | npm                                                           |

No UI framework, no Tailwind, no Framer Motion. The design needs exact px
values; CSS Modules keeps those legible and greppable. Introduce Motion only if
a later section genuinely needs orchestrated or gesture-driven animation.

---

## 4. Typography

- **Headings:** Inter Semi Bold (600).
- **Serif italic accent:** Ancizar Serif Italic (`.accent`, brand orange).
- **Body / UI:** Inter 400–600.

### Known font discrepancy (raised with the user, awaiting a decision)

The PDF's **display headings are set in a condensed grotesque that is not
Inter**. At a matched cap height, Inter SemiBold is ~15% wider than the
reference face. The body copy, nav and UI text, however, match Inter's
proportions exactly.

Current resolution: use Inter as instructed, sized to **match the design's line
width** rather than its cap height —

- `--fs-display: clamp(34px, 4.75vw, 72px)` → 72 px at the 1516 artboard
- `--ls-display: -0.035em`, `--lh-display: 1.07`

That reproduces the H1 measure exactly (705 px vs the reference's 704 px) and
keeps every line break identical; the cap height ends up ~8% shorter than the
reference. If the real display face is supplied, drop it in, reset
`--ls-display` to ~0 and raise `--fs-display` to ~78 px.

Ancizar Serif Italic is likewise narrower than the reference serif, so the
accent word is scaled to `1.13em` inside `.title` to occupy the same measure.

---

## 5. Design system (measured, not invented)

```
--brand            #FF4D00     announcement bar, primary CTA, logo, accent word
--brand-hover      #E64500
--ink              #1A1A1A     navbar + dark sections
--fg               #000000     copy on light surfaces
--bg               #FFFFFF
--hairline         #E6E6E6     full-bleed rules
--hairline-strong  #D9D9D9     cell dividers

--container        1440px      content grid (1516 artboard minus 2x38 margins)
--container-nav    1348px      navbar lockup (narrower than the page grid)
--page-x           40px        -> 32px at <=1100, 20px at <=720

--announce-h       44px
--nav-h            64px

--radius-btn       10px
--radius-pill      999px

--ease             cubic-bezier(0.22, 0.61, 0.36, 1)
--dur              220ms
```

### Type scale (artboard px)

| Role             | Size | Weight  | Notes                 |
| ---------------- | ---- | ------- | --------------------- |
| Display / H1     | 72   | 600     | lh 1.07, ls −0.035em  |
| Hero lead        | 24   | 400     | lh 1.458              |
| Hero badge       | 17   | 500     |                       |
| CTA (large)      | 20   | 600     | 52 px tall            |
| Nav link / login | 17   | 500     |                       |
| Nav CTA          | 17   | 600     | 45 px tall            |
| Announcement bar | 16   | 400/600 |                       |
| Announcement tag | 17   | 600     | 27 px tall pill       |
| Trust title      | 20   | 500     |                       |
| Trust note       | 15   | 400     | italic                |

### Recurring patterns

- Every CTA carries the same long right arrow, which nudges +4 px on hover.
- Pills (`--radius-pill`) for eyebrows/tags; 10 px radius for buttons.
- Dark sections use `--ink`; light sections use white with hairline rules.
- Section eyebrows are small centred pills ("Solutions", "Why", "Resources").
- Headings pair an Inter phrase with one Ancizar-italic orange word.

---

## 6. Page structure (full inventory from the PDF)

```
 1. Announcement bar          orange, 44px
 2. Navbar                    #1A1A1A, 64px
 3. Hero                      photographic, 632px  -- artwork: hero-bg.png
 4. Trust strip               SOC 2 / ISO 27001 / 10M+, hairline-bordered
 5. Product dashboard mockup  large centred screenshot
 6. Introducing DROS          text left / image right
 7. Solutions (dark)          tabs + 3 alternating use-case rows
 8. Auto re-dial banner       orange gradient artwork
 9. Call samples              3 audio cards
10. Why (dark)                heading + image bento grid
11. Featured case study       orange photo, 3X / 7X stats
12. Resources                 "Insights & updates", 3 blog cards
13. FAQ                       accordion + side panel
14. Enterprise CTA band       photographic, "Built for enterprises"
15. Final CTA (dark)          "Ready to supercharge your engagement?"
16. Footer (dark)             links, newsletter, certifications, backers,
                              oversized VODEX wordmark
```

---

## 7. Current progress

```
Current section:
ALL 16 sections implemented — the page is complete top to bottom. Most
recent work: the oversized footer VODEX wordmark was rebuilt as a measured
inline SVG (`components/ui/FooterWordmark.tsx`) after the user reported it
"is not clear" — the supplied raster turned out to be a low-res export
upscaled to 4548px, and the reference PDF has the same defect, so no
delivery-side fix was possible. Verified at IoU 0.981 against the reference
alpha mask; clean tsc + next build; screenshots at 1516 (DPR 1 and 2) and
430px, zero console errors, zero horizontal overflow. Two measured
deviations from the reference (full-bleed width, and the 200px crop) were
found and flagged for the user rather than silently changed. See
Implementation decisions. Before that: a corner-radius + bleed-width
correction pass across Why,
Featured Case Study, Resources, and Enterprise Band, prompted by the user
pasting reference screenshots after the previous round's image work
shipped. Two mistakes, both from eyeballing a full-page PDF thumbnail
instead of zooming into actual corner pixels: (1) `.mainTile`/`.tilePhoto`
(Why), `.banner`/`.stat`/`.cta` (Featured Case Study), `.card` (Resources),
and `.banner` (Enterprise Band) all had an invented `border-radius` the
reference doesn't have — confirmed sharp (0) by zooming into each PDF
corner at 4×+ with nearest-neighbor scaling; FAQ's cards were checked the
same way and are correctly rounded, so nothing there changed. (2) Enterprise
Band was capped at `max-width: 1180px` inside the page container when the
reference is genuinely full-bleed (photo runs edge-to-edge at 0 inset,
confirmed by pixel-scanning full-width PDF rows) — restructured to render
outside the `<div className="container">` wrapper entirely. Featured Case
Study and Final CTA are inset (not full-bleed like Enterprise Band) but
were capped narrower than the reference too — corrected from 1180px to the
measured ≈1327px. See Implementation decisions for the full per-section
breakdown and exact measurements. Before that: Section 15's (Final CTA)
orbiting icon cluster was rebuilt to
use the 7 real supplied icon assets + the real center mark instead of
hand-drawn SVG icons, with node placement switched to trig-based circular
positioning for accuracy — see Implementation decisions for the full
mechanism and a gotcha (wrong translate axis) hit and fixed along the way.
Before that: Section 6's ("Introducing DROS") engagement-queue illustration
was substantially reworked (v2) after the user rejected the first pass as
"nothing is moving... does not feel like a proper storytelling" and "the bg
is not visible much." v2 is a genuine 5-account queue-advance story (Leo
Martins works a call, captures a promise-to-pay, and his row structurally
leaves the queue; Priya Nair enters at the bottom; Andrew Cole then becomes
the active row) plus always-on ambient motion (an avatar ripple + a sheen
sweep on whichever row is active) so the card is never visibly frozen, and
the white card itself was shrunk from ~87% to ~78% of the frame with a much
lighter scrim so the supplied background photo actually reads. See
Implementation decisions for the full mechanism. Before that: real
photography and footer artwork were dropped into Sections 10 (Why), 11
(Featured Case Study), 12 (Resources), 14 (Enterprise Band), 15 (Final CTA)
and the Footer, replacing every remaining `PlaceholderImage`/CSS-gradient
placeholder except Section 9's audio — every photo/logo matched to its slot
by opening the reference PDF at that section's actual pixel coordinates
(`pdftotext -bbox` + `pdftoppm` crops), not guessed. That pass also caught a
real layout bug in the Why section's bento grid (see Implementation
decisions) that the user flagged directly.

Status:
The corner-radius/bleed correction pass was verified the same way as the
image work before it: Playwright element screenshots of Why, Featured Case
Study, Resources, Enterprise Band and Final CTA post-fix (scrolled into
view, images loaded), plus dedicated 430px mobile shots of Enterprise Band
and Featured Case Study specifically to confirm the full-bleed restructure
didn't break at narrow widths. Full 1516/1280/900/430px pass: zero console
errors, zero horizontal overflow. Clean tsc + next build.
Verified at 1516 / 1280 / 900 / 430 px, no console errors, no horizontal
overflow anywhere. Clean tsc + next build. Final CTA's new icon cluster was
specifically screenshotted at 1516/1280px both before and after the
translate-axis fix to confirm the ring layout actually matches the
reference. Section 9 was previously verified
functionally (Playwright): play/pause per card, only-one-plays-at-a-time,
seek-by-click, real durations displayed, status-pill bottom alignment.
Section 6 v2 was verified with an 11-shot Playwright filmstrip (~1s apart,
spanning a full 10s loop) at 1516px — confirmed the queue-advance story
plays start to finish (Leo active → captured → row exits → Priya enters →
Andrew active → reset dip → clean restart back at Leo/idle), plus a 430px
mobile shot and a `reducedMotion: "reduce"` emulation shot (lands on one
coherent static frame — no half-collapsed rows). No console errors in any
of the three. This session's earlier image work was verified with
Playwright element screenshots of each touched section (post-scroll,
waiting for every `<img>` to finish loading — native `loading="lazy"` means
an element screenshot taken without first scrolling the page will silently
capture blank images) at 1516px, plus a full-page pass at
1516/1280/900/430px confirming zero console errors and zero horizontal
overflow at every width.

⚠️ One thing is NOT final and needs the user's real content to finish:
  - Section 9 (Call Samples) — the 3 MP3s are real but temporary/mismatched
    placeholder audio, not final content (user is aware, will swap later).
Section 13's FAQ copy was rewritten from scratch (the PDF's copy was
leftover template text) per explicit user direction — this one is final,
not a placeholder.

Approved:
Sections 1, 5, 7, 8, 9, 10 — approved implicitly each time the user asked to
move on. Sections 11–16 not yet reviewed by the user. Section 9's audio
player: user said "just build clean, typechecked well, I will verify
myself" — not yet an explicit approval, treat as pending their review too.
Section 6 is NOT currently in the approved list — first rejected by the user
after the initial rebuild, now reworked (v2) and awaiting their review again
(rule: never treat a section as approved unless the user said so about the
current implementation — this has now happened twice for Section 6, don't
assume v2 is right either without their sign-off). The earlier photo/footer-
artwork swap into Sections 10/11/12/14/15/Footer is likewise NOT yet
approved — the user asked for it built clean and said they would verify
themselves, same as Section 9's audio player.

Next:
Wait for the user's review of the footer wordmark vectorization (and decide
on the two flagged deviations: full-bleed width, and the 200px crop), and of Section 6 v2, the image/footer work, 9 (audio
player), and 11–16 generally. Separately: swap Section 9's placeholder audio
for final MP3s once supplied — everything else on the page now has real
content.
```

---

## 8. Implementation decisions (persist these)

- **Artboard is 1516 px wide.** Page grid is 1440 px with 40 px page padding —
  at 1516 that yields the 38 px margins the PDF's guides show.
- **Navbar uses its own 1348 px container.** In the PDF the nav lockup sits at
  x 95 → 1443, i.e. ~11 px right of centre — a designer nudge. We centre a
  1348 px container instead (84 → 1432), which is symmetric, responsive, and
  within ~11 px of the source. Deliberate; do not "fix" it to the 1440 grid.
- **Hero geometry:** 64 px top padding, 132 px bottom padding, which makes the
  reference's 632 px section height content-driven rather than hard-coded.
- **Hero artwork** (`hero-bg.png`, 4548×2016 = 1516×672 @1×) sits **40 px above**
  the hero section, so its top band runs behind the opaque navbar
  (`.backdrop { inset: -40px 0 0 }`). That reproduces the PDF exactly.
- **H1 is left-aligned inside a centred block** — the reference's second line
  starts flush with the first, it is not centre-aligned text. The hard line
  break is hidden below 720 px (`.titleBreak`).
- **Entrance animation is pure CSS** (`.enter` + `--reveal-delay`), never
  JS/IntersectionObserver, so content is never stranded at `opacity: 0` when JS
  is slow or unavailable. Reduced motion disables it.
- **Logo has no supplied asset**; `components/ui/Logo.tsx` is a hand-traced SVG
  (mark + wordmark) measured from a 192 dpi render of the PDF. Ring-dot
  coordinates are rounded so SSR and client markup match exactly (unrounded
  floats caused a hydration mismatch).
- **Trust icons are hand-drawn SVGs** with per-icon viewBoxes so each fills the
  42 px slot the way the reference artwork does.
- **Hero CTAs are equal width** (`.lg { min-width: 268px }` in `Button.module.css`,
  shared by both variants). The PDF actually uses different insets per button
  (primary 60 px / secondary 37 px), but the user explicitly asked for a
  matched pair — this is a deliberate deviation from the reference, not an
  oversight.
- **`<header>` uses `display: contents`** (`.siteHeader` in `globals.css`).
  Without it, the sticky navbar's containing block is the announcement-bar+nav
  wrapper itself — exactly 108 px tall, i.e. exactly the sticky element's own
  height plus its pre-scroll offset — which leaves **zero slack** for the
  sticky element to travel, so `position: sticky` computes correctly but
  never visibly pins. `display: contents` removes `<header>` from the box
  tree (keeping the landmark for a11y) so the containing block becomes the
  full page instead. If you ever reach for `position: sticky` again anywhere
  in this project, check that its parent isn't shrink-wrapped to just the
  sticky element's own size — that's the general form of this bug.
- **`overflow-x: hidden` lives on `html`, not `body`.** Setting it on `body`
  (or any non-root box) makes that element a scroll container, which competes
  with the true root scroller and can itself break `position: sticky` for
  descendants. `html` is `document.scrollingElement` here, so the guard is
  harmless there.
- Navbar is `position: sticky; top: 0` (`Navbar.module.css`); the announcement
  bar scrolls away normally above it.
- **Section 5 is just the supplied image.** `dashboard-mockup.png` already
  bakes in the browser chrome, the floating "Call me now" card and the
  "Connect rate 7x" badge as one flat composite — confirmed by diffing the
  asset's own visible-pixel bounding box against the PDF's rendered bbox
  (both ≈1389×611 at 1×, placed 1:1, no extra scaling). So
  `DashboardShowcase` is one `next/image` at `aspect-ratio: 4306/2150`,
  capped to `max-width: 1080px` and centred (not full container width — see
  sizing note below).
- **⚠️ Section 6's right-hand illustration is no longer the flat
  `introducing-dros.png` — it's a real, coded, seamlessly-looping CSS
  animation**, per explicit user request ("convert this static illustration
  into a polished, looping live illustration"). `IntroducingDros.tsx` renders
  `<EngagementQueueIllustration />` (`components/sections/
  EngagementQueueIllustration.tsx` + `.module.css`) inside the same
  `.imageFrame` wrapper the old image used — the frame's own sizing/aspect-
  ratio/breakpoints in `IntroducingDros.module.css` were untouched, so the
  rest of the section's layout didn't change. `introducing-dros.png` is left
  in `public/assets/` unreferenced (not deleted — wasn't asked for removal).
  - **Two new real assets, confirmed with the user (not generated/stock)**:
    `public/assets/engagement-queue-bg.jpg` (copied from
    `alexander-kaufmann-dJSLl0oO0AU-unsplash 1.jpg` — the car/chrome
    background photo) and `public/assets/fully-automated-ribbon.png`
    (copied from `fully automated.png` — the exact "Fully Automated" ribbon
    graphic, used as-is via `next/image`, not recreated in CSS). A third
    file the user initially pointed at, `Frame 2147227677.jpg` (an unrelated
    "Best Value" pricing badge), was a mismatched file and is **not** used
    anywhere — the user supplied the correct ribbon asset once asked.
  - **⚠️ v1 was rejected by the user** ("nothing is moving... does not feel
    like a proper storytelling... bg is not visible much") and rebuilt as
    v2, described below. If you're looking at this component fresh, what's
    live now is v2 — do not resurrect v1's design (8s loop, 4 static rows, a
    "+$330" bump chip, an 87%-of-frame card) as if it were the target.
  - **v2 is a genuine queue-advance story, not a fixed 4-row card that
    fidgets in place.** Five accounts total, one 10s loop: Leo Martins is
    the active row (avatar ripple + a sheen sweep across his progress bar,
    both via a two-layer opacity-window + continuous-inner-animation split
    so the "when is this row active" gating and the "what does active look
    like" motion don't fight over the same CSS property on one element),
    his bar sweeps ~22%→100%, his pill runs Calling…→Negotiating→PTP
    captured (with a `CheckIcon`, `components/ui/icons.tsx`), a capture glow
    pulses on his row — then **his row actually collapses out of the DOM
    flow** (the `grid-template-rows: 0fr→1fr` trick already used by
    `FaqAccordion` — `Faq.module.css:82-94` — but keyframed instead of
    transitioned) and **Priya Nair expands in at the bottom** the same way,
    in reverse. Rows 2-3 (Andrew Cole, Amira Shah, Daniel Reyes at that
    point — Andrew was row 1) naturally reflow up in normal layout flow;
    nothing about their position is hand-animated. Later in the same loop
    Andrew becomes the active row (ripple/sheen move to him, his own pill
    flips In progress→Negotiating). Amira and Daniel never go "active" but
    still get their own small staggered progress-bar creep windows, so
    there's always *something* moving even between the two featured beats —
    this is what actually fixed "nothing is moving": v1's bars sat frozen
    for 4.2 of every 8 seconds with only a 6px dot animating in between.
  - **The five per-row keyframe sets (`row0Progress` … `row4Progress`, etc.)
    are hand-written per row, not a generic parameterised system** — five
    one-off story beats didn't earn an abstraction. Reuses the same
    `clip-path`-on-a-registered-`@property --progress` technique as v1/
    `CallCard` for the bar fills.
  - **A shared `queueReset` opacity-dip keyframe, applied to every row's
    inner content (and the summary figure) near the 90-98% mark, masks the
    moment every value snaps back to its 0% start** — Leo's row re-expanding,
    Priya's collapsing away, every bar/pill/counter reversing — so the loop
    reads as a brief "system catching its breath" rather than a jump cut.
    Every keyframe is still authored so its 100% value equals its 0% value
    (unchanged principle from v1), which is *why* the global
    `prefers-reduced-motion` rule in `globals.css` (forces
    `animation-iteration-count: 1` at ~0 duration) lands on one coherent
    static frame for free — verified for v2 specifically via Playwright's
    `reducedMotion: "reduce"` context emulation (4 rows, Leo expanded and
    idle, Priya collapsed away — not a half-collapsed layout).
  - **The dollar figure still never gets rewritten wholesale by CSS**
    (`counter()` can't render a thousands comma) — but v2 replaces v1's
    "+$330" bump chip (which the user's own screenshot showed rendering as a
    muddy semi-opaque smudge mid-fade) with a cleaner split: the figure is
    static `"$48,"` text plus one small animated 3-digit tail
    (`.counterTail`, `@property --n { syntax: "<integer>" }` +
    `counter-reset` + `content: counter(n)`), ticking `210→450` and back.
    Always 3 digits, so no padding/comma edge case.
  - **Composition fix, per direct user feedback ("bg is not visible
    much")**: the white `.card` shrank from ~420×530 (≈87% of the 480×610
    frame) to ~392×470 (≈78%), and `.scrim`'s dark gradient roughly halved
    in opacity (`.55/.12/.5` → `.34/.04/.3`). Both changes are scoped to
    `EngagementQueueIllustration.module.css` only — `IntroducingDros`'s own
    `.imageFrame` (the 480px-wide column in the page grid) is untouched, per
    the user's explicit clarification that "reduce the size" meant the card
    within the photo, not the section's footprint on the page.
  - **Responsive scaling is still uniform scale-to-fit, not a reflow** — the
    whole illustration (ribbon + card) is built at one fixed intrinsic
    canvas (480×610px, unchanged from v1) and scaled down as a unit via
    `container-type: inline-size` + `transform: scale(calc(100cqw / 480))`
    on `.stage`/`.illustration`. Confirmed with the user again for v2 rather
    than assumed. Verified down to 430px viewport.
  - Verified via an 11-shot Playwright filmstrip (~1s apart, spanning a full
    10s loop) at 1516px, a 430px mobile shot, and a `reducedMotion: "reduce"`
    context shot — no `chromium-cli`/project-local Playwright install
    available in this environment, so `npx playwright`, with the driver
    script run from inside the npx cache dir so its `require`/`import` of
    the `playwright` package resolves. **The filmstrip, not a couple of
    screenshots a few seconds apart, is what actually catches a "looks
    frozen" regression** — v1 was verified with only 3 shots ~1.5-2s apart
    and still shipped with 4.2s of dead time per loop; that gap is why v2's
    verification step was widened. No console errors across any of the
    three checks.
- **Sections 5 & 6 are deliberately smaller than the PDF's literal scale.**
  Full-container-width images made both sections run edge-to-edge and taller
  than a typical viewport (≈820–960 px each), so the user asked for side
  margin and for each section to be viewable without scrolling mid-section.
  Fix: capped `.frame`/`.row` to `max-width: 1080px` / `1180px` (was full
  1440 container) and trimmed internal gaps in `IntroducingDros`
  proportionally. Current heights at 1516 px / 900 px-tall viewport:
  dashboard ≈620 px, Introducing DROS ≈770 px — both comfortably inside one
  screen. If a later section feels oversized again, check for full-width
  imagery first before adding a scoped `max-width`.
- **New shared type tokens** in `globals.css`: `--fs-h2` / `--lh-h2` / `--ls-h2`
  for section headings (measured off "The Debt Resolution" — Inter SemiBold
  sized to the reference's ~44 px cap-height using the same line-width
  substitution approach as the hero display face), and `--fs-body` /
  `--lh-body` for supporting paragraph text (17 px / 1.6). Reuse these for
  every later section rather than inventing new sizes.
- **Section 6 feature icons are hand-traced SVGs** (`LayersIcon`, `ContextIcon`,
  `WorkflowIcon` in `components/ui/icons.tsx`), same stroke-icon pattern as
  the trust strip.
- Introducing-DROS text column is capped at `max-width: 600px` inside a
  `minmax(0,1fr) minmax(0,610px)` grid — the PDF's text column doesn't reach
  the full available half-width (its longest line is ~570 px), so this
  reproduces the proportion without hard-coding an exact px offset.
- **Section 7's three use-case cards are one asset reused verbatim.**
  `solution-card.png` (the same "Leo" call card) is placed identically in all
  three rows — confirmed against the PDF, which really does repeat the exact
  same card image for all three Debt Collection rows. Not a bug; don't swap
  in per-row unique screenshots that don't exist.
- **Industry tabs are interactive but content-static.** `IndustryTabs.tsx`
  (client component, `components/sections/`) is a real `role="tablist"` with
  click + arrow-key/Home/End navigation and an animated sliding white
  indicator (measures the active tab's rect via `getBoundingClientRect` in
  `useLayoutEffect`, re-measures on window resize so it tracks wrapped rows
  at mobile widths too). The active tab's own background is a solid CSS
  class, not solely JS-positioned — that's deliberate so the correct tab is
  always white even before hydration/the indicator's first measurement; the
  indicator layers a sliding trail underneath for the motion. What it does
  *not* do: swap the use-case content below when you click BPO/Insurance/
  Mortgage — the PDF only ever had copy for "Debt Collection", so there is
  nothing to switch to yet. When that copy arrives, key `USE_CASES` (in
  `Solutions.tsx`) per industry and lift `IndustryTabs`'s active-index state
  up (or pass an `onChange`) to drive which set renders.
- **Alternating row layout uses `data-reverse` + CSS grid placement**, not
  reordered JSX — `Solutions.module.css`'s `.row[data-reverse="true"]` swaps
  `.text`/`.card` into the other grid column. `Entrance` was extended to
  spread arbitrary props (incl. `data-*`) onto its rendered element to
  support this — reuse that rather than adding a second wrapper if a future
  section needs the same trick.
- **Section 8 (auto re-dial) is the same flat-asset pattern as Section 5** —
  `auto-redial.png` bakes in the heading, bullets, "Attempt" chips and the
  Vodex mark; `AutoRedialBanner` is one `next/image` at
  `aspect-ratio: 4107/1024`, capped to the same `max-width: 1180px` used
  elsewhere for side breathing room.
- **Section 9's avatar isn't a new asset — it's cropped out of
  `solution-card.png`.** The PDF reuses the exact same "Olivia" headshot in
  all three call-sample cards, and that headshot is the same photo already
  baked into the Solutions card graphic (confirmed by pixel comparison).
  `public/assets/agent-avatar.png` is a 190×190 crop of that face straight
  out of the supplied asset — not a new/stock image, and not fabricated.
- **⚠️ Section 9 now has real, playable audio — but 3 temporary/mismatched
  MP3s, not final content.** `public/assets/call-sample-1.mp3` / `-2.mp3` /
  `-3.mp3` were supplied by the user to wire up real playback; they're real
  conversations (accounting/insurance/law-firm calls, ~92s/108s/100s) with
  no relation to the on-screen card copy — user is explicit these are
  placeholders and will be swapped. Filenames are position-based
  specifically so that swap is just "overwrite the file", no code change.
- **Waveform bar shapes are now decoded from the real audio file, per card**
  (`components/ui/useWaveformData.ts`) — the first version reused
  `AudioWaveform`'s one fixed decorative bar-height array for every card
  with only a colour-fill sweep as "progress", which the user flagged as not
  a real/"proper" waveform. `useWaveformData(src)` fetches the file,
  `AudioContext.decodeAudioData`s it client-side, and reduces the first
  channel's samples into 30 peak-amplitude bars (6–30px), normalized to that
  file's own max — so each of the 3 cards now shows a genuinely different
  shape reflecting its actual audio. `AudioWaveform.tsx` gained an optional
  `heights?: number[]` prop for this (its old fixed array is now purely the
  fallback shown while decoding/if decoding fails — still not random, still
  no SSR/hydration-mismatch risk). Runs once per mount, eagerly for all 3
  cards (files are small; having real waveforms visible before any click
  matters more here than deferring the work).
- **Call-sample architecture mirrors IndustryTabs/FaqAccordion**:
  `CallSamples.tsx` stays a server component (static header + data);
  `CallSamplesGrid.tsx` (new, client) owns `activeIndex: number | null` and
  is the *only* place that coordinates "starting one stops the other" — it
  does this by passing `isActive`/`onActivate`/`onEnded` down, **not** by
  reaching into sibling `<audio>` refs directly. `CallCard.tsx` (now
  `"use client"`) owns its own `<audio>` ref and pauses itself in a
  `useEffect` the moment its own `isActive` prop goes false.
  - **Known gotcha, already hit and fixed**: local MP3s load fast enough
    that the native `loadedmetadata` event can fire *before* React finishes
    attaching its `onLoadedMetadata` JSX listener, so duration silently
    never updates. Fixed by attaching the listener imperatively in a
    `useEffect` that also checks `audio.readyState >= 1` immediately (metadata
    may already be there by the time the effect runs). If you add another
    audio/video element anywhere in this project, use the same
    check-readyState-then-attach pattern, not the JSX prop, for any event
    that a fast/cached local resource could fire early.
  - Playback progress is read via `requestAnimationFrame` while playing and
    written straight to a `--progress` CSS custom property on a ref'd
    element (not React state), so the waveform sweeps every frame without
    re-rendering 60×/sec. `AudioWaveform` is rendered twice per card — a
    muted base layer + a `var(--brand)` overlay clipped via
    `clip-path: inset(0 X% 0 0)` driven by `--progress` — clicking either
    layer seeks (click-X ÷ width × duration).
  - **The time label counts down (`duration - currentTime`), not a static
    total** — per explicit user feedback ("the number reflects the correct
    time to complete, it should be dynamic"). Driven by the native
    `timeupdate` event (React state is fine here, unlike the 60fps progress
    sweep — `timeupdate` only fires a few times a second) plus an immediate
    update on seek. Holds its value on pause (doesn't jump back to the
    total); resets to the full duration on `ended`.
  - While playing, the bars under the orange (played) layer also run a
    `scaleY` pulse (`@keyframes wavePulse`, `CallCard.module.css`), staggered
    per bar via a `--i` custom property `AudioWaveform.tsx` now sets on each
    `<rect>` — added specifically so the waveform reads as "live audio",
    not just a static fill sweeping across frozen bars (first version looked
    flat; this was explicit user feedback). Only the played layer animates,
    not the muted base — keeps the "now playing" read clear.
- **Card bottom-alignment uses the same technique as Resources**, with one
  addition: `.card { height: 100%; ... }` is required here (Resources'
  `Entrance` renders *as* the card element directly, so grid stretch reaches
  it for free; here `Entrance` wraps `CallCard` in a plain `div`, so `.card`
  needs its own `height: 100%` to actually fill that stretched wrapper
  before `margin-top: auto` on `.status` has anything to push against).
- **Card border moved from the group wrapper to each card**: `.frame` in
  `CallSamples.module.css` no longer has a border (was `1px solid
  var(--hairline)` around all three cards); each `.card` in
  `CallCard.module.css` now has its own `border: 1px solid
  var(--hairline-strong)` (fading to transparent on hover, where the
  existing lift/shadow takes over) — explicit user request, not a design
  reversion to undo later.
- **Section 10's bento grid uses 5 real photos**, mapped to their captioned
  slots by opening the reference PDF at the section's actual pixel
  coordinates rather than guessing by content fit — every supplied photo
  turned out to be the literal asset used in the Figma design. Mapping:
  main tile ("A Team that never sleep") → `why-main.jpg`; sub-tiles in
  `SUB_TILES` order → `why-tile-1.jpg` ("24/7 Voice AI"), `why-tile-2.jpg`
  ("Built for high-volume voice ops"), `why-tile-3.jpg` ("Scale workflows,
  not headcount"), `why-tile-4.jpg` ("Talk with context, not just
  scripts"). `components/ui/PlaceholderImage.tsx` (and the now-unused
  `BadgeChip.tsx`, see footer entry below) were deleted once nothing
  referenced them.
  **⚠️ Sizing bug found and fixed in the same pass** (user flagged the
  grid "doesn't match" the PDF): `.mainPhoto`'s aspect-ratio was coded as
  `4/5` (portrait) when the reference photo is landscape — measured
  directly off the PDF at ≈564×377px, i.e. **3/2**, not 4/5. The
  `.mainTile`/`.subGrid` flex-basis split was `38%`/`62%`; measured split
  is **~47%/53%**. `.tilePhoto` nudged from `3/2` to `7/4` (measured
  ~1.72:1) as a smaller secondary correction. If a bento-style photo grid
  shows up elsewhere in this project, measure it the same way (PDF pixel
  bbox via `pdftotext -bbox` + a `pdftoppm` crop, not eyeballing) before
  trusting the aspect-ratio/split values by feel.
  **⚠️ Second bug, caught one round later**: `.mainTile` and `.tilePhoto`
  both had an invented `border-radius` (20px/16px) that doesn't exist in
  the reference — confirmed by zooming into the PDF corner at 4×+ with
  nearest-neighbor scaling (a real rounded corner shows a visible arc at
  that zoom; these didn't — perfectly sharp 90°). Both are now
  `border-radius: 0`. The first pass eyeballed a full-page thumbnail and
  misread anti-aliasing as rounding — **don't trust corner-radius by eye
  at low zoom; always zoom into the actual corner pixels before deciding
  a card/banner/tile is rounded.**
- Section 10's eyebrow reuses the `Logo` component at `height={16}` next to
  the word "Why" — the PDF's eyebrow pill is "Why" + the Vodex mark +
  wordmark, not plain text like the other section eyebrows.
- **Sections 11 (case study), 14 (enterprise band) and 15 (Final CTA) all
  use a real background photo now**, confirmed against the PDF to be the
  literal reference asset in each case — no dark overlay/scrim needed on
  top of any of them; the photos themselves already carry enough contrast
  for the white text. Pattern used in all three: `next/image fill` as the
  first child inside `.banner` (`isolation: isolate` was already present
  in each `.module.css`, specifically for this), CSS class `z-index: 0` on
  the image, `position: relative; z-index: 1` on the content wrapper
  (`.grid` / `.content`). Assets: `case-study-bg.jpg`, `enterprise-bg.jpg`,
  `final-cta-bg.jpg`. Final CTA's background wasn't in any prior
  "placeholder" tracking — it turned out to need one too; don't assume a
  section is finished just because it wasn't on a punch list.
  **⚠️ These three are NOT all treated the same** — corrected one round
  later after the user pasted reference screenshots showing sharp corners
  and (for Enterprise Band specifically) full-bleed width, which
  contradicted the rounded/capped-1180px card treatment all three
  originally shipped with (a pre-existing pattern from before the photos
  were dropped in, never itself verified against the PDF). Re-measured by
  pixel-scanning full-width rows of the PDF crop for non-background pixels:
  - **Enterprise Band is genuinely full-bleed** — the photo runs edge-to-
    edge at 0 inset (x=0 to the artboard's full width, confirmed at every
    sampled row). Fixed by moving `.banner` out of the `<div
    className="container">` wrapper entirely (it's now a direct child of
    `<section>`), and dropping `.banner`'s `max-width`, `margin-inline`,
    and `border-radius`. `.content` keeps its own `max-width: 640px;
    margin-inline: auto` so the text stays centered within the full-width
    band, independent of the photo's width.
  - **Featured Case Study and Final CTA are inset, not full-bleed** —
    measured content width ≈**1327px** (inset ~94.5px from the artboard
    edge each side), not the 1180px both were capped at. `.banner`'s
    `max-width` corrected to `1327px` in both; `border-radius` removed
    (sharp, confirmed by corner zoom) along with Featured Case Study's
    `.stat`/`.cta` sub-cards (also sharp in the reference).
  - **FAQ's cards are correctly rounded** (~10–14px) — verified by the
    same corner-zoom technique and left unchanged. The lesson isn't
    "remove all rounding," it's "measure every corner individually
    instead of assuming a site-wide card-radius convention" — this
    project never had one; each rounded value in the codebase was
    invented per-component, not derived from the PDF.
- **Section 12 (Resources) card thumbnails are real photos**, same
  PDF-verified mapping approach: `resources-1.jpg` (hand + cash) → "Debt
  Collection" card, `resources-2.jpg` (glowing AI chip) → "AI &
  Technology", `resources-3.jpg` (lit office facade) → "Voice Technology"
  — order matches the `POSTS` array in `Resources.tsx`. `.card`'s
  `border-radius: 18px` was removed one round later — corner-zoomed
  against the PDF and confirmed sharp, same finding as Why/Featured-Case-
  Study/Enterprise-Band (see that entry for the general lesson). The
  `.readMore` button's `10px` radius is untouched — that's the shared
  `--radius-btn` convention, not a card corner.
- **FAQ copy (Section 13) is genuinely rewritten, not a placeholder.** The
  PDF's own text ("Recruiting vs Staffing pricing", "Talently") is leftover
  copy from an unrelated template — confirmed nonsensical for a
  debt-collection voice-AI product. The user explicitly asked for real
  Vodex-relevant FAQs instead of reproducing or placeholder-stubbing it; the
  five Q&As in `Faq.tsx` are grounded in product facts already established
  elsewhere on this page (RPC verification, payment negotiation, multi-industry
  support, compliance) — no invented pricing or contractual claims. Same
  fix applied to the side-panel card, whose PDF copy ("Shoot a Direct Mail")
  was equally mismatched.
- **FAQ accordion is a client component** (`FaqAccordion.tsx`) — single-open
  behaviour (opening one closes any other), `grid-template-rows: 0fr → 1fr`
  transition (not `max-height`, which needs a magic number), plus-icon
  rotates 45° and turns brand-orange when open. First item open by default.
- **Footer certification badges, backer logos, and the wordmark are all
  real supplied artwork now** (previously text `BadgeChip`s + a hand-built
  SVG wordmark). Three source files, three different treatments — decided
  with the user directly since each had a different shape:
  - **8 cert badges**: source `Frame 2147227673.jpg` is a 3×3 grid of all
    8 seals baked onto one non-transparent background. The PDF itself
    renders these as 8 discrete badges in a single flex-wrap row (with a
    divider before the last two — DebtLink/RMAi), not a grid block, so —
    per the user's explicit choice — they were cropped into 8 individual
    files instead of shipping the grid as one image, to keep the existing
    responsive wrap and per-badge alt text. Extraction script (scratch,
    not committed): connected-component detection to find each badge's
    bounding box, then for the 7 roughly-circular badges (ISO, SOC2,
    HIPAA, FDCPA, Reg F, TCPA, DebtLink) a tight square crop + a
    Gaussian-feathered circular alpha mask; the RMAi mark is a flat
    logo on a *near-black* (not `--ink` gray) background, so a rectangular
    alpha mask still showed a visible seam against the footer — fixed by
    keying transparency from pixel brightness instead (background pixels
    near-black → transparent, the lighter logo strokes → opaque), which
    is the right technique any time a logo needs pulling off a background
    close to black but not an exact color match. Files: `footer-cert-iso
    .png`, `-soc2.png`, `-hipaa.png`, `-fdcpa.png`, `-regf.png`,
    `-tcpa.png`, `-debtlink.png`, `-rmai.png` — rendered at `height: 48px`
    in `.certBadge`, row uses `.badgeDivider` (hidden below 640px) to
    reproduce the PDF's grouping.
  - **3 backer logos**: source `footer.png` already has real alpha and
    already lays the 3 logos out side-by-side exactly as the PDF does —
    used as one image (`footer-backers.png`), no cropping needed.
  - **Wordmark**: source `vodex footer.png` is a pre-rendered raster of
    the same red→black gradient wordmark, already RGBA, at 4548×1003 (3×
    of the 1516 artboard, same convention as `hero-bg.png`) — swapped in
    directly as a `next/image` (`footer-wordmark.png`) in place of the
    hand-built `<svg><Wordmark/></svg>` block. The `Wordmark` sub-component
    in `Logo.tsx` is still used (it's what the normal-sized `<Logo>` mark
    renders internally) — only the footer's standalone oversized copy of
    it was replaced.
  - `BadgeChip.tsx` had no remaining usages after this and was deleted.
- **⚠️ The oversized footer VODEX wordmark is now vector, not the supplied
  raster** — user reported it "is not clear". Diagnosed rather than guessed,
  and the first three suspects were all ruled out with measurements:
  - **Not Next.js image optimization.** The served asset was decoded and
    diffed against a LANCZOS downscale of the source: `w=3840&q=75` AVIF has
    a mean absolute error of 0.42/255 per channel and *identical* edge
    transition widths. `q=90` changes nothing measurable. Delivery is fine.
  - **Not resolution starvation.** `next/image` already serves 3840px wide
    for a ~1436px slot, i.e. >2x at DPR 2.
  - **The source raster is a low-res export upscaled to 4548px.** At 1:1 the
    PNG shows ~8-10px stair-stepped edges. Rendering the reference PDF's own
    footer band at the same 4548px width reproduces the *same* stair-steps,
    and the PDF stores this lockup as a gradient masked by a 1837x590 bitmap
    (`pdftocairo -svg` + `pdfimages -list`) — so the softness is baked into
    the design file. No delivery-side tweak could ever fix it.
  - **Fix: `components/ui/FooterWordmark.tsx`**, an inline SVG whose paths
    were *measured*, not eyeballed, off the reference PNG's alpha channel:
    sub-pixel edge crossings at alpha=128, then least-squares fits — straight
    lines for V/E/X (max residual ~3px at 4548 scale, i.e. the source's own
    noise), and rounded rectangles with elliptical corners for O and D
    (RMS ~1.9-2.7px). Verified by rendering the candidate SVG at 4548x1003 in
    headless Chromium and computing IoU against the reference alpha mask:
    **0.981**, with the remainder being the reference's own anti-aliased
    fringe. The pre-existing hand-traced `Wordmark` in `Logo.tsx` was tried
    first and scored only **0.891** — its letter widths are within 1.2% but
    its stroke weights, O/D counters and E bar heights are visibly wrong at
    200px tall, so it was *not* reused here. `Logo.tsx`'s `Wordmark` is
    unchanged and still correct for the 38px navbar lockup.
  - Geometry is kept in the reference band's own coordinates
    (viewBox `0 0 4548 1003`, cap height y 93.4 -> 999.6) so every measured
    number appears verbatim in the file and the aspect ratio is identical to
    the raster it replaced — `.wordmarkWrap`'s existing crop is unaffected.
    The O deliberately overshoots the viewBox at the bottom and is clipped by
    it, exactly as in the source. Gradient is `#FF1E00` at y=0 to `#000` at
    y=1003, fitted by linear regression over the reference's opaque interior
    pixels (R = -0.2542y + 254.8, G = -0.0297y + 29.7, B = 0) — note this is
    a more saturated red than `--brand` `#FF4D00`, matching the reference.
  - **Two measured deviations from the reference were found but deliberately
    NOT changed** (pre-existing, and outside a "make it sharper" request) —
    raise with the user before touching: (a) the reference wordmark is
    effectively full-bleed, spanning x 8.7 -> 1508 of the 1516 artboard
    (~1500px), where ours is 1436px inside the 1440 container; and (b) the
    reference shows the wordmark's *full* 906px cap height ending flush with
    the page bottom, where `.wordmarkWrap`'s `max-height: 200px` crops ours to
    ~63% of its height. (b) is a documented earlier decision ("bleeds off the
    bottom edge instead of being fully visible"), not an accident.
  - `footer-wordmark.png` is left in `public/assets/` unreferenced (same
    treatment as `introducing-dros.png`) — it is the measurement reference.
  - **If the real Vodex logo ever turns up as SVG/AI, drop it in and delete
    this component** — it is a faithful reconstruction of a blurry raster, not
    the original artwork.
- **⚠️ Final CTA's orbiting icon cluster now uses 7 real supplied icon PNGs
  + the real center mark, not hand-drawn SVGs** — the user supplied the
  actual Figma icon exports (`vodex assets/Frame 2147227660–666.png`, all
  153×153 RGBA transparent) plus `vodex assets/vodex logo 1.png` (319×319,
  the orange waveform *already inside its own orange dotted ring*) and
  asked for the illustration rebuilt accurately from these instead of the
  earlier placeholder icon set. Copied into `public/assets/` as
  `final-cta-icon-{chart,shield,link,gauge,phone,chat,sync}.png` and
  `final-cta-center-mark.png`. `FinalCta.tsx` renders them via a data-driven
  `NODES` array (`{ src, alt, angle, ring }`) mapped to `<Image>` + a
  `styles.node`/`nodeOuter`/`nodeInner` span — no more one class per node.
  The center span now just renders `final-cta-center-mark.png` directly
  (removed the old `.center` brand-circle background/box-shadow/`Waveform`
  SVG, since the dotted ring is baked into the supplied asset).
  - **Switched node placement from hand-tuned `top`/`left`/`right` percentages
    to the same trig rotate→translate→counter-rotate technique already used
    for `Logo`'s ring-dots** — `transform: rotate(var(--angle))
    translateY(calc(-1 * var(--radius))) rotate(calc(-1 * var(--angle)))`,
    with a per-node `--angle` (0deg = 12 o'clock, positive = clockwise) and
    `--radius` inherited from `.nodeOuter`/`.nodeInner`. **Gotcha hit and
    fixed**: the first version translated along the untransformed X-axis
    (`translate(var(--radius))`, no `Y`), which makes `angle: 0` point *east*
    with positive angles going clockwise from there — not the clock-face
    convention the `--angle` values were written against, so every icon
    landed ~90° off (bunched bottom-right instead of ringed). Translate
    along **Y** for a 12-o'clock zero; if you add another trig-positioned
    ring in this project, do the same.
  - **⚠️ The whole cluster's geometry is ratio-driven off one number.**
    `.cluster` declares `--ring-outer: 148px` and everything else is a
    `calc()` of it — `--ring-inner: calc(var(--ring-outer) * 0.54)`, center
    mark `0.58 × --ring-outer`, node badge `44px` (0.30×), cluster box
    `--ring-outer * 2 + --node` (so the badges sit fully inside their own
    box). Those three ratios are **measured off the reference illustration**
    in polar coordinates, not invented: in the reference the inner ring is
    0.54× the outer, the orange dotted centre mark is 0.29× the outer
    *radius*, and each icon badge is 0.30×. To rescale the illustration,
    change `--ring-outer` alone — the grid column is `auto` so the layout
    follows. Don't re-hardcode any of the derived pixel values.
  - **The v1 of this rebuild was rejected by the user** ("they are not even
    same… they are far from the orbit lines"). Two real causes, both now
    fixed, and both worth knowing before touching this again:
    (a) the rings were `rgba(255,255,255,0.14)` — effectively invisible over
    the busy background photo, so the icons read as floating in space with
    no orbit to belong to (now `0.26`); and (b) the proportions were wrong
    — inner ring was 0.68× the outer (reference: 0.54×) and the centre mark
    was 0.38× the outer radius (reference: 0.29×), which made the rings look
    small and the centre blob look huge. **The icons were already
    geometrically on the ring lines in v1** — confirmed by measuring the
    rendered DOM (every outer node at radius exactly 170 = the outer ring's
    radius). So when this illustration "looks wrong," measure the rendered
    rects before assuming the placement maths is broken; the fault was
    contrast and proportion, not position.
  - Node angles are now **measured** off the reference in polar coordinates
    (centre-relative, clock angles): chart −36°, chat 40°, shield 45°,
    sync 99°, link 139°, gauge 213°, phone 270°. Each icon then rides
    whichever ring it sits nearest in the reference (chart + chat inner;
    shield, sync, link, gauge, phone outer) so every badge lands *on* an
    orbit line — the reference actually scatters them across the annulus at
    0.52–1.24× the outer radius, but the user explicitly asked for them
    snapped to the orbits. No PDF page backs this section (the source is a
    supplied photo + icon set, not the Figma PDF export), so these came off
    the user's reference screenshot. Hidden below 900px
    (`.cluster { display: none }`) unchanged from before.
  - **Not yet approved** — built clean and typechecked/build-verified
    (`tsc --noEmit`, `next build`, Playwright screenshots at
    1516/1280/900/430px, zero console errors/overflow at every width) per
    the user's "just build clean, I will verify myself" instruction; treat
    as pending review, same status as Section 9's audio player and the
    Section 10–15/Footer photo swap.

### Asset → component map

| Asset (`assets/`)                         | Destination                        |
| ----------------------------------------- | ---------------------------------- |
| `hero landing page bg.png`                | `public/assets/hero-bg.png` → Hero |
| `landing page 2nd section dros image.png` | `public/assets/dashboard-mockup.png` → Section 5 |
| `introducing dros image.png`              | `public/assets/introducing-dros.png` — unused now, left in place (see decisions) |
| `alexander-kaufmann-dJSLl0oO0AU-unsplash 1.jpg` | `public/assets/engagement-queue-bg.jpg` → Section 6 (illustration bg photo) |
| `fully automated.png`                     | `public/assets/fully-automated-ribbon.png` → Section 6 (ribbon graphic) |
| `solution 1.png`                          | `public/assets/solution-card.png` → Section 7 (×3) |
| `auto redial image.png`                   | `public/assets/auto-redial.png` → Section 8 |
| *(cropped from `solution 1.png`)*         | `public/assets/agent-avatar.png` → Section 9 (×3) |
| `accounting conversation.mp3` (temp)      | `public/assets/call-sample-1.mp3` → Section 9, card 1 — ⚠️ placeholder, mismatched to card copy |
| `insurance conversation.mp3` (temp)       | `public/assets/call-sample-2.mp3` → Section 9, card 2 — ⚠️ placeholder, mismatched to card copy |
| `law firm conversation.mp3` (temp)        | `public/assets/call-sample-3.mp3` → Section 9, card 3 — ⚠️ placeholder, mismatched to card copy |
| `pexels-henri-mathieu-8355761 1.jpg`      | `public/assets/why-main.jpg` → Section 10 (main tile) |
| `pexels-ai25studio-8837570 1.jpg`         | `public/assets/why-tile-1.jpg` → Section 10 (sub-tile 1) |
| `darwin-boaventura-ne088OgsVmY-unsplash 1.jpg` | `public/assets/why-tile-2.jpg` → Section 10 (sub-tile 2) |
| `pexels-mart-production-7679680 1.jpg`    | `public/assets/why-tile-3.jpg` → Section 10 (sub-tile 3) |
| `pexels-mikhail-nilov-8297238 1.jpg`      | `public/assets/why-tile-4.jpg` → Section 10 (sub-tile 4) |
| `Frame 2147227651.jpg`                    | `public/assets/case-study-bg.jpg` → Section 11 |
| `jordey-capri-dyq-MluWjQc-unsplash 1.jpg` | `public/assets/enterprise-bg.jpg` → Section 14 |
| `ksenia-pixelesse-T2W-T2bLMUQ-unsplash 1.jpg` | `public/assets/final-cta-bg.jpg` → Section 15 (Final CTA) |
| `jakub-zerdzicki-84-_-HLxzpc-unsplash 1.jpg` | `public/assets/resources-1.jpg` → Section 12, "Debt Collection" card |
| `image 1024.jpg`                          | `public/assets/resources-2.jpg` → Section 12, "AI & Technology" card |
| `pexels-egorkomarov-13219418 1.jpg`       | `public/assets/resources-3.jpg` → Section 12, "Voice Technology" card |
| `vodex footer.png`                        | `public/assets/footer-wordmark.png` — **unused now**, superseded by the vector `FooterWordmark` (see decisions); left in place as the measurement reference |
| `footer.png`                              | `public/assets/footer-backers.png` → Footer "Backed By" row |
| `Frame 2147227673.jpg`                    | cropped into `public/assets/footer-cert-{iso,soc2,hipaa,fdcpa,regf,tcpa,debtlink,rmai}.png` → Footer cert row (source frame itself not shipped) |
| `Frame 2147227660/663/664/665/666/661/662.png` | `public/assets/final-cta-icon-{chat,chart,shield,sync,gauge,phone,link}.png` → Final CTA orbiting cluster |
| `vodex logo 1.png`                        | `public/assets/final-cta-center-mark.png` → Final CTA cluster center |

Assets are supplied by the user. **Never substitute stock, generated or
external imagery for a supplied asset.**

---

## 9. File layout

```
app/
  layout.tsx        fonts + metadata
  page.tsx          section composition
  globals.css       tokens, reset, container, .enter, .accent
  icon.svg          favicon (Vodex waveform + ring-dot mark)
components/
  layout/           AnnouncementBar, Navbar, Footer,
                    SolutionsMegaMenu (client)              [Solutions — §12]
                    ResourcesMegaMenu (client)                   [Resources — §17]
  hero/             Hero, TrustStrip
  sections/         DashboardShowcase, IntroducingDros,
                    EngagementQueueIllustration, Solutions,
                    IndustryTabs (client), AutoRedialBanner, CallSamples,
                    CallSamplesGrid (client), CallCard (client), Why,
                    FeaturedCaseStudy, Resources, Faq, FaqAccordion (client),
                    EnterpriseBand, FinalCta,
                    ProductHero, CoreFeatures, WhyItWorks,
                    WorksWithTools, SeeItInAction,
                    WhatYourTeamGets                      [Product Page — §11]
                    SolutionHero, SolutionIndustries,
                    SolutionWorkflows, SolutionComparison,
                    SolutionResults, SolutionSecurity          [Solutions — §12]
                    BlogFeaturedPost, BlogExplorer (client)          [Blog — §16]
                    VideoFeatured, VideoExplorer (client)          [Videos — §17]
                    CaseStudyFeatured, CaseStudyGrid          [Case Studies — §19]
                    FaqTopics (client), FaqHumanSupport            [FAQ — §20]
                    ComplianceCertifications, ComplianceSecurityPractices,
                    ComplianceDpoBanner                        [Compliance — §21]
  ui/               Logo (+ Wordmark), Button, Entrance, icons,
                    AudioWaveform, useWaveformData, BlogPostCard      [Blog — §16]
                    VideoCard                                     [Videos — §17]
                    CaseStudyCard                              [Case Studies — §19]
  blog/             ArticleHeader, ArticleToc (client), ArticleBody,
                    RelatedPosts                                     [Blog — §16]
public/assets/      web-ready copies of supplied artwork
lib/                blog-posts.ts — mock blog content + helpers       [Blog — §16]
                    videos.ts — mock video content + helpers       [Videos — §17]
                    case-studies.ts — mock case study content + helpers [Case Studies — §19]

app/products/page.tsx                    Product Page route (header + main + footer)
app/solutions/payment-reminders/page.tsx Solutions Page route (§12)
app/resources/blog/page.tsx              Blog listing route (§16)
app/resources/blog/[slug]/page.tsx       Blog post route (§16)
app/resources/videos/page.tsx            Videos listing route (§17)
app/resources/call-samples/page.tsx      Call Samples route — composes existing sections (§18)
app/resources/case-studies/page.tsx      Case Studies route (§19)
app/resources/faq/page.tsx               FAQ route (§20)
app/resources/compliance/page.tsx        Compliance route (§21)
```

---

## 10. Working rules

1. Build **one section at a time** and stop for explicit approval.
2. Never mark a section approved unless the user said so in words.
3. Do not replace supplied assets.
4. Do not redesign the PDF.
5. Keep animations subtle; respect `prefers-reduced-motion`.
6. Update **Current progress** and **Implementation decisions** after every
   meaningful change.

---

## 11. Product Page

> Reference: `D:\litlabs\Vodex\Vodex - Product_Page.pdf` — 4548 × 26166 pt =
> a 3× export of a **1516 × 8722 px** artboard, same convention as the
> landing page. Route: **`/products`** (the navbar's "Products" link already
> points here). Shared chrome (`AnnouncementBar`, `Navbar`, `Footer`) is
> reused verbatim — byte-identical announcement bar / nav geometry to the
> landing page, confirmed by measurement, not assumed.

### Current progress

All 9 Product Page sections are implemented — Hero, Core Features, Why it
works, Works with the tools you already run, See it in action, What your
team gets, FAQ (reused), Enterprise Band (reused), Final CTA (reused) —
plus the shared Footer. Sections 3–9 were built/fixed by rendering
`Vodex - Product_Page.pdf` at 24dpi (`pdftoppm -r 24`, same convention as
the landing PDF) and extracting exact bbox coordinates via
`pdftotext -bbox`, then cropping each target section to measure geometry
directly rather than eyeballing a thumbnail — see the per-section notes,
the "Round 2" fixes, and the Asset mapping table below.

Sections 1–2 (Hero, Core Features) implemented — `ProductHero.tsx` +
`CoreFeatures.tsx` in `components/sections/`, composed at
`app/products/page.tsx`. Sections 3–16 of the product page (Why it works,
tools strip, "See it in action", "What your team gets", FAQ, Enterprise band,
Final CTA + Footer — see the full inventory in the plan this was built from)
are **not yet built**.

**Section 1 — Product Hero.** Same structure as the landing hero
(`components/hero/Hero.tsx`): badge → H1 → lead → CTA pair, same `Entrance`
stagger (0/90/180/260ms), same badge geometry (50px pill, 34px orange circle
icon). Deltas, both measured off the PDF, not guessed:
- **Backdrop image starts at the very top of the page**, not 40px above the
  section like the landing hero — `.backdrop { inset: calc(-1 * var(--header-h)) 0 0 }`
  instead of a fixed `-40px`.
- **H1 line-height is 1, not 1.07.** Measured line pitch is 72px vs the
  landing hero's ~79px, at the *same* `--fs-display`/`--ls-display` — so
  those tokens are reused unchanged and only `.title`'s line-height is
  overridden locally. If another section ever needs this display face at a
  different pitch again, override line-height locally the same way rather
  than touching the shared token.
- **CTAs use the existing matched-width pair** (`Button` `.lg`,
  `min-width: 268px`), per explicit user decision — the reference's own
  product-hero CTAs are unequal (327px/256px), identical to the landing
  hero's reference CTAs, which were *already* deliberately overridden to a
  matched pair. Kept consistent across both heroes rather than reproducing
  the reference exactly here.
- Copy is verbatim from the PDF (badge "Our Product"; H1 "AI powered *phone
  calls* for enterprises"; lead about human-like conversations/system
  integration/enterprise-grade standards).

⚠️ **Fixed after user review**: `.title` was first built `text-align: left`
(copying the landing hero's approach, where the CLAUDE.md note explicitly
says the second line is flush-left, not centred). That note is specific to
the *landing* hero — this H1 measures differently: line 1 spans x365-1155
(centre 760), line 2 "enterprises" spans x575-940 (centre 757.5), i.e. the
second line is genuinely **centred** under the first, not left-flush.
Confirmed by the user pasting a screenshot ("'enterprises' is at center" —
meaning that's the *correct*, reference behaviour, and the live build's
left-alignment was the bug). Fixed by changing `.title` to `text-align:
center` and dropping the landing hero's `align-self: center` (redundant once
centred) and its now-unneeded mobile `text-align: center` override.
**Don't assume every H1/H2 in this project shares the landing hero's
flush-left second-line behaviour — check each heading's own measured line
centres before choosing left vs. center.**

**Section 2 — Core Features.** A full-bleed strip of **9 equal, contiguous,
sharp-cornered photo panels**, 555px tall — confirmed full-bleed and
gutter-less by column-to-column pixel-diff edge detection (panel pitch
1516/9 ≈ 168.4px, corners confirmed sharp by zoom, not rounded). Structure
mirrors `EnterpriseBand`'s full-bleed pattern: the `<ul>` strip renders as a
sibling of `.container`, not inside it, so it can span the full viewport
width while the eyebrow/heading/lead above it stay in the normal grid.
Header block (`.header/.eyebrow/.title/.lead`) copies the established
pattern already used in `Resources.module.css`/`CallSamples.module.css`,
with local overrides measured off this section specifically: `.title`
line-height `1.5` (reference pitch is 72px against `--fs-h2`'s 48px, vs the
shared `--lh-h2: 1.15`), and `padding-block: 136px 0` (the strip abuts the
section's own end; the ~160px of air below it in the reference belongs to
whatever section follows, not to this one).

⚠️ **Font weight/tracking fixed after user review.** Built first at the
shared H2 style (weight 600, `--ls-h2: -0.015em`) like every other section
heading on the site — the user flagged it directly against a reference
screenshot as visibly thinner/more open than the PDF. Measured the actual
gap: at weight 600 the rendered "Everything a voice agent needs" line came
in at **706px**, well short of the reference's measured **759px** ink width
— confirming (not just eyeballing) that Inter under-fills this specific
heading's line more than the H1 substitution already documented in §4 ever
accounted for. Rather than eyeball a fix, measured several weight/
letter-spacing combinations directly against the live DOM (`Range.
getBoundingClientRect()` on the first text node) until one landed within a
couple of px of 759: **`font-weight: 700` + `letter-spacing: 0.015em`**
(→ 757px). Note the tracking is *positive*, i.e. looser — counter-intuitive
for a "condensed" reference face, but the goal here is matching rendered
line width with the font actually available, the same substitution
principle §4 already uses for the H1, not reproducing the reference
typeface's real tracking. **This override is local to `CoreFeatures.module.css`
only** — the shared `--fs-h2`/`--ls-h2` tokens (and every other section that
uses them: Resources, CallSamples, Solutions, Why, etc.) were not touched.
If another already-approved H2 instance is ever flagged for the same
issue, measure that heading's own line-width gap the same way rather than
assuming this exact weight/tracking pair transfers unchanged — the target
width and starting gap will differ per heading/copy.

⚠️ **Panel labels/descriptions are invented, not from the PDF** — the static
export has zero copy on any of the 9 panels despite the lead line reading
"Nine capabilities…". Per explicit user decision, each panel got a label +
one-line description grounded in product facts already established
elsewhere on the site (RPC verification, auto re-dial, disposition codes,
SOC 2/ISO/FDCPA/Reg F/TCPA compliance) — see the `FEATURES` array at the top
of `CoreFeatures.tsx`. Treat this copy as **pending the user's review**, same
status as the FAQ rewrite on the landing page.

**Hover-expand mechanics (CSS-only, no JS/client component):**
```css
.strip:hover .panel,
.strip:focus-within .panel                                { flex-grow: 0.74; }
.strip:hover .panel:hover,
.strip:focus-within .panel:focus-within,
.strip:focus-within .panel:focus-visible                   { flex-grow: 3.1;  }
```
⚠️ **Gotcha hit and fixed**: the first version wrote the "expand the hovered
panel" rule as plain `.panel:hover { flex-grow: 3.1 }`, sitting *after* the
"shrink every sibling" rule in source order and assumed later-wins. It
didn't — `.strip:hover .panel` has **higher specificity** (three
classes/pseudo-classes vs two) than `.panel:hover`, and `.strip:hover` also
matches the panel actually being hovered, so the shrink rule silently won
regardless of source order and no panel ever visibly grew (confirmed via
Playwright: `getComputedStyle(el).flexGrow` stayed `0.74` under a real mouse
hover that did match `:hover`). Fixed by nesting the expand rule *inside*
the same `.strip:hover`/`.strip:focus-within` ancestor context so it's
unambiguously the more specific of the two. **If another component in this
project ever pairs a "dim every sibling on group-hover" rule with a
"highlight the one being hovered" rule, give the highlight rule the same
ancestor-hover prefix rather than relying on source order** — equal-looking
specificity with an overlapping selector is what broke it here.
- Only `flex-grow` transitions (520ms) — nothing else animates during the
  resize, so there's no compounding layout+paint cost. Scrim (320ms) and
  label (260ms, 120ms delay) are separate, shorter fades layered on top.
  Verified smooth via a Playwright filmstrip (7 frames, 90ms apart) — the
  panel visibly widens frame-over-frame and settles by ~180ms in.
- Keyboard-accessible: each `<li>` is `tabIndex={0}`; `:focus-within`/
  `:focus-visible` mirror the hover behavior exactly. Label/description are
  always in the DOM (revealed via `opacity`, never `display:none`), so
  screen readers get all nine regardless of hover state.
- **Responsive:** hover-expand only exists behind `@media (min-width: 901px)`
  — below that it's a static 3-column (then 2-column below 560px) grid with
  labels/scrim permanently visible (`opacity: 1` unconditionally), since
  hover means nothing on touch and nine 168px panels don't work at those
  widths. Verified at 1516/1280/900/430px: zero console errors, zero
  horizontal overflow at every width, and the 900px/430px grid layouts both
  read cleanly.
- Verified reduced-motion lands on one coherent static frame (Playwright
  `reducedMotion: "reduce"` emulation) via the same global
  `prefers-reduced-motion` rule in `globals.css` everything else relies on —
  no new reduced-motion handling was needed.

### Asset mapping (verified against the PDF)

Each panel photo was matched by cropping the rendered strip and correlating
against every file in `vodex assets/` (cover-crop diff across candidate
positions), then visually confirmed — not guessed from filenames.

| Slot | Source in `vodex assets/` | Copied to |
| --- | --- | --- |
| Hero backdrop | `pexels-halise-nur-ozcanli-1781364093-28743171 1.jpg` | `public/assets/product-hero-bg.jpg` |
| Panel 1 | `giorgio-trovato-_geAgtjqLzY-unsplash 1.jpg` | `public/assets/feature-1.jpg` |
| Panel 2 | `pexels-kristina-polianskaia-2617447-9292561 1.jpg` | `public/assets/feature-2.jpg` |
| Panel 3 | `luke-chesser-JKUTrJ4vK00-unsplash 1.jpg` | `public/assets/feature-3.jpg` |
| Panel 4 | `pexels-roberto-hund-5356720 3.jpg` | `public/assets/feature-4.jpg` |
| Panel 5 | `jumping-jax--TfwQjOWEp8-unsplash 2.jpg` | `public/assets/feature-5.jpg` |
| Panel 6 | `pexels-julio-lopez-75309646-29179702 1.jpg` | `public/assets/feature-6.jpg` |
| Panel 7 | `rayyan-df6PWKUJwcw-unsplash 1.jpg` | `public/assets/feature-7.jpg` |
| Panel 8 | `kartabya-aryal-FyiYPntskcA-unsplash 1.jpg` | `public/assets/feature-8.jpg` |
| Panel 9 | `pexels-zulfugarkarimov-33440144 1.jpg` | `public/assets/feature-9.jpg` |

⚠️ Panel 1 uses `giorgio-trovato-_geAgtjqLzY-unsplash 1.jpg` (the cream desk
telephone actually in the reference), **not** `pexels-aboodi-17396096 1.jpg`
(a silver wall payphone) which the user's original file list named for that
slot — confirmed by pixel correlation and resolved with the user directly
before building; `aboodi` goes unused.

### Section 3 — Why it works

`components/sections/WhyItWorks.tsx` + `.module.css`. Light section, header
block (`eyebrow`/`title`/`lead`) copied verbatim from `Resources.module.css`'s
pattern. Body is `Resources.tsx`'s card structurally reused almost 1:1
(photo top, light-gray `#f7f7f7` body, title, description, hairline divider,
dark "Read More" pill + `ArrowRight`) — changed to a 4-column grid (2-col at
≤1100px, 1-col at ≤560px) instead of 3, and the `category` line was dropped
(the reference cards don't have one). `border-radius: 0` throughout per
direct user instruction ("they all have sharp corners"). Grid `max-width:
1344px` — measured directly off the PDF crop (card row spans x≈86–1430 at
the 1516-canvas render), which lines up with the project's existing
"inset band" convention (`FeaturedCaseStudy`/`FinalCta` use 1327px) rather
than the full 1440 container or `Resources`' own 1180px cap.

Card image mapping — confirmed by opening each supplied asset and matching
its actual content against the PDF crop (not guessed), and it turned out the
user's given file order already matches the PDF's left-to-right order
exactly:

| Card | Source | Copied to |
| --- | --- | --- |
| Human-like conversations | `brooke-cagle-TS1H4Tllz54-unsplash 1.jpg` | `public/assets/why-works-1.jpg` |
| System integration | `image 1025.jpg` (abstract 3D render) | `public/assets/why-works-2.jpg` |
| Enterprise-grade standards | `docusign-7RWBSYA9Rro-unsplash 1.jpg` | `public/assets/why-works-3.jpg` |
| Built for scale | `image 1026.jpg` (flat illustration) | `public/assets/why-works-4.jpg` |

### Section 4 — Works with the tools you already run

`components/sections/WorksWithTools.tsx` + `.module.css`. Deliberately
minimal — **no eyebrow pill and no H2**, unlike every other section header
in the project. Measured the heading's glyph height against the PDF bbox
data and it matches the project's body/lead text size, not `--fs-h2`, so
it's rendered as a single centered `--fs-body`-sized line (weight 600) above
a plain centered flex row of the 5 logos.

⚠️ **The faint grid lines visible in the PDF at this section are not real
dividers.** They looked like they might delineate 5 logo cells (aligned
suspiciously close to the column edges), but sampling their pixel color
(225–237 across R/G/B) matched the `#EDEDED` Figma layout-grid overlay this
project's CLAUDE.md already documents as a landing-PDF artifact (§2) — not a
designed element. Confirmed and built with a plain, borderless row instead of
a bordered/cell-divided one. **If a future section in either PDF shows what
looks like a bordered grid, sample the line color before assuming it's a
real border** — this is the second time in the project a guide-overlay line
has been mistakable for a real design element (the first was the artboard's
own 40px-margin guides in §2).

Logo assets are transparent PNGs (confirmed via alpha channel) at their
native ~842×369 intrinsic size; `.logo` in CSS scales every logo to the same
rendered height (`height: 40px; width: auto`) so width varies naturally per
logo rather than being force-fit to a hardcoded width per brand.

| Logo | Source | Copied to |
| --- | --- | --- |
| HubSpot | `Frame 2147226760.png` | `public/assets/tool-hubspot.png` |
| HighLevel | `Frame 2147226761.png` | `public/assets/tool-highlevel.png` |
| Make | `Frame 2147226762.png` | `public/assets/tool-make.png` |
| Twilio | `Frame 2147226764.png` | `public/assets/tool-twilio.png` |
| VICIdial | `Frame 2147226763.png` | `public/assets/tool-vicidial.png` |

⚠️ Note the last two rows: the PDF's actual left-to-right visual order is
HubSpot, HighLevel, Make, **Twilio, VICIdial** — this swaps the filenames'
own numeric order (`...763` = VICIdial, `...764` = Twilio). The component's
`TOOLS` array follows the PDF's visual order, not the filename numbers.

### Section 5 — See it in action

`components/sections/SeeItInAction.tsx` + `.module.css`. Dark (`--ink`)
section; header block (`eyebrow`/`title`/`lead`) copied verbatim from
`Why.module.css`'s dark-section pattern (`#ececec` pill, white H2 with
`.accent` italic, `--on-dark-muted` lead) — same 1344px-max-width grid
convention as Section 3, now 3 columns (1-col at ≤820px).

Card is a hybrid of two existing patterns rather than a straight reuse of
either: the photo + title + arrow portion adapts `CoreFeatures.module.css`'s
`.panel`/`.scrim`/`.copy` overlay mechanism (image `fill`, bottom gradient
scrim, white text pinned to the bottom-left) — but always visible, not a
hover-reveal like `CoreFeatures`' strip — plus a **separate solid-black body
panel below the photo** for the description text. Confirmed via pixel
sampling that this lower panel is `rgb(0,0,0)`, distinct from the section's
own `#1a1a1a` background, not a CSS mistake. The diagonal arrow reuses the
existing `ExternalLinkIcon` from `components/ui/icons.tsx` (already exactly
this glyph) instead of the `ArrowRight` used everywhere else — the reference
uses a different, smaller diagonal arrow specifically for these three cards.

⚠️ **Round-2.5 fix — cards weren't bottom-aligning when descriptions wrapped
to different line counts.** The user flagged the three cards as visibly "not
at the same level" after reviewing round 2. Measured via Playwright
bounding boxes rather than guessing: `.grid`'s default `align-items:
stretch` correctly stretches every `<article class={styles.card}>` to match
the tallest card in the row (card 3's 3-line description vs. cards 1-2's
2-line descriptions — confirmed 452.77px outer height on all three), but
`.body` (the black description panel) had no `flex` rule, so it only took
its own natural content height (84.78px for cards 1-2 vs. 107.17px for card
3) — the leftover ~22px inside the taller, stretched `<article>` was empty
space showing the section's `#1a1a1a` background instead of black, which is
what read as "different levels" (the photo/title portion was always
correctly aligned; only the black panel's *bottom* edge was inconsistent).
**Fix:** `.body { flex: 1; }` — confirmed via the same Playwright
measurement that all three `.body` elements now report identical height
(107.17px). **If any other card grid in this project pairs a
fixed-aspect-ratio image with a variable-length text block below it, give
the text block's container `flex: 1` (or equivalent) up front** — relying
on the grid's stretch alone only equalizes the outer box, not how the inner
flex children divide that space. Re-verified after the fix with the same
Playwright bounding-box method on `overlayTitle`/`thumb`/`body` — all three
now report byte-identical `y` and `height` across cards — plus a matching
visual crop of the photo-bottom/title/panel-top boundary, confirming the
alignment is real and not just numerically coincidental.

⚠️ **Site favicon (`app/icon.svg`) was out of date with the real `Logo`
mark.** It already traced the waveform bars exactly (same 5 bar
coordinates as `Logo.tsx`'s `BARS` array — not a coincidence, confirmed by
comparing values), but was missing the 20-dot ring `Logo.tsx` draws around
it (`RING_DOTS`, a circle of dots at radius 146 from centre (158,153)).
Regenerated the same `RING_DOTS` formula (`cx = 158 + 146·cos(θ)`,
`cy = 153 - 146·sin(θ)`, `θ = 90° + i·18°` for `i` in 0-19) and added them
as a second `<g>` of `r=7.5` circles, so the favicon is now a faithful
crop of the actual navbar mark instead of a partial trace. Verified by
rendering the SVG standalone in headless Chromium before committing it —
matches `Logo`'s mark exactly. If `Logo.tsx`'s mark geometry (bar heights,
ring radius, dot count) ever changes, regenerate `icon.svg` the same way
rather than letting the two drift apart again.

⚠️ **Header `max-width` had to be widened from the `Why.module.css` value it
was copied from.** Built first at `720px` (copying `Why`'s header
max-width verbatim); the H2 "Conversations that carry real outcomes" then
wrapped to two lines, where the PDF has it on one. Measured the actual line
width via `pdftotext -bbox` (spans x≈314–1203px at the 1516-canvas scale,
≈888px) and widened `.header` to `920px` to match — fixed by measurement,
not by trial-and-error resizing. **If a header block copied from another
section ever wraps unexpectedly, measure the specific heading's line width
in the PDF bbox data rather than assuming the donor section's max-width
transfers unchanged** — headline length varies per section even when the
rest of the header pattern is identical.

Card image/copy mapping — same visual-match-against-PDF-crop method as
Section 3, and again the user's given order matched the PDF exactly:

| Card | Source | Copied to |
| --- | --- | --- |
| Upcoming payment reminders | `ali-mkumbwa-AEz70PS5eSU-unsplash 1.jpg` (card payment terminal) | `public/assets/action-1.jpg` |
| Payment plan negotiation | `mina-rad-qFSQFSmfZkA-unsplash 1.jpg` (handshake) | `public/assets/action-2.jpg` |
| Overdue payment reminders | `jakub-zerdzicki-P_f_UvZhj8Q-unsplash 1.jpg` (cash, pen, signed note) | `public/assets/action-3.jpg` |

`Read More`/detail hrefs for all three new sections (`WhyItWorks`,
`SeeItInAction`) point to `/products#<slug>` anchors — no destination pages
exist yet, same placeholder-link convention `Resources.tsx` already uses on
the landing page (plausible-looking hrefs, not live routes).

### Round 2 — user-reported fixes + Sections 6–9

The user flagged Sections 4 (Works with the tools) and 5 (See it in action)
as "not as per the PDF" after reviewing screenshots, and separately reported
two real bugs in the landing page's `Faq`/`FaqAccordion` that had to be fixed
before that component could be reused here. Re-verified everything against
`Vodex - Product_Page.pdf` directly (rendered crops + `pdftotext -bbox`
measurements) rather than re-guessing.

⚠️ **Section 4's logos were rendering ~3x too small — root cause found via
alpha-channel bounding-box analysis, not eyeballing.** The 5 source PNGs
(`Frame 2147226760-764.png`) are each an 842×369 canvas, but the *opaque
logo mark* only occupies a small, differently-sized region within that
canvas — a large transparent margin is baked into every file, and 3 of the
5 also carry a spurious 1-2px fully-opaque border-artifact line at the
canvas edges (a PNG export quirk) that pollutes naive bbox detection unless
excluded. The original build passed the full 842×369 canvas as `next/image`
intrinsic `width`/`height`, so CSS `height: 40px` scaled the *invisible
padding* right along with the visible mark — logos rendered at ~42-61px
wide instead of the reference's actual ~104-185px. **Fix:** cropped each
PNG in place to its true content bbox (alpha > 120, 2px edge artifact
excluded, +14px padding) via a one-off PIL script; `WorksWithTools.tsx` now
lists each logo's own real cropped `width`/`height` individually (they are
NOT uniform — HubSpot 454×148, HighLevel 538×142, Make 464×156, Twilio
418×142, VICIdial 646×165) instead of assuming a shared canvas size.
`.logo { height: 40px; width: auto }` was already correct and needed no
change once given accurate intrinsic dimensions. Also widened `.row`'s
`gap` from `56px 72px` to `56px 140px` — the reference's measured
edge-to-edge gap between logos is ~154px, which had been tuned against the
too-small logos and needed correcting once they were fixed. **If a future
transparent-PNG asset in this project renders oddly small/oddly
proportioned relative to its neighbors, check the alpha-channel content
bbox before assuming the CSS sizing is wrong** — this is the second time
in the project a source asset's own canvas padding has caused a sizing bug
(the first was the footer wordmark's blur, a related-but-different asset
quality issue).

Section 5 (See it in action) was re-measured (card widths/gaps/photo
aspect) against the same PDF crop and found to already match what was
built in round 1 — no code change was needed there; re-confirmed via a
fresh screenshot, still correct.

### Section 6 — What your team gets

`components/sections/WhatYourTeamGets.tsx` + `.module.css`. Dark (`--ink`)
section wrapping a single **rounded** banner (`border-radius: 24px`,
measured via corner-pixel zoom) — this is the one section on this page
that genuinely has rounded corners, unlike every sharp-corner section
built in round 1; don't "fix" it to match those. Background is
`public/assets/team-gets-bg.jpg` (from supplied `Frame 2147226819.jpg`, an
abstract orange/black streak photo) via `next/image fill`, with the same
"real photo, live text overlay" pattern as `EnterpriseBand`/
`FeaturedCaseStudy` — not a flat pre-composited asset like
`AutoRedialBanner`. Two-column content (measured banner span ≈1338px,
same inset-band family as Sections 3/5): left = plain white heading "What
your team gets" (no accent word) + lead; right = a 4-item bullet list. The
Vodex mark top-right reuses `components/ui/Logo.tsx` at `height={22}`,
colored via `color: var(--brand)` (the component fills with `currentColor`)
— matches the reference's orange (not white) logo treatment. Logo is
hidden below 560px (`.logo { display: none }`) rather than shrunk further,
since the banner itself drops to a much smaller `border-radius`/padding at
that width and the mark reads as clutter at that scale.

### Section 7 — FAQ, reused verbatim from the landing page (2 bugs fixed first)

`<Faq />` is imported unchanged from `components/sections/Faq.tsx` — no
props, no products-page-specific copy. The PDF confirms `EnterpriseBand`
and `FinalCta` (Sections 8-9) are byte-identical in copy across both pages
already, so reusing `Faq`'s existing Vodex-relevant copy here follows the
same established pattern rather than inventing a genericization the user
didn't ask for. Before it could be reused, two real bugs the user reported
on the *landing page* were fixed (both now fixed on both pages, since it's
the same component):

⚠️ **Bug A — side card didn't match the accordion column's height.**
`Faq.module.css`'s `.grid` had `align-items: start`, which stops a CSS
grid's default row-stretch behavior from making both columns match height
— the right column (side text + "Do you have more questions?" card) just
sized to its own content, so the card's bottom (and its "Talk to Sales"
button) landed well short of the accordion's actual bottom edge whenever
the accordion had more/taller items. Reference design has the card's
bottom edge land exactly at the last accordion item's bottom edge. Fixed
with three coordinated changes (all three are needed together — any one
alone doesn't fix it): `.grid { align-items: stretch }` (was `start`); the
right-hand `<Entrance delay={90}>` in `Faq.tsx` got a new class
`styles.sideCol` (`display: flex; flex-direction: column; height: 100%`)
so the grid's stretch actually reaches through the `Entrance` wrapper;
`.card` got `flex: 1; display: flex; flex-direction: column` to consume
the now-available height; `.cardButton`'s `margin-top` changed from a
fixed `20px` to `auto` so it's pinned to the card's bottom edge — same
bottom-pinning technique as `Resources.module.css`'s `.divider` and this
session's `WhyItWorks.module.css`. At the 820px breakpoint `.grid` drops to
a single column, where each item becomes its own grid row and
`align-items: stretch` has no cross-column effect — confirmed the card
still sizes to its own natural content there rather than stretching
oddly.

⚠️ **Bug B — first accordion item was open by default.**
`FaqAccordion.tsx` had `useState(0)`, defaulting the first item open on
every load. Changed to `useState(-1)` (nothing open). No other change was
needed: the existing click handler already used `-1` as the
"nothing-open" sentinel when collapsing the currently-open item
(`onClick={() => setOpenIndex(open ? -1 : i)}`), and the CSS collapse
mechanism (`grid-template-rows: 0fr` → `.itemOpen` sets `1fr`) is applied
per-item via the `.itemOpen` modifier class with no global
single-active-item assumption, so "nothing matches `openIndex`" cleanly
renders all items collapsed with no side effects. Verified via Playwright
(`[aria-expanded="true"]` count = 0 on load, both `/` and `/products`, at
1516 and 430px).

### Sections 8-9 — Enterprise Band + Final CTA, reused verbatim

Cropped and confirmed the product PDF's "Built for enterprises" and "Ready
to supercharge your engagement?" sections are byte-identical in copy and
design to the landing page's `EnterpriseBand`/`FinalCta` (same headline,
body copy, badge text, icon cluster). Both imported unchanged into
`app/products/page.tsx`, same pattern as the shared `Footer`.

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (Sections 1–9 combined, all
of `/products` now built end to end). Playwright-verified at
1516/1280/900/430px — zero console errors, zero horizontal overflow at
every width — plus visual comparison of every new/fixed section's live
screenshot against its own cropped PDF reference render. The landing page
(`/`) was also re-verified after the shared `Faq` fix (same zero-error,
zero-overflow, zero-default-open checks) since that component is now used
on both pages.

**Approved:** Nothing on the Product Page yet — user said "just build clean
… I will verify myself," the same pending-review status the landing page
uses for its own not-yet-reviewed work. Do not treat any Product Page
section as approved until the user says so about this implementation
specifically. The landing page's `Faq` bugfixes (height-stretch,
default-open) are corrections to previously-shipped, already-approved
behavior, not new pending-review content — but confirm with the user if in
doubt before treating the landing page's FAQ section as still "approved"
post-fix.

**Next:** Wait for the user's review of the full Product Page (Sections
1–9) and of the FAQ fixes on both pages. Remaining known gaps: the landing
page's Call Samples section still has placeholder (mismatched) audio, per
§7 of this file — unrelated to this round's work but still open — and this
page's FAQ reuses the landing page's Q&A verbatim; revisit if the user
wants products-specific questions instead. Note:
the PDF's FAQ section for this page has stale/mismatched placeholder copy
(leftover "Recruiting/Staffing pricing", "Talently" text from an unrelated
product) — flag this to the user rather than building from it literally when
that section comes up, the same issue the landing page's FAQ had.

---

## 12. Solutions Page (first of a family)

> Reference: `D:\litlabs\Vodex\Vodex - Solutions_Page (0.1).pdf` — 4548 ×
> 29897pt = a 3× export of a **1516 × 9966px** artboard, same convention as
> the landing/product PDFs. This PDF is the **"Payment Reminders"** solution
> — `Footer.tsx`'s `COLUMNS` "Solutions" entry already declared 5 solutions
> routes before this round (`/solutions/payment-reminders`,
> `/solutions/promise-to-pay`, `/solutions/lead-qualification`,
> `/solutions/debt-collection`, `/solutions/collection-software`), all
> previously 404s — this is the first of them actually built. Route:
> **`/solutions/payment-reminders`**.

### Current progress

**The full PDF is now built end to end** — Hero, Industries that Benefit,
Workflows, Comparison, Results ("What you can expect"), Security &
Compliance, plus `Faq`/`EnterpriseBand`/`FinalCta` reused verbatim (confirmed
byte-identical copy in this PDF too, same "Sections 8-9" precedent already
used on `/products` — see §11) and the shared `Footer`. This was built in two
rounds: round 1 (Hero + Industries) shipped with the Navbar mega-menu; round
2 (this one) added Workflows/Comparison/Results/Security using a second batch
of user-supplied assets, plus one cross-cutting instruction — **every new
card/panel this round has sharp corners** (`border-radius: 0`), no
exceptions except the small rounded "VS" badge in Comparison, which is
treated as an inline pill (same idiom as every eyebrow pill on this page),
not a card. Round-2 sections were planned with the same PDF-crop
pixel-measurement method as round 1 (pixel-scanning a 24dpi render + zoomed
crops), not eyeballed. `page.tsx` now renders every section in PDF order
with nothing left to append.

### Implementation decisions (persist these)

- **`SolutionHero` is a new, reusable, prop-driven component**
  (`components/sections/SolutionHero.tsx` + `.module.css`), *not* a
  hardcoded one-off like `ProductHero.tsx`. Deliberate: `Footer.tsx` already
  declares 5 solutions routes that all need this exact structure (badge →
  H1 with one orange-italic accent → lead → primary+secondary CTA pair →
  full-bleed photo backdrop) with entirely different copy/art per page — a
  textbook case for a shared component, unlike `ProductHero` which was a
  reasonable one-off *at the time* with no confirmed second product page.
  CSS/geometry copied from `components/hero/Hero.module.css` (not
  `ProductHero.module.css` — this page's H1 uses `line-height: var(--lh-display)`
  like the landing hero, not the product hero's overridden `line-height: 1`).
  Measured section height off this PDF (~634px at the 1516 artboard) landed
  within a few px of the landing hero's own 632px, so the same
  `padding-block: 64px 132px` numbers transferred directly.
- **`titleLines` is a `ReactNode` prop, not a plain string + accent-word
  pair** — the three heroes built so far each put the `.accent` span in a
  different position (landing: mid-line-2 "outreach into `revenue`";
  product: mid-line-1 "`phone calls`"; this page: the *entire* second line
  "`Reminders`"), so a rigid template would already have broken on the
  third instance. The page composing `SolutionHero` just writes normal JSX.
- **Mobile line-break handling doesn't leak a scoped CSS class name across
  the module boundary.** `Hero.tsx`/`ProductHero.tsx` hide their forced
  desktop `<br>` on mobile via `<br className={styles.titleBreak}>`, but
  `styles` there is the *page's own* hardcoded module — `SolutionHero` is
  generic, and the page composing `titleLines` has no access to
  `SolutionHero.module.css`'s scoped classes. Fixed with a plain HTML
  attribute instead: callers write `<br data-hide-mobile />`, and
  `SolutionHero.module.css` targets it as `.title br[data-hide-mobile] {
  display: none }` under the `max-width: 720px` media query — the
  responsive rule stays local to the component with nothing to import.
- **CTA priority inverts this hero's own site-wide convention, confirmed
  deliberate with the user.** Landing/product heroes both make "Schedule a
  Demo" the primary/filled button; this PDF has "Get Started" filled/primary
  and "Schedule a Demo" outlined/secondary. Built exactly as the PDF shows,
  per explicit user confirmation — not normalized to match the other two.
- **`SolutionIndustries` (`components/sections/SolutionIndustries.tsx` +
  `.module.css`) is a locally-copied/adapted card pattern, not a shared
  component** — direct continuation of the `Resources.tsx` → `WhyItWorks.tsx`
  precedent already in this file (§8, Section 3 entry): copy the card
  structure, adapt what differs, don't extract a generic `<Card>`. Real
  measured deltas from both donors: **full 1440px container** (cards span
  the artboard's actual page margins, x=38→1478 at 1516px — not a narrower
  cap like Resources' 1180px or WhyItWorks' 1344px; the measured
  454px-card/40px-gap math lands exactly on `(1440-80)/3=453.3≈454`, so
  `grid-template-columns: repeat(3, 1fr); gap: 40px` inside a plain
  `.container` is correct, no extra max-width needed or wanted here), and a
  **different card-body gray** — pixel-sampled directly off the rendered
  PDF at `(244,244,244)` / `#f4f4f4`, distinct from Resources' `#f7f7f7`.
  Confirmed sharp `border-radius: 0` corners, same site-wide finding as
  Why/FeaturedCaseStudy/Resources.
  - **⚠️ One assumption in the original task brief was wrong and was caught
    by re-measuring before building, not carried through**: the brief
    described this card's icon as sitting in "a bordered rounded-square
    box," reasoning by analogy to a mega-menu reference screenshot. A 4×
    PDF crop of the actual card (`Banks & Financial Institutions`) showed
    the icon is **plain and unboxed** — same convention as the trust-strip/
    DROS feature icons already in this codebase, no border anywhere. Built
    unboxed to match the real measurement, not the analogy. The bordered-box
    treatment *was* used for the mega-menu's own icons (see below) — that
    one genuinely is a new pattern, confirmed appropriate there because the
    mega-menu explicitly reuses a different product's screenshot as a
    **layout/style** benchmark (user's own words), whereas the Industries
    card had a real PDF source to measure directly. When a task brief
    describes a visual detail by analogy instead of by measurement, measure
    the actual source before building — this is the same lesson as the
    Why-section corner-radius correction earlier in this file, recurring in
    a new form (an assumption imported from a *different* section's
    reference, not just eyeballed from a thumbnail).
- **3 new icons added to `components/ui/icons.tsx`** (`/* Solutions page
  icons */` block) for the Industries cards, following the existing
  `strokeIcon` convention (`strokeWidth: 3`, round caps/joins) rather than
  attempting to replicate the PDF's own icon glyphs pixel-for-pixel (which,
  per the zoomed crop, are most likely a system icon font/emoji baked into
  the design file, not custom artwork — same treatment this project already
  gives every other PDF icon, e.g. the trust strip): `BankIcon` (pediment +
  columns + base), `PhoneCallIcon` (ringing handset with motion arcs —
  deliberately distinct from the existing `PhoneLinesIcon`, which is a
  phone+call-log-lines composite for a different context), `ShieldPlusIcon`
  (reuses `ShieldCheckIcon`'s exact shield silhouette with a medical plus
  swapped in for the checkmark, for visual family consistency).
- **Closing line under the Industries grid** ("Running a collections
  operation? See Vodex for Debt Collection") reuses the real
  `/solutions/debt-collection` route `Footer.tsx` already declares — not a
  new invented placeholder. Each card's own "Read More" link points at
  `/solutions` (the parent hub) rather than an invented per-industry slug,
  per the user's explicit direction elsewhere in this round not to invent
  new solution/industry routes beyond what's already established.

### Navbar "Solutions" mega-menu

- **New pattern, zero prior precedent in this codebase** (confirmed via a
  full-repo grep for `dropdown`/`megamenu` before starting — nothing).
  `components/layout/SolutionsMegaMenu.tsx` (client component) +
  `.module.css`, wired into `Navbar.tsx` by special-casing the "Solutions"
  entry inside the existing `NAV_LINKS.map()` loop — every other nav link
  is untouched, still a plain `<Link>`.
- **Content scope was deliberately narrowed from the original reference.**
  The user supplied a screenshot of a *different product's* mega-menu (3
  columns: Main Solutions / By Industry / Capabilities, each with invented
  generic content like "Law firms"/"Answering service") explicitly as a
  **layout/style benchmark only** — "do not copy any of it… that ref was
  for just benchmark." After clarifying directly, the shipped menu is a
  single "Main Solutions" list only — no "By Industry"/"Capabilities"
  columns at all, not just left empty. Content is **exactly** `Footer.tsx`'s
  existing 5 Solutions items (label + href verbatim, confirmed by the user
  as the source of truth) — Payment Reminders, Promise-to-Pay Capture, Lead
  Qualification, Debt Collection, Collection Software — icon + title only,
  no invented one-line descriptions (also confirmed with the user: kept
  minimal on purpose). **If a later round adds "By Industry"/"Capabilities"
  columns back, or per-item descriptions, treat that as new scope requiring
  its own confirmation — it was explicitly cut this round, not deferred by
  default.**
  - Icon mapping: Payment Reminders → `BellIcon` (new), Promise-to-Pay
    Capture → `CheckIcon` (existing), Lead Qualification → `FunnelIcon`
    (new), Debt Collection → `PhoneCallIcon` (new, shared with the
    Industries cards above), Collection Software → `WorkflowIcon`
    (existing). 2 new icons for the mega-menu specifically, on top of the 3
    from the Industries cards — 5 total new icons this round.
  - All 5 links are real, already-declared `Footer.tsx` routes and are
    genuinely clickable `<Link>`s (not disabled/plain text) per the user's
    explicit "make sure they are clickable links, we can link the pages
    later" — only `/solutions/payment-reminders` resolves after this round,
    the other 4 still 404 (same as they already did via Footer's own links
    before this round; not a regression).
  - **Icon boxes here ARE bordered** (`.iconBox`: 38px, `1px solid
    var(--hairline-strong)`, `border-radius: 9px`) — unlike the Industries
    cards' plain unboxed icons (see above), this genuinely is a new pattern
    with no existing precedent, confirmed appropriate specifically because
    the mega-menu's *layout/style* (not content) is modeled on the user's
    reference screenshot, which does use a bordered icon treatment.
- **Anchor / containing-block constraint.** `<header>` renders with
  `display: contents` (`globals.css`) specifically so `Navbar`'s
  `position: sticky` has a containing block to travel within (§8's own
  `.siteHeader` entry) — the mega-menu panel must never introduce a box
  around `<header>` or otherwise touch that chain. Fixed by making the
  "Solutions" `<li>` itself (`.solutionsItem`) the `position: relative`
  anchor; the panel is `position: absolute` relative to that `<li>` only.
  Verified post-build with a real scroll test (`nav.getBoundingClientRect().y
  === 0` after `scrollTo(0, 1200)`) that the sticky pin still works exactly
  as before.
  - **z-index**: confirmed via a project-wide grep that `.nav`'s own
    `z-index: 30` (`Navbar.module.css`) is the only z-index anywhere in the
    4–30 range — everything else in the codebase is `-1`/`0`/`1`, each
    scoped inside its own section's local stacking context. Because `.nav`
    combines `position: sticky` with an explicit z-index, it already
    establishes its own stacking context, so the panel only needs
    `z-index: 1` to clear its `.nav` siblings — it automatically inherits
    `.nav`'s elevation above the rest of the page. No larger number needed.
- **Open/close is CSS-first (`:hover`/`:focus-within`), not React state** —
  matches this project's demonstrated bias toward zero-JS CSS wherever CSS
  alone suffices (`Entrance`, `Button` hover states, `CoreFeatures`
  hover-expand strip), reserving JS for what CSS genuinely can't do
  (`IndustryTabs`' measured sliding indicator, `FaqAccordion`'s
  single-open-only exclusivity). Minimal JS actually used: an `Escape`
  keydown listener that blurs the active element when focus is inside the
  trigger/panel (dropping `:focus-within` closes it), and a `usePathname()`
  effect that blurs on route change (Navbar/Footer persist across
  client-side navigations, so without this a `Link` click inside the panel
  could leave it visually open after the page swaps underneath it). No
  outside-click handler — deliberately omitted, redundant with what
  `:hover`/`:focus-within` already correctly handle.
  - **Dead-gap-breaks-hover, designed around up front, not hit and fixed
    after the fact**: the visual gap between the nav link and the visible
    white panel is implemented as `padding-top` on the *hoverable* `.panel`
    element itself (not a margin/offset that would leave empty space
    outside any hoverable box), so the mouse never crosses a strip that
    belongs to neither element while travelling from the link down into the
    card. Verified with a real Playwright mouse-drag interaction (small
    incremental `mouse.move` steps straight down through the gap, not
    toggling `:hover` via devtools) — panel opacity reaches `1` and stays
    there through the drag.
  - `prefers-reduced-motion` needed no component-level handling — the
    existing global wildcard rule in `globals.css` (`transition-duration:
    0.001ms !important` under the media query) already collapses the
    panel's opacity/transform transition the same way it does for every
    other animated component in this project; confirmed via Playwright
    `reducedMotion: "reduce"` emulation (panel opacity reaches `1` within
    ~100ms of hover instead of the normal 220ms).
  - Keyboard-verified end to end: `Tab` reaches the "Solutions" link and
    opens the panel (`:focus-within`), a further `Tab` moves focus onto the
    first item inside the panel without closing it, `Escape` closes it from
    either position.

### Round 2 — Sections 3–6 (Workflows, Comparison, Results, Security & Compliance)

Built from a second batch of user-supplied assets, plus one instruction that
applies across all four new sections: **every new card/panel has sharp
corners** (`border-radius: 0`) — the only exception is the small rounded "VS"
badge in Comparison, kept as an inline pill (see below). All geometry below
is measured, not eyeballed — pixel-scanned from a 24dpi render of the PDF
(1516px = 1:1 with the artboard) plus zoomed crops at 96–192dpi for fine
detail, same method as round 1.

- **`components/sections/SolutionWorkflows.tsx` + `.module.css`** — dark
  section (`background: var(--ink)`), header pattern copied from the landing
  page's `Solutions.module.css` (eyebrow "Workflows", H2 "Actions you can
  `streamline`", lead). 6-card grid, **3 columns × 2 rows** (verified from
  the PDF crop — not 2×3), inside a `max-width: 1327px` inset band (not the
  full 1440 container `SolutionIndustries` uses — measured narrower here,
  matching the `FeaturedCaseStudy`/`FinalCta` inset-band family already in
  this file). Cards: `aspect-ratio: 436/492` (~0.886:1, portrait, measured),
  `border-radius: 0`, full-bleed photo with an **always-on** bottom gradient
  scrim (title + `ExternalLinkIcon` + description overlaid directly on the
  photo — confirmed by pixel-sampling that the dark area under the text
  varies rather than being flat black, i.e. it's the photo continuing under
  a gradient, not a separate solid panel like `SeeItInAction` has). The
  scrim/copy CSS is an always-visible adaptation of `CoreFeatures.module.css`'s
  hover-triggered `.scrim`/`.copy` (opacity hardcoded to visible, the
  `flex-grow` hover-expand machinery removed — these are static grid cells,
  not a hover-expand strip).
- **`components/sections/SolutionComparison.tsx` + `.module.css`** — light
  section, same header pattern as `SolutionIndustries` (eyebrow
  "Comparison", H2 "Traditional process vs `Vodex AI`"). **Lead text is
  byte-identical to `SolutionIndustries`'s own lead** ("Wherever a due date
  matters, an AI voice agent can make the reminder call for you.") —
  confirmed this is genuinely what the PDF shows in both places, not a
  copy-paste artifact; built verbatim in both, not deduplicated or reworded.
  Two-panel layout (`1fr 138px 1fr` grid) inside the same 1327px inset band:
  left "Traditional process" panel is `background: var(--ink)` with 5 items
  each using a **new `XIcon`** (`components/ui/icons.tsx`, added after
  `CheckIcon`, same `strokeIcon` convention — no X/cross icon existed in
  this file before); right "Vodex AI" panel's background is a **real photo**
  (`public/assets/comparison-vodex-bg.jpg`, copied from `magicpattern-
  iAR6yhCkrxc-unsplash 1.jpg`), not a CSS gradient — confirmed by
  pixel-sampling a gradient from bright orange `rgb(253,105,66)` to dark
  maroon `rgb(102,12,12)` that pixel-matches that supplied texture file
  exactly, with 5 items using the existing `CheckIcon`. The **"VS" mark in
  the PDF is a stylized brush/distressed-texture graphic** with no matching
  supplied asset and no realistic way to reproduce in Inter/CSS — built as a
  plain small rounded dark badge with bold "VS" text instead (a clean
  equivalent in the site's own visual language, not a pixel-fidelity
  attempt, same treatment this project already gives other PDF-only
  decorative glyphs with no source asset). This badge is the one deliberate
  exception to the "sharp corners" instruction — treated as an inline pill
  (`border-radius: var(--radius-pill)`), the same idiom as every eyebrow
  pill already on this page, not a card/panel. The closing line ("Running a
  collections operation? See Vodex for Debt Collection") is **duplicated
  locally** here rather than imported from `SolutionIndustries.tsx` — same
  copy-adapt-don't-extract precedent as the scrim-card pattern above, for an
  even smaller unit (~10 lines, one link).
- **`components/sections/SolutionResults.tsx` + `.module.css`** — full-bleed
  photo-background section (`isolation: isolate` + `next/image fill`,
  pattern copied from `EnterpriseBand.tsx`/`.module.css`). Background:
  `public/assets/results-bg.jpg` (copied from `Frame 2147226791.jpg`,
  confirmed pixel-identical to this section's photo). Eyebrow is
  **"Comparison" again — reused a third time in this PDF** (Industries'
  "Core features," this section's and Comparison's shared "Comparison," and
  Security's "Resources" below are now 3 separate instances of the PDF
  reusing a mismatched/generic eyebrow label across sections it doesn't
  really describe) — built verbatim per this project's established
  "measure, don't invent" rule, flagged rather than silently relabeled, same
  as the Industries "Core features" precedent. 3 stat cards sit in the
  **full 1440px container** (measured wider than the other three round-2
  sections' 1327px inset band — x=42→1494 at the 1516 artboard), `#fff`
  cards, `border-radius: 0`, big number styled `font-family: var(--font-serif);
  font-style: italic; color: var(--brand)` — reusing the exact styling
  convention `FeaturedCaseStudy.module.css`'s `.statNumber` already
  established for "big stat number" elsewhere on the site, just at a larger
  size to match this section's measured proportions. This "stat card"
  pattern (number + label + description, 3-across) did not exist anywhere
  else in the codebase before this — confirmed by a full-codebase search —
  built as a new local pattern in this file's own module only.
- **`components/sections/SolutionSecurity.tsx` + `.module.css`** — light
  section, eyebrow **"Resources"** (third mismatched-label reuse in this
  PDF, same treatment: verbatim, flagged, not relabeled). 4-card row in the
  1327px inset band, `grid-template-columns: repeat(4, 1fr); gap: 12px`
  (tight gap, matches Workflows' own measured ~14px gap convention). Cards
  reuse the Workflows scrim pattern (copy-adapted, not shared/imported) but
  **caption-only, no icon** — confirmed no diagonal arrow on these cards in
  the PDF crop, unlike Workflows. `aspect-ratio: 324/294` (measured — cards
  are close to square, slightly wider than tall). Two of the four source
  photos are **intentional reuses of files already used elsewhere** in this
  codebase (`luke-chesser-JKUTrJ4vK00-unsplash 1.jpg`, already `feature-3.jpg`
  on the Product Page's Core Features strip; `Frame 2147227673.jpg`, already
  the footer's cert-badge grid source) — confirmed by direct visual
  comparison that the PDF genuinely reuses the same source photos in
  multiple places, not a filename collision to resolve. Copied as fresh
  files under new `security-*.jpg` names rather than referencing the
  existing copies, so each section's assets stay independently swappable.
- **`Faq`, `EnterpriseBand`, `FinalCta` reused verbatim**, same as the
  `/products` "Sections 8-9" precedent (§11) — confirmed byte-identical copy
  in this PDF too (badge/heading/lead text for all three matched exactly via
  `pdftotext -layout`, cross-checked against each component's own JSX). No
  new code; just appended to `page.tsx` in PDF order after
  `SolutionSecurity`.
- A **debugging note worth keeping**: the first full-page Playwright
  screenshot taken during verification showed every new photo card as solid
  black (Workflows, Comparison's right panel, Results' background, Security's
  4 cards) — not a code bug. `next/image`'s native `loading="lazy"` means a
  plain `fullPage: true` Playwright screenshot doesn't reliably force every
  image to decode before the composite is taken, even though `fullPage`
  auto-scrolls the page (confirmed via a per-element screenshot of one
  "black" card, which rendered the photo correctly in isolation, and via
  `page.$$eval` showing zero broken/failed image requests). Fixed by
  explicitly scrolling the page in steps first, then `waitForFunction`
  asserting every **visible** `<img>` has `complete && naturalWidth > 0`
  (`img.offsetParent === null` used to skip intentionally-hidden images,
  e.g. Final CTA's icon cluster which is `display:none` below 900px and
  therefore never loads) before taking the real screenshot. This is a
  stricter version of the "scroll before screenshotting lazy images" gotcha
  CLAUDE.md already documents for Section 9/Call Samples — **if a future
  full-page (not just per-element) screenshot ever shows unexpectedly blank
  images, this scroll-and-wait-for-complete pattern is the fix, not a
  suspicion that the images themselves are broken.**

### Asset → component map

| Asset (`vodex assets/`) | Destination | Notes |
| --- | --- | --- |
| `pexels-onbab-15750755 1.jpg` | `public/assets/solution-payment-reminders-hero-bg.jpg` → Hero | confirmed pixel-identical to the PDF's hero background by direct visual comparison |
| `pexels-szymon-shields-1503561-10178729 1.jpg` | `public/assets/industries-banks.jpg` → Industries, "Banks & Financial Institutions" | there is also a sibling `… 2.jpg` in `vodex assets/`; `1.jpg` is the confirmed match, `2.jpg` unused |
| `Frame 2147226785.png` | `public/assets/industries-collection-agencies.jpg` → Industries, "Collection Agencies" | format-converted (flattened RGBA → JPEG), not a plain copy — source PNG is fully opaque |
| `pexels-roman-muntean-369190311-14513059 1.jpg` | `public/assets/industries-healthcare.jpg` → Industries, "Healthcare" | confirmed pixel-identical to the PDF's surgical/healthcare photo |
| `rasheed-kemy-oqY09oVTa3k-unsplash 1.jpg` | `public/assets/workflow-1.jpg` → Workflows, "Upcoming Due Date Reminders" | subway commuter photo, confirmed pixel-identical |
| `pexels-karola-g-4968385 1.jpg` | `public/assets/workflow-2.jpg` → Workflows, "Same-Day Payment Reminders" | cash/wallet exchange photo |
| `polina-lavor-G71Q0Wz8rcc-unsplash 1.jpg` | `public/assets/workflow-3.jpg` → Workflows, "Grace-Period Follow-Ups" | subway photo, curly hair/sunglasses |
| `julio-lopez-vhXte7wBkMc-unsplash 1.jpg` | `public/assets/workflow-4.jpg` → Workflows, "Overdue Payment Reminders" | night street photo |
| `image 1029.jpg` | `public/assets/workflow-5.jpg` → Workflows, "Final & Last-Chance Notifications" | vintage brick phone, purple bg |
| `mina-rad-qFSQFSmfZkA-unsplash 2.jpg` | `public/assets/workflow-6.jpg` → Workflows, "Promise-to-Pay Confirmations" | handshake photo — note the sibling `…1.jpg` is already used elsewhere (Product Page's "Payment plan negotiation" card); this is a *different* crop from the same photographer, confirmed by direct comparison, not a duplicate reference |
| `magicpattern-iAR6yhCkrxc-unsplash 1.jpg` | `public/assets/comparison-vodex-bg.jpg` → Comparison, "Vodex AI" panel background | grain/gradient texture, confirmed pixel-match by sampled gradient colors, not a CSS gradient |
| `Frame 2147226791.jpg` | `public/assets/results-bg.jpg` → Results section background | glowing lamp/table photo |
| `dlxmedia-hu-ljnwOfYboGc-unsplash 1.jpg` | `public/assets/security-1.jpg` → Security, "Encrypted call recordings" | Zoom H1 audio recorder photo |
| `pexels-edwin-mandries-2152983550-36627633 3.jpg` | `public/assets/security-2.jpg` → Security, "Consent checks" | man on phone outdoors |
| `luke-chesser-JKUTrJ4vK00-unsplash 1.jpg` | `public/assets/security-3.jpg` → Security, "Full audit trails" | analytics dashboard photo — same source already used as Product Page's `feature-3.jpg`, intentional reuse (see decisions above) |
| `Frame 2147227673.jpg` | `public/assets/security-4.jpg` → Security, "ISO 27001, SOC 2, and HIPAA compliant" | cert-badge grid — same source already cropped into the footer's 8 individual badges, intentional reuse |

All matches (round 1 and round 2) were confirmed by direct visual comparison
against the rendered PDF crop before use, same standard as every other asset
mapping in this file — none guessed from filenames alone.

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` across both rounds. Round 2
Playwright-verified at 1516/1280/900/430px — zero console errors, zero
horizontal overflow at every width (using the scroll-and-wait-for-complete
screenshot method described above, needed specifically because this round
added several new full-bleed photo cards). Every new card/panel corner
confirmed `border-radius: 0` except the flagged VS badge. Landing page (`/`)
and `/products` re-verified unaffected (zero new console errors/overflow)
since `icons.tsx` (new `XIcon`) is shared. Live screenshots visually compared
against the PDF's own rendered crops for all 6 sections — bounding boxes,
grid arity, and card proportions all match closely. Mega-menu (round 1)
remains verified as previously documented — untouched this round.

**Approved:** Nothing yet on this page — not yet reviewed by the user, same
pending-review status every other section in this file uses before explicit
sign-off. Round 1 (Hero, Industries, mega-menu) and round 2 (Workflows,
Comparison, Results, Security, the Faq/EnterpriseBand/FinalCta reuse) are
both awaiting the user's first look.

**Next:** Wait for the user's review of the full page top to bottom. Open
items still flagged, not yet resolved:
1. Three separate mismatched/reused eyebrow labels across this PDF —
   Industries' "Core features," Comparison's and Results' shared
   "Comparison," and Security's "Resources" — all built verbatim per this
   project's "measure, don't invent" rule rather than silently relabeled to
   something more section-appropriate.
2. `/solutions` (the parent hub page that both the plain Navbar link and the
   mega-menu's "View all solutions" button point at) still does not exist —
   pre-existing gap, not introduced by either round.
3. Comparison's "VS" badge is a clean CSS reconstruction, not a match to the
   PDF's distressed-brush-texture graphic (no source asset existed for it) —
   flagged as a deliberate simplification, not an oversight.
4. `SolutionComparison`'s lead text is byte-identical to `SolutionIndustries`'s
   — confirmed as genuinely what the PDF shows in both places, not
   deduplicated since CLAUDE.md's own precedent is to build verbatim PDF
   copy even when it repeats oddly.

This PDF is now fully built — no more sections remain to append. Any further
work on this page would be user-driven revisions, not continuing top-to-bottom
construction.

---

## 16. Resources — Blog (`/resources/blog`)

> No PDF reference for this page — `Footer.tsx` pre-declared `Blog →
> /resources/blog` (and `Navbar.tsx` links to `/resources`) before either
> existed, same situation every Solutions page was in before being built.
> The user supplied `D:\litlabs\Chapeau-website` (its `/insights` listing
> page + `/insights/[slug]` post page) as a **structural/interaction
> benchmark only** — layout, filter/search logic, and the sidebar
> table-of-contents scroll-spy mechanism — with explicit instruction to
> re-express everything through this project's own design tokens (CSS
> Modules, `--brand` orange not the benchmark's pink, this project's
> sharp-corner-by-default convention) rather than port its Tailwind classes,
> and to keep the result "consistent with the whole website."

### Current progress

Built both the listing page (`/resources/blog`) and a working dynamic post
route (`/resources/blog/[slug]`) with the sidebar TOC + scroll-spy, per the
user's explicit scope choice (not listing-only). Content is a small, grounded
mock set — 1 featured + 5 grid posts (6 total) — across the **same 3
categories the landing page's `Resources.tsx` already established** ("Debt
Collection", "AI & Technology", "Voice Technology"), for sitewide taxonomy
consistency per the user's direct instruction. Only the featured post
("Introducing DROS…") has a fully fleshed-out, multi-heading body; the other
5 slugs resolve (no dead links) but with shorter stub bodies — flagged as
pending real content, same treatment this project already gives Section 9's
placeholder audio.

### Implementation decisions

- **`lib/blog-posts.ts`** is the single source of truth for all blog content
  — a plain typed array (`BLOG_POSTS`), not an async repository layer (this
  project has no CMS/data-fetching abstraction anywhere else, so one wasn't
  invented here either). Both the listing page and the `[slug]` route import
  from it, so a post's data is never duplicated. `PostBlock` is a small union
  (`heading | paragraph | list | quote`); `tocFromBlocks()` derives the
  sidebar's table of contents straight from a post's own `heading` blocks —
  same principle as the Chapeau benchmark: the TOC and the in-body anchors
  can never drift apart because they're the same data, read twice.
- **Hero reuses `SolutionHero` verbatim**, no new hero component — it was
  already generic/prop-driven (see §12), and the copy/CTA shape the user's
  attached mockup shows (badge "Blog", H1 with one accent phrase, lead, a
  "Talk To Our Expert"/"Schedule a Demo" CTA pair) is exactly this
  component's existing shape. Background: `public/assets/blog-hero-bg.jpg`,
  a copy of the user-specified
  `vodex assets/pexels-szymon-shields-1503561-10178729 2.jpg` — the same
  source photo already used as `solution-promise-to-pay-hero-bg.jpg`
  elsewhere, an intentional reuse consistent with this project's established
  precedent of reusing source photos across pages.
- **New shared card component: `components/ui/BlogPostCard.tsx`** — used by
  both the listing grid and `RelatedPosts` on the post page, so a post's
  card only has one implementation. Copy-adapted from `Resources.tsx`'s card
  idiom (light `#f7f7f7` body, sharp `border-radius: 0`, category label,
  divider, dark pill "Read More"), per this project's established
  "copy-adapt, don't force a shared generic component" rule — not a retrofit
  of `Resources.tsx` itself, which stays landing-page-hardcoded content.
  **One deliberate deviation from the `Resources.tsx` card it's copied
  from**: the whole card is clickable, not just "Read More" — implemented as
  a **stretched-link** (`.titleLink::after { position:absolute; inset:0 }`
  over a `position:relative` card, with "Read More" reduced to
  `aria-hidden="true"` decoration) rather than nesting a second `<Link>`
  inside the card, which would be invalid HTML (nested anchors) and would
  double-announce the link for screen readers. This is the standard
  accessible pattern for "the whole card is clickable but there's only one
  real link" — reuse it if another card grid in this project ever wants the
  same behavior. `BlogFeaturedPost.tsx`'s 2-column featured card uses the
  identical technique on its own title.
- **`components/sections/BlogExplorer.tsx`** (`"use client"`) is a direct
  port of the Chapeau benchmark's `InsightsExplorer` filtering logic —
  `useState`/`useMemo`, AND-combined category + substring text match (title/
  excerpt/category, case-insensitive), an `aria-live="polite"` result-count
  announcement, and a dashed-border empty state with a "Clear filters"
  button — re-expressed with this project's own CSS Modules/tokens instead
  of Tailwind/framer-motion (this project has neither). Category chips are
  plain toggle buttons (`activeCategory: string` single-select state, the
  same one-active-item-in-parent idiom `FaqAccordion`/`CallSamplesGrid`
  already use elsewhere in this codebase), active state filled `var(--brand)`
  in place of the benchmark's pink. New `SearchIcon` added to
  `components/ui/icons.tsx` (same `strokeIcon` convention as every other
  icon there) since no search/magnifying-glass icon existed before.
- **`components/blog/ArticleToc.tsx`** (`"use client"`) is a **direct
  algorithmic port** of the Chapeau benchmark's own `ArticleToc` — a
  `ticking` + `requestAnimationFrame`-throttled `scroll`/`resize` listener
  that walks heading elements in document order and marks the last one whose
  `getBoundingClientRect().top` has crossed an offset line as active.
  Deliberately **not** IntersectionObserver, for the same reason the
  benchmark's own code comment gives: a fast scroll (Page Down, a large
  wheel delta) can carry a heading past a narrow observed intersection band
  in a single frame without ever triggering it; continuous
  `getBoundingClientRect()` recomputation has no such gap. `ACTIVE_OFFSET`
  is re-tuned to `96px` for this site's own sticky navbar (`--nav-h: 64px`,
  not the benchmark's collapsing-pill header) — every heading in
  `ArticleBody.module.css` carries a matching `scroll-margin-top: 96px`.
  Sidebar is `display:none` below 901px (no mobile drawer — same choice the
  benchmark itself made, simply omitting it on small screens rather than
  inventing an unasked-for pattern) and renders `null` entirely when a post
  has fewer than 2 headings (nothing to navigate).
- **Sitewide taxonomy, not a new one**: `CATEGORIES` in `lib/blog-posts.ts`
  is exactly the 3 categories `Resources.tsx` (landing page) already
  established — "Debt Collection", "AI & Technology", "Voice Technology" —
  per the user's explicit "make sure the UI is consistent with the whole
  website" instruction. Do not add a 4th category without checking whether
  `Resources.tsx`/`SolutionBlogCards`/`WhyItWorks` should be updated too.
- **Only the featured post has a complete article body.** The other 5 posts
  (`rpc-verification-…`, `auto-re-dial-logic-…`, `fdcpa-regf-tcpa-…`,
  `what-makes-voice-ai-sound-human`, `promise-to-pay-capture-…`) each have a
  short 2-heading stub body — enough for a working TOC and a real page, but
  thin content, matching the user's "listing page + **one** sample post
  page" scope decision. If asked to flesh these out later, extend each
  post's `body` array in `lib/blog-posts.ts` directly; no component changes
  are needed since `ArticleBody`/`ArticleToc` are already generic over
  however many blocks/headings a post has.
- **`app/resources/blog/[slug]/page.tsx` uses Next 15's async `params`**
  (`params: Promise<{ slug: string }>`, `await`ed in both the page component
  and `generateMetadata`) — this is the first dynamic route in the project,
  so this is also the first place that convention appears; follow the same
  `Promise<{...}>` + `await` shape for any future dynamic route rather than
  the pre-15 synchronous `params` shape.
- **Custom `not-found.tsx` scoped to `app/resources/blog/[slug]/`** (not a
  global 404) — renders the same header/footer chrome plus an on-brand
  "We couldn't find that article" message and a button back to the blog
  index. `generateStaticParams()` pre-renders all 6 known slugs; any other
  slug 404s through this route-scoped page via `notFound()`.
- **Related Posts reuses `BlogPostCard`** via `getRelatedPosts()`
  (same-category-first, backfilled with the rest, same algorithm as the
  Chapeau benchmark) — no separate card implementation.

### Asset → component map addition

| Asset (`vodex assets/`) | Destination | Notes |
| --- | --- | --- |
| `pexels-szymon-shields-1503561-10178729 2.jpg` | `public/assets/blog-hero-bg.jpg` → Blog hero | same source already used as `solution-promise-to-pay-hero-bg.jpg` — intentional reuse, per user's own instruction to use this exact file |

Post thumbnails reuse existing assets already in `public/assets/` (no new
copies beyond the hero background) — `results-bg.jpg` (featured/DROS),
`resources-1.jpg` (RPC verification), `action-3.jpg` (auto re-dial),
`security-4.jpg` (compliance checklist), `why-works-1.jpg` (human-sounding
voice AI — literally the same photo Product Page's "Human-like
conversations" card already uses, a fitting reuse), `action-2.jpg`
(promise-to-pay capture).

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (all 6 post slugs
statically generated via `generateStaticParams`, confirmed in the build
output). A full Playwright screenshot/interaction pass (filter clicks,
empty-state search, fast-scroll TOC scroll-spy check, reduced-motion
emulation, 1516/1280/900/430px) was attempted but the verification script
hung mid-run and was killed rather than left running — the likely cause is
`page.goto(..., { waitUntil: "networkidle" })` against a `next dev` server,
whose persistent HMR WebSocket keeps the network from ever going idle, so
each navigation was probably eating its full navigation timeout one at a
time rather than any actual bug in the pages. The dev server and the
verification task were both stopped cleanly (no hung processes left
running) per the user's explicit "just build clean … I will verify it
manually" instruction — same pending-review status this project already
gives Section 9's audio player and the Section 10-15/Footer photo swap. If
this needs re-attempting later, switch the wait strategy to `"load"` (or a
`domcontentloaded` + explicit image-ready check, which the script already
does separately) instead of `"networkidle"` when driving a `next dev`
target.

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's manual review of both `/resources/blog` and
`/resources/blog/introducing-dros-engagement-operating-system` (the one
fully-authored post). Known open items, flagged rather than silently
decided: (1) 5 of 6 posts have stub bodies only, pending real content; (2)
`/resources` itself (the bare hub the Navbar link points at) still 404s —
pre-existing gap, not introduced here, same situation `/solutions` is
still in; (3) no share buttons/comments/newsletter signup on the post page
— the Chapeau benchmark doesn't have them either, so none were added.

---

## 17. Resources — Videos & Podcasts (`/resources/videos`) + Resources mega menu

> No PDF reference — same situation as §16. The user supplied a mockup
> screenshot of the hero only (badge "Videos", H1 "Videos & podcasts", the
> lead copy, the same CTA pair as the Blog hero) and asked for the rest of
> the page to follow the Blog listing page's structure, with explicit
> instructions: reuse a background from one of the other existing hero
> sections rather than sourcing a new photo, and keep the content mock —
> **no real video/playback this round**. Separately, the user asked for the
> navbar's "Resources" link to get the same hover mega-menu treatment
> `SolutionsMegaMenu` already has, listing: Blog, Videos, Call Samples, Case
> Studies, FAQ, About, Research, News, Investors, Contact Us.

### Current progress

Both pieces are built. `/resources/videos` mirrors `/resources/blog`'s
structure (`SolutionHero` → featured card → filterable grid → `FinalCta`)
but every card is **static, not a link** — there's no real per-video page to
send anyone to yet, so a nested/duplicate "watch" affordance would just be a
dead click. `ResourcesMegaMenu.tsx` is new, wired into `Navbar.tsx` the same
way `SolutionsMegaMenu` already is.

### Implementation decisions

- **Hero reuses `SolutionHero` verbatim** (no new hero component, same as
  Blog). Copy matches the user's mockup exactly: badge "Videos" with
  `badgeIcon={PlayIcon}` (an explicit override of the default `Waveform`
  badge icon — the first time `SolutionHero`'s `badgeIcon` prop has been
  used for something other than its default, since a filled play triangle
  reads better than a waveform for a video/podcast section), H1 "Videos &
  podcasts" with **no accent word** — built faithful to the reference
  screenshot rather than force-fitting the sitewide "one orange word per
  heading" convention, since the mockup genuinely shows plain white text
  throughout. Background: `product-hero-bg.jpg`, reused directly via import
  (no new file copied into `public/assets/`) — the user explicitly said to
  pull from an existing hero rather than source new art; picked for being
  the least-reused hero photo in the project (most other hero backgrounds
  are already tied to a specific vertical/page).
- **`lib/videos.ts`** mirrors `lib/blog-posts.ts`'s shape (plain typed
  array, `VIDEOS`, `VIDEO_CATEGORIES`, small helpers) — 1 featured + 5 grid
  videos, 3 categories drawn straight from the hero's own lead copy
  ("demos, customer stories, … podcasts") → **Product Demos, Customer
  Stories, Podcast**. This is a deliberately different taxonomy from Blog's
  3 categories (Debt Collection / AI & Technology / Voice Technology) —
  videos are grouped by *format*, blog posts by *subject* — not an
  oversight; don't try to unify them into one shared category list.
  Thumbnails reuse existing photos already in `public/assets/`, including
  `dashboard-mockup.png` for the featured "Inside DROS" demo (a natural fit
  — it's literally a product screenshot).
- **`VideoCard` (`components/ui/`) and `VideoFeatured` (`components/sections/`)
  are copy-adapted from `BlogPostCard`/`BlogFeaturedPost`** — same light
  `#f7f7f7` body / sharp-corner card shell, same hover lift — but **not
  links**. Per the user's explicit "no need of actual video" scope, wrapping
  cards in a `<Link>` to nowhere (or a self-referential href) would just be
  a fake affordance; instead each thumbnail gets a centered circular
  play-button overlay (scales up + turns brand-orange on card hover, an
  intentionally decorative micro-interaction, `aria-hidden` since it isn't a
  real control) and a duration badge. If/when real video pages exist later,
  swap these back to the `BlogPostCard` stretched-link pattern (see §16) —
  the visual shell is already identical, only the interactivity needs
  restoring.
- **`VideoExplorer` is a copy-adapted port of `BlogExplorer`** — identical
  filter/search logic and empty state, operating over `Video[]` instead of
  `BlogPost[]`. Kept as a separate component rather than genericizing
  `BlogExplorer` over a shared type, consistent with this project's
  established "copy-adapt, don't force a shared generic component" rule —
  the two already diverge in card type and will likely diverge further once
  videos get real detail pages.
- **`ResourcesMegaMenu.tsx` (`components/layout/`) is a structural copy of
  `SolutionsMegaMenu.tsx`** — identical mechanics (CSS-first
  `:hover`/`:focus-within` open, the padding-not-margin gap trick so the
  mouse never crosses a dead zone between the nav link and the panel, the
  Escape-blurs-active-element handler, the pathname-change blur so a
  same-page-shell client navigation doesn't leave the panel stuck open,
  icon-box treatment). **One structural difference from Solutions' menu,
  deliberate**: the 10 requested items are split into two labeled groups —
  "Resources" (Blog, Videos, Call Samples, Case Studies, FAQ, Research) and
  "Company" (About, News, Investors & Partners, Contact Us) — stacked
  vertically in one panel (not side-by-side columns), rather than one flat
  list. This isn't an invented grouping: it's exactly how `Footer.tsx`
  already splits its own "Resources" and "Company" columns, just reflected
  into the mega menu so the two stay conceptually in sync; grouping also
  keeps a 10-item list scannable the way Solutions' explicit "single flat
  list" choice worked for 5. Panel widened from Solutions' `420px` to
  `460px` to comfortably fit "Investors & Partners" without cramped
  wrapping. **Every href reuses an href `Footer.tsx` already declares**
  (`/resources/blog`, `/resources/videos`, `/#call-samples-title`,
  `/resources/case-studies`, `/#faq-title`, `/resources/research`,
  `/company/about`, `/company/news`, `/company/investors`, `/contact`) — no
  new routes invented; several (Case Studies, Research, About, News,
  Investors, Contact Us) still 404 today, same "clickable now, page comes
  later" precedent already established for the Solutions mega menu's own
  not-yet-built destinations.
- **7 new icons added to `components/ui/icons.tsx`** under a "Resources mega
  menu icons" block (`ArticleIcon`, `CaseStudyIcon`, `ResearchIcon`,
  `InfoIcon`, `NewsIcon`, `MailIcon`, plus `PlayFrameIcon` filed separately
  right after `SearchIcon` since it's also used stand-alone) — all generic
  redraws in the existing `strokeIcon` convention, not pixel-traces of
  anything (no source PDF/asset exists for these). 3 items reuse existing
  icons where the fit was already exact: `PhoneCallIcon` (Call Samples,
  already used for "Debt Collection" in Solutions' own menu — reusing the
  same glyph for a related-but-different concept in a different menu is
  fine, they're never shown side by side), `ChatIcon` (FAQ — already this
  project's established FAQ glyph, see the landing page's FAQ side card),
  `TrendingUpIcon` (Investors & Partners — already exists from the Final CTA
  icon cluster, a strong conceptual fit for "growth/investors").
- **Navbar.tsx's desktop link loop** changed from a two-way ternary to a
  three-way `if` chain (`"Solutions" → SolutionsMegaMenu`,
  `"Resources" → ResourcesMegaMenu`, else plain `<Link>`) — the mobile
  hamburger panel needed **no change**: it already renders every
  `NAV_LINKS` entry as a plain link unconditionally (mega menus are
  desktop-only, `:hover`/`:focus-within` behavior doesn't apply to the
  mobile drawer), so "Resources" in the mobile panel is still just a plain
  link to `/resources` — confirmed by reading `Navbar.tsx` before assuming
  a mobile variant was needed.

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (19 routes, `/resources/videos`
included). Curl smoke-test confirmed `/`, `/resources/blog`,
`/resources/videos`, and the featured blog post all return 200 on a fresh
`next dev` server. A Playwright visual pass was attempted twice this
session and abandoned both times — first a `networkidle`-related hang
(§16), then a Chromium renderer crash mid-`page.evaluate` on a retry using
`waitUntil: "load"` instead — both look like environment friction with this
sandboxed Windows Chromium rather than app bugs (curl/build/tsc all clean
throughout), but **the mega menu's hover panel, the video cards' hover
micro-interactions, and both pages' responsive layout have not been
visually confirmed by a screenshot this session**. Dev servers and the
crashed Playwright process were both stopped cleanly each time; no
processes left running.

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's manual review — of `/resources/videos`, the
Resources mega menu (hover it in a real browser to confirm the two-group
panel reads well and nothing overflows/clips at narrower desktop widths),
and the video cards' non-interactive treatment. If real per-video pages
get built later, revisit the "cards aren't links" decision above.

---

## 18. Resources — Call Samples (`/resources/call-samples`)

> Reference: a mockup screenshot (`Vodex - Resources -_ Call Samples.png`),
> not a PDF. Confirmed by inspection (cropped and re-examined at full
> resolution before building — see below) that most of this page is not new
> design at all: it's the landing page's own `CallSamples` and `Resources`
> sections, screenshotted back-to-back under a new page-specific hero,
> followed by the already-existing `EnterpriseBand`/`FinalCta`/`Footer`. The
> user confirmed this directly ("we have sections created on either home
> page, so we will use those sections, instead") before any code was
> written, and this page is built almost entirely by composing those
> existing components — no new section components at all.

### What the mockup actually showed vs. what was built (both confirmed with the user first)

Two things in the mockup didn't cleanly match reusing the real components
verbatim, and — per the user's explicit "ask, do not assume" — both were
asked about rather than guessed:

1. **Hero badge said "Videos"**, not "Call Samples" — this page has zero
   video content, so it read as a leftover from the `/resources/videos`
   mockup rather than intentional. **Confirmed with the user: use "Call
   Samples."**
2. **The mockup's `CallSamples`-section header (eyebrow "Debt Collection",
   heading "Real calls, real conversations", lead "Three conversation
   flows…") does not match what `CallSamples.tsx` already ships with on the
   landing page** (eyebrow "Call Samples", heading "Hear the difference
   `context` makes", lead "Real conversation flows our AI agents run every
   day — natural, compliant, and built around your business rules.") — the
   card data itself (Upcoming payment reminder / Payment plan negotiation /
   Overdue payment, Olivia, 0:48/1:12/0:57) matches exactly, only the
   section header text differs. Zoomed crops of both the `CallSamples` and
   `Resources` header blocks in the mockup showed **byte-identical**
   eyebrow/heading/lead between the two sections despite one showing audio
   cards and the other blog cards ("Three conversation flows…" describing a
   grid of written articles makes no sense) — strong evidence this is a
   Figma copy-paste artifact, not intentional new copy. **Confirmed with
   the user: reuse `CallSamples` exactly as it already ships (no copy
   changes) rather than edit it to match the mockup** — editing it would
   also have changed the landing page, since it's the same shared
   component. This is why the live page's `CallSamples`/`Resources`
   sections don't visually match this specific mockup's header text; that
   was a deliberate, confirmed choice, not an oversight.

### Implementation decisions

- **`app/resources/call-samples/page.tsx` composes existing components
  only**: a new page-specific `SolutionHero` call, then `<CallSamples />`,
  `<Resources />`, `<EnterpriseBand />`, `<FinalCta />` verbatim (same
  "reused verbatim" precedent as every other page in this file) —
  zero new section components were written for this page.
- **`SolutionHero`'s `bgImage` prop is now optional** (`bgImage?:
  Parameters<typeof Image>[0]["src"]`) — the mockup's hero showed a flat
  dark background with no photo, the first time any hero on this site
  needed that, so the backdrop `<Image>`/wrapper now only renders when
  `bgImage` is passed (omitting it lets `.hero`'s own pre-existing
  `background: #0d1013` show through). **This page itself doesn't end up
  using that path** — per direct follow-up ("use some existing hero bg for
  call samples page") it now passes `bgImage={callSamplesHeroBg}`
  (`debt-collection-hero-bg.jpg`, reused directly via import, no new file
  copied — picked for being the least-reused hero photo in the project at
  the time). The optional-prop change is left in place regardless since
  it's a reasonable, low-risk extension in the same spirit as
  `SolutionWorkflows`' `eyebrow`/`heading` props (§15) — a future page that
  genuinely wants a flat-color hero can still omit `bgImage`.
- **Badge icon left at the default `Waveform`** (no `badgeIcon` override,
  unlike the Videos hero's `PlayIcon` override) — the mockup's badge icon
  looked like the same generic circular mark used on every other hero
  badge, not a distinct glyph.
- **`ResourcesMegaMenu`'s "Call Samples" href updated** from
  `/#call-samples-title` (the landing-page anchor, a placeholder from §17
  since no dedicated page existed yet) to `/resources/call-samples` now
  that a real page exists. `Footer.tsx`'s own "Call Samples" link (in its
  **Product** column, not Resources) was deliberately left pointing at
  `/#call-samples-title` — that's a pre-existing, different link in a
  different context (a Product-page-shaped feature list), not something
  introduced by this page, and changing it wasn't asked for.
- No new copy was invented for this page beyond the hero (badge/H1/lead/
  CTAs, all taken directly from the mockup with the one confirmed badge
  fix) — everything below the hero is pre-existing, already-reviewed-or-
  pending-review content from `CallSamples`/`Resources`/`EnterpriseBand`/
  `FinalCta`.

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (20 routes,
`/resources/call-samples` included). Curl smoke-test confirmed `/`,
`/resources/call-samples`, `/resources/blog`, and `/resources/videos` all
return 200 on a fresh `next dev` server with no errors in the dev log; dev
server stopped cleanly afterward. No Playwright visual pass attempted this
round (per the environment friction hit twice in §16/§17) — not yet
visually confirmed by screenshot.

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's review, in particular of the
`debt-collection-hero-bg.jpg` reuse for this hero and of the deliberate
decision to keep `CallSamples`' existing header copy rather than match the
mockup's (see above — flag if the user actually wants the landing page's
copy changed too, since that would be a different, larger change).

---

## 19. Resources — Case Studies (`/resources/case-studies`)

> Reference: a mockup screenshot (`Vodex - Resources -_ Case Studies.png`),
> same non-PDF treatment as §16-§18. Structurally close to the Call Samples
> mockup (§18) — new hero, then two "existing landing-page section"-shaped
> blocks, then `EnterpriseBand`/`FinalCta`/`Footer` — but this time the two
> reused-looking blocks didn't cleanly map onto reusing the real components
> verbatim, so this one took real back-and-forth with the user before
> building (three rounds of `AskUserQuestion`, all answered before any code
> was written, per explicit "ask, do not assume").

### What was asked, and what the answers actually resolved to

1. **Hero badge** said "Videos" in the mockup again (third page in a row
   with this exact leftover) — confirmed with the user: use **"Case
   Studies"**.
2. **The mockup's featured-case-study banner doesn't match the live,
   shared `FeaturedCaseStudy` component** (used on the landing page):
   different eyebrow ("Debt Recovery" vs. "Featured Case Study"), a
   single-line un-accented "Improved by 3X" heading vs. the live
   component's two-line accented one, and — the real structural
   difference — **a second "Read Case Study" button that doesn't exist in
   the live component at all** (today there's only one bottom CTA bar).
   Asked whether to reuse `FeaturedCaseStudy` verbatim (§18's precedent) or
   edit it to match. **The user's answer wasn't either offered option** —
   *"or we can do like blogs page instead, it looks good"* — i.e., stop
   trying to force-fit the small single-banner teaser shape at all, and
   build this page with the Blog page's actual pattern (a dedicated
   featured card + a card grid, §16), the same way Blog and Videos each
   got their own purpose-built components instead of reusing/editing a
   landing-page section. This is why `CaseStudyFeatured`/`CaseStudyGrid`/
   `CaseStudyCard` are **new** components below, and why the shared
   `FeaturedCaseStudy` (and the landing page that uses it) was never
   touched.
3. **Both mockup sections are wrapped in a "Debt Collection" eyebrow +
   heading + lead, and followed by a "Running a collections operation? See
   Vodex for Debt Collection" cross-sell line** — neither wrapper exists on
   the actual landing-page components. Asked whether to include this
   framing. **Answer: "do as what ref says"** — include it. Applied
   literally where the mockup's copy made sense, with one deliberate
   exception (see next section) rather than reproducing a line already
   identified as broken.

### The one line that was NOT reproduced, and why

The mockup's **first** section header (above the featured card) shows the
lead *"Three conversation flows our agents run every day for collections
teams, from friendly reminders to payment negotiation."* — this is the
**exact same sentence**, verbatim, already flagged in both §18 (Call
Samples) and originally in the Call Samples mockup itself, describing audio
call flows. It appears here a third time, now sitting above a page about
case studies, where it makes even less sense. This is conclusively a Figma
template artifact (the same placeholder lead copy-pasted across every one
of these Resources mockups), not real per-page copy — so per the
established "correct obvious mockup/PDF errors rather than reproduce them"
project convention (§12/§13's "Benifit"→"Benefit" fix, §15's CTA typo fix),
**it was dropped, not rebuilt**: `CaseStudyFeatured`'s header shows only the
eyebrow + heading, no lead line, since the featured card immediately below
already carries its own description. The **second** section's lead
("From BNPL portfolios at massive volume to conversion-focused sales teams,
the results follow the same pattern.") is a genuinely different, sensible
sentence — that one **was** kept verbatim in `CaseStudyGrid`.

### Implementation decisions

- **`lib/case-studies.ts`** — same plain-array pattern as
  `blog-posts.ts`/`videos.ts`. The featured entry reuses the landing page's
  real stats (3X debt recovery / 7X connect rate — same numbers already in
  `FeaturedCaseStudy.tsx`, new supporting copy) and its existing
  `case-study-bg.jpg` photo. **The 5 grid entries are grounded, not
  invented from nothing**: they map 1:1 onto the exact industries and
  photos already established in `app/solutions/debt-collection/page.tsx`'s
  `INDUSTRIES` array (BNPL, Medical & Healthcare, Credit Card Payments,
  Insurance Collections, Banks & Lending — BHPH excluded to keep the grid
  at 5, matching Blog/Videos' own "1 featured + 5 grid = 6" precedent),
  reusing those pages' `debt-collection-industry-*` photos rather than
  sourcing anything new. Case-study descriptions are new (outcome-phrased,
  not the solutions page's capability-phrased copy) but stay consistent
  with what that page already claims each industry gets from Vodex.
- **`CaseStudyCard` (`components/ui/`) is copy-adapted from
  `BlogPostCard`** (§16) — identical light-card/stretched-link/hover shell,
  with the date/read-time meta line replaced by a headline stat (serif
  italic brand-orange number, the same "big stat number" convention
  `FeaturedCaseStudy.module.css`'s `.statNumber` already established,
  reused again here at a smaller size for the grid card).
- **`CaseStudyFeatured` and `CaseStudyGrid` (`components/sections/`) are
  each self-contained**, owning their own header + content + cross-sell
  line — same "duplicate a small closing line locally rather than extract
  a shared component for it" precedent §12 already established for the
  Solutions pages' own "Running a collections operation?" links (which
  this page's cross-sell line and destination — `/solutions/debt-collection`
  — directly reuses).
- **No filter/search on the grid**, unlike Blog/Videos — not asked for this
  page, and with one case study per industry a category filter would just
  toggle between "1 result" and "1 result." If a larger case-study library
  gets built later, revisit this the same way `BlogExplorer` was built.
- **Featured card's "Read Case Study" CTA and each grid card's "Read More"
  link to plausible `/resources/case-studies/[slug]` hrefs that don't
  resolve yet** — same placeholder-link convention `Resources.tsx` already
  uses on the landing page; no detail-page route was asked for this round.
- **Hero background: `solution-payment-reminders-hero-bg.jpg`** (the bank/
  institution building photo), reused directly via import per the user's
  general instruction this round to pull from existing `vodex assets`
  rather than source anything new — picked over reusing
  `debt-collection-hero-bg.jpg` again (just used one page ago, §18) for
  visual variety across the Resources page family, and because the
  building's "institutional credibility" read fits a case-studies page
  reasonably well.
- **`ResourcesMegaMenu`'s "Case Studies" item already pointed at
  `/resources/case-studies`** (set in §17, before this page existed) — no
  change needed there; it now resolves.

### Round 2 — `CaseStudyFeatured` rebuilt to match the mockup's literal overlay layout

The user reversed the round-1 decision above: pasted the original mockup
screenshot again alongside a screenshot of the shipped "blog-style"
`CaseStudyFeatured` and asked for the two to match, i.e. **the literal
full-bleed-photo-with-overlay banner from the mockup is now what's built**,
not the Blog-page side-by-side card shape. This directly supersedes bullet
2 under "What was asked" above — kept in place for history, but no longer
what's live.

- **`CaseStudyFeatured.tsx`/`.module.css` rebuilt**: the photo is now a
  full-bleed `next/image fill` background behind a dark left-to-right
  gradient scrim (same `isolation: isolate` pattern as
  `FeaturedCaseStudy`/`EnterpriseBand`), with content overlaid in a
  2-column grid instead of sitting in a separate white/gray panel beside
  the photo: left column is a dark pill tag (`study.industry`), a white
  `study.title` heading, `study.description`, and an orange "Read Case
  Study" button, all bottom-aligned over the photo; right column stacks
  the 2 stat cards (`study.statNumber`/`secondStatNumber`) above a new
  full-width white "Learn More About Vodex AI" link bar (→ `/products`,
  reusing the `ArrowRight` icon) — this bar has no equivalent anywhere else
  in the codebase; it's new, modeled on `FeaturedCaseStudy.module.css`'s
  `.cta` bar (space-between layout, arrow nudge on hover).
- **The header's dropped lead line is back**, per this same reversal — "The
  one line that was NOT reproduced, and why" above is also superseded: the
  user's own reference for this round shows that exact sentence present
  and asked to match it, so `CaseStudyFeatured`'s header now renders
  eyebrow + heading + the "Three conversation flows…" lead again. Treat
  this as the user overriding the earlier template-artifact judgment call
  for this specific line, not a correction of a mistake.
- **New background asset**: `public/assets/case-study-featured-bg.jpg`,
  copied fresh from `vodex assets/Frame 2147227676.jpg` per explicit user
  instruction — the same source file already used as the Debt Collection
  solutions page's `debt-collection-integration-bg.jpg` (§15), copied again
  here as an independently-swappable, page-specific file rather than
  importing that page's copy directly, same precedent as every other
  cross-page asset reuse in this project. `case-study-bg.jpg` (the old
  background, still referenced by `lib/case-studies.ts`'s featured entry
  thumbnail metadata, unused by the component itself now) was left in
  place, not deleted.

### Status / Approved / Next

**Status:** clean `tsc --noEmit`. Production build verified against an
isolated `distDir: ".next-verify"` override in `next.config.ts` (reverted
immediately after, confirmed via `git diff` showing zero net change to
that file, `.next-verify` deleted afterward) rather than against the
default `.next` — a `next dev` server owned by a different session/process
was already running against the project's real `.next` directory, and this
project has hit the "production build + dev server sharing one `.next`
dir corrupts dev's manifests" gotcha (§23/§24) enough times that it's now
standard practice here to never risk it. Build succeeded cleanly, all 25
routes including `/resources/case-studies` compiled. No Playwright visual
pass this round — the already-running dev server's own `.next` was found
mid-session to be in exactly that corrupted state (500s on every route,
pre-existing, not caused by this round's isolated build) and was
deliberately left untouched rather than deleted/restarted, since it
belongs to a different process than this one. Per the user's explicit
"just build clean, I will verify manually" instruction, no dev server was
started or stopped by this round, and nothing was left running afterward.

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's review of the rebuilt overlay layout and the
new background photo. If the existing `/resources/case-studies` dev server
is still returning 500s, it needs a manual `.next` clear + restart by
whoever owns that process (same fix this exact corruption has needed
twice before, per §23/§24) — this session did not do it, to avoid touching
a process it didn't start.

---

## 20. Resources — FAQ (`/resources/faq`)

> Reference: `Vodex - Resources -_ FAQ.pdf`, unlike §16-§19 an actual PDF
> this time, not a screenshot mockup — same non-artboard-measured treatment
> as the other Resources pages though (no pixel-bbox extraction, just read
> for structure/copy). `Footer.tsx` and `ResourcesMegaMenu.tsx` both already
> pointed "FAQ" at `/#faq-title` (the landing page's embedded FAQ section
> anchor) before this page existed — same pre-declared-then-built pattern
> as every other Resources route.

### What was asked, and what the answers resolved to

Three rounds of `AskUserQuestion`, all answered before any code was written,
per the user's explicit "if unclear, doubt, ask, do not assume":

1. **FAQ content**: the PDF's 10 questions are generic SaaS template
   boilerplate ("lead generation", "small businesses", "system
   requirements") — the same class of issue the landing page's *original*
   FAQ copy had before §13 rewrote it. Recommended rewriting again;
   **the user's answer was the opposite of the recommendation**: *"use the
   mock content for now, can be replaced later."* So unlike every other
   piece of copy this project has rewritten from a mismatched PDF/mockup,
   this page's FAQ answers are **intentionally** generic placeholder text,
   not deeply Vodex-grounded — flagged with a `⚠️` code comment in
   `FaqTopics.tsx` specifically so a future pass doesn't mistake it for
   already-reviewed content.
2. **Tabs**: the PDF shows 4 tabs (Overview / Tutorials / Product / Podcasts
   & Interviews), but this project has no tutorial or podcast content
   system — literally building them would leave 2 of 4 tabs permanently
   empty. **Confirmed with the user: functional tabs with real categories**
   — swapped "Tutorials"/"Podcasts & Interviews" for **Compliance &
   Security** and **Pricing** (both named explicitly in the hero's own lead
   copy: "platform basics to collections-specific compliance, performance,
   and pricing"), and made selecting a tab actually filter the accordion
   list below — a real behavior the existing `IndustryTabs` component
   doesn't have (confirmed via exploration: `IndustryTabs` only slides a
   visual indicator, nothing re-renders — see its own doc comment).
3. **"Help Center" card link**: the PDF's own text literally reads
   **"Medical & Healthcare →"** for this card's link — an industry link,
   not a help-center destination, same class of Figma-copy-paste mismatch
   already caught and fixed on §16-§19 (mismatched eyebrows, duplicate
   leads, a leftover "Videos" badge on three different pages in a row).
   **Confirmed with the user: fixed** to "Visit Help Center →" → `/help`
   (matches the destination `Footer.tsx` already declares for its own
   "Help Center" link — still a 404 today, a pre-existing gap, not a new
   one).

### Implementation decisions

- **`components/sections/FaqTopics.tsx`** (`"use client"`) is one component
  owning two independent pieces of state: `activeIndex` (which category tab
  is selected) and `openIndex` (which accordion item is expanded).
  **Selecting a new tab resets `openIndex` to `-1`** — without this, an open
  item's index could point at a completely different question after the
  list re-filters (e.g. item 2 is open under "Overview", user clicks
  "Pricing" which only has 2 items — index 2 wouldn't exist, or worse,
  would silently point at the wrong question).
- **Category tabs are a mechanical adaptation of `IndustryTabs.tsx`**, not a
  reuse — same `useLayoutEffect` + `getBoundingClientRect` sliding-indicator
  measurement, same `ArrowLeft`/`ArrowRight`/`Home`/`End` keyboard handling,
  copied because `IndustryTabs` takes a plain `string[]` with no
  content-switching hook at all (confirmed via its own doc comment: *"Only
  visual state changes on click — there's no per-industry copy yet."*).
  This is the **first tab control in the project that actually switches
  content** — if `IndustryTabs` itself ever needs this same behavior later
  (e.g. once Solutions' industry tabs get real per-industry copy), extend
  it the same way rather than starting over.
- **Accordion open/close mechanics are a mechanical adaptation of
  `FaqAccordion.tsx`**, not a reuse — same `grid-template-rows: 0fr → 1fr`
  CSS trick (no `max-height` magic number), same single-open
  `useState(-1)` pattern, same plus-icon-rotates-45°-to-X treatment. Not
  imported directly because `FaqAccordion.tsx` hardcodes `import styles
  from "./Faq.module.css"` (confirmed via exploration) — it's coupled to
  that one CSS module's class names, and this page doesn't want
  `Faq.module.css`'s 2-column grid/side-card rules along with it. Same
  "copy-adapt, don't force a shared component" precedent used throughout
  this project (`SolutionBlogCards` vs. `Resources`/`SeeItInAction`, §12;
  `VideoExplorer` vs. `BlogExplorer`, §17).
- **The 10 PDF questions were redistributed across the 4 new categories**
  (Overview 5, Product 4) **and topped up with new placeholder items** for
  Compliance & Security (2) and Pricing (2) — the source PDF simply doesn't
  have enough questions naturally aligned with those two topics to give
  either tab more than one item otherwise. All 13 answers are short and
  intentionally generic (no fabricated specific numbers, certifications not
  already established elsewhere on the site, or pricing figures) — this is
  placeholder copy, not a researched FAQ.
- **One PDF lead line was flagged but kept verbatim, unlike the Help Center
  link** — the "Answer by topic" section's lead ("Security certifications
  held by Vodex and the collection regulations the platform enforces on
  every conversation.") really only describes the Compliance & Security
  tab, not the other three, but the user was only asked about (and only
  confirmed a fix for) the Help Center link, not this line — per "use the
  mock content for now," it was left as-is rather than silently rewritten,
  with a code comment explaining why it's inconsistent.
- **Hero background: `results-bg.jpg`**, reused directly via import (no new
  file copied) — not yet used as any page's hero (only inside
  `SolutionResults`'s full-bleed stat band and as the Blog featured post's
  thumbnail), picked for visual variety and its moody/serious tone fitting
  the "Compliance & Security" badge. Per the user's own "use any pic for
  hero bg for now" instruction — easily swappable later, same as every
  other hero background in this project.
- **`Footer.tsx`'s Resources-column "FAQ" link and `ResourcesMegaMenu.tsx`'s
  "FAQ" item both updated** from `/#faq-title` to `/resources/faq` — same
  "point the nav at the real page once it exists" follow-up already done
  for "Call Samples" in §18.

### ⚠️ Round 2 fix — active tab was invisible

The user screenshotted the tabs immediately after this shipped: "Overview"
(the default-active tab) rendered as plain unstyled text with no pill at
all, while the other three showed correctly as dark pills. Root cause:
`.tabActive`/`.indicator` were copied verbatim from `IndustryTabs.module.css`,
which sets a **white** active-pill background — correct there because
`IndustryTabs` only ever lives inside `Solutions.tsx`'s dark section, so a
white pill reads clearly against a dark background. `FaqTopics`'s own
section is light (`background: var(--bg)`), so that same white-on-white
pill was rendering with zero visible contrast. Fixed by changing both
`.indicator` and `.tabActive`/`.tabActive:hover` from `background: #fff` to
`background: var(--brand)` (with white text) — matching this project's
already-established convention for an active filter/tab chip on a *light*
background (`BlogExplorer`/`VideoExplorer`'s `.chip[data-active]`, §16/§17)
rather than inventing a new color choice. **If `IndustryTabs.module.css`'s
white-pill styling is ever copy-adapted into another light-background
section in this project, apply this same fix up front** — don't assume the
donor component's colors transfer unchanged just because the layout
mechanism (sliding indicator, keyboard nav) does; check what background the
new section actually sits on first, same lesson as several other
copy-adapted components in this file.

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (22 routes,
`/resources/faq` included). Curl smoke-test confirmed `/`, `/resources/faq`,
`/resources/case-studies`, and `/resources/call-samples` all return 200 on
a fresh `next dev` server with no dev-log errors (re-checked `/` and the
other Resources pages specifically since `Footer`/`ResourcesMegaMenu` are
shared and were edited this round); server stopped cleanly. Initial build
had no Playwright visual pass (same environment friction noted in
§16-§19) — the Round 2 tab-color bug above is exactly the kind of thing
that check would have caught, and was only found because the user
screenshotted it. The Round 2 fix itself **was** verified with a targeted
Playwright screenshot (a single bounded `waitUntil: "load"` navigation, not
the `networkidle` strategy that hung previously) confirming the active tab
now renders as a filled brand-orange pill — zero console errors, dev
server and browser both stopped cleanly afterward.

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's review, in particular of (1) the functional-
tabs reinterpretation (Compliance & Security / Pricing in place of
Tutorials / Podcasts & Interviews — a real information-architecture
change, not just a copy fix), and (2) whether the mock FAQ content is
worth replacing with real, grounded copy sooner rather than later, since
this page's own hero explicitly promises depth ("platform basics to
collections-specific compliance, performance, and pricing") that the
current placeholder answers don't really deliver on yet.

---

## 13. Solutions Page 2 — Promise-to-Pay Capture

> Reference: `D:\litlabs\Vodex\Vodex - Solutions_Page (0.2).pdf` — 4548 ×
> 29752pt = a 3× export of a **1516 × 9917px** artboard, same convention as
> every other PDF in this project. Confirmed (not assumed) to be the
> **"Promise-to-Pay Capture"** entry from `Footer.tsx`'s existing 5-route
> `Solutions` list (previously 404) — its own Footer copy literally reads
> "Promise-to-Pay Capture", and its H1 is "Voice AI Agents that Capture
> Payment Intent". Route: **`/solutions/promise-to-pay`**.

### What was actually verified before building

The user's brief was "just a replica with assets/content swapped" — checked
rather than assumed, per explicit instruction, by rendering the PDF at
24dpi, extracting `pdftotext -bbox` coordinates, cropping specific regions
at 72–96dpi, and reading all 11 supplied asset files to confirm placement
against the PDF crops (not filenames). Findings:

- **Structurally identical to Page 1**: same 9 sections in the same order,
  same card/stat counts (3 industries, 6 workflows, 5-item comparison
  lists, 3 results stats, 4 security items), same eyebrow/heading text for
  every section (including the pre-existing "Core features"/"Comparison"/
  "Resources" eyebrow mismatches documented in §12 — this PDF repeats the
  *same* mismatches, not new ones).
- **Comparison, Security, FAQ, EnterpriseBand and FinalCta copy is
  word-for-word identical to Page 1's already-shipped copy** (confirmed via
  `pdftotext -layout` diffed against each component's hardcoded strings).
  Only Comparison's background photo differs between the two pages.
- **Industries, Workflows and Results have entirely different lead text,
  card/stat data, and photos** — genuine per-page content, not a
  copy-paste.
- The "Industries that Benifit" typo is present in *both* PDFs (0.1 and
  0.2) — Page 1's shipped component already corrects it to "Benefit", so
  Page 2 follows that same established fix rather than the PDF's literal
  typo.
- Industries card icons are positional, not semantic, same as Page 1: card
  1 ("Debt Collection Firms") uses the bank-building icon, card 2
  ("Lending & Financial Services") uses the phone-call icon — carried over
  from the *same slot* Page 1 used those icons in, not matched to the new
  titles' literal meaning. Card 3 ("Utilities & Telecom") needed a new icon
  (see below).
- All 10 supplied photos were visually confirmed against their PDF card
  crop before mapping — most tellingly, `pexels-markus-winkler-1430818-
  4144765 1.jpg` (a typewriter literally reading "Send a Mail") maps to the
  "SMS & Email Confirmations" workflow card, and the gold/magenta
  `jumping-jax--TfwQjOWEp8-unsplash 2.jpg` soundwave graphic was pixel-
  matched to the "PTP Negotiation Paths" card's background.

### Refactor: `SolutionIndustries`/`SolutionWorkflows`/`SolutionResults` are now prop-driven

Since a genuine second instance now exists (with a 3rd–5th already declared
in `Footer.tsx`/`SolutionsMegaMenu.tsx`), these three components got the
same treatment `SolutionHero` already justified for itself in §12 — moved
from page-hardcoded content to props, **only for the pieces that actually
differed between the two known pages**:

- `SolutionIndustries`: `{ lead: string; cards: {title, description, Icon,
  src}[] }` — eyebrow ("Core features") and heading ("Industries that
  `Benefit`") stay hardcoded, confirmed identical text in both PDFs. The
  closing cross-sell line ("Running a collections operation? → Debt
  Collection") also stays hardcoded — it's the same link/copy in both PDFs,
  reads as a site-wide convention rather than per-page content.
- `SolutionWorkflows`: `{ lead: string; workflows: {title, description,
  src}[] }` — eyebrow/heading unchanged (also confirmed identical).
- `SolutionResults`: `{ lead: string; stats: {number, label, description}[]
  }` — eyebrow/heading/background (`results-bg.jpg`) unchanged; no new
  Results asset was supplied for Page 2, consistent with the user's "other
  sections are exact same" framing.
- `SolutionComparison` got a single **optional** `bgImage` prop defaulting
  to the existing `/assets/comparison-vodex-bg.jpg` — everything else about
  it (heading, lead, both 5-item lists) is byte-identical across both
  pages, so this was the only change needed, and `payment-reminders/page.tsx`
  needs no edit for it (it just gets the default).
- `SolutionSecurity`, `Faq`, `EnterpriseBand`, `FinalCta` were reused with
  **zero changes** — confirmed byte-identical content again, same
  page-agnostic pattern already established for these four across the
  landing/product/Page-1 solutions pages.

**`app/solutions/payment-reminders/page.tsx` was updated to pass its
existing hardcoded content explicitly as props** to the three refactored
components (its `CARDS`/`WORKFLOWS`/`STATS` arrays and lead strings moved
from inside the components into that page file). This is a pure relocation,
not a content change — verified by a full-page Playwright screenshot at
1516px showing the page renders identically to before the refactor (same
total page height, same visible content, zero console errors).

### New icon — `SignalTowerIcon`

Added to `components/ui/icons.tsx`'s existing "Solutions page icons" block
for the "Utilities & Telecom" card — a mast with a top dot and two fans of
signal ticks (three per side, increasing length), same `strokeIcon`
convention as `BankIcon`/`PhoneCallIcon`/`ShieldPlusIcon` (stroke-only,
round caps/joins, own viewBox). Like every other icon in this file, it's a
generic redraw of the PDF's icon-font glyph, not a pixel-trace.

### Asset → component map

| Slot | Source (`vodex assets/`) | Destination |
| --- | --- | --- |
| Hero bg | `pexels-szymon-shields-1503561-10178729 2.jpg` | `solution-promise-to-pay-hero-bg.jpg` |
| Industries 1 (Debt Collection Firms, BankIcon) | `pexels-yankrukov-7794003 1.jpg` | `promise-to-pay-industries-1.jpg` |
| Industries 2 (Lending & Financial Services, PhoneCallIcon) | `pexels-davegarcia-32642489 2.jpg` | `promise-to-pay-industries-2.jpg` |
| Industries 3 (Utilities & Telecom, SignalTowerIcon) | `pexels-aboodi-17396096 1.jpg` | `promise-to-pay-industries-3.jpg` |
| Workflow 1 (PTP Capture & Confirmation) | `pexels-gulsahaydgn-19501540 1.jpg` | `promise-to-pay-workflow-1.jpg` |
| Workflow 2 (PTP Reminder Sequence) | `pexels-rdne-7947968 1.jpg` | `promise-to-pay-workflow-2.jpg` |
| Workflow 3 (Missed PTP Recovery) | `microsoft-copilot-Zcp8xN9DnjM-unsplash 1.jpg` | `promise-to-pay-workflow-3.jpg` |
| Workflow 4 (PTP Update or Reschedule Calls) | `pexels-ketut-subiyanto-4963379 1.jpg` | `promise-to-pay-workflow-4.jpg` |
| Workflow 5 (SMS & Email Confirmations) | `pexels-markus-winkler-1430818-4144765 1.jpg` | `promise-to-pay-workflow-5.jpg` |
| Workflow 6 (PTP Negotiation Paths) | `jumping-jax--TfwQjOWEp8-unsplash 2.jpg` | `promise-to-pay-workflow-6.jpg` |
| Comparison bg (Vodex AI panel) | `magicpattern-iAR6yhCkrxc-unsplash 1.jpg` | `promise-to-pay-comparison-bg.jpg` (note: this is the *same source image* Page 1's `comparison-vodex-bg.jpg` was cropped from — Page 2 happens to reuse it too; both pages' Comparison panel looks the same as a result) |

`pexels-szymon-shields-1503561-10178729 1.jpg` (the sibling used for Page
1's `industries-banks.jpg`) is unrelated to `… 2.jpg` used here for the
Hero — confirmed two different crops of the same building, not a mix-up.

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build`. Playwright-verified at
1516 and 430px on both `/solutions/promise-to-pay` and
`/solutions/payment-reminders` — zero console errors, zero horizontal
overflow on either. `/solutions/payment-reminders` re-screenshotted after
the prop refactor and confirmed visually unchanged (byte-identical
rendered content). New Industries card 3 with `SignalTowerIcon` screenshot-
verified in isolation. No `/solutions` hub page still (pre-existing gap
from §12, not introduced here) — the mega-menu and Footer links to
`/solutions/promise-to-pay` itself now resolve instead of 404ing.

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's review. When building solution pages 3–5
(Lead Qualification, Debt Collection, Collection Software), reuse this same
approach: `SolutionHero`/`SolutionIndustries`/`SolutionWorkflows`/
`SolutionResults` already accept the per-page data as props, so a new page
is mostly a new `page.tsx` with its own content arrays plus whatever new
assets/icons that page's PDF needs — check each new PDF's actual content
before assuming eyebrows/headings/Comparison-Security-FAQ copy stay
identical a third time; two data points is a pattern, not a guarantee.

---

## 14. Solutions Page 3 — Loan & Borrower Lead Qualification

> Reference: `D:\litlabs\Vodex\Vodex - Solutions_Page (0.3).pdf` — 4548 ×
> 29801pt = a 3× export of a **1516 × 9933.7px** artboard, same convention as
> every other PDF in this project. Confirmed (not assumed) to be the
> **"Loan & Borrower Lead Qualification"** entry from `Footer.tsx`'s
> 5-route `Solutions` list (previously 404) — its H1 reads "AI Voice Agents
> for Loan & Borrower Lead Qualification". Route:
> **`/solutions/lead-qualification`**.

### What was actually verified before building — Section 2 is NOT a third copy of the 3-card grid

The user's brief was again "just a replica with assets/content swapped,
except Section 2 which is similar to something already built on the site" —
checked by rendering the PDF at 24/48dpi, extracting `pdftotext -bbox`
coordinates, cropping the Industries/Workflows/Hero regions, and opening
every one of the 13 supplied asset files to confirm placement by visual
content match (never filename-guessed). Findings:

- **Hero, Workflows, Comparison, Results, Security, FAQ, Enterprise Band,
  Final CTA are structurally identical to Pages 1 & 2** — same components,
  same eyebrow/heading text (including the same "Core features"/
  "Comparison"/"Resources" mismatched-eyebrow pattern already documented in
  §12, and the same PTP-flavored Results copy — see Open items below).
  `SolutionComparison` and `SolutionSecurity` render with **zero props** —
  confirmed byte-identical heading/lead/list copy to Pages 1 & 2 via
  `pdftotext -layout`.
- **Section 2 ("Industries that Benifit") is genuinely different this
  time**: not `SolutionIndustries`' 3-card icon+description grid, but a
  **full-bleed strip of 7 equal-width photo panels, 554px tall** — measured
  by pixel-scanning a rendered crop (vertical scan found the strip spans
  artboard y≈1119–1673, i.e. 554px, matching the Product Page's
  `CoreFeatures` strip's 555px almost exactly). The flat PDF export has
  **zero per-panel captions**, same as `CoreFeatures`' own source had zero.
  Confirmed with the user (not assumed) that this should be built as a new
  hover-expand component reusing `CoreFeatures.module.css`'s exact
  mechanism, with 7 invented captions grounded in each photo's content.
- All 14 supplied assets (1 hero bg, 7 industry photos, 6 workflow photos)
  were opened and visually matched against the PDF crops before mapping,
  per this project's standing rule. Two of these assets are
  **intentional reuses of sources already cropped elsewhere in
  this codebase**: `Frame 2147227673.jpg` (the cert-badge grid, already
  cropped into the 8 individual footer badges and into `security-4.jpg`) is
  reused whole here as the "Compliance & Consent Logging" workflow photo;
  `pexels-roman-muntean-369190311-14513059 1.jpg` (already
  `industries-healthcare.jpg` on Page 1) is reused as the "Healthcare"
  industry panel here too — both confirmed by direct visual comparison, not
  filename collisions to "fix".

### New component: `SolutionIndustryStrip`

`components/sections/SolutionIndustryStrip.tsx` + `.module.css` — a
copy-adapt of `CoreFeatures.tsx`/`.module.css` (not a shared/parameterized
`CoreFeatures`, consistent with this project's "copy the pattern, adapt what
differs" convention), **not** a variant of `SolutionIndustries` — the two
components now cover the two genuinely different Industries layouts this
PDF family has produced (3-card grid vs. 7-panel strip), and a page picks
whichever one its own PDF actually shows rather than always defaulting to
one.

- 7 panels instead of `CoreFeatures`' 9, same `flex: 1 1 0` strip,
  `flex-grow` hover/focus expansion (0.74 resting / 3.1 hovered, same
  specificity trick so `.strip:hover .panel:hover` beats
  `.strip:hover .panel`), scrim + copy fade-in, 3-col static grid below
  900px, 2-col below 560px.
- Heading uses this page family's **shared** `--fs-h2`/`--lh-h2`/`--ls-h2`
  tokens at weight 600 (i.e. `SolutionIndustries`' heading style), not
  `CoreFeatures`' locally-overridden weight-700/tracking-0.015em/
  line-height-1.5 — that override was measured specifically for the Product
  Page's own heading copy, and this section's copy ("Industries that
  Benefit") didn't show the same gap against Inter. Heading uses the
  correct "Benefit" spelling — confirmed (again) that the PDF's own text
  has the same "Benifit" typo already documented for Pages 1 & 2; this
  component follows the same established fix.
- `industries: {label, description, src}[]` prop + `lead` prop; eyebrow
  ("Industries") and the closing cross-sell line ("Running a collections
  operation? → Debt Collection", linking to the existing
  `/solutions/debt-collection` route) are hardcoded, matching
  `SolutionIndustries`' own hardcode-vs-prop split.
- Panel mapping (photo content → invented label, confirmed by opening every
  file):

  | Order | Photo content | Source asset | Label |
  | --- | --- | --- | --- |
  | 1 | Cash, credit cards, passport | `pexels-davegarcia-32642489 2.jpg` | Banking & Credit |
  | 2 | Student w/ "Managerial Economics" textbook, MBA lanyard | `pexels-mba-classroom-2155665220-33887551 1.jpg` | Education & Student Loans |
  | 3 | Apartment building exterior | `pexels-mahmoud-zakariya-2154822140-35397760 1.jpg` | Real Estate |
  | 4 | Surgeon in scrubs | `pexels-roman-muntean-369190311-14513059 1.jpg` (reused — see above) | Healthcare |
  | 5 | Hand holding house-shaped keychain + Euro notes | `pexels-jakubzerdzicki-34023907 1.jpg` | Mortgage & Property Finance |
  | 6 | Woman holding "HOME INSURANCE POLICY" clipboard | `pexels-mikhail-nilov-7734599 1.jpg` | Insurance |
  | 7 | Laptop open to a Facebook business page + phone | `austin-distel-tLZhFRLj6nY-unsplash 1.jpg` | Marketing & Sales Teams |

  Descriptions are one invented line each, grounded in the
  lead-qualification theme (e.g. "Pre-qualify credit card and loan
  applicants before they reach a loan officer."). **Flagged as pending
  review**, same status as `CoreFeatures`' own captions — not from the PDF,
  which has none.
- Verified interactively via Playwright: default state renders all 7 panels
  equal-width in the PDF's photo order; hovering panel 3 grows it via
  `flex-grow` and reveals "Real Estate / Qualify property buyers and
  renters before scheduling a viewing." — confirmed the hover mechanic and
  copy both work, not just that the component compiles.
- **⚠️ Fixed after the user reported the panels "look pixelated"**: `sizes`
  was first copied over as `"...15vw"` for desktop, reasoning from each
  panel's *resting* width (1/7 ≈ 14.3vw) — but `next/image` decides which
  source width to fetch once, from that hint, and the resting width isn't
  what matters here: a hovered panel's `flex-grow: 3.1` against 6 siblings
  at `0.74` makes it occupy **~41% of the strip**, not ~14%. So the browser
  had already fetched a ~640px-wide source (sized for 15vw) and was
  stretching it ~2x on hover — soft/blocky, exactly what got reported.
  `CoreFeatures` already solved this for its own 9-panel strip (34.4%
  hover fraction → `40vw` sizes hint, not its own ~11% resting width);
  this component's math (41.1% hover fraction) needed `45vw`. Verified with
  a real Playwright network-request check, not just eyeballing: at a 1516px
  viewport and DPR 2, the hovered panel now requests a 1920px-wide source
  against a 623px-CSS-px (1246px physical) rendered box — comfortable
  headroom — where the `15vw` version had been serving 640px into that same
  1246px slot. **The lesson generalizes**: for any `next/image` inside an
  element whose CSS size changes on hover/interaction (this strip, and any
  future `flex-grow`-driven layout), size the `sizes` hint for the
  *largest* rendered state, not the resting one — `next/image` never
  re-fetches a larger source after the initial pick.

### Page: `app/solutions/lead-qualification/page.tsx`

Mirrors `payment-reminders/page.tsx`'s structure — `SolutionHero` with its
own copy/CTAs (`"Talk To Our Expert"` primary this time, not `"Get
Started"` — confirmed from the hero crop, same filled/outline pairing as
Pages 1 & 2), `SolutionIndustryStrip` (new, see above) in place of
`SolutionIndustries`, `SolutionWorkflows`/`SolutionResults` with their own
`WORKFLOWS`/`RESULTS_STATS` arrays, `SolutionComparison`/`SolutionSecurity`
with **no props at all**, then `Faq`/`EnterpriseBand`/`FinalCta` reused
verbatim.

### Asset → component map

| Slot | Source (`vodex assets/`) | Destination |
| --- | --- | --- |
| Hero bg | `michael-bourgault-aHetdmuNoO4-unsplash 1.jpg` | `lead-qualification-hero-bg.jpg` |
| Industries 1–7 | see table above | `lead-qualification-industry-1.jpg` … `-7.jpg` |
| Workflow 1 (Data Collection & Validation) | `pexels-kampus-8171183 1.jpg` | `lead-qualification-workflow-1.jpg` |
| Workflow 2 (Qualification Calls) | `pexels-jack-sparrow-5917332 1.jpg` | `lead-qualification-workflow-2.jpg` |
| Workflow 3 (Intent Analysis) | `pexels-rdne-7947968 1.jpg` | `lead-qualification-workflow-3.jpg` |
| Workflow 4 (Compliance & Consent Logging) | `Frame 2147227673.jpg` (cert-badge grid — intentional reuse) | `lead-qualification-workflow-4.jpg` |
| Workflow 5 (Human Handoff) | `pexels-julio-lopez-75309646-29179702 1.jpg` | `lead-qualification-workflow-5.jpg` |
| Workflow 6 (Appointment Scheduling) | `pexels-roberto-hund-5356720 3.jpg` | `lead-qualification-workflow-6.jpg` |

All copied as fresh, page-specific files (never referencing another page's
copy of a shared source directly), same "independently swappable"
precedent as the Security section.

### Open items flagged to the user (not silently "fixed")

1. **Results section copy says "PTP" (Promise-to-Pay), not
   lead-qualification language** — the section lead ("...when voice AI runs
   the PTP conversation end to end.") and all 3 stat labels ("Higher PTP
   intent rate", "Reduction in missed payments", "Lift in PTP conversions")
   read like they're copy-pasted from the Promise-to-Pay page, not this
   one. Same class of mismatched/reused copy already flagged for Pages 1 &
   2's own Results/Security eyebrows — built verbatim per this project's
   "measure, don't invent" rule.
2. The 7 industry panel captions are invented (see above) — pending the
   user's review.

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build`. Dev-server Playwright check
at 1516px: zero console errors, full page renders top to bottom with every
image loading. `SolutionIndustryStrip`'s hover-expand mechanic specifically
verified (default equal-width state + a hovered-panel screenshot showing
the grown panel and revealed caption).

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's review, in particular of the new
`SolutionIndustryStrip` component and its 7 invented captions. When building
solution pages 4–5 (Debt Collection, Collection Software), check each PDF's
own Industries section shape before assuming it matches either the 3-card
grid (Pages 1–2) or the 7-panel strip (this page) — three data points still
isn't a guarantee the next one matches either.

---

## 15. Solutions Page 4 — Debt Collection

> Reference: `D:\litlabs\Vodex\Vodex - Solutions_Page (0.4).pdf` — 4548 ×
> 28583pt = a 3× export of a **1516 × 9527.67px** artboard, same convention
> as every other PDF in this project. Confirmed to be the **"Debt
> Collection"** entry from `Footer.tsx`'s 5-route Solutions list (previously
> 404) — its H1 reads "AI Voice Agents for Debt Collection" and its Footer
> copy literally reads "Debt Collection". Route: **`/solutions/debt-collection`**.
> Note: an earlier PDF in the same folder, `Vodex - Solutions_Page (0.3).pdf`,
> is the already-built `/solutions/lead-qualification` page (§14) — the two
> are unrelated; this round only touched 0.4.

### What was actually verified before building

Checked directly against a fresh 24dpi render + `pdftotext -bbox`/`-layout`
extraction + zoomed corner crops, per this project's established method —
**this PDF turned out to have a structurally different section lineup than
Pages 1–3**, not a copy-with-assets-swapped repeat:

- **No Workflows, Comparison, or Security sections at all.** This page's own
  section order is: Hero → a 2-stat photo band → a 6-badge cert strip → a
  3-card "Why Vodex" grid → a 6-card dark "Industries" grid (visually the
  `SolutionWorkflows` scrim-card pattern, not the `SolutionIndustries`
  light-card pattern) → a single "Collections software integration" banner
  → Faq → a new 3-card "From the blog" grid → EnterpriseBand → FinalCta →
  Footer. Confirmed by reading the full `pdftotext -layout` dump before
  writing any code, not assumed from the Page 1/2/3 template.
- **The 2-stat band's copy and background photo are a literal duplicate of
  the landing page's `FeaturedCaseStudy` section** — "3X Debt recovery rate
  improvement" / "7X Connect rate improvement", same `Frame 2147227651.jpg`
  background. Not reused as a component, though: `FeaturedCaseStudy` also
  carries a heading, lead paragraph and "Read the full case study" CTA that
  this section's PDF crop does not have — just two bare white stat cards
  over the photo, nothing else. Built as a new minimal component instead of
  stretching `FeaturedCaseStudy` to hide half its own markup.
- **The "Industries" section is visually `SolutionWorkflows`, not
  `SolutionIndustries`**, confirmed by corner-crop + layout comparison: dark
  `var(--ink)` background, full-bleed photo cards with an always-on bottom
  scrim, `ExternalLinkIcon` diagonal arrow next to each title — the exact
  scrim-card idiom `SolutionWorkflows` already implements, not
  `SolutionIndustries`' light `#f4f4f4`-body-with-unboxed-icon idiom. Since
  this is a second real use of that dark-scrim-grid pattern under different
  copy, `SolutionWorkflows` was made prop-driven for `eyebrow`/`heading`
  (both optional, defaulting to the existing "Workflows"/"Actions you can
  streamline" so Pages 1–3 need no changes) rather than forked into a new
  component — same reasoning §13 already used to prop-drive
  `SolutionIndustries`/`SolutionWorkflows`/`SolutionResults` once a second
  real instance existed.
- **A 6-badge certification row sits directly under the stat band, with no
  section heading of its own.** Confirmed by direct comparison that these
  are the *same six* `footer-cert-*.png` assets already cropped for the
  Footer (§8) — ISO 27001, HIPAA, FDCPA, Reg F, TCPA, AICPA SOC 2 — just
  DebtLink and RMAi omitted and, importantly, in a **different order than
  the Footer's own `CERTIFICATIONS` array** (Footer: ISO, SOC2, HIPAA,
  FDCPA, RegF, TCPA; this row: ISO, HIPAA, FDCPA, RegF, TCPA, SOC2). Caught
  by a direct pixel comparison after the first build reused the Footer's
  array order verbatim and it didn't match the reference row — fixed by
  giving `SolutionCertRow` its own explicitly-ordered list rather than
  importing the Footer's. **Don't assume two components that share the same
  underlying asset set also share the same display order — check the
  reference for each usage.**
- **The "Why Vodex" 3-card grid is `WhyItWorks` (Product Page §11) with an
  icon added to each card title**, not `SolutionIndustries`/a new pattern —
  photo top, `#f7f7f7` body, hairline divider, dark "Read More" pill +
  `ArrowRight`, sharp corners — confirmed by direct layout comparison, just
  3 columns instead of `WhyItWorks`' 4 and an icon inline with each title
  (`WhyItWorks` itself has no per-card icon). Built as a new component,
  `SolutionWhyUs`, copy-adapted from `WhyItWorks.tsx`/`.module.css` rather
  than reused directly, since `WhyItWorks` is Product-Page-hardcoded and a
  3-vs-4 column grid is a real structural difference, not just a prop.
  - Icons: `PhoneCallIcon` (existing) for "Consistent Outreach",
    `SignalTowerIcon` (existing, already built for the Promise-to-Pay page's
    "Utilities & Telecom" industry card) for "Operational Scalability" —
    both close enough to the reference's icon-font glyphs under this
    project's established "generic redraw, not pixel-trace" convention for
    every other PDF icon. "Effortless Compliance" needed a genuinely new
    icon — a four-pointed sparkle/diamond, matching nothing already in
    `icons.tsx` — added as `SparkleIcon` (same `strokeIcon` convention).
- **The "Collections software integration" banner is a new one-off
  pattern** — closest existing relative is `WhatYourTeamGets` (Product Page
  §11: photo-bg rounded banner, two-column, right side informational
  content) but two real differences meant copy-adapting rather than
  reusing: (a) **sharp corners here**, confirmed by corner-pixel zoom,
  where `WhatYourTeamGets`' rounded banner is explicitly documented as the
  *one* deliberately-rounded surface on the Product Page — so this is not
  "the same banner treatment again," it's a different treatment that
  happens to share the photo-bg-with-overlaid-content idea; (b) the right
  column here is 3 individual translucent pill-shaped info cards (own
  background, own rounded-pill radius, centered bold text) rather than a
  bulleted list, and the left column has a CTA button `WhatYourTeamGets`
  doesn't. Built as new component `SolutionIntegration`, prop-driven
  (`eyebrow`, `titleLines`, `lead`, `cta`, `items`, `bgImage`) since a
  future solutions page could plausibly reuse this exact shape with new
  copy, following this project's established default of prop-driving a
  new solutions-page component from the start rather than waiting for a
  second instance to force a refactor later.
  - **The PDF's own CTA copy has a typo — "Learn More About Integerations"**
    — fixed to "Learn More About Integrations" per this project's
    established precedent of correcting PDF typos rather than reproducing
    them verbatim (same treatment as "Industries that Benifit" → "Benefit"
    in §12/§13). The CTA links to `/solutions/collection-software`, an
    already-declared (if not yet built) Footer route — a more specific,
    plausible destination than a generic `/demo` link, since the button
    text is literally about that other solution.
- **A "From the blog" 3-card section is genuinely new** — no equivalent
  section exists on Pages 1–3 (their Resources-shaped content is
  `SolutionSecurity`'s 4-item compliance grid, not a blog list). Closest
  relatives considered and rejected: the landing page's `Resources.tsx`
  (light `#f7f7f7` body + dark pill button — this reference has a **solid
  black** body with no separate button, just an underlined text link) and
  the Product Page's `SeeItInAction` (solid black body, but with a
  description paragraph this reference's cards don't have). Built as a new
  component, `SolutionBlogCards`, prop-driven (`lead`, `posts`) since blog
  cards are an obvious candidate to reappear on other solution pages.
- **⚠️ One supplied asset doesn't match its slot — flagged, not silently
  substituted.** The first blog card's reference photo is a 4-person
  conference-room meeting (laptops, a wall screen reading "Commercial break
  in progress", a red cup) — the asset the user supplied for this slot,
  `pexels-ai25studio-8837570 1.jpg`, is a *different* 3-person meeting
  (three people in hijabs around a round table with houseplants, already
  used elsewhere as `why-tile-1.jpg` on the landing page's Why section).
  The other two supplied "resources" assets (`pexels-edwin-mandries-
  2152983550-36627633 3.jpg`, `luke-chesser-JKUTrJ4vK00-unsplash 1.jpg`)
  were pixel-confirmed exact matches for cards 2 and 3. A quick search of
  every not-yet-used file in `vodex assets/` for a better match (tried
  `austin-distel-tLZhFRLj6nY-unsplash 1.jpg`, `samuel-regan-asante-
  h7Sk4Ap07k0-unsplash 1.jpg` — neither matches either) didn't turn up the
  actual reference photo. Since the user explicitly supplied
  `pexels-ai25studio-8837570 1.jpg` *for this section*, it was used for
  card 1 anyway (`debt-collection-blog-1.jpg`) rather than blocking the
  build on it — but this is a known, real mismatch, not a verified match
  like the other 14 assets on this page. **If the correct conference-room
  photo turns up later, swap `public/assets/debt-collection-blog-1.jpg`
  only** — nothing else about the card needs to change.
- **The Industries 6-card grid's assets required per-photo visual
  verification, not filename-order assumption** — same lesson as every
  earlier asset-mapping pass in this file. Two of the six user-supplied
  filenames turned out to require disambiguation from same-named siblings
  already used elsewhere (`pexels-karola-g-4968385 1.jpg` for "Buy Here Pay
  Here", `pexels-szymon-shields-1503561-10178729 1.jpg` — not the
  already-used `… 2.jpg` — for "Banks & Lending"), and the "Why Vodex"
  section's 3 photos were supplied in an order that does **not** match the
  PDF's card order (user list: giorgio-trovato, davegarcia, roberto-hund;
  actual card order: roberto-hund → "Consistent Outreach", giorgio-trovato
  → "Operational Scalability", davegarcia → "Effortless Compliance") —
  caught by opening each file and visually matching it against its PDF crop
  before writing the page, not by trusting supplied order.
- **FAQ, EnterpriseBand, FinalCta reused verbatim** — same byte-identical-
  copy precedent already confirmed for every other page in this file (§11
  "Sections 8-9", §12 "Faq, EnterpriseBand, FinalCta reused verbatim", §13,
  §14). No changes to any of the three.

### Asset → component map

| Slot | Source (`vodex assets/`) | Destination |
| --- | --- | --- |
| Hero bg | `lu-KEYuGr18XE4-unsplash 1.jpg` | `debt-collection-hero-bg.jpg` |
| Stat band bg | `Frame 2147227651.jpg` (same source as landing page's `case-study-bg.jpg`) | `debt-collection-stats-bg.jpg` |
| Why Vodex — Consistent Outreach | `pexels-roberto-hund-5356720 3.jpg` | `why-vodex-1.jpg` |
| Why Vodex — Operational Scalability | `giorgio-trovato-_geAgtjqLzY-unsplash 1.jpg` | `why-vodex-2.jpg` |
| Why Vodex — Effortless Compliance | `pexels-davegarcia-32642489 2.jpg` | `why-vodex-3.jpg` |
| Industries — Buy Now Pay Later (BNPL) | `pexels-julio-lopez-75309646-29502356 1.png` | `debt-collection-industry-1.png` |
| Industries — Medical & Healthcare | `pexels-roman-muntean-369190311-14513059 1.jpg` | `debt-collection-industry-2.jpg` |
| Industries — Buy Here Pay Here (BHPH) | `pexels-karola-g-4968385 1.jpg` | `debt-collection-industry-3.jpg` |
| Industries — Credit Card Payments | `ali-mkumbwa-AEz70PS5eSU-unsplash 1.jpg` | `debt-collection-industry-4.jpg` |
| Industries — Insurance Collections | `pexels-mikhail-nilov-7734599 1.jpg` | `debt-collection-industry-5.jpg` |
| Industries — Banks & Lending | `pexels-szymon-shields-1503561-10178729 1.jpg` | `debt-collection-industry-6.jpg` |
| Integration banner bg | `Frame 2147227676.jpg` | `debt-collection-integration-bg.jpg` |
| Blog card 1 | `pexels-ai25studio-8837570 1.jpg` — ⚠️ known mismatch, see above | `debt-collection-blog-1.jpg` |
| Blog card 2 | `pexels-edwin-mandries-2152983550-36627633 3.jpg` | `debt-collection-blog-2.jpg` |
| Blog card 3 | `luke-chesser-JKUTrJ4vK00-unsplash 1.jpg` | `debt-collection-blog-3.jpg` |
| Cert badges (×6) | *(reused, no new copy)* | existing `footer-cert-{iso,hipaa,fdcpa,regf,tcpa,soc2}.png` |

### Round 2 — two user-reported fixes

The user pasted two screenshots after the first pass and flagged both
directly; both were re-measured against the reference rather than
eyeballed:

- **`SolutionCertRow` badges were far too small.** Shipped at `height: 48px`
  — copied straight from the Footer's own `.certBadge` value without
  re-measuring this section's own reference crop first (the Footer's 48px
  is a different, denser context: 8 badges in one dense footer row). A
  fresh crop of the reference PDF at this row's actual y-position measured
  the badges at **~128–130px diameter**, nearly 3× larger. Fixed to
  `height: 128px` (96px at ≤900px, 64px at ≤640px), with a comment in the
  CSS specifically warning not to re-shrink it to match the Footer without
  re-measuring — this is the second time in the project an asset shared
  with the Footer needed a different size in its new context (the first was
  the logo-canvas-padding bug documented in §11's Round 2).
- **`SolutionIntegration`'s section had `padding-block: 0 96px`** — 0 top
  padding, copied from `SolutionWhyUs`/`SolutionBlogCards`, where 0 is
  correct because the section immediately before them is already a *light*
  section ending in its own white bottom padding. Here, though, the
  section immediately before is `SolutionWorkflows` (dark `var(--ink)`
  background, used for this page's "Industries" grid) — so 0 top padding
  meant the dark Industries section's own dark bottom padding ran directly
  into this banner's dark photo with **no visible white break between
  them**, reading as one continuous dark block. A fresh crop of the
  reference confirmed a real ~135px white gap between the two sections.
  Fixed to `padding-block: 88px 96px` (56px 64px at ≤560px). **General
  lesson**: a `padding-block: 0 …` copied from another component is only
  safe when the *actual* previous section in the page (not just "some
  previous section" in the abstract) shares this section's own background
  color — check the real neighbor each time a section is composed into a
  new page, don't copy the pattern by rote.
- Both re-verified against the reference PDF crop (badge size, white-gap
  height) and via a fresh Playwright pass at 1516/1280/430px — zero console
  errors, zero overflow, both fixes visually confirmed matching.

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` after both Round 2 fixes.
Playwright-verified at 1516/1280/430px (scroll-and-wait-for-`img.complete`
method, per the gotcha documented in §12) — zero console errors, zero
404s, zero horizontal overflow at any width. Every new section's live
screenshot compared directly against its own PDF crop: Hero, stat band,
cert row (now correctly sized), Why Vodex (all 3 photos + icons),
Industries (all 6 photos, correct titles/descriptions), integration banner
(now correctly spaced from the section above; heading/lead/CTA/right-column
pills all confirmed), and blog cards (cards 2–3 exact photo matches, card 1
the known-mismatched asset) all confirmed to match. Corner-radius checked
by zoomed-pixel crop for every new surface (stat cards, Why Vodex cards,
Industries cards, integration banner, blog cards) — all sharp, no
exceptions this round (unlike `WhatYourTeamGets` on the Product Page, which
is deliberately rounded).

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's review, in particular of (1) the known blog
card 1 photo mismatch — either supply the correct conference-room photo or
confirm the current one is acceptable, and (2) the `SolutionWorkflows`
eyebrow/heading prop-drive, since it's a change to an already-shipped,
shared component (Pages 1–3 were re-verified unaffected — same default
props, same rendered output — but flagging per this project's rule of
calling out edits to previously-approved code). When building Solution Page
5 (Collection Software, the last of the 5 Footer-declared routes), check
its own PDF's section lineup from scratch rather than assuming it matches
any of Pages 1–4 — four data points now, and each of the four has had at
least one structural surprise (Page 2: none really, closest to a pure
replica; Page 3: a 7-panel industry strip instead of a 3-card grid; Page 4:
an entirely different section lineup with three new components).

---

## 16. Solutions Page 5 — Collection Software

> Reference: `D:\litlabs\Vodex\Vodex - Solutions_Page (0.5).pdf` — 4548 ×
> 32525pt = a 3× export of a **1516 × 10841.7px** artboard, same convention
> as every other PDF in this project. Confirmed to be the **"Collection
> Software"** entry from `Footer.tsx`'s 5-route Solutions list (previously
> the last remaining 404) — H1 "Add compliant, API-first Voice AI into your
> debt collection software", Footer copy "Collection Software". Route:
> **`/solutions/collection-software`**. Per explicit user instruction, this
> page was analyzed and planned in full before any code was written
> (measured section-by-section from a 24dpi render + pixel-scanned
> container/gap widths), not built section-by-section from assumption.

### What was actually verified before building

This PDF has a **structurally unique lineup**, closer in spirit to Page 4
(Debt Collection) than to the pure-replica Pages 1–3 — confirmed by reading
the full `pdftotext -layout` dump and cropping every section before writing
any component:

```
Hero → How the integration works (4 steps) → Why add a voice layer
  → Key capabilities (3 cards) → Four core workflows (4 cards)
  → Impact on both sides of the platform (2×3 stats) → Compliance
  controls, built in → Faq → EnterpriseBand → FinalCta → Footer
```

- **No Comparison or Security sections at all** — this page targets
  *software platforms integrating Vodex*, not an end-customer industry, so
  the copy and structure diverge from the Pages 1–3 template more than any
  prior solutions page.
- **"How the integration works"** is the user's own flagged exception
  ("similar to what we have built on home page") — confirmed by direct
  comparison to be the `Resources.tsx`/`WhyItWorks.tsx` card pattern (photo
  top, light `#f4f4f4` body, title + description + hairline divider + dark
  "Read More" pill), just 4 columns instead of 3/4, full 1440px container
  (not a narrower inset band — pixel-scanned edges at x=87→1430 relative to
  a 1344px measured span, matching WhyItWorks' own 1344px convention almost
  exactly), and — new for this card shape — a closing cross-sell line
  ("Running a collections operation? → Debt Collection") beneath the grid,
  which neither `Resources` nor `WhyItWorks` has.
- **"Why add a voice layer"** is a new two-panel comparison, structurally
  adjacent to `SolutionComparison` but genuinely different: the whole
  section is a **dark `var(--ink)` section** (not light), there is **no "VS"
  badge** between the panels (just a measured ~32px gap, pixel-scanned:
  left panel 82→740, right panel 772→1432 at the 1516 artboard — an almost
  exact 50/50 split), and each panel's bullet list uses the brand's own
  `Waveform` icon (`components/ui/icons.tsx`, already used in every page
  badge) as the marker glyph, not `CheckIcon`/`XIcon`. A single hairline
  divider sits under the two-panel band, and there is **no closing
  cross-sell line for this section specifically** (confirmed by checking
  the PDF text between this section's band and the next section's eyebrow —
  nothing there).
- **"Key capabilities"** is `SolutionIndustries` reused verbatim in
  structure — same 3-card, `#f4f4f4`-body, unboxed-icon shape, same closing
  line — but under a **different eyebrow/heading** ("Platform" / "Key
  `capabilities`" instead of "Core features" / "Industries that Benefit").
  `SolutionIndustries` had these hardcoded; both are now optional props
  defaulting to the original literals, so Pages 1–3 need no changes (same
  "prop-drive once a second real divergent instance exists" precedent
  already used for `SolutionWorkflows`' eyebrow/heading in §12/§15).
  **The 3 cards are a direct, confirmed reuse of the Promise-to-Pay page's
  own Industries photos** (`pexels-yankrukov-7794003 1.jpg`,
  `pexels-davegarcia-32642489 1.jpg`, `pexels-aboodi-17396096 1.jpg`) under
  the same 3 titles (Debt Collection Firms / Lending & Financial Services /
  Utilities & Telecom) with new description copy — confirmed by direct
  visual comparison, not assumed from the title match alone.
- **"Four core workflows"** looked at first glance like `SolutionWorkflows`
  (dark section, same eyebrow/heading/lead pattern, same 1327px band), but
  a close crop of one card revealed the card *shape* is actually the
  `SolutionIndustries`/`WhyItWorks` light-body pattern (photo + `#f4f4f4`
  body + title + description + divider + Read More), **not** the scrim-
  overlay style every prior `SolutionWorkflows` usage has — confirmed by
  cropping a single card at 2× and comparing pixel-for-pixel against both
  card shapes before deciding. Rather than fork a new component for what is
  otherwise identical section chrome, `SolutionWorkflows` gained a
  `variant?: "scrim" | "panel"` prop (default `"scrim"`, so Pages 1–4 are
  byte-identical in output), a `columns?: number` prop (default 3, this
  page passes 4), and an optional `closing` prop (`{text, linkText, href}`)
  since this instance's closing line — "Want the collections team view?
  See how agencies and lenders use Vodex" — is real per-page copy, not the
  "Running a collections operation?" boilerplate every other closing line
  on this page reuses.
- **"Impact on both sides of the platform"** is a new pattern: a light
  section wrapping a **full-width (1440px, pixel-scanned xmin 37/xmax
  1476), sharp-cornered dark inset box** that holds **two groups of 3 stat
  cards**, each group under its own small pill label, separated by a single
  vertical hairline divider — distinct from `SolutionResults` (a full-bleed
  *photo*-background band with 3 bare cards, no grouping/divider). New
  component `SolutionImpact.tsx`. **The PDF's own group labels are
  identically "For banks, agencies & lenders" on both sides** — given the
  section heading is explicitly "Impact on **both sides**" and the lead
  line separately calls out "banks, collection agencies, lenders, **and the
  software providers who serve them**," the duplicate label is treated as
  the same class of broken/mismatched PDF content already established
  throughout this file (FAQ, Compliance chips below) and the second group's
  label was corrected to **"For software providers"** rather than
  reproduced verbatim — flagged here specifically because every other
  "measure, don't invent" case in this project left the mismatched text
  alone; this one was corrected because the section's own heading and lead
  directly contradict the duplicate and no plausible verbatim reading of
  "for banks, agencies & lenders" twice makes sense as "both sides."
- **"Compliance controls, built in"** is a new pattern: a light section
  wrapping a dark inset band (same 1327px family) containing a
  `flex-wrap`, centered row of **white pill-shaped chips** (icon + label,
  no photos, no description) — visually unrelated to `SolutionSecurity`'s
  4-photo scrim-card grid used on Pages 1–4. New component
  `SolutionCompliance.tsx`, new `LockIcon` (`components/ui/icons.tsx`,
  same `strokeIcon` convention as every other icon in this file). **All 5
  chips in the PDF read the identical placeholder text** ("Script locking &
  audit trails" ×5) — the same class of broken/leftover content as this
  project's FAQ rewrite precedent (§7) — so 5 real items were written,
  grounded in compliance facts already established elsewhere on the site
  (TCPA/FDCPA/Reg F, SOC 2/ISO 27001, encrypted recordings, consent
  capture); flagged as invented/pending review, not from the PDF.

### Asset mapping — one real mismatch caught and fixed mid-build

Per the user's framing ("other sections are [assets from elsewhere], so
copy that instead"), **every photo on this page except the hero is a reuse
of an asset already used elsewhere in the project** — confirmed true after
mapping, not assumed going in. A perceptual-hash matcher (`numpy`, average-
hash over a 16×16 grayscale downsample, cosine-normalized MSE) was written
specifically for this page to search the full `vodex assets/` pool against
crops of each PDF card photo, since eyeballing ~100 candidate files
one-by-one had already produced one wrong answer earlier in the same
session (see gotcha below) — every low-confidence hash match was still
individually opened and visually confirmed before use, never trusted on
score alone.

| Slot | Source (`vodex assets/`) | Notes |
| --- | --- | --- |
| Hero bg | `michael-bourgault-aHetdmuNoO4-unsplash 1.jpg` | supplied directly by the user for this slot |
| Step 1 — Plug in via API | `pexels-cottonbro-6804594 1.jpg` | man at dual monitors, code visible — unused elsewhere |
| Step 2 — Configure flows | `image 1025.jpg` | abstract cube/geometric render — see gotcha below |
| Step 3 — Launch campaigns | `samuel-regan-asante-h7Sk4Ap07k0-unsplash 1.jpg` | "GO VEGAN FOR £1M?" mural — previously *tried and rejected* as a candidate for the Debt Collection page's blog-1 slot (§15) and left unused there; genuinely belongs here instead |
| Step 4 — Sync outcomes back | `microsoft-copilot-Zcp8xN9DnjM-unsplash 1.jpg` | already `lead-qualification-workflow-3.jpg` (§14) — intentional reuse |
| Voice layer — right panel bg | `magicpattern-iAR6yhCkrxc-unsplash 1.jpg` | same source as `comparison-vodex-bg.jpg` / `promise-to-pay-comparison-bg.jpg` — third reuse of this texture |
| Capability 1 — Debt Collection Firms | `pexels-yankrukov-7794003 1.jpg` | already Promise-to-Pay's `promise-to-pay-industries-1.jpg` (§13) |
| Capability 2 — Lending & Financial Services | `pexels-davegarcia-32642489 1.jpg` | sibling of the already-used `…2.jpg` (§13) |
| Capability 3 — Utilities & Telecom | `pexels-aboodi-17396096 1.jpg` | already Promise-to-Pay's `promise-to-pay-industries-3.jpg` (§13) |
| Workflow 1 — Payment Reminders | `brooke-cagle-TS1H4Tllz54-unsplash 1.jpg` | already `why-works-1.jpg` (§11) |
| Workflow 2 — Promise to Pay Capture | *(reuses the Step 2 file, `image 1025.jpg`)* | the PDF genuinely repeats this exact graphic in both slots — confirmed by direct visual comparison, not a copy-paste bug |
| Workflow 3 — Right Party Contact | `docusign-7RWBSYA9Rro-unsplash 1.jpg` | already `why-works-3.jpg` (§11) |
| Workflow 4 — Dispute Triage | `image 1026.jpg` | already `why-works-4.jpg` (§11), flat illustration |

All copied as fresh, page-specific files under `collection-software-*`
names (workflow-2 intentionally points at the already-copied `step-2.jpg`
file rather than duplicating identical bytes a second time within the same
page — the "independently swappable" precedent from §14 is about *pages*
sharing a source, not one page reusing its own already-copied file twice).

**⚠️ Gotcha hit and fixed mid-build: a batch contact-sheet mislabeled one
asset, and it shipped before being caught by screenshot review.** To
identify ~9 unknown photos quickly, a Python script pasted thumbnails of
~20 candidate files into one grid image with filename captions. That sheet
mislabeled `Frame 2147226753.jpg` as the abstract-cubes render (it is
actually a waving American flag — `Frame 2147226754.jpg` is a similar
Indian flag; neither is used anywhere on this page) — the real cubes image
is `image 1025.jpg`, exactly as CLAUDE.md's own §11 table already recorded
for a different slot. The wrong file was copied into
`collection-software-step-2.jpg` and only caught by the first live
Playwright screenshot showing a flag where "Configure flows" should be.
Root cause, worth generalizing: **a batch grid script that renames files to
disk (`f.replace(" ", "_")`) and then re-lists the directory to caption
them re-sorts alphabetically, decoupling each thumbnail from the caption
meant for it** — every filename that was ultimately trusted was one either
(a) confirmed by opening it *individually* with a fresh `Image.open(exact
filename)` call rather than reading a position out of a grid, or (b) scored
by a perceptual-hash search that returns `(score, filename)` pairs directly
with no intermediate re-listing step. **If a future asset-matching pass in
this project uses a contact-sheet/grid image again, either skip the
disk-round-trip (paste thumbnails straight from the already-open `Image`
objects, in the same loop, at the same index used for placement) or treat
every grid-sourced identification as a hypothesis to re-confirm with a
single direct `Image.open` + view before it's copied into `public/assets`
— a hash-search top result close to zero (e.g. 0.02–0.2) was reliable every
time it was individually re-opened in this session; a grid label was not.**
Also worth keeping: `Frame 2147226753.jpg` and `.754.jpg` (both flags, both
2600×1290) are not used anywhere in this project — don't reach for them by
filename proximity to the icon `Frame 2147227660-666.png` files (Final CTA
icons, unrelated numbering block).

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (all 9 solutions-family
routes + `/` + `/products` build together with zero errors). Playwright-
verified at 1516px (scroll-and-wait-for-`img.complete`, per the gotcha
documented in §12) and 430px — zero console errors, zero horizontal
overflow at either width, confirmed via `document.documentElement
.scrollWidth <= clientWidth`. Every new/extended section's live screenshot
compared directly against its own PDF crop after the asset-mismatch fix
above: Hero, How the integration works (4 cards + closing line), Why add a
voice layer (both panels, waveform bullets, no VS badge, hairline divider),
Key capabilities (reused `SolutionIndustries` under new eyebrow/heading),
Four core workflows (new `panel` variant, 4 columns, custom closing line),
Impact (two stat groups + divider, corrected second-group label), and
Compliance (5 pill chips, dark inset band) all confirmed matching. Mobile
430px pass confirmed: voice-layer panels stack to 1 column, capability/
workflow card grids stack to 1 column, Impact's two groups stack with the
vertical divider hidden, Compliance chips wrap into a centered column —
nothing overflows or clips.

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's review, in particular of (1) the corrected
"For software providers" Impact group label (a deliberate deviation from
the PDF's literal duplicate text — see the reasoning above, and confirm
with the user if they'd rather see the literal duplicate reproduced
instead, consistent with every *other* mismatched-copy case in this
project being left verbatim), and (2) the 5 invented Compliance chip
items. This closes out all 5 Footer-declared Solutions routes — every
`/solutions/*` link in `Footer.tsx` and the navbar's `SolutionsMegaMenu`
now resolves instead of 404ing. The `/solutions` parent hub page itself
(linked by the mega-menu's "View all solutions" and the plain navbar link)
is still not built — a pre-existing gap carried forward from §12–§15, not
introduced here.

---

## 20. Resources — Research (`/resources/research`)

> Reference: `Vodex - Resources -_ Research.pdf` — 4548 × 28091pt = a 3×
> export of a **1516 × 9364px** artboard, same convention as every other
> PDF in this project. Both `Footer.tsx` and `ResourcesMegaMenu.tsx`
> already declared `Research → /resources/research` before this page
> existed (previously a 404) — same situation every other Resources page
> was in before being built.

### Current progress

Full page built end to end: Hero → "Where this work began" (timeline) →
"Why we built our own TTS" (4 cards) → "Voices that feel human" (3 cards)
→ "Fast enough to interrupt" (latency banner) → "What comes next"
(Roadmap, reused `SolutionWorkflows`) → `EnterpriseBand` → `FinalCta` →
`Footer`. **This is the first Resources page with no FAQ section** —
confirmed by reading the full `pdftotext -layout` dump top to bottom; the
PDF genuinely skips from the Roadmap cards straight to Enterprise Band.

Analyzed with this project's established method (`pdftoppm -r 24` full
render, `pdftotext -bbox` for exact y-coordinates, `pdftoppm -r 96`
section crops, plus pixel-level bounding-box analysis via a Python/PIL
script for the two genuinely new layouts — the timeline and the voice
cards — rather than eyeballing proportions off a crop) before writing any
component.

### Implementation decisions

- **Three sections are copy-adapts of existing patterns, one is reused
  verbatim, two are genuinely new** — same mix-of-strategies precedent
  already established across the Resources/Solutions family (§16-§19):
  - `ResearchTts.tsx` is `WhyItWorks.tsx`/`.module.css` (Product Page,
    §11) copy-adapted almost 1:1 — confirmed via crop to be a
    near-pixel-exact match (same header pattern, same 1344px 4-column
    grid, same photo/`#f7f7f7`-body/divider/dark-pill-"Read More" card
    shape). Only the header copy, card content, and `Read More` hrefs
    (`/resources/research#<slug>` in-page anchors — no per-topic detail
    page exists) differ.
  - `ResearchLatency.tsx` is `SolutionIntegration.tsx`/`.module.css`
    (Solutions Page 4, §15) copy-adapted: same `max-width:1327px` inset
    banner, same absolute eyebrow pill, same
    `grid-template-columns: minmax(0,1fr) minmax(0,420px)` split. The one
    real structural difference: the right column renders **2 white stat
    cards** (italic serif brand-orange number + label, reusing
    `CaseStudyFeatured`/`CaseStudyCard`'s `.statNumber` treatment — the
    crop's numerals are visibly italic/slanted, not `SolutionResults`'
    plain bold sans) instead of `SolutionIntegration`'s pill-list
    `items: string[]`. `title` is a single string/`ReactNode`, not
    `SolutionIntegration`'s two-line `titleLines: [string,string]` tuple —
    this reference's heading is genuinely one line ("Fast enough to
    interrupt").
  - The Roadmap section (`"What comes next"`) is **`SolutionWorkflows`
    reused verbatim with zero new code** — confirmed via crop and a
    direct text/asset diff against `app/solutions/debt-collection/page.tsx`
    that this section is byte-identical to that page's first 3 Industries
    cards (same titles, same descriptions word-for-word, same photos:
    shopping/mastercard phone, surgeon, cash handoff). Passed as
    `variant="scrim"` (default), `columns={3}`, custom `eyebrow`/`heading`/
    `lead`, and the 3 workflow entries duplicated locally in
    `app/resources/research/page.tsx` (the source `INDUSTRIES` array lives
    in a page file and isn't/shouldn't be exported) — same "duplicate a
    small array locally rather than import across page boundaries"
    precedent as §12's Comparison closing line and §13's shared Comparison
    lead. No `closing` prop — confirmed the PDF has no cross-sell line
    after this section (unlike the 3 sections before it, which each do).
  - `ResearchTimeline.tsx` and `ResearchVoices.tsx` are genuinely new
    patterns — no existing component in the codebase matches either.
- **`ResearchTimeline`'s geometry was measured with a Python/PIL
  bounding-box script against the reference crop, not eyeballed** — a
  first pass estimating proportions by reading pixel coordinates off the
  *displayed* (scaled-down) crop image produced a rough 578px image-width
  estimate; re-measuring by detecting the actual non-white pixel runs in
  the source PNG (excluding the header text band) gave image width ≈599px
  and a photo aspect ratio of ≈1.7-1.76 across all three timeline photos —
  used `aspect-ratio: 7/4` (1.75) as the clean fraction closest to the
  measured average. Same script located the central vertical line at
  artboard x≈751, confirming it's centered in the existing 1344px
  inset-band convention (`WhyItWorks`/`ResearchTts`), not a bespoke width.
  **If a future section in this project needs precise proportions from a
  busy or low-contrast crop, prefer this bounding-box-detection approach
  over reading coordinates off a scaled preview image** — the preview-based
  estimate was off by ~30% here.
  - Structure: a `.rows::before` pseudo-element draws the single vertical
    line; each `.row` is a 2-column grid (`media`/`content`) with a
    dedicated `<span className={styles.dot}>` as a third, absolutely
    -centered child (`left:50%; top:50%`) — not nested inside `.content`,
    so its centering is independent of which side holds the photo.
    Alternation uses the same `data-reverse` attribute + CSS grid-column
    override technique `Solutions.module.css` already established for its
    alternating use-case rows (§8) — media/content are always rendered
    media-first in JSX; `data-reverse="true"` (row 2 only) swaps their
    grid columns.
  - **⚠️ Mobile bug hit and fixed during verification, not left latent**:
    the desktop reversed-row rule pins both `.media` and `.content` to
    `grid-row: 1` (needed for the 2-column single-row desktop layout). The
    first mobile media query only reset `grid-column` back to `1` for the
    single-column stack, not `grid-row` — so on the reversed row (2021),
    both children stayed pinned to the same `grid-row: 1` and rendered
    literally on top of each other (confirmed via a 430px Playwright
    screenshot showing the "2021" tag pill overlapping the cube-render
    photo). Fixed by adding `grid-row: auto` alongside the mobile
    `grid-column: 1` override. **If any future alternating-row component
    sets an explicit `grid-row` on its reversed variant for a multi-column
    desktop layout, the mobile single-column override must reset that
    `grid-row` too, not just `grid-column`** — resetting only the axis
    that changes between desktop/mobile is exactly what caused this bug.
    Re-verified post-fix with a fresh 430px screenshot: all three rows
    stack image-then-tag-then-title-then-description cleanly, no overlap.
- **`ResearchVoices`' three portrait assets are already alpha-cutout
  transparent PNGs** (confirmed by opening each file — no flat background
  to mask or crop), so the "photo bleeding into a solid color panel" look
  needed no CSS masking: each `next/image` is absolutely positioned to the
  card's bottom-right with `object-fit: contain`, and the card's own solid
  `var(--ink)`/`var(--brand)` background shows straight through the
  transparent edges. Card row measured via the same PIL bounding-box
  method: full **1440px container** (not the 1344px inset band the other
  new sections use), 3 columns, ~14px gaps, card `aspect-ratio: 8/5`
  (measured ≈1.58, closest clean fraction).
  - **Card mapping required opening each portrait file and matching it
    against the crop — the user's listed file order did not match the
    PDF's Shreya/Shweta/Aastha order.** Confirmed by inspection:
    `pexels-kindelmedia-7688183` → Shreya, `pexels-rdne-7648321` → Shweta,
    `pexels-mikhail-nilov-9159682` → Aastha (the user's message listed
    kindelmedia/mikhail-nilov/rdne, in that order — not the correct
    per-person mapping).
  - **Cards are not clickable links** — same reasoning as `VideoCard`'s
    documented precedent (§17): there is no real per-voice detail page, so
    the diagonal arrow (`ExternalLinkIcon`, reusing the exact glyph
    `SolutionWorkflows` already uses) is a decorative affordance only
    (rendered outside any `<Link>`), not a fake link to nowhere.
- **Two mismatched/reused-looking eyebrows, built verbatim per this
  project's established "measure, don't invent" rule** (same treatment as
  every prior mismatched-eyebrow case in §12/§15): Section 2's eyebrow
  reads **"Debt Collection"** despite the content being company history,
  not debt collection. (Section 6's "Roadmap" eyebrow, by contrast,
  actually fits its own content here — noted only for completeness, not a
  correction.)
- **"Learn More About Integerations" typo fixed to "Integrations"** in
  `ResearchLatency`, per this project's established typo-correction
  convention (§12/§13/§15's own precedents). The button links to
  `/solutions/collection-software` — a real, already-built page about
  API/integrations, not a placeholder.
- **Latency banner background image confirmed by direct visual
  comparison, not the user's suggested first option**: the user offered a
  choice of `lu-KEYuGr18XE4-unsplash 1.jpg` or
  `michael-bourgault-aHetdmuNoO4-unsplash 1.jpg`; only the latter's fence-
  post line across the field matches the reference crop pixel-for-pixel —
  `lu-KEYuGr18XE4` has no fence and different hills. Copied as a fresh,
  page-specific `research-latency-bg.jpg` rather than referencing the
  existing `lead-qualification-hero-bg.jpg` copy of the same source file,
  per the established "independently swappable" precedent (§14/§15).
- **Hero background is a placeholder, per explicit user instruction**
  ("use any hero bg for now") — reuses `results-bg.jpg` directly via
  import (already used once before as the FAQ page's hero bg), no new file
  copied. Same placeholder-pending-real-art status as Section 9's call
  sample audio elsewhere in this project.
- **No `lib/research.ts` data module** — unlike Blog/Videos/Case Studies
  (§16-§19), which need `getFeatured`/`getGrid`/`getBySlug` helpers for
  filtering and per-item detail pages, this page has neither: content
  arrays live inline in each new component, matching the
  `WhyItWorks`/`SolutionWorkflows`/`CoreFeatures` precedent for single-use
  static content.

### Asset → component map

| Source (`vodex assets/`) | Destination | Slot |
| --- | --- | --- |
| *(reused, no new file)* `results-bg.jpg` | — | Hero bg (placeholder) |
| `pexels-cottonbro-7858287 1.jpg` | `public/assets/research-timeline-1.jpg` | Timeline — 2020 |
| `pexels-googledeepmind-25630343 1.jpg` | `public/assets/research-timeline-2.jpg` | Timeline — 2021 |
| `Signbaord_Mockup 1.png` | `public/assets/research-timeline-3.png` | Timeline — Today |
| `image 1030.jpg` | `public/assets/research-tts-1.jpg` | TTS — Orpheus core architecture (GitHub screenshot, confirmed by opening the file) |
| `image 1025.jpg` | `public/assets/research-tts-2.jpg` | TTS — 21,000+ hours (cube render) |
| `pexels-egorkomarov-27141312 1.jpg` | `public/assets/research-tts-3.jpg` | TTS — Zen-Tokenizer inside (orange waveform) |
| `jumping-jax--TfwQjOWEp8-unsplash 2.jpg` | `public/assets/research-tts-4.jpg` | TTS — Narrowband and wideband (magenta/orange waveform) |
| `pexels-kindelmedia-7688183 1.png` | `public/assets/research-voice-shreya.png` | Voices — Shreya |
| `pexels-rdne-7648321 1.png` | `public/assets/research-voice-shweta.png` | Voices — Shweta |
| `pexels-mikhail-nilov-9159682 1.png` | `public/assets/research-voice-aastha.png` | Voices — Aastha |
| `michael-bourgault-aHetdmuNoO4-unsplash 1.jpg` | `public/assets/research-latency-bg.jpg` | Latency banner bg |
| *(reused, no copy)* `debt-collection-industry-{1,2,3}.{png,jpg}` | — | Roadmap cards (via `SolutionWorkflows`) |

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (`/resources/research`
included in the route list). Playwright-verified at 1516px and 430px
(scroll-and-wait-for-`img.complete` method, per the gotcha documented in
§12) — zero console errors, zero horizontal overflow at either width. The
mobile timeline overlap bug (above) was caught by this same 430px pass and
fixed, then re-verified with a fresh screenshot. Every new section's live
screenshot compared directly against its own PDF crop (produced during
planning: full-page render, plus dedicated crops of the timeline, TTS
cards, voice cards, and latency banner) — layout, spacing, card treatment,
and the fence-post background match all confirmed.

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's review of the full page, in particular: (1)
the placeholder hero background (real art still pending), (2) the invented
`Read More` anchor hrefs on the TTS cards (no per-topic detail pages
exist yet), and (3) the non-clickable Voices cards (same "no detail page
yet" reasoning as Videos, §17 — revisit if per-voice pages get built
later). This is the 5th of 5 Resources routes the mega menu/Footer
declared — `Blog`, `Videos`, `Call Samples`, `Case Studies`, and now
`Research` — all resolve instead of 404ing. `/resources` itself (the bare
hub the Navbar link points at) still 404s — a pre-existing gap carried
forward from §16-§19, not introduced here.

---

## 21. Resources — Compliance (`/resources/compliance`)

> Reference: `Vodex - Resources -_ compliance.pdf` — 4548 × 20150pt = a 3×
> export of a **1516 × 6716.7px** artboard, same convention as every other
> PDF in this project. `Footer.tsx` already declared a "Compliance" link
> before this page existed — but in its **Product** column pointing at
> `/compliance` (matching this PDF's own footer render, which also places
> it there, not under Resources). Built at the route the user specified,
> **`/resources/compliance`**, with the nav wiring updated per the user's
> explicit choice (see below) rather than left at the PDF-literal
> `/compliance`.

### What was measured before building

Rendered at 24dpi (1:1 with the artboard) plus pixel-scanned card/gap
boundaries via a Python/PIL script, same "measure, don't eyeball" method as
every other page in this file. Confirmed section-by-section from the render
that this page is **7 sections, no Comparison/Security-chip pattern reused
from the Solutions pages** — it has its own two new card grids instead:

```
Hero → Certifications & frameworks (6-card grid) → Security practices
  (4-card grid) → Data protection questions (DPO banner) → Built for
  enterprises (EnterpriseBand) → Ready to supercharge... (FinalCta) → Footer
```

### Implementation decisions

- **Hero reuses `SolutionHero` verbatim** (no component changes). Badge
  "Compliance & Security", H1 "Every call inside the `rules`" (one italic
  accent word), lead verbatim, CTA priority "Talk To Our Expert"
  (primary/filled) / "Schedule a Demo" (secondary/outline) — confirmed from
  the PDF crop, matching the Lead Qualification/Promise-to-Pay/FAQ priority,
  not the landing/product hero's inverted one.
  - **Hero background was changed mid-build from the initially-planned
    `security-1.jpg` to `debt-collection-hero-bg.jpg`.** The PDF itself is
    flat black here (no photo) — the user said "use any hero bg for now" —
    but a first pass with `security-1.jpg` (the Zoom H1 recorder photo)
    put the recorder's bright LCD screen directly behind the H1/lead text,
    visibly hurting contrast (confirmed via a Playwright screenshot crop,
    not just suspected). Swapped to `debt-collection-hero-bg.jpg` (a dark,
    tonally flat dusk field photo, already used for the Debt Collection
    page's own hero and reused again for Call Samples, §18) specifically
    because its uniform darkness reads cleanly under white text at any crop
    position — re-verified via the same screenshot-crop method after the
    swap. **If a future placeholder hero photo is ever flagged as low-
    contrast, check a real screenshot crop of the rendered text over it
    before shipping** — this is the first time in the project a placeholder
    hero background needed correcting for readability rather than just
    "any photo will do."
- **`components/sections/ComplianceCertifications.tsx`** — new 6-card grid
  (3 columns × 2 rows), its own measured container (**≈1311px**, centred —
  doesn't match any existing container token in this project, e.g. not the
  1344px WhyItWorks convention or the 1327px inset-band family), ≈418px
  cards, ≈28px gap, **sharp corners** (confirmed by a 10x corner-pixel zoom
  crop — no rounding). Cards are a genuinely new shape, not a copy of any
  existing card pattern: a large circular certification badge (measured
  ≈96px) sits above a bold title and description, with **no photo, no
  divider, no "Read More" button** — unlike every other card grid in this
  project, which pairs a photo with a divider+button.
  - Badges are **the same 6 assets already in `public/assets/`** —
    `footer-cert-{iso,soc2,hipaa,fdcpa,regf,tcpa}.png`, today rendered at
    48px in `Footer.tsx`'s dense badge row — sized up to 96px here per the
    user's explicit "make sure the logos are big and readable," since this
    section is their own visual anchor rather than a dense supporting row.
    Order matches both the PDF and `Footer.tsx`'s existing `CERTIFICATIONS`
    array order already (ISO, SOC2, HIPAA / FDCPA, Reg F, TCPA) — no
    reordering needed this time (unlike the Debt Collection page's cert
    row, §15, which needed a different order against the same asset set).
  - Closing cross-sell line ("Running a collections operation? See Vodex
    for Debt Collection" → `/solutions/debt-collection`) duplicated locally,
    same precedent as every other Solutions/Resources page.
- **`components/sections/ComplianceSecurityPractices.tsx`** — new 4-card
  grid, copy-adapted from `WhyItWorks.tsx` (Product Page, §11) almost
  1:1 (photo top, `#f7f7f7` body, title, description, hairline divider,
  dark "Read More" pill + `ArrowRight`) — confirmed via crop to be the same
  card shape. Container **1344px** matches `WhyItWorks`/`SolutionSecurity`'s
  existing convention exactly; gap **12px** matches `SolutionSecurity`'s own
  measured value (tighter than `WhyItWorks`' 24px) — both pixel-scanned off
  this page's own PDF crop, not assumed from either donor.
  - 4 cards: **Encryption everywhere** (`image 1030.png`, a GitHub repo
    screenshot, pixel-confirmed exact match), **Role-based access control**
    (`image 1025.jpg`, an abstract 3D cube/sphere render — **intentional
    reuse**, already used elsewhere as the Product Page's "Configure
    flows" panel and the Collection Software page's step-2/workflow-2,
    §16; also, coincidentally, the same source file `/resources/research`'s
    own TTS section reuses for a different caption, §20 — two Resources
    pages built independently both reached for the same supplied photo
    pool, not a conflict), **Multi-factor authentication**
    (`pexels-egorkomarov-27141312 1.png`, an orange waveform on a DJ/audio
    device screen, pixel-confirmed exact match), **Audit-ready records**
    (`jumping-jax--TfwQjOWEp8-unsplash 2.jpg`, a magenta/orange soundwave
    graphic — **intentional reuse**, already the Promise-to-Pay page's "PTP
    Negotiation Paths" workflow card background, §13). All 4 copied as
    fresh, page-specific files (`compliance-security-{1,2,3,4}.{png,jpg}`)
    rather than referencing another page's copy directly, same
    "independently swappable" precedent as every other cross-page asset
    reuse in this project.
  - Same closing cross-sell line as the Certifications section, duplicated
    locally again.
- **`components/sections/ComplianceDpoBanner.tsx`** — new one-off
  component (not prop-driven — only one instance needed, per this
  project's "prop-drive only once a second real instance exists" rule): a
  dark (`var(--ink)`) inset banner, **≈1184px wide, sharp corners**
  (confirmed by zooming into both the top and bottom corners at 8x — no
  rounding, verified independently at both edges), centred eyebrow pill +
  H2 (one italic accent word) + lead + a single dark pill CTA with a
  `MailIcon` + `dpo@vodex.ai` as a `mailto:` link. Closest existing
  relative for the mailto-button idiom is `FaqHumanSupport.tsx`'s "Email
  us" card, but the single-centred-banner shape here (vs. a 2-card grid)
  is new.
  - **⚠️ Eyebrow corrected from the PDF's literal "Named Voices" to "Data
    Protection"**, per explicit user confirmation (asked rather than
    assumed, since this project's default for a mismatched eyebrow is to
    leave it verbatim — e.g. Industries' "Core features," Comparison/
    Results' "Comparison," Security's "Resources," all documented in
    §12/§15/§16 — but "Named Voices" has no plausible connection to a DPO
    contact section at all, unlike those, which were at least generic
    enough to leave alone). This is the first mismatched eyebrow in the
    project actually rewritten rather than reproduced-and-flagged — treat
    it as a one-off exception, not a precedent to silently apply to the
    still-verbatim mismatches on the Solutions pages.
- **EnterpriseBand and FinalCta reused verbatim**, same "Sections 8-9"
  precedent used on every other page in this project — confirmed
  byte-identical copy via the render crop.
- **Nav wiring, per the user's explicit answers** (asked via
  `AskUserQuestion` before writing any code, since Footer's pre-existing
  link and the requested route disagreed on which nav group "Compliance"
  belongs to):
  - `Footer.tsx`'s existing Product-column "Compliance" link had its `href`
    repointed from `/compliance` to `/resources/compliance` — **stays in
    the Product column**, matching the PDF's own footer render, only the
    destination changed (same "point the nav at the real page once it
    exists" precedent as Call Samples §18 and FAQ §20).
  - **Also added** to `ResourcesMegaMenu.tsx`'s `RESOURCES_ITEMS` array
    (`LockIcon`, already existing — added originally for the Collection
    Software page's compliance chips, §16, reused here for a strong
    semantic fit) — the user chose to wire it into both places rather than
    only repointing Footer's existing link.

### Asset → component map

| Source (`vodex assets/`) | Destination | Slot |
| --- | --- | --- |
| *(reused, no new file)* `debt-collection-hero-bg.jpg` | — | Hero bg (placeholder, swapped in for contrast — see above) |
| `image 1030.png` | `public/assets/compliance-security-1.png` | Security practices — Encryption everywhere |
| `image 1025.jpg` | `public/assets/compliance-security-2.jpg` | Security practices — Role-based access control (reused source) |
| `pexels-egorkomarov-27141312 1.png` | `public/assets/compliance-security-3.png` | Security practices — Multi-factor authentication |
| `jumping-jax--TfwQjOWEp8-unsplash 2.jpg` | `public/assets/compliance-security-4.jpg` | Security practices — Audit-ready records (reused source) |
| *(reused, no copy)* `footer-cert-{iso,soc2,hipaa,fdcpa,regf,tcpa}.png` | — | Certifications & frameworks badges |

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (`/resources/compliance`
included in the route list, 25 routes total). Curl smoke-test confirmed
`/`, `/resources/compliance`, and `/resources/faq` all return 200 on a
fresh `next dev` server with no dev-log errors (re-checked `/` and FAQ
specifically since `Footer`/`ResourcesMegaMenu` are shared and were edited
this round). Playwright-verified at 1516/1280/900/430px using the
established scroll-and-wait-for-`img.complete` method (§12/§15 gotcha) —
zero console errors, zero horizontal overflow at every width, both before
and after the hero background swap. A dedicated Playwright hover/click
check confirmed both the Footer's repointed link and the new
ResourcesMegaMenu item resolve to `/resources/compliance` (not just
grepped). Every new section's live screenshot compared directly against
its own PDF crop (cert grid badge size/order/sharp corners, security-
practices card photos/container/gap, DPO banner width/corners) — all
confirmed matching. Dev server stopped cleanly after verification.

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's review of the full page, in particular: (1)
the placeholder hero background (`debt-collection-hero-bg.jpg`, its third
use in the project — real art still pending), (2) the "Named Voices" →
"Data Protection" eyebrow rewrite (a deliberate exception to this
project's usual "leave mismatched eyebrows verbatim" default — flag if the
user would rather see the literal PDF text reproduced instead, for
consistency with every other mismatched eyebrow left alone), and (3) the
invented `Read More` anchor hrefs on the Security practices cards (no
per-topic detail pages exist yet, same placeholder-link convention used
throughout this project).

---

## 21. Company — News (`/company/news`)

> Reference: a mockup screenshot (`Vodex -  -_ News.png`), supplied **"just
> for ref"** — the user explicitly asked for this page to be built with the
> **Blog page's own design** (§16) instead of replicating the mockup's
> literal layout, per direct instruction: "we will use the blog page design
> instead." `Footer.tsx` already declared `News → /company/news` (Company
> column) before this page existed — previously a 404, same pre-declared-
> then-built pattern as every other Company/Resources route in this file.
> `ResourcesMegaMenu.tsx`'s own "News" item (Company group, §17) already
> pointed at the same URL — no menu changes needed.

### What the mockup showed vs. what was built

The mockup's own layout (badge "Newsroom" → H1 "Vodex in the news" → lead →
CTA pair → a "Browse by category" eyebrow/heading → 6 category chips [All /
Press Releases / Funding / Events / Partnerships / Featured In] → a plain
grid of cards with no featured/hero card treatment → a cross-sell line →
Enterprise Band → Final CTA → Footer) was read for structure and category
naming only. Per the user's explicit override, the page was **not** built
to match that flat single-grid layout — it reuses Blog's actual, already-
shipped two-part pattern instead: a two-column **featured** card
(`NewsFeatured`, copy-adapted from `BlogFeaturedPost`) followed by a
filterable **search + category-chip grid** (`NewsExplorer`, copy-adapted
from `BlogExplorer`) — the mockup has neither a distinct featured card nor
a search field, both are intentional additions carried over from the Blog
design per the user's own instruction. `EnterpriseBand` + `FinalCta` were
kept, since the mockup does show both and that matches the established
`CaseStudyFeatured`/`CaseStudyGrid` page shape (§19) already used for a
Resources-family listing page with EnterpriseBand under it (Blog itself
only uses `FinalCta`, no `EnterpriseBand` — deliberately still matched to
what this specific mockup shows for News, since the user only asked to
borrow Blog's *component pattern*, not to drop the Enterprise Band the
reference clearly includes).

### Implementation decisions

- **New, dedicated components — not a generic reuse of the Blog ones** (same
  "copy-adapt, don't force a shared generic component" rule as
  `VideoExplorer`-vs-`BlogExplorer`, §17, and `CaseStudyCard`-vs-
  `BlogPostCard`, §19): `lib/news.ts` (`NewsPost` type, `NEWS_POSTS`,
  `CATEGORIES`, `getFeaturedPost`/`getGridPosts`/`formatDate`),
  `components/ui/NewsCard.tsx` (+ `.module.css`),
  `components/sections/NewsFeatured.tsx` (+ `.module.css`),
  `components/sections/NewsExplorer.tsx` (+ `.module.css`). CSS is a direct
  copy of `BlogPostCard.module.css`/`BlogFeaturedPost.module.css`/
  `BlogExplorer.module.css` — no visual changes, since the user asked for
  Blog's design specifically.
- **`NewsPost` drops Blog's `readMinutes`/`body`/`slug`-detail-page fields**
  — a press item doesn't have a "read time," and no per-article detail page
  was asked for this round (`NewsCard`/`NewsFeatured` link to a plausible,
  not-yet-built `/company/news/[slug]` href, same placeholder-link
  convention as `CaseStudyCard`/the landing page's `Resources.tsx` before
  their own detail routes existed, if ever). `date` is kept and shown via
  its own `formatDate` (no "X min read" suffix, unlike Blog's `.meta` line).
- **Categories are the mockup's own 5 chips** — Press Releases / Funding /
  Events / Partnerships / Featured In — a deliberately different taxonomy
  from Blog's subject-based categories (Debt Collection / AI & Technology /
  Voice Technology, §16), since news items are grouped by announcement
  type, not topic. `NewsExplorer`'s filter logic is otherwise identical to
  `BlogExplorer`'s (AND-combined category + substring title/excerpt/
  category match, `aria-live` result count, dashed-border empty state).
- **Content is explicitly placeholder, per direct user instruction** ("i
  will swap the content later") — 1 featured + 6 grid items across the 5
  categories in `lib/news.ts`. Invented, but grounded where a real fact
  already exists in this codebase rather than fabricated from nothing: the
  featured "funding" item names the actual backers already shown in
  `Footer.tsx`'s "Backed By" row (Unicorn India Ventures, Pentathlon
  Ventures, 100X) instead of inventing new investor names; the
  "Partnerships" item references the real tool integrations already listed
  in the Product Page's `WorksWithTools` section (HubSpot, Twilio,
  VICIdial, §11) instead of claiming an unverifiable new partnership.
  Deliberately did **not** name any real third-party publication for the
  "Featured In" item or any real named conference for the "Events" items —
  unlike a grounded internal fact, a specific outside outlet/event name
  would be an unverifiable claim about a third party, so those two stay
  generic ("an industry roundup," "an upcoming collections industry
  summit") pending the user's real content.
- **All 7 thumbnails reuse existing `public/assets/` photos** — no new
  files copied, consistent with this project's established pattern of
  reusing an existing asset when a page is explicitly a placeholder/mock
  round (e.g. the Videos and FAQ heroes, §17/§20): `results-bg.jpg`
  (featured/funding), `engagement-queue-bg.jpg` (DROS launch),
  `security-4.jpg` (SOC 2/ISO cert announcement), `feature-6.jpg` (industry
  summit), `debt-collection-integration-bg.jpg` (integrations expansion),
  `why-vodex-1.jpg` (webinar), `product-hero-bg.jpg` (press roundup). Hero
  background: `enterprise-bg.jpg`, reused directly via import — not
  previously used as any page's own hero (only inside `EnterpriseBand`'s
  full-bleed photo band), picked for visual variety among this project's
  now-large set of reused hero backgrounds.
- **Hero badge label "Newsroom"** (not "News") and H1 "Vodex in the `news`"
  — taken directly from the mockup's own copy, the one place its literal
  text was kept, since the user's "use blog design instead" note was about
  layout/components, not about discarding the mockup's actual heading
  copy.

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (`/company/news` included,
23 routes total). Curl smoke-test confirmed `/` and `/company/news` both
return 200 on a fresh `next dev` server; server stopped cleanly immediately
after (no hanging process), per the user's explicit "do not keep any
process hanging" instruction this round — no Playwright visual pass was
attempted this round as a result.

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's review, in particular of (1) the decision to
layer Blog's featured-card + search/filter pattern and the Enterprise Band
on top of the mockup's own simpler single-grid layout, (2) the invented-
but-grounded placeholder news items pending real press content, and (3)
whether `/company/news/[slug]` detail pages should be built next (none
exist yet, same "cards link to a plausible but not-yet-real URL" status as
several other listing pages in this project).

---

## 22. Company — About (`/company/about`) + Company navbar mega-menu

> Reference: `Vodex -  -_ About.pdf` — 4548 × 26483pt = a 3× export of a
> **1516 × 8828px** artboard, same convention as every other PDF in this
> project. Alongside the page itself, the user asked for a real **Company**
> mega-menu in the navbar (same CSS-only hover mechanics as
> `SolutionsMegaMenu`/`ResourcesMegaMenu`) so "About" — previously only
> reachable via `ResourcesMegaMenu`'s ad-hoc "Company" sub-group — gets a
> proper home alongside News/Investors/Careers/Contact, consistent with how
> Solutions and Resources already work. `Footer.tsx`'s "About Us" link
> already pointed at `/company/about` from an earlier round — no Footer
> change was needed.

### Three PDF/instruction conflicts, resolved by asking rather than guessing

Per this project's standing "ask, do not assume" rule, three real mismatches
were put to the user directly (`AskUserQuestion`, all three answered before
any code was written) rather than silently resolved either way:

1. **Hero background** — pixel-sampled the reference hero at multiple
   points and confirmed it is genuinely flat `#000000` with **zero**
   texture/gradient (mean/std both ≈0 over a large clean patch), not a
   photo. But the user's own asset instructions said "use any hero bg for
   now," implying a photo. **User's answer: use a photo anyway** — deviates
   from the PDF on purpose. First built with `why-main.jpg` (the "A Team
   that never sleep" photo already used on the landing page's Why bento
   grid, §10) reused as `about-hero-bg.jpg`. **Swapped in a follow-up round**
   to `pexels-szymon-shields-1503561-10178729 2.jpg` per the user's explicit
   pick — a dark, moody institutional-building photo, already reused
   elsewhere in this project as `solution-payment-reminders-hero-bg.jpg`
   (§13) and `blog-hero-bg.jpg` (§16). Copied over the same
   `about-hero-bg.jpg` destination file (no import/code change needed,
   since `app/company/about/page.tsx` already referenced that filename via
   `SolutionHero`'s `bgImage` prop) — a third reuse of this same source
   photo across the site.
2. **Stat #2's duplicate label** — the reference's 4-stat strip reads
   "$3.5M Funding," "**5+ Funding**" (literal duplicate of stat 1's label),
   "30+ Customers & Partners," "25M+ Calls Made." The Vodex-timeline section
   elsewhere on the same PDF says "5+ investor backing," suggesting the
   real intended label is "Investors." **User's answer: keep "Funding"
   verbatim** — reproduce the duplicate as-is, per this project's general
   "measure, don't invent" default (same class of decision as the
   Comparison/Results/Security eyebrow-label mismatches left verbatim in
   §12/§15, not "corrected" like the Impact section's duplicate group label
   in §15 — this project doesn't apply one rule uniformly to every
   mismatch, it asks per case).
3. **Locations section header** — a whole section duplicates "Why we
   exist" / "Our mission and vision" (eyebrow + heading + lead) **verbatim**
   from the real Mission/Vision section above it, but its actual content is
   2 office-location cards (USA/India) with addresses — a clear Figma
   copy-paste of an entire header block onto unrelated content, not just a
   mismatched single word. **User's answer: replace with "Where we are" /
   "Our global offices"** — a new, minimal heading grounded in the actual
   card content below it, plus a new short lead line.

A 4th gap (no dedicated timeline photos were supplied for the 4-entry
"Vodex timeline" story) was resolved the same way: **user's answer: reuse
existing office/team-toned photos** already in `public/assets/` rather than
wait for new ones or invent placeholders.

### Implementation decisions

- **`components/layout/CompanyMegaMenu.tsx` + `.module.css` — new,
  structural copy of `SolutionsMegaMenu`** (single flat 2-column item grid,
  not `ResourcesMegaMenu`'s old two-group layout) — same
  padding-not-margin gap trick, delayed-visibility transition, Escape-blur
  + pathname-change-blur `useEffect` pair, `position: relative` anchor on
  the `<li>`, `z-index: 1` panel. 5 items mirror `Footer.tsx`'s existing
  "Company" column exactly (no new routes invented): About Us
  (`/company/about`, `InfoIcon`), News (`/company/news`, `NewsIcon`),
  Investors & Partners (`/company/investors`, `TrendingUpIcon`), Careers
  (`/careers`, reusing the existing `CaseStudyIcon` — already a literal
  briefcase glyph, see below), Contact Us (`/contact`, `MailIcon`). Panel
  width `460px` (not Solutions' `420px`) — same width `ResourcesMegaMenu`
  needed while it carried this exact "Investors & Partners" label (§17), to
  avoid cramped 2-column wrapping.
  - **No new `BriefcaseIcon` was added, on purpose.** A first draft added
    one for "Careers," but its shape (rounded rect + handle arc + top
    divider line) turned out near-identical to the existing `CaseStudyIcon`
    (`icons.tsx`, doc-commented "Briefcase — case studies") — reusing an
    icon under a new semantic label (same pattern as `PhoneCallIcon` in
    both the Solutions mega-menu and the Solutions-page Industries cards)
    beats shipping two visually-indistinguishable briefcase glyphs under
    different names. If Careers ever needs a visually distinct icon later,
    design one deliberately different from `CaseStudyIcon`, not a near-copy.
- **`components/layout/ResourcesMegaMenu.tsx` simplified back to a single
  flat "Resources" list** — its old `COMPANY_ITEMS` sub-group (About/News/
  Investors & Partners/Contact Us, added in §17 when Company had no menu of
  its own) was removed, along with the `groupDivider` rule in
  `ResourcesMegaMenu.module.css`, and its panel width reverted `460px` →
  `420px` (no longer carries the long "Investors & Partners" label). This
  is a direct, necessary consequence of Company getting its own dedicated
  menu — without it, those 4 destinations would appear in two different
  mega-menus at once.
- **`Navbar.tsx`** — one new dispatch branch in the existing
  `NAV_LINKS.map()` loop (`if (item.label === "Company") return
  <CompanyMegaMenu .../>`), mirroring the Solutions/Resources branches
  exactly. `NAV_LINKS` itself needed no change (`Company → /company` was
  already declared as the trigger href). The mobile hamburger panel needed
  no change either — it already renders every `NAV_LINKS` entry as a flat
  link regardless of desktop mega-menu status.
- **Reused `SolutionHero` verbatim** (no new hero component) — badge
  "About" (default `Waveform` icon), H1 "The team behind the `voice`",
  lead verbatim from the PDF, CTAs "Talk To Our Expert" (primary) /
  "Schedule a Demo" (secondary) both → `/demo`, `bgImage={aboutHeroBg}`.
  Same structural precedent as `app/company/news/page.tsx` (§21).
- **`components/sections/AboutStats.tsx` + `.module.css` — new, copy-adapted
  from `components/hero/TrustStrip.tsx`/`.module.css`**, not from
  `SolutionStatBand` (wrong shape — requires a `bgImage` and renders boxed
  white cards over a photo) or `SolutionImpact` (wrong shape — a grouped,
  dark inset box). Same full-bleed `border-block: 1px solid var(--hairline)`
  strip + `box-shadow: inset 1px 0 0 var(--hairline-strong)` cell-divider
  mechanics as `TrustStrip`, but 4 plain number+label cells instead of 3
  icon+title+note cells — big number styled like `FeaturedCaseStudy`'s
  `.statNumber` (serif italic, brand-orange). Stat #2's "Funding" duplicate
  kept verbatim per the user's confirmed decision above.
- **`components/sections/AboutMissionVision.tsx` + `.module.css` — new,
  prop-driven two-card band, used twice on this page** (`{ eyebrow,
  heading, lead?, cards: [Card, Card] }`, `Card` = `{ title, description,
  href, background: "solid" | "image", bgImage? }`). Built as one shared
  component rather than two near-duplicate ones because the PDF's Mission/
  Vision and Locations sections produce **identical** card-grid pixel
  extents on measurement — same ~1344px inset band, same card proportions —
  confirming they're the same layout pattern with different content, not
  two different designs. Used once for Mission (solid `#000` card) / Vision
  (`about-vision-bg.jpg` — the magicpattern texture, already established
  elsewhere in this project as `comparison-vodex-bg.jpg`/
  `promise-to-pay-comparison-bg.jpg`, §12/§13), and again for the corrected
  "Where we are" / "Our global offices" Locations section (both cards photo
  -backed: `about-location-usa.jpg`/`about-location-india.jpg`, the two
  flag photos). Card "Learn More" arrow reuses the existing
  `ExternalLinkIcon` (the same diagonal-arrow glyph `SolutionWorkflows`/
  `SeeItInAction` already use for overlay-card links), not `ArrowRight`.
- **`components/sections/AboutTimeline.tsx` + `.module.css` — new,
  copy-adapted from `ResearchTimeline.tsx`/`.module.css`** (§20's Research
  page), same "duplicate a small closing-line/whole-section pattern locally
  rather than parameterize the donor component" precedent used throughout
  this project (`ResearchTimeline` itself is zero-props/hardcoded, so this
  follows its exact structure — `.rows::before` center line, `.dot`,
  `.tag` pill, the documented mobile `grid-row: auto` reset fix for
  reversed rows — with its own 4-entry `ENTRIES` array, own eyebrow "Our
  story," own heading "The Vodex `timeline`," own cross-sell line to
  `/solutions/debt-collection`). Unlike `ResearchTimeline`'s entries (which
  pair a short title + longer description), the PDF's 4 timeline entries
  here are each a single bold sentence with no separate description — the
  component reflects that (one `entryTitle` per row, no second text block).
  Alternates `data-reverse` on odd indices (`i % 2 === 1`), matching the
  reference's row-1/row-3 pattern.
- **`components/sections/AboutLeadership.tsx` + `.module.css` — new**, 4-card
  grid, `background: var(--brand)` per card, a small `<Logo height={18}
  className={styles.mark} />` watermark absolute-positioned top-left
  (renders white since `Logo`'s SVG uses `fill="currentColor"` and
  `.mark`'s CSS sets `color: #fff`), circular headshot (`border-radius:
  50%` on a `next/image fill` frame), name (bold white) + role (translucent
  white) below. **Yash Kotak has no supplied photo** — renders a plain
  `rgba(0,0,0,.45)` placeholder circle with no `<Image>`, matching the
  reference PDF itself, which also has no visible photo for him (confirmed
  by inspecting the PDF render directly — not an asset-sourcing gap on this
  project's side).
- **⚠️ Grid-overflow bug found and fixed during verification, not shipped
  latent**: all three new grids (`AboutStats`, `AboutMissionVision`,
  `AboutLeadership`) were first built with plain `grid-template-columns:
  repeat(N, 1fr)`. A Playwright pass at 430px flagged real horizontal
  overflow — `AboutLeadership`'s 2-column mobile grid measured 219.6px per
  card against a 390px available width (2×219.6+16 gap = 455px, well past
  the container). Root cause: a bare `1fr` grid track's automatic minimum
  width is `auto` (its content's min-content size), not `0` — so a track
  whose content is wider than its fair `1fr` share won't shrink below that
  content width, and the grid overflows its container instead. **Fixed by
  changing every `repeat(N, 1fr)` in all three new components to `repeat(N,
  minmax(0, 1fr))`**, the same defensive pattern this project already uses
  elsewhere for exactly this reason (`IntroducingDros`'s
  `minmax(0,1fr) minmax(0,610px)` grid, §8). Re-verified with a
  Playwright DOM scan (`getBoundingClientRect()` against
  `document.documentElement.clientWidth`) confirming zero elements exceed
  the viewport at 430px afterward. **If a future grid in this project ever
  overflows at a narrow breakpoint despite looking correct in the CSS,
  check for a bare `1fr` track holding wide unbreakable/near-unbreakable
  content before assuming the bug is elsewhere** — this is a recurring
  CSS-Grid gotcha, not specific to this page.
- **`app/company/about/page.tsx`** composes: `AnnouncementBar` → `Navbar` →
  `SolutionHero` → `AboutStats` → `AboutMissionVision` (mission/vision) →
  `AboutTimeline` → `AboutLeadership` → `AboutMissionVision` (locations) →
  `EnterpriseBand` → `FinalCta` → `Footer`, following the
  `app/company/news/page.tsx` structural precedent (`metadata` export,
  `<header className="siteHeader">` wrapper).

### Asset → component map

| Source | Destination | Slot |
| --- | --- | --- |
| `magicpattern-iAR6yhCkrxc-unsplash 1.jpg` | `public/assets/about-vision-bg.jpg` | Vision card bg |
| `image 1035.jpg` | `public/assets/about-leader-anshul.jpg` | Anshul Shrivastava headshot |
| `image 1036.jpg` | `public/assets/about-leader-kumar.jpg` | Kumar Saurav headshot |
| `image 1037.jpg` | `public/assets/about-leader-deb.jpg` | Deb Biswas headshot |
| `Frame 2147226753.jpg` (USA flag, confirmed by opening the file) | `public/assets/about-location-usa.jpg` | USA office card |
| `Frame 2147226754.jpg` (India flag, confirmed by opening the file) | `public/assets/about-location-india.jpg` | India office card |
| `pexels-szymon-shields-1503561-10178729 2.jpg` (3rd reuse — also `solution-payment-reminders-hero-bg.jpg`/`blog-hero-bg.jpg`) | `public/assets/about-hero-bg.jpg` | Hero backdrop |
| `public/assets/feature-3.jpg` (existing — reused) | `public/assets/about-timeline-2016.jpg` | Timeline 2016 |
| `public/assets/why-tile-1.jpg` (existing — reused) | `public/assets/about-timeline-2021.jpg` | Timeline 2021 |
| `public/assets/why-works-1.jpg` (existing — reused) | `public/assets/about-timeline-2022.jpg` | Timeline 2022 |
| `public/assets/resources-2.jpg` (existing — reused) | `public/assets/about-timeline-2024.jpg` | Timeline 2024 |

All copied as fresh, page-specific files (never referencing another page's
copy of a shared source directly), same "independently swappable"
precedent as every other asset-reuse case in this file.

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (`/company/about` included).
Playwright-verified at 430/900/1280/1516px on a scratch `next dev` server —
zero console errors at every width; the 430px grid-overflow bug above was
caught by this same pass and fixed, then re-verified clean. Live
1516px screenshot visually compared against the intended design —
hero/stats/mission-vision/timeline/leadership/locations all read correctly
top to bottom. `CompanyMegaMenu` interaction-tested: mouse-hover (shows all
5 items with correct hrefs), and — since Playwright's synthetic
`element.focus()` proved unreliable in this dev-overlay environment (focus
silently reverted to `<body>` within ~100ms, reproduced identically on the
pre-existing `SolutionsMegaMenu` too, confirming it's a test-methodology
quirk and not a component regression) — a **real sequential Tab-key**
walk from `<body>` was used instead, which correctly reached links inside
the open Company panel (`href="/company/about"` reachable via Tab) and
confirmed `Escape` closes the panel afterward (`opacity: 0`). Home page
(`/`) re-verified unaffected (zero console errors/overflow at 1516px)
since `ResourcesMegaMenu`/`icons.tsx` are shared. Dev server was stopped
immediately after each verification pass (process explicitly killed via
its PID, confirmed down via a failed curl) — no hanging process left
running, per the user's explicit instruction this round.

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's review, in particular of the three
confirmed-but-real deviations from the PDF (photo hero instead of flat
black, "Funding" duplicate kept verbatim, "Where we are" / "Our global
offices" replacing the duplicated Mission/Vision header) and of the 4
reused (not dedicated) timeline photos. `/company` itself (the bare hub
the mega-menu trigger and plain navbar link both point at) still 404s —
pre-existing gap, not introduced here, same situation `/solutions` and
`/resources` were in before their own hub pages (still not built either).

---

## 22. Company — Contact Us (`/company/contact`)

> Reference: `C:\Users\Aashutosh\Downloads\Vodex -  -_ Contact US.png` — a
> flat mockup screenshot, not a PDF, but at 4548×22805px it follows the same
> 3× convention as every PDF in this project (4548 / 3 = 1516px artboard),
> so it was cropped and read at 1× scale the same way. `CompanyMegaMenu.tsx`
> and `Footer.tsx` already linked "Contact Us" at `/contact` before this
> page existed (previously a 404) — per the user's explicit request, moved
> under Company to match the `/company/about` / `/company/news` pattern.
> Route: **`/company/contact`**.

### Current progress

Full page built end to end: Hero ("Let's talk") → Departments (6
email-routing cards) → Send us a message (form + photo) → Offices (USA/
India) → `EnterpriseBand` → `FinalCta` → `Footer`, all reused/composed the
same way every other page in this file is.

### Two template-artifact fixes (confirmed, not silently guessed)

Same class of issue this project has caught repeatedly (a leftover "Videos"
badge on three different Resources pages, "Learn More About Integerations"
typo, etc.):
1. The hero badge read **"Newsroom"** — a leftover from a different page's
   mockup. Fixed to **"Contact"**.
2. The form's two buttons read **"SIGN UP"** / **"BACK TO LOGIN"** —
   leftover from an unrelated login/signup template, nonsensical on a
   contact form. Fixed to a single **"Send Message"** submit button.

One lead line under the Offices heading ("The platform drives intelligent,
personalized conversations...") is generic product copy that doesn't
describe visiting an office — flagged per this project's "measure, don't
invent" default, but kept verbatim like every other mismatched-but-
plausible lead in this project (not dropped — it doesn't break the page the
way the login buttons did, just reads generic).

**The India office address was truncated in the reference itself** (the
card's own text overflowed past its photo column: "WeWork, Salarp…",
"Arakere Banner…", "Bengaluru, KA 5…") — a real bug in the mockup, not
reproduced or guessed at. Confirmed with the user; full address used:
**"WeWork, Salarpuria Symbiosis, Arakere Bannerghatta Rd, Bengaluru, KA
560076, India"**.

### Implementation decisions

- **`ContactDepartments.tsx`** is a copy-adapt of `SolutionWhyUs.tsx`/
  `.module.css` (icon-in-title 3-column card, 1344px band, 24px gap,
  `#f7f7f7` body, sharp corners — same donor already used for the Debt
  Collection page's "Why Vodex" cards) — 6 cards (2 rows) instead of 3, and
  the card's bottom control is a `mailto:` pill (email address +
  `ArrowRight`) instead of a "Read More" `Link`. All 6 titles/descriptions/
  addresses (`contact@`, `sales@`, `marketing@`, `partnership@`,
  `careers@`, `dpo@vodex.ai`) are verbatim from the reference. 4 new icons
  added to `icons.tsx` (`ChartBarIcon`, `MegaphoneIcon`, `HandshakeIcon`,
  `CloudLockIcon`) matched to the mockup's own glyphs, same generic-redraw
  convention as every other icon in that file; `PhoneCallIcon` and
  `CaseStudyIcon` (briefcase) already existed and cover General
  Enquiries/Careers.
- **`ContactOffices.tsx`** is a copy-adapt of `SolutionWorkflows.module.css`'s
  always-on scrim-card pattern — 2 cards instead of 3, and the scrim is a
  **colored** gradient (pixel-sampled directly from the reference: USA ≈
  `#004E64`→`#005E77` teal, India ≈ `#004486`→`#005BA6` blue) covering the
  whole card, not a bottom-only black scrim, since the copy sits top-left
  here rather than bottom-left. Both "Learn More ↗" links point at
  `/company/about` — the only real, relevant existing destination (no
  dedicated office pages exist or are planned).
- **`ContactForm.tsx`** is a new client component — this project's first
  real form beyond the non-functional Footer newsletter input. Confirmed
  with the user: **no backend exists anywhere in this project yet**, so
  submission is client-side only (full validation + a real success/error
  UI, a `setTimeout` standing in for a network call) with one code comment
  marking exactly where a real POST/email-service call goes once the user
  picks a backend — do not wire up a network call without asking first.
  - Controlled React state, no form library (this project has zero
    dependencies beyond next/react) — one `validate(values)` function
    returns per-field error strings, checked against a single `values`
    object. First name required (letters/spaces/hyphens/apostrophes),
    last name optional (same charset if provided), email required +
    format-checked, company name required, country required (defaults to
    "United States" to match the reference's shown state), phone optional
    but loosely pattern-checked if non-empty, message required with a
    10-character minimum and a live `n/500` counter.
  - On a failed submit, every field is marked touched (so every error
    shows at once), the first invalid field's wrapper is scrolled into
    view, and its field shell gets a brief CSS shake — no attempt to
    forward a literal DOM focus through `FloatingField`/`Select`, which
    would need ref-forwarding plumbing this single form doesn't otherwise
    need.
  - On success, the button shows a spinner + "Sending…", then the form
    area swaps for a success panel ("Thanks — we'll be in touch shortly."
    + a "Send another message" reset) — never claims the message was
    actually delivered anywhere.
- **New `components/ui/FloatingField.tsx` + `.module.css`** — the shared
  "outlined, notched floating label" field chrome used for every text/
  email/tel/textarea input on the form. Reproduces both states actually
  visible in the reference as one consistent control (not two different
  field designs): label sits as plain placeholder-style text when empty,
  floats to a small notch overlapping the top border once focused or
  filled. Float/error/valid state is driven by React (`data-focused`/
  `data-invalid`/`data-float` attributes), not a CSS-only
  `:placeholder-shown` trick — the form already needs per-field
  touched/valid tracking for inline error messages and a green `CheckIcon`
  fade-in on a validated field, so driving the label the same way keeps
  one source of truth instead of two. Error color uses new `--error`/
  `--success` tokens added to `globals.css` (this project's first form, so
  no semantic validation colors existed yet).
- **New `components/ui/Select.tsx` + `.module.css`** — this project's
  first click/keyboard-driven listbox popover. `SolutionsMegaMenu`/
  `ResourcesMegaMenu`/`CompanyMegaMenu` are hover-only, and
  `IndustryTabs`/`FaqTopics` are tab-lists — neither fits a real form
  control, so this is a genuinely new pattern: a button trigger sharing
  `FloatingField`'s exact field-shell chrome (via CSS Modules `composes`,
  not duplicated CSS), a search input to filter the list, `role="listbox"`/
  `role="option"`, full keyboard support (Arrow Up/Down, Home/End, Enter,
  Escape, type-ahead via the search field), and click-outside-closes.
  Backing data: new `lib/countries.ts` (`{ name, iso2, dial }[]`, ~55
  common countries — generic reference data, not fabricated
  project-specific content). New `ChevronDownIcon` added to `icons.tsx`
  for the trigger.
- **Hero background was swapped mid-build, caught by screenshot review, not
  shipped as first tried.** `case-study-bg.jpg` (a bright orange sunset
  photo) was tried first since the user said "use any hero bg for now" —
  a live screenshot showed the H1's own `.accent` word ("talk", rendered in
  `--brand` orange) was nearly unreadable against the equally-orange
  background. Swapped to `debt-collection-hero-bg.jpg` (dark, tonally flat,
  already used successfully for this exact reason on the Compliance page,
  §21) and re-verified via a fresh screenshot — same "check a real
  screenshot crop of the rendered text before shipping a placeholder hero
  photo" lesson already documented for Compliance, now hit a second time.
  **If a future placeholder hero background is ever picked for a page
  whose H1 has an orange accent word, rule out bright orange/red
  backgrounds specifically before shipping.**
- **Nav wiring**: `Footer.tsx`'s Company-column "Contact Us" and
  `CompanyMegaMenu.tsx`'s "Contact Us" item both repointed from `/contact`
  to `/company/contact` (confirmed via a repo-wide grep that these were the
  only two references before changing either).

### Asset → component map

Every one of the 9 supplied photos was opened and visually matched to its
mockup slot individually (not grid-batched — see the Solutions Page 5
gotcha in §16 about grid-sourced mislabeling); several are intentional
reuses of files already used elsewhere in the project.

| Source (`vodex assets/`) | Destination | Slot |
| --- | --- | --- |
| `pexels-roberto-hund-5356720 3.jpg` | `public/assets/contact-dept-general.jpg` | General Enquiries (already `why-vodex-1.jpg` elsewhere) |
| `pexels-cottonbro-6116892 1.jpg` | `public/assets/contact-dept-sales.jpg` | Sales |
| `pexels-anthonyshkraba-production-8278855 1.jpg` | `public/assets/contact-dept-marketing.jpg` | Marketing |
| `mina-rad-qFSQFSmfZkA-unsplash 2.jpg` | `public/assets/contact-dept-partnership.jpg` | Partnership (already a Promise-to-Pay workflow photo elsewhere) |
| `pexels-shkrabaanthony-7144260 1.jpg` | `public/assets/contact-dept-careers.jpg` | Careers |
| `pexels-divinetechygirl-1181335 1.jpg` | `public/assets/contact-dept-dpo.jpg` | Data Protection Officer |
| `pexels-liuguangxi-9045043 1.jpg` | `public/assets/contact-form-image.jpg` | Send-message side photo (desert dunes) |
| `Frame 2147226753.jpg` | `public/assets/contact-office-usa.jpg` | USA office card (US flag) |
| `Frame 2147226754.jpg` | `public/assets/contact-office-india.jpg` | India office card (India flag) |

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (`/company/contact`
included in the route list). Verified on a scratch `next dev` server via
Playwright at 1516/1280/900/430px — zero console errors, zero horizontal
overflow at every width (scroll-and-wait-for-`img.complete` method, per
the established gotcha in §12). The hero-background contrast issue above
was caught by this same pass and fixed, then re-verified with a fresh
screenshot. Dev server was stopped immediately after verification (process
killed by PID, confirmed down via a failed curl) — no hanging process left
running, per the user's explicit instruction this round.

**Approved:** Nothing yet — not reviewed by the user (explicit "just build
clean, I will verify manually" instruction this round), same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's manual review, in particular of: (1) the
form's placeholder (no-backend) submit behavior — swap in a real endpoint/
email service once one is chosen; (2) the generic/mismatched Offices lead
line, kept verbatim per this project's default rather than rewritten; and
(3) both "Learn More ↗" office links pointing at `/company/about` rather
than a dedicated office page (none exists or is planned). `/terms` and
`/privacy` (linked from the form's legal line) are placeholder links, same
not-yet-built-page convention used throughout this project. `ContactOffices`
is now also reused verbatim on `/pricing` (§23) — it was already
zero-prop/page-agnostic, so nothing below required a second change there.

### Round 2 — 3 user-reported fixes

The user reviewed on their own already-running `next dev` session and
pasted two screenshots, flagging three things directly:

1. **Offices cards: "don't use any overlay color, use original image."**
   The colored teal/blue duotone scrim (`.scrimUsa`/`.scrimIndia`,
   pixel-sampled from the reference) was replaced with a plain **black**
   scrim confined to the left edge only (`linear-gradient(to right,
   rgba(0,0,0,.6) 0%, rgba(0,0,0,.28) 28%, transparent 52%)`), where the
   title/address/"Learn More" all sit — the right ~48% of each card (the
   flag itself) now shows the source photo's real, untouched colors. Text
   legibility is kept via a small `text-shadow` on the copy instead of a
   full-card tint. `ContactOffices.tsx`'s per-office `scrim` field
   (`styles.scrimUsa`/`styles.scrimIndia`) was removed along with the CSS
   classes — the scrim is now identical for both cards. Since `/pricing`
   (§23) reuses `<ContactOffices />` with zero props, this fix applies
   there automatically too.
2. **"Learn More" was wrapping to two lines** — `.learnMore` was missing
   `white-space: nowrap`; fixed.
3. **"Assets... not high quality, looks pixelated."** Diagnosed rather than
   guessed: the source `Frame 2147226753/754.jpg` files are genuinely sharp
   at full resolution (confirmed by cropping a region at native res), and a
   direct `curl` of the Next.js image-optimizer endpoint confirmed it was
   correctly serving a full `1920×953` JPEG, not an undersized one — the
   optimizer pipeline was never the problem. The real cause was the
   **heavy semi-opaque color scrim** (0.82–0.88 alpha) sitting over the
   whole photo: crushing local contrast that way makes ordinary AVIF/WebP
   compression banding far more visible, which reads as "pixelated."
   Fixing #1 above (dropping the full-card color tint) resolves this too.
   As an independent safety margin, `quality={90}` (this project's
   existing convention for prominent photography, e.g. `SolutionHero`'s
   backdrop) was added to the office, department, and form-side images —
   they were shipping at the Next.js default of `75`.
4. **Not explicitly asked for, but caught in the same review pass**: the
   send-message photo (`.imageFrame`) used a fixed `aspect-ratio: 2/3`,
   which let it run shorter than the form column and end well above the
   "Send Message" button/legal links — visibly mismatched bottoms.
   `.layout`'s explicit `align-items: start` was removed (grid's default is
   `stretch`) and `.imageFrame` switched from a fixed aspect ratio to
   `height: 100%` (with a `min-height: 480px` floor) so it stretches to
   whatever height the form naturally takes — verified via bounding-box
   measurement that the image's bottom edge lands within ~2.5px of the
   "Terms and conditions" line's bottom edge. The `<900px` stacked layout
   resets `height: auto` + its own fixed `aspect-ratio: 16/9` (stretch has
   no meaning once the columns collapse to one).
5. **Same `.next`-directory collision documented independently in §23**
   was hit again here first: a second `next dev`/`next build` process
   (mine, on a different port) writing to the same `.next` directory as
   the user's own already-running dev server was corrupting both sessions'
   build caches (`ENOENT`/`MODULE_NOT_FOUND` on manifests). Re-verification
   for this round used a temporary `distDir: ".next-verify"` override in
   `next.config.ts` on a separate port instead, reverted immediately after
   (confirmed via `git status`/`git diff` showing zero net change to
   `next.config.ts`) with `.next-verify` deleted afterward — never touched
   the shared `.next` directory a second time.

Re-verified after all four fixes via the isolated `distDir` server:
`tsc --noEmit` clean, zero console errors and zero horizontal overflow at
1516/900/430px, office-card images visually confirmed sharp/vivid with the
color tint gone, "Learn More" on one line, and the form image's bottom edge
matching the form column's within ~2.5px.

---

## 23. Pricing Page (`/pricing`)

> Reference: `C:\Users\Aashutosh\Downloads\Vodex -  -_ Pricing.png` — a flat
> mockup screenshot, not a PDF, 4548×19877px = a 3× export of a
> **1516×6626px artboard**, same convention as every PDF/PNG reference in
> this project (confirmed via `PIL.Image.size` before cropping). Analyzed by
> cropping/zooming regions with Python/PIL (no `pdftoppm`/`pdftotext -bbox`
> available for a flat PNG) rather than eyeballing a thumbnail — same
> "measure, don't guess" standard as every PDF-sourced page, including
> corner-pixel zooms to settle rounded-vs-sharp corners per section.
> `Navbar.tsx`'s `NAV_LINKS` and `Footer.tsx`'s Product column both already
> pointed "Pricing" at `/pricing` before this page existed (previously a
> 404) — confirmed by reading `Navbar.tsx` directly rather than assumed.

### Current progress

Full page built end to end: Hero → Pricing Plans (5-card grid) → `Faq`
(reused verbatim) → Offices (`ContactOffices`, reused verbatim — see
below) → `EnterpriseBand` → `FinalCta` → `Footer`. Only **one** genuinely
new component was needed — `PricingPlans` — everything else on this page
already existed.

### Two confirmed deviations from the reference (asked, not assumed)

Per this project's "ask, don't assume" rule, both resolved via
`AskUserQuestion` before writing any code:
1. The 5-item feature checklist under every plan card was identical across
   all 5 tiers and read as generic website-builder template copy ("10 Web
   Components", "5 Web Templates", "Component Properties") — the same
   class of leftover-template issue this project has caught repeatedly
   (mismatched "Videos" badges, "Learn More About Integerations" typo,
   etc.). **Rewritten** with real, differentiated, Vodex-grounded features
   per tier (call/agent counts, real integrations already named elsewhere
   on the site — HubSpot/Twilio/Make/VICIdial/HighLevel — RPC verification,
   auto re-dial, compliance tiering). See `PLANS` in `PricingPlans.tsx` for
   the exact 25 bullets (5 tiers × 5 features).
2. The hero badge read **"Newsroom"** — the same mismatched-leftover-badge
   bug already hit on 3+ other pages (Call Samples, Case Studies, News,
   Contact). Fixed to **"Pricing"**.

### ⚠️ A real duplicate-build mistake, caught and fixed before shipping

The Offices section (eyebrow "Offices", H2 "Visit us in *person*", the
exact same lead line, USA/India cards with the exact same addresses, a
"Prefer email…" contact line) was initially built as a **new** component,
`PricingOffices.tsx` — reasoned as new because no such section appeared
anywhere in the portion of CLAUDE.md loaded into context at the start of
this session. Partway through writing this progress note, reading the
**live** CLAUDE.md (which had grown since the session started) surfaced
`ContactOffices.tsx` — built minutes earlier for `/company/contact` — with
byte-identical eyebrow/heading/lead/office data/contact line, and the two
supplied flag assets (`Frame 2147226753/754.jpg`) already copied in as
`contact-office-usa.jpg`/`contact-office-india.jpg`. Confirmed **not** a
coincidental resemblance by screenshotting the live `/company/contact`
page directly and comparing pixel-for-pixel against both the Pricing
reference crop and the just-built `PricingOffices` output — all three
matched. **Fix:** deleted `PricingOffices.tsx`/`.module.css` and the
freshly-copied `pricing-office-usa.jpg`/`pricing-office-india.jpg`
(redundant with the already-existing `contact-office-*.jpg`), and
`app/pricing/page.tsx` now imports `<ContactOffices />` directly — same
zero-prop, page-agnostic reuse already established for
`Faq`/`EnterpriseBand`/`FinalCta`. **If a future page's reference shows a
section that looks close to something already on the site, grep/read
CLAUDE.md's actual current content (not just what loaded into context at
session start) and, ideally, screenshot the candidate existing page before
building a new component — text descriptions alone (e.g. "colored
gradient... copy sits top-left") can read as a different design even when
the rendered result is identical.**

### Implementation decisions

- **`components/sections/PricingPlans.tsx` + `.module.css`** — the only new
  component this page needed. 5-card grid (Free/Starter/Standard/Premium/
  Enterprise), `repeat(5, 1fr)` desktop → `repeat(2, 1fr)` ≤1200px →
  1-column ≤640px.
  - **Rounded corners (~16px)** — a deliberate exception to this project's
    usual sharp-corner cards, confirmed by an 8× corner-pixel zoom of the
    reference (same "measure every card grid on its own terms" rule
    already applied throughout this file — Why/Featured Case Study/
    Resources/ComplianceCertifications are sharp, WhatYourTeamGets and now
    this are the exceptions).
  - **"Popular" / "Best Value" ribbons are the literal supplied images**
    (`Frame 2147227644.jpg` / `Frame 2147227677.jpg` → `pricing-badge-
    popular.jpg` / `pricing-badge-best-value.jpg`) — the gradient, grain
    texture and text are already baked into the asset, so they render as
    plain `next/image`s (natural ~3.6:1 aspect, fixed 30px height) rather
    than being recreated in CSS, per this project's established "the
    supplied asset already bakes in the design" precedent (§8: Section 5's
    dashboard mockup, Section 8's auto-redial banner).
  - **Enterprise card CTA required a new `Button` variant.** `Button.tsx`
    only had `primary`/`secondary`/`light` before this page — added
    `variant="dark"` (`var(--ink)` bg, white text) since a dark pill CTA is
    a genuinely reusable primitive, not a one-off. On the Enterprise card
    itself (also `var(--ink)` background), plain `--ink` would be
    invisible — overridden via a `.cardDark .cta` two-class descendant
    selector in `PricingPlans.module.css`, which reliably outranks
    `Button.module.css`'s single-class `.dark` rule regardless of
    stylesheet bundling order (no `!important` needed).
  - **Green checkmarks are a new, locally-scoped color** — no green token
    exists anywhere else in this project's design system (checkmarks
    elsewhere are always brand-orange or white-on-dark), but the reference
    genuinely uses green here, so `#16a34a` is scoped to
    `PricingPlans.module.css`'s `.checkIcon` only, not promoted to
    `globals.css`.
  - **Micro-interactions/animations, per explicit user request** — all
    plain CSS (`--dur`/`--ease` tokens), consistent with this project's
    "no animation library" stack rule: staggered `Entrance` reveal per
    card (0/70/140/210/280ms); card hover lift (`translateY(-6px)`) +
    shadow + border-color shift to `var(--brand)`; each feature row's
    checkmark scales up with a per-row stagger on card hover
    (`transition-delay: calc(var(--i) * 30ms)`, `--i` set inline per
    `<li>`, same idea as `AudioWaveform`'s per-bar `--i` stagger); a
    continuous diagonal sheen sweep across each ribbon image (reuses the
    exact `sheenSweep` keyframe technique already established in
    `EngagementQueueIllustration` for its active-row treatment).
    Deliberately **no JS price count-up** — this project's stated animation
    policy (§3: "Plain CSS… no library") rules that out for one section.
  - **⚠️ Real bug hit and fixed before shipping: hover transforms silently
    did nothing.** First version put `.card`'s hover-lift `transform` and
    `Entrance`'s reveal animation on the *same* `<article>` element.
    `Entrance`'s `.enter` class runs `animation: rise 700ms var(--ease)
    both` — the `both` fill-mode keeps pinning `transform` to the
    animation's final keyframe value indefinitely after it finishes, which
    silently overrides any `:hover`-triggered transition on `transform`
    targeting that same element (animations take precedence over
    transitions for a property they still hold under a forwards/both fill
    mode). Card `:hover` styles compiled fine and even matched
    (`el.matches(':hover')` was `true` in a Playwright check), but
    `getComputedStyle(el).transform` never changed. **Fix:** split the
    element — `Entrance` now wraps a plain `.cardWrap` (no visual styling
    beyond `height: 100%` to fill the stretched grid cell), and a *nested*
    `<div className={styles.card}>` owns the border/radius/hover-lift
    styling. Same "two animations fighting over one property on one
    element → split into an outer gate + an inner effect" lesson this
    project already documents for `EngagementQueueIllustration`'s
    `sheenWindow`/`sheen` split, just hit here in its `:hover`-vs-`Entrance`
    form for the first time. **If a future component ever pairs
    `Entrance` with a `:hover` transform/opacity/etc. on the exact same
    element, split it the same way up front** — this is generalizable to
    any property `Entrance`'s `rise` keyframe animates (`transform`,
    `opacity`), not just this card.
  - Cross-sell closing line ("Running a collections operation?…") is
    duplicated locally, same precedent as every other Solutions/Resources
    page.
- **Offices section reuses `<ContactOffices />` verbatim** — see the
  duplicate-build mistake writeup above. No prop changes; `ContactOffices`
  was already fully page-agnostic (hardcoded content, no props) the moment
  it was built for `/company/contact`.
- **`Faq`, `EnterpriseBand`, `FinalCta` reused verbatim** — same
  established "Sections 8-9" precedent used on every other page in this
  file. `Faq`'s shipped Q&A content was confirmed genuinely Vodex-relevant
  (not template junk) by reading `Faq.tsx` directly before reusing it.
- **`app/pricing/page.tsx`** follows the exact shell/composition pattern
  every other page in this project uses (`AnnouncementBar`/`Navbar` under
  `<header className="siteHeader">`, then `<main>`, then `<Footer />`,
  static `export const metadata`, no `generateMetadata`). Hero CTAs
  ("Talk To Our Expert" / "Schedule a Demo", both → `/demo`) match the
  exact convention already used identically on all 12 other `SolutionHero`-
  based pages — confirmed by grepping every existing usage before writing
  this page's hero, not assumed.
- **Hero background: `collection-software-hero-bg.jpg`**, reused directly
  via import (no new file), per the user's explicit "use any hero bg for
  now" — picked for being one of the less-reused hero photos in the
  project at the time.

### Asset → component map

| Source (`vodex assets/`) | Destination | Slot |
| --- | --- | --- |
| `Frame 2147227644.jpg` | `public/assets/pricing-badge-popular.jpg` | Standard card ribbon |
| `Frame 2147227677.jpg` | `public/assets/pricing-badge-best-value.jpg` | Premium card ribbon |
| *(reused, no new copy)* `contact-office-usa.jpg` / `contact-office-india.jpg` | — | Offices (via `ContactOffices`) |
| *(reused, no new copy)* `collection-software-hero-bg.jpg` | — | Hero background (placeholder) |

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (`/pricing` in the route
list) both before and after the `ContactOffices` consolidation fix.
Verified via Playwright at 1516/1280/900/430px on a live `next dev`
server — zero console errors, zero horizontal overflow at every width
(the only console noise observed was pre-existing site-wide `<Link>`
RSC-prefetch 404s for not-yet-built routes like `/demo`/`/contact`/
`/solutions`, confirmed present identically on the already-shipped landing
page too, so not a regression from this page). The hover-lift bug above
was caught by a dedicated Playwright interaction check (not just a visual
screenshot pass — `getComputedStyle().transform` before/after a real
`locator.hover()`), fixed, and re-verified the same way, along with the
checkmark-stagger and ribbon-sheen micro-interactions and a
`reducedMotion: "reduce"` emulation (entrance opacity settles at 1, ribbon
sheen's `animation-duration` collapses to ~0, one coherent static frame —
no half-revealed cards). Mobile 430px pass confirmed the 5-card grid
stacks to one column cleanly and the ribbon stays centered.

**⚠️ Environment note, not a code issue:** mid-verification, running this
project's own `next build` + `next start` against the default `.next`
directory while a pre-existing `next dev` server (not started by this
session) was also running against the same directory corrupted that dev
server's build cache (`Cannot find module './611.js'`-type errors). Fixed
by clearing `.next` and restarting the affected dev server cleanly: no
data or code was lost, but **if a `next dev` server is already running
against this project, don't run a separate `next build`/`next start`
against the same default `.next` output directory** — either verify
against the already-running dev server instead, or point a one-off
production check at an isolated `distDir`.

**Approved:** Nothing yet — not reviewed by the user (explicit "just build
clean, I will verify manually" instruction this round), same pending-review
status every section in this file uses before explicit sign-off.

**Next:** Wait for the user's manual review, in particular of: (1) the 25
rewritten, Vodex-grounded plan features (invented but grounded, pending
review like every other invented-but-grounded content block in this
project); (2) the new `Button` `dark` variant and whether it should be
reused elsewhere; and (3) the micro-interactions (hover lift, checkmark
stagger, ribbon sheen) — built per explicit request but not yet seen by
the user in a real browser.

---

## 24. Company — Investors & Partners (`/company/investors`)

> Reference: `C:\Users\Aashutosh\Downloads\Vodex -  -_ Investors.png`, a flat
> mockup export (not a PDF), 4548×25452px = a 3× export of a **1516×8484px**
> artboard, same convention as every other page in this project.
> `Footer.tsx` and `CompanyMegaMenu.tsx` **already declared** "Investors &
> Partners" → `/company/investors` (added when the Company mega-menu was
> built, §22) — the route was already wired into navigation before this
> page existed; it just 404'd. No nav/menu changes were needed for this
> round — the user's request to "move this under Company" was already
> satisfied by existing code.

### Current progress

Full page built end to end: Hero → Timeline of our milestones (5 entries) →
Meet our investors (3 logos) → Our tech partners (3 logos) → Questions
about investing in Vodex? (dark banner) → `EnterpriseBand` → `FinalCta` →
`Footer`. Every section maps onto an existing pattern already in this
project — no section here is a wholly new design:

- **Hero** — `SolutionHero`, reused directly (already prop-driven).
- **Timeline of our milestones** — new `InvestorTimeline.tsx`/`.module.css`,
  copy-adapted from `AboutTimeline.tsx`/`.module.css` almost 1:1 (same
  `.rows::before` center spine, `data-reverse` alternating mechanism, and
  the documented mobile `grid-row: auto` reset preserved verbatim).
- **Meet our investors / Our tech partners** — new prop-driven
  `InvestorLogoRow.tsx`/`.module.css`, copy-adapted from
  `WorksWithTools.tsx`'s per-logo intrinsic-sizing pattern but made
  prop-driven (`eyebrow`/`heading`/`lead`/`logos[]`) since this page needs
  two real instances on one page — the same "prop-drive once a second real
  instance exists" precedent already used for `SolutionIndustries`/
  `SolutionWorkflows` (§13/§15).
- **Questions about investing in Vodex?** — new
  `InvestorContactBanner.tsx`/`.module.css`, copy-adapted from
  `ComplianceDpoBanner.tsx`/`.module.css` (dark banner, sharp corners,
  mailto pill CTA), extended with a background photo + scrim (see below).
- **Built for enterprises / Final CTA / Footer** — reused verbatim, same as
  every other page in this project.

### Decisions confirmed with the user before building (all via `AskUserQuestion`)

1. **Hero badge** reads "Newsroom" in the reference — a leftover from the
   News page mockup, the same class of mismatch already caught and fixed
   on About/Videos/Case Studies/FAQ (§17/§19/§20). Built as **"Investors"**
   per the user's confirmed choice.
2. **Timeline duplicate**: the reference's 4th and 5th entries are
   word-for-word identical ("Launched Vodex 2.0 with 5+ investor backing
   including Google Cloud, MongoDB, and Krisp.", both tagged 2024) — the
   same duplication-artifact class already seen elsewhere in this project
   (AboutStats' "5+ Funding" duplicate, §22). **Kept both verbatim** per the
   user's confirmed choice, matching this project's general "measure,
   don't invent" default rather than inventing a distinct 5th milestone.
3. **Dark banner eyebrow** reads "Named Voices" in the reference — the
   *exact same* mismatched placeholder text already found (and fixed to
   "Data Protection") on `ComplianceDpoBanner`'s near-identical banner,
   where the user explicitly called that fix a one-off, not a precedent.
   **Fixed here too, to "Partnerships"**, per the user's confirmed choice —
   grounded in the section's own content (partnership/investment
   enquiries), not applied automatically just because the earlier fix
   existed.
4. **Google Cloud / MongoDB / Krisp logos**: no usable assets were supplied
   for these three (the reference only shows faint gray outline
   placeholders, confirmed not a rendering artifact — see below) — user
   asked directly whether to fetch these or wait for real files. **Fetched
   official brand logos** from each company's own public brand/press
   assets, per the user's confirmed choice.

### Findings from direct pixel inspection (not eyeballed)

- **Hero background is flat `#000000`** in the reference (confirmed by
  sampling a grid of pixels across the hero band — uniformly `(0,0,0)`
  except the announcement bar/badge/CTA elements), not a photo. The user's
  own instruction ("use any hero ... bg for now") asked for a photo anyway
  — same precedent already set on the About page's hero (§22, "user's
  answer: use a photo anyway") — so the hero uses
  `debt-collection-hero-bg.jpg` (copied as `investors-hero-bg.jpg`) via
  `SolutionHero`'s existing `bgImage` prop. That specific asset was picked
  deliberately (not just "any" photo): it's the same uniformly-dark photo
  already chosen once before *specifically* for text-contrast reasons
  (§21's Compliance hero swap, after a brighter photo there visibly hurt
  legibility) — reused here for the same guaranteed-readable-under-white-
  text property, now its 4th use across the project for that reason.
- **The "Questions about investing" banner is also flat solid color** in
  the reference — confirmed by pixel-sampling a grid across the banner:
  uniformly `(34,29,29)`, no gradient or texture, structurally identical to
  `ComplianceDpoBanner`'s flat `--ink` fill. The user's own instruction
  ("named voice \[bg\]... use any scenic bg from existing") asked for a
  photo here too, so — unlike its donor component, which has never needed
  one — `InvestorContactBanner` adds a background photo
  (`product-hero-bg.jpg`, copied as `investors-contact-bg.jpg`, picked as a
  *different* dark photo from the hero's for variety within one page) layered
  under a `rgba(10,8,8,0.6)` scrim (`.banner::before`) for guaranteed
  contrast — a deliberate new addition to the copy-adapted component, not
  present in `ComplianceDpoBanner` itself.
- **Timeline images are black placeholder rectangles** in the reference
  (no real photos) — filled with 5 existing photos reused from elsewhere in
  `public/assets/` (`feature-1.jpg`, `why-tile-1.jpg`, `action-2.jpg`,
  `results-bg.jpg`, `security-3.jpg`, copied fresh as
  `investor-timeline-1.jpg` … `-5.jpg`), per the user's "use any...
  milestones... bg from existing" instruction.
- **Investor logos**: the user supplied 3 files (`image 1021.png` — Unicorn
  India Ventures, opaque white background baked in, not transparent, but
  harmless since the target section background is also white;
  `image 1022.png` — Pentathlon Ventures, transparent, ~57px of padding
  trimmed off; `image 1023.png` — a hollow/outline wordmark). Cross-checked
  `image 1023.png` against `public/assets/footer-backers.png` (already live
  in the Footer today, §8) via alpha-channel column-run detection — it
  contains the **exact same three logos in the exact same outline style**,
  confirming the outline look is this backer's real, already-shipped brand
  mark, not a placeholder needing a fix. Cross-referencing
  `Footer.tsx`/`lib/news.ts` (§21's News page, which already names Vodex's
  3 backers), this third investor is **"100X"**. Used `image 1021.png`/
  `image 1022.png` directly (copied as `investor-unicorn-india-ventures.png`
  / `investor-pentathlon-ventures.png`); cropped the third logo out of the
  existing `footer-backers.png` instead of reusing `image 1023.png`
  verbatim (`investor-100x.png`, gives a standalone per-logo asset
  consistent with the other two rather than a differently-cropped
  duplicate of the same source). **Superseded in the same round**: the
  user asked to fetch a better 100X logo too, same as the tech partners —
  `100x.vc`'s own homepage source references `/assets/100x-logo.svg`,
  which turned out to be an SVG wrapper around one embedded base64 PNG
  (a `<pattern>`+mask construction that renders blank through `sharp`/
  librsvg, so the PNG was extracted directly from the base64 payload with
  a small Node script instead of rasterizing the SVG). The extracted PNG
  (516×175, full canvas is content, no padding to trim) is the real 100X.VC
  mark in their actual brand red — `investor-100x.png` was overwritten with
  it and the page's `width`/`height` props updated to 516×175 to match.
- **Google Cloud / MongoDB / Krisp**: fetched each company's official SVG
  logo from a public source (Google Cloud and MongoDB from Wikimedia
  Commons' official-logo files — confirmed genuine by their exact brand
  hex codes, `#EA4335`/`#4285F4`/`#34A853`/`#FBBC05` for Google's 4-color
  palette and `#10AA50` for MongoDB's green, plus the MongoDB file's own
  `<title>MongoDB_Logo_FullColorBlack_RGB</title>`; Krisp's from
  `krisp.ai`'s own site source, `img_logo_main.svg`, the file their own
  homepage loads as its logo). Rasterized to PNG via `sharp` (already a
  transitive dependency of `next`) at ~4x the SVG's intrinsic size for
  crispness, since `next.config.ts` has no `dangerouslyAllowSVG` and this
  project has never fed `next/image` a raw SVG before — safer to rasterize
  once at build time than to change a shared config for one page.
- **Closing cross-sell line** under the timeline ("Running a collections
  operation? See Vodex for Debt Collection") is present in the reference —
  reproduced verbatim, matching the standing convention used after every
  other timeline/grid section in this project (§12 onward).
- **Hairline dividers** bracket both logo-row sections in the reference
  (confirmed visually, a thin rule directly above and below each) — same
  `border-block: 1px solid var(--hairline)` convention `TrustStrip` already
  uses for a full-bleed hairline strip; `InvestorLogoRow.module.css` applies
  it per-instance, so the two adjacent rows' shared boundary shows as one
  continuous rule rather than a doubled line.

### New files

- `components/sections/InvestorTimeline.tsx` + `.module.css`
- `components/sections/InvestorLogoRow.tsx` + `.module.css` (prop-driven,
  rendered twice in the page — investors, then tech partners)
- `components/sections/InvestorContactBanner.tsx` + `.module.css`
- `app/company/investors/page.tsx`

### Asset → component map

| Asset | Destination | Notes |
| --- | --- | --- |
| `image 1021.png` | `public/assets/investor-unicorn-india-ventures.png` | opaque white bg, used as-is |
| `image 1022.png` | `public/assets/investor-pentathlon-ventures.png` | padding trimmed to content bbox |
| *(cropped from `footer-backers.png`)* | `public/assets/investor-100x.png` | alpha-preserved crop of the 3rd already-shipped backer logo |
| Google Cloud official SVG (Wikimedia) | `public/assets/partner-google-cloud.png` | rasterized via `sharp` |
| MongoDB official SVG (Wikimedia) | `public/assets/partner-mongodb.png` | rasterized via `sharp` |
| Krisp official SVG (krisp.ai) | `public/assets/partner-krisp.png` | rasterized via `sharp` |
| `feature-1.jpg`, `why-tile-1.jpg`, `action-2.jpg`, `results-bg.jpg`, `security-3.jpg` | `investor-timeline-1.jpg` … `-5.jpg` | existing photos, copied fresh, page-specific |
| `debt-collection-hero-bg.jpg` | `investors-hero-bg.jpg` | reused for contrast (4th use for this reason) |
| `product-hero-bg.jpg` | `investors-contact-bg.jpg` | reused for the contact banner's new photo+scrim |

### A build gotcha hit and fixed this round (worth keeping)

Ran `next build` once to verify, then started `next dev` against the same
default `.next` output directory without cleaning it first — this is
**exactly** the gotcha already documented at the end of §23 (Pricing):
mixing a production build and dev server in one `.next` dir corrupts dev's
manifests (`ENOENT: app-paths-manifest.json` / `routes-manifest.json`),
surfacing as a 500 on every route. Also hit a stale process still holding
the dev port after an earlier `pkill` didn't catch it (Windows child
process not matched by the pattern) — found and killed by PID via
`netstat -ano` + `taskkill /F` instead. Fixed both by killing the stale
port-holder, deleting `.next`, and starting a single fresh `next dev`.
**If `next build` and `next dev` are ever both run in the same session,
always `rm -rf .next` before switching between them** — this is the second
time in this project's history this exact failure mode has been hit.

### Status / Approved / Next

**Status:** clean `tsc --noEmit` + `next build` (`/company/investors`
compiles and is listed in the route output). Playwright-verified at
1516/430px on a clean `next dev` server (scroll-through-then-screenshot,
waiting on every visible `<img>` to finish loading) — zero console errors,
zero horizontal overflow at either width. Live screenshots visually
compared against the reference PNG's own crops: hero contrast, timeline
alternating rows (desktop) and single-column stack with image-first order
(mobile), both logo rows at the larger "big and readable" size, and the
dark banner's new photo+scrim treatment with sharp corners — all confirmed
matching the intended design. Dev server and its port were confirmed
stopped (no hanging process) after verification, per the user's explicit
instruction this round.

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off. User said
"just build clean ... I will verify result manually" this round — treat as
pending their review, same status as every other "build clean" round in
this project.

**Next:** Wait for the user's review, in particular of: (1) the two
scenic-background additions that deviate from the reference's flat-color
hero and banner (both explicitly requested, not assumed); (2) the fetched
Google Cloud/MongoDB/Krisp logos (official brand assets, not supplied
files — confirm they're an acceptable source); and (3) the "Partnerships"
eyebrow fix and the kept-verbatim duplicate 2024 timeline entry, both
already confirmed choices but worth a final look in context.

---

## 25. Global 404 Page

> Reference: a supplied flat illustration,
> `C:\Users\Aashutosh\Downloads\404-concept-with-desert.png` (2000×1614,
> genuine RGBA alpha — confirmed via PIL, not a flat white canvas) — a
> desert scene (orange sun, dark-maroon "404" numerals, cacti, a floating
> sand-island platform) with "Oops! Seems like something went wrong…"
> baked into the artwork as pixels. No PDF, no mockup — user-supplied
> asset only, first genuinely new page in this project with no reference
> document at all beyond the one image.

`app/not-found.tsx` did not exist before this round — confirmed via glob
before building (only route-scoped precedent was
`app/resources/blog/[slug]/not-found.tsx`). Since the root `app/layout.tsx`
renders no chrome of its own (every page composes
`AnnouncementBar`/`Navbar`/`Footer` itself), the new global 404 follows
that one existing precedent's composition exactly:
`<header className="siteHeader"><AnnouncementBar /><Navbar /></header>` →
`<main>` → `<Footer />`.

### Implementation decisions

- **Background is `var(--ink)`, not `var(--bg)`** — a deliberate deviation
  from the blog page's own (light-bg) `not-found.tsx`. The supplied
  artwork's entire palette is warm (orange sun/sand, dark-maroon numerals,
  orange cacti) against a transparent canvas; `var(--ink)` is this
  project's own established "make imagery pop" dark-section token (`Why`,
  `Solutions`, `FinalCta`, `Footer` all use it) and is the genuine
  contrasting choice here — a light background would nearly match the
  PNG's own white canvas and wash the artwork out.
- **`.section` is close to full-viewport height**
  (`min-height: calc(100vh - var(--header-h))`, flex-centered) rather than
  the blog 404's plain `padding-block` block — makes the dark/orange
  contrast the whole point of the page instead of a small text block.
- **⚠️ The supplied image was cropped before use — its own baked-in "Oops!
  Seems like something went wrong…" caption is dark-maroon text, and on
  this page's dark `--ink` background that caption was nearly invisible**
  (confirmed by a real Playwright screenshot showing it as a barely-visible
  smudge, not by eyeballing). Row-gap detection via PIL found the
  illustration itself spans rows 281–1385 of the 1614px-tall source, with
  the caption living in two separate text blocks below that (1487–1533,
  1547–1592) — cropped to just the illustration (`public/assets/
  404-desert-illustration.png`, 2000×1134, with a 15px pad) and dropped the
  caption entirely, since a real, accessible `<h1>Page not found</h1>` +
  lead paragraph already carry that message in legible on-dark text (see
  next bullet) — keeping the baked-in caption too would have been both
  illegible and redundant.
  - **Renamed rather than overwritten in place** (`404-desert.png` →
    `404-desert-illustration.png`) specifically to dodge a stale
    `next/image` optimizer cache entry: the first crop was saved over the
    original filename, and the already-running dev server kept serving the
    old cached optimized image (keyed on url+width+quality, not file
    content) — the ghost caption text was still faintly visible in a
    second screenshot even after the source file was fixed. A fresh
    filename sidesteps the cache entirely; **if a supplied image asset
    ever needs correcting after `next/image` has already served it once
    from a running dev server, rename rather than overwrite the same
    path** — don't assume touching the file content alone invalidates the
    Next.js image cache.
- **A real `<h1>Page not found</h1>` + short lead paragraph were added
  even though the image already says "Oops!…" baked in as pixels** — that
  text isn't selectable or screen-reader-accessible, so the page still
  needs genuine semantic content. Kept deliberately short/different
  wording from the image's own caption (now cropped out anyway) rather
  than restating it.
- **CTA**: `<Button href="/" variant="light" withArrow>Back to Home</Button>`
  — `Button.tsx`'s `light` variant (white pill, `--ink` text) is this
  codebase's established on-dark-section button choice (confirmed against
  `Button.module.css`'s actual variant list: `primary | secondary | light
  | dark`), not `primary` (orange-on-orange would fight the sun/cacti) or
  `secondary` (documented as the "on photography" outline variant, not
  right for a solid `--ink` background).
- **`Entrance`** (`components/ui/Entrance.tsx`) staggers image → h1 → lead
  → CTA at 0/140/200/260ms, same hero-reveal convention used elsewhere
  (e.g. `Hero.tsx`'s badge→H1→lead→CTA stagger) — pure CSS, respects
  `prefers-reduced-motion` via the existing global rule, no new motion
  code needed.
- No new reusable component was extracted — matches the blog `not-found.tsx`
  precedent of a self-contained page + colocated `.module.css`, since this
  is (so far) the only global-scope 404 in the project.

### Status / Approved / Next

**Status:** clean `tsc --noEmit`. Verified against an already-running
`next dev` server (owned by a different process — not started or stopped
by this round, per this project's established "don't touch a dev server
you didn't start" caution) rather than running a separate `next build`,
specifically to avoid the `.next`-directory collision documented at the
end of §23/§24. Hit an unmatched route directly and confirmed a real
`404` HTTP status. Playwright-verified at 1516/430px (scroll-and-wait-for-
`img.complete` method) — zero horizontal overflow at either width, image
renders with genuine transparency against `--ink` (no white box), "Back to
Home" resolves to `/`. One console warning surfaced during verification
(a hydration mismatch on the Footer's newsletter `<input>`'s
`caret-color`) — traced to a browser-injected style with no matching code
anywhere in `Footer.tsx`/the app (grepped, zero matches) and reproduced
only when Playwright's `fullPage` screenshot scrolled through the whole
page, not on a plain page load of the homepage; treated as a Chromium
autofill-heuristic artifact, not a real regression, and not something this
round's code could have caused. No process was left running after
verification (browser closed by the script itself; no separate dev/build
server was started this round).

**Approved:** Nothing yet — not reviewed by the user, same pending-review
status every section in this file uses before explicit sign-off. User
said "just build clean … I will verify result manually" this round.

**Next:** Wait for the user's review of the desert-illustration crop (the
baked-in caption is now gone, replaced by real `<h1>`/lead text) and the
dark-background choice.

---

## 26. Global — Announcement Bar dismiss

> No PDF/mockup — a direct functional fix, prompted by the user flagging
> the shared announcement bar (`components/layout/AnnouncementBar.tsx`,
> rendered identically at the top of every one of the 24+ pages in this
> project) as "not doing the job of banner/announcement" since it had no
> way to close it.

### Implementation

- **`AnnouncementBar.tsx` converted to a client component** (`"use
  client"`) owning `dismissed: boolean` state. A new close `<button>`
  (plain `XIcon` from `icons.tsx`, `aria-label="Dismiss announcement"`)
  sits as a sibling of `.inner`, absolutely positioned at
  `right: var(--page-x)` — the same page-edge inset every other section
  aligns to — rather than inline in the centered flex row, since the
  reference screenshot shows it pinned to the bar's far right edge, not
  next to "Learn More".
- **Dismissal persists via `localStorage`** (`vodex-announcement-dismissed`
  key), confirmed with the user directly (asked rather than assumed:
  persist-across-visits vs. session-only) — this is the project's first
  use of `localStorage` anywhere. Both the read (on mount, in a `useEffect`)
  and the write (on click) are wrapped in try/catch, since private
  browsing / blocked storage can throw; a failed read just leaves the bar
  visible, a failed write just means the dismissal doesn't survive reload
  — no user-facing error either way.
- **SSR still always renders the bar** (`dismissed` starts `false`) — the
  `useEffect` check runs after hydration, so a returning user who
  previously dismissed it sees a brief flash of the bar before it
  collapses. Accepted as standard/expected for this pattern rather than
  engineered around (e.g. no inline anti-flash `<script>`), consistent
  with this project not having any other pre-hydration state-read
  mechanism.
- **Collapse is a plain CSS `max-height`/`opacity` transition** on `.bar`
  (`var(--dur)`/`var(--ease)`, a `.dismissed` modifier class sets both to
  `0`) rather than an abrupt unmount — no JS animation, consistent with
  §3's "plain CSS, no library" rule. Governed by the existing global
  `prefers-reduced-motion` override in `globals.css` with no new
  component-level handling needed — verified via Playwright
  `reducedMotion: "reduce"` emulation that the collapse lands on the final
  0/0 state almost immediately after click rather than animating.
  `Navbar`'s `position: sticky; top: 0` needed no change: sticky
  positioning is computed from the scroll container, not a fixed offset,
  so once the bar collapses out of normal flow the nav simply sits at the
  top of the viewport — confirmed via a real bounding-box check
  (`nav.getBoundingClientRect().top === 0`) immediately after dismiss.
- At the ≤480px breakpoint, `.inner` gained `padding-right: 32px` (close
  button width + clearance) so the centered tag+link content never runs
  under the absolutely-positioned close button at narrow widths, even for
  unusually long text — belt-and-braces on top of the fact that the
  centered content is already narrower than the available space at every
  tested width.
- **A real timing gotcha hit during verification, not a code bug**: an
  early Playwright check waited only 300ms after `page.reload()` before
  reading the bar's computed style and saw it still mid-transition
  (`max-height` partway between 44px and 0) — misread at first as "the
  dismissed flag isn't being read on mount." Adding a temporary
  `console.log` inside the mount effect confirmed `localStorage.getItem`
  *was* returning the persisted value correctly on every reload; the
  effect was just firing later than 300ms post-`load` in this dev-mode
  environment (React DevTools + HMR client overhead). Increasing the
  post-reload wait to ~1s resolved it — not a race condition in the
  shipped code, just an under-provisioned test wait. **If a future
  Playwright check in this project reads computed style/state
  immediately after a reload and gets an unexpected mid-value, suspect
  the wait being too short for hydration/mount effects before suspecting
  the component logic.**

### Status

Clean `tsc --noEmit`. Playwright-verified on a scratch `next dev` server
(started and stopped cleanly by this round, no hanging process): fresh
visit shows the bar; clicking or Enter-keying the close button collapses
it and pins `Navbar` to the viewport top; a reload in the same browser
context stays dismissed (`localStorage` persisted); a fresh browser
context (simulating a new visitor / cleared storage) shows the bar again;
`reducedMotion: "reduce"` emulation collapses near-instantly with no janky
animation; 430px and 900px screenshots confirm no overlap between the
close button and the tag/message/link at any width. The one console
message observed (`Failed to load resource: 404`) is the already-
documented, pre-existing `/dros` route not existing yet (same class of
RSC-prefetch 404 noise already flagged as non-regression in §23) — the
"Learn More" link's destination, unrelated to this round's change.

**Approved:** Not yet reviewed by the user.

**Next:** Wait for the user's review of the dismiss placement/behavior.

### Round 2 — full-viewport hero sections left a gap after dismiss

The user reported (with a screenshot) that dismissing the banner left a
blank white strip at the bottom of a full-viewport hero. Root cause:
`--header-h` (`globals.css`, `calc(var(--announce-h) + var(--nav-h))` =
108px) is a **static** token, baked in at CSS-parse time — every
full-viewport section anchored to it (`Hero.module.css`, `ProductHero
.module.css`, `SolutionHero.module.css` — all `min-height: calc(100vh -
var(--header-h))` — plus `ArticleHeader.module.css` and both
`not-found.module.css` files, which use it in `padding-block`) kept
subtracting the full 108px even after the announcement bar visually
collapsed to 0px, so the section's `min-height` stayed short by exactly
the bar's 44px — the blank strip the user saw.

**Fix, not a per-component patch**: `AnnouncementBar.tsx` now sets
`data-announcement-dismissed="true"` on `<html>` once the collapse is
visually done, and `globals.css` gained one rule —
`html[data-announcement-dismissed="true"] { --header-h: var(--nav-h); }`
— right after `.siteHeader` (`app/globals.css`). Every section above
reads `--header-h` via `var()`, so they all shrink to fill the newly-
available space automatically; nothing in `Hero`/`ProductHero`/
`SolutionHero`/`ArticleHeader`/either `not-found` page needed touching.
**If a future section anchors its own sizing to `--header-h`, it gets
this fix for free — no new wiring needed.**

- **Timed to the actual collapse, not a magic duration.** The attribute is
  set from an `onTransitionEnd` handler on `.bar` itself (checked against
  `e.target === barRef.current && e.propertyName === "max-height"`, so the
  simultaneous `opacity` transition firing its own `transitionend` doesn't
  double-fire the logic) rather than a `setTimeout(fn, 220)` guessing
  `--dur`'s value — if `--dur` or the easing ever change, this still fires
  at exactly the right moment, and it fires correctly-fast under
  `prefers-reduced-motion` too (verified: attribute flips to `true` and
  `--header-h` reads `64px` within ~300ms of a reduced-motion click, vs.
  the normal ~220ms + a hair of scheduling overhead otherwise).
- **The mount-effect's cleanup removes the attribute on unmount.**
  `AnnouncementBar` isn't hoisted into `app/layout.tsx` — every page
  composes its own copy inside its own `<header className="siteHeader">`
  (confirmed by checking `app/layout.tsx`, which renders only
  `{children}`) — so a client-side route change unmounts the old page's
  `AnnouncementBar` and mounts a fresh one. Without the cleanup, a
  previously-dismissed session's `--header-h: 64px` override would still
  be sitting on `<html>` for a split second before the new page's own
  mount effect re-derives it, which is harmless in practice (the new
  page's effect always resolves the same way within one more
  collapse-transition), but removing it on unmount keeps the attribute
  from ever describing a page that isn't actually rendering a collapsed
  bar.
- **Confirmed via bounding-box math, not just the CSS variable's raw
  value**: on `/products` at a 1516×900 viewport, before dismiss the hero
  section's bottom edge sits at `y=900` because `min-height: calc(100vh -
  108px)` plus the 108px header above it already summed to the full
  viewport; after dismiss, `--header-h` reads `64px`, the hero's own
  `min-height` recomputes to `836px` (`900 - 64`), and — critically — its
  bottom edge **still** lands at exactly `y=900`, i.e. the gap that used
  to be 44px of blank space is now 0. Re-confirmed the same way after a
  `localStorage`-persisted reload (mount → read → collapse → transitionend
  → attribute set, all over again, landing on the same `64px`/`0px gap`
  result) and under `reducedMotion: "reduce"`.
- **Broader regression pass**: `/`, `/products`,
  `/solutions/payment-reminders`, `/resources/faq`, `/pricing` at
  1516px/430px, banner dismissed on each — zero console errors (excluding
  the pre-existing, unrelated `/dros`/`/demo`-style RSC-prefetch 404 noise
  already documented as non-regressions elsewhere in this file), zero
  horizontal overflow, `--header-h` correctly reads `64px` post-dismiss on
  every one of the 10 checks.

**Status:** Clean `tsc --noEmit`. Dev server started and stopped cleanly
this round (verified down via a failed `curl` on its port afterward) —
no hanging process.

**Approved:** Not yet reviewed by the user — same pending-review status as
the dismiss feature itself above.

### Round 3 — the reload itself still looked "shaky"

The user reported, after Round 2 shipped: *"when i close the banner and
reload again, the banner shows for 1 sec, it closes, the white space is
shown and then it is gone... it looks shaky."* Root cause: SSR has no
knowledge of `localStorage`, so a hard reload always server-renders the
bar fully visible; only after hydration did the (then-`useEffect`-based)
mount logic read `localStorage` and trigger the real collapse animation —
so a returning, already-dismissed visitor watched a flash → an animated
collapse → a gap (until `--header-h` caught up) → a snap, all inside
~1s. Each piece worked correctly in isolation; strung together on load it
read as janky. **This reverses Round 1's explicit decision** ("no inline
anti-flash `<script>`... consistent with this project not having any
other pre-hydration state-read mechanism") — flagged directly rather than
leaving that paragraph stale, since the user's concrete complaint outranks
the earlier hypothetical.

A Plan subagent validated the fix approach before it was built (confirmed
against the actual Next.js docs, not assumed) — two things from that
review were load-bearing, not optional polish:

- **The blocking-script mechanism had to change mid-implementation, caught
  by testing, not assumed correct from docs alone.** First built with
  `next/script strategy="beforeInteractive"` (the officially documented
  primitive for this). Verified via `curl` against the raw served HTML
  (`next dev` **and** an isolated production build, `next.config.ts`'s
  `distDir` temporarily pointed at `.next-verify` per the established
  §23/§24 collision-avoidance method, reverted immediately after with a
  `git diff` confirming zero net change) that Next.js's own
  `beforeInteractive` implementation streams the actual `<script>` tag in
  via a `self.__next_s.push(...)` call physically placed just before the
  trailing webpack chunk loader — near the **end** of `<body>`, not
  literally in `<head>` as the name suggests. It still runs before
  hydration, but a Playwright filmstrip proved that isn't the same
  guarantee as "before first paint": on `next dev` specifically (extra
  HMR/DevTools scripts ahead of it in the stream widen the window), a real
  mid-transition `max-height` value (e.g. `19.6px`) was captured
  immediately after `page.reload()` — i.e. the browser painted the
  undismissed bar at least once, `.bar`'s own always-on `transition`
  property then animated the correction, reproducing the exact flash the
  fix was supposed to remove. **The isolated production build, tested the
  same way, showed zero flash** — so this was a real but dev-mode-only
  gap, not a fabricated one; still worth closing, since dev mode is what
  gets manually reviewed. **Fix:** dropped `next/script` entirely in favor
  of a hand-written `<script id="announcement-dismissed-init">` placed as
  the literal first child of `<body>` in `app/layout.tsx` (before
  `{children}`) — an ordinary parser-blocking inline script always
  executes synchronously exactly where the parser encounters it, so as
  the *first* thing in `<body>`, it now runs before literally anything
  else there, including whatever Next.js injects itself, regardless of
  dev vs. prod. Re-verified with the same filmstrip method: 7/7 samples
  across the first ~200ms of a reload already showed the bar collapsed and
  `--header-h` already at `64px`, first sample at 9ms. **If a future
  anti-flash script in this project ever needs a stronger guarantee than
  `next/script beforeInteractive` provides, don't assume the strategy name
  means what it sounds like — verify the actual served HTML's script
  placement via `curl` first**, the same lesson as several other
  "measure, don't assume" findings elsewhere in this file, just applied to
  Next.js's own tooling instead of a PDF/mockup this time.
  - Duplicates the same `localStorage` key / `data-*` attribute literal
    strings `AnnouncementBar.tsx` uses, on purpose rather than imported —
    this script has to be a plain string reachable before any client JS
    module graph loads, and `AnnouncementBar.tsx` is a `"use client"`
    component. Comment cross-references both files so the two don't
    silently drift if the key/attribute ever changes.
  - **A genuine new hydration-mismatch warning surfaced once the script
    ran early enough to matter** — with the *old*, late-executing
    `next/script` version, the attribute often landed on `<html>` only
    *after* React had already hydrated/compared that node, so the
    mismatch went unnoticed; once the script reliably ran before
    hydration, React correctly started flagging that `<html>`'s real DOM
    attributes (this externally-added one) didn't match what
    `RootLayout`'s own JSX declared. Fixed the standard, sanctioned way —
    `suppressHydrationWarning` on the `<html>` element itself (the same
    pattern `next-themes` and other anti-FOUC libraries use for exactly
    this "an external script may have already touched this element before
    hydration" case) — scoped to just that one element, not deep/recursive.
- **The mount effect changed from `useEffect` to an isomorphic
  `useLayoutEffect`** (`typeof window !== "undefined" ? useLayoutEffect :
  useEffect`, guarding against React's "useLayoutEffect does nothing on
  the server" warning during Next's SSR pass of this client component).
  This is what covers **client-side (soft) navigation between pages** —
  confirmed the blocking script genuinely cannot help there (a browser
  never re-executes an inline script it already ran, and Next doesn't
  re-parse the document on a route change), and confirmed via grep that
  `AnnouncementBar` isn't hoisted into `app/layout.tsx` — every one of the
  23 pages composes its own instance inside its own `<header
  className="siteHeader">`, so a soft nav genuinely unmounts/remounts a
  fresh instance with no blocking script around to help it.
  `useLayoutEffect` runs synchronously after DOM mutation but before the
  browser paints, so flipping `dismissed` to `true` there lands in the
  very first painted frame for that mount — no flash, and mechanically no
  CSS transition ever plays for this path (there's no prior painted frame
  with a different value to animate from).
  - **A real correctness gap the Plan subagent caught, not just a
    "flagged risk"**: because no transition plays on this path, `.bar`'s
    `handleTransitionEnd` — which is what sets the `--header-h`-shrinking
    attribute — never fires for it either. Without a direct fix, a
    soft-navigated already-dismissed page would silently keep the full
    108px `--header-h` forever, reintroducing Round 2's exact gap bug
    through a different door. Fixed by calling
    `document.documentElement.setAttribute(HEADER_ATTR, "true")` directly
    inside the layout effect's own `if (localStorage.getItem(...))`
    branch, right alongside `setDismissed(true)` — not left to
    `handleTransitionEnd`, which now only ever fires for the one path it's
    actually reachable from: a real, live, animated click-to-dismiss.
- **`app/globals.css`** gained a companion rule to the existing
  `--header-h` override: `html[data-announcement-dismissed="true"]
  .js-announcement-bar { max-height: 0; opacity: 0; }`. CSS Modules class
  names are hashed/unreachable from this global sheet, so
  `AnnouncementBar.tsx`'s wrapper div carries this plain, stable,
  unconditional class alongside its existing `styles.bar` module class
  (static string, no hydration-mismatch risk — confirmed, since it's
  identical in SSR output and the client's first render). First-paint
  style resolution isn't a CSS *transition* (no prior painted state to
  animate from), so this is instant regardless of
  `prefers-reduced-motion` by construction, not by relying on the
  reduced-motion media query.
- **The live click-to-dismiss path is completely unchanged** —
  `handleDismiss` and `handleTransitionEnd` still exclusively own the
  real, animated, ~220ms user-visible collapse; none of this round's
  changes touch it. Re-verified specifically that it still shows genuine
  interpolated `max-height`/`opacity` values mid-collapse (not an instant
  jump) after all the above changes landed.

**Status:** Clean `tsc --noEmit`. Playwright-verified on a fresh `next dev`
server (started and stopped cleanly, no hanging process) with a filmstrip
method (multiple computed-style samples across the first ~200-300ms after
the triggering action, not just a before/after pair — the same lesson
Section 6 v2's own verification note already established elsewhere in
this file: a couple of screenshots seconds apart can miss exactly this
class of transient bug): hard reload shows zero flash across 7 samples
(first at 9ms); a second reload in the same context stays instantly
collapsed; soft navigation via a real `page.click()` on a nav link (not
`page.goto()`) shows zero flash on the destination page; a fresh visitor
(empty storage) still sees the bar normally; live click-to-dismiss still
visibly animates over real interpolated values and settles correctly;
`reducedMotion: "reduce"` still collapses near-instantly on a live click;
`localStorage` throwing (private-mode emulation) leaves the bar visible
with no uncaught error; zero console warnings (including specifically
checked for the `useLayoutEffect`-on-server and hydration-mismatch
warnings this round's own changes could plausibly have introduced). Also
re-ran the existing multi-page/multi-width sweep (`/`, `/products`,
`/solutions/payment-reminders`, `/resources/faq`, `/pricing` at
1516/430px, banner pre-dismissed on each) — zero overflow, zero new
console errors. The isolated production-build check used to diagnose the
`next/script` timing gap left no trace afterward (`next.config.ts`
confirmed zero net diff via `git diff`, `.next-verify` removed).

**Approved:** Not yet reviewed by the user — same pending-review status as
Rounds 1-2 above.

**Next:** Wait for the user's review of the dismiss control and both
follow-up fixes together.
