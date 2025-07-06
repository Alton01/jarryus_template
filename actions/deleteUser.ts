"use server";

import { NextResponse } from "next/server";
import { getCurrentUser } from "./getCurrentUser";
import { db } from "@/lib/db";

export const deleteUser = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    await db.user.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
