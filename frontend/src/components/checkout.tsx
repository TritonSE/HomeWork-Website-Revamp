"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { fetchClientSecret } from "../app/action/stripe";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error("Missing Stripe publishable key");
}

const stripePromise = loadStripe(stripePublishableKey);

const fetchClientSecretWrapper = async () => {
  const clientSecret = await fetchClientSecret();

  if (!clientSecret) {
    throw new Error("Failed to obtain client secret");
  }

  return clientSecret; // Now TypeScript knows this can't be null
};

export default function Checkout() {
  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret: fetchClientSecretWrapper }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
