/**
 * This file consists of functions to be used to manage or decode firebase users
 */

import { AuthError } from "../errors/auth";

import { firebaseAdminAuth } from "./firebase";

/**
 * This function verifies a token and returns a user from firebase.
 * @param token - the auth token of the user
 * @returns
 */
async function decodeAuthToken(token: string) {
  try {
    const userInfo = await firebaseAdminAuth.verifyIdToken(token);
    return userInfo;
  } catch (e) {
    console.log(e);
    throw AuthError.DECODE_ERROR;
  }
}

export { decodeAuthToken };
