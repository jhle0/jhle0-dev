import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { createOgSvg } from "../../../lib/og";

export const prerender = true;

export async function getStaticPaths() {
  const projects = await getCollection("projects");

  return projects
    .filter((project) => !project.data.draft)
    .map((project) => ({
      params: { slug: project.data.slug },
    }));
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) return new Response("Not found", { status: 404 });

  const projects = await getCollection("projects");
  const project = projects.find(
    (entry) => entry.data.slug === slug && !entry.data.draft,
  );
  if (!project) return new Response("Not found", { status: 404 });

  const status = project.data.status ? ` · ${project.data.status}` : "";
  const svg = createOgSvg({
    title: project.data.title,
    subtitle: project.data.description,
    meta: `Project${status}`,
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
