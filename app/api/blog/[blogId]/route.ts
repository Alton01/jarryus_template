import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ blogId: string }> }
) {
  try {
    const body = await req.json();

    const currentUser = await getCurrentUser();

    const blogId = (await params).blogId;

    if (!blogId) {
      return new NextResponse("blogId is required", { status: 400 });
    }

    if (!currentUser || currentUser.userRole !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const blog = await db.blogpost.update({
      where: {
        id: blogId,
      },
      data: { ...body },
    });

    revalidatePath("/blog");
    return NextResponse.json(blog);
  } catch (error) {
    console.log("Error at /api/blog/blogId PATCH", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ blogId: string }> }
) {
  try {
    const currentUser = await getCurrentUser();

    const blogId = (await params).blogId;

    if (!blogId) {
      return new NextResponse("BlogId is required", { status: 400 });
    }

    if (!currentUser || currentUser.userRole !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const blogPost = await db.blogpost.delete({
      where: {
        id: blogId,
      },
    });

    revalidatePath("/blog");
    return NextResponse.json(blogPost);
  } catch (error) {
    console.log("Error at /api/blog/blogId DELETE", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
