import express from "express";

import * as QuoteController from "../controllers/quote";
import * as QuoteValidator from "../validators/quote";

const router = express.Router();

router.get("/all", QuoteController.getAllQuotes);
router.post("/create", QuoteValidator.createQuote, QuoteController.createQuote);
router.put("/:id", QuoteValidator.updateQuote, QuoteController.updateQuote);
router.delete("/:id", QuoteController.deleteQuote);

export default router;
