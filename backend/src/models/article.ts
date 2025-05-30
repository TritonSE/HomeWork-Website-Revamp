import { InferSchemaType, Schema, model } from "mongoose";

const articleSchema = new Schema({
  header: { type: String, required: true },

  dateCreated: { type: Date, required: true },

  author: { type: String, required: true },

  body: { type: String },

  thumbnail: { type: String, required: true },

  isPublished: { type: Boolean, required: true, default: false },
});

type ArticleItem = InferSchemaType<typeof articleSchema>;

export default model<ArticleItem>("ArticleItem", articleSchema);
