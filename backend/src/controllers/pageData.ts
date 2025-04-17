import { RequestHandler } from "express";

import PageData from "../models/pageData";
import { Request, Response, NextFunction } from "express";

type UpdatePageDataBody = {
  pagename: string;
  fields: {
    name: string;
    type: string;
    data: unknown;
  }[];
};

export const updatePageData: RequestHandler = async (req, res, next) => {
  try {
    const { pagename, fields } = req.body as UpdatePageDataBody;

    const pageData = await PageData.findOne({ pagename });

    if (!pageData) {
      res.status(404).json({
        message: `Page data not found for page: ${pagename}`,
      });
      return;
    }

    if (pageData.fields.length !== fields.length) {
      res.status(400).json({ message: "Cannot add or remove fields." });
    }

    for (let i = 0; i < fields.length; i++) {
      if (pageData.fields[i].name !== fields[i].name) {
        res.status(400).json({ message: "Field names cannot be modified." });
      }
      // Update the field's data (leaving the name and type intact).
      pageData.fields[i].data = fields[i].data;
    }

    pageData.lastUpdate = new Date();

    await pageData.save();

    res.status(200).json({
      message: "Page data updated successfully.",
      pageData,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPageData: RequestHandler = async (req, res, next) => {
  try {
    const pageDataList = await PageData.find();

    res.status(200).json(pageDataList);
    return;
  } catch (error) {
    next(error);
  }
};

export const seedPageData = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { pagename, fields } = req.body as UpdatePageDataBody;

    if (!pagename || !Array.isArray(fields)) {
      res.status(400).json({ message: "pagename and fields are required." });
      return;
    }

    const newPageData = new PageData({
      pagename,
      lastUpdate: new Date(),
      fields,
    });

    await newPageData.save();

    res.status(201).json({
      message: "New page document inserted",
      document: newPageData,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePageData = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { pagename } = req.params;

    const deletedPage = await PageData.findOneAndDelete({ pagename });

    if (!deletedPage) {
      res.status(404).json({ message: `No page found with pagename: ${pagename}` });
      return;
    }

    res.status(200).json({
      message: `Page '${pagename}' deleted successfully.`,
      document: deletedPage,
    });
  } catch (error) {
    next(error);
  }
};
