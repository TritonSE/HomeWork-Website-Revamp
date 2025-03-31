import express from "express";

import * as UserController from "../controllers/user";
import { verifyAuthToken } from "../validators/auth";
import * as UserValidator from "../validators/userValidation";

const router = express.Router();

router.post(
  "/create",
  [verifyAuthToken],
  UserValidator.createUserValidation,
  UserController.createUser,
);
router.get("/whoami", [verifyAuthToken], UserController.loginUser);

export default router;
