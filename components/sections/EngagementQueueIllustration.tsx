import Image from "next/image";
import bgPhoto from "@/public/assets/engagement-queue-bg.jpg";
import ribbon from "@/public/assets/fully-automated-ribbon.png";
import { CheckIcon } from "@/components/ui/icons";
import styles from "./EngagementQueueIllustration.module.css";

/**
 * A single 10s loop tells the whole story (see EngagementQueueIllustration
 * .module.css for the beat-by-beat keyframe timings):
 *   Leo works -> captures -> the row collapses out of the queue -> Priya
 *   enters at the bottom -> Andrew becomes the active row -> "3x faster"
 *   emphasis -> everything eases back to its 0% value under a brief opacity
 *   dip, so the loop cuts over invisibly.
 * Every row is its own bespoke keyframe set (row0Progress, row1Progress,
 * ...) rather than a generic parameterised system — five one-off beats
 * don't earn an abstraction.
 */

function ActiveRing() {
  return (
    <span className={styles.activeRing} aria-hidden="true">
      <span className={styles.activeRingPulse} />
    </span>
  );
}

function Sheen() {
  return (
    <span className={styles.sheenWindow} aria-hidden="true">
      <span className={styles.sheen} />
    </span>
  );
}

export function EngagementQueueIllustration() {
  return (
    <div
      className={styles.stage}
      role="img"
      aria-label="Illustration of Vodex's automated engagement queue: customer accounts are worked one after another — reminders sent, negotiation, promise-to-pay captured — while the weekly recovered amount rises and completed accounts drop out as new ones enter."
    >
      <Image
        src={bgPhoto}
        alt=""
        fill
        sizes="(max-width: 860px) 90vw, (max-width: 1440px) 40vw, 480px"
        quality={75}
        placeholder="blur"
        className={styles.bg}
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.illustration} aria-hidden="true">
        <div className={styles.ribbon}>
          <Image src={ribbon} alt="" sizes="215px" quality={90} />
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.cardTitle}>Engagement queue</p>
            <span className={styles.automatedPill}>
              <span className={styles.automatedDot} />
              Automated
            </span>
          </div>

          <ul className={styles.rows}>
            {/* Row 0 — Leo Martins: the featured "works, captures, exits" row. */}
            <li className={styles.rowSlot0}>
              <div className={styles.collapse0}>
                <div className={styles.clip}>
                  <div className={styles.rowInner0}>
                    <div className={styles.rowTop}>
                      <span className={styles.avatarWrap}>
                        <span className={styles.avatar}>LM</span>
                        <ActiveRing />
                      </span>
                      <div className={styles.identity}>
                        <p className={styles.name}>Leo Martins</p>
                        <p className={styles.note}>
                          RPC verified · Promise-to-pay $240
                        </p>
                      </div>
                      <span className={styles.pillStack}>
                        <span className={`${styles.pill} ${styles.row0PillA}`}>
                          Calling…
                        </span>
                        <span className={`${styles.pill} ${styles.row0PillB}`}>
                          Negotiating
                        </span>
                        <span
                          className={`${styles.pill} ${styles.pillDone} ${styles.row0PillC}`}
                        >
                          <CheckIcon className={styles.pillCheck} />
                          PTP captured
                        </span>
                      </span>
                    </div>
                    <div className={styles.track}>
                      <span className={`${styles.fill} ${styles.row0Fill}`} />
                      <Sheen />
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Row 1 — Andrew Cole: creeps ambiently, then becomes active. */}
            <li className={styles.rowSlot}>
              <div className={styles.rowInner1}>
                <div className={styles.rowTop}>
                  <span className={styles.avatarWrap}>
                    <span className={styles.avatar}>AC</span>
                    <ActiveRing />
                  </span>
                  <div className={styles.identity}>
                    <p className={styles.name}>Andrew Cole</p>
                    <p className={styles.note}>Reminder sent · Card ending 4417</p>
                  </div>
                  <span className={styles.pillStack}>
                    <span className={`${styles.pill} ${styles.row1PillA}`}>
                      In progress
                    </span>
                    <span className={`${styles.pill} ${styles.row1PillB}`}>
                      Negotiating
                    </span>
                  </span>
                </div>
                <div className={styles.track}>
                  <span className={`${styles.fill} ${styles.row1Fill}`} />
                  <Sheen />
                </div>
              </div>
            </li>

            {/* Row 2 — Amira Shah: ambient creep only, status stays put. */}
            <li className={styles.rowSlot}>
              <div className={styles.rowInner}>
                <div className={styles.rowTop}>
                  <span className={styles.avatar}>AS</span>
                  <div className={styles.identity}>
                    <p className={styles.name}>Amira Shah</p>
                    <p className={styles.note}>Plan offered · 3 installments</p>
                  </div>
                  <span className={styles.pill}>Negotiating</span>
                </div>
                <div className={styles.track}>
                  <span className={`${styles.fill} ${styles.row2Fill}`} />
                </div>
              </div>
            </li>

            {/* Row 3 — Daniel Reyes: ambient creep only, status stays put. */}
            <li className={styles.rowSlot}>
              <div className={styles.rowInner}>
                <div className={styles.rowTop}>
                  <span className={styles.avatar}>DR</span>
                  <div className={styles.identity}>
                    <p className={styles.name}>Daniel Reyes</p>
                    <p className={styles.note}>Re-dial scheduled · Attempt 3</p>
                  </div>
                  <span className={styles.pill}>Follow-up</span>
                </div>
                <div className={styles.track}>
                  <span className={`${styles.fill} ${styles.row3Fill}`} />
                </div>
              </div>
            </li>

            {/* Row 4 — Priya Nair: enters the queue once Leo's row clears. */}
            <li className={styles.rowSlot4}>
              <div className={styles.collapse4}>
                <div className={styles.clip}>
                  <div className={styles.rowInner4}>
                    <div className={styles.rowTop}>
                      <span className={styles.avatar}>PN</span>
                      <div className={styles.identity}>
                        <p className={styles.name}>Priya Nair</p>
                        <p className={styles.note}>Queued · First attempt</p>
                      </div>
                      <span className={styles.pill}>Queued</span>
                    </div>
                    <div className={styles.track}>
                      <span className={`${styles.fill} ${styles.row4Fill}`} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div className={styles.summary}>
            <div className={styles.summaryValue}>
              <p className={styles.summaryLabel}>Recovered this week</p>
              <p className={styles.summaryFigure}>
                $48,
                <span className={styles.counterTail} />
              </p>
            </div>
            <div className={styles.summaryRight}>
              <p className={styles.summaryLabel}>vs. manual team</p>
              <p className={styles.summaryEmph}>3x faster</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
