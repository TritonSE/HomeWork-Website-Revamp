/**
 * This file contains the configuration for firebase
 * It exports a firebase auth object which will allow users
 * to access any firebase services. For this project we will use
 * firebase to for authentication.
 */

import * as firebaseAdmin from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

import { serviceAccountKey, storageBucket } from "../config";

/**
 * This will initialize the firebase app to store
 * user credentials
 */

// Uses service account key from .env
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.cert(JSON.parse(serviceAccountKey) as string),
  storageBucket,
});

const firebaseAdminAuth = getAdminAuth();
const firebaseStorage = getStorage();

export { firebaseAdminAuth, firebaseStorage };
