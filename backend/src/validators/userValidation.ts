import { body } from "express-validator";

/**
 * Validators for user operations
 */
const makeNameValidator = () =>
  body("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .notEmpty()
    .withMessage("name cannot be empty");

const makeEmailValidator = () =>
  body("email")
    .exists()
    .withMessage("email is required")
    .bail()
    .isEmail()
    .withMessage("email must be a valid email address")
    .bail()
    .notEmpty()
    .withMessage("email cannot be empty");

const makePasswordValidator = () =>
  body("password")
    .exists()
    .withMessage("password is required")
    .bail()
    .isString()
    .withMessage("password must be a string");

const privilegedValidator = () =>
  body("privileged")
    .exists()
    .withMessage("privileged is required")
    .bail()
    .isBoolean()
    .withMessage("default users will have no privilege");

export const createUserValidation = [
  makeNameValidator(),
  makeEmailValidator(),
  makePasswordValidator(),
  privilegedValidator(),
];
