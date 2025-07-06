"use client";

import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";

const ContactMe = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      setIsLoading(true);
      const emailParams = {
        name: userInput.name,
        email: userInput.email,
        number: userInput.number,
        subject: userInput.subject,
        message: userInput.message,
      };

      const res = await emailjs.send(
        serviceID!,
        templateID!,
        emailParams,
        userID!
      );

      if (res.status === 200) {
        toast({
          variant: "default",
          description: "Email Successfully Sent!!!",
        });

        setUserInput({
          name: "",
          email: "",
          number: "",
          subject: "",
          message: "",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Failed to send message. Please try again!!",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col py-6 px-4 ms:px-6 lg:px-8 xl:px-10 bg-white dark:bg-[#1f242d]">
      <div className="flex flex-col w-full pt-4 pb-5">
        <h1 className="font-poppins text-center font-bold text-2xl xl:text-3xl pb-6 text-slate-700 dark:text-slate-200 ">
          {" "}
          Contact{""} <span className="text-amber-600">Us</span>
        </h1>
        <h1 className="font-poppins text-center font-semibold text-xl xl:text-2xl text-slate-700 dark:text-slate-200">
          +2347063853173
        </h1>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-4xl flex flex-col py-4">
          <form onSubmit={handleSubmit} action="">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2 text-slate-700 dark:text-slate-200">
              <input
                type="text"
                placeholder="Full Name"
                id="name"
                name="name"
                value={userInput.name}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="text-sm  lg:text-lg font-poppins dark:bg-[#1f242d] p-3 bg-white border border-gray-400 rounded-sm w-full focus-visible:ring-offset-0 ring-0 focus-visible:ring-0 focus:ring-0 outline-none focus:outline-none focus-visible:border focus:border"
              />
              <input
                type="email"
                placeholder="Email Address"
                id="email"
                name="email"
                value={userInput.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="text-sm lg:text-lg font-poppins p-3 dark:bg-[#1f242d] bg-white border border-gray-400 rounded-sm w-full focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none focus:outline-none focus-visible:border focus:border"
              />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2 py-4">
              <input
                type="number"
                placeholder="Mobile Number"
                id="number"
                name="number"
                value={userInput.number}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="text-sm lg:text-lg font-poppins p-3 bg-white dark:bg-[#1f242d] border border-gray-400  rounded-sm w-full focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none focus:outline-none focus-visible:border focus:border"
              />
              <input
                type="text"
                placeholder="Email Subject"
                id="subject"
                name="subject"
                value={userInput.subject}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="text-sm lg:text-lg font-poppins p-3 bg-white dark:bg-[#1f242d] border border-gray-400 rounded-sm w-full focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none focus:outline-none focus-visible:border-1 focus:border"
              />
            </div>
            <div className="w-full flex">
              <textarea
                cols={20}
                rows={10}
                placeholder="Write Your Message"
                id="message"
                name="message"
                value={userInput.message}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="text-sm h-30 resize-none lg:text-lg font-poppins p-3 bg-white dark:bg-[#1f242d] border border-gray-400  rounded-sm w-full focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none focus:outline-none focus-visible:border focus:border"
              />
            </div>
            <div className="pb-6 pt-10 w-full flex items-center justify-center">
              <Button
                className="px-3 py-4 font-poppins text-lg text-center items-center justify-center dark:text-slate-200 text-white dark:bg-black"
                type="submit"
                disabled={isLoading}
              >
                <Mail className="w-6 h-6 mr-2" />
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
