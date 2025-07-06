import { z } from "zod";

export const blogPostSchema = z.object({
  blogTitle: z.string().min(2, {
    message: "Blog Title must be at least 2 characters.",
  }),
  blogImageBanner: z.string().min(1, {
    message: "Blog Post Banner Image is required.",
  }),
  blogContent: z.string().min(1, {
    message: "Your Blog Post cannot be empty. Please add content",
  }),
  blogSlug: z.string().min(1, {
    message: "Blog Slug Required.",
  }),
});
