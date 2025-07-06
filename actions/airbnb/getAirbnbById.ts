"use server";

import { db } from "@/lib/db";

export const getAirbnbById = async (id: string) => {
  try {
    const airbnb = await db.airBnB.findUnique({
      where: {
        id: id,
      },
    });

    if (!airbnb) {
      return null;
    }

    return airbnb;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
