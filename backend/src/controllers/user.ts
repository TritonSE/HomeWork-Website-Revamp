import { Request, Response } from "express";
import { validationResult } from "express-validator";

import UserModel from "../models/user";
import { firebaseAdminAuth } from "../util/firebase";
import validationErrorParser from "../util/validationErrorParser";

import { CreateUserRequestBody } from "./types/userTypes";

export const createUser = async (
  req: Request<Record<string, never>, Record<string, never>, CreateUserRequestBody>,
  res: Response,
) => {
  const errors = validationResult(req);
  try {
    validationErrorParser(errors);
    const { name, email, password } = req.body;
    // Create user in Firebase
    const userRecord = await firebaseAdminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    const newUser = await UserModel.create({
      _id: userRecord.uid,
      name,
      email,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating new user:", error);
    if (error) {
      res.status(400).json({ error });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
