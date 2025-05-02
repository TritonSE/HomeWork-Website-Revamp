import express from "express";

import * as ArticleController from "../controllers/article";
import * as ArticleValidator from "../validators/article";
import { verifyAuthToken } from "../validators/auth";

const router = express.Router();

router.get("/all", ArticleController.getAllArticles);
router.post(
  "/create",
  [verifyAuthToken],
  ArticleValidator.createArticle,
  ArticleController.createArticle,
);
router.put(
  "/:id",
  [verifyAuthToken],
  ArticleValidator.updateArticle,
  ArticleController.updateArticle,
);
router.delete("/:id", ArticleController.deleteArticle);

export default router;
