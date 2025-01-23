import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

import TestimonyModel from "../models/testimony";
import validationErrorParser from "../util/validationErrorParser";

type TestimonyUpdate = {
  body: string;
  image: string;
  source: string;
};

export const createTestimony: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    validationErrorParser(errors);
    const testimony = await TestimonyModel.create(req.body);
    res.status(201).json(testimony);
  } catch (error) {
    next(error);
  }
};

export const getAllTestimoy: RequestHandler = async (req, res, next) => {
  try {
    const testimonys = await TestimonyModel.find();
    res.status(200).json(testimonys);
  } catch (error) {
    next(error);
  }
};

export const updateTestimony: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    const { id } = req.params;
    validationErrorParser(errors);

    // Returns the updated testimony
    const reqBody: TestimonyUpdate = req.body as TestimonyUpdate;
    const testimony = await TestimonyModel.findByIdAndUpdate(id, reqBody, {
      new: true,
      runValidators: true,
    });

    // Check if testimony of id exists
    if (testimony === null) {
      throw createHttpError(404, "Testimony not found at id " + id);
    }

    res.status(200).json(testimony);
  } catch (error) {
    next(error);
  }
};

export const deleteTestimony: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await TestimonyModel.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
