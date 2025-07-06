"use server";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../getCurrentUser";

interface AirbnbData {
  airBnBLocation: string;
  airBnBDescription: string;
  airBnBType: string;
  fullyFurnished: boolean;
  swimmingPool: boolean;
  electricity24hour: boolean;
  servicedProperty: boolean;
  securityPersonnel: boolean;
  wiFi: boolean;
  isAvailable: boolean;
  parkingForCars: number;
  airBnBDailyPrice: number;
  airBnBWeeklyPrice: number;
  airBnBMonthlyPrice: number;
  airBnBImage1: string;
  airBnBImage2: string;
  airBnBImage3: string;
  airBnBImage4: string;
  airBnBImage5: string;
  airBnBImage6: string;
  airBnBImage7: string;
}

export const createAirbnb = async ({
  airBnBLocation,
  airBnBDescription,
  airBnBType,
  fullyFurnished,
  swimmingPool,
  electricity24hour,
  servicedProperty,
  securityPersonnel,
  wiFi,
  isAvailable,
  parkingForCars,
  airBnBDailyPrice,
  airBnBWeeklyPrice,
  airBnBMonthlyPrice,
  airBnBImage1,
  airBnBImage2,
  airBnBImage3,
  airBnBImage4,
  airBnBImage5,
  airBnBImage6,
  airBnBImage7,
}: AirbnbData) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const newAirbnb = await db.airBnB.create({
      data: {
        airBnBLocation,
        airBnBDescription,
        airBnBType,
        fullyFurnished,
        swimmingPool,
        electricity24hour,
        servicedProperty,
        securityPersonnel,
        wiFi,
        isAvailable,
        parkingForCars,
        airBnBDailyPrice,
        airBnBWeeklyPrice,
        airBnBMonthlyPrice,
        airBnBImage1,
        airBnBImage2,
        airBnBImage3,
        airBnBImage4,
        airBnBImage5,
        airBnBImage6,
        airBnBImage7,
      },
    });

    revalidatePath("/airbnb");

    return newAirbnb;
  } catch (error) {
    console.log(error);
  }
};
