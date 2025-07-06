import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.userRole !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const blogPost = await db.blogpost.create({
      data: {
        ...body,
      },
    });

    revalidatePath("/blog");
    return NextResponse.json(blogPost);
  } catch (error) {
    console.log("Error at /api/blog POST", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
