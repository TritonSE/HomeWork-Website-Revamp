import express from "express";

import * as TestimonyController from "../controllers/testimony";
import * as TestimonyValidator from "../validators/testimony";

const router = express.Router();

router.get("/all", TestimonyController.getAllTestimoy);
router.post("/create", TestimonyValidator.createTestimony, TestimonyController.createTestimony);
router.put("/:id", TestimonyValidator.updateTestimony, TestimonyController.updateTestimony);
router.delete("/:id", TestimonyController.deleteTestimony);

export default router;
