"use server";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../getCurrentUser";

export const deleteAirbnb = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.airBnB.delete({
      where: {
        id,
      },
    });

    revalidatePath("/airbnb");
  } catch (error) {
    console.log(error);
  }
};
