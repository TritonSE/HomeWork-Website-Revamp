import express from "express";
import { validateContactRequest } from "../validators/contactRequest";
import { handleContactRequest } from "../controllers/contactRequest";
const router = express.Router();

router.post("/contact", validateContactRequest, handleContactRequest);

export default router;
