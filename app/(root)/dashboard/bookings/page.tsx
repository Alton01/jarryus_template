import React from "react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/nulldata";
import { getBookings } from "@/actions/booking/getBookings";
import { DataTable1 } from "@/components/data-table1";
import { columns1 } from "@/components/columns1";

const AdminDashboard = async () => {
  const currentUser = await getCurrentUser();

  const bookings = await getBookings();

  if (!currentUser || currentUser.userRole !== "ADMIN") {
    return (
      <NullData title="OOPS!! YOU ARE NOT ADMIN, THUS UNAUTHORIZED TO VIEW THIS PAGE!! ACCESS DENIED" />
    );
  }

  if (bookings && bookings.length < 1) {
    return (
      <div className="flex flex-1 h-96 min-h-96 w-full px-3">
        <div className="flex flex-col items-center gap-y-3 justify-center w-full">
          <h1 className="text-sm lg:text-xl font-poppins mb-10 text-center">
            No Reservation Has Been Made On Jarryus Properties Yet.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full flex-1 px-1 pt-4 ">
      <div className="flex flex-col space-y-2 justify-center w-full mt-3">
        <h1 className="uppercase text-2xl text-slate-700 dark:text-slate-300  font-semibold lg:text-3xl xl:text-4xl text-center font-poppins">
          BOOKINGS
        </h1>
        <h1 className=" text-xl lg:text-2xl xl:text-3xl text-left font-poppins text-slate-700 dark:text-slate-300 py-3">
          Welcome Back {""} {currentUser?.userName}
        </h1>
      </div>

      <div className="flex flex-col flex-1 w-full px-4 justify-center py-5">
        <h1 className="text-center font-poppins font-semibold text-lg lg:text-2xl mb-9">
          Reservations
        </h1>
        <DataTable1 columns={columns1} data={bookings!} />
      </div>
    </div>
  );
};

export default AdminDashboard;
