import { LucideIcon } from "lucide-react";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServiceCardProps {
  header: string;
  description: string;
  icon: LucideIcon;
}

const ServiceCard = ({ header, description, icon: Icon }: ServiceCardProps) => {
  return (
    <Card className="z-50 shadow-lg bg-white dark:bg-black">
      <CardHeader>
        <CardTitle>
          <div className="w-full flex items-center justify-center ">
            <Icon className="text-center justify-center text-3xl lg:text-5xl text-amber-600" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="capitalize text-lg lg:text-xl text-center font-semibold pb-3 font-poppins text-amber-600 dark:text-amber-600">
          {header}
        </h1>
        <h1 className="text-sm lg:text-lg text-center font-poppins text-slate-700 dark:text-slate-200">
          {description}
        </h1>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
