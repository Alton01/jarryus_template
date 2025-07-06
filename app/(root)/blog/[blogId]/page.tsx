import { getBlogById } from "@/actions/blog/getBlogById";
import React from "react";
import { BlogPostClient } from "../_components/blog-post-client";

const BlogIdPage = async ({
  params,
}: {
  params: Promise<{
    blogId: string;
  }>;
}) => {
  const blogId = (await params).blogId;

  const blogPost = await getBlogById(blogId);

  if (!blogPost) {
    return (
      <div className="flex flex-1 w-full items-center justify-center px-4 ms:px-6 lg:px-8 xl:px-10">
        <h1 className="text-center text-xl lg:text-2xl xl:text-4xl font-bold text-destructive">
          OOPS!!! BLOG POST WITH GIVEN ID NOT FOUND.
        </h1>
      </div>
    );
  }
  return (
    <div className="flex flex-1 w-full items-center dark:bg-[#1f242d] justify-center px-4 ms:px-6 lg:px-8 xl:px-10">
      <BlogPostClient blogPost={blogPost} />
    </div>
  );
};

export default BlogIdPage;
