"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Blogpost } from "@prisma/client";
import { ArrowUpLeft, SquareArrowUpRight, SquarePen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface BlogPostCardProps {
  blogPost: Blogpost;
  type: "Public" | "Admin";
}

export const BlogPostCard = ({ blogPost, type }: BlogPostCardProps) => {
  const router = useRouter();

  const handleEditBlog = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    router.push(`/dashboard/blog/${blogPost.blogSlug}`);
  };
  return (
    <Card
      onClick={() => router.push(`/blog/${blogPost.blogSlug}`)}
      className="relative h-[430px] vm:h-[400px] mm:h-[425px] lg:h-[440px]  z-50 shadow-lg hover:cursor-pointer dark:bg-[#1f242d] "
    >
      <Image
        src={blogPost.blogImageBanner}
        blurDataURL={blogPost.blogImageBanner}
        alt={blogPost.blogTitle}
        width={200}
        height={100}
        className="object-fill w-full h-[200px]"
      />
      <div className="flex flex-col p-3 gap-y-2 mb-4">
        <div className="w-full items-center justify-center">
          <h1 className="text-lg capitalize lg:text-xl  text-center font-semibold font-poppins text-slate-700 dark:text-slate-200 line-clamp-2">
            {blogPost.blogTitle}
          </h1>
        </div>
        <div className="flex flex-col vm:flex-row mm:flex-col w-full items-center py-3 justify-center  vm:justify-between mm:justify-center">
          <h1 className="text-sm lg:text-lg capitalize font-poppins  text-center text-slate-700 dark:text-slate-200 line-clamp-1  ">
            Author: Jarryus Properties.
          </h1>
          <h1 className="text-sm lg:text-lg font-poppins text-center text-slate-700 dark:text-slate-200 pt-4 vm:pt-0 mm:pt-4 line-clamp-1">
            {blogPost.createdAt.toDateString()}
          </h1>
        </div>
      </div>

      <div className="flex w-full p-2 absolute bottom-1 px-3">
        {type === "Public" && (
          <div className="flex flex-row w-full items-center justify-center ">
            <Button
              onClick={() => router.push(`/blog/${blogPost.blogSlug}`)}
              className="font-poppins p-3 w-[175px] items-center justify-center dark:text-slate-200 text-white dark:bg-black"
            >
              <SquareArrowUpRight className="mr-2 h-8 w-8" />
              Read More
            </Button>
          </div>
        )}

        {type === "Admin" && (
          <div className="flex flex-row w-full items-center justify-center ">
            <Button
              onClick={handleEditBlog}
              className="font-poppins p-2 items-center justify-center dark:text-slate-300 w-[200px] dark:bg-black "
            >
              <SquarePen className="mr-2 h-8 w-8" />
              Edit BlogPost
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
