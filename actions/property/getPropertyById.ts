"use server";

import { db } from "@/lib/db";

export const getPropertyById = async (id: string) => {
  try {
    const property = await db.property.findUnique({
      where: {
        id: id,
      },
    });

    if (!property) {
      return null;
    }

    return property;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
