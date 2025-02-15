import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

import { CustomError } from "./errors";
import { InternalError } from "./internal";

/**
 * Generic Error Handler
 */
export const errorHandler = (err: Error, _req: Request, res: Response, _nxt: NextFunction) => {
  if (!err) return;
  if (err instanceof CustomError && !(err instanceof InternalError)) {
    console.log(err.displayMessage(true));
    res.status(err.status).send({ error: err.message });
    return;
  }
  if (err instanceof HttpError) {
    console.log("Validation/HTTP Error:", err.message);
    res.status(err.statusCode).send({ error: err.message });
    return;
  }
  console.log("Internal Error", err);
  res.status(500).send("Unknown Error. Try Again");
};
