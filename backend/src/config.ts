import dotenv from "dotenv";
import { google } from "googleapis";

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
const email = throwIfUndefined(process.env.EMAIL, InternalError.NO_EMAIL);
const emailPassword = throwIfUndefined(process.env.EMAIL_PASSWORD, InternalError.NO_EMAIL_PASSWORD);

const gmailClientId = throwIfUndefined(
  process.env.GMAIL_CLIENT_ID,
  InternalError.NO_GMAIL_CLIENT_ID,
);
const gmailClientSecret = throwIfUndefined(
  process.env.GMAIL_CLIENT_SECRET,
  InternalError.NO_GMAIL_CLIENT_SECRET,
);
const gmailRedirectUri = throwIfUndefined(
  process.env.GMAIL_REDIRECT_URI,
  InternalError.NO_GMAIL_REDIRECT_URI,
);
const gmailAccessToken = throwIfUndefined(
  process.env.GMAIL_ACCESS_TOKEN,
  InternalError.NO_GMAIL_ACCESS_TOKEN,
);
const gmailRefreshToken = throwIfUndefined(
  process.env.GMAIL_REFRESH_TOKEN,
  InternalError.NO_GMAIL_REFRESH_TOKEN,
);
const gmailTokenExpiry = parseInt(
  throwIfUndefined(process.env.GMAIL_TOKEN_EXPIRY, InternalError.NO_GMAIL_TOKEN_EXPIRY),
);

const oAuth2Client = new google.auth.OAuth2(gmailClientId, gmailClientSecret, gmailRedirectUri);

oAuth2Client.setCredentials({
  access_token: gmailAccessToken,
  refresh_token: gmailRefreshToken,
  scope:
    "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send",
  token_type: "Bearer",
  expiry_date: gmailTokenExpiry,
});

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

export { port, mongoUri, serviceAccountKey, email, emailPassword, gmail };
