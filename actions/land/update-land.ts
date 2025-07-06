"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getCurrentUser } from "../getCurrentUser";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

interface LandData {
  landLocation: string;
  landDocAvailable: string;
  landDescription: string;
  landAreaSize: string;
  estateProperty: boolean;
  isAvailable: boolean;
  landSalePrice: number;
  landImage1: string;
  landImage2: string;
  landImage3: string;
  landImage4: string;
}

export const updateLand = async (
  id: string,
  {
    landLocation,
    landDocAvailable,
    landDescription,
    landAreaSize,
    estateProperty,
    isAvailable,
    landSalePrice,
    landImage1,
    landImage2,
    landImage3,
    landImage4,
  }: LandData
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const updatedLand = await db.land.update({
      where: {
        id,
      },
      data: {
        landLocation,
        landDocAvailable,
        landDescription,
        landAreaSize,
        estateProperty,
        isAvailable,
        landSalePrice,
        landImage1,
        landImage2,
        landImage3,
        landImage4,
      },
    });

    revalidatePath("/lands");

    return updatedLand;
  } catch (error) {
    console.log(error);
  }
};
