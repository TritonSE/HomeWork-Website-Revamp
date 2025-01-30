import { InferSchemaType, Schema, model } from "mongoose";

const quoteSchema = new Schema({
  // body
  body: { type: String, required: true },

  // image (string, url to image.)
  image: { type: String, required: true },

  // source (string, name and occupation of person who gave the quote)
  source: { type: String, required: true },
});

type QuoteItem = InferSchemaType<typeof quoteSchema>;

export default model<QuoteItem>("QuoteItem", quoteSchema);
