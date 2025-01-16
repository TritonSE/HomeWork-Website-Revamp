import dotenv from "dotenv";

import { InternalError } from "./errors";

// Retrieve .env variables
dotenv.config();

if (!process.env.PORT) throw InternalError.NO_APP_PORT;
const port = process.env.PORT;

if (!process.env.EMAIL) throw InternalError.NO_EMAIL;
if (!process.env.EMAIL_PASSWORD) throw InternalError.NO_EMAIL_PASSWORD;
if (!process.env.MONGO_URI) throw InternalError.NO_MONGO_URI;
const mongoUri = process.env.MONGO_URI;
export { port, mongoUri };
