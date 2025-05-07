import Subscription from "../models/subscription";

import { getRecentMessages } from "./gmailService";

export const checkForEmailBounces = async () => {
  const activeSubs = await Subscription.find({ status: "active" });
  const recentMessages = await getRecentMessages();

  await Promise.all(
    activeSubs.map(async (subscription) => {
      const match = recentMessages.find(
        (msg) =>
          msg !== null &&
          msg.threadId === subscription.threadId &&
          msg.snippet.includes("Address not found"),
      );

      if (match) {
        console.log(`Email bounce detected for: ${subscription.email}`);
        await Subscription.updateOne({ _id: subscription._id }, { status: "error" });
      }
    }),
  );

  console.log("Bounce check finished.");
};
