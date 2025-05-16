"use client";
// app/return/page.tsx
import { Icon } from "@tritonse/tse-constellation";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { APIResult } from "../../../api/requests";
import { getCheckoutSession } from "../../../api/stripe";

// Define type for our debug information
type CheckoutSessionData = {
  status: string;
  customerEmail?: string;
};

type DebugInfo = {
  sessionId?: string;
  responseData?: APIResult<CheckoutSessionData>;
  errorDetails?: string;
};

export default function Return() {
  return (
    <Suspense>
      <ReturnContent />
    </Suspense>
  );
}

function ReturnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<DebugInfo>({});
  const [status, setStatus] = useState<string | null>(null);
  const [_, setCustomerEmail] = useState<string>("customer");

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
    return (
      <div className="mt-24 px-4">
        <div>Loading checkout information...</div>
      </div>
    );
  }

  // Error state with debugging info
  if (error) {
    return (
      <div className="mt-24 px-4">
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
      </div>
    );
  }

  // Complete state
  if (status === "complete") {
    return (
      <div className="pageWrapper mx-[122px] my-[107px]">
        <div className="flex items-start">
          <Link href="/" className="text-[#B4B4B4] hover:underline flex items-center gap-2">
            <Icon name="ic_arrowback" fill="#B4B4B4" size={16} />
            Back to Homework website
          </Link>
        </div>

        <div className="messageWrapper mt-[80px] flex flex-col items-center justify-center">
          <Image
            src="/icons/ic_success.svg"
            width={250}
            height={250}
            alt={"transaction success"}
            className="block mx-auto"
          ></Image>
          <div className="text-[#000000] font-medium text-[48px] leading-[130%] tracking-[0px] text-center w-[648px] max-h-[213px] mb-[17px]">
            Thank you for your donation!
          </div>

          <div className="text-[#6C6C6C] font-normal text-[24px] leading-[150%] tracking-[2%] text-center w-[648px] max-h-[72px] mb-[32px]">
            Your donation directly contributes to empowering individuals to thrive
            post-incarceration.
          </div>

          <div className="text-[#6C6C6C] font-normal text-[18px] leading-[150%] tracking-[2%] text-center w-[454px] max-h-[54px] mb-[28px]">
            Check out our
            <Link href="/calendar" className="underline">
              upcoming events calendar
            </Link>
            to find more ways to get involved
          </div>
          <Image
            src="../../logo-dark.png"
            width={133}
            height={73}
            alt={"HomeWork Logo"}
            className="block mx-auto"
          ></Image>
        </div>
      </div>
    );
  }

  return null;
}
