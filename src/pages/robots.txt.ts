import type { APIRoute } from "astro";

export const prerender = true;

const SITE_URL = new URL("https://jhle0-dev.vercel.app");

export const GET: APIRoute = () => {
  const sitemapUrl = new URL("/sitemap.xml", SITE_URL).toString();

  const body = ["User-agent: *", "Allow: /", `Sitemap: ${sitemapUrl}`].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
