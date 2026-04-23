import type { APIRoute } from "astro";

export const prerender = true;

const SITE_URL = new URL("https://jhle0-dev.vercel.app");
const SITEMAP_URL = new URL("/sitemap.xml", SITE_URL).toString();

const ROBOTS_LINES = ["User-agent: *", "Allow: /", `Sitemap: ${SITEMAP_URL}`];

export const GET: APIRoute = () => {
  return new Response(`${ROBOTS_LINES.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};