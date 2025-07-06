"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminNav = () => {
  return (
    <div className="w-full flex flex-row font-poppins items-center pt-4 pb-8 bg-white dark:bg-[black] text-slate-700 dark:text-slate-200 justify-center">
      <div>
        <Button asChild>
          <Link href="/dashboard">Admin Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminNav;
