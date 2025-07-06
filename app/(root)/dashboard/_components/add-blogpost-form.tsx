"use client";

import Loading from "@/app/loading";
import { Blogpost, Project } from "@prisma/client";
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
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
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Loader, Pencil, PencilLine, Trash, XCircleIcon } from "lucide-react";
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
import { UploadButton, uploadFiles } from "@/lib/utils/uploadthing";
import { blogPostSchema } from "@/lib/validations";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { deleteBlogpost } from "@/actions/blog/delete-blogpost";
import { updateBlogPost } from "@/actions/blog/update-blogpost";

interface AddBlogPostFormProps {
  blog: Blogpost | null;
}

export const AddBlogPostForm = ({ blog }: AddBlogPostFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [image1, setImage1] = useState<string | undefined>(
    blog?.blogImageBanner
  );
  const [title, setTitle] = useState(blog?.blogTitle);
  const [slug, setSlug] = useState(blog?.blogSlug);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlogPostDeleting, setIsBlogPostDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [blogValue, setBlogValue] = useState(blog?.blogContent);

  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill-new"), {
        ssr: false,
      }),
    []
  );

  const handleTitleChange = (e: any) => {
    const title = e.target.value;
    setTitle(title);

    // create slug from product name

    const slugValue = title
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/\./g, "-"); // Replace periods with hyphens in the slug
    setSlug(slugValue);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ script: "sub" }, { script: "super" }],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          ["link", "video"],
          ["code-block"],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "blockquote",
    "list",
    "indent",
    "align",
    "link",
    "video",
    "code-block",
    "color",
    "background",
  ];
  // 1. Define your form.
  const form = useForm<z.infer<typeof blogPostSchema>>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: blog || {
      blogTitle: "",
      blogImageBanner: "",
      blogContent: "",
      blogSlug: "",
    },
  });

  useEffect(() => {
    if (typeof image1 === "string") {
      form.setValue("blogImageBanner", image1, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof title === "string") {
      form.setValue("blogTitle", title, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (blogValue) {
      form.setValue("blogContent", blogValue, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    if (typeof slug === "string") {
      form.setValue("blogSlug", slug, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [image1, blogValue, slug, title]);

  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof blogPostSchema>) {
    if (
      !values.blogTitle ||
      !values.blogImageBanner ||
      !values.blogContent ||
      !values.blogSlug
    )
      return toast({
        variant: "destructive",
        description: "Please fill in the missing fields",
      });
    console.log(values);
    setIsLoading(true);

    toast({
      variant: "default",
      description: "Please be Patient!! Blogpost is updating",
    });
    try {
      const updatedBlogpost = await updateBlogPost(blog?.id!, {
        blogTitle: values?.blogTitle,
        blogImageBanner: values.blogImageBanner,
        blogContent: values.blogContent,
        blogSlug: values.blogSlug,
      });
      router.push("/dashboard");
      toast({
        variant: "default",
        description: "BlogPost Successfully Updated",
      });

      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);

      toast({
        variant: "destructive",
        description: `Failed to update blogpost ${error.message}`,
      });
    }
  }

  // This is for deleting a project. Firstly we delete the images from uploadthing storage before deleting the project from database
  const handleDeleteBlogPost = async (blog: Blogpost) => {
    setIsBlogPostDeleting(true);
    toast({
      variant: "default",
      description: "Please be Patient!! BlogPost is being deleted",
    });
    const getImageKey = (src: string) =>
      src.substring(src.lastIndexOf("/") + 1);

    try {
      const imageKey = [getImageKey(blog.blogImageBanner)];

      await axios.post("/api/uploadthing/delete", { imageKey });

      await deleteBlogpost(blog?.id);

      toast({
        variant: "default",
        description: "BlogPost Successfully Deleted.",
      });
      setIsBlogPostDeleting(false);
      router.push("/dashboard");
    } catch (error: any) {
      setIsBlogPostDeleting(false);
      console.log(error);
      toast({
        variant: "destructive",
        description: `Failed to delete blogpost ${error.message}`,
      });
    }
  };

  const handleImageDelete = (image1: string) => {
    setImageIsDeleting(true);

    const imageKey = image1.substring(image1.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage1("");
          toast({
            variant: "default",
            description: "BlogPost Cover Image Successfully Deleted",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Failed to delete Blog Post Cover Image ",
        });
      })
      .finally(() => {
        setImageIsDeleting(false);
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
              <BreadcrumbPage> Update Blog Post</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="text-xl text-center lg:text-2xl xl:text-3xl mt-4">
        {`Update ${blog?.blogTitle}`}
      </h1>
      <div className="flex flex-col mt-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col mb-8 max-w-6xl">
                <div className="flex flex-col w-full px-2 space-y-8 pb-4">
                  <div className="flex flex-col w-full">
                    <FormField
                      control={form.control}
                      name="blogTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="lg:text-lg">
                            Blog Title
                          </FormLabel>
                          <input
                            type="text"
                            value={title}
                            maxLength={30}
                            className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                            onChange={handleTitleChange}
                          />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <FormField
                      control={form.control}
                      name="blogImageBanner"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex mb-4 lg:text-lg">
                            Upload Blog Post Cover Image
                          </FormLabel>
                          <FormControl>
                            {image1 ? (
                              <div className="relative max-w-[100%] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 items-center justify-center">
                                <Image
                                  fill
                                  src={image1}
                                  alt="Blog Post Cover Image"
                                  className="object-contain max-w-[500px] min-w-[200px]"
                                />
                                <Button
                                  type="button"
                                  size={"icon"}
                                  variant={"ghost"}
                                  className="absolute right-[-12px] top-0"
                                  onClick={() => handleImageDelete(image1)}
                                >
                                  {imageIsDeleting ? (
                                    <Loader className="animate-spin" />
                                  ) : (
                                    <XCircleIcon />
                                  )}
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center max-w-[100%] min-w-[200px] p-10 max-h-[400px] min-h-[200px] border-2 rounded-sm w-full justify-center ">
                                <UploadButton
                                  endpoint="imageUploader"
                                  onClientUploadComplete={(res) => {
                                    // Do something with the response
                                    console.log("Files: ", res);
                                    setImage1(res[0].url);
                                    toast({
                                      variant: "default",
                                      description:
                                        "Blog Post cover image uploaded successfully",
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
                  <div className="flex flex-col h-full w-[250px] sm:w-[270px] vm:w-[350px] vv:w-[380px] ss:w-[420px] mm:w-[520px] ms:w-[580px] md:w-[620px] lg:w-[740px] xl:w-[980px]">
                    <ReactQuill
                      theme="snow"
                      value={blogValue}
                      onChange={setBlogValue}
                      placeholder="Start blogging..."
                      modules={modules}
                      formats={formats}
                      style={{ minHeight: "200px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full items-center justify-center mt-6">
              {blog && (
                <div className="flex flex-col w-full  vm:flex-row items-center justify-center vm:justify-between">
                  <Button
                    type="submit"
                    className="max-w-[175px] p-3 mb-5 vm:mb-0"
                    disabled={
                      isLoading || imageIsDeleting || isBlogPostDeleting
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
                        <PencilLine className="mr-2 h-4 w-4" /> Update Post
                      </>
                    )}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={
                          isBlogPostDeleting || isLoading || imageIsDeleting
                        }
                        className="w-fit p-2 md:p-5 md:max-w-[130px] "
                        variant={"destructive"}
                        type="button"
                      >
                        {isBlogPostDeleting ? (
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
                          This will permanently delete this Blogpost from your
                          website.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          type="button"
                          onClick={() => handleDeleteBlogPost(blog)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
