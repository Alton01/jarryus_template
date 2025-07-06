"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getCurrentUser } from "../getCurrentUser";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

interface BlogPostData {
  blogTitle: string;
  blogImageBanner: string;
  blogContent: string;
  blogSlug: string;
}

export const updateBlogPost = async (
  id: string,
  { blogTitle, blogImageBanner, blogContent, blogSlug }: BlogPostData
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const updatedBlogPost = await db.blogpost.update({
      where: {
        id,
      },
      data: {
        blogTitle,
        blogImageBanner,
        blogContent,
        blogSlug,
      },
    });
    revalidatePath("/blog");
    return updatedBlogPost;
  } catch (error) {
    console.log(error);
  }
};
