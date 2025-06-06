import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

import ArticleModel from "../models/article";
import { firebaseStorage } from "../util/firebase";
import validationErrorParser from "../util/validationErrorParser";

type ArticleUpdate = {
  header: string;
  author: string;
  body?: string | null;
  thumbnail: string;
  isPublished?: boolean;
};

type ArticleBody = {
  header: string;
  author: string;
  body?: string;
  thumbnail: string;
  isPublished?: boolean;
};

export const createArticle: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    validationErrorParser(errors);
    const articleData = req.body as ArticleBody;
    const article = await ArticleModel.create({
      ...articleData,
      dateCreated: new Date().toISOString(),
      isPublished: articleData.isPublished ?? false,
    });
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

    // Get the existing article to check for old thumbnail
    const existingArticle = await ArticleModel.findById(id);
    if (existingArticle === null) {
      throw createHttpError(404, "Article not found at id " + id);
    }

    // Delete old thumbnail if it exists and is different from the new one
    const reqBody: ArticleUpdate = req.body as ArticleUpdate;
    if (existingArticle.thumbnail && existingArticle.thumbnail !== reqBody.thumbnail) {
      try {
        const thumbnailUrl = existingArticle.thumbnail;
        // Extract the path from the full URL
        const path = thumbnailUrl.split("/o/")[1]?.split("?")[0];
        if (path) {
          const decodedPath = decodeURIComponent(path);
          await firebaseStorage.bucket().file(decodedPath).delete();
        }
      } catch (error) {
        console.error("Error deleting old thumbnail from Firebase:", error);
        // Continue with article update even if thumbnail deletion fails
      }
    }

    // Update the article
    const article = await ArticleModel.findByIdAndUpdate(
      id,
      {
        ...reqBody,
        dateCreated: new Date().toISOString(),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

export const deleteArticle: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findById(id);
    if (article === null) {
      throw createHttpError(404, "Article not found at id " + id);
    }

    // Delete thumbnail from Firebase Storage if it exists
    if (article.thumbnail) {
      try {
        const thumbnailUrl = article.thumbnail;
        // Extract the path from the full URL
        const path = thumbnailUrl.split("/o/")[1]?.split("?")[0];
        if (path) {
          const decodedPath = decodeURIComponent(path);
          await firebaseStorage.bucket().file(decodedPath).delete();
        }
      } catch (error) {
        console.error("Error deleting thumbnail from Firebase:", error);
        // Continue with article deletion even if thumbnail deletion fails
      }
    }

    // Delete the article from MongoDB
    await ArticleModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    next(error);
  }
};
