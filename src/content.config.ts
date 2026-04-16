import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const optionalDate = z.preprocess(
  (value) => (value === "" || value == null ? undefined : value),
  z.coerce.date().optional(),
);

const optionalString = z.preprocess(
  (value) => (value === "" || value == null ? undefined : value),
  z.string().optional(),
);

const optionalProjectStatus = z.preprocess(
  (value) => (value === "" || value == null ? undefined : value),
  z.enum(["planned", "in-progress", "completed"]).optional(),
);

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: optionalDate,
    slug: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    heroImage: optionalString,
    series: optionalString,
    featured: z.boolean().default(false),
    canonicalURL: optionalString,
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: optionalDate,
    slug: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    heroImage: optionalString,
    status: optionalProjectStatus,
    githubUrl: optionalString,
    demoUrl: optionalString,
  }),
});

export const collections = { blog, projects };
