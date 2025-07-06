"use server";

import { db } from "@/lib/db";

export const getLands = async () => {
  try {
    const lands = await db.land.findMany({
      orderBy: {
        landSalePrice: "desc",
      },
    });

    if (!lands) {
      return null;
    }

    return lands;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
