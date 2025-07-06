import { getProperties } from "@/actions/property/getProperties";
import PropertyCard from "@/components/property-card";
import React from "react";

const PropertyPage = async () => {
  const properties = await getProperties();

  if (properties && properties.length < 1)
    return (
      <div className="flex flex-1 flex-col h-96 min-h-96 w-full py-10 px-4 ms:px-6 lg:px-8 xl:px-10 bg-[#e3e8e8] dark:bg-black">
        <h1 className="font-poppins text-center font-bold text-2xl xl:text-3xl pb-10 pt-7 text-amber-600 dark:text-amber-600">
          {" "}
          PROPERTIES{""}{" "}
        </h1>
        <div className="flex flex-col flex-1 w-full h-full items-center justify-center">
          <h1 className="text-center text-lg lg:text-xl xl:text-2xl font-bold text-slate-700 dark:text-slate-300">
            OOPS!!! NO PROPERTY ADDED YET. CHECK BACK LATER.
          </h1>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col py-5 flex-1 h-full pb-10 px-4 ms:px-6 lg:px-8 xl:px-10 gap-y-4 bg-[#e3e8e8] dark:bg-black">
      <div className="w-full items-center justify-center">
        <h1 className="font-poppins text-center font-bold text-3xl xl:text-4xl pt-6 text-amber-600 dark:text-amber-600 pb-7">
          PROPERTIES
        </h1>
      </div>
      <div className="w-full flex flex-row items-center justify-center ">
        <div className="w-full grid grid-cols-1 mm:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-4 max-w-7xl">
          {properties?.map((property) => (
            <div
              key={property.id}
              className="w-full flex flex-row items-center justify-center"
            >
              <PropertyCard
                key={property.id}
                property={property}
                type="Public"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
