import type { Metadata } from "next";
import { Ancizar_Serif, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const ancizar = Ancizar_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic"],
  display: "swap",
  variable: "--font-ancizar",
  // next/font ships no metric overrides for this family yet.
  adjustFontFallback: false,
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

export const metadata: Metadata = {
  title: "Vodex — GenAI voice agents that turn outreach into revenue",
  description:
    "GenAI-powered voice agents for enterprise engagement. Make reminders, collections, follow-ups, qualification, payment negotiation and more easy without the extra overhead.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ancizar.variable}`}
      // The inline script below sets data-announcement-dismissed on this
      // element before hydration ever runs — React's hydration otherwise
      // (correctly) flags that as a mismatch, since this JSX itself never
      // declares that attribute. Standard, sanctioned escape hatch for
      // exactly this "an external script may have already modified this
      // element's attributes before React hydrates it" case (the same
      // pattern dark-mode/theme toggles use). Scoped to just this element,
      // not deep/recursive.
      suppressHydrationWarning
    >
      <body>
        {/* Reads the same key/attribute AnnouncementBar.tsx uses
            (vodex-announcement-dismissed / data-announcement-dismissed) —
            duplicated here on purpose, not imported, since this must stay a
            plain string literal reachable before any client JS runs (that
            file is a "use client" component). Keep both in sync by hand if
            either ever changes.

            Deliberately a hand-written <script>, not next/script's
            beforeInteractive strategy: that strategy defers the actual
            <script> tag to just before the trailing webpack chunk loader
            (verified via curl against both `next dev` and a `next build`
            output — Next streams it in via a `self.__next_s.push(...)`
            call near the end of <body>, not literally in <head>), which
            still executes before hydration but not necessarily before the
            browser paints everything above it — under dev-mode's extra
            HMR/DevTools scripts specifically, that gap was wide enough for
            an actual (if brief) visible flash + CSS transition to run.
            Placed as the literal first child of <body> instead, a plain,
            parser-blocking inline script always executes synchronously at
            that exact point — genuinely before the browser can parse/paint
            anything after it, including the announcement bar itself,
            regardless of whatever else Next.js injects elsewhere in the
            document and regardless of dev vs. prod. Runs once per full
            document load only (a browser never re-executes an inline
            script it already ran, and this isn't re-parsed on a
            client-side route change) — soft navigation is instead covered
            by AnnouncementBar's own layout effect. This is what lets a
            returning, already-dismissed visitor see the bar already gone
            (and --header-h already shrunk, see globals.css) on the very
            first painted frame, instead of a flash-then-collapse. */}
        <script
          id="announcement-dismissed-init"
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('vodex-announcement-dismissed')){document.documentElement.setAttribute('data-announcement-dismissed','true');}}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
