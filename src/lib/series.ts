import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export type SeriesSummary = {
  name: string;
  slug: string;
  posts: BlogPost[];
  firstPost: BlogPost;
  lastPost: BlogPost;
  updatedAt: Date;
};

export function getSeriesName(post: BlogPost): string {
  return post.data.series?.trim() ?? "";
}

export function getSeriesSlug(seriesName: string): string {
  const slug = seriesName
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "series";
}

function getSeriesOrder(post: BlogPost): number | null {
  const order = post.data.seriesOrder;
  return typeof order === "number" && Number.isFinite(order) ? order : null;
}

function compareByPublishedDate(a: BlogPost, b: BlogPost): number {
  return (
    a.data.pubDate.getTime() - b.data.pubDate.getTime() ||
    a.data.title.localeCompare(b.data.title) ||
    a.id.localeCompare(b.id)
  );
}

export function compareSeriesPosts(a: BlogPost, b: BlogPost): number {
  const aOrder = getSeriesOrder(a);
  const bOrder = getSeriesOrder(b);

  if (aOrder != null && bOrder != null && aOrder !== bOrder) {
    return aOrder - bOrder;
  }

  if (aOrder != null && bOrder == null) return -1;
  if (aOrder == null && bOrder != null) return 1;

  return compareByPublishedDate(a, b);
}

export function getSeriesPosts(posts: BlogPost[], seriesName: string): BlogPost[] {
  return posts
    .filter((post) => getSeriesName(post) === seriesName)
    .sort(compareSeriesPosts);
}

export function getSeriesSummaries(posts: BlogPost[]): SeriesSummary[] {
  const groups = new Map<string, BlogPost[]>();

  for (const post of posts) {
    const seriesName = getSeriesName(post);
    if (!seriesName) continue;

    groups.set(seriesName, [...(groups.get(seriesName) ?? []), post]);
  }

  return [...groups.entries()]
    .map(([name, seriesPosts]) => {
      const orderedPosts = [...seriesPosts].sort(compareSeriesPosts);
      const updatedAt = orderedPosts.reduce((latest, post) => {
        const postDate = post.data.updatedDate ?? post.data.pubDate;
        return postDate.getTime() > latest.getTime() ? postDate : latest;
      }, orderedPosts[0].data.updatedDate ?? orderedPosts[0].data.pubDate);

      return {
        name,
        slug: getSeriesSlug(name),
        posts: orderedPosts,
        firstPost: orderedPosts[0],
        lastPost: orderedPosts[orderedPosts.length - 1],
        updatedAt,
      };
    })
    .sort(
      (a, b) =>
        b.updatedAt.getTime() - a.updatedAt.getTime() ||
        a.name.localeCompare(b.name),
    );
}
