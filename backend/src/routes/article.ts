import express from "express";

import * as ArticleController from "../controllers/article";
import * as ArticleValidator from "../validators/article";

const router = express.Router();

router.get("/", ArticleController.getAllArticles);
router.post("/", ArticleValidator.createArticle, ArticleController.createArticle);
router.put("/:id", ArticleValidator.updateArticle, ArticleController.updateArticle);

export default router;
