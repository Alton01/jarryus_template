"use client";
import Link from "next/link";
import { Redressed } from "next/font/google";
import { useEffect, useState } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <footer>
      <div className="w-full bg-muted pt-10 font-poppins pb-10 dark:bg-[black] z-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 px-4 items-center justify-center lg:justify-between text-slate-700 dark:text-slate-300">
          <div className="flex flex-col font-semibold space-y-4 text-center items-center justify-center">
            <Link
              className={`${redressed.className} text-amber-600 dark:text-amber-600 font-bold text-3xl`}
              href={"/"}
            >
              Jarryus Properties & Management Services Ltd.
            </Link>
            <h2>+234(0)7063853173</h2>
            <h2>Wuse 2, Abuja, Nigeria</h2>
          </div>

          <div className="flex flex-col col-span-1 lg:col-span-2 space-y-4 items-center justify-center text-center w-full ">
            <h1 className="text-2xl font-semibold text-amber-600 dark:text-amber-600">
              About Us
            </h1>
            <h2 className="text-md font-semibold">
              Building lasting value with exceptional construction, managing
              properties with precision and care, and delivering property
              surveying and valuation services that elevate your investments and
              redefine spaces for the future.
            </h2>
          </div>
        </div>
        <div className="w-full items-center justify-center my-6">
          <p className="text-md text-center font-semibold  text-slate-700 dark:text-slate-300">
            &copy; 2025{" "}
            <span
              className={`${redressed.className} text-lg text-amber-600 dark:text-amber-600`}
            >
              {""} Jarryus Properties & Management Services Limited. {""}
            </span>{" "}
            | {""}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
