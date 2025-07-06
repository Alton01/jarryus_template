import { getAirbnbById } from "@/actions/airbnb/getAirbnbById";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/nulldata";
import { AddAirBnBForm } from "../../_components/add-airbnb-form";

const AirbnbPage = async ({
  params,
}: {
  params: Promise<{ airbnbId: string }>;
}) => {
  const airbnbId = (await params)?.airbnbId;

  const airbnb = await getAirbnbById(airbnbId);

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
      <AddAirBnBForm airbnb={airbnb} />
    </div>
  );
};

export default AirbnbPage;
