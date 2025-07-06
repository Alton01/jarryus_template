import { getAirbnbById } from "@/actions/airbnb/getAirbnbById";
import React from "react";
import AirbnbDetailsClient from "../_components/airbnb-details-client";

const AirbnbPage = async ({
  params,
}: {
  params: Promise<{
    airbnbId: string;
  }>;
}) => {
  const airbnbId = (await params).airbnbId;

  const airbnb = await getAirbnbById(airbnbId);

  if (!airbnb) {
    return null;
  }

  return (
    <div className="flex flex-1 px-4 ms:px-6 lg:px-8 xl:px-10">
      <AirbnbDetailsClient airbnb={airbnb} />
    </div>
  );
};

export default AirbnbPage;
