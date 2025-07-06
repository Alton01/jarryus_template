"use server";

import { db } from "@/lib/db";

export const getLandById = async (id: string) => {
  try {
    const land = await db.land.findUnique({
      where: {
        id: id,
      },
    });

    if (!land) {
      return null;
    }

    return land;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
