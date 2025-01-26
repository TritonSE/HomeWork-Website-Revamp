import express from "express";
import mongoose from "mongoose";

import { config } from "./config";
import userRoutes from "./routes/user";
import "./util/firebase";

const app = express();

// Connect to MongoDB
mongoose
  .connect(config.mongodb.uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

export default app;
