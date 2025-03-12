// routes/stripe.ts
import express from "express";
import { getCheckoutSession } from "../controllers/stripe";

const router = express.Router();
router.get("/session/:sessionId", getCheckoutSession);

export default router;
