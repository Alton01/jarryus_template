import { getCurrentUser } from "@/actions/getCurrentUser";

import NullData from "@/components/nulldata";
import React from "react";
import { AddPropertyButton } from "../_components/add-property-btn";
import PropertyCard from "@/components/property-card";
import { getAirbnb } from "@/actions/airbnb/getAirbnb";
import { AddAirbnbButton } from "../_components/add-airbnb-btn";
import AirbnbCard from "@/components/airbnb-card";

const AirbnbsAdminPage = async () => {
  const currentUser = await getCurrentUser();
  const airbnbs = await getAirbnb();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return (
      <div className="flex h-[60vh] flex-l flex-col w-full bg-[#e3e8e8] dark:bg-black">
        <NullData title="OOPS!! YOU ARE NOT ADMIN, THUS UNAUTHORIZED TO VIEW THIS PAGE!! ACCESS DENIED" />
      </div>
    );
  }

  if (airbnbs && airbnbs.length < 1)
    return (
      <div className="flex flex-1 flex-col h-96 min-h-96 w-full py-10 px-4 ms:px-6 lg:px-8 xl:px-10 bg-[#e3e8e8] dark:bg-black">
        <h1 className="font-poppins text-center font-bold text-2xl xl:text-3xl pb-10 pt-7 text-slate-700 dark:text-slate-400 ">
          {" "}
          AIRBNBS
        </h1>
        <div className="flex flex-col pt-10 w-full h-full items-center justify-center">
          <h1 className="text-center text-lg lg:text-xl xl:text-2xl font-bold text-slate-700 dark:text-slate-400">
            OOPS!!! NO AIRBNB ADDED YET.
          </h1>
          <div className="flex flex-row items-center justify-center py-4">
            <AddAirbnbButton />
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col flex-1 h-full py-6 gap-y-5 px-4 ms:px-6 lg:px-8 xl:px-10 bg-[#e3e8e8] dark:bg-black">
      <div className="flex flex-col w-full py-4 gap-y-2">
        <h1 className="uppercase text-2xl text-slate-700 dark:text-slate-300  font-semibold lg:text-3xl xl:text-4xl text-center font-poppins">
          AIRBNBS
        </h1>
        <h1 className=" text-xl lg:text-2xl xl:text-3xl text-left font-poppins text-slate-700 dark:text-slate-300 py-3">
          Welcome Back {""} {currentUser?.userName}
        </h1>

        <div className="flex flex-row items-center justify-center py-4">
          <AddAirbnbButton />
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-center">
        <div className="w-full grid grid-cols-1 mm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4 max-w-7xl">
          {airbnbs?.map((airbnb) => (
            <AirbnbCard airbnb={airbnb} key={airbnb.id} type="Admin" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirbnbsAdminPage;
