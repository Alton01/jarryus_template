import { getCurrentUser } from "@/actions/getCurrentUser";
import { getLandById } from "@/actions/land/getLandById";
import NullData from "@/components/nulldata";
import { AddLandForm } from "../../_components/add-land-form";

const LandPage = async ({
  params,
}: {
  params: Promise<{ landId: string }>;
}) => {
  const landId = (await params)?.landId;

  const land = await getLandById(landId);

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
      <AddLandForm land={land} />
    </div>
  );
};

export default LandPage;
