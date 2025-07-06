import React from "react";
import ServiceCard from "./service-card";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Code,
  Code2,
  Computer,
  FileKey2,
  HardHat,
  NotebookPen,
  TrendingUp,
} from "lucide-react";

const Services = () => {
  return (
    <div className="w-full flex flex-col py-5 px-4 ms:px-6 lg:px-8 xl:px-10 bg-muted  dark:bg-[#1f242d]">
      <div className="w-full flex justify-center pt-6 pb-8">
        <h1 className="font-poppins text-center font-bold text-2xl xl:text-3xl text-slate-700 dark:text-slate-200 ">
          Our {""}
          <span className="text-amber-600">Services</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-x-2 gap-y-3 lg:grid-cols-3">
        <ServiceCard
          icon={BriefcaseBusiness}
          header="Property Management Service"
          description="Our property management service ensures your investments are expertly maintained and maximized for value. From property sale to tenant screening and rent collection to maintenace and legal compliance, we handle every detail with professionalism and efficiency. Trust us to protect your property, enhance its value, and provide seamless management tailored to your property's needs."
        />
        <ServiceCard
          icon={HardHat}
          header="Construction Service"
          description="Our property construction service brings your vision to life with precision and quality. From groundbreaking to final finishes, we manage every phase, ensuring projects are delivered at optimal standard, on time and within budget. With a commitment to excellence and sustainable practices, we create structures that stand the test of time and inspire confidence."
        />
        <ServiceCard
          icon={BadgeDollarSign}
          header="Estate Surveyors & Valuers"
          description="Our estate surveying and valuation service provides accurate, reliable assessments for all property types. Leveraging industry expertise and market insights, we deliver detailed reports that support informed decisions for buying, selling, leasing, or investment. Trust us to value your assets with precision, ensuring transparency and confidence in every transaction."
        />
      </div>
    </div>
  );
};

export default Services;
