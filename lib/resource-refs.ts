import "server-only";

import { getPostBySlug } from "@/lib/blog-posts";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { NEWS_POSTS } from "@/lib/news";
import { VIDEOS } from "@/lib/videos";

/**
 * Points a resource-style card section (landing "Insights & updates", the
 * solutions pages' "From the blog" / "Security & Compliance" grids) at real
 * migrated content instead of hardcoded mock copy. Pages declare *which*
 * resource by slug; title, excerpt, category and thumbnail are always read
 * from the content itself, so a card can never drift from the article it
 * opens.
 *
 * An unknown slug throws — every page using this is statically generated,
 * so a renamed/removed post fails `next build` instead of shipping a card
 * that links to a 404.
 */
export type ResourceRef =
  | { type: "blog" | "case-study" | "video" | "news"; slug: string }
  | {
      type: "page";
      href: string;
      title: string;
      excerpt: string;
      category: string;
      thumb: string;
    };

export type ResolvedResource = {
  key: string;
  title: string;
  excerpt: string;
  category: string;
  thumb: string;
  href: string;
  /** Off-site link (news coverage) — open in a new tab. */
  external: boolean;
  /** News thumbnails are outlet logos, not photos — never cover-crop them
   * — scale-down on white instead. */
  thumbFit: "cover" | "logo";
};

function missing(type: string, slug: string): never {
  throw new Error(`resource-refs: no ${type} with slug "${slug}"`);
}

export function resolveResource(ref: ResourceRef): ResolvedResource {
  switch (ref.type) {
    case "blog": {
      const post = getPostBySlug(ref.slug) ?? missing(ref.type, ref.slug);
      return {
        key: `blog:${post.slug}`,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        thumb: post.thumb,
        href: `/resources/blog/${post.slug}`,
        external: false,
        thumbFit: "cover",
      };
    }
    case "case-study": {
      const study = getCaseStudyBySlug(ref.slug) ?? missing(ref.type, ref.slug);
      return {
        key: `case-study:${study.slug}`,
        title: study.title,
        excerpt: study.description,
        category: "Case Study",
        thumb: study.thumb,
        href: `/resources/case-studies/${study.slug}`,
        external: false,
        thumbFit: "cover",
      };
    }
    case "video": {
      const video = VIDEOS.find((v) => v.slug === ref.slug) ?? missing(ref.type, ref.slug);
      // No per-video page exists; videos play in the listing page's lightbox.
      return {
        key: `video:${video.slug}`,
        title: video.title,
        excerpt: video.description,
        category: "Video",
        thumb: video.thumb,
        href: "/resources/videos",
        external: false,
        thumbFit: "cover",
      };
    }
    case "news": {
      const item = NEWS_POSTS.find((n) => n.slug === ref.slug) ?? missing(ref.type, ref.slug);
      return {
        key: `news:${item.slug}`,
        title: item.title,
        excerpt: item.excerpt,
        category: item.category,
        thumb: item.thumb,
        href: item.articleUrl,
        external: true,
        thumbFit: "logo",
      };
    }
    case "page":
      return {
        key: `page:${ref.href}`,
        title: ref.title,
        excerpt: ref.excerpt,
        category: ref.category,
        thumb: ref.thumb,
        href: ref.href,
        external: false,
        thumbFit: "cover",
      };
  }
}

export function resolveResources(refs: ResourceRef[]): ResolvedResource[] {
  return refs.map(resolveResource);
}
