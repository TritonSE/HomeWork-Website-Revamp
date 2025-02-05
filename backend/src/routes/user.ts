import express from "express";

import * as UserController from "../controllers/user";
import * as UserValidator from "../validators/userValidation";
import { verifyAuthToken } from "../validators/auth";

const router = express.Router();

router.post("/create", UserValidator.createUserValidation, UserController.createUser);
router.get("/login", [verifyAuthToken], UserController.loginUser);

export default router;
