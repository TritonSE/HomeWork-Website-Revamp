import Image from "next/image";

type Event = {
  header: string;
  dateCreated: string;
  body: string;
  thumbnail: string;
  thumbnailAlt?: string;
  learnMoreUrl: string;
};

type EventProps = {
  event: Event;
};

/**
 * Card to display event information in the EventsCarousel component
 */
export const EventsCarouselCard: React.FC<EventProps> = ({ event }) => {
  return (
    <div
      className="
            flex-shrink-0 sm:w-2/5 w-full max-w-xl h-full p-4 pt-5 pb-6 
            rounded-lg border border-gray-400
            snap-normal snap-start hover:shadow-lg"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="relative w-full h-72">
          <Image
            src={event.thumbnail}
            alt={event.thumbnailAlt ?? event.header}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h3 className="font-golos md:text-lg text-sm font-medium">{event.header}</h3>
        <p className="font-manrope md:text-sm text-xs text-orange-500 font-bold">
          {event.dateCreated}
        </p>
        <p className="font-golos md:text-sm text-xs font-light line-clamp-3">{event.body}</p>
      </div>

      <a href={event.learnMoreUrl} className="flex flex-row justify-end gap-2 w-full mt-6">
        <span className="font-manrope md:text-sm text-xs font-bold text-gray-400 hover:text-[#6C6C6C]">
          LEARN MORE
        </span>
        <Image src="/icons/learnMore.svg" alt="Learn more arrow" width={24} height={24} />
      </a>
    </div>
  );
};
