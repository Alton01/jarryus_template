"use server";

import { db } from "@/lib/db";

export const getProperties = async () => {
  try {
    const properties = await db.property.findMany({
      orderBy: {
        propertyPrice: "desc",
      },
    });

    if (!properties) {
      return null;
    }

    return properties;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
