import { Request, Response } from "express";
import nodemailer from "nodemailer";

export type ContactRequest = {
  fullName: string;
  email: string;
  phoneNumber: string;
  message?: string;
};

export const handleContactRequest = (req: Request, res: Response): void => {
  const {
    fullName,
    email,
    phoneNumber,
    message = "No Message Provided",
  } = req.body as ContactRequest;

  console.log("Contact request received:", { fullName, email, phoneNumber, message });

  const sendContactEmail = async (subject: string, message: string) => {
    const EMAIL_SUBJECT = `Contact Request from ${subject}`;
    const EMAIL_BODY = `Name: ${fullName}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`;
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
    try {
      await transporter.sendMail(mailOptions);
      console.log("Contact email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  sendContactEmail(fullName, message);
  res.status(200).json({ message: "Contact request submitted successfully." });
};
