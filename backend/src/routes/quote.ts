import express from "express";

import * as QuoteController from "../controllers/quote";
import { verifyAuthToken } from "../validators/auth";
import * as QuoteValidator from "../validators/quote";

const router = express.Router();

router.get("/all", QuoteController.getAllQuotes);
router.post("/create", [verifyAuthToken], QuoteValidator.createQuote, QuoteController.createQuote);
router.put("/:id", [verifyAuthToken], QuoteValidator.updateQuote, QuoteController.updateQuote);
router.delete("/:id", [verifyAuthToken], QuoteController.deleteQuote);

export default router;
