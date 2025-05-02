import dotenv from "dotenv";

import { InternalError } from "./errors";

// Retrieve .env variables
dotenv.config();

//Function to check if env variable is defined, throws error if not
function throwIfUndefined(envVar: string | undefined, error: InternalError) {
  if (!envVar) throw error;
  return envVar;
}

const port = throwIfUndefined(process.env.APP_PORT, InternalError.NO_APP_PORT);
const mongoUri = throwIfUndefined(process.env.MONGO_URI, InternalError.NO_MONGO_URI);
const serviceAccountKey = throwIfUndefined(
  process.env.SERVICE_ACCOUNT_KEY,
  InternalError.NO_SERVICE_ACCOUNT_KEY,
);
const storageBucket = throwIfUndefined(process.env.STORAGE_BUCKET, InternalError.NO_STORAGE_BUCKET);
const email = throwIfUndefined(process.env.EMAIL, InternalError.NO_EMAIL);
const emailPassword = throwIfUndefined(process.env.EMAIL_PASSWORD, InternalError.NO_EMAIL_PASSWORD);
export { port, mongoUri, serviceAccountKey, storageBucket, email, emailPassword };
