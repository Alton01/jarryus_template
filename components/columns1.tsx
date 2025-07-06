"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "./ui/button";
import { Booking } from "@prisma/client";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns1: ColumnDef<Booking>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-sm font-poppins">{row.index + 1}</p>,
  },
  {
    accessorKey: "bookerName",
    header: "Name",
    cell: ({ row }) => (
      <p className="text-sm font-poppins">{row.original.bookerName}</p>
    ),
  },
  {
    accessorKey: "bookerPhoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <p className="text-sm font-poppins">{row.original.bookerPhoneNumber}</p>
    ),
  },
  {
    accessorKey: "propertyViewingDate",
    header: "Reeserved Date",
    cell: ({ row }) => (
      <p className="text-sm font-poppins">
        {" "}
        {new Date(row.original.propertyViewingDate).toDateString()}
      </p>
    ),
  },

  {
    accessorKey: "propertyName",
    header: "Property Name",
    cell: ({ row }) => (
      <p className="text-sm font-poppins">{row.original.propertyName}</p>
    ),
  },

  {
    accessorKey: "propertyType",
    header: "Property Type",
    cell: ({ row }) => (
      <p className="text-sm font-poppins">{row.original.propertyType}</p>
    ),
  },

  {
    accessorKey: "id",
    id: "actions",
    header: () => <div className="font-poppins">Actions</div>,
    cell: ({ row }) => (
      <Button asChild className="p-3 font-poppins">
        <Link href={`/dashboard/bookings/${row.original.id}`}>More Info</Link>
      </Button>
    ),
  },
];
