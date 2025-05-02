import { InferSchemaType, Schema, model } from "mongoose";

const subscriptionSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  joined: { type: Date, required: true, default: Date.now },
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
 
});

type Subscription = InferSchemaType<typeof subscriptionSchema>;

export default model<Subscription>("Subscription", subscriptionSchema);
