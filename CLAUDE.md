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
  layout/           AnnouncementBar, Navbar, Footer
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
  ui/               Logo (+ Wordmark), Button, Entrance, icons,
                    AudioWaveform, useWaveformData
public/assets/      web-ready copies of supplied artwork

app/products/page.tsx    Product Page route (header + main + footer)
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
