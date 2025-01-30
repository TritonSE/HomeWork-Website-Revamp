import { body } from "express-validator";

/**
 * Validators for creating and updating quotes
 */
const makeBodyValidator = () =>
  body("body")
    .exists()
    .withMessage("body is required")
    .bail()
    .isString()
    .withMessage("body must be a string")
    .bail()
    .notEmpty()
    .withMessage("body cannot be empty");

const makeImageValidator = () =>
  body("image")
    .exists()
    .withMessage("image is required")
    .bail()
    .isString()
    .withMessage("image must be a string")
    .bail()
    .notEmpty()
    .withMessage("image cannot be empty");

const makeSourceValidator = () =>
  body("source")
    .exists()
    .withMessage("source is required")
    .bail()
    .isString()
    .withMessage("source must be a string")
    .bail()
    .notEmpty()
    .withMessage("source cannot be empty");

export const createQuote = [makeBodyValidator(), makeImageValidator(), makeSourceValidator()];

export const updateQuote = [makeBodyValidator(), makeImageValidator(), makeSourceValidator()];
