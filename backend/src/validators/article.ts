import { body } from "express-validator";

/**
 * Validators for creating and updating articles
 */
const makeHeaderValidator = () =>
  body("header")
    .exists()
    .withMessage("header is required")
    .bail()
    .isString()
    .withMessage("header must be a string")
    .bail()
    .notEmpty()
    .withMessage("header cannot be empty");

const makeDateCreatedValidator = () =>
  body("dateCreated")
    .exists()
    .withMessage("dateCreated is required")
    .bail()
    .isISO8601()
    .withMessage("dateCreated must be a valid date-time string");

const makeAuthorValidator = () =>
  body("author")
    .exists()
    .withMessage("author is required")
    .bail()
    .isString()
    .withMessage("author must be a string")
    .bail()
    .notEmpty()
    .withMessage("author cannot be empty");

const makeBodyValidator = () =>
  body("body").optional().isString().withMessage("body must be a string");

const makeThumbnailValidator = () =>
  body("thumbnail")
    .exists()
    .withMessage("thumbnail is required")
    .isURL()
    .withMessage("thumbnail must be a url");

export const createArticle = [
  makeHeaderValidator(),
  makeDateCreatedValidator(),
  makeAuthorValidator(),
  makeBodyValidator(),
  makeThumbnailValidator(),
];

export const updateArticle = [
  makeHeaderValidator(),
  makeDateCreatedValidator(),
  makeAuthorValidator(),
  makeBodyValidator(),
  makeThumbnailValidator(),
];
