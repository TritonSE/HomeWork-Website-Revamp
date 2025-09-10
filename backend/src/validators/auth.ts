import { NextFunction, Request, Response } from "express";
import { DecodedIdToken } from "firebase-admin/auth";

import { AuthError } from "../errors/auth";
import UserModel from "../models/user";
import { decodeAuthToken } from "../util/auth";

type RequestBody = {
  uid?: string; // Optional as it is added later
};

type RequestWithUserId = Request<object, object, RequestBody> & {
  userId?: string;
};

/**
 * Middleware to verify Auth token and calls next function based on user role
 */
const verifyAuthToken = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer") ? authHeader.split(" ")[1] : null;

  //Throws error if the token is not in request header
  if (!token) {
    res
      .status(AuthError.TOKEN_NOT_IN_HEADER.status)
      .send(AuthError.TOKEN_NOT_IN_HEADER.displayMessage(true));
    return;
  }

  try {
    //This is where we actually check if the token is valid and get user from firebase
    const userInfo: DecodedIdToken = await decodeAuthToken(token);
    // Add user info to the request body
    req.body.uid = userInfo.uid;

    next(); // Proceed to the next middleware/route handler
  } catch (e) {
    //Throws error if the token is not valid
    console.log(e);
    res
      .status(AuthError.INVALID_AUTH_TOKEN.status)
      .send(AuthError.INVALID_AUTH_TOKEN.displayMessage(true));
    return;
  }
};

const verifyPrivileged = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
  // verify uid has privilege
  const user = await UserModel.findById(req.body.uid);
  if (!user) {
    res
      .status(AuthError.INVALID_AUTH_TOKEN.status)
      .send(AuthError.INVALID_AUTH_TOKEN.displayMessage(true));
    return;
  }
  if (!user.privileged) {
    res
      .status(AuthError.INVALID_AUTH_PRIVILEGE.status)
      .send(AuthError.INVALID_AUTH_PRIVILEGE.displayMessage(true));
    return;
  }

  next();
};

export { verifyAuthToken, verifyPrivileged };
