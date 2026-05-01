import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getSeriesSummaries } from "../lib/series";

export const prerender = true;

type SitemapItem = {
  path: string;
  lastmod?: string;
};

const SITE_URL = new URL("https://jhle0-dev.vercel.app");

export const GET: APIRoute = async () => {
  const [blogPosts, projects] = await Promise.all([
    getCollection("blog"),
    getCollection("projects"),
  ]);

  const publishedPosts = blogPosts.filter((post) => !post.data.draft);
  const publishedProjects = projects.filter((project) => !project.data.draft);
  const seriesSummaries = getSeriesSummaries(publishedPosts);

  const pages: SitemapItem[] = [
    { path: "/" },
    { path: "/en/" },
    { path: "/about" },
    { path: "/en/about" },
    { path: "/now" },
    { path: "/en/now" },
    { path: "/blog" },
    { path: "/en/blog" },
    { path: "/series" },
    { path: "/en/series" },
    { path: "/projects" },
    { path: "/en/projects" },
    { path: "/contact" },
    { path: "/en/contact" },
    { path: "/rss.xml" },
  ];

  const postPages = publishedPosts.map((post) => ({
    path: `/blog/${post.data.slug}`,
    lastmod: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
  }));

  const localizedPostPages = publishedPosts.map((post) => ({
    path: `/en/blog/${post.data.slug}`,
    lastmod: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
  }));

  const seriesPages = seriesSummaries.map((series) => ({
    path: `/series/${series.slug}`,
    lastmod: series.updatedAt.toISOString(),
  }));

  const localizedSeriesPages = seriesSummaries.map((series) => ({
    path: `/en/series/${series.slug}`,
    lastmod: series.updatedAt.toISOString(),
  }));

  const projectPages = publishedProjects.map((project) => ({
    path: `/projects/${project.data.slug}`,
    lastmod: (project.data.updatedDate ?? project.data.pubDate).toISOString(),
  }));

  const localizedProjectPages = publishedProjects.map((project) => ({
    path: `/en/projects/${project.data.slug}`,
    lastmod: (project.data.updatedDate ?? project.data.pubDate).toISOString(),
  }));

  const urls = [
    ...pages,
    ...postPages,
    ...localizedPostPages,
    ...seriesPages,
    ...localizedSeriesPages,
    ...projectPages,
    ...localizedProjectPages,
  ]
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
