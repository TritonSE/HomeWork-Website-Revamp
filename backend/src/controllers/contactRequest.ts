import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";

import { emailPassword as pass, recipientEmail, email as user } from "../config";
import validationErrorParser from "../util/validationErrorParser";

export type ContactRequest = {
  fullName: string;
  email: string;
  phoneNumber: string;
  message?: string;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

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

  const EMAIL_SUBJECT = `Contact Request from ${fullName}`;
  const WEBSITE_LOGO_URL = "https://homework-sd.org/logo-dark.png";
  const EMAIL_BODY = [
    "Homework SD Website Contact Form Submission",
    "",
    "This message was sent from the Homework SD website contact form.",
    "Do not reply to this email.",
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phoneNumber}`,
    "",
    "Message:",
    message,
  ].join("\n");
  const EMAIL_HTML = `
    <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">Homework SD Website Contact Form Submission</h2>
      <div style="background-color: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #d1d5db;">
        <div style="max-width: 640px; margin-bottom: 16px;">
          <p style="margin: 0 0 6px;"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin: 0;"><strong>Phone:</strong> ${escapeHtml(phoneNumber)}</p>
        </div>
        <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
        <div style="white-space: pre-wrap;">
          ${escapeHtml(message)}
        </div>
      </div>
      <div style="margin: 0 0 16px;">
        <img
          src="${WEBSITE_LOGO_URL}"
          alt="Homework SD logo"
          style="display: block; max-width: 260px; width: 100%; height: auto;"
        />
      </div>
      <p style="margin: 0 0 8px;">
        This message was sent from the <strong>Homework SD website</strong> contact form.
      </p>
      <p style="margin: 0 0 18px; color: #b91c1c;">
        <strong>Do not reply to this email.</strong>
      </p>
    </div>
  `;

  try {
    validationErrorParser(errors);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user,
        pass,
      },
    });
    const mailOptions = {
      from: user,
      to: recipientEmail,
      subject: EMAIL_SUBJECT,
      text: EMAIL_BODY,
      html: EMAIL_HTML,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Contact request submitted successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    next(error);
  }
};
