import { InferSchemaType, Schema, model } from "mongoose";

const articleSchema = new Schema({
  // Header/title of article
  header: { type: String, required: true },

  // Creation date of article
  dateCreated: { type: Date, required: true },

  // Author of article
  author: { type: String, required: true },

  // Text content of article
  body: { type: String },

  // File URL to article image
  thumbnail: { type: String },
});

type ArticleItem = InferSchemaType<typeof articleSchema>;

export default model<ArticleItem>("ArticleItem", articleSchema);
