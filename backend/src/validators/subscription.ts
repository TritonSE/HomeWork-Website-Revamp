import { body } from "express-validator";

const makeFirstNameValidator = () =>
  body("firstname")
    // title must exist, if not this message will be displayed
    .exists()
    .withMessage("first name is required")
    // bail prevents the remainder of the validation chain for this field from being executed if
    // there was an error
    .bail()
    .isString()
    .withMessage("first name must be a string")
    .bail()
    .notEmpty()
    .withMessage("first name cannot be empty");
const makeLastNameValidator = () =>
  body("lastname")
    // title must exist, if not this message will be displayed
    .exists()
    .withMessage("last name is required")
    // bail prevents the remainder of the validation chain for this field from being executed if
    // there was an error
    .bail()
    .isString()
    .withMessage("last name must be a string")
    .bail()
    .notEmpty()
    .withMessage("last name cannot be empty");
const makeEmailValidator = () =>
  body("email")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .isEmail()
    .withMessage("email must be a valid email and string");

// establishes a set of rules that the body of the task creation route must follow
export const createSubscription = [
  makeFirstNameValidator(),
  makeLastNameValidator(),
  makeEmailValidator(),
];
