"use client";
// app/return/page.tsx
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getCheckoutSession } from "../../api/stripe";

// Define type for our debug information
type DebugInfo = {
  sessionId?: string;
  responseData?: Record<string, unknown>;
  errorDetails?: string;
}

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
          setError("Please provide a valid session_id");
          setIsLoading(false);
          return;
        }

        setDebug((prev) => ({ ...prev, sessionId }));
        console.log("Fetching session:", sessionId);

        const result = await getCheckoutSession(sessionId);
        setDebug((prev) => ({ ...prev, responseData: result }));
        
        if (result.success) {
          // Set state based on API response
          setStatus(result.data.status);
          setCustomerEmail(result.data.customerEmail ?? "customer");

          // Handle redirect for open sessions
          if (result.data.status === "open") {
            router.push("/");
          }
        } else {
          throw new Error(result.error || "Failed to retrieve session status");
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
