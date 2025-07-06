"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { SquareArrowOutUpRight, SquarePen } from "lucide-react";
import { Land } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

interface LandCardProps {
  land: Land;
  type: "Public" | "Admin";
}

const LandCard = ({ land, type }: LandCardProps) => {
  const router = useRouter();
  return (
    <Card className="relative w-full flex flex-col max-w-[500px] h-[490px] mm:h-[490px] lg:h-[490px] 2xl:h-[495px] z-50 shadow-lg dark:bg-[#1f242d]">
      <Image
        src={land?.landImage1}
        alt={land?.landLocation}
        blurDataURL={land?.landImage1}
        width={200}
        height={100}
        className="object-fill w-full h-[250px]"
      />
      <div className="flex w-24 h-fit rounded-full z-50 p-2 absolute top-1 right-2 bg-amber-600 dark:bg-amber-600 items-center justify-center">
        <h1 className="text-black dark:text-black text-lg text-center font-bold font-poppins">
          For Sale
        </h1>
      </div>
      <div className="flex flex-col p-2 gap-y-3 ">
        <div className="w-full items-center pt-1 justify-center">
          <h1 className="text-lg text-center capitalize text-slate-700 dark:text-slate-300 font-semibold font-poppins line-clamp-1">
            {land?.landLocation}
          </h1>
        </div>
        <div className="w-full flex flex-col items-center gap-y-3 justify-center">
          <h1 className="text-sm  text-center  text-slate-700 capitalize dark:text-slate-300 font-semibold font-poppins line-clamp-1 ">
            {land?.estateProperty ? "Estate Property" : "Private Property"}
          </h1>
          <h1 className="text-sm  text-center  text-slate-700 capitalize dark:text-slate-300 font-semibold font-poppins line-clamp-1 ">
            {land?.landDocAvailable}
          </h1>
          <h1 className="text-sm  text-center text-green-600 capitalize dark:text-green-600 font-semibold font-poppins line-clamp-1 ">
            <span className="text-green-600 ml-1">
              {formatPrice(land.landSalePrice)}
            </span>
          </h1>
          <h1 className="text-sm text-center  text-slate-700 capitalize dark:text-slate-300 font-semibold font-poppins line-clamp-1 ">
            {land?.landAreaSize}
          </h1>
        </div>
      </div>

      <div className="flex w-full p-2 absolute bottom-0 px-3">
        {type === "Public" && (
          <div className="flex flex-row w-full items-center justify-center ">
            <Button
              onClick={() => router.push(`/lands/${land.id}`)}
              className="font-poppins items-center justify-center p-2 w-[200px] dark:bg-black dark:text-slate-300"
            >
              <SquareArrowOutUpRight className="mr-2 h-8 w-8" />
              View Land
            </Button>
          </div>
        )}
        {type === "Admin" && (
          <div className="flex flex-row w-full items-center justify-center ">
            <Button
              onClick={() => router.push(`/dashboard/land/${land.id}`)}
              className="font-poppins p-2 items-center justify-center w-[200px] dark:bg-black dark:text-slate-300"
            >
              <SquarePen className="mr-2 h-8 w-8" />
              Edit Land
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LandCard;
