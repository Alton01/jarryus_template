import Image from "next/image";
import React from "react";

export const HomeSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3  xl:grid-cols-4 w-full pt-10 pb-5 bg-white dark:bg-[black] px-4 ms:px-6 lg:px-8 xl:px-10 items-center justify-center">
      <div className="flex flex-col w-full items-center justify-center lg:col-span-2 xl:col-span-3 font-poppins space-y-2">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-poppins text-amber-600 dark:text-amber-600 text-center font-bold py-4 ">
          JARRYUS PROPERTIES & MANAGEMENT SERVICES LTD.
        </h1>
        <h1 className="text-lg lg:text-xl text-center lg:px-10 py-4 text-slate-700 dark:text-slate-200 font-poppins">
          Building lasting value with exceptional construction, managing
          properties with precision and care, and delivering expert property
          surveying and valuation services that elevate your investments and
          redefine spaces for the future.
        </h1>
      </div>
      <div className="flex flex-row lg:col-span-1 xl:col-span-1 items-center justify-center py-4 mm:py-0 w-full">
        <Image
          className="w-full object-fill min-w-[160px] max-w-[250px]  vv:max-w-[300px] min-h-[250px] max-h-[250px] xl:max-h-[300px]"
          src={"/real-estate-logo.jpg"}
          alt="profile picture"
          width={250}
          height={200}
        />
      </div>
    </div>
  );
};
