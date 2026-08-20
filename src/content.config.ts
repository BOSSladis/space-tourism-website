import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

const createJsonParser = (key: string) => (text: string) =>
  JSON.parse(text)[key].map((item: any, index: number) => ({
    id: slugify(item.name),
    order: index,
    ...item,
  }));

const destinationSchema = ({ image }: { image: any }) =>
  z.object({
    order: z.number(),
    name: z.string(),
    images: z.object({
      png: image(),
      webp: image(),
    }),
    description: z.string(),
    distance: z.string(),
    travel: z.string(),
  });

const destinationLoaderFileOption = {
  parser: createJsonParser("destinations"),
};

const crewSchema = ({ image }: { image: any }) =>
  z.object({
    order: z.number(),
    name: z.string(),
    images: z.object({ png: image(), webp: image() }),
    role: z.string(),
    bio: z.string(),
  });

const crewLoaderFileOption = { parser: createJsonParser("crew") };

const technologySchema = ({ image }: { image: any }) =>
  z.object({
    order: z.number(),
    name: z.string(),
    images: z.object({ portrait: image(), landscape: image() }),
    description: z.string(),
  });

const technologyLoaderFileOption = { parser: createJsonParser("technology") };

export const collections = {
  destinations: defineCollection({
    loader: file("src/data/data.json", destinationLoaderFileOption),
    schema: destinationSchema,
  }),
  crew: defineCollection({
    loader: file("src/data/data.json", crewLoaderFileOption),
    schema: crewSchema,
  }),
  technology: defineCollection({
    loader: file("src/data/data.json", technologyLoaderFileOption),
    schema: technologySchema,
  }),
};
