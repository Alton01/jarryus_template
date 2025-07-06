"use server";

import { db } from "@/lib/db";

export const getBookingById = async (id: string) => {
  try {
    const booking = await db.booking.findUnique({
      where: {
        id: id,
      },
    });

    if (!booking) {
      return null;
    }

    return booking;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
