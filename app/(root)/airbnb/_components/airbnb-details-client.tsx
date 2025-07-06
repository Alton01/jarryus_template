"use client";

import React, { useEffect, useState } from "react";

import { AirBnB } from "@prisma/client";
import AirbnbCarousel from "./airbnb-carousel";
import { formatPrice } from "@/lib/utils";
import {
  Cable,
  Car,
  MapPinHouse,
  ShieldAlert,
  Sofa,
  SquareArrowOutUpRight,
  Users,
  Waves,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AirbnbDetailsClientProps {
  airbnb: AirBnB;
}

const AirbnbDetailsClient = ({ airbnb }: AirbnbDetailsClientProps) => {
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
          {airbnb?.airBnBType}
        </h1>
      </div>
      <div className="flex flex-col w-full mb-3">
        <div className=" flex items-center justify-center my-3 px-6 ">
          <AirbnbCarousel airbnb={airbnb} />
        </div>

        <div className="flex flex-col gap-y-3 my-4 w-full text-slate-700  dark:text-slate-200 ">
          <div className="flex my-5 w-full items-center justify-center">
            <Button
              className="w-[200px] flex flex-row items-center justify-center p-3 dark:bg-black dark:text-slate-200"
              asChild
            >
              <Link
                className="items-center justify-center flex flex-row"
                href={`/airbnb/${airbnb.id}/reserve`}
              >
                <SquareArrowOutUpRight className="mr-2 h-8 w-8" />
                Book AirBnB
              </Link>
            </Button>
          </div>
          <h1 className="text-sm mm:text-lg md:text-xl text-slate-700 capitalize dark:text-slate-200 font-semibold font-poppins line-clamp-1 ">
            Daily Price: {""}
            <span className="text-green-600 ml-1">
              {formatPrice(airbnb?.airBnBDailyPrice)}
            </span>
          </h1>

          <h1 className="text-sm mm:text-lg md:text-xl text-slate-700 capitalize dark:text-slate-200 font-semibold font-poppins line-clamp-1 ">
            7 Days Price: {""}
            <span className="text-green-600 ml-1">
              {formatPrice(airbnb?.airBnBWeeklyPrice)}
            </span>
          </h1>

          <h1 className="text-sm mm:text-lg md:text-xl text-slate-700 capitalize dark:text-slate-200 font-semibold font-poppins line-clamp-1 ">
            30 Days Price: {""}
            <span className="text-green-600 ml-1">
              {formatPrice(airbnb?.airBnBMonthlyPrice)}
            </span>
          </h1>

          <h1 className="my-3 text-sm mm:text-lg md:text-xl  font-poppins">
            {airbnb?.airBnBDescription}
          </h1>
          <h1 className="text-sm mm:text-lg md:text-xl flex flex-row capitalize font-poppins">
            <MapPinHouse className="h-6 w-6 mr-2" /> Location: {""}{" "}
            {airbnb?.airBnBLocation}
          </h1>

          <h1 className="text-sm mm:text-lg flex mt-2 flex-row md:text-xl capitalize font-poppins">
            <Car className="h-6 w-6 mr-2" /> Car Park: {""}
            {airbnb?.parkingForCars} {""}
            {airbnb?.parkingForCars > 1 ? "Vehicles" : "Vehicle"}
          </h1>
        </div>

        <div className="grid grid-cols-1 mm:grid-cols-2 ll:grid-cols-3 gap-3 lxl:grid-cols-4 my-6 text-slate-700  dark:text-slate-200">
          {airbnb?.fullyFurnished && (
            <div className="text-sm mm:text-lg flex flex-row border-2 border-slate-700 dark:border-slate-400 rounded-lg p-2 items-center justify-center">
              {" "}
              <Sofa className="h-6 w-6 mr-3" /> Fully Furnished{" "}
            </div>
          )}
          {airbnb?.swimmingPool && (
            <div className="text-sm mm:text-lg  flex flex-row border-2 border-slate-700 dark:border-slate-400 rounded-lg p-2 items-center justify-center">
              {" "}
              <Waves className="h-6 w-6 mr-3" /> Swimming Pool{" "}
            </div>
          )}
          {airbnb?.electricity24hour && (
            <div className="text-sm mm:text-lg  flex flex-row border-2 border-slate-700 dark:border-slate-400 rounded-lg p-2 items-center justify-center">
              {" "}
              <Cable className="h-6 w-6 mr-3" /> 24 Hour Electricity{" "}
            </div>
          )}
          {airbnb?.servicedProperty && (
            <div className="text-sm mm:text-lg  flex flex-row border-2 border-slate-700 dark:border-slate-400 rounded-lg p-2 items-center justify-center">
              {" "}
              <Users className="h-6 w-6 mr-3" /> Serviced Property{" "}
            </div>
          )}
          {airbnb?.securityPersonnel && (
            <div className="text-sm mm:text-lg  flex flex-row border-2 border-slate-700 dark:border-slate-400 rounded-lg p-2 items-center justify-center">
              {" "}
              <ShieldAlert className="h-6 w-6 mr-3" /> Security Personnel{" "}
            </div>
          )}
          {airbnb?.wiFi && (
            <div className="text-sm mm:text-lg flex flex-row border-2 border-slate-700 dark:border-slate-400 rounded-lg p-2 items-center justify-center">
              {" "}
              <Wifi className="h-6 w-6 mr-3" /> WiFi Available{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AirbnbDetailsClient;
