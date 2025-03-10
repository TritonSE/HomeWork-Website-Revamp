import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: String, // Will store Firebase UID
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
