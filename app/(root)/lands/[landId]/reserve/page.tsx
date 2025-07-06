import { getLandById } from "@/actions/land/getLandById";
import BookLandForm from "@/components/book-land-form";
import NullData from "@/components/nulldata";

const ReserveLand = async ({
  params,
}: {
  params: Promise<{
    landId: string;
  }>;
}) => {
  const landId = (await params).landId;

  const land = await getLandById(landId);

  if (!land) {
    return <NullData title="OOPS!! Error - No Land With This LandId Found!!" />;
  }

  return (
    <div className="flex flex-col flex-1 w-full items-center justify-center">
      <BookLandForm land={land} />
    </div>
  );
};

export default ReserveLand;
