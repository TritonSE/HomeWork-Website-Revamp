import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";

import validationErrorParser from "../../src/util/validationErrorParser";

export type ContactRequest = {
  fullName: string;
  email: string;
  phoneNumber: string;
  message?: string;
};

export const handleContactRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const errors = validationResult(req);
  const {
    fullName,
    email,
    phoneNumber,
    message = "No Message Provided",
  } = req.body as ContactRequest;

  console.log("Contact request received:", { fullName, email, phoneNumber, message });
  const EMAIL_SUBJECT = `Contact Request from ${fullName}`;
  const EMAIL_BODY = `Name: ${fullName}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`;

  try {
    validationErrorParser(errors);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: EMAIL_SUBJECT,
      text: EMAIL_BODY,
    };
    await transporter.sendMail(mailOptions);
    console.log("Contact email sent successfully");
    res.status(200).json({ message: "Contact request submitted successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    next(error);
  }
};
