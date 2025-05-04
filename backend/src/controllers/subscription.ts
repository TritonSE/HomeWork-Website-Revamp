import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import { devMode } from "../config";
import SubscriptionModel from "../models/subscription";
import { sendConfirmationEmail } from "../services/gmailService";
import validationErrorParser from "../util/validationErrorParser";

type SubscriptionBody = {
  name: string;
  email: string;
};

export const createSubscription: RequestHandler<object, object, SubscriptionBody> = async (
  req,
  res,
) => {
  try {
    console.log("Received body:", req.body);

    const errors = validationResult(req);
    validationErrorParser(errors);

    const { name, email } = req.body;

    const subscription = await SubscriptionModel.findOne({ email });
    if (subscription) {
      res.status(400).json({ message: "Email is already subscribed." });
      return;
    }

    const threadId =
      devMode ??
      (await sendConfirmationEmail(
        email,
        "Thanks for subscribing to HoMEwork!",
        "We’ve received your request and will keep in touch.",
      ));

    const newSubscription = await SubscriptionModel.create({
      name,
      email,
      threadId,
      status: "active",
    });

    res.status(201).json(newSubscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message || "Internal server error" });
  }
};

export const getAllSubscriptions: RequestHandler = async (req, res, next) => {
  try {
    const allSubscriptions = await SubscriptionModel.find({});
    res.status(200).json(allSubscriptions);
  } catch (error) {
    next(error);
  }
};

export const removeSubscription: RequestHandler = async (
  req: { body: { email: string } },
  res,
  next,
) => {
  const { email } = req.body;

  try {
    const result = await SubscriptionModel.deleteOne({ email });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
