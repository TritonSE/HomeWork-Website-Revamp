"use server";

import { stripe } from "../../stripe/stripe";
import { headers } from "next/headers";

export async function fetchClientSecret() {
  const origin = (await headers()).get("origin");

  if (origin === null) {
    throw new Error("Origin header is missing");
  }

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of
        // the product you want to sell
        price: "price_1Qzk82FzkyJsiGOj7SwJUIHn",
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return session.client_secret;
}
