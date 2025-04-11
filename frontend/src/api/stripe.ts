// API client for Stripe-related endpoints
import { APIResult, get, handleAPIError, post } from "./requests";

/**
 * Response type for client secret
 */
type ClientSecretResponse = {
  client_secret: string;
};

/**
 * Response type for session information
 */
type SessionResponse = {
  status: string;
  customerEmail?: string;
};

/**
 * Creates a new Stripe checkout session and returns the client secret
 * @returns Promise with the client secret or error
 */
export async function createCheckoutSession(): Promise<APIResult<ClientSecretResponse>> {
  try {
    const response = await post("/stripe/create-session", {});
    const data = await response.json() as ClientSecretResponse;
    return { success: true, data };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Gets information about a checkout session
 * @param sessionId The ID of the session to retrieve
 * @returns Promise with the session information or error
 */
export async function getCheckoutSession(
  sessionId: string,
): Promise<APIResult<SessionResponse>> {
  try {
    const response = await get(`/stripe/session/${sessionId}`);
    const data = await response.json() as SessionResponse;
    return { success: true, data };
  } catch (error) {
    return handleAPIError(error);
  }
}
