"use server";

import { db } from "@/lib/db";

export const getBlogs = async () => {
  try {
    const blogs = await db.blogpost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!blogs) {
      return null;
    }

    return blogs;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
