import { getAirbnbById } from "@/actions/airbnb/getAirbnbById";
import BookAirbnbForm from "@/components/book-airbnb-form";
import NullData from "@/components/nulldata";

const ReserveAirbnbProperty = async ({
  params,
}: {
  params: Promise<{
    airbnbId: string;
  }>;
}) => {
  const airbnbId = (await params).airbnbId;

  const airbnb = await getAirbnbById(airbnbId);

  if (!airbnb) {
    return (
      <NullData title="OOPS!! Error - No Airbnb Property With This AirBnB PropertyId Found!!" />
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center ">
      <BookAirbnbForm airbnb={airbnb} />
    </div>
  );
};

export default ReserveAirbnbProperty;
