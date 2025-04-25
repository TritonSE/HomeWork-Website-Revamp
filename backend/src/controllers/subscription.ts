import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import SubscriptionModel from "../models/subscription";
import validationErrorParser from "../util/validationErrorParser";

export const createSubscription: RequestHandler = async (
  req: { body: { email: string; firstname: string; lastname: string; joined: Date } },
  res,
  next,
) => {
  // extract any errors that were found by the validator
  const errors = validationResult(req);
  const { firstname, lastname, email } = req.body;
  const joined = new Date();

  try {
    validationErrorParser(errors);

    const subscription = await SubscriptionModel.findOne({ email });
    if (!subscription) {
      const newSubscription = await SubscriptionModel.create({
        firstname: String(firstname),
        lastname: String(lastname),
        email: String(email),
        joined,
      });
      res.status(201).json(newSubscription);
    } else {
      res.status(400).json({ message: "Email is already subscribed." });
    }
  } catch (error) {
    next(error);
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
