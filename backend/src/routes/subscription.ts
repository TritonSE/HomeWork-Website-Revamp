import express from "express";

import * as SubscriptionController from "../controllers/subscription";
import * as SubscriptionValidator from "../validators/subscription";

const router = express.Router();

router.post(
  "/create",
  SubscriptionValidator.createSubscription,
  SubscriptionController.createSubscription,
);

router.get("/", SubscriptionController.getAllSubscriptions);

router.delete("/", SubscriptionController.removeSubscription);

export default router;
