"use client";
import { useUser } from "@clerk/nextjs";
import { Land } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/app/loading";
import { bookingSchema } from "@/lib/validations";
import { createBooking } from "@/actions/booking/create-booking";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { sendEmailUser } from "@/actions/send-email-user";
import { sendEmailAdmin } from "@/actions/send-email-admin";

interface BookLandFormProps {
  land: Land;
}

const BookLandForm = ({ land }: BookLandFormProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();
  const [propertyViewingDate, setPropertyViewingDate] = useState<
    string | undefined
  >("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (date) {
      setPropertyViewingDate(date.toString());
      setIsCalendarOpen(false);
    }
  }, [date]);

  useEffect(() => {
    if (typeof propertyViewingDate === "string") {
      form.setValue("propertyViewingDate", propertyViewingDate, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [propertyViewingDate]);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      bookerName: "",
      bookerPhoneNumber: "",
      bookerEmail: "",
      propertyViewingDate: "",
      propertyType: "Land",
      propertyId: land?.id,
      propertyName: land?.landLocation,
    },
  });

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    setIsLoading(true);
    toast({
      title: "Creating Inspection Reservation",
      description:
        "Please be patient, land viewing reservation is being created!!!",
    });
    try {
      const newBooking = await createBooking({
        bookerName: values?.bookerName,
        bookerPhoneNumber: values?.bookerPhoneNumber,
        bookerEmail: values?.bookerEmail,
        propertyViewingDate: values?.propertyViewingDate,
        propertyType: "Land",
        propertyId: land?.id,
        propertyName: land?.landLocation,
      });

      await sendEmailUser({
        from: process.env.SMTP_USERNAME!,
        to: values?.bookerEmail!,
        subject: "Jarryus Properties Booking Confirmation.",
        text: ` Hello ${
          values.bookerName
        }, Your viewing inspection reservation for the land on ${
          land.landLocation
        } has been successfully reserved for ${new Date(
          values.propertyViewingDate
        ).toDateString()} and we look forward to showing you the land. If you did not make this reservation, kindly ignore this email. Kind regards`,
      });

      await sendEmailAdmin({
        from: process.env.SMTP_USERNAME!,
        to: process.env.SMTP_USERNAME!,
        subject: "NEW BOOKING MADE ON JARRYUS PROPERTIES",
      });
      toast({
        title: "Booking created",
        description:
          "Your land viewing reservation has been successfully created.",
      });
      form.reset();
      router.push(`/booking/${newBooking?.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to create land viewing reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col h-full flex-1 w-full items-center justify-center pt-7 pb-10 px-4 md:px-6 lg:px-10 bg-slate-100  dark:bg-black">
      <h1 className="capitalize text-center text-amber-600 dark:text-amber-600 my-6 font-poppins font-semibold text-lg md:text-xl xl:text-2xl">
        {" "}
        {land?.landLocation} {""}Inspection Booking Form
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full max-w-3xl space-y-8"
        >
          <div className="flex flex-col w-full gap-y-4 items-center justify-center gap-x-4">
            <div className="flex flex-col w-full space-y-5">
              <FormField
                control={form.control}
                name="bookerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-poppins text-sm">
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="font-poppins text-sm bg-transparent"
                        placeholder="Your Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bookerPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-poppins text-sm ">
                      Your Phone Number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        defaultCountry="NG"
                        placeholder="Your Phone Number"
                        international
                        withCountryCallingCode
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full h-11 border bg-transparent font-poppins mt-2 rounded-md p-4 text-sm"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bookerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-poppins text-sm ">
                      Your Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="font-poppins text-sm bg-transparent"
                        placeholder="Your Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex flex-col gap-y-2 ">
                <h3 className="font-poppins text-sm ">
                  Select Land Viewing Date {""}
                  <span className="text-sm text-destructive dark:text-red-500">
                    (required)
                  </span>
                </h3>
                <DatePicker
                  date={date}
                  setDate={setDate}
                  isCalendarOpen={isCalendarOpen}
                  setIsCalendarOpen={setIsCalendarOpen}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-center">
            <Button
              className="p-4 py-6 w-[200px] font-poppins"
              type="submit"
              disabled={isLoading}
            >
              Book Viewing
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookLandForm;
