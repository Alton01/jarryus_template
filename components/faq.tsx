"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col w-full items-center justify-center max-w-full py-10 px-4 ms:px-6 lg:px-8 xl:px-10 font-poppins bg-muted dark:bg-black">
      <div className="flex w-full items-center justify-center pb-4">
        <h1 className=" font-bold text-2xl xl:text-3xl  text-center font-poppins text-slate-700 dark:text-slate-200 ">
          Frequently Asked <span className="text-amber-600"> Questions</span>
        </h1>
      </div>
      <div className="flex flex-col w-full ">
        <Accordion
          type="single"
          collapsible
          className="w-full text-sm lg:text-lg p-3 font-poppins text-slate-700 dark:text-slate-200"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What does your property management service include?
            </AccordionTrigger>
            <AccordionContent className="lg:text-lg">
              Our property management service covers all aspects of property
              oversight, including sale, tenant screening, rent collection,
              property maintenance, legal compliance, and regular inspections.
              We ensure your property is well maintained and your investment is
              maximized.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How long does the construction process typically take?
            </AccordionTrigger>
            <AccordionContent className="lg:text-lg">
              The duration of construction depends on the size and complexity of
              the project. After an initial consultation and planning phase, we
              provide a detailed timeline outlining each stage of the process,
              ensuring transparency and effective project management from start
              to finish.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What is the importance of estate surveying and valuation?
            </AccordionTrigger>
            <AccordionContent className="lg:text-lg">
              Estate surveying and valuation provide an accurate assessment of
              your property's market value, crucial for buying, selling, leasing
              or financing decisions. Our expert team conducts thorough
              evaluations to ensure you have the right information to make
              informed decisions
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              How do you ensure quality and compliance during construction?
            </AccordionTrigger>
            <AccordionContent className="lg:text-lg">
              We adhere to strict industry standards, building codes and
              regulatory requirements. Our team performs regular inspections,
              quality checks, and utilizes high grade materials to guarantee
              durability, safety and compliance throughout the construction
              process.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Can I get a combined service package for property management,
              construction, and valuation?
            </AccordionTrigger>
            <AccordionContent className="lg:text-lg">
              Yes, we offer customized service packages that integrate property
              management, construction, and valuation to streamline your real
              estate projects and investments. This hollistic approach ensures
              efficiency, cost-effectiveness, and a single point of contact for
              all your property needs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
