import { json } from "body-parser";
import cors from "cors";
import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import mongoose from "mongoose";

import { mongoUri, port } from "./config";
import { errorHandler } from "./errors/handler";
import articleRoutes from "./routes/article";
import contactRoute from "./routes/contactRequest";
import quoteRoutes from "./routes/quote";
import subscriptionRoutes from "./routes/subscription";
import userRoute from "./routes/user";
import stripeRoutes from "./routes/stripe";

// Initialize Express App
const app = express();
// Configure CORS to handle multiple origins properly
let corsOrigin = 'http://localhost:3000';

// If FRONTEND_ORIGIN is defined, use the first origin (in case it's a comma-separated list)
if (process.env.FRONTEND_ORIGIN) {
  corsOrigin = process.env.FRONTEND_ORIGIN.split(',')[0].trim();
}

const corsOptions = {
  origin: corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(json());
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/contact", contactRoute);
app.use("/api/users", userRoute);
app.use("/api/articles", articleRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/stripe", stripeRoutes);

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

export const backend = onRequest({ region: "us-west1" }, app);
