"use client";

import React, { useEffect, useState } from "react";

import { Land } from "@prisma/client";
import LandCarousel from "./land-carousel";
import {
  FileCheck2,
  Grid2X2Check,
  Home,
  MapPinHouse,
  SquareArrowOutUpRight,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LandDetailsClientProps {
  land: Land;
}

const LandDetailsClient = ({ land }: LandDetailsClientProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="w-full flex flex-col py-5 my-4 font-poppins px-2 mm:px-4 lg:px-6 bg-muted rounded-lg dark:bg-[#323946] ">
      <div className="w-full flex items-center justify-center my-2">
        <h1 className="text-lg mm:text-xl md:text-2xl xl:text-3xl xl:my-4 text-amber-600 dark:text-amber-600 capitalize sm:mt-3 font-poppins font-semibold text-center">
          {land?.landLocation}
        </h1>
      </div>
      <div className="flex flex-col w-full mb-6">
        <div className=" flex items-center justify-center my-3 px-6 ">
          <LandCarousel land={land} />
        </div>

        <div className="flex flex-col gap-y-3 mt-7 mb-4 w-full text-slate-700  dark:text-slate-200 ">
          <div className="flex my-5 w-full items-center justify-center">
            <Button
              className="w-[200px] flex flex-row items-center justify-center p-3 dark:bg-black dark:text-slate-200"
              asChild
            >
              <Link
                className="items-center justify-center flex flex-row"
                href={`/lands/${land.id}/reserve`}
              >
                <SquareArrowOutUpRight className="mr-2 h-8 w-8" />
                Book Viewing
              </Link>
            </Button>
          </div>
          <h1 className="text-sm mm:text-lg md:text-xl text-slate-700 capitalize dark:text-slate-200 font-semibold font-poppins line-clamp-1 ">
            Sale Price: {""}
            <span className="text-green-600 ml-1">
              {formatPrice(land?.landSalePrice)}
            </span>
          </h1>

          <h1 className="my-3 text-sm mm:text-lg md:text-xl  font-poppins">
            {land?.landDescription}
          </h1>
          <h1 className="text-sm mm:text-lg md:text-xl flex flex-row capitalize font-poppins">
            <MapPinHouse className="h-6 w-6 mr-2" /> Location: {""}{" "}
            {land?.landLocation}
          </h1>
          <h1 className="text-sm mm:text-lg flex my-2 flex-row md:text-xl capitalize font-poppins">
            <Grid2X2Check className="h-6 w-6 mr-2" /> Size: {""}{" "}
            {land.landAreaSize}
          </h1>
          <h1 className="text-sm mm:text-lg flex flex-row capitalize font-poppins">
            <FileCheck2 className="h-6 w-6 mr-2" />
            Title: {""} {land?.landDocAvailable}
          </h1>
          <h1 className="text-sm mm:text-lg flex flex-row capitalize font-poppins">
            <Home className="h-6 w-6 mr-3" />
            {land?.estateProperty ? "Estate Property" : "Private Property"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LandDetailsClient;
