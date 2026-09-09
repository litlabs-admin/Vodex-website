import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function CaseStudyNotFound() {
  return (
    <>
      <header className="siteHeader">
        <AnnouncementBar />
        <Navbar solid />
      </header>
      <main>
        <section className={styles.section}>
          <div className="container">
            <p className={styles.eyebrow}>404</p>
            <h1 className={styles.title}>We couldn&rsquo;t find that case study</h1>
            <p className={styles.lead}>
              It may have been moved or the link is out of date. Head back to case studies to
              keep reading.
            </p>
            <div className={styles.actions}>
              <Button href="/resources/case-studies" variant="primary" withArrow>
                Back to case studies
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
