"use client";

import { Button } from "@tritonse/tse-constellation";

export default function NewsPastEvents() {
  return (
    <section className="flex text-text_black flex-col md:flex-row items-center justify-between py-12">
      <div>
        <h2 className="text-[48px] font-medium">News & Past Events</h2>
        <p className="mt-4 mb-6">
          We’ve done some amazing things. Here are a few of our most recent events and highlights.
        </p>
        <Button>See More</Button>
      </div>
    </section>
  );
}
