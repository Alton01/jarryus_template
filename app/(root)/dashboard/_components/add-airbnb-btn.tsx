"use client";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

export const AddAirbnbButton = () => {
  return (
    <div className="flex">
      <Button
        asChild
        className="font-poppins p-4 w-[200px] flex flex-row items-center justify-center dark:bg-slate-700 dark:text-slate-200"
      >
        <Link href="/dashboard/airbnb/new">
          <CirclePlus className="mr-2 h-8 w-8" />
          Add An AirBnB
        </Link>
      </Button>
    </div>
  );
};
