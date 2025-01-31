import { InferSchemaType, Schema, model } from "mongoose";

const subscriptionSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

type Subscription = InferSchemaType<typeof subscriptionSchema>;

export default model<Subscription>("Subscription", subscriptionSchema);
