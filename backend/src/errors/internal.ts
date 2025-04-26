import { CustomError } from "./errors";

const NO_APP_PORT = "Could not find app port env variable";
const NO_SERVICE_ACCOUNT_KEY = "Could not find service account key env variable";
const NO_EMAIL = "Could not find email";
const NO_EMAIL_PASSWORD = "Could not find email password";
const NO_MONGO_URI = "Could not find mongo uri env variable";

// Gmail-related
const NO_GMAIL_CLIENT_ID = "Could not find Gmail client ID";
const NO_GMAIL_CLIENT_SECRET = "Could not find Gmail client secret";
const NO_GMAIL_REDIRECT_URI = "Could not find Gmail redirect URI";
const NO_GMAIL_ACCESS_TOKEN = "Could not find Gmail access token";
const NO_GMAIL_REFRESH_TOKEN = "Could not find Gmail refresh token";
const NO_GMAIL_TOKEN_EXPIRY = "Could not find Gmail token expiry";

export class InternalError extends CustomError {
  static NO_EMAIL = new InternalError(1, 500, NO_EMAIL);
  static NO_EMAIL_PASSWORD = new InternalError(2, 500, NO_EMAIL_PASSWORD);
  static NO_APP_PORT = new InternalError(0, 500, NO_APP_PORT);
  static NO_SERVICE_ACCOUNT_KEY = new InternalError(5, 500, NO_SERVICE_ACCOUNT_KEY);
  static NO_MONGO_URI = new InternalError(1, 500, NO_MONGO_URI);

  // Gmail
  static NO_GMAIL_CLIENT_ID = new InternalError(6, 500, NO_GMAIL_CLIENT_ID);
  static NO_GMAIL_CLIENT_SECRET = new InternalError(7, 500, NO_GMAIL_CLIENT_SECRET);
  static NO_GMAIL_REDIRECT_URI = new InternalError(8, 500, NO_GMAIL_REDIRECT_URI);
  static NO_GMAIL_ACCESS_TOKEN = new InternalError(9, 500, NO_GMAIL_ACCESS_TOKEN);
  static NO_GMAIL_REFRESH_TOKEN = new InternalError(10, 500, NO_GMAIL_REFRESH_TOKEN);
  static NO_GMAIL_TOKEN_EXPIRY = new InternalError(11, 500, NO_GMAIL_TOKEN_EXPIRY);
}
