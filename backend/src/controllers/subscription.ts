import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import { devMode } from "../config";
import SubscriptionModel from "../models/subscription";
import { sendConfirmationEmail } from "../services/gmailService";
import validationErrorParser from "../util/validationErrorParser";

type SubscriptionBody = {
  firstname: string;
  lastname: string;
  email: string;
  membership: "community" | "family";
  status: "active" | "error";
};

export const createSubscription: RequestHandler<object, object, SubscriptionBody> = async (
  req,
  res,
) => {
  try {
    const errors = validationResult(req);
    validationErrorParser(errors);

    const { firstname, lastname, email, membership, status } = req.body;

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
      firstname,
      lastname,
      email,
      membership,
      status,
      threadId,
      joined: new Date(),
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

export const removeSubscriptions: RequestHandler<object, object, { emails: string[] }> = async (
  req,
  res,
  next,
) => {
  const { emails } = req.body;

  if (!Array.isArray(emails) || emails.length === 0) {
    res.status(400).json({ message: "No e-mails supplied for deletion." });
    return;
  }

  try {
    const result = await SubscriptionModel.deleteMany({
      email: { $in: emails },
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateSubscription: RequestHandler<
  object,
  object,
  {
    email: string;
    firstname: string;
    lastname: string;
    status: "active" | "error";
    membership: "community" | "family";
  }
> = async (req, res, next) => {
  try {
    const { email, firstname, lastname, status, membership } = req.body;

    const sub = await SubscriptionModel.findOneAndUpdate(
      { email },
      {
        firstname,
        lastname,
        status,
        membership,
      },
      { new: true },
    );

    if (!sub) {
      res.status(404).json({ message: "Subscription not found." });
      return;
    }

    res.status(200).json(sub);
  } catch (err) {
    next(err);
  }
};
