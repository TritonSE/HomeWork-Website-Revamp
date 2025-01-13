import { body } from "express-validator";

const makeFullNameValidator = () =>
  body("fullName")
    .exists()
    .withMessage("Full name is required")
    .bail()
    .isString()
    .withMessage("Full name must be a string")
    .bail()
    .notEmpty()
    .withMessage("Full name cannot be empty");

const makeEmailValidator = () =>
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .isEmail()
    .withMessage("Invalid email format");

const makePhoneNumberValidator = () =>
  body("phoneNumber")
    .exists()
    .withMessage("Phone number is required")
    .bail()
    .isString()
    .withMessage("Phone number must be a string")
    .bail()
    .matches(/^\d{10,15}$/)
    .withMessage("Phone number must be between 10 and 15 digits");

const makeMessageValidator = () =>
  body("message").optional().isString().withMessage("Message must be a string");

export const validateContactRequest = [
  makeFullNameValidator(),
  makeEmailValidator(),
  makePhoneNumberValidator(),
  makeMessageValidator(),
];
