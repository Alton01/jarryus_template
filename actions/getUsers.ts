"use server";

import { db } from "@/lib/db";

export const getUsers = async () => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!users) {
      return null;
    }

    return users;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
