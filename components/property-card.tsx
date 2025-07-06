"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { SquareArrowOutUpRight, SquarePen } from "lucide-react";
import { Property } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  type: "Public" | "Admin";
}

const PropertyCard = ({ property, type }: PropertyCardProps) => {
  const router = useRouter();
  return (
    <Card className="relative w-full flex flex-col max-w-[500px] h-[520px] mm:h-[520px] lg:h-[520px] 2xl:h-[520px] z-50 shadow-lg dark:bg-[#1f242d]">
      <Image
        src={property.propertyImage1}
        alt={property.propertyType}
        blurDataURL={property.propertyImage1}
        width={200}
        height={100}
        className="object-fill w-full h-[250px]"
      />
      <div className="flex w-24 h-fit rounded-full z-50 p-2 absolute top-1 right-2 bg-amber-600 dark:bg-amber-600 items-center justify-center">
        <h1 className="text-black dark:text-black text-lg text-center font-bold font-poppins">
          {property.forSale ? "For Sale" : "For Rent"}
        </h1>
      </div>
      <div className="flex flex-col p-2 gap-y-3 ">
        <div className="w-full items-center pt-1 justify-center">
          <h1 className="text-lg text-center capitalize  text-slate-700 dark:text-slate-300 font-semibold font-poppins line-clamp-1">
            {property.propertyType}
          </h1>
        </div>
        <div className="w-full flex flex-col items-center gap-y-3 justify-center">
          <h1 className="text-sm  text-center   text-slate-700 capitalize dark:text-slate-300 font-semibold font-poppins line-clamp-1 ">
            {property.propertyLocation}
          </h1>
          <h1 className="text-sm  text-center  text-slate-700 capitalize dark:text-slate-300 font-semibold font-poppins line-clamp-1 ">
            {property?.estateProperty ? "Estate Property" : "Private Property"}
          </h1>
          <h1 className="text-sm  text-center  text-slate-700 capitalize dark:text-slate-300 font-semibold font-poppins line-clamp-1 ">
            {property?.propertyDocAvailable}
          </h1>
          <h1 className="text-sm  text-center text-slate-700 capitalize dark:text-slate-300 font-semibold font-poppins line-clamp-1 ">
            {property.forSale ? "Sale Price:" : "Rent Price:"} {""}{" "}
            <span className="text-green-600 ml-1">
              {formatPrice(property?.propertyPrice)}
            </span>
          </h1>
          <h1 className="text-sm text-center  text-slate-700 capitalize dark:text-slate-300 font-semibold font-poppins line-clamp-1 ">
            {" "}
            {property.propertyLandSize}
          </h1>
        </div>
      </div>

      <div className="flex w-full p-2 absolute bottom-0 px-3">
        {type === "Public" && (
          <div className="flex flex-row w-full items-center justify-center ">
            <Button
              onClick={() => router.push(`/properties/${property.id}`)}
              className="font-poppins items-center justify-center p-2 w-[200px] dark:bg-black dark:text-slate-300"
            >
              <SquareArrowOutUpRight className="mr-2 h-8 w-8" />
              View Property
            </Button>
          </div>
        )}
        {type === "Admin" && (
          <div className="flex flex-row w-full items-center justify-center ">
            <Button
              onClick={() => router.push(`/dashboard/property/${property.id}`)}
              className="font-poppins p-2 items-center justify-center w-[200px] dark:bg-black dark:text-slate-300"
            >
              <SquarePen className="mr-2 h-8 w-8" />
              Edit Property
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PropertyCard;
