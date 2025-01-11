import { CustomError } from "./errors";
const INVALID_FORM = "Name, email, and phone are required fields.";
const INVALID_PHONE = "Invalid phone number format.";
const INVALID_EMAIL = "Invalid email format.";
export class ContactError extends CustomError {
  static INVALID_FORM = new ContactError(0, 400, INVALID_FORM);
  static INVALID_PHONE = new ContactError(1, 400, INVALID_PHONE);
  static INVALID_EMAIL = new ContactError(2, 400, INVALID_EMAIL);
}
