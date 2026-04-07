import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    slug: z.string(),
    tags: z.array(z.string()),
    category: z.enum(["study", "build", "log"]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    series: z.string().optional(),
    featured: z.boolean().default(false),
    canonicalURL: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    slug: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    status: z.enum(["planned", "in-progress", "completed"]).optional(),
    githubUrl: z.string().optional(),
    demoUrl: z.string().optional(),
  }),
});

export const collections = { blog, projects };