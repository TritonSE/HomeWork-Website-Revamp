import { json } from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { mongoUri, port } from "./config";
import { errorHandler } from "./errors/handler";
import articleRoutes from "./routes/article";
import testimonyRoutes from "./routes/testimony";
import contactRoute from "./routes/contactRequest";

// Initialize Express App
const app = express();

app.use(json());
app.use("/api", contactRoute);
app.use("/api/articles", articleRoutes);
app.use("/api/testimonys", testimonyRoutes);

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
