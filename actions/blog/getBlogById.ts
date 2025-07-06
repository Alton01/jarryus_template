"use server";

import { db } from "@/lib/db";

export const getBlogById = async (blogId: string) => {
  try {
    const blogPost = await db.blogpost.findUnique({
      where: { blogSlug: blogId },
    });

    if (!blogPost) {
      return null;
    }

    return blogPost;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
