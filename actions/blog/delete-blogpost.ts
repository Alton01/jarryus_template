"use server";

import { NextResponse } from "next/server";
import { getCurrentUser } from "../getCurrentUser";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteBlogpost = async (id: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.blogpost.delete({
      where: {
        id,
      },
    });

    revalidatePath("/blog");
  } catch (error) {
    console.log(error);
  }
};
