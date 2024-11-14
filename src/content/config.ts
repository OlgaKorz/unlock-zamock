// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a `type` and `schema` for each collection

const servicesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => 
    z.object({
      title: z.string(),
      text: z.string().optional(),
      description: z.string(),
      imgurl: image(),
      imgalt: z.string(),
      price: z.string(),
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  'services': servicesCollection,
};
