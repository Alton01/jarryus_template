"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "../getCurrentUser";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

interface PropertyData {
  propertyLocation: string;
  propertyDescription: string;
  propertyDocAvailable: string;
  propertyType: string;
  propertyLandSize: string;
  estateProperty: boolean;
  fullyFurnished: boolean;
  swimmingPool: boolean;
  electricity24hour: boolean;
  servicedProperty: boolean;
  securityPersonnel: boolean;
  wiFi: boolean;
  forSale: boolean;
  isAvailable: boolean;
  parkingForCars: number;
  propertyPrice: number;
  propertyImage1: string;
  propertyImage2: string;
  propertyImage3: string;
  propertyImage4: string;
  propertyImage5: string;
  propertyImage6: string;
  propertyImage7: string;
}

export const createProperty = async ({
  propertyLocation,
  propertyDescription,
  propertyDocAvailable,
  propertyType,
  propertyLandSize,
  estateProperty,
  fullyFurnished,
  swimmingPool,
  electricity24hour,
  servicedProperty,
  securityPersonnel,
  wiFi,
  forSale,
  isAvailable,
  parkingForCars,
  propertyPrice,
  propertyImage1,
  propertyImage2,
  propertyImage3,
  propertyImage4,
  propertyImage5,
  propertyImage6,
  propertyImage7,
}: PropertyData) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const newProperty = await db.property.create({
      data: {
        propertyLocation,
        propertyDescription,
        propertyDocAvailable,
        propertyType,
        propertyLandSize,
        estateProperty,
        fullyFurnished,
        swimmingPool,
        electricity24hour,
        servicedProperty,
        securityPersonnel,
        wiFi,
        forSale,
        isAvailable,
        parkingForCars,
        propertyPrice,
        propertyImage1,
        propertyImage2,
        propertyImage3,
        propertyImage4,
        propertyImage5,
        propertyImage6,
        propertyImage7,
      },
    });

    revalidatePath("/properties");

    return newProperty;
  } catch (error) {
    console.log(error);
  }
};
