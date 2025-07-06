"use client";

import Loading from "@/app/loading";
import { Land, Property } from "@prisma/client";
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
import { landPostSchema, propertyPostSchema } from "@/lib/validations";
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
import { updateLand } from "@/actions/land/update-land";
import { createLand } from "@/actions/land/create-land";
import { deleteLand } from "@/actions/land/delete-land";

interface AddLandFormProps {
  land: Land | null;
}

export const AddLandForm = ({ land }: AddLandFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [image1, setImage1] = useState<string | undefined>(land?.landImage1);
  const [image2, setImage2] = useState<string | undefined>(land?.landImage2);
  const [image3, setImage3] = useState<string | undefined>(land?.landImage3);
  const [image4, setImage4] = useState<string | undefined>(land?.landImage4);

  const [image1IsDeleting, setImage1IsDeleting] = useState(false);
  const [image2IsDeleting, setImage2IsDeleting] = useState(false);
  const [image3IsDeleting, setImage3IsDeleting] = useState(false);
  const [image4IsDeleting, setImage4IsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLandDeleting, setIsLandDeleting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (typeof image1 === "string") {
      form.setValue("landImage1", image1, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image2 === "string") {
      form.setValue("landImage2", image2, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image3 === "string") {
      form.setValue("landImage3", image3, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof image4 === "string") {
      form.setValue("landImage4", image4, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [image1, image2, image3, image4]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof landPostSchema>>({
    resolver: zodResolver(landPostSchema),
    defaultValues: land || {
      landLocation: "",
      landDocAvailable: "",
      landDescription: "",
      landAreaSize: "",
      estateProperty: false,
      isAvailable: false,
      landSalePrice: 0,
      landImage1: "",
      landImage2: "",
      landImage3: "",
      landImage4: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof landPostSchema>) {
    console.log(values);
    setIsLoading(true);
    if (land) {
      try {
        toast({
          variant: "default",
          description: "Please be Patient!! Land is updating",
        });

        const updatedLand = await updateLand(land?.id!, {
          landLocation: values?.landLocation,
          landDocAvailable: values?.landDocAvailable,
          landDescription: values?.landDescription,
          landAreaSize: values?.landAreaSize,
          estateProperty: values?.estateProperty,
          isAvailable: values?.isAvailable,
          landSalePrice: values?.landSalePrice,
          landImage1: values?.landImage1,
          landImage2: values?.landImage2,
          landImage3: values?.landImage3,
          landImage4: values?.landImage4,
        });

        form.reset();
        toast({
          variant: "default",
          description: "Land Successfully Updated",
        });
        router.push("/dashboard/lands");
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          description: "Failed to Update Land",
        });
        setIsLoading(false);
      }
    } else {
      try {
        toast({
          variant: "default",
          description: "Please be Patient!! Land is being created",
        });

        const newLand = await createLand({
          landLocation: values?.landLocation,
          landDocAvailable: values?.landDocAvailable,
          landDescription: values?.landDescription,
          landAreaSize: values?.landAreaSize,
          estateProperty: values?.estateProperty,
          isAvailable: values?.isAvailable,
          landSalePrice: values?.landSalePrice,
          landImage1: values?.landImage1,
          landImage2: values?.landImage2,
          landImage3: values?.landImage3,
          landImage4: values?.landImage4,
        });

        form.reset();
        toast({
          variant: "default",
          description: "Land Successfully Created",
        });
        router.push("/dashboard/lands");
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          description: "Failed to create land, something went wrong!!",
        });
        setIsLoading(false);
      }
    }
  }

  // This is for deleting a land. Firstly we delete the images from uploadthing storage before deleting the land from database
  const handleDeleteLand = async (land: Land) => {
    setIsLandDeleting(true);
    toast({
      variant: "default",
      description: "Please be Patient!! Land is being deleted",
    });
    const getImageKey = (src: string) =>
      src.substring(src.lastIndexOf("/") + 1);

    try {
      const imageKey = [
        getImageKey(land?.landImage1),
        getImageKey(land?.landImage2),
        getImageKey(land?.landImage3),
        getImageKey(land?.landImage4),
      ];

      await axios.post("/api/uploadthing/delete", { imageKey });

      await deleteLand(land?.id);

      toast({
        variant: "default",
        description: "Land Successfully Deleted.",
      });
      setIsLandDeleting(false);
      router.push("/dashboard/lands");
    } catch (error: any) {
      setIsLandDeleting(false);
      console.log(error);
      toast({
        variant: "destructive",
        description: `Failed to delete land ${error.message}`,
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
            description: "Land Image Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete land image ",
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
            description: "Land Image 2 Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete land image ",
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
            description: "Land Image 3 Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete land image ",
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
            description: "Land Image 4 Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete land image ",
        });
      })
      .finally(() => {
        setImage4IsDeleting(false);
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
                {land ? "Update Land" : "Create Land"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="text-xl text-center lg:text-2xl xl:text-3xl mt-4">
        {land ? `Update ${land?.landLocation}` : "Create A Land For Sale"}
      </h1>
      <div className="flex flex-col mt-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full mb-8">
              <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-x-3 gap-y-3 mb-10 mt-8">
                <FormField
                  control={form.control}
                  name="landLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        Land Location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What is the location of this property"
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
                  name="landDocAvailable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        Document available to land
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="EG. Certificate of Occupancy, R of O"
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
                  name="landAreaSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        Size of Land
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
                  name="landSalePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        How much for this land?
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
                  name="landDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="xl:text-lg font-poppins">
                        Description of Land
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none h-32 focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none focus:outline-none focus-visible:border-1 focus:border-1"
                          placeholder="Add a full description for this land"
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
                      <FormLabel>Is this an estate land?</FormLabel>
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
                      <FormLabel>Is this land available for sale?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col w-full px-2 gap-y-3">
                <h1 className="font-poppins text-center text-sm lg:text-lg xl:text-xl pb-5">
                  Attach images of this land. All 4 images are compulsory.
                </h1>
                <div className="grid grid-cols-1 ms:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-4">
                  <FormField
                    control={form.control}
                    name="landImage1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4">
                          Upload Land Cover Image
                        </FormLabel>
                        <FormControl>
                          {image1 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image1}
                                alt="Land image1"
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
                                      "Land cover image uploaded successfully",
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
                    name="landImage2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4 ">
                          Upload Land Image 2
                        </FormLabel>
                        <FormControl>
                          {image2 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image2}
                                alt="Land image2"
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
                                      "Land image2 uploaded successfully",
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
                    name="landImage3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4 ">
                          Upload Land Image 3
                        </FormLabel>
                        <FormControl>
                          {image3 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image3}
                                alt="Land image3"
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
                                      "Land image3 uploaded successfully",
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
                    name="landImage4"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex mb-4 ">
                          Upload Land Image 4
                        </FormLabel>
                        <FormControl>
                          {image4 ? (
                            <div className="relative max-w-[500px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                              <Image
                                fill
                                src={image4}
                                alt="Land image4"
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
                                      "Land image4 uploaded successfully",
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
              {land ? (
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
                      isLandDeleting
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
                        <PencilLine className="mr-2 h-4 w-4" /> Update Land
                      </>
                    )}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={
                          isLandDeleting ||
                          isLoading ||
                          image1IsDeleting ||
                          image2IsDeleting ||
                          image3IsDeleting ||
                          image4IsDeleting
                        }
                        className="w-fit p-2 md:p-5 md:max-w-[130px] "
                        variant={"destructive"}
                        type="button"
                      >
                        {isLandDeleting ? (
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
                          This will permanently delete this land from your web
                          application.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          type="button"
                          onClick={() => handleDeleteLand(land)}
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
                    image4IsDeleting
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
                      {""} Create Land
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
