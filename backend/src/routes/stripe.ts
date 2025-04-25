// routes/stripe.ts
import express from "express";

import { createCheckoutSession, getCheckoutSession } from "../controllers/stripe";

const router = express.Router();
router.get("/session/:sessionId", getCheckoutSession);
router.post("/create-session", createCheckoutSession);

export default router;
