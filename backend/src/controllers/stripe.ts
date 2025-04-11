// controllers/stripeController.ts
import { RequestHandler } from "express";
import createHttpError from "http-errors";

// Type definitions for Stripe
interface StripeCustomerDetails {
  email?: string;
  name?: string;
  phone?: string;
  address?: {
    city?: string;
    country?: string;
    line1?: string;
    line2?: string;
    postal_code?: string;
    state?: string;
  };
}

interface StripeCheckoutSession {
  id: string;
  object: "checkout.session";
  status: "open" | "complete" | "expired";
  customer_details?: StripeCustomerDetails;
  // Add other properties as needed
}

interface StripeCheckoutAPI {
  sessions: {
    retrieve(sessionId: string, options?: { expand?: string[] }): Promise<StripeCheckoutSession>;
  };
}

interface StripeInstance {
  checkout: StripeCheckoutAPI;
}

// Define a type for Stripe errors
interface StripeError {
  type: string;
  message: string;
}

// Using require for Stripe with proper type casting
import Stripe from "stripe";
// Type the Stripe constructor
type StripeConstructor = (apiKey: string) => StripeInstance;
const stripe = (Stripe as unknown as StripeConstructor)(process.env.STRIPE_SECRET_KEY ?? "");

/**
 * Get checkout session details
 * @route GET /api/checkout/session/:sessionId
 */
export const getCheckoutSession: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.params as { sessionId: string };

    if (!sessionId) {
      throw createHttpError(400, "Please provide a valid session_id");
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    });

    if (!session) {
      throw createHttpError(404, "Checkout session not found");
    }

    res.status(200).json({
      success: true,
      status: session.status,
      customerEmail: session.customer_details?.email ?? undefined,
    });
  } catch (error: unknown) {
    // Check if it's a Stripe error by verifying the structure
    if (
      typeof error === "object" &&
      error !== null &&
      "type" in error &&
      typeof (error as StripeError).type === "string" &&
      (error as StripeError).type.startsWith("Stripe")
    ) {
      next(createHttpError(400, (error as StripeError).message ?? "Stripe error occurred"));
    }

    // For any other type of error
    if (error instanceof Error) {
      next(createHttpError(500, error.message));
    }

    // Fallback for completely unknown errors
    next(createHttpError(500, "An unknown error occurred"));
  }
};
