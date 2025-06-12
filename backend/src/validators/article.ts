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
  body("thumbnail").exists().withMessage("thumbnail is required");
//.isURL()
//.withMessage("thumbnail must be a url");

const makeIsPublishedValidator = () =>
  body("isPublished").optional().isBoolean().withMessage("isPublished must be a boolean");

export const createArticle = [
  makeHeaderValidator(),
  makeAuthorValidator(),
  makeBodyValidator(),
  makeThumbnailValidator(),
  makeIsPublishedValidator(),
];

export const updateArticle = [
  makeHeaderValidator(),
  makeAuthorValidator(),
  makeBodyValidator(),
  makeThumbnailValidator(),
  makeIsPublishedValidator(),
];
