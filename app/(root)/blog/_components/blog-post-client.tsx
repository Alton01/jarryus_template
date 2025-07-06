import { Blogpost } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface BlogPostClientProps {
  blogPost: Blogpost;
}

export const BlogPostClient = ({ blogPost }: BlogPostClientProps) => {
  return (
    <div className="flex flex-col w-full max-w-7xl p-2 ">
      <div className="flex flex-col w-full items-center gap-y-3 justify-center my-10 py-10 z-50 p-4 rounded-lg bg-muted dark:bg-[#323946]">
        <h1 className="text-center text-xl lg:text-2xl xl:text-4xl font-poppins font-bold text-slate-500 dark:text-slate-500 uppercase pb-4">
          {blogPost.blogTitle}
        </h1>
        <div className="flex flex-row items-center justify-center w-full pt-2 pb-4">
          <h1 className="text-sm lg:text-lg font-poppins">
            By{" "}
            <span className="dark:text-slate-500">
              Jarryus Properties | {""}
            </span>{" "}
            {blogPost?.createdAt.toDateString()}
          </h1>
        </div>
        <div className="flex flex-row w-full items-center justify-center mb-6 max-w-5xl max-h-64 xl:max-h-80 2xl:max-h-96">
          <Image
            src={blogPost.blogImageBanner}
            alt={blogPost.blogTitle}
            width={500}
            height={300}
            className="w-full object-fill items-center justify-center h-64 max-h-64 xl:max-h-80 2xl:max-h-96"
          />
        </div>

        <div dangerouslySetInnerHTML={{ __html: blogPost?.blogContent }} />
      </div>
    </div>
  );
};
