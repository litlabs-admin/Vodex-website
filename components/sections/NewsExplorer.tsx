"use client";

import { useMemo, useState } from "react";
import { NewsCard } from "@/components/ui/NewsCard";
import { SearchIcon } from "@/components/ui/icons";
import type { NewsPost } from "@/lib/news";
import styles from "./NewsExplorer.module.css";

const ALL = "All";

type NewsExplorerProps = {
  posts: NewsPost[];
  categories: readonly string[];
};

/**
 * Owns category + search filtering for the newsroom grid — copy-adapted
 * from BlogExplorer (same AND-combined category+text match, aria-live
 * result count, dashed-border empty state), operating over NewsPost[]
 * instead of BlogPost[]. Kept as its own component rather than
 * genericizing BlogExplorer, per this project's established
 * "copy-adapt, don't force a shared generic component" rule.
 */
export function NewsExplorer({ posts, categories }: NewsExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === ALL || post.category === activeCategory;
      const matchesQuery =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeCategory, query]);

  const clearFilters = () => {
    setActiveCategory(ALL);
    setQuery("");
  };

  const hasActiveFilters = activeCategory !== ALL || query.trim() !== "";

  return (
    <section className={styles.section} aria-labelledby="news-grid-title">
      <div className="container">
        <h2 id="news-grid-title" className="visually-hidden">
          More news
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
              placeholder="Search news..."
              aria-label="Search news"
              aria-controls="news-grid"
            />
          </label>
        </div>

        <p className="visually-hidden" role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "story" : "stories"}
        </p>

        {filtered.length > 0 ? (
          <div id="news-grid" className={styles.grid}>
            {filtered.map((post, i) => (
              <NewsCard key={post.slug} post={post} delay={i * 70} />
            ))}
          </div>
        ) : (
          <div id="news-grid" className={styles.empty}>
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
