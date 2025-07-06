import { getLandById } from "@/actions/land/getLandById";
import React from "react";
import LandDetailsClient from "../_components/land-details-client";

const LandPage = async ({
  params,
}: {
  params: Promise<{
    landId: string;
  }>;
}) => {
  const landId = (await params).landId;

  const land = await getLandById(landId);

  if (!land) {
    return null;
  }

  return (
    <div className="flex flex-1 px-4 ms:px-6 lg:px-8 xl:px-10">
      <LandDetailsClient land={land} />
    </div>
  );
};

export default LandPage;
