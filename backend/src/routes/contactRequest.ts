import express from "express";

import { handleContactRequest } from "../controllers/contactRequest";
import { validateContactRequest } from "../validators/contactRequest";
const router = express.Router();

router.post("/contact", validateContactRequest, handleContactRequest);

export default router;
