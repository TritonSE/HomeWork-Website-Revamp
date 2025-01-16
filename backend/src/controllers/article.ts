import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

import ArticleModel from "../models/article";
import validationErrorParser from "../util/validationErrorParser";

type ArticleUpdate = {
  header: string;
  dateCreated: Date;
  author: string;
  body?: string | null;
  thumbnail?: string | null;
};

export const createArticle: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    validationErrorParser(errors);
    const article = await ArticleModel.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

export const getAllArticles: RequestHandler = async (req, res, next) => {
  try {
    const articles = await ArticleModel.find();
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

export const updateArticle: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    const { id } = req.params;
    validationErrorParser(errors);

    // Returns the updated article
    const reqBody: ArticleUpdate = req.body as ArticleUpdate;
    const article = await ArticleModel.findByIdAndUpdate(id, reqBody, {
      new: true,
      runValidators: true,
    });

    // Check if article of id exists
    if (article === null) {
      throw createHttpError(404, "Article not found at id " + id);
    }

    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};
