import express from "express";

import * as UserController from "../controllers/user";
import { verifyAuthToken } from "../validators/auth";
import * as UserValidator from "../validators/userValidation";

const router = express.Router();

router.post("/create", UserValidator.createUserValidation, UserController.createUser);
router.get("/login", [verifyAuthToken], UserController.loginUser);

export default router;
