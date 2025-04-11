// API client for Stripe-related endpoints
import { post, get, APIResult, handleAPIError } from "./requests";

/**
 * Response type for client secret
 */
interface ClientSecretResponse {
  client_secret: string;
}

/**
 * Creates a new Stripe checkout session and returns the client secret
 * @returns Promise with the client secret or error
 */
export async function createCheckoutSession(): Promise<APIResult<ClientSecretResponse>> {
  try {
    const response = await post("/stripe/create-session", {});
    const data = await response.json();
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
export async function getCheckoutSession(sessionId: string): Promise<APIResult<{ status: string, customerEmail?: string }>> {
  try {
    const response = await get(`/stripe/session/${sessionId}`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return handleAPIError(error);
  }
}