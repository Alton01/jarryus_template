"use server";

import { db } from "@/lib/db";

export const getBookings = async () => {
  try {
    const bookings = await db.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!bookings) {
      return null;
    }

    return bookings;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
