import mongoose, { Schema } from "mongoose";
import { User } from "./userModel.js";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: User,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Subscription = mongoose.model("subscription", subscriptionSchema);
