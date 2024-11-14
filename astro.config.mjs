import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({

  markdown: {
      syntaxHighlight: 'prism',
    },
  integrations: [
      mdx({
        optimize: true,
      }
    )
  ],
  image: {
    service: passthroughImageService()
  }
});