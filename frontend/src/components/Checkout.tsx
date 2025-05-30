"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import { createCheckoutSession } from "../api/stripe";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error("Missing Stripe publishable key");
}

const stripePromise = loadStripe(stripePublishableKey);

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        setLoading(true);
        console.log("Attempting API call to:", process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api");

        const result = await createCheckoutSession();

        if (result.success && result.data.client_secret) {
          setClientSecret(result.data.client_secret);
        } else {
          setError("Failed to create checkout session");
          console.error("Checkout error (api result):", result);
        }
      } catch (err) {
        setError("An error occurred while setting up payment");
        console.error("Checkout error (outer):", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchClientSecret();
  }, []);

  if (loading) {
    return <div>Loading checkout...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!clientSecret) {
    return <div>Unable to initialize checkout</div>;
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
