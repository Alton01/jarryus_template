import { getBlogById } from "@/actions/blog/getBlogById";
import React from "react";
import { AddBlogPostForm } from "../../_components/add-blogpost-form";

const BlogPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const blogId = (await params).blogId;

  const blog = await getBlogById(blogId);
  return (
    <div className="flex flex-1 px-4 ms:px-6 lg:px-8 xl:px-10">
      <AddBlogPostForm blog={blog} />
    </div>
  );
};

export default BlogPage;
