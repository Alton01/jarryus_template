import { getPropertyById } from "@/actions/property/getPropertyById";
import React from "react";
import PropertyDetailsClient from "../_components/property-details-client";

const PropertyPage = async ({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) => {
  const propertyId = (await params).propertyId;

  const property = await getPropertyById(propertyId);

  if (!property) {
    return null;
  }

  return (
    <div className="flex flex-1 px-4 ms:px-6 lg:px-8 xl:px-10">
      <PropertyDetailsClient property={property} />
    </div>
  );
};

export default PropertyPage;
