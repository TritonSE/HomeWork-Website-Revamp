// app/return/page.tsx
import { stripe } from "../../stripe/stripe";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// Define searchParams as a Promise
interface SearchParamsProps {
  searchParams: Promise<{
    session_id?: string | string[];
  }>;
}

export default async function Return({ searchParams }: SearchParamsProps) {
  // Await the searchParams
  const resolvedParams = await searchParams;

  // Use type assertion since searchParams.session_id could be a string or string[] or undefined
  const session_id =
    typeof resolvedParams.session_id === "string"
      ? resolvedParams.session_id
      : Array.isArray(resolvedParams.session_id)
        ? resolvedParams.session_id[0]
        : undefined;

  if (!session_id) throw new Error("Please provide a valid session_id (`cs_test_...`)");

  // Get the session from Stripe
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  // Get status and customer details separately
  const { status } = session;
  const customerEmail = session.customer_details?.email ?? "customer";

  if (status === "open") {
    return redirect("/");
  }

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
