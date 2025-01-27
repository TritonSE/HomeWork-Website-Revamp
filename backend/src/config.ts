import dotenv from "dotenv";

import { InternalError } from "./errors";

// Retrieve .env variables
dotenv.config();

//Function to check if env variable is defined, throws error if not
function throwIfUndefined(envVar: string | undefined, error: InternalError) {
  if (!envVar) throw error;
  return envVar;
}

if (!process.env.PORT) throw InternalError.NO_APP_PORT;
const port = process.env.PORT;

//Make sure service account key is in .env
const serviceAccountKey = throwIfUndefined(
  process.env.SERVICE_ACCOUNT_KEY,
  InternalError.NO_SERVICE_ACCOUNT_KEY,
);
if (!process.env.EMAIL) throw InternalError.NO_EMAIL;
if (!process.env.EMAIL_PASSWORD) throw InternalError.NO_EMAIL_PASSWORD;
if (!process.env.MONGO_URI) throw InternalError.NO_MONGO_URI;
const mongoUri = process.env.MONGO_URI;
export { port, mongoUri };
export { serviceAccountKey };
