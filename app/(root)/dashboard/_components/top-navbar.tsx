"use client";
import { adminNavbarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const TopNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col  w-full items-center justify-center px-4 ms:px-6 lg:px-8 xl:px-10 bg-white dark:bg-[#1f242d]">
      <h1 className="uppercase text-2xl pt-10 pb-6 text-amber-600 dark:text-amber-600 lg:text-3xl xl:text-4xl text-center font-poppins font-semibold">
        ADMIN DASHBOARD
      </h1>
      <div className="w-full pt-3 pb-8 flex flex-row gap-x-3 vs:gap-x-4 vm:gap-x-6 mm:gap-x-8 ms:gap-x-10 items-center justify-center overflow-x-auto flex-nowrap">
        {adminNavbarLinks.map((link) => {
          const isActive = pathname === link.route;
          // (pathname.includes(link.route) && link.route.length > 1) ||

          /* if (link.route === "/projects")
              link.route = `${link.route}/${userId}`; */

          return (
            <Link
              href={link.route}
              key={link.label}
              //   className="border-slate-200 border-2 p-1 items-center justify-center rounded-lg dark:border-slate-400"
            >
              <p
                className={`  text-center font-poppins text-sm lg:text-xl font-semibold ${
                  isActive && "text-amber-600 dark:text-amber-600"
                }`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
