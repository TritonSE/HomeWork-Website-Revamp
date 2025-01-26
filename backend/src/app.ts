import express from "express";
import mongoose from "mongoose";

import { port, mongoUri } from "./config";
import userRoutes from "./routes/user";
import "./util/firebase";

const app = express();

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
