import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import { AuthError } from "../errors/auth";
import UserModel from "../models/user";
import { firebaseAdminAuth } from "../util/firebase";
import validationErrorParser from "../util/validationErrorParser";

export type CreateRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  uid: string;
};

export const createUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    validationErrorParser(errors);
    const { name, email, password } = req.body as CreateRequest;

    const userRecord = await firebaseAdminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    const newUser = await UserModel.create({
      _id: userRecord.uid,
      name,
      email,
      privileged: false,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    validationErrorParser(errors);
    const { uid } = req.body as LoginRequest;
    const user = await UserModel.findById(uid);
    if (!user) {
      throw AuthError.INVALID_AUTH_TOKEN;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
