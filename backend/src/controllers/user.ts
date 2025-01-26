import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import UserModel from "../models/user";
import { firebaseAdminAuth } from "../util/firebase";
import validationErrorParser from "../util/validationErrorParser";

export const createUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    validationErrorParser(errors);
    const { name, email, password } = req.body;

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
    next(error);
  }
};
