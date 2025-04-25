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
  client_secret?: string;
  // Add other properties as needed
}

interface StripeCheckoutSessionCreateParams {
  ui_mode: "embedded";
  line_items: {
    price: string;
    quantity: number;
  }[];
  mode: "payment";
  return_url: string;
}

interface StripeCheckoutAPI {
  sessions: {
    retrieve(sessionId: string, options?: { expand?: string[] }): Promise<StripeCheckoutSession>;
    create(params: StripeCheckoutSessionCreateParams): Promise<StripeCheckoutSession>;
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

/**
 * Create a new checkout session
 * @route POST /api/checkout/create-session
 */
export const createCheckoutSession: RequestHandler = async (req, res, next) => {
  try {
    const origin = req.headers.origin ?? req.headers.referer ?? "http://localhost:3000";

    // Create Checkout Sessions from body params
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          // Provide the exact Price ID of the product you want to sell
          price: "price_1Qzk82FzkyJsiGOj7SwJUIHn",
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session?.client_secret) {
      throw createHttpError(500, "Failed to create checkout session");
    }

    res.status(200).json({
      success: true,
      client_secret: session.client_secret,
    });
  } catch (error: unknown) {
    // Check if it's a Stripe error
    if (
      typeof error === "object" &&
      error !== null &&
      "type" in error &&
      typeof (error as StripeError).type === "string" &&
      (error as StripeError).type.startsWith("Stripe")
    ) {
      next(createHttpError(400, (error as StripeError).message ?? "Stripe error occurred"));
    } else if (error instanceof Error) {
      next(createHttpError(500, error.message));
    } else {
      next(createHttpError(500, "An unknown error occurred"));
    }
  }
};
