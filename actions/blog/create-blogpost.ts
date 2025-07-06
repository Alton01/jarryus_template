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

export const createBlogPost = async ({
  blogTitle,
  blogImageBanner,
  blogContent,
  blogSlug,
}: BlogPostData) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const newBlogPost = await db.blogpost.create({
      data: {
        blogTitle,
        blogImageBanner,
        blogContent,
        blogSlug,
      },
    });
    revalidatePath("/blog");
    return newBlogPost;
  } catch (error) {
    console.log(error);
  }
};
