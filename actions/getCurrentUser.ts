"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getCurrentUser() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return null;
    }

    const user = await db.user.findUnique({
      where: {
        userId: clerkUser?.id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}
