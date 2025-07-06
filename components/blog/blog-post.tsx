import { getBlogs } from "@/actions/blog/getBlogs";
import { BlogPostCard } from "@/app/(root)/blog/_components/blog-post-card";
import React from "react";

const BlogPost = async () => {
  const blogPosts = await getBlogs();

  if (blogPosts && blogPosts.length < 1) {
    return (
      <div className="flex flex-1 flex-col w-full h-72 xl:h-96 px-4 ms:px-6 lg:px-8 xl:px-10">
        <h1 className="font-poppins text-center font-bold text-2xl xl:text-3xl pt-11 text-slate-700 dark:text-slate-200 ">
          {" "}
          Blog{""}{" "}
          <span className="text-amber-600 dark:text-amber-600 ">Posts</span>
        </h1>
        <div className="flex flex-col w-full items-center h-full justify-center">
          <h1 className="text-center text-lg lg:text-xl xl:text-2xl font-poppins font-semibold text-slate-700 dark:text-slate-300 ">
            OOPS!!! NO BLOG POST ADDED YET. CHECK BACK LATER.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center justify-center px-4 ms:px-6 lg:px-8 xl:px-10 pb-10 bg-muted dark:bg-black">
      <h1 className="font-poppins text-center font-bold text-2xl xl:text-3xl pb-5 pt-7 text-slate-700 dark:text-slate-200">
        {" "}
        Blog{""}{" "}
        <span className="text-amber-600  dark:text-amber-600 ">Posts</span>
      </h1>
      <div className="flex w-full flex-row items-center justify-center">
        <div className="w-full grid grid-cols-1 mm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 max-w-7xl">
          {blogPosts?.map((Post) => (
            <BlogPostCard key={Post.id} blogPost={Post} type="Public" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
