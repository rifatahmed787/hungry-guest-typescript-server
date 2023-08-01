import { z } from "zod";

const createBlogZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    tags: z.array(z.string(), {
      required_error: "Tags is required",
    }),
    category: z.string({
      required_error: "Category is required",
    }),
    image: z.array(z.string(), {
      required_error: "Image is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});

const updateBlogZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    tags: z.array(z.string(), {
      required_error: "Tags is required",
    }),
    category: z.string({
      required_error: "Category is required",
    }),
    image: z.array(z.string(), {
      required_error: "Image is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});

export const BlogValidation = {
  createBlogZodSchema,
  updateBlogZodSchema,
};
