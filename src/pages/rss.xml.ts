import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site ?? new URL("https://jhle0-dev.vercel.app")).toString();
  const posts = (await getCollection("blog"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const items = posts
    .map((post) => {
      const link = new URL(`/blog/${post.data.slug}`, siteUrl).toString();
      const updatedAt = (post.data.updatedDate ?? post.data.pubDate).toUTCString();
      return `
  <item>
    <title>${escapeXml(post.data.title)}</title>
    <link>${link}</link>
    <guid>${link}</guid>
    <description>${escapeXml(post.data.description)}</description>
    <pubDate>${updatedAt}</pubDate>
  </item>`.trim();
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>jhle0 blog</title>
  <description>Study notes, project logs, and learning records.</description>
  <link>${siteUrl}</link>
  <atom:link href="${new URL("/rss.xml", siteUrl).toString()}" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
