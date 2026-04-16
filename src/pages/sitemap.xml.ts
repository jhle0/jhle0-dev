import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

type SitemapItem = {
  path: string;
  lastmod?: string;
};

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL("https://jhle0-dev.vercel.app");
  const [blogPosts, projects] = await Promise.all([
    getCollection("blog"),
    getCollection("projects"),
  ]);

  const publishedPosts = blogPosts.filter((post) => !post.data.draft);
  const publishedProjects = projects.filter((project) => !project.data.draft);
  const tags = [
    ...new Set(publishedPosts.flatMap((post) => post.data.tags)),
  ].sort();

  const pages: SitemapItem[] = [
    { path: "/" },
    { path: "/en/" },
    { path: "/about" },
    { path: "/en/about" },
    { path: "/now" },
    { path: "/en/now" },
    { path: "/blog" },
    { path: "/en/blog" },
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

  const projectPages = publishedProjects.map((project) => ({
    path: `/projects/${project.data.slug}`,
    lastmod: (project.data.updatedDate ?? project.data.pubDate).toISOString(),
  }));

  const localizedProjectPages = publishedProjects.map((project) => ({
    path: `/en/projects/${project.data.slug}`,
    lastmod: (project.data.updatedDate ?? project.data.pubDate).toISOString(),
  }));

  const tagPages = tags.map((tag) => ({
    path: `/tags/${tag}`,
  }));

  const localizedTagPages = tags.map((tag) => ({
    path: `/en/tags/${tag}`,
  }));

  const urls = [
    ...pages,
    ...postPages,
    ...localizedPostPages,
    ...projectPages,
    ...localizedProjectPages,
    ...tagPages,
    ...localizedTagPages,
  ]
    .map(({ path, lastmod }) => {
      const location = new URL(path, siteUrl).toString();
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
