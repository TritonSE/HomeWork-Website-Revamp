import express from "express";

import { getAllPageData, seedPageData, updatePageData } from "../controllers/pageData";
import { verifyAuthToken } from "../validators/auth";
import { updatePageDataValidator } from "../validators/pageData";

const router = express.Router();

router.post("/update", [verifyAuthToken], updatePageDataValidator, updatePageData);
router.get("/all", getAllPageData);
router.post("/seed", [verifyAuthToken], seedPageData);

// Added in case you need to make delete page.
// router.delete("/delete/:pagename", [verifyAuthToken], deletePageData);

export default router;
