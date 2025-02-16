import { json } from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { mongoUri, port } from "./config";
import { errorHandler } from "./errors/handler";
import articleRoutes from "./routes/article";
import contactRoute from "./routes/contactRequest";
import subscriptionRoutes from "./routes/subscription";

// Initialize Express App
const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));
app.use(json());
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api", contactRoute);
app.use("/api/articles", articleRoutes);
app.use(errorHandler);
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Mongoose connected!");
    // Tell app to listen on our port environment variable
    app.listen(port, () => {
      console.log(`> Listening on port ${port}`);
    });
  })
  .catch(console.error);
