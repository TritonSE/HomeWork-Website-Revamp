import express, { Request, Response, NextFunction } from "express";
import { ContactRequest } from "../controllers/contactRequest";
import { ContactError } from "../errors/contact";
export const validateContactRequest = (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, phoneNumber } = req.body as ContactRequest;

  if (!fullName || !email || !phoneNumber) {
    throw ContactError.INVALID_FORM;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw ContactError.INVALID_EMAIL;
  }

  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phoneNumber)) {
    throw ContactError.INVALID_PHONE;
  }

  next();
};
