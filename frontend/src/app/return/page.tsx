"use client";
// app/return/page.tsx
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Define types for API responses
interface StripeSessionResponse {
  success: boolean;
  status: string;
  customerEmail?: string;
}

// Define type for our debug information
interface DebugInfo {
  apiUrl?: string;
  responseStatus?: number;
  responseOk?: boolean;
  responseData?: StripeSessionResponse;
  errorDetails?: string;
}

// API URL with debugging
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://0.0.0.0:4000/api/stripe/session";

export default function Return() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<DebugInfo>({});
  const [status, setStatus] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string>("customer");

  useEffect(() => {
    async function fetchCheckoutSession() {
      try {
        // Get session_id from URL parameters
        const sessionId = searchParams.get("session_id");
        if (!sessionId) {
          setError("Please provide a valid session_id (`cs_test_...`)");
          setIsLoading(false);
          return;
        }

        // Store debug information
        const apiUrl = `${API_URL}/${sessionId}`;
        setDebug((prev) => ({ ...prev, apiUrl }));

        console.log("Fetching from:", apiUrl);

        try {
          // Attempt the fetch with more detailed error handling
          const response = await fetch(apiUrl);

          setDebug((prev) => ({
            ...prev,
            responseStatus: response.status,
            responseOk: response.ok,
          }));

          if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `Server responded with status ${String(response.status)}`;

            try {
              // Try to parse as JSON, but handle when it's not JSON
              const errorData = JSON.parse(errorText) as { message?: string };
              errorMessage = errorData.message ?? errorMessage;
            } catch (e) {
              console.log(e);
              // Not JSON, use the raw text if it exists
              if (errorText) errorMessage += `: ${errorText}`;
            }

            throw new Error(errorMessage);
          }

          const data = (await response.json()) as StripeSessionResponse;
          setDebug((prev) => ({ ...prev, responseData: data }));

          // Set state based on API response
          setStatus(data.status);
          setCustomerEmail(data.customerEmail ?? "customer");

          // Handle redirect for open sessions
          if (data.status === "open") {
            router.push("/");
          }
        } catch (fetchError) {
          // Specific error for fetch failures
          if (fetchError instanceof Error && fetchError.message === "Failed to fetch") {
            throw new Error(
              "Network error: Could not connect to the API server. " +
                "Please check that your backend is running and accessible.",
            );
          }
          throw fetchError;
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);

        // Add error details to debug info
        setDebug((prev) => ({
          ...prev,
          errorDetails: errorMessage,
        }));

        console.error("Checkout session error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCheckoutSession().catch(console.error);
  }, [searchParams, router]);

  // Loading state
  if (isLoading) {
    return <div>Loading checkout information...</div>;
  }

  // Error state with debugging info
  if (error) {
    return (
      <div className="error">
        <h3>Error: {error}</h3>

        <div style={{ marginTop: "20px" }}>
          <h4>Debugging Information:</h4>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(debug, null, 2)}
          </pre>

          <h4>Troubleshooting Steps:</h4>
          <ol>
            <li>Check that your API server is running at: {API_URL}</li>
            <li>Verify CORS is properly configured on your backend</li>
            <li>Make sure the session ID is valid</li>
            <li>Check browser console for additional errors</li>
          </ol>

          <button
            onClick={() => (window.location.href = "/")}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              background: "#4a4a4a",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Complete state
  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}. If you
          have any questions, please email{" "}
        </p>
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </section>
    );
  }

  return null;
}
