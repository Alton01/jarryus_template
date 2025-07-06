import React from "react";

import { getUserById } from "@/actions/getUserById";
import { UserCard } from "@/components/user-card";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/nulldata";

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const userId = (await params)?.userId;

  const user = await getUserById(userId);

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return (
      <div className="flex h-[60vh] flex-l flex-col w-full bg-[#e3e8e8] dark:bg-black ">
        <NullData title="OOPS!! YOU ARE NOT ADMIN, THUS UNAUTHORIZED TO VIEW THIS PAGE!! ACCESS DENIED" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 h-[400px] min-h-[400px] ">
      <UserCard user={user!} />
    </div>
  );
};

export default ProjectPage;
