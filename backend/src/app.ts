import { json } from "body-parser";
import express from "express";
import mongoose from "mongoose";

import { mongoUri, port } from "./config";
import subscriptionRoutes from "./routes/subscription";

// Initialize Express App
const app = express();

// Provide json body-parser middleware
app.use(json());

app.use("/api/subscriptions", subscriptionRoutes);

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
