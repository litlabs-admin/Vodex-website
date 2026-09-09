"use client";

import { useMemo, useState } from "react";
import { VideoCard } from "@/components/ui/VideoCard";
import { SearchIcon } from "@/components/ui/icons";
import type { Video } from "@/lib/videos";
import styles from "./VideoExplorer.module.css";

const ALL = "All";

type VideoExplorerProps = {
  videos: Video[];
  categories: readonly string[];
};

/**
 * Category + search filtering for the video grid — same logic as
 * BlogExplorer (copy-adapted rather than shared, since the underlying card
 * type differs: Video has no slug/href here). See BlogExplorer.tsx for the
 * full rationale (direct port of the Chapeau benchmark's InsightsExplorer).
 */
export function VideoExplorer({ videos, categories }: VideoExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos.filter((video) => {
      const matchesCategory = activeCategory === ALL || video.categories.includes(activeCategory);
      const matchesQuery =
        q === "" ||
        video.title.toLowerCase().includes(q) ||
        video.description.toLowerCase().includes(q) ||
        video.categories.some((c) => c.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [videos, activeCategory, query]);

  const clearFilters = () => {
    setActiveCategory(ALL);
    setQuery("");
  };

  const hasActiveFilters = activeCategory !== ALL || query.trim() !== "";

  return (
    <section className={styles.section} aria-labelledby="video-grid-title">
      <div className="container">
        <h2 id="video-grid-title" className="visually-hidden">
          More videos
        </h2>

        <div className={styles.controls}>
          <div className={styles.chips} role="group" aria-label="Filter by category">
            {[ALL, ...categories].map((category) => {
              const active = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  className={styles.chip}
                  data-active={active || undefined}
                  aria-pressed={active}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <label className={styles.searchField}>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search videos..."
              aria-label="Search videos"
              aria-controls="video-grid"
            />
          </label>
        </div>

        <p className="visually-hidden" role="status" aria-live="polite">
          {filtered.length} video{filtered.length === 1 ? "" : "s"}
        </p>

        {filtered.length > 0 ? (
          <div id="video-grid" className={styles.grid}>
            {filtered.map((video, i) => (
              <VideoCard key={video.slug} video={video} delay={i * 70} />
            ))}
          </div>
        ) : (
          <div id="video-grid" className={styles.empty}>
            <p className={styles.emptyTitle}>Nothing matches that yet.</p>
            <p className={styles.emptyLine}>Try a different category, or clear the search.</p>
            {hasActiveFilters && (
              <button type="button" className={styles.clearBtn} onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
