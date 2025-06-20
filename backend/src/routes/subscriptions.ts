import express from "express";

import * as SubscriptionController from "../controllers/subscription";
import { verifyAuthToken } from "../validators/auth";
import * as SubscriptionValidator from "../validators/subscription";

const router = express.Router();

router.post(
  "/create",
  SubscriptionValidator.createSubscription,
  SubscriptionController.createSubscription,
);

router.get("/", [verifyAuthToken], SubscriptionController.getAllSubscriptions);

router.delete("/", [verifyAuthToken], SubscriptionController.removeSubscriptions);

router.put("/update", [verifyAuthToken], SubscriptionController.updateSubscription);

export default router;
