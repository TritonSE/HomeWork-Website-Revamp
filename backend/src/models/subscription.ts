import { InferSchemaType, Schema, model } from "mongoose";

const subscriptionSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  joined: { type: Date, required: true, default: Date.now },
});

type Subscription = InferSchemaType<typeof subscriptionSchema>;

export default model<Subscription>("Subscription", subscriptionSchema);
