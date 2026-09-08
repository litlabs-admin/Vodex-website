"use client";

import { useMemo, useState } from "react";
import { BlogPostCard } from "@/components/ui/BlogPostCard";
import { SearchIcon } from "@/components/ui/icons";
import type { BlogPost } from "@/lib/blog-posts";
import styles from "./BlogExplorer.module.css";

const ALL = "All";

type BlogExplorerProps = {
  posts: BlogPost[];
  categories: readonly string[];
};

/**
 * Owns category + search filtering for the blog grid — direct port of the
 * Chapeau benchmark's InsightsExplorer logic (AND-combined category+text
 * match via useState/useMemo, aria-live result count, dashed-border empty
 * state), re-expressed with this project's own tokens/CSS Modules instead
 * of Tailwind, and brand orange instead of the reference's pink accent.
 */
export function BlogExplorer({ posts, categories }: BlogExplorerProps) {
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
    <section className={styles.section} aria-labelledby="blog-grid-title">
      <div className="container">
        <h2 id="blog-grid-title" className="visually-hidden">
          More articles
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
              placeholder="Search articles..."
              aria-label="Search articles"
              aria-controls="blog-grid"
            />
          </label>
        </div>

        <p className="visually-hidden" role="status" aria-live="polite">
          {filtered.length} article{filtered.length === 1 ? "" : "s"}
        </p>

        {filtered.length > 0 ? (
          <div id="blog-grid" className={styles.grid}>
            {filtered.map((post, i) => (
              <BlogPostCard key={post.slug} post={post} delay={i * 70} />
            ))}
          </div>
        ) : (
          <div id="blog-grid" className={styles.empty}>
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
