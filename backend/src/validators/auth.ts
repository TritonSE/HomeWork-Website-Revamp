import { NextFunction, Request, Response } from "express";
import { DecodedIdToken } from "firebase-admin/auth";

import { AuthError } from "../errors/auth";
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
    req.body.uid = userInfo.user_id as string;

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

export { verifyAuthToken };
