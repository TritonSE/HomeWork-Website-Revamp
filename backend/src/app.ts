import { json } from "body-parser";
import express from "express";

import { port } from "./config";
import { errorHandler } from "./errors/handler";
import contactRoute from "./routes/contactRequest";
const app = express();

app.use(json());
app.use("/api", contactRoute);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`> Listening on port ${port}`);
});
