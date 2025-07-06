"use client";

import Loading from "@/app/loading";
import { Property } from "@prisma/client";
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
import { propertyPostSchema } from "@/lib/validations";
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
import { updateProperty } from "@/actions/property/update-property";
import { createProperty } from "@/actions/property/create-property";
import { deleteProperty } from "@/actions/property/delete-property";

interface AddPropertyFormProps {
  property: Property | null;
}

export const AddPropertyForm = ({ property }: AddPropertyFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [image1, setImage1] = useState<string | undefined>(
    property?.propertyImage1
  );
  const [image2, setImage2] = useState<string | undefined>(
    property?.propertyImage2
  );
  const [image3, setImage3] = useState<string | undefined>(
    property?.propertyImage3
  );
  const [image4, setImage4] = useState<string | undefined>(
    property?.propertyImage4
  );
  const [image5, setImage5] = useState<string | undefined>(
    property?.propertyImage5
  );
  const [image6, setImage6] = useState<string | undefined>(
    property?.propertyImage6
  );
  const [image7, setImage7] = useState<string | undefined>(
    property?.propertyImage7
  );
  const [image1IsDeleting, setImage1IsDeleting] = useState(false);
  const [image2IsDeleting, setImage2IsDeleting] = useState(false);
  const [image3IsDeleting, setImage3IsDeleting] = useState(false);
  const [image4IsDeleting, setImage4IsDeleting] = useState(false);
  const [image5IsDeleting, setImage5IsDeleting] = useState(false);
  const [image6IsDeleting, setImage6IsDeleting] = useState(false);
  const [image7IsDeleting, setImage7IsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPropertyDeleting, setIsPropertyDeleting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (typeof image1 === "string") {
      form.setValue("propertyImage1", image1, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image2 === "string") {
      form.setValue("propertyImage2", image2, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image3 === "string") {
      form.setValue("propertyImage3", image3, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image4 === "string") {
      form.setValue("propertyImage4", image4, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image5 === "string") {
      form.setValue("propertyImage5", image5, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image6 === "string") {
      form.setValue("propertyImage6", image6, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image7 === "string") {
      form.setValue("propertyImage7", image7, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [image1, image2, image3, image4, image5, image6, image7]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof propertyPostSchema>>({
    resolver: zodResolver(propertyPostSchema),
    defaultValues: property || {
      propertyLocation: "",
      propertyDescription: "",
      propertyDocAvailable: "",
      propertyType: "",
      propertyLandSize: "",
      estateProperty: false,
      fullyFurnished: false,
      swimmingPool: false,
      electricity24hour: false,
      servicedProperty: false,
      securityPersonnel: false,
      wiFi: false,
      forSale: false,
      isAvailable: false,
      parkingForCars: 0,
      propertyPrice: 0,
      propertyImage1: "",
      propertyImage2: "",
      propertyImage3: "",
      propertyImage4: "",
      propertyImage5: "",
      propertyImage6: "",
      propertyImage7: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof propertyPostSchema>) {
    console.log(values);
    setIsLoading(true);
    if (property) {
      try {
        toast({
          variant: "default",
          description: "Please be Patient!! Property is updating",
        });

        const updatedProperty = await updateProperty(property?.id!, {
          propertyLocation: values?.propertyLocation,
          propertyDescription: values?.propertyDescription,
          propertyDocAvailable: values?.propertyDocAvailable,
          propertyType: values?.propertyType,
          propertyLandSize: values?.propertyLandSize,
          estateProperty: values?.estateProperty,
          fullyFurnished: values?.fullyFurnished,
          swimmingPool: values?.swimmingPool,
          electricity24hour: values?.electricity24hour,
          servicedProperty: values?.servicedProperty,
          securityPersonnel: values?.securityPersonnel,
          wiFi: values?.wiFi,
          forSale: values?.forSale,
          isAvailable: values?.isAvailable,
          parkingForCars: values?.parkingForCars,
          propertyPrice: values?.propertyPrice,
          propertyImage1: values?.propertyImage1,
          propertyImage2: values?.propertyImage2,
          propertyImage3: values?.propertyImage3,
          propertyImage4: values?.propertyImage4,
          propertyImage5: values?.propertyImage5,
          propertyImage6: values?.propertyImage6,
          propertyImage7: values?.propertyImage7,
        });

        form.reset();
        toast({
          variant: "default",
          description: "Property Successfully Updated",
        });
        router.push("/dashboard/properties");
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          description: "Failed to Update Property",
        });
        setIsLoading(false);
      }
    } else {
      try {
        toast({
          variant: "default",
          description: "Please be Patient!! Property is being created",
        });

        const newProperty = await createProperty({
          propertyLocation: values?.propertyLocation,
          propertyDescription: values?.propertyDescription,
          propertyDocAvailable: values?.propertyDocAvailable,
          propertyType: values?.propertyType,
          propertyLandSize: values?.propertyLandSize,
          estateProperty: values?.estateProperty,
          fullyFurnished: values?.fullyFurnished,
          swimmingPool: values?.swimmingPool,
          electricity24hour: values?.electricity24hour,
          servicedProperty: values?.servicedProperty,
          securityPersonnel: values?.securityPersonnel,
          wiFi: values?.wiFi,
          forSale: values?.forSale,
          isAvailable: values?.isAvailable,
          parkingForCars: values?.parkingForCars,
          propertyPrice: values?.propertyPrice,
          propertyImage1: values?.propertyImage1,
          propertyImage2: values?.propertyImage2,
          propertyImage3: values?.propertyImage3,
          propertyImage4: values?.propertyImage4,
          propertyImage5: values?.propertyImage5,
          propertyImage6: values?.propertyImage6,
          propertyImage7: values?.propertyImage7,
        });

        form.reset();
        toast({
          variant: "default",
          description: "Property Successfully Created",
        });
        router.push("/dashboard/properties");
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          description: "Failed to create property, something went wrong!!",
        });
        setIsLoading(false);
      }
    }
  }

  // This is for deleting a property. Firstly we delete the images from uploadthing storage before deleting the property from database
  const handleDeleteProperty = async (property: Property) => {
    setIsPropertyDeleting(true);
    toast({
      variant: "default",
      description: "Please be Patient!! Property is being deleted",
    });
    const getImageKey = (src: string) =>
      src.substring(src.lastIndexOf("/") + 1);

    try {
      const imageKey = [
        getImageKey(property?.propertyImage1),
        getImageKey(property?.propertyImage2),
        getImageKey(property?.propertyImage3),
        getImageKey(property?.propertyImage4),
        getImageKey(property?.propertyImage5),
        getImageKey(property?.propertyImage6),
        getImageKey(property?.propertyImage7),
      ];

      await axios.post("/api/uploadthing/delete", { imageKey });

      await deleteProperty(property?.id);

      toast({
        variant: "default",
        description: "Property Successfully Deleted.",
      });
      setIsPropertyDeleting(false);
      router.push("/dashboard/properties");
    } catch (error: any) {
      setIsPropertyDeleting(false);
      console.log(error);
      toast({
        variant: "destructive",
        description: `Failed to delete property ${error.message}`,
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
            description: "Property Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete property image ",
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
            description: "Property Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete property image ",
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
            description: "Property Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete property image ",
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
            description: "Property Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete property image ",
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
            description: "Property Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete property image ",
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
            description: "Property Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete property image ",
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
            description: "Property Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete property image ",
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
                {property ? "Update Property" : "Create Property"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="text-xl text-center lg:text-2xl xl:text-3xl mt-4">
        {property ? `Update ${property?.propertyType}` : "Create A Property"}
      </h1>
      <div className="flex flex-col mt-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full mb-8">
              <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-x-3 gap-y-3 mb-10 mt-8">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        Property Type
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
                  name="propertyLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        Property Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What's this property's location"
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
                  name="propertyDocAvailable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        Document available to property
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="EG. C of O, Tenancy Agreement"
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
                  name="propertyLandSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        Land size of property
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="EG. 2000 sqm"
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
                  name="propertyPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        How much. Rent/Sale price?
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
                  name="propertyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        Property Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none h-32 focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none focus:outline-none focus-visible:border-1 focus:border-1"
                          placeholder="Add a full description for this property"
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
                  name="estateProperty"
                  render={({ field }) => (
                    <FormItem className="flex flex-row  items-end border rounded-sm p-3 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel>Is this an estate property?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                      <FormLabel>Is this property furnished?</FormLabel>
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
                      <FormLabel>Does property have swimming pool?</FormLabel>
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
                      <FormLabel>Is this a serviced property?</FormLabel>
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
                        Does compound have security personnel?
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
                      <FormLabel>Is WiFi at this property?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="forSale"
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
                        For Sale? Click Checkbox, Else Leave Blank
                      </FormLabel>
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
                      <FormLabel>
                        Is this property currently available?
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col w-full px-2 gap-y-3">
                <h1 className="font-poppins text-center text-sm lg:text-lg xl:text-xl pb-5">
                  Attach images of this property. All 7 images are compulsory.
                </h1>
                <div className="grid grid-cols-1 ms:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-4">
                  <FormField
                    control={form.control}
                    name="propertyImage1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4">
                          Upload Property Cover Image
                        </FormLabel>
                        <FormControl>
                          {image1 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image1}
                                alt="Property image1"
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
                                      "Property cover image uploaded successfully",
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
                    name="propertyImage2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4 ">
                          Upload Property Image 2
                        </FormLabel>
                        <FormControl>
                          {image2 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image2}
                                alt="Property image2"
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
                                      "Property image2 uploaded successfully",
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
                    name="propertyImage3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4 ">
                          Upload Property Image 3
                        </FormLabel>
                        <FormControl>
                          {image3 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image3}
                                alt="Property image3"
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
                                      "Property image3 uploaded successfully",
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
                    name="propertyImage4"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4 ">
                          Upload Property Image 4
                        </FormLabel>
                        <FormControl>
                          {image4 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image4}
                                alt="Property image4"
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
                                      "Property image4 uploaded successfully",
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
                    name="propertyImage5"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4">
                          Upload Property Image 5
                        </FormLabel>
                        <FormControl>
                          {image5 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image5}
                                alt="Property image5"
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
                                      "Property image5 uploaded successfully",
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
                    name="propertyImage6"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4 ">
                          Upload Property Image 6
                        </FormLabel>
                        <FormControl>
                          {image6 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image6}
                                alt="Property image6"
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
                                      "Property image6 uploaded successfully",
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
                    name="propertyImage7"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4">
                          Upload Property Image 7
                        </FormLabel>
                        <FormControl>
                          {image7 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image7}
                                alt="Property image7"
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
                                      "Property image7 uploaded successfully",
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
              {property ? (
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
                      isPropertyDeleting
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
                        <PencilLine className="mr-2 h-4 w-4" /> Update Property
                      </>
                    )}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={
                          isPropertyDeleting ||
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
                        {isPropertyDeleting ? (
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
                          This will permanently delete this property from your
                          web application.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          type="button"
                          onClick={() => handleDeleteProperty(property)}
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
                      {""} Create Property
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
