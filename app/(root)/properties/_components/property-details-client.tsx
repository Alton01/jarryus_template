"use client";

import React, { useEffect, useState } from "react";

import { Property } from "@prisma/client";
import PropertyCarousel from "./property-carousel";
import { formatPrice } from "@/lib/utils";
import {
  Cable,
  Car,
  FileCheck2,
  Grid2X2Check,
  Home,
  MapPinHouse,
  ShieldAlert,
  Sofa,
  SquareArrowOutUpRight,
  Users,
  Waves,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PropertyDetailsClientProps {
  property: Property;
}

const PropertyDetailsClient = ({ property }: PropertyDetailsClientProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="w-full flex flex-col py-5 my-4 font-poppins px-2 mm:px-4 lg:px-6 rounded-lg bg-muted  dark:bg-[#323946] ">
      <div className="w-full flex items-center justify-center my-2">
        <h1 className="text-lg mm:text-xl md:text-2xl xl:text-3xl xl:my-4 text-amber-600 dark:text-amber-600 capitalize sm:mt-3 font-poppins font-semibold text-center">
          {property?.propertyType}
        </h1>
      </div>
      <div className="flex flex-col w-full mb-3">
        <div className=" flex w-full items-center justify-center my-3 px-6">
          <PropertyCarousel property={property} />
        </div>
        <div className="flex flex-col gap-y-3 mt-7 mb-4 w-full text-slate-700  dark:text-slate-200 ">
          <div className="flex my-5 w-full items-center justify-center">
            <Button
              className="w-[200px] flex flex-row items-center justify-center p-3 dark:bg-black dark:text-slate-200"
              asChild
            >
              <Link
                className="items-center justify-center flex flex-row"
                href={`/properties/${property.id}/reserve`}
              >
                <SquareArrowOutUpRight className="mr-2 h-8 w-8" />
                Book Viewing
              </Link>
            </Button>
          </div>

          <h1 className="text-sm mm:text-lg md:text-xl text-slate-700 capitalize dark:text-slate-200 font-semibold font-poppins line-clamp-1 ">
            {property.forSale ? "Sale Price:" : "Annual Rent:"} {""}{" "}
            <span className="text-green-600 ml-1">
              {formatPrice(property?.propertyPrice)}
            </span>
          </h1>

          <h1 className="my-3 text-sm mm:text-lg md:text-xl  font-poppins">
            {property?.propertyDescription}
          </h1>
          <h1 className="text-sm mm:text-lg md:text-xl flex flex-row capitalize font-poppins">
            <MapPinHouse className="h-6 w-6 mr-2" /> Location: {""}{" "}
            {property?.propertyLocation}
          </h1>
          <h1 className="text-sm mm:text-lg flex my-2 flex-row md:text-xl capitalize font-poppins">
            <Grid2X2Check className="h-6 w-6 mr-2" /> Size: {""}{" "}
            {property?.propertyLandSize}
          </h1>
          <h1 className="text-sm mm:text-lg flex flex-row capitalize font-poppins">
            <FileCheck2 className="h-6 w-6 mr-2" />
            Title: {""} {property?.propertyDocAvailable}
          </h1>
          <h1 className="text-sm mm:text-lg flex mt-2 flex-row md:text-xl capitalize font-poppins">
            <Car className="h-6 w-6 mr-2" /> Car Park: {""}
            {property?.parkingForCars} {""}
            {property?.parkingForCars > 1 ? "Vehicles" : "Vehicle"}
          </h1>
        </div>

        <div className="grid grid-cols-1 mm:grid-cols-2 ll:grid-cols-3 gap-3 lxl:grid-cols-4 my-6 text-slate-700  dark:text-slate-200">
          {property?.estateProperty && (
            <div className="text-sm mm:text-lg flex flex-row border-2 border-slate-700 dark:border-slate-400 rounded-lg p-2 items-center justify-center">
              {" "}
              <Home className="h-6 w-6 mr-3" /> Estate Property{" "}
            </div>
          )}
          {property?.fullyFurnished && (
            <div className="text-sm mm:text-lg flex flex-row border-2 border-slate-700 dark:border-slate-400 rounded-lg p-2 items-center justify-center">
              {" "}
              <Sofa className="h-6 w-6 mr-3" /> Fully Furnished{" "}
            </div>
          )}
          {property?.swimmingPool && (
            <div className="text-sm mm:text-lg  flex flex-row border-2 border-slate-700 dark:border-slate-400 rounded-lg p-2 items-center justify-center">
              {" "}
              <Waves className="h-6 w-6 mr-3" /> Swimming Pool{" "}
            </div>
          )}
          {property?.electricity24hour && (
            <div className="text-sm mm:text-lg  flex flex-row border-2 border-slate-700 dark:border-slate-400 rounded-lg p-2 items-center justify-center">
              {" "}
              <Cable className="h-6 w-6 mr-3" /> 24 Hour Electricity{" "}
            </div>
          )}
          {property?.servicedProperty && (
            <div className="text-sm mm:text-lg  flex flex-row border-2 border-slate-700 dark:border-slate-400 rounded-lg p-2 items-center justify-center">
              {" "}
              <Users className="h-6 w-6 mr-3" /> Serviced Property{" "}
            </div>
          )}
          {property?.securityPersonnel && (
            <div className="text-sm mm:text-lg  flex flex-row border-2 border-slate-700 dark:border-slate-400 rounded-lg p-2 items-center justify-center">
              {" "}
              <ShieldAlert className="h-6 w-6 mr-3" /> Security Personnel{" "}
            </div>
          )}
          {property?.wiFi && (
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

export default PropertyDetailsClient;
