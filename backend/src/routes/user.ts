import express from "express";

import * as UserController from "../controllers/user";
import * as UserValidator from "../validators/userValidation";

const router = express.Router();

router.post("/create", UserValidator.createUserValidation, UserController.createUser);

export default router;
