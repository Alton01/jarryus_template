import NullData from "@/components/nulldata";
import AdminBookingClient from "../../_components/admin-booking-client";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { getBookingById } from "@/actions/booking/getBookingById";

const AdminBookingPage = async ({
  params,
}: {
  params: Promise<{
    bookingId: string;
  }>;
}) => {
  const currentUser = await getCurrentUser();

  const bookingId = (await params).bookingId;

  const booking = await getBookingById(bookingId);

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return (
      <NullData title="OOPS!! YOU ARE NOT ADMIN, THUS UNAUTHORIZED TO VIEW THIS PAGE!! ACCESS DENIED" />
    );
  }

  if (!booking) {
    return (
      <NullData title="OOPS!! Booking With This Booking ID Cannot Be Found" />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-2 flex-1 py-4 w-full">
      <AdminBookingClient booking={booking} />
    </div>
  );
};

export default AdminBookingPage;
