import { body } from "express-validator";

const makeFirstNameValidator = () =>
  body("firstname")
    .exists()
    .withMessage("first name is required")
    .bail()
    .isString()
    .withMessage("first name must be a string")
    .bail()
    .notEmpty()
    .withMessage("first name cannot be empty");

const makeLastNameValidator = () =>
  body("lastname")
    .exists()
    .withMessage("last name is required")
    .bail()
    .isString()
    .withMessage("last name must be a string")
    .bail()
    .notEmpty()
    .withMessage("last name cannot be empty");

const makeEmailValidator = () =>
  body("email")
    .exists()
    .withMessage("email is required")
    .bail()
    .isString()
    .withMessage("email must be a string")
    .bail()
    .isEmail()
    .withMessage("email must be a valid email");

const makeMembershipValidator = () =>
  body("membership")
    .optional()
    .isString()
    .withMessage("membership must be a string")
    .bail()
    .isIn(["community", "family"])
    .withMessage("membership must be 'community' or 'family'");

const makeStatusValidator = () =>
  body("status")
    .optional()
    .isString()
    .withMessage("status must be a string")
    .bail()
    .isIn(["active", "error"])
    .withMessage("status must be 'active' or 'error'");

export const createSubscription = [
  makeFirstNameValidator(),
  makeLastNameValidator(),
  makeEmailValidator(),
  makeMembershipValidator(),
  makeStatusValidator(),
];
