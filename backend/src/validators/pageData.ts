import { body } from "express-validator";

const makePagenameValidator = () =>
  body("pagename")
    .exists()
    .withMessage("pagename is required")
    .bail()
    .isString()
    .withMessage("pagename must be a string")
    .bail()
    .notEmpty()
    .withMessage("pagename cannot be empty");

const makeFieldsValidator = () =>
  body("fields")
    .exists()
    .withMessage("fields are required")
    .bail()
    .isArray()
    .withMessage("fields must be an array")
    .bail()
    .custom((fields: unknown) => {
      if (!Array.isArray(fields)) {
        throw new Error("fields must be an array");
      }
      for (const field of fields) {
        // Ensure field is an object, then safely cast it
        if (typeof field !== "object" || field === null) {
          throw new Error("Each field must be an object");
        }
        const fieldObj = field as Record<string, unknown>;
        if (!("name" in fieldObj) || typeof fieldObj.name !== "string" || !fieldObj.name.trim()) {
          throw new Error('Each field must have a non-empty string "name"');
        }
        if (!("type" in fieldObj) || typeof fieldObj.type !== "string" || !fieldObj.type.trim()) {
          throw new Error('Each field must have a non-empty string "type"');
        }
        // `data` is left unchecked because it is of an unknown shape.
      }
      return true;
    });

export const updatePageDataValidator = [makePagenameValidator(), makeFieldsValidator()];
