import { getCurrentUser } from "@/actions/getCurrentUser";
import { getUsers } from "@/actions/getUsers";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import NullData from "@/components/nulldata";
import { UserCard } from "@/components/user-card";
import React from "react";

const UsersPage = async () => {
  const currentUser = await getCurrentUser();
  const users = await getUsers();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return (
      <div className="flex h-[60vh] flex-l flex-col w-full bg-[#e3e8e8] dark:bg-black">
        <NullData title="OOPS!! YOU ARE NOT ADMIN, THUS UNAUTHORIZED TO VIEW THIS PAGE!! ACCESS DENIED" />
      </div>
    );
  }

  if (users && users?.length < 1)
    return (
      <div className="flex flex-1 flex-col h-96 min-h-96 w-full py-10 px-4 ms:px-6 lg:px-8 xl:px-10 bg-[#e3e8e8] dark:bg-black">
        <h1 className="font-poppins text-center font-bold text-2xl xl:text-3xl pb-10 pt-7 text-slate-700 dark:text-slate-300 ">
          {" "}
          USERS
        </h1>
        <div className="flex flex-col flex-1 w-full h-full items-center justify-center">
          <h1 className="text-center text-lg lg:text-xl xl:text-2xl font-bold text-slate-700 dark:text-slate-300">
            OOPS!!! NO USERS ADDED YET.
          </h1>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col flex-1 h-full py-6 gap-y-5 px-4 ms:px-6 lg:px-8 xl:px-10 bg-[#e3e8e8] dark:bg-black">
      <div className="flex flex-col w-full py-4 gap-y-2">
        <h1 className="uppercase text-2xl  text-slate-700 dark:text-slate-300 lg:text-3xl font-semibold text-center font-poppins">
          SIGNED UP USERS
        </h1>
        <h1 className=" text-xl lg:text-2xl xl:text-3xl text-left font-poppins text-slate-700 dark:text-slate-300 py-3">
          Welcome Back {""} {currentUser?.userName}
        </h1>
      </div>
      <div className="flex flex-col w-full pb-5">
        <div className="flex flex-col w-full gap-x-3 gap-y-3">
          <DataTable columns={columns} data={users!} />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
