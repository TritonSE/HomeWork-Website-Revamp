import mongoose, { Document, Schema } from "mongoose";

/**
 * Interface representing a single section (field) of a page.
 */
export type IField = {
  name: string;
  type: string;
  data: unknown; // Mixed type to hold any shape of data
};

/**
 * Interface representing a PageData document.
 */
export type IPageData = {
  pagename: string;
  lastUpdate: Date;
  fields: IField[];
} & Document;

/**
 * Schema for the individual field.
 * The `_id: false` option prevents Mongoose from creating an automatic _id for each field sub-document.
 */
const fieldSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false },
);

/**
 * Schema for the PageData.
 */
const pageDataSchema: Schema = new Schema({
  pagename: { type: String, required: true, unique: true },
  lastUpdate: { type: Date, default: Date.now },
  fields: { type: [fieldSchema], default: [] },
});

export default mongoose.model<IPageData>("PageData", pageDataSchema);
