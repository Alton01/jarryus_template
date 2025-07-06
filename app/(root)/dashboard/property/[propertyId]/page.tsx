import { getCurrentUser } from "@/actions/getCurrentUser";
import { getPropertyById } from "@/actions/property/getPropertyById";
import NullData from "@/components/nulldata";
import React from "react";
import { AddPropertyForm } from "../../_components/add-property-form";

const PropertyPage = async ({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) => {
  const propertyId = (await params)?.propertyId;

  const property = await getPropertyById(propertyId);

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return (
      <div className="flex h-[60vh] flex-l flex-col w-full bg-[#e3e8e8] dark:bg-black">
        <NullData title="OOPS!! YOU ARE NOT ADMIN, THUS UNAUTHORIZED TO VIEW THIS PAGE!! ACCESS DENIED" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 px-4 ms:px-6 lg:px-8 xl:px-10">
      <AddPropertyForm property={property} />
    </div>
  );
};

export default PropertyPage;
