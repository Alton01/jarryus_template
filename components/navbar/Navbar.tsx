"use client";

import { Redressed } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { navbarLinks } from "@/constants";
import { Separator } from "../ui/separator";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

export const Navbar = () => {
  const { setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();
  const { userId } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex sticky top-0 z-[9999]  border-b-1 border-slate-400 bg-white dark:bg-[#1f242d]">
      <div className="flex flex-row items-center w-full justify-between px-4 ms:px-6 lg:px-8 xl:px-10 py-4">
        <Link className="uppercase font-poppins font-semibold" href={"/"}>
          <Image
            src={"/real-estate-logo.jpg"}
            height={40}
            width={50}
            alt="logo"
          />
        </Link>
        <div className="hidden lg:flex flex-row items-center justify-between gap-x-6 xl:gap-x-10 2xl:gap-x-12 text-lg lg:text-xl xl:text-2xl font-poppins">
          {navbarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.label}>
                <p
                  className={`${
                    isActive && "text-amber-600  dark:text-amber-600 "
                  }text-center font-poppins font-semibold `}
                >
                  {link.label}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-row items-center justify-center gap-x-4">
          <div className="flex items-center mr-1 ml-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="dark:bg-[#1f242d] dark:border-black border-[1px]"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="mt-4 p-2 space-y-2 font-poppins"
              >
                <DropdownMenuItem
                  className="p-3"
                  onClick={() => setTheme("light")}
                >
                  Light Mode
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-3"
                  onClick={() => setTheme("dark")}
                >
                  Dark Mode
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-3"
                  onClick={() => setTheme("system")}
                >
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex font-poppins text-xl">
            <ClerkLoading>
              <Loader className="flex h-6 w-6 ml-2 animate-spin items-center justify-center" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <Button
                  className="min-w-fit ml-3 p-3"
                  variant={"default"}
                  size={"icon"}
                  asChild
                >
                  <Link href={"/sign-in"}>Log In</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <div className="flex ml-3 ">
                  <UserButton />
                </div>
              </SignedIn>
            </ClerkLoaded>
          </div>
          <div className="flex lg:hidden">
            <Sheet>
              <SheetTrigger className="ml-3" asChild>
                <Menu />
              </SheetTrigger>

              <SheetContent className="flex flex-col w-[250px] min-w-[250px] max-w-[250px] gap-6 lg:hidden mt-20 dark:bg-[#1f242d] ">
                <SheetHeader className="pt-6 w-full">
                  <SheetTitle className="text-center text-amber-600">
                    Jarryus Properties & Management Services Ltd.
                  </SheetTitle>
                </SheetHeader>
                <Separator />
                <SheetClose asChild>
                  <div className="flex flex-col w-full gap-y-4 items-center justify-center text-lg font-poppins">
                    {navbarLinks.map((link) => {
                      const isActive =
                        (pathname.includes(link.route) &&
                          link.route.length > 1) ||
                        pathname === link.route;

                      return (
                        <Link href={link.route} key={link.label}>
                          <SheetClose asChild>
                            <p
                              className={` text-center font-poppins font-semibold ${
                                isActive &&
                                "text-amber-600  dark:text-amber-600 "
                              }`}
                            >
                              {link.label}
                            </p>
                          </SheetClose>
                        </Link>
                      );
                    })}
                  </div>
                </SheetClose>

                <Separator className="my-1" />

                <ClerkLoading>
                  <Loader className="h-6 w-6 ml-2 animate-spin items-center justify-center" />
                </ClerkLoading>
                <ClerkLoaded>
                  <SignedOut>
                    <SheetClose asChild>
                      <Link href={"/sign-in"} className="w-full text-center">
                        Log In
                      </Link>
                    </SheetClose>
                  </SignedOut>
                </ClerkLoaded>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};
