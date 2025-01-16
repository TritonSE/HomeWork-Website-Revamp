import { CustomError } from "./errors";

const NO_APP_PORT = "Could not find app port env variable";
const NO_EMAIL = "Could not find email";
const NO_EMAIL_PASSWORD = "Could not find email password";
const NO_MONGO_URI = "Could not find mongo uri env variable";

export class InternalError extends CustomError {
  static NO_EMAIL = new InternalError(1, 500, NO_EMAIL);
  static NO_EMAIL_PASSWORD = new InternalError(2, 500, NO_EMAIL_PASSWORD);
  static NO_APP_PORT = new InternalError(0, 500, NO_APP_PORT);
  static NO_MONGO_URI = new InternalError(1, 500, NO_MONGO_URI);
}
