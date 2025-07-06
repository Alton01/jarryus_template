"use server";

import { db } from "@/lib/db";

export const getAirbnb = async () => {
  try {
    const airbnbs = await db.airBnB.findMany({
      orderBy: {
        airBnBDailyPrice: "desc",
      },
    });

    if (!airbnbs) {
      return null;
    }

    return airbnbs;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
