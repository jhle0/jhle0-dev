import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getSeriesSummaries } from "../lib/series";

export const prerender = true;

type SitemapItem = {
  path: string;
  lastmod?: string;
};

const SITE_URL = new URL("https://jhle0-dev.vercel.app");

function toLastMod(date: Date): string {
  return date.toISOString();
}

export const GET: APIRoute = async () => {
  const [blogPosts, projects] = await Promise.all([
    getCollection("blog"),
    getCollection("projects"),
  ]);

  const publishedPosts = blogPosts.filter((post) => !post.data.draft);
  const publishedProjects = projects.filter((project) => !project.data.draft);
  const seriesSummaries = getSeriesSummaries(publishedPosts);
  const tagPages = [...new Set(publishedPosts.flatMap((post) => post.data.tags))]
    .sort((a, b) => a.localeCompare(b))
    .map((tag) => ({ path: `/tags/${tag}` }));

  const pages: SitemapItem[] = [
    { path: "/" },
    { path: "/about" },
    { path: "/now" },
    { path: "/blog" },
    { path: "/series" },
    { path: "/projects" },
    { path: "/contact" },
    { path: "/rss.xml" },
  ];

  const postPages = publishedPosts.map((post) => ({
    path: `/blog/${post.data.slug}`,
    lastmod: toLastMod(post.data.updatedDate ?? post.data.pubDate),
  }));

  const seriesPages = seriesSummaries.map((series) => ({
    path: `/series/${series.slug}`,
    lastmod: toLastMod(series.updatedAt),
  }));

  const projectPages = publishedProjects.map((project) => ({
    path: `/projects/${project.data.slug}`,
    lastmod: toLastMod(project.data.updatedDate ?? project.data.pubDate),
  }));

  const urls = [...pages, ...postPages, ...seriesPages, ...projectPages, ...tagPages]
    .map(({ path, lastmod }) => {
      const location = new URL(path, SITE_URL).toString();
      return `
  <url>
    <loc>${location}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
  </url>`.trim();
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
