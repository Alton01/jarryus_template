"use server";

import { NextResponse } from "next/server";
import { getCurrentUser } from "../getCurrentUser";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteLand = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.land.delete({
      where: {
        id,
      },
    });

    revalidatePath("/lands");
  } catch (error) {
    console.log(error);
  }
};
