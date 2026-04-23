import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://jhle0-dev.vercel.app");
  const sitemapUrl = new URL("/sitemap.xml", siteUrl).toString();

  const body = ["User-agent: *", "Allow: /", `Sitemap: ${sitemapUrl}`].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
