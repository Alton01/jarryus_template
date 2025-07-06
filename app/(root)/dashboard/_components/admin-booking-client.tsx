"use client";
import Loading from "@/app/loading";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import { Booking } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { deleteBooking } from "@/actions/booking/delete-booking";

interface AdminBookingClientProp {
  booking: Booking;
}

const AdminBookingClient = ({ booking }: AdminBookingClientProp) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isBookingDeleting, setIsBookingDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  //THIS IS FOR DELETING A BOOKING BY ADMIN

  const handleDeleteBooking = async (booking: Booking) => {
    setIsBookingDeleting(true);
    toast({
      variant: "default",
      description: "Please be Patient!! Booking is being deleted",
    });
    try {
      await deleteBooking(booking?.id);

      setIsBookingDeleting(false);
      toast({
        variant: "default",
        description: "Booking Successfully Deleted.",
      });

      router.push("/dashboard/bookings");
    } catch (error: any) {
      setIsBookingDeleting(false);
      console.log(error);
      toast({
        variant: "destructive",
        description: `Failed to delete booking ${error.message}`,
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col  flex-1 px-6 space-y-4 font-poppins w-full pt-4 pb-10">
      <div className="flex py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Booking</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="text-lg md:text-xl xl:text-3xl text-center pb-6 font-poppins">
        {" "}
        Welcome Back Admin
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-col w-full  space-y-5">
          <h2 className="font-poppins text-left  ">
            {" "}
            Booking reservation By {""}{" "}
            <span className="font-semibold"> {booking.bookerName} </span>{" "}
          </h2>
          <h2 className="font-poppins text-left ">
            {" "}
            Phone Number Is : {""}{" "}
            <span className="font-semibold"> {booking.bookerPhoneNumber} </span>{" "}
          </h2>
          <h2 className="font-poppins  text-left ">
            {" "}
            Email Address Is : {""}{" "}
            <span className="font-semibold"> {booking.bookerEmail} </span>{" "}
          </h2>

          <h2 className="font-poppins  text-left ">
            {" "}
            Type of Property Is : {""}{" "}
            <span className="font-semibold"> {booking.propertyType} </span>{" "}
          </h2>

          <h2 className="font-poppins  text-left ">
            {" "}
            Name of Property Is : {""}{" "}
            <span className="font-semibold"> {booking.propertyName} </span>{" "}
          </h2>

          <h2 className="text-left font-poppins">
            Property Viewing Date is :{" "}
            <span className="font-semibold">
              {" "}
              {new Date(booking.propertyViewingDate).toDateString()}{" "}
            </span>
          </h2>

          <h2 className="text-left font-poppins  ">
            Booking created on :{" "}
            <span className="font-semibold">
              {" "}
              {new Date(booking.createdAt).toDateString()}{" "}
            </span>
          </h2>
        </div>
      </div>
      <div className="flex w-full items-center justify-center py-10">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={isBookingDeleting}
              className=" font-poppins p-3 md:p-5 max-w-[200px] "
              variant={"destructive"}
              type="button"
            >
              {isBookingDeleting ? (
                <>
                  {" "}
                  <Loader className="mr-2 animate-spin h-4 w-4" /> Deleting
                  Booking{" "}
                </>
              ) : (
                <>
                  {" "}
                  <TrashIcon className="mr-2 h-4 w-4" /> Delete Booking{" "}
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this booking from Jarryus
                Property's web application.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                type="button"
                onClick={() => handleDeleteBooking(booking)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AdminBookingClient;
