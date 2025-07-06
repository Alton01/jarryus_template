"use server";

import nodemailer from "nodemailer";

interface SendEmailProps {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export const sendEmailUser = async ({
  from,
  to,
  subject,
  text,
}: SendEmailProps) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from,
      to,
      subject,
      text,
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
