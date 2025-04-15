import { InferSchemaType, Schema, model } from "mongoose";

const subscriptionSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  joined: { type: Date, required: true },
});

type Subscription = InferSchemaType<typeof subscriptionSchema>;

export default model<Subscription>("Subscription", subscriptionSchema);
