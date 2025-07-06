"use server";

import { NextResponse } from "next/server";
import { getCurrentUser } from "../getCurrentUser";
import { db } from "@/lib/db";

export const deleteBooking = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.booking.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
