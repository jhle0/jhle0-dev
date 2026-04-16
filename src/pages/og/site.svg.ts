import type { APIRoute } from "astro";
import { createOgSvg } from "../../lib/og";

export const prerender = true;

export const GET: APIRoute = () => {
  const svg = createOgSvg({
    title: "jhle0 developer archive",
    subtitle: "Study notes, projects, and now logs",
    meta: "Personal developer blog",
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
