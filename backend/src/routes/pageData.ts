import express from "express";

import {
  deletePageData,
  getAllPageData,
  seedPageData,
  updatePageData,
} from "../controllers/pageData";
import { verifyAuthToken } from "../validators/auth";
import { updatePageDataValidator } from "../validators/pageData";

const router = express.Router();

router.post("/update", [verifyAuthToken], updatePageDataValidator, updatePageData);
router.get("/all", getAllPageData);

// Added in case you need to make delete or make a page.
router.delete("/delete/:pagename", [verifyAuthToken], deletePageData);
router.post("/seed", [verifyAuthToken], seedPageData);

export default router;
