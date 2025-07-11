import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { imageKey } = await req.json();

  try {
    const res = await utapi.deleteFiles(imageKey);
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error at uploadthing/delete:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
