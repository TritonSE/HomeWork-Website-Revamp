import { InferSchemaType, Schema, model } from "mongoose";

const testimonySchema = new Schema({
  // body
  body: { type: String, required: true },

  // image (string, url to image.)
  image: { type: String, required: true },

  // source (string, name and occupation of person who gave the quote)
  source: { type: String, required: true },
});

type TestimonyItem = InferSchemaType<typeof testimonySchema>;

export default model<TestimonyItem>("TestimonyItem", testimonySchema);
