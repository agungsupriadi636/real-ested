// Example: A cheatsheet of many common Zod datatypes
import { z, defineCollection } from 'astro:content';

import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        image: z.object({
            src: image(),
            alt: z.string(),
        }),
        excerpt: z.string(),
        author: z.string().default('Anonymous'),
        tags: z.array(z.string()),
        category: z.string(),

        // In YAML, dates written without quotes around them are interpreted as Date objects
        publishDate: z.date(), // e.g. 2024-09-17
    })
})

export const collections = { blog };

