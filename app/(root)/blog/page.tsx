import { getBlogs } from "@/actions/blog/getBlogs";
import React from "react";
import { BlogPostCard } from "./_components/blog-post-card";

const BlogPage = async () => {
  const blogPosts = await getBlogs();

  if (blogPosts && blogPosts?.length < 1)
    return (
      <div className="flex flex-1 flex-col h-96 min-h-96 w-full py-10 px-4 ms:px-6 lg:px-8 xl:px-10 bg-[#e3e8e8] dark:bg-black">
        <h1 className="font-poppins text-center font-bold text-2xl xl:text-3xl pb-10 pt-7 text-amber-600 dark:text-amber-600 ">
          {" "}
          BLOG POSTS
        </h1>
        <div className="flex flex-col flex-1 w-full h-full items-center justify-center">
          <h1 className="text-center text-lg lg:text-xl xl:text-2xl font-bold text-slate-700 dark:text-slate-300">
            OOPS!!! NO BLOG POST ADDED YET. CHECK BACK LATER.
          </h1>
        </div>
      </div>
    );
  return (
    <div className="flex flex-1 flex-col w-full  px-4 ms:px-6 lg:px-8 xl:px-10 bg-[#e3e8e8] dark:bg-black">
      <div className="flex flex-col py-6 w-full items-center justify-center space-y-8">
        <h1 className="text-2xl lg:text-3xl pt-7 pb-4 font-poppins font-bold xl:text-4xl text-center text-amber-600 dark:text-amber-600">
          BLOG POSTS
        </h1>

        <div className="flex w-full flex-row items-center justify-center ">
          <div className="w-full grid grid-cols-1 mm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 max-w-7xl ">
            {blogPosts?.map((blogPost) => (
              <BlogPostCard
                key={blogPost.id}
                blogPost={blogPost}
                type="Public"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
