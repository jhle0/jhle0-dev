import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { createOgSvg } from "../../../lib/og";

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection("blog");

  return posts
    .filter((post) => !post.data.draft)
    .map((post) => ({
      params: { slug: post.data.slug },
    }));
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) return new Response("Not found", { status: 404 });

  const posts = await getCollection("blog");
  const post = posts.find((entry) => entry.data.slug === slug && !entry.data.draft);
  if (!post) return new Response("Not found", { status: 404 });

  const svg = createOgSvg({
    title: post.data.title,
    subtitle: post.data.description,
    meta: `Blog · ${post.data.pubDate.toISOString().slice(0, 10)}`,
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
