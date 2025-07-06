"use client";
import Loading from "@/app/loading";
import { Booking } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface UserBookingClientProp {
  booking: Booking;
}

const UserBookingClient = ({ booking }: UserBookingClientProp) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col px-4 gap-y-6 font-poppins w-full items-center justify-center pt-4">
      <h1 className="text-lg md:text-xl xl:text-3xl text-center font-poppins">
        {" "}
        Hello {""}{" "}
        <span className="font-semibold text-amber-600 dark:text-amber-600 ">
          {" "}
          {booking.bookerName}{" "}
        </span>
      </h1>

      <h2 className="font-poppins md:text-lg mt-7 xl:text-xl text-center">
        {" "}
        Your{" "}
        {booking.propertyType === "AirBnB"
          ? "airbnb booking reservation for"
          : "viewing inspection reservation for"}{" "}
        {""}{" "}
        <span className="font-semibold text-amber-600 dark:text-amber-600 ">
          {" "}
          {booking.propertyName}{" "}
        </span>{" "}
        has been successfully reserved. We look forward to{" "}
        {booking.propertyType === "AirBnB"
          ? "checking you into the"
          : "showing you the"}{" "}
        <span className="font-semibold text-amber-600 dark:text-amber-600 ">
          {" "}
          {booking.propertyType}{" "}
        </span>{" "}
        {""}on {""}{" "}
        <span className="font-semibold text-amber-600 dark:text-amber-600 ">
          {" "}
          {new Date(booking.propertyViewingDate).toDateString()} .{" "}
        </span>
      </h2>

      <Image
        src="/success.gif"
        height={260}
        width={250}
        alt="success"
        unoptimized
        className="my-6"
      />

      <h2 className="  font-poppins md:text-lg xl:text-xl text-center">
        Your{" "}
        {booking.propertyType === "AirBnB"
          ? "Check In Date is : "
          : " Inspection Viewing Date is : "}{" "}
        <span className="font-semibold text-amber-600 dark:text-amber-600">
          {" "}
          {new Date(booking.propertyViewingDate).toDateString()}{" "}
        </span>
        <span className="font-semibold text-amber-600 dark:text-amber-600">
          {booking.propertyType === "AirBnB" && " at 12:00 noon"}
        </span>
      </h2>
    </div>
  );
};

export default UserBookingClient;
