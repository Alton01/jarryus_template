"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "./ui/button";
import Link from "next/link";
// This type is used to define the shape of our data.
import { User } from "@prisma/client";
// You can use a Zod schema here if you want.

export const columns: ColumnDef<User>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-sm font-poppins">{row.index + 1}</p>,
  },
  {
    accessorKey: "userName",
    header: "Name",
    cell: ({ row }) => (
      <p className="text-sm font-poppins">{row.original.userName}</p>
    ),
  },
  {
    accessorKey: "userEmail",
    header: "Email Address",
    cell: ({ row }) => (
      <p className="text-sm font-poppins">{row.original.userEmail}</p>
    ),
  },
  {
    accessorKey: "userRole",
    header: "User's Role",
    cell: ({ row }) => (
      <p className="text-sm font-poppins">{row.original.userRole}</p>
    ),
  },

  {
    accessorKey: "id",
    id: "actions",
    header: () => <div className="font-poppins">Actions</div>,
    cell: ({ row }) => (
      <Button asChild className="p-3 font-poppins">
        <Link href={`/dashboard/users/${row.original.id}`}>More Info</Link>
      </Button>
    ),
  },
];
