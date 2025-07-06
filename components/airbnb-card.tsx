"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowUpLeft,
  SquareArrowOutUpRight,
  SquarePen,
  Waves,
} from "lucide-react";
import { AirBnB } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

interface AirbnbCardProps {
  airbnb: AirBnB;
  type: "Public" | "Admin";
}

const AirbnbCard = ({ airbnb, type }: AirbnbCardProps) => {
  const router = useRouter();
  return (
    <Card className="relative w-full flex flex-col max-w-[500px] h-[520px] mm:h-[520px] lg:h-[520px] 2xl:h-[520px] z-50 shadow-lg dark:bg-[#1f242d]">
      <Image
        src={airbnb?.airBnBImage1}
        alt={airbnb?.airBnBType}
        blurDataURL={airbnb?.airBnBImage1}
        width={200}
        height={100}
        className="object-fill w-full h-[250px]"
      />

      <div className="flex flex-col p-2 gap-y-3 ">
        <div className="w-full items-center pt-1 justify-center">
          <h1 className="text-lg text-center capitalize text-slate-700 dark:text-slate-300 font-semibold font-poppins line-clamp-1">
            {airbnb?.airBnBType}
          </h1>
        </div>
        <div className="w-full flex flex-col items-center gap-y-3 justify-center">
          <h1 className="text-sm  text-center  text-slate-700 capitalize dark:text-slate-300 font-semibold font-poppins line-clamp-1 ">
            {airbnb?.airBnBLocation}
          </h1>
          <h1 className="text-sm py-1 text-center text-slate-700 capitalize dark:text-slate-300 font-semibold font-poppins line-clamp-1 ">
            Daily Price: {""}
            <span className="text-green-600 ml-1">
              {formatPrice(airbnb?.airBnBDailyPrice)}
            </span>
          </h1>

          <h1 className="text-sm  text-center text-slate-700 capitalize dark:text-slate-300 font-semibold font-poppins line-clamp-1 ">
            Weekly Price: {""}
            <span className="text-green-600 ml-1">
              {formatPrice(airbnb?.airBnBWeeklyPrice)}
            </span>
          </h1>

          {airbnb?.swimmingPool && (
            <div className="flex flex-row items-center justify-center p-2 text-blue-600">
              <Waves className="h-6 w-6 mr-2" />
              Swimming Pool
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full p-2 absolute bottom-0 px-3">
        {type === "Public" && (
          <div className="flex flex-row w-full items-center justify-center ">
            <Button
              onClick={() => router.push(`/airbnb/${airbnb.id}`)}
              className="font-poppins items-center justify-center p-2 w-[200px] dark:bg-black dark:text-slate-300"
            >
              <SquareArrowOutUpRight className="mr-2 h-8 w-8" />
              View AirBnB
            </Button>
          </div>
        )}
        {type === "Admin" && (
          <div className="flex flex-row w-full items-center justify-center ">
            <Button
              onClick={() => router.push(`/dashboard/airbnb/${airbnb.id}`)}
              className="font-poppins p-2 items-center justify-center w-[200px] dark:bg-black dark:text-slate-300"
            >
              <SquarePen className="mr-2 h-8 w-8" />
              Edit AirBnB
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AirbnbCard;
