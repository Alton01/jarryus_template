"use server";

import { db } from "@/lib/db";

interface BookingData {
  bookerName: string;
  bookerPhoneNumber: string;
  bookerEmail?: string | undefined;
  propertyViewingDate: string;
  propertyType: string;
  propertyId: string;
  propertyName: string;
}

export const createBooking = async ({
  bookerName,
  bookerPhoneNumber,
  bookerEmail,
  propertyViewingDate,
  propertyType,
  propertyId,
  propertyName,
}: BookingData) => {
  try {
    const newBooking = await db.booking.create({
      data: {
        bookerName,
        bookerPhoneNumber,
        bookerEmail,
        propertyViewingDate,
        propertyType,
        propertyId,
        propertyName,
      },
    });

    return newBooking;
  } catch (error) {
    console.log(error);
  }
};
