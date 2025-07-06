import React from "react";
import { getBookingById } from "@/actions/booking/getBookingById";
import UserBookingClient from "../../../../components/booking/user-booking-client";

const BookingPage = async ({
  params,
}: {
  params: Promise<{
    bookingId: string;
  }>;
}) => {
  const bookingId = (await params).bookingId;

  const booking = await getBookingById(bookingId);

  if (!booking) {
    return null;
  }

  return (
    <div className="flex flex-1 px-4 ms:px-6 lg:px-8 xl:px-10">
      <UserBookingClient booking={booking} />
    </div>
  );
};

export default BookingPage;
