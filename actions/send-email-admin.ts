"use server";

import nodemailer from "nodemailer";

interface SendEmailProps {
  from: string;
  to: string;
  subject: string;
}

export const sendEmailAdmin = async ({ from, to, subject }: SendEmailProps) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USERNAME,
      to: process.env.SMTP_USERNAME,
      subject: "NEW BOOKING MADE ON JARRYUS PROPERTIES",
      text: "Hello Admin, you have received a new reservation on Jarryus Properties & Management Services Limited. Please log into your dashboard in order to view the reservation now. ",
      html: "",
    };

    //sendMail

    await transporter.sendMail(mailOptions);
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "OOPS! An Error Occured",
    };
  }
};
