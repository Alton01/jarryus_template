import { getPropertyById } from "@/actions/property/getPropertyById";
import BookPropertyForm from "@/components/book-property-form";
import NullData from "@/components/nulldata";

const ReserveProperty = async ({
  params,
}: {
  params: Promise<{
    propertyId: string;
  }>;
}) => {
  const propertyId = (await params).propertyId;

  const property = await getPropertyById(propertyId);

  if (!property) {
    return (
      <NullData title="OOPS!! Error - No Property With This PropertyId Found!!" />
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center">
      <BookPropertyForm property={property} />
    </div>
  );
};

export default ReserveProperty;
