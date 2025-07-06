"use client";

import { User } from "@prisma/client";
import React, { useState } from "react";
import { Button } from "./ui/button";
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
} from "./ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Loader, Pencil, Trash } from "lucide-react";
import { deleteUser } from "@/actions/deleteUser";
import { useToast } from "@/hooks/use-toast";
import { setAsAdmin } from "@/actions/setAsAdmin";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const router = useRouter();
  const [isUserDeleting, setIsUserDeleting] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { toast } = useToast();

  const handleSetUserAsAdmin = async (user: User) => {
    setIsUserAdmin(true);
    toast({
      variant: "default",
      description: "Please be Patient!! User is being set as  Admin",
    });
    try {
      await setAsAdmin(user.id);
      setIsUserAdmin(false);
      toast({
        variant: "default",
        description: "User Successfully Set As  Admin",
      });
      router.push("/dashboard");
    } catch (error: any) {
      setIsUserAdmin(false);
      console.log(error);
      toast({
        variant: "destructive",
        description: `Failed to set user as Admin ${error.message}`,
      });
    }
  };

  const handleDeleteUser = async (user: User) => {
    setIsUserDeleting(true);
    toast({
      variant: "default",
      description: "Please be Patient!! User is being deleted",
    });
    try {
      await deleteUser(user.id);
      setIsUserDeleting(false);
      toast({
        variant: "default",
        description: "User Successfully Deleted",
      });
      router.push("/dashboard");
    } catch (error: any) {
      setIsUserDeleting(false);
      console.log(error);
      toast({
        variant: "destructive",
        description: `Failed to delete user ${error.message}`,
      });
    }
  };

  return (
    <div className="flex flex-1 flex-col w-full gap-y-10 items-center justify-center bg-[#e3e8e8] dark:bg-black px-4 ms:px-6 lg:px-8 xl:px-10">
      <div className="flex flex-col w-full gap-y-6 items-center justify-center ">
        <h1 className="text-xl lg:text-xl xl:text-2xl font-poppins capitalize font-semibold text-slate-700 dark:text-slate-400">
          Name: {""} {user?.userName}
        </h1>
        <h1 className="text-xl lg:text-xl xl:text-2xl font-poppins font-semibold capitalize text-slate-700 dark:text-slate-400">
          App Role: {""} {user?.userRole}
        </h1>
        <h1 className="text-lg lg:text-lg xl:text-xl font-poppins  text-slate-700 dark:text-slate-400 ">
          Email: {""} {user?.userEmail}
        </h1>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        {user.userRole !== "ADMIN" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={isUserDeleting || isUserAdmin}
                className="w-fit p-2 md:p-5 md:max-w-[170px] "
                type="button"
              >
                {isUserAdmin ? (
                  <>
                    {" "}
                    <Loader className="mr-2 animate-spin h-4 w-4" /> Creating
                    Admin{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <Pencil className="mr-2 h-4 w-4" /> Set As Admin{" "}
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will set this user as an Admin on this web application.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  type="button"
                  onClick={() => handleSetUserAsAdmin(user)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={isUserDeleting || isUserAdmin}
              className="w-fit p-2 md:p-5 md:max-w-[170px] "
              variant={"destructive"}
              type="button"
            >
              {isUserDeleting ? (
                <>
                  {" "}
                  <Loader className="mr-2 animate-spin h-4 w-4" /> Deleting{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Trash className="mr-2 h-4 w-4" /> Delete User{" "}
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this user from this web
                application.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                type="button"
                onClick={() => handleDeleteUser(user)}
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
