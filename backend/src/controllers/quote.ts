import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

import QuoteModel from "../models/quote";
import validationErrorParser from "../util/validationErrorParser";

type QuoteUpdate = {
  body: string;
  image: string;
  source: string;
};

export const createQuote: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    validationErrorParser(errors);
    const quote = await QuoteModel.create(req.body);
    res.status(201).json(quote);
  } catch (error) {
    next(error);
  }
};

export const getAllQuotes: RequestHandler = async (req, res, next) => {
  try {
    const quotes = await QuoteModel.find();
    res.status(200).json(quotes);
  } catch (error) {
    next(error);
  }
};

export const updateQuote: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    const { id } = req.params;
    validationErrorParser(errors);

    // Returns the updated quote
    const reqBody: QuoteUpdate = req.body as QuoteUpdate;
    const quote = await QuoteModel.findByIdAndUpdate(id, reqBody, {
      new: true,
      runValidators: true,
    });

    // Check if quote of id exists
    if (quote === null) {
      throw createHttpError(404, "Quote not found at id " + id);
    }

    res.status(200).json(quote);
  } catch (error) {
    next(error);
  }
};

export const deleteQuote: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await QuoteModel.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
