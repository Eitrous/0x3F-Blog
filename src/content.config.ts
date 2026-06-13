import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ 
		base: './src/content/blog', 
		pattern: [
			'**/*.{md,mdx}',
			'!**/.obsidian/**',
			'!**/templates/**'
		],
	}),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		categories: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		cover: z.string().optional(),
		type: z.enum(['Essay', 'Journal', 'Note']).optional(),
	}),
});

export const collections = { blog };
