import dotenv from "dotenv";

import { InternalError } from "./errors";

// Retrieve .env variables
dotenv.config();

if (!process.env.PORT) throw InternalError.NO_APP_PORT;
const port = process.env.PORT;

export { port };
if (!process.env.EMAIL) throw InternalError.NO_EMAIL;
if (!process.env.EMAIL_PASSWORD) throw InternalError.NO_EMAIL_PASSWORD;
