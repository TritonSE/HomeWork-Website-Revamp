import { InferSchemaType, Schema, model } from "mongoose";

const subscriptionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  threadId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "error"],
    required: true,
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type Subscription = InferSchemaType<typeof subscriptionSchema>;

export default model<Subscription>("Subscription", subscriptionSchema);
