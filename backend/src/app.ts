import { json } from "body-parser";
import cors from "cors";
import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import mongoose from "mongoose";
import cron from "node-cron";

import { devMode, mongoUri, port } from "./config";
import { errorHandler } from "./errors/handler";
import articleRoutes from "./routes/article";
import contactRoute from "./routes/contactRequest";
import quoteRoutes from "./routes/quote";
import subscriptionRoutes from "./routes/subscriptions";
import userRoute from "./routes/user";
import { checkForEmailBounces } from "./services/emailBounceChecker";

// Initialize Express App
const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));
app.use(json());
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/contact", contactRoute);
app.use("/api/users", userRoute);
app.use("/api/articles", articleRoutes);
app.use("/api/quotes", quoteRoutes);

app.use(errorHandler);
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Mongoose connected!");
    if (devMode) console.log("### Running Backend in Developer Mode ###");
    // Tell app to listen on our port environment variable
    app.listen(port, () => {
      console.log(`> Listening on port ${port}`);
    });
  })
  .catch(console.error);

if (!devMode)
  cron.schedule("*/15 * * * *", () => {
    console.log("Checking email bounces...");
    void checkForEmailBounces();
  });

export const backend = onRequest({ region: "us-west1" }, app);
