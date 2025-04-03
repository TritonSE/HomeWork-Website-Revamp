export default function NewsPastEvents() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12">
      <div className="my-14 ml-4 max-w-lg">
        <h2 className="text-[48px] text-3xl font-bold text-left">News & Past Events</h2>
        <p className="text-gray-600 mt-2 text-left">
          We’ve done some amazing things. Here are a few of our most recent events and highlights.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          aria-label="See more past events"
        >
          See More
        </button>
      </div>
    </section>
  );
}
