"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

interface User {
  name: string;
  email: string;
  imageUrl?: string;
  role?: string;
}

export async function createUser(values: User, userId: string) {
  try {
    const user = await db.user.create({
      data: {
        userId: userId,
        userName: values.name,
        userEmail: values.email,
        userImage: values.imageUrl || "",
        userRole: "USER",
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(values: User, use: "webhook" | "userUpdate") {
  const Currentuser = await currentUser();

  if (!Currentuser) {
    return;
  }

  try {
    if (use === "webhook") {
      const user = await db.user.update({
        where: {
          userId: Currentuser.id,
        },
        data: {
          userName: values.name,
          userEmail: values.email,
          userImage: values.imageUrl || "",
        },
      });

      return user;
    } else {
      const user = await db.user.update({
        where: {
          userId: Currentuser.id,
        },
        data: {
          userName: values.name,
          userEmail: values.email,
          userImage: values.imageUrl || "",
        },
      });

      return user;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(userId: string) {
  const Currentuser = await currentUser();

  if (!Currentuser) {
    return;
  }

  try {
    await db.user.delete({
      where: {
        userId: userId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
