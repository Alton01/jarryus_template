"use client";

import Loading from "@/app/loading";
import { AirBnB, Property } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { airbnbPostSchema, propertyPostSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import {
  Loader,
  Pencil,
  PencilLine,
  Terminal,
  Trash,
  XCircleIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

import axios from "axios";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/lib/utils/uploadthing";
import { updateAirbnb } from "@/actions/airbnb/update-airbnb";
import { createAirbnb } from "@/actions/airbnb/create-airbnb";
import { deleteAirbnb } from "@/actions/airbnb/delete-airbnb";

interface AddAirBnBFormProps {
  airbnb: AirBnB | null;
}

export const AddAirBnBForm = ({ airbnb }: AddAirBnBFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [image1, setImage1] = useState<string | undefined>(
    airbnb?.airBnBImage1
  );
  const [image2, setImage2] = useState<string | undefined>(
    airbnb?.airBnBImage2
  );
  const [image3, setImage3] = useState<string | undefined>(
    airbnb?.airBnBImage3
  );
  const [image4, setImage4] = useState<string | undefined>(
    airbnb?.airBnBImage4
  );
  const [image5, setImage5] = useState<string | undefined>(
    airbnb?.airBnBImage5
  );
  const [image6, setImage6] = useState<string | undefined>(
    airbnb?.airBnBImage6
  );
  const [image7, setImage7] = useState<string | undefined>(
    airbnb?.airBnBImage7
  );
  const [image1IsDeleting, setImage1IsDeleting] = useState(false);
  const [image2IsDeleting, setImage2IsDeleting] = useState(false);
  const [image3IsDeleting, setImage3IsDeleting] = useState(false);
  const [image4IsDeleting, setImage4IsDeleting] = useState(false);
  const [image5IsDeleting, setImage5IsDeleting] = useState(false);
  const [image6IsDeleting, setImage6IsDeleting] = useState(false);
  const [image7IsDeleting, setImage7IsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAirBnBDeleting, setIsAirBnBDeleting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (typeof image1 === "string") {
      form.setValue("airBnBImage1", image1, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image2 === "string") {
      form.setValue("airBnBImage2", image2, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image3 === "string") {
      form.setValue("airBnBImage3", image3, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image4 === "string") {
      form.setValue("airBnBImage4", image4, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image5 === "string") {
      form.setValue("airBnBImage5", image5, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image6 === "string") {
      form.setValue("airBnBImage6", image6, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image7 === "string") {
      form.setValue("airBnBImage7", image7, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [image1, image2, image3, image4, image5, image6, image7]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof airbnbPostSchema>>({
    resolver: zodResolver(airbnbPostSchema),
    defaultValues: airbnb || {
      airBnBLocation: "",
      airBnBDescription: "",
      airBnBType: "",
      fullyFurnished: false,
      swimmingPool: false,
      electricity24hour: false,
      servicedProperty: false,
      securityPersonnel: false,
      wiFi: false,
      isAvailable: false,
      parkingForCars: 0,
      airBnBDailyPrice: 0,
      airBnBWeeklyPrice: 0,
      airBnBMonthlyPrice: 0,
      airBnBImage1: "",
      airBnBImage2: "",
      airBnBImage3: "",
      airBnBImage4: "",
      airBnBImage5: "",
      airBnBImage6: "",
      airBnBImage7: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof airbnbPostSchema>) {
    console.log(values);
    setIsLoading(true);
    if (airbnb) {
      try {
        toast({
          variant: "default",
          description: "Please be Patient!! AirBnB is updating",
        });

        const updatedAirBnB = await updateAirbnb(airbnb?.id!, {
          airBnBLocation: values?.airBnBLocation,
          airBnBDescription: values?.airBnBDescription,
          airBnBType: values?.airBnBType,
          fullyFurnished: values?.fullyFurnished,
          swimmingPool: values?.swimmingPool,
          electricity24hour: values?.electricity24hour,
          servicedProperty: values?.servicedProperty,
          securityPersonnel: values?.securityPersonnel,
          wiFi: values?.wiFi,
          isAvailable: values?.isAvailable,
          parkingForCars: values?.parkingForCars,
          airBnBDailyPrice: values?.airBnBDailyPrice,
          airBnBWeeklyPrice: values?.airBnBWeeklyPrice,
          airBnBMonthlyPrice: values?.airBnBMonthlyPrice,
          airBnBImage1: values?.airBnBImage1,
          airBnBImage2: values?.airBnBImage2,
          airBnBImage3: values?.airBnBImage3,
          airBnBImage4: values?.airBnBImage4,
          airBnBImage5: values?.airBnBImage5,
          airBnBImage6: values?.airBnBImage6,
          airBnBImage7: values?.airBnBImage7,
        });

        form.reset();
        toast({
          variant: "default",
          description: "AirBnB Successfully Updated",
        });
        router.push("/dashboard/airbnbs");
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          description: "Failed to Update AirBnB",
        });
        setIsLoading(false);
      }
    } else {
      try {
        toast({
          variant: "default",
          description: "Please be Patient!! AirBnB is being created",
        });

        const newAirBnB = await createAirbnb({
          airBnBLocation: values?.airBnBLocation,
          airBnBDescription: values?.airBnBDescription,
          airBnBType: values?.airBnBType,
          fullyFurnished: values?.fullyFurnished,
          swimmingPool: values?.swimmingPool,
          electricity24hour: values?.electricity24hour,
          servicedProperty: values?.servicedProperty,
          securityPersonnel: values?.securityPersonnel,
          wiFi: values?.wiFi,
          isAvailable: values?.isAvailable,
          parkingForCars: values?.parkingForCars,
          airBnBDailyPrice: values?.airBnBDailyPrice,
          airBnBWeeklyPrice: values?.airBnBWeeklyPrice,
          airBnBMonthlyPrice: values?.airBnBMonthlyPrice,
          airBnBImage1: values?.airBnBImage1,
          airBnBImage2: values?.airBnBImage2,
          airBnBImage3: values?.airBnBImage3,
          airBnBImage4: values?.airBnBImage4,
          airBnBImage5: values?.airBnBImage5,
          airBnBImage6: values?.airBnBImage6,
          airBnBImage7: values?.airBnBImage7,
        });

        form.reset();
        toast({
          variant: "default",
          description: "AirBnB Successfully Created",
        });
        router.push("/dashboard/airbnbs");
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          description: "Failed to create AirBnB, something went wrong!!",
        });
        setIsLoading(false);
      }
    }
  }

  // This is for deleting an airBnB. Firstly we delete the images from uploadthing storage before deleting the airbnb from database
  const handleDeleteAirBnB = async (airbnb: AirBnB) => {
    setIsAirBnBDeleting(true);
    toast({
      variant: "default",
      description: "Please be Patient!! AirBnB is being deleted",
    });
    const getImageKey = (src: string) =>
      src.substring(src.lastIndexOf("/") + 1);

    try {
      const imageKey = [
        getImageKey(airbnb?.airBnBImage1),
        getImageKey(airbnb?.airBnBImage2),
        getImageKey(airbnb?.airBnBImage3),
        getImageKey(airbnb?.airBnBImage4),
        getImageKey(airbnb?.airBnBImage5),
        getImageKey(airbnb?.airBnBImage6),
        getImageKey(airbnb?.airBnBImage7),
      ];

      await axios.post("/api/uploadthing/delete", { imageKey });

      await deleteAirbnb(airbnb?.id);

      toast({
        variant: "default",
        description: "AirBnB Successfully Deleted.",
      });
      setIsAirBnBDeleting(false);
      router.push("/dashboard/airbnbs");
    } catch (error: any) {
      setIsAirBnBDeleting(false);
      console.log(error);
      toast({
        variant: "destructive",
        description: `Failed to delete AirBnB ${error.message}`,
      });
    }
  };

  const handleImage1Delete = (image1: string) => {
    setImage1IsDeleting(true);

    const imageKey = image1.substring(image1.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage1("");
          toast({
            variant: "default",
            description: "AirBnB Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete AirBnB  image ",
        });
      })
      .finally(() => {
        setImage1IsDeleting(false);
      });
  };

  const handleImage2Delete = (image2: string) => {
    setImage2IsDeleting(true);

    const imageKey = image2.substring(image2.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage2("");
          toast({
            variant: "default",
            description: "AirBnB  Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete AirBnB image ",
        });
      })
      .finally(() => {
        setImage2IsDeleting(false);
      });
  };

  const handleImage3Delete = (image3: string) => {
    setImage3IsDeleting(true);

    const imageKey = image3.substring(image3.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage3("");
          toast({
            variant: "default",
            description: "AirBnB Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete AirBnB image ",
        });
      })
      .finally(() => {
        setImage3IsDeleting(false);
      });
  };

  const handleImage4Delete = (image4: string) => {
    setImage4IsDeleting(true);

    const imageKey = image4.substring(image4.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage4("");
          toast({
            variant: "default",
            description: "AirBnB Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete AirBnB image ",
        });
      })
      .finally(() => {
        setImage4IsDeleting(false);
      });
  };

  const handleImage5Delete = (image5: string) => {
    setImage5IsDeleting(true);

    const imageKey = image5.substring(image5.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage5("");
          toast({
            variant: "default",
            description: "AirBnB Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete AirBnB image ",
        });
      })
      .finally(() => {
        setImage5IsDeleting(false);
      });
  };

  const handleImage6Delete = (image6: string) => {
    setImage6IsDeleting(true);

    const imageKey = image6.substring(image6.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage6("");
          toast({
            variant: "default",
            description: "AirBnB Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete AirBnB image ",
        });
      })
      .finally(() => {
        setImage6IsDeleting(false);
      });
  };

  const handleImage7Delete = (image7: string) => {
    setImage7IsDeleting(true);

    const imageKey = image7.substring(image7.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage7("");
          toast({
            variant: "default",
            description: "AirBnB Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete AirBnB image ",
        });
      })
      .finally(() => {
        setImage7IsDeleting(false);
      });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col flex-1 w-full font-poppins">
      <div className="flex py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Admin Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {" "}
                {airbnb ? "Update AirBnB" : "Create AirBnB"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="text-xl text-center lg:text-2xl xl:text-3xl mt-4">
        {airbnb ? `Update ${airbnb?.airBnBType}` : "Create An AirBnB "}
      </h1>
      <div className="flex flex-col mt-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full mb-8">
              <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-x-3 gap-y-3 mb-10 mt-8">
                <FormField
                  control={form.control}
                  name="airBnBType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        AirBnB Type
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="EG: 6 Bedroom Duplex."
                          className="focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none focus:outline-none focus-visible:border-1 focus:border-1"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="airBnBLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        AirBnB's Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What's this airBnB's location"
                          className="focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none focus:outline-none focus-visible:border-1 focus:border-1"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parkingForCars"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        Parking space for how many cars?
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="airBnBDailyPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        What is the daily booking price in Naira?
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="airBnBWeeklyPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        What is the per week booking price in Naira?
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="airBnBMonthlyPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        What is the 30day booking price in Naira?
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col w-full pt-4">
                <FormField
                  control={form.control}
                  name="airBnBDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        AirBnB's Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none h-32 focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none focus:outline-none focus-visible:border-1 focus:border-1"
                          placeholder="Add a full description for this AirBnB"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-x-3 gap-y-3 mb-10 mt-8">
                <FormField
                  control={form.control}
                  name="fullyFurnished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row  items-end border rounded-sm p-3 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel>Is this AirBnB furnished?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="swimmingPool"
                  render={({ field }) => (
                    <FormItem className="flex flex-row  items-end border rounded-sm p-3 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel>
                        Does this AirBnB have swimming pool?
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="electricity24hour"
                  render={({ field }) => (
                    <FormItem className="flex flex-row  items-end border rounded-sm p-3 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel>Is the electricity 24hours?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="servicedProperty"
                  render={({ field }) => (
                    <FormItem className="flex flex-row  items-end border rounded-sm p-3 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel>Is this a serviced AirBnB?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="securityPersonnel"
                  render={({ field }) => (
                    <FormItem className="flex flex-row  items-end border rounded-sm p-3 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel>
                        Does AirBnB have security personnel?
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="wiFi"
                  render={({ field }) => (
                    <FormItem className="flex flex-row  items-end border rounded-sm p-3 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel>Is WiFi at this airBnB?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isAvailable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row  items-end border rounded-sm p-3 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel>Is this AirBnB currently available?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col w-full px-2 gap-y-3">
                <h1 className="font-poppins text-center text-sm lg:text-lg xl:text-xl pb-5">
                  Attach images of this AirBnB. All 7 images are compulsory.
                </h1>
                <div className="grid grid-cols-1 ms:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-4">
                  <FormField
                    control={form.control}
                    name="airBnBImage1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4">
                          Upload AirBnB Cover Image
                        </FormLabel>
                        <FormControl>
                          {image1 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image1}
                                alt="AirBnB image1"
                                className="object-contain max-w-[500px] min-w-[200px]"
                              />
                              <Button
                                type="button"
                                size={"icon"}
                                variant={"ghost"}
                                className="absolute right-[-12px] top-0"
                                onClick={() => handleImage1Delete(image1)}
                              >
                                {image1IsDeleting ? (
                                  <Loader className="animate-spin" />
                                ) : (
                                  <XCircleIcon />
                                )}
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center max-w-[575px] p-10 border-2 rounded-sm ">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Do something with the response
                                  console.log("Files: ", res);
                                  setImage1(res[0].url);
                                  toast({
                                    variant: "default",
                                    description:
                                      "AirBnB cover image uploaded successfully",
                                  });
                                }}
                                onUploadError={(error: Error) => {
                                  // Do something with the error.
                                  toast({
                                    variant: "destructive",
                                    description: `ERROR! ${error.message}`,
                                  });
                                }}
                              />
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="airBnBImage2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4 ">
                          Upload AirBnB Image 2
                        </FormLabel>
                        <FormControl>
                          {image2 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image2}
                                alt="AirBnB image2"
                                className="object-contain max-w-[500px] min-w-[200px]"
                              />
                              <Button
                                type="button"
                                size={"icon"}
                                variant={"ghost"}
                                className="absolute right-[-12px] top-0"
                                onClick={() => handleImage2Delete(image2)}
                              >
                                {image2IsDeleting ? (
                                  <Loader className="animate-spin" />
                                ) : (
                                  <XCircleIcon />
                                )}
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center max-w-[575px] p-10 border-2 rounded-sm ">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Do something with the response
                                  console.log("Files: ", res);
                                  setImage2(res[0].url);
                                  toast({
                                    variant: "default",
                                    description:
                                      "AirBnB image2 uploaded successfully",
                                  });
                                }}
                                onUploadError={(error: Error) => {
                                  // Do something with the error.
                                  toast({
                                    variant: "destructive",
                                    description: `ERROR! ${error.message}`,
                                  });
                                }}
                              />
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="airBnBImage3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4 ">
                          Upload AirBnB Image 3
                        </FormLabel>
                        <FormControl>
                          {image3 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image3}
                                alt="AirBnB image3"
                                className="object-contain max-w-[500px] min-w-[200px]"
                              />
                              <Button
                                type="button"
                                size={"icon"}
                                variant={"ghost"}
                                className="absolute right-[-12px] top-0"
                                onClick={() => handleImage3Delete(image3)}
                              >
                                {image3IsDeleting ? (
                                  <Loader className="animate-spin" />
                                ) : (
                                  <XCircleIcon />
                                )}
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center max-w-[575px] p-10 border-2 rounded-sm ">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Do something with the response
                                  console.log("Files: ", res);
                                  setImage3(res[0].url);
                                  toast({
                                    variant: "default",
                                    description:
                                      "AirBnB image3 uploaded successfully",
                                  });
                                }}
                                onUploadError={(error: Error) => {
                                  // Do something with the error.
                                  toast({
                                    variant: "destructive",
                                    description: `ERROR! ${error.message}`,
                                  });
                                }}
                              />
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="airBnBImage4"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4 ">
                          Upload AirBnB Image 4
                        </FormLabel>
                        <FormControl>
                          {image4 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image4}
                                alt="AirBnB image4"
                                className="object-contain max-w-[500px] min-w-[200px]"
                              />
                              <Button
                                type="button"
                                size={"icon"}
                                variant={"ghost"}
                                className="absolute right-[-12px] top-0"
                                onClick={() => handleImage4Delete(image4)}
                              >
                                {image4IsDeleting ? (
                                  <Loader className="animate-spin" />
                                ) : (
                                  <XCircleIcon />
                                )}
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center max-w-[575px] p-10 border-2 rounded-sm ">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Do something with the response
                                  console.log("Files: ", res);
                                  setImage4(res[0].url);
                                  toast({
                                    variant: "default",
                                    description:
                                      "AirBnB image4 uploaded successfully",
                                  });
                                }}
                                onUploadError={(error: Error) => {
                                  // Do something with the error.
                                  toast({
                                    variant: "destructive",
                                    description: `ERROR! ${error.message}`,
                                  });
                                }}
                              />
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="airBnBImage5"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4">
                          Upload AirBnB Image 5
                        </FormLabel>
                        <FormControl>
                          {image5 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image5}
                                alt="AirBnB image5"
                                className="object-contain max-w-[500px] min-w-[200px]"
                              />
                              <Button
                                type="button"
                                size={"icon"}
                                variant={"ghost"}
                                className="absolute right-[-12px] top-0"
                                onClick={() => handleImage5Delete(image5)}
                              >
                                {image5IsDeleting ? (
                                  <Loader className="animate-spin" />
                                ) : (
                                  <XCircleIcon />
                                )}
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center max-w-[575px] p-10 border-2 rounded-sm ">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Do something with the response
                                  console.log("Files: ", res);
                                  setImage5(res[0].url);
                                  toast({
                                    variant: "default",
                                    description:
                                      "AirBnB image5 uploaded successfully",
                                  });
                                }}
                                onUploadError={(error: Error) => {
                                  // Do something with the error.
                                  toast({
                                    variant: "destructive",
                                    description: `ERROR! ${error.message}`,
                                  });
                                }}
                              />
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="airBnBImage6"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4 ">
                          Upload AirBnB Image 6
                        </FormLabel>
                        <FormControl>
                          {image6 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image6}
                                alt="AirBnB image6"
                                className="object-contain max-w-[500px] min-w-[200px]"
                              />
                              <Button
                                type="button"
                                size={"icon"}
                                variant={"ghost"}
                                className="absolute right-[-12px] top-0"
                                onClick={() => handleImage6Delete(image6)}
                              >
                                {image6IsDeleting ? (
                                  <Loader className="animate-spin" />
                                ) : (
                                  <XCircleIcon />
                                )}
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center max-w-[575px] p-10 border-2 rounded-sm ">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Do something with the response
                                  console.log("Files: ", res);
                                  setImage6(res[0].url);
                                  toast({
                                    variant: "default",
                                    description:
                                      "AirBnB image6 uploaded successfully",
                                  });
                                }}
                                onUploadError={(error: Error) => {
                                  // Do something with the error.
                                  toast({
                                    variant: "destructive",
                                    description: `ERROR! ${error.message}`,
                                  });
                                }}
                              />
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="airBnBImage7"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4">
                          Upload AirBnB Image 7
                        </FormLabel>
                        <FormControl>
                          {image7 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image7}
                                alt="AirBnB image7"
                                className="object-contain max-w-[500px] min-w-[200px]"
                              />
                              <Button
                                type="button"
                                size={"icon"}
                                variant={"ghost"}
                                className="absolute right-[-12px] top-0"
                                onClick={() => handleImage7Delete(image7)}
                              >
                                {image7IsDeleting ? (
                                  <Loader className="animate-spin" />
                                ) : (
                                  <XCircleIcon />
                                )}
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center max-w-[575px] p-10 border-2 rounded-sm ">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Do something with the response
                                  console.log("Files: ", res);
                                  setImage7(res[0].url);
                                  toast({
                                    variant: "default",
                                    description:
                                      "AirBnB image7 uploaded successfully",
                                  });
                                }}
                                onUploadError={(error: Error) => {
                                  // Do something with the error.
                                  toast({
                                    variant: "destructive",
                                    description: `ERROR! ${error.message}`,
                                  });
                                }}
                              />
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full items-center justify-center">
              {airbnb ? (
                <div className="flex flex-col w-full  vm:flex-row items-center justify-center vm:justify-between">
                  <Button
                    type="submit"
                    className="max-w-[175px] p-3 mb-5 vm:mb-0"
                    disabled={
                      isLoading ||
                      image1IsDeleting ||
                      image2IsDeleting ||
                      image3IsDeleting ||
                      image4IsDeleting ||
                      image5IsDeleting ||
                      image6IsDeleting ||
                      image7IsDeleting ||
                      isAirBnBDeleting
                    }
                  >
                    {isLoading ? (
                      <>
                        {" "}
                        <Loader className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Updating{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        <PencilLine className="mr-2 h-4 w-4" /> Update AirBnB
                      </>
                    )}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={
                          isAirBnBDeleting ||
                          isLoading ||
                          image1IsDeleting ||
                          image2IsDeleting ||
                          image3IsDeleting ||
                          image4IsDeleting ||
                          image5IsDeleting ||
                          image6IsDeleting ||
                          image7IsDeleting
                        }
                        className="w-fit p-2 md:p-5 md:max-w-[130px] "
                        variant={"destructive"}
                        type="button"
                      >
                        {isAirBnBDeleting ? (
                          <>
                            {" "}
                            <Loader className="mr-2 animate-spin h-4 w-4" />{" "}
                            Deleting{" "}
                          </>
                        ) : (
                          <>
                            {" "}
                            <Trash className="mr-2 h-4 w-4" /> Delete{" "}
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this AirBnB from your web
                          application.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          type="button"
                          onClick={() => handleDeleteAirBnB(airbnb)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ) : (
                <Button
                  type="submit"
                  className="max-w-[200px] p-4 mb-6"
                  disabled={
                    isLoading ||
                    image1IsDeleting ||
                    image2IsDeleting ||
                    image3IsDeleting ||
                    image4IsDeleting ||
                    image5IsDeleting ||
                    image6IsDeleting ||
                    image7IsDeleting
                  }
                >
                  {isLoading ? (
                    <>
                      {" "}
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Creating
                    </>
                  ) : (
                    <>
                      {" "}
                      <Pencil className="mr-2 h-4 w-4" />
                      {""} Create AirBnB
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
